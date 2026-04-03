import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { enviarEmailTrialExpira } from '@/lib/resend'

// This endpoint should be called by a cron job (e.g., Vercel Cron) every hour
// It sends reminder emails to users whose trial is about to expire

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const now = new Date()
  const in12Hours = new Date(now.getTime() + 12 * 60 * 60 * 1000)
  const in2Hours = new Date(now.getTime() + 2 * 60 * 60 * 1000)

  // Find users whose trial expires in the next 12 hours (but hasn't expired yet)
  const { data: empresas12h } = await supabase
    .from('empresas')
    .select('email, nombre, trial_ends_at')
    .eq('plan', 'free')
    .eq('subscription_status', 'trialing')
    .lte('trial_ends_at', in12Hours.toISOString())
    .gt('trial_ends_at', now.toISOString())

  let emailsSent = 0

  if (empresas12h) {
    for (const empresa of empresas12h) {
      const trialEndsAt = new Date(empresa.trial_ends_at)
      const hoursLeft = Math.round((trialEndsAt.getTime() - now.getTime()) / (1000 * 60 * 60))

      // Send at 12h and 2h marks
      if (hoursLeft <= 2 || (hoursLeft >= 11 && hoursLeft <= 13)) {
        await enviarEmailTrialExpira(empresa.email, empresa.nombre, hoursLeft)
        emailsSent++
      }
    }
  }

  return NextResponse.json({
    ok: true,
    emailsSent,
    checked: empresas12h?.length || 0,
    timestamp: now.toISOString(),
  })
}
