import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyEmpresaAccess } from '@/lib/api-auth'
import { sendGroq } from '@/lib/groq'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

const SYSTEM_PROMPT = `Eres un experto en marketing para PYMEs latinoamericanas.
Dado un tema o mensaje central, genera 6 versiones adaptadas para cada canal.
Responde SOLO con un JSON válido con esta estructura exacta:
{
  "linkedin": "texto para linkedin (máx 1300 chars, profesional, con 3 emojis estratégicos, termina con pregunta o CTA)",
  "whatsapp": "texto para whatsapp (máx 400 chars, conversacional, como si fuera de un amigo, sin formatos raros)",
  "instagram": "caption para instagram (máx 300 chars, energético, 5 hashtags relevantes al final)",
  "facebook": "post para facebook (máx 500 chars, más narrativo, apela a comunidad y preguntas)",
  "reddit": "post para reddit (máx 600 chars, sin marketing directo, como consejo genuino, incluye el producto como ejemplo natural)",
  "email": "asunto|||cuerpo del email (separados por |||, asunto máx 60 chars, cuerpo máx 400 chars, tono directo y valor claro)"
}
El contexto del negocio es: somos Orbbi, plataforma de IA para PYMEs latinoamericanas, 7 agentes virtuales de gestión desde $29/mes.`

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { empresa_id, tema } = body as { empresa_id: string; tema: string }

    if (!empresa_id || !tema) {
      return NextResponse.json({ error: 'empresa_id y tema son requeridos' }, { status: 400 })
    }

    const hasAccess = await verifyEmpresaAccess(request, empresa_id)
    if (!hasAccess) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const respuesta = await sendGroq(SYSTEM_PROMPT, [], `Genera contenido para este tema: ${tema}`)

    // Parse the JSON response
    let versiones: Record<string, string>
    try {
      // Extract JSON from the response (sometimes LLMs add extra text)
      const jsonMatch = respuesta.match(/\{[\s\S]*\}/)
      if (!jsonMatch) throw new Error('No JSON found')
      versiones = JSON.parse(jsonMatch[0])
    } catch {
      return NextResponse.json({ error: 'Error al parsear respuesta del LLM' }, { status: 500 })
    }

    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('marketing_contenido')
      .insert({ empresa_id, tema, versiones })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ contenido: data })
  } catch (err) {
    console.error('[marketing/contenido POST]', err)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const empresa_id = searchParams.get('empresa_id')

    if (!empresa_id) {
      return NextResponse.json({ error: 'empresa_id es requerido' }, { status: 400 })
    }

    const hasAccess = await verifyEmpresaAccess(request, empresa_id)
    if (!hasAccess) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('marketing_contenido')
      .select('*')
      .eq('empresa_id', empresa_id)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ contenidos: data })
  } catch (err) {
    console.error('[marketing/contenido GET]', err)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const empresa_id = searchParams.get('empresa_id')

    if (!id || !empresa_id) {
      return NextResponse.json({ error: 'id y empresa_id son requeridos' }, { status: 400 })
    }

    const hasAccess = await verifyEmpresaAccess(request, empresa_id)
    if (!hasAccess) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const supabase = getSupabase()
    const { error } = await supabase
      .from('marketing_contenido')
      .delete()
      .eq('id', id)
      .eq('empresa_id', empresa_id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[marketing/contenido DELETE]', err)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
