'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'
import { posthog } from '@/lib/posthog'

// Layout protegido: redirige a login si no hay sesión
// Verifica trial de 7 días
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [autorizado, setAutorizado] = useState(false)
  const [trialExpired, setTrialExpired] = useState(false)
  const [trialHoursLeft, setTrialHoursLeft] = useState<number | null>(null)

  useEffect(() => {
    const verificar = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      // Identify user in PostHog
      posthog.identify(user.id, { email: user.email })

      // Check trial status
      const { data: empresa } = await supabase
        .from('empresas')
        .select('trial_ends_at, plan, subscription_status')
        .eq('user_id', user.id)
        .single()

      if (empresa) {
        const hasActivePlan = empresa.plan !== 'free' && empresa.subscription_status === 'active'
        const trialEndsAt = empresa.trial_ends_at ? new Date(empresa.trial_ends_at) : null
        const now = new Date()

        if (!hasActivePlan && trialEndsAt && now > trialEndsAt) {
          setTrialExpired(true)
        } else if (trialEndsAt && !hasActivePlan) {
          const hoursLeft = Math.max(0, Math.round((trialEndsAt.getTime() - now.getTime()) / (1000 * 60 * 60)))
          setTrialHoursLeft(hoursLeft)
        }
      }

      setAutorizado(true)
    }

    verificar()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/login')
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  if (!autorizado) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  // Trial expired overlay
  if (trialExpired) {
    return (
      <div className="flex h-screen items-center justify-center bg-ivory-mid">
        <div className="max-w-md mx-auto text-center px-6">
          <h1 className="text-2xl font-medium text-ink mb-4" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
            Tu prueba gratuita ha terminado
          </h1>
          <p className="text-sm text-muted mb-6 leading-relaxed">
            Tu prueba gratuita de 7 días ha expirado. Elige un plan para seguir
            usando tus agentes de Orbbi sin interrupción.
          </p>
          <div className="space-y-3">
            <a href="/#precios"
              className="block w-full bg-ink text-ivory rounded-md py-3 text-sm font-medium hover:bg-ink-mid transition-colors">
              Ver planes desde $29/mes
            </a>
            <button
              onClick={async () => {
                await supabase.auth.signOut()
                router.push('/')
              }}
              className="block w-full text-sm text-muted hover:text-ink transition-colors py-2">
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Trial warning banner */}
      {trialHoursLeft !== null && trialHoursLeft <= 24 && (
        <div className="bg-accent/10 border-b border-accent/20 px-4 py-2 text-center">
          <p className="text-xs text-accent font-medium">
            Te quedan {trialHoursLeft} horas de prueba gratuita.{' '}
            <a href="/#precios" className="underline hover:no-underline">Elegir plan</a>
          </p>
        </div>
      )}
      {children}
    </>
  )
}
