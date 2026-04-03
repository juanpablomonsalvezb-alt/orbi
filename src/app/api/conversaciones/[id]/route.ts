import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getAuthEmpresa } from '@/lib/api-auth'

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

    // Verify auth: user must own the empresa that owns this conversation
    const auth = await getAuthEmpresa(request)
    if (!auth) {
      return NextResponse.json({ error: 'Tu sesión expiró. Recarga la página.' }, { status: 401 })
    }

    const supabase = getSupabase()

    // Only update if the conversation belongs to the user's empresa
    const { data, error } = await supabase
      .from('conversaciones')
      .update({ titulo: titulo.substring(0, 100) })
      .eq('id', id)
      .eq('empresa_id', auth.empresaId)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ conversacion: data })
  } catch {
    return NextResponse.json({ error: 'Error actualizando conversación' }, { status: 500 })
  }
}

// DELETE: delete conversation and its messages
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Verify auth: user must own the empresa that owns this conversation
    const auth = await getAuthEmpresa(request)
    if (!auth) {
      return NextResponse.json({ error: 'Tu sesión expiró. Recarga la página.' }, { status: 401 })
    }

    const supabase = getSupabase()

    // Only delete if the conversation belongs to the user's empresa
    const { error } = await supabase
      .from('conversaciones')
      .delete()
      .eq('id', id)
      .eq('empresa_id', auth.empresaId)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ deleted: true })
  } catch {
    return NextResponse.json({ error: 'Error eliminando conversación' }, { status: 500 })
  }
}
