import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import {
  enviarEmailReengagement,
  enviarEmailOnboardingIncompleto,
  enviarEmailTrialExpira,
} from '@/lib/resend'

// Daily proactive alerts cron — runs at 15:00 UTC (11-12 PM Chile)
// Checks re-engagement, onboarding completion, and trial expiration

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
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000)

  const stats = {
    reengagement: 0,
    onboardingIncompleto: 0,
    trialExpiring: 0,
    errors: 0,
  }

  try {
    // 1. Re-engagement: users who haven't chatted in 3+ days
    const { data: empresasActivas } = await supabase
      .from('empresas')
      .select('id, email, nombre')
      .in('plan', ['free', 'starter', 'pro', 'enterprise'])
      .in('subscription_status', ['trialing', 'active'])

    if (empresasActivas) {
      for (const empresa of empresasActivas) {
        try {
          // Check last conversation activity
          const { data: ultimaConv } = await supabase
            .from('conversaciones')
            .select('created_at')
            .eq('empresa_id', empresa.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single()

          const ultimaActividad = ultimaConv?.created_at
            ? new Date(ultimaConv.created_at)
            : null

          if (!ultimaActividad || ultimaActividad < threeDaysAgo) {
            await enviarEmailReengagement(empresa.email, empresa.nombre)
            stats.reengagement++
          }
        } catch {
          stats.errors++
        }
      }
    }

    // 2. Onboarding incompleto: created 24h+ ago, onboarding not done
    const { data: empresasSinOnboarding } = await supabase
      .from('empresas')
      .select('id, email, nombre, created_at')
      .eq('onboarding_completado', false)
      .lte('created_at', oneDayAgo.toISOString())
      .in('subscription_status', ['trialing', 'active'])

    if (empresasSinOnboarding) {
      for (const empresa of empresasSinOnboarding) {
        try {
          await enviarEmailOnboardingIncompleto(empresa.email, empresa.nombre)
          stats.onboardingIncompleto++
        } catch {
          stats.errors++
        }
      }
    }

    // 3. Trial expiring: trial ends in next 24h and user hasn't been active recently
    const { data: empresasTrialExpiring } = await supabase
      .from('empresas')
      .select('id, email, nombre, trial_ends_at')
      .eq('plan', 'free')
      .eq('subscription_status', 'trialing')
      .lte('trial_ends_at', in24Hours.toISOString())
      .gt('trial_ends_at', now.toISOString())

    if (empresasTrialExpiring) {
      for (const empresa of empresasTrialExpiring) {
        try {
          // Check if user has been active recently (last 24h)
          const { data: actividadReciente } = await supabase
            .from('conversaciones')
            .select('id')
            .eq('empresa_id', empresa.id)
            .gte('created_at', oneDayAgo.toISOString())
            .limit(1)

          // Only send if user has NOT been active
          if (!actividadReciente || actividadReciente.length === 0) {
            const trialEndsAt = new Date(empresa.trial_ends_at)
            const hoursLeft = Math.round((trialEndsAt.getTime() - now.getTime()) / (1000 * 60 * 60))
            await enviarEmailTrialExpira(empresa.email, empresa.nombre, hoursLeft)
            stats.trialExpiring++
          }
        } catch {
          stats.errors++
        }
      }
    }
  } catch {
    return NextResponse.json({ error: 'Error ejecutando alertas' }, { status: 500 })
  }

  return NextResponse.json({
    ok: true,
    stats,
    timestamp: now.toISOString(),
  })
}
