import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { TipoAgente } from '@/lib/prompts'
import { streamGroq } from '@/lib/groq'
// Dynamic import for serverless compat
import { verifyEmpresaAccess } from '@/lib/api-auth'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

/**
 * Generates the agent's proactive first message for a new conversation.
 * The agent introduces itself, references business data from onboarding,
 * and proposes what to work on — like a real consultant arriving prepared.
 */
export async function POST(request: NextRequest) {
  try {
    const { conversacion_id, empresa_id, agente_tipo, estilo } = await request.json()

    if (!conversacion_id || !empresa_id) {
      return NextResponse.json({ error: 'Faltan campos' }, { status: 400 })
    }

    // Verify the authenticated user owns this empresa
    const hasAccess = await verifyEmpresaAccess(request, empresa_id)
    if (!hasAccess) {
      return NextResponse.json({ error: 'Tu sesión expiró. Recarga la página.' }, { status: 401 })
    }

    const supabase = getSupabase()

    // Get empresa + onboarding context
    const { data: empresa } = await supabase
      .from('empresas')
      .select('nombre')
      .eq('id', empresa_id)
      .single()

    if (!empresa) {
      return NextResponse.json({ error: 'No encontramos tu empresa. Intenta cerrar sesión y volver a entrar.' }, { status: 404 })
    }

    const { data: contexto } = await supabase
      .from('contexto')
      .select('*')
      .eq('empresa_id', empresa_id)
      .order('orden', { ascending: true })

    const tipo = (agente_tipo || 'general') as TipoAgente
    let systemPrompt: string
    try {
      const mod = await import('@/lib/prompts-server')
      systemPrompt = await mod.buildSystemPromptWithRAG(
        empresa.nombre, contexto || [], tipo,
        'saludo inicial', '', estilo || 'directo', empresa_id
      )
    } catch {
      const { buildSystemPrompt } = await import('@/lib/prompts')
      systemPrompt = buildSystemPrompt(
        empresa.nombre, contexto || [], tipo,
        'saludo inicial', '', estilo || 'directo'
      )
    }

    // Special prompt — VERY short, like a consultant's opening line
    const firstMessagePrompt = `Primera interacción con ${empresa.nombre}. Saluda en MÁXIMO 2-3 oraciones cortas:
- Menciona UN dato concreto de su negocio que ya conoces
- Haz UNA pregunta directa sobre lo más urgente

NO más de 40 palabras total. NO te presentes. NO hagas listas. NO digas "¿en qué puedo ayudarte?". Solo el dato + la pregunta.

Ejemplo: "Vi que tu mayor dolor es no saber cuánto ganas realmente. ¿Tienes desglose de costos por producto o trabajas con un número general?"

Así de corto.`

    // Stream the first message
    const groqStream = await streamGroq(systemPrompt, [], firstMessagePrompt)

    let fullResponse = ''
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          const reader = groqStream.getReader()
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            const chunk = decoder.decode(value, { stream: true })
            for (const line of chunk.split('\n')) {
              if (line.startsWith('data: ') && line !== 'data: [DONE]') {
                try {
                  const data = JSON.parse(line.slice(6))
                  const text = data.choices?.[0]?.delta?.content || ''
                  if (text) {
                    fullResponse += text
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`))
                  }
                } catch { /* skip */ }
              }
            }
          }

          // Save to DB after streaming completes
          const { data: mensajeGuardado } = await supabase
            .from('mensajes')
            .insert({ conversacion_id, rol: 'assistant', contenido: fullResponse })
            .select().single()

          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true, mensaje: mensajeGuardado })}\n\n`))
          controller.close()
        } catch (err) {
          console.error('First message stream error:', err)
          controller.close()
        }
      }
    })

    return new Response(readableStream, {
      headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
    })
  } catch (error) {
    console.error('Error generating first message:', error)
    return NextResponse.json({ error: 'Nuestros servidores están ocupados. Intenta en unos segundos.' }, { status: 500 })
  }
}
