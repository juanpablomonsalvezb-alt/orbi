import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { buildSystemPrompt } from '@/lib/prompts'
import { enviarMensajeGemini, GeminiMessage } from '@/lib/gemini'

// Cliente Supabase con service role para API routes
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function POST(request: NextRequest) {
  try {
    const { mensaje, conversacion_id, empresa_id } = await request.json()

    // Validar campos requeridos
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
      return NextResponse.json(
        { error: 'Empresa no encontrada' },
        { status: 404 }
      )
    }

    // 2. Obtener contexto del onboarding
    const { data: contexto } = await supabase
      .from('contexto')
      .select('*')
      .eq('empresa_id', empresa_id)
      .order('orden', { ascending: true })

    // 3. Construir system prompt con el contexto del negocio
    const systemPrompt = buildSystemPrompt(empresa.nombre, contexto || [])

    // 4. Obtener historial de la conversación (últimos 20 mensajes para no exceder tokens)
    const { data: historialDB } = await supabase
      .from('mensajes')
      .select('rol, contenido')
      .eq('conversacion_id', conversacion_id)
      .order('created_at', { ascending: true })
      .limit(20)

    // Convertir historial al formato de Gemini
    const historial: GeminiMessage[] = (historialDB || []).map((msg) => ({
      role: msg.rol === 'user' ? 'user' : 'model',
      parts: [{ text: msg.contenido }]
    }))

    // 5. Enviar a Gemini y obtener respuesta
    const respuestaTexto = await enviarMensajeGemini(systemPrompt, historial, mensaje)

    // 6. Guardar respuesta del agente en Supabase
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
      return NextResponse.json(
        { error: 'Error guardando la respuesta' },
        { status: 500 }
      )
    }

    // 7. Actualizar timestamp de la conversación
    await supabase
      .from('conversaciones')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conversacion_id)

    // 8. Retornar respuesta del agente
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
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
