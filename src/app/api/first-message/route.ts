import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { TipoAgente } from '@/lib/prompts'
import { sendGroq, GroqMessage } from '@/lib/groq'
import { buildSystemPromptWithRAG } from '@/lib/prompts-server'

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

    const supabase = getSupabase()

    // Get empresa + onboarding context
    const { data: empresa } = await supabase
      .from('empresas')
      .select('nombre')
      .eq('id', empresa_id)
      .single()

    if (!empresa) {
      return NextResponse.json({ error: 'Empresa no encontrada' }, { status: 404 })
    }

    const { data: contexto } = await supabase
      .from('contexto')
      .select('*')
      .eq('empresa_id', empresa_id)
      .order('orden', { ascending: true })

    const tipo = (agente_tipo || 'general') as TipoAgente
    const systemPrompt = await buildSystemPromptWithRAG(
      empresa.nombre, contexto || [], tipo,
      'saludo inicial', '', estilo || 'directo', empresa_id
    )

    // Special prompt for the first message
    const firstMessagePrompt = `Esta es tu PRIMERA interacción con el dueño de ${empresa.nombre}.
No esperes a que te pregunte — tú inicias la conversación como un consultor que acaba de revisar el expediente del cliente.

INSTRUCCIONES PARA TU MENSAJE INICIAL:
1. Saluda brevemente por el nombre de la empresa (no genérico)
2. Menciona 1-2 datos específicos que ya conoces de su negocio (del onboarding)
3. Identifica el punto más crítico o interesante que detectas
4. Propón 2-3 temas concretos para trabajar hoy, basados en lo que sabes
5. Termina con una pregunta directa que invite a profundizar

NO digas "¿en qué puedo ayudarte?" — eso es genérico.
NO te presentes como IA ni como chatbot.
Actúa como si fueras un consultor que llega a una reunión preparado.

Máximo 150 palabras. Sé específico, no genérico.`

    const response = await sendGroq(systemPrompt, [], firstMessagePrompt)

    // Save the first message to DB
    const { data: mensajeGuardado } = await supabase
      .from('mensajes')
      .insert({
        conversacion_id,
        rol: 'assistant',
        contenido: response,
      })
      .select()
      .single()

    return NextResponse.json({ mensaje: mensajeGuardado })
  } catch (error) {
    console.error('Error generating first message:', error)
    return NextResponse.json({ error: 'Error generando mensaje inicial' }, { status: 500 })
  }
}
