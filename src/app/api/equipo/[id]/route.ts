import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getAuthEmpresa } from '@/lib/api-auth'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// DELETE: remove a team member
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Verify auth: user must own the empresa
    const auth = await getAuthEmpresa(request)
    if (!auth) {
      return NextResponse.json({ error: 'Tu sesión expiró. Recarga la página.' }, { status: 401 })
    }

    const supabase = getSupabase()

    // Only delete if the member belongs to the user's empresa
    const { error } = await supabase
      .from('empresa_usuarios')
      .delete()
      .eq('id', id)
      .eq('empresa_id', auth.empresaId)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ deleted: true })
  } catch {
    return NextResponse.json({ error: 'Error eliminando miembro' }, { status: 500 })
  }
}
