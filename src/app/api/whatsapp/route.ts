import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
// Dynamic import for serverless compat
import type { TipoAgente } from '@/lib/prompts'
import { enviarMensajeGemini, GeminiMessage } from '@/lib/gemini'
import { sendWhatsAppMessage } from '@/lib/whatsapp'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

// ============================================
// GET — Verificación del webhook de Meta
// ============================================
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    console.log('WhatsApp webhook verificado correctamente')
    return new Response(challenge, { status: 200 })
  }

  return NextResponse.json({ error: 'Verificación fallida' }, { status: 403 })
}

// ============================================
// POST — Recepción de mensajes de WhatsApp
// ============================================
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Meta envía notificaciones de distintos tipos; solo procesamos mensajes
    const entry = body.entry?.[0]
    const changes = entry?.changes?.[0]
    const value = changes?.value

    // Verificar que es un mensaje de texto entrante
    if (!value?.messages?.[0]) {
      // Podría ser un status update u otra notificación — responder 200 para que Meta no reintente
      return NextResponse.json({ status: 'ok' })
    }

    const message = value.messages[0]
    const from = message.from // Número del remitente (formato: 521234567890)
    const messageText = message.text?.body

    // Solo procesamos mensajes de texto
    if (!messageText || message.type !== 'text') {
      return NextResponse.json({ status: 'ok' })
    }

    const supabase = getSupabase()

    // 1. Buscar empresa por número de teléfono
    const { data: empresa, error: errorEmpresa } = await supabase
      .from('empresas')
      .select('id, nombre')
      .eq('telefono', from)
      .single()

    if (errorEmpresa || !empresa) {
      // No encontrada — invitar a registrarse
      await sendWhatsAppMessage(
        from,
        'Regístrate en orbbi.com para usar este servicio. 🚀\n\nOrbbi es tu gerente virtual con IA — te ayuda a tomar mejores decisiones para tu negocio.'
      )
      return NextResponse.json({ status: 'ok' })
    }

    // 2. Buscar o crear conversación de WhatsApp para esta empresa
    let conversacionId: string

    const { data: conversacionExistente } = await supabase
      .from('conversaciones')
      .select('id')
      .eq('empresa_id', empresa.id)
      .eq('titulo', 'WhatsApp')
      .eq('agente_tipo', 'general')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (conversacionExistente) {
      conversacionId = conversacionExistente.id
    } else {
      const { data: nuevaConversacion, error: errorConv } = await supabase
        .from('conversaciones')
        .insert({
          empresa_id: empresa.id,
          titulo: 'WhatsApp',
          agente_tipo: 'general' as TipoAgente,
        })
        .select('id')
        .single()

      if (errorConv || !nuevaConversacion) {
        console.error('Error creando conversación WhatsApp:', errorConv)
        return NextResponse.json({ status: 'error' }, { status: 500 })
      }

      conversacionId = nuevaConversacion.id
    }

    // 3. Guardar mensaje del usuario
    await supabase.from('mensajes').insert({
      conversacion_id: conversacionId,
      rol: 'user',
      contenido: messageText,
    })

    // 4. Obtener contexto del onboarding
    const { data: contexto } = await supabase
      .from('contexto')
      .select('*')
      .eq('empresa_id', empresa.id)
      .order('orden', { ascending: true })

    // 5. Construir system prompt (Gerente General por defecto)
    let systemPrompt: string
    try {
      const mod = await import('@/lib/prompts-server')
      systemPrompt = await mod.buildSystemPromptWithRAG(empresa.nombre, contexto || [], 'general', messageText)
    } catch {
      const { buildSystemPrompt } = await import('@/lib/prompts')
      systemPrompt = buildSystemPrompt(empresa.nombre, contexto || [], 'general' as const, messageText)
    }

    // 6. Obtener historial (últimos 20 mensajes)
    const { data: historialDB } = await supabase
      .from('mensajes')
      .select('rol, contenido')
      .eq('conversacion_id', conversacionId)
      .order('created_at', { ascending: true })
      .limit(20)

    const historial: GeminiMessage[] = (historialDB || []).map((msg) => ({
      role: msg.rol === 'user' ? ('user' as const) : ('model' as const),
      parts: [{ text: msg.contenido }],
    }))

    // 7. Generar respuesta con Gemini
    const respuesta = await enviarMensajeGemini(systemPrompt, historial, messageText)

    // 8. Guardar respuesta del asistente
    await supabase.from('mensajes').insert({
      conversacion_id: conversacionId,
      rol: 'assistant',
      contenido: respuesta,
    })

    // 9. Actualizar timestamp de la conversación
    await supabase
      .from('conversaciones')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conversacionId)

    // 10. Enviar respuesta por WhatsApp
    await sendWhatsAppMessage(from, respuesta)

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('Error en /api/whatsapp:', error)
    // Siempre responder 200 a Meta para evitar reintentos infinitos
    return NextResponse.json({ status: 'error' })
  }
}
