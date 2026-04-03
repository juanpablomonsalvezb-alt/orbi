import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect dashboard routes
  if (!pathname.startsWith('/chat') && !pathname.startsWith('/onboarding')) {
    return NextResponse.next()
  }

  // Check for Supabase auth token in cookies
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  const accessToken = request.cookies.get('sb-access-token')?.value
    || request.cookies.get(`sb-${new URL(supabaseUrl).hostname.split('.')[0]}-auth-token`)?.value

  // If no auth cookie found, check all cookies for supabase auth
  let isAuthenticated = false

  if (accessToken) {
    try {
      const parsed = JSON.parse(accessToken)
      if (parsed?.access_token) {
        const supabase = createClient(supabaseUrl, supabaseKey, {
          global: { headers: { Authorization: `Bearer ${parsed.access_token}` } }
        })
        const { data: { user } } = await supabase.auth.getUser(parsed.access_token)
        isAuthenticated = !!user
      }
    } catch {
      // Token parse failed, try as raw token
      const supabase = createClient(supabaseUrl, supabaseKey)
      const { data: { user } } = await supabase.auth.getUser(accessToken)
      isAuthenticated = !!user
    }
  }

  // Also check for auth in all cookies (Supabase stores differently per version)
  if (!isAuthenticated) {
    for (const [name, cookie] of request.cookies) {
      if (name.includes('auth-token') || name.includes('supabase')) {
        try {
          const parsed = typeof cookie.value === 'string' && cookie.value.startsWith('{')
            ? JSON.parse(cookie.value)
            : null
          if (parsed?.access_token) {
            const supabase = createClient(supabaseUrl, supabaseKey)
            const { data: { user } } = await supabase.auth.getUser(parsed.access_token)
            if (user) {
              isAuthenticated = true
              break
            }
          }
        } catch {
          continue
        }
      }
    }
  }

  if (!isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/chat/:path*', '/onboarding/:path*']
}
