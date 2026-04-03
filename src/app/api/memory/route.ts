import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { enviarMensajeGemini } from '@/lib/gemini'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

const EXTRACTION_PROMPT = `Analiza este mensaje de un agente de negocios y extrae SOLO datos concretos, decisiones tomadas, o hechos relevantes del negocio.
NO extraigas consejos genéricos ni recomendaciones teóricas.
Solo extrae si el usuario CONFIRMÓ un dato o tomó una decisión.

Formato de respuesta (JSON array):
[
  {"categoria": "dato|decision|alerta|meta", "contenido": "texto corto y concreto"}
]

Si no hay nada concreto que extraer, responde: []`

/**
 * POST /api/memory — Extract memories from a conversation message
 */
export async function POST(request: NextRequest) {
  try {
    const { message, userMessage, empresa_id, agente_tipo, conversacion_id } = await request.json()

    if (!message || !empresa_id || !agente_tipo) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    const prompt = `${EXTRACTION_PROMPT}

Mensaje del agente:
${message}

Contexto del usuario:
${userMessage || ''}`

    // Use Gemini to extract memories
    const response = await enviarMensajeGemini(
      'Eres un extractor de datos. Solo respondes con JSON arrays válidos. Sin markdown, sin explicaciones.',
      [],
      prompt
    )

    // Parse the JSON response
    let memories: { categoria: string; contenido: string }[] = []
    try {
      // Clean potential markdown code blocks
      const cleaned = response.replace(/```json?\s*/g, '').replace(/```\s*/g, '').trim()
      const parsed = JSON.parse(cleaned)
      if (Array.isArray(parsed)) {
        memories = parsed.filter(
          (m: { categoria?: string; contenido?: string }) =>
            m.categoria &&
            m.contenido &&
            ['dato', 'decision', 'alerta', 'meta', 'tarea'].includes(m.categoria)
        )
      }
    } catch {
      // Gemini returned non-JSON or empty — nothing to extract
      return NextResponse.json({ extracted: 0 })
    }

    if (memories.length === 0) {
      return NextResponse.json({ extracted: 0 })
    }

    // Save to Supabase
    const supabase = getSupabase()
    const rows = memories.map((m) => ({
      empresa_id,
      agente_tipo,
      categoria: m.categoria,
      contenido: m.contenido,
      fuente_conversacion_id: conversacion_id || null,
      activa: true,
    }))

    const { error } = await supabase.from('memorias').insert(rows)

    if (error) {
      console.error('Error saving memories:', error)
      return NextResponse.json({ error: 'Error guardando memorias' }, { status: 500 })
    }

    return NextResponse.json({ extracted: memories.length })
  } catch (error) {
    console.error('Error en /api/memory POST:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

/**
 * GET /api/memory — Retrieve active memories for an empresa
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const empresaId = searchParams.get('empresa_id')

    if (!empresaId) {
      return NextResponse.json({ error: 'empresa_id requerido' }, { status: 400 })
    }

    const supabase = getSupabase()

    const { data, error } = await supabase
      .from('memorias')
      .select('*')
      .eq('empresa_id', empresaId)
      .eq('activa', true)
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      console.error('Error fetching memories:', error)
      return NextResponse.json({ error: 'Error obteniendo memorias' }, { status: 500 })
    }

    return NextResponse.json({ memorias: data })
  } catch (error) {
    console.error('Error en /api/memory GET:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
