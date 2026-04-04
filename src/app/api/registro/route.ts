import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Uses service role key to bypass RLS for registration
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  console.log('Supabase URL:', url ? url.substring(0, 30) + '...' : 'MISSING')
  console.log('Supabase Key:', key ? key.substring(0, 20) + '...' : 'MISSING')
  if (!url || !key) throw new Error(`Missing env vars: URL=${!!url}, KEY=${!!key}`)
  return createClient(url, key)
}

export async function POST(request: NextRequest) {
  try {
    const { user_id, nombre, email } = await request.json()

    if (!user_id || !nombre || !email) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    const supabase = getSupabase()
    const trialEndsAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()

    const { data, error } = await supabase.from('empresas').insert({
      user_id,
      nombre,
      email,
      onboarding_completado: false,
      plan: 'free',
      trial_ends_at: trialEndsAt,
      subscription_status: 'trialing',
    }).select().single()

    if (error) {
      console.error('Error registrando empresa:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ empresa: data })
  } catch (error) {
    console.error('Error en /api/registro:', error)
    return NextResponse.json({ error: 'Nuestros servidores están ocupados. Intenta en unos segundos.' }, { status: 500 })
  }
}
