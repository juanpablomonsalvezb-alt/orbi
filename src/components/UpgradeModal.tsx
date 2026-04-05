'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase-client'

const PLANS = {
  solo: { nombre: 'Solo', precio: 29, agentes: 1 },
  equipo: { nombre: 'Equipo', precio: 79, agentes: 3 },
  empresa: { nombre: 'Empresa', precio: 249, agentes: 7 },
} as const

type PlanId = keyof typeof PLANS

interface UpgradeModalProps {
  empresaId: string
  email: string
  defaultPlan?: PlanId
  onClose: () => void
}

export default function UpgradeModal({ empresaId, email, defaultPlan = 'equipo', onClose }: UpgradeModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>(defaultPlan)
  const [loading, setLoading] = useState<'subscription' | 'checkout' | null>(null)
  const [error, setError] = useState('')

  async function getAuthHeaders() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.access_token) throw new Error('No hay sesión activa')
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`,
    }
  }

  async function handleSubscription() {
    setLoading('subscription')
    setError('')
    try {
      const headers = await getAuthHeaders()
      const res = await fetch('/api/mp/subscription', {
        method: 'POST',
        headers,
        body: JSON.stringify({ plan_id: selectedPlan, empresa_id: empresaId, email }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al crear suscripción')
      if (data.init_point) {
        window.location.href = data.init_point
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado')
      setLoading(null)
    }
  }

  async function handleCheckout() {
    setLoading('checkout')
    setError('')
    try {
      const headers = await getAuthHeaders()
      const res = await fetch('/api/mp/checkout', {
        method: 'POST',
        headers,
        body: JSON.stringify({ plan_id: selectedPlan, empresa_id: empresaId, email }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al crear pago')
      if (data.init_point) {
        window.location.href = data.init_point
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado')
      setLoading(null)
    }
  }

  const plan = PLANS[selectedPlan]
  const subscriptionPrice = Math.round(plan.precio * 0.9 * 100) / 100

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-ivory rounded-xl shadow-xl max-w-md w-full mx-4 p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-ink transition-colors"
          aria-label="Cerrar"
        >
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
            <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <h2
          className="text-xl text-ink mb-1"
          style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
        >
          Elige tu plan
        </h2>
        <p className="text-sm text-muted mb-5">Pago seguro con MercadoPago</p>

        {/* Plan selector */}
        <div className="flex gap-2 mb-6">
          {(Object.keys(PLANS) as PlanId[]).map((id) => (
            <button
              key={id}
              onClick={() => setSelectedPlan(id)}
              className={`flex-1 rounded-lg px-3 py-2.5 text-center transition-colors border ${
                selectedPlan === id
                  ? 'border-ink bg-ink text-ivory'
                  : 'border-ink/10 bg-ivory hover:border-ink/20'
              }`}
            >
              <p className="text-sm font-medium">{PLANS[id].nombre}</p>
              <p className={`text-xs mt-0.5 ${selectedPlan === id ? 'text-ivory/60' : 'text-muted'}`}>
                ${PLANS[id].precio}/mes
              </p>
            </button>
          ))}
        </div>

        {/* Payment options */}
        <div className="space-y-3">
          <button
            onClick={handleSubscription}
            disabled={loading !== null}
            className="w-full bg-ink text-ivory rounded-md py-3 text-sm font-medium hover:bg-ink-mid transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading === 'subscription' ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-ivory" />
                Redirigiendo...
              </span>
            ) : (
              <>Suscripción automática — ${subscriptionPrice}/mes <span className="text-accent">(-10%)</span></>
            )}
          </button>

          <button
            onClick={handleCheckout}
            disabled={loading !== null}
            className="w-full border border-ink/10 text-ink rounded-md py-3 text-sm font-medium hover:bg-ink/[0.03] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading === 'checkout' ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-ink" />
                Redirigiendo...
              </span>
            ) : (
              <>Pago único este mes — ${plan.precio}</>
            )}
          </button>
        </div>

        {error && (
          <p className="text-xs text-red-600 mt-3 text-center">{error}</p>
        )}

        <p className="text-[11px] text-muted text-center mt-4">
          Serás redirigido a MercadoPago para completar el pago de forma segura.
        </p>
      </div>
    </div>
  )
}
