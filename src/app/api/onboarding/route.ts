import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// GET: obtener respuestas del onboarding de una empresa
export async function GET(request: NextRequest) {
  const empresaId = request.nextUrl.searchParams.get('empresa_id')

  if (!empresaId) {
    return NextResponse.json({ error: 'empresa_id requerido' }, { status: 400 })
  }

  const supabase = getSupabase()

  const { data, error } = await supabase
    .from('contexto')
    .select('*')
    .eq('empresa_id', empresaId)
    .order('orden', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ contexto: data })
}
