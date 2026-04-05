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
  const { searchParams } = new URL(request.url)
  const empresa_id = searchParams.get('empresa_id')
  const tipo = searchParams.get('tipo') // 'campanas' | 'prospectos' | 'enviados'

  if (!empresa_id) return NextResponse.json({ error: 'empresa_id requerido' }, { status: 400 })

  const hasAccess = await verifyEmpresaAccess(request, empresa_id)
  if (!hasAccess) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const supabase = getSupabase()

  if (tipo === 'prospectos') {
    const pais = searchParams.get('pais')
    const tipoOrg = searchParams.get('tipo_org')

    let query = supabase.from('marketing_prospectos_latam').select('*').eq('activo', true)
    if (pais) query = query.eq('pais', pais)
    if (tipoOrg) query = query.eq('tipo', tipoOrg)

    const { data, error } = await query.order('pais').order('nombre')
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ prospectos: data })
  }

  if (tipo === 'enviados') {
    const campana_id = searchParams.get('campana_id')
    let query = supabase.from('marketing_emails_enviados').select('*').eq('empresa_id', empresa_id)
    if (campana_id) query = query.eq('campana_id', campana_id)

    const { data, error } = await query.order('created_at', { ascending: false })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ enviados: data })
  }

  // Default: list campaigns
  const { data, error } = await supabase
    .from('marketing_campanas_email')
    .select('*')
    .eq('empresa_id', empresa_id)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ campanas: data })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { empresa_id, nombre, tipo, asunto, cuerpo_html, cuerpo_texto } = body as {
    empresa_id: string
    nombre: string
    tipo: string
    asunto: string
    cuerpo_html: string
    cuerpo_texto?: string
  }

  if (!empresa_id || !nombre || !asunto || !cuerpo_html) {
    return NextResponse.json({ error: 'empresa_id, nombre, asunto y cuerpo_html son requeridos' }, { status: 400 })
  }

  const hasAccess = await verifyEmpresaAccess(request, empresa_id)
  if (!hasAccess) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('marketing_campanas_email')
    .insert({ empresa_id, nombre, tipo: tipo || 'gremio', asunto, cuerpo_html, cuerpo_texto: cuerpo_texto || '' })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ campana: data })
}

export async function PATCH(request: NextRequest) {
  const body = await request.json()
  const { id, empresa_id, ...updates } = body as { id: string; empresa_id: string; [key: string]: unknown }

  if (!id || !empresa_id) return NextResponse.json({ error: 'id y empresa_id requeridos' }, { status: 400 })

  const hasAccess = await verifyEmpresaAccess(request, empresa_id)
  if (!hasAccess) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('marketing_campanas_email')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('empresa_id', empresa_id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ campana: data })
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const empresa_id = searchParams.get('empresa_id')

  if (!id || !empresa_id) return NextResponse.json({ error: 'id y empresa_id requeridos' }, { status: 400 })

  const hasAccess = await verifyEmpresaAccess(request, empresa_id)
  if (!hasAccess) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const supabase = getSupabase()
  const { error } = await supabase
    .from('marketing_campanas_email')
    .delete()
    .eq('id', id)
    .eq('empresa_id', empresa_id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
