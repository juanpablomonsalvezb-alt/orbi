import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const entry = {
      level: 'error',
      service: 'orbbi-web',
      message: body.message ?? 'Unknown error',
      stack: body.stack ?? null,
      context: body.context ?? {},
      url: body.url ?? null,
      timestamp: body.timestamp ?? new Date().toISOString(),
      receivedAt: new Date().toISOString(),
    }

    // Structured log — easy to pipe to LogFlare / Sentry / Datadog later
    console.error('[ORBBI Error Endpoint]', JSON.stringify(entry))

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 })
  }
}
