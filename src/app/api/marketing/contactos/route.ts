import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyEmpresaAccess } from '@/lib/api-auth'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const empresa_id = searchParams.get('empresa_id')
    const estado = searchParams.get('estado')

    if (!empresa_id) {
      return NextResponse.json({ error: 'empresa_id es requerido' }, { status: 400 })
    }

    const hasAccess = await verifyEmpresaAccess(request, empresa_id)
    if (!hasAccess) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const supabase = getSupabase()
    let query = supabase
      .from('marketing_contactos')
      .select('*')
      .eq('empresa_id', empresa_id)
      .order('created_at', { ascending: false })

    if (estado) {
      query = query.eq('estado', estado)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ contactos: data })
  } catch (err) {
    console.error('[marketing/contactos GET]', err)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { empresa_id, ...campos } = body as {
      empresa_id: string
      nombre: string
      cargo?: string
      empresa_nombre?: string
      canal?: string
      telefono?: string
      email?: string
      linkedin_url?: string
      estado?: string
      notas?: string
      proximo_contacto?: string
      clientes_potenciales?: number
    }

    if (!empresa_id || !campos.nombre) {
      return NextResponse.json({ error: 'empresa_id y nombre son requeridos' }, { status: 400 })
    }

    const hasAccess = await verifyEmpresaAccess(request, empresa_id)
    if (!hasAccess) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('marketing_contactos')
      .insert({ empresa_id, ...campos })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ contacto: data })
  } catch (err) {
    console.error('[marketing/contactos POST]', err)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, empresa_id, ...updates } = body as {
      id: string
      empresa_id: string
      estado?: string
      notas?: string
      proximo_contacto?: string
      [key: string]: unknown
    }

    if (!id || !empresa_id) {
      return NextResponse.json({ error: 'id y empresa_id son requeridos' }, { status: 400 })
    }

    const hasAccess = await verifyEmpresaAccess(request, empresa_id)
    if (!hasAccess) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('marketing_contactos')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('empresa_id', empresa_id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ contacto: data })
  } catch (err) {
    console.error('[marketing/contactos PATCH]', err)
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
      .from('marketing_contactos')
      .delete()
      .eq('id', id)
      .eq('empresa_id', empresa_id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[marketing/contactos DELETE]', err)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
