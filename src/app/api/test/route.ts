import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    ok: true,
    env: {
      supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'MISSING',
      supabase_anon: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'MISSING',
      supabase_service: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'MISSING',
      openrouter: process.env.OPENROUTER_API_KEY ? 'SET' : 'MISSING',
      groq: process.env.GROQ_API_KEY ? 'SET' : 'MISSING',
    }
  })
}
