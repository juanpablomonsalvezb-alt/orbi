import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// GET: list tasks for a company
export async function GET(request: NextRequest) {
  const empresaId = request.nextUrl.searchParams.get('empresa_id')
  const estado = request.nextUrl.searchParams.get('estado')

  if (!empresaId) {
    return NextResponse.json({ error: 'empresa_id requerido' }, { status: 400 })
  }

  const supabase = getSupabase()

  let query = supabase
    .from('tareas')
    .select('*')
    .eq('empresa_id', empresaId)
    .order('created_at', { ascending: false })

  if (estado) {
    query = query.eq('estado', estado)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ tareas: data })
}

// POST: create a new task
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { empresa_id, agente_tipo, titulo, descripcion, prioridad, fecha_limite, fuente_conversacion_id } = body

    if (!empresa_id || !agente_tipo || !titulo) {
      return NextResponse.json({ error: 'empresa_id, agente_tipo y titulo son requeridos' }, { status: 400 })
    }

    const supabase = getSupabase()

    const { data, error } = await supabase
      .from('tareas')
      .insert({
        empresa_id,
        agente_tipo,
        titulo,
        descripcion: descripcion || null,
        prioridad: prioridad || 'media',
        fecha_limite: fecha_limite || null,
        fuente_conversacion_id: fuente_conversacion_id || null,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ tarea: data })
  } catch {
    return NextResponse.json({ error: 'Error creando tarea' }, { status: 500 })
  }
}
