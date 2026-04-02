import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { buildSystemPrompt, TipoAgente } from '@/lib/prompts'
import { enviarMensajeGemini, GeminiMessage } from '@/lib/gemini'

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

    const supabase = getSupabase()

    // 1. Obtener datos de la empresa
    const { data: empresa, error: errorEmpresa } = await supabase
      .from('empresas')
      .select('nombre')
      .eq('id', empresa_id)
      .single()

    if (errorEmpresa || !empresa) {
      return NextResponse.json({ error: 'Empresa no encontrada' }, { status: 404 })
    }

    // 2. Obtener tipo de agente de la conversación
    const { data: conversacion } = await supabase
      .from('conversaciones')
      .select('agente_tipo')
      .eq('id', conversacion_id)
      .single()

    const agenteTipo = (conversacion?.agente_tipo || 'general') as TipoAgente

    // 3. Obtener contexto del onboarding
    const { data: contexto } = await supabase
      .from('contexto')
      .select('*')
      .eq('empresa_id', empresa_id)
      .order('orden', { ascending: true })

    // 4. Construir system prompt con contexto del negocio + tipo de agente
    const systemPrompt = buildSystemPrompt(empresa.nombre, contexto || [], agenteTipo)

    // 5. Obtener historial (últimos 20 mensajes)
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

    // 6. Enviar a Gemini
    const respuestaTexto = await enviarMensajeGemini(systemPrompt, historial, mensaje)

    // 7. Guardar respuesta
    const { data: mensajeGuardado, error: errorGuardar } = await supabase
      .from('mensajes')
      .insert({
        conversacion_id,
        rol: 'assistant',
        contenido: respuestaTexto
      })
      .select()
      .single()

    if (errorGuardar) {
      console.error('Error guardando respuesta:', errorGuardar)
      return NextResponse.json({ error: 'Error guardando la respuesta' }, { status: 500 })
    }

    // 8. Actualizar timestamp
    await supabase
      .from('conversaciones')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conversacion_id)

    return NextResponse.json({
      mensaje: {
        id: mensajeGuardado.id,
        rol: mensajeGuardado.rol,
        contenido: mensajeGuardado.contenido,
        created_at: mensajeGuardado.created_at
      }
    })
  } catch (error) {
    console.error('Error en /api/chat:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
