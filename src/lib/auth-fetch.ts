import { supabase } from '@/lib/supabase-client'

/**
 * Wrapper around fetch that automatically adds the Supabase auth token
 * to the Authorization header. Use this for all API calls that require
 * authentication.
 */
export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const { data: { session } } = await supabase.auth.getSession()
  const token = session?.access_token || ''

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    },
  })
}
