import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { buildSystemPrompt, TipoAgente } from '@/lib/prompts'
import { GeminiMessage } from '@/lib/gemini'
import { streamMensajeGemini } from '@/lib/gemini-stream'
import { rateLimit } from '@/lib/rate-limit'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function POST(request: NextRequest) {
  try {
    const { mensaje, conversacion_id, empresa_id } = await request.json()

    if (!mensaje || !conversacion_id || !empresa_id) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: mensaje, conversacion_id, empresa_id' },
        { status: 400 }
      )
    }

    // Rate limit: 20 messages per minute per empresa
    const { allowed } = rateLimit(`chat:${empresa_id}`, 20, 60000)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Demasiados mensajes. Espera un momento antes de enviar otro.' },
        { status: 429 }
      )
    }

    // Input validation
    if (typeof mensaje !== 'string' || mensaje.length > 5000) {
      return NextResponse.json(
        { error: 'Mensaje inválido (máximo 5000 caracteres)' },
        { status: 400 }
      )
    }

    const supabase = getSupabase()

    // 1. Obtener datos de la empresa + verificar plan/trial
    const { data: empresa, error: errorEmpresa } = await supabase
      .from('empresas')
      .select('nombre, plan, trial_ends_at, subscription_status')
      .eq('id', empresa_id)
      .single()

    if (errorEmpresa || !empresa) {
      return NextResponse.json({ error: 'Empresa no encontrada' }, { status: 404 })
    }

    // Check trial/plan
    const hasActivePlan = empresa.plan !== 'free' && empresa.subscription_status === 'active'
    const trialEndsAt = empresa.trial_ends_at ? new Date(empresa.trial_ends_at) : null
    if (!hasActivePlan && trialEndsAt && new Date() > trialEndsAt) {
      return NextResponse.json({ error: 'Tu prueba gratuita ha expirado. Elige un plan para continuar.' }, { status: 403 })
    }

    // 2. Obtener tipo de agente de la conversación
    const { data: conversacion } = await supabase
      .from('conversaciones')
      .select('agente_tipo')
      .eq('id', conversacion_id)
      .single()

    const agenteTipo = (conversacion?.agente_tipo || 'general') as TipoAgente

    // 3. Check agent access based on plan
    const agentesPermitidos = getAgentesPermitidos(empresa.plan)
    if (!agentesPermitidos.includes(agenteTipo)) {
      return NextResponse.json(
        { error: `Tu plan no incluye el agente ${agenteTipo}. Actualiza tu plan para acceder.` },
        { status: 403 }
      )
    }

    // 4. Obtener contexto del onboarding
    const { data: contexto } = await supabase
      .from('contexto')
      .select('*')
      .eq('empresa_id', empresa_id)
      .order('orden', { ascending: true })

    // 5. Construir system prompt
    const systemPrompt = buildSystemPrompt(empresa.nombre, contexto || [], agenteTipo)

    // 6. Obtener historial (últimos 20 mensajes)
    const { data: historialDB } = await supabase
      .from('mensajes')
      .select('rol, contenido')
      .eq('conversacion_id', conversacion_id)
      .order('created_at', { ascending: true })
      .limit(20)

    const historial: GeminiMessage[] = (historialDB || []).map((msg) => ({
      role: msg.rol === 'user' ? 'user' : 'model',
      parts: [{ text: msg.contenido }]
    }))

    // 7. Stream response from Gemini
    const result = await streamMensajeGemini(systemPrompt, historial, mensaje)

    let fullResponse = ''

    const encoder = new TextEncoder()
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text()
            fullResponse += text
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`))
          }

          // Save complete response to DB
          const { data: mensajeGuardado } = await supabase
            .from('mensajes')
            .insert({
              conversacion_id,
              rol: 'assistant',
              contenido: fullResponse
            })
            .select()
            .single()

          // Update conversation timestamp
          await supabase
            .from('conversaciones')
            .update({ updated_at: new Date().toISOString() })
            .eq('id', conversacion_id)

          // Send final message with saved ID
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true, mensaje: mensajeGuardado })}\n\n`))
          controller.close()
        } catch (error) {
          console.error('Stream error:', error)
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'Error generando respuesta' })}\n\n`))
          controller.close()
        }
      }
    })

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Error en /api/chat:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

function getAgentesPermitidos(plan: string): TipoAgente[] {
  // During trial, all agents are available
  switch (plan) {
    case 'empresa': return ['general', 'financiero', 'ventas', 'marketing', 'rrhh', 'inventario', 'legal']
    case 'equipo': return ['general', 'financiero', 'ventas', 'marketing', 'rrhh', 'inventario', 'legal'] // They pick 3 but we allow all during setup
    case 'solo': return ['general']
    case 'free': return ['general', 'financiero', 'ventas', 'marketing', 'rrhh', 'inventario', 'legal'] // Trial gets all
    default: return ['general']
  }
}
