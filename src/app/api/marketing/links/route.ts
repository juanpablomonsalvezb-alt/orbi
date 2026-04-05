import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyEmpresaAccess } from '@/lib/api-auth'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { empresa_id, nombre, url_destino, utm_source, utm_medium, utm_campaign } = body as {
      empresa_id: string
      nombre: string
      url_destino: string
      utm_source?: string
      utm_medium?: string
      utm_campaign?: string
    }

    if (!empresa_id || !nombre || !url_destino) {
      return NextResponse.json({ error: 'empresa_id, nombre y url_destino son requeridos' }, { status: 400 })
    }

    const hasAccess = await verifyEmpresaAccess(request, empresa_id)
    if (!hasAccess) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const slug = Math.random().toString(36).substring(2, 8)

    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('marketing_links')
      .insert({
        empresa_id,
        nombre,
        url_destino,
        utm_source: utm_source || '',
        utm_medium: utm_medium || '',
        utm_campaign: utm_campaign || '',
        slug,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ link: data })
  } catch (err) {
    console.error('[marketing/links POST]', err)
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
      .from('marketing_links')
      .select('*')
      .eq('empresa_id', empresa_id)
      .order('clics', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ links: data })
  } catch (err) {
    console.error('[marketing/links GET]', err)
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
      .from('marketing_links')
      .delete()
      .eq('id', id)
      .eq('empresa_id', empresa_id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[marketing/links DELETE]', err)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
