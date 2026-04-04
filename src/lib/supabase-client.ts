import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _supabase: SupabaseClient | null = null

function getSupabaseClient(): SupabaseClient {
  if (_supabase) return _supabase

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    // During build/SSR without env vars, return a dummy client
    // It will fail on actual calls but won't crash at import time
    _supabase = createClient('https://placeholder.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MjAwMDAwMDAwMH0.dW1tbXk')
    return _supabase
  }

  _supabase = createClient(url, key)
  return _supabase
}

// Export a proxy that lazily initializes
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabaseClient() as Record<string | symbol, unknown>)[prop]
  }
})
