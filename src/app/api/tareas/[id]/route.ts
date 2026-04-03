import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getAuthEmpresa } from '@/lib/api-auth'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// PATCH: update task status/details
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()

    // Verify auth: user must own the empresa that owns this task
    const auth = await getAuthEmpresa(request)
    if (!auth) {
      return NextResponse.json({ error: 'Tu sesión expiró. Recarga la página.' }, { status: 401 })
    }

    const allowedFields = ['estado', 'titulo', 'descripcion', 'prioridad', 'fecha_limite']
    const updates: Record<string, unknown> = {}

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = body[field]
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No hay campos para actualizar' }, { status: 400 })
    }

    const supabase = getSupabase()

    // Only update if the task belongs to the user's empresa
    const { data, error } = await supabase
      .from('tareas')
      .update(updates)
      .eq('id', id)
      .eq('empresa_id', auth.empresaId)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ tarea: data })
  } catch {
    return NextResponse.json({ error: 'Error actualizando tarea' }, { status: 500 })
  }
}

// DELETE: delete a task
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Verify auth: user must own the empresa that owns this task
    const auth = await getAuthEmpresa(request)
    if (!auth) {
      return NextResponse.json({ error: 'Tu sesión expiró. Recarga la página.' }, { status: 401 })
    }

    const supabase = getSupabase()

    // Only delete if the task belongs to the user's empresa
    const { error } = await supabase
      .from('tareas')
      .delete()
      .eq('id', id)
      .eq('empresa_id', auth.empresaId)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ deleted: true })
  } catch {
    return NextResponse.json({ error: 'Error eliminando tarea' }, { status: 500 })
  }
}
