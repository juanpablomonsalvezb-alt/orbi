import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyEmpresaAccess } from '@/lib/api-auth'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// GET: get referral code and stats for empresa
export async function GET(request: NextRequest) {
  try {
    const empresaId = request.nextUrl.searchParams.get('empresa_id')
    if (!empresaId) return NextResponse.json({ error: 'empresa_id requerido' }, { status: 400 })

    const hasAccess = await verifyEmpresaAccess(request, empresaId)
    if (!hasAccess) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    const supabase = getSupabase()

    // Get empresa for referral code (use first 8 chars of ID)
    const { data: empresa } = await supabase
      .from('empresas')
      .select('id, nombre')
      .eq('id', empresaId)
      .single()

    if (!empresa) return NextResponse.json({ error: 'Empresa no encontrada' }, { status: 404 })

    const refCode = empresa.id.substring(0, 8)
    const refLink = `${process.env.NEXT_PUBLIC_APP_URL}/registro?ref=${refCode}`

    // Count referrals (empresas where nombre contains ref code — simplified)
    // In production, use a proper referrals table

    return NextResponse.json({
      code: refCode,
      link: refLink,
      empresa: empresa.nombre,
    })
  } catch {
    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}
