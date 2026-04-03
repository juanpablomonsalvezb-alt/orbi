import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware simplified: let client-side handle auth verification
// The dashboard layout already checks auth and redirects if needed
// This middleware only adds security headers
export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')

  return response
}

export const config = {
  matcher: ['/chat/:path*', '/onboarding/:path*', '/dashboard/:path*', '/tareas/:path*', '/equipo/:path*']
}
