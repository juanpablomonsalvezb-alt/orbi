import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

// Cliente de Supabase para uso en server (API Routes, Server Components)
export async function createServerClient() {
  const cookieStore = await cookies()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  return createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        cookie: cookieStore.toString()
      }
    }
  })
}
