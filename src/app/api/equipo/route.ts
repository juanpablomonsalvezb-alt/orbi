import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { enviarEmailInvitacion } from '@/lib/resend'
import { getAuthEmpresa } from '@/lib/api-auth'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// GET: list team members for the authenticated user's empresa
export async function GET(request: NextRequest) {
  try {
    // Verify auth using the Authorization header token
    const auth = await getAuthEmpresa(request)
    if (!auth) {
      return NextResponse.json({ error: 'Tu sesión expiró. Recarga la página.' }, { status: 401 })
    }

    const supabase = getSupabase()

    // Get empresa name
    const { data: empresa, error: empresaError } = await supabase
      .from('empresas')
      .select('id, nombre')
      .eq('id', auth.empresaId)
      .single()

    if (empresaError || !empresa) {
      return NextResponse.json({ error: 'No encontramos tu empresa. Intenta cerrar sesión y volver a entrar.' }, { status: 404 })
    }

    // Get team members
    const { data: miembros, error: miembrosError } = await supabase
      .from('empresa_usuarios')
      .select('id, email, rol, created_at')
      .eq('empresa_id', auth.empresaId)
      .order('created_at', { ascending: true })

    if (miembrosError) {
      return NextResponse.json({ error: miembrosError.message }, { status: 500 })
    }

    return NextResponse.json({ miembros: miembros || [] })
  } catch {
    return NextResponse.json({ error: 'Error obteniendo equipo' }, { status: 500 })
  }
}

// POST: invite a new team member
export async function POST(request: NextRequest) {
  try {
    const { email, rol } = await request.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email requerido' }, { status: 400 })
    }

    if (!rol || !['admin', 'miembro'].includes(rol)) {
      return NextResponse.json({ error: 'Rol inválido' }, { status: 400 })
    }

    // Verify auth using the Authorization header token
    const auth = await getAuthEmpresa(request)
    if (!auth) {
      return NextResponse.json({ error: 'Tu sesión expiró. Recarga la página.' }, { status: 401 })
    }

    const supabase = getSupabase()

    // Get empresa
    const { data: empresa, error: empresaError } = await supabase
      .from('empresas')
      .select('id, nombre, email')
      .eq('id', auth.empresaId)
      .single()

    if (empresaError || !empresa) {
      return NextResponse.json({ error: 'No encontramos tu empresa. Intenta cerrar sesión y volver a entrar.' }, { status: 404 })
    }

    // Check if already invited
    const { data: existente } = await supabase
      .from('empresa_usuarios')
      .select('id')
      .eq('empresa_id', empresa.id)
      .eq('email', email.toLowerCase())
      .single()

    if (existente) {
      return NextResponse.json({ error: 'Este email ya fue invitado' }, { status: 409 })
    }

    // Create invitation
    const { data: miembro, error: insertError } = await supabase
      .from('empresa_usuarios')
      .insert({
        empresa_id: empresa.id,
        email: email.toLowerCase(),
        rol,
      })
      .select()
      .single()

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    // Send invitation email
    await enviarEmailInvitacion(email.toLowerCase(), empresa.nombre, empresa.email || '')

    return NextResponse.json({ miembro })
  } catch {
    return NextResponse.json({ error: 'Error invitando miembro' }, { status: 500 })
  }
}
