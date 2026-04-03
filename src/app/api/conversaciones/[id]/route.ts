import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// PATCH: rename conversation
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { titulo } = await request.json()

    if (!titulo || typeof titulo !== 'string') {
      return NextResponse.json({ error: 'titulo requerido' }, { status: 400 })
    }

    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('conversaciones')
      .update({ titulo: titulo.substring(0, 100) })
      .eq('id', id)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ conversacion: data })
  } catch {
    return NextResponse.json({ error: 'Error actualizando conversación' }, { status: 500 })
  }
}

// DELETE: delete conversation and its messages
export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = getSupabase()

    // Messages cascade on delete
    const { error } = await supabase
      .from('conversaciones')
      .delete()
      .eq('id', id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ deleted: true })
  } catch {
    return NextResponse.json({ error: 'Error eliminando conversación' }, { status: 500 })
  }
}
