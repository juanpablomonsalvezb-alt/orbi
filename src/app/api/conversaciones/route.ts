import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// GET: listar conversaciones de una empresa
export async function GET(request: NextRequest) {
  const empresaId = request.nextUrl.searchParams.get('empresa_id')

  if (!empresaId) {
    return NextResponse.json({ error: 'empresa_id requerido' }, { status: 400 })
  }

  const supabase = getSupabase()

  const { data, error } = await supabase
    .from('conversaciones')
    .select('*')
    .eq('empresa_id', empresaId)
    .order('updated_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ conversaciones: data })
}

// POST: crear nueva conversación con agente específico
export async function POST(request: NextRequest) {
  const { empresa_id, titulo, agente_tipo } = await request.json()

  if (!empresa_id) {
    return NextResponse.json({ error: 'empresa_id requerido' }, { status: 400 })
  }

  const supabase = getSupabase()

  const { data, error } = await supabase
    .from('conversaciones')
    .insert({
      empresa_id,
      titulo: titulo || 'Nueva conversación',
      agente_tipo: agente_tipo || 'general',
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ conversacion: data })
}
