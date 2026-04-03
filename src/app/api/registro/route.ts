import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Uses service role key to bypass RLS for registration
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function POST(request: NextRequest) {
  try {
    const { user_id, nombre, email } = await request.json()

    if (!user_id || !nombre || !email) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    const supabase = getSupabase()
    const trialEndsAt = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString()

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
