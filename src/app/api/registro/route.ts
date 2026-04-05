import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Uses service role key to bypass RLS for registration
function getServiceSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Verify the auth token from the request and return the real user_id
async function getVerifiedUserId(request: NextRequest): Promise<string | null> {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader?.startsWith('Bearer ')) return null
  const token = authHeader.slice(7)

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) return null
  return user.id
}

export async function POST(request: NextRequest) {
  try {
    const { nombre, email } = await request.json()

    if (!nombre || !email) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    // Verify the caller is the authenticated user — never trust client-provided user_id
    const user_id = await getVerifiedUserId(request)
    if (!user_id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const supabase = getServiceSupabase()
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
