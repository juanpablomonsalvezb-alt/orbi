import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { mensaje_id, empresa_id, tipo } = body

    if (!mensaje_id || !empresa_id || !tipo) {
      return NextResponse.json({ error: 'mensaje_id, empresa_id y tipo son requeridos' }, { status: 400 })
    }

    if (!['positivo', 'negativo'].includes(tipo)) {
      return NextResponse.json({ error: 'tipo debe ser positivo o negativo' }, { status: 400 })
    }

    const supabase = getSupabase()

    const { data, error } = await supabase
      .from('feedback')
      .upsert(
        { mensaje_id, empresa_id, tipo },
        { onConflict: 'mensaje_id,empresa_id' }
      )
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ feedback: data })
  } catch {
    return NextResponse.json({ error: 'Error guardando feedback' }, { status: 500 })
  }
}
