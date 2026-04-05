'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

type Billing = 'monthly' | 'annual'

function FadeIn({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease }} className={className}>{children}</motion.div>
  )
}

// ── Currency conversion ──
const CURRENCY_SYMBOLS: Record<string, string> = {
  CLP: '$', MXN: '$', COP: '$', PEN: 'S/', ARS: '$', UYU: '$U', USD: '$', EUR: '€',
}

const COUNTRY_CURRENCY: Record<string, string> = {
  CL: 'CLP', MX: 'MXN', CO: 'COP', PE: 'PEN', AR: 'ARS', UY: 'UYU', US: 'USD',
}

function formatLocal(amount: number, currency: string): string {
  const sym = CURRENCY_SYMBOLS[currency] || '$'
  if (currency === 'USD' || currency === 'EUR') return `${sym}${amount}`
  if (amount >= 10000) return `${sym}${Math.round(amount).toLocaleString('es-CL')}`
  if (amount >= 100) return `${sym}${Math.round(amount).toLocaleString('es-CL')}`
  return `${sym}${amount.toFixed(0)}`
}

function useLocalPricing() {
  const [country, setCountry] = useState('')
  const [currency, setCurrency] = useState('')
  const [rate, setRate] = useState(0)

  useEffect(() => {
    async function detect() {
      try {
        // Detect country by IP
        const geo = await fetch('https://ip-api.com/json/?fields=countryCode', { signal: AbortSignal.timeout(3000) })
        if (!geo.ok) return
        const { countryCode } = await geo.json()
        const curr = COUNTRY_CURRENCY[countryCode]
        if (!curr || curr === 'USD') return // No conversion needed for USD countries

        setCountry(countryCode)
        setCurrency(curr)

        // Get exchange rate
        const rateRes = await fetch(`https://open.er-api.com/v6/latest/USD`, { signal: AbortSignal.timeout(5000) })
        if (!rateRes.ok) return
        const rateData = await rateRes.json()
        const r = rateData.rates?.[curr]
        if (r) setRate(r)
      } catch {
        // Silent fail — just show USD
      }
    }
    detect()
  }, [])

  return { country, currency, rate }
}

// ── Plan data ──
const PLANES = [
  {
    id: 'solo',
    nombre: 'Solo', desc: 'Para microempresas y emprendedores',
    mensual: 29, anual: 295.80,
    features: [
      { t: 'Gerente General 24/7', ok: true },
      { t: '100 mensajes al mes', ok: true },
      { t: 'Onboarding con contexto de tu negocio', ok: true },
      { t: 'Historial de conversaciones', ok: true },
      { t: 'Agentes especializados', ok: false },
    ],
  },
  {
    id: 'equipo',
    nombre: 'Equipo', desc: 'Para negocios con operación activa',
    mensual: 79, anual: 805.80, destacado: true,
    features: [
      '3 agentes a elegir',
      'Mensajes ilimitados',
      'Onboarding con contexto de tu negocio',
      'Historial + memoria entre sesiones',
      'Agentes adicionales (+$19/mes c/u)',
    ].map(t => ({ t, ok: true })),
  },
  {
    id: 'empresa',
    nombre: 'Empresa', desc: 'Para medianas empresas',
    mensual: 249, anual: 2539.80,
    features: [
      'Los 7 agentes incluidos',
      'Mensajes ilimitados',
      'Memoria + contexto completo',
      'Integración WhatsApp',
      'Soporte prioritario',
    ].map(t => ({ t, ok: true })),
  },
]

const AGENTES = [
  { n: 'Gerente General', r: 'Estrategia y operaciones', p: 'Incluido' },
  { n: 'Financiero', r: 'Flujo de caja y márgenes', p: '+$19/mes' },
  { n: 'Ventas', r: 'Pipeline y conversión', p: '+$19/mes' },
  { n: 'Marketing', r: 'Campañas y ROI', p: '+$19/mes' },
  { n: 'RRHH', r: 'Personas y cultura', p: '+$19/mes' },
  { n: 'Inventario', r: 'Stock y logística', p: '+$19/mes' },
  { n: 'Cumplimiento', r: 'Orientación regulatoria', p: '+$19/mes' },
]

const FAQS = [
  { q: '¿Puedo cancelar cuando quiera?', a: 'Sí. Mensual cancelas sin penalidad. Anual tienes acceso hasta el fin del período.' },
  { q: '¿Puedo probar antes de pagar?', a: 'Sí. Puedes usar la demo gratuita sin registrarte. Cuando estés listo, creas tu cuenta en segundos.' },
  { q: '¿Puedo cambiar de plan?', a: 'Sí. Si subes se cobra la diferencia. Si bajas, aplica al siguiente ciclo.' },
  { q: '¿Qué diferencia hay entre Orbbi y ChatGPT?', a: 'Orbbi conoce tu negocio en profundidad. Cada agente tiene frameworks especializados y contexto de tu empresa. No necesitas prompt engineering.' },
  { q: '¿En qué moneda se cobra?', a: 'Los precios están en USD. Si pagas con tarjeta local, MercadoPago convierte automáticamente a tu moneda al tipo de cambio del día.' },
]

export default function PricingPage() {
  const [billing, setBilling] = useState<Billing>('annual')
  const { currency, rate } = useLocalPricing()

  return (
    <div className="bg-ivory-mid">
      <div className="max-w-5xl mx-auto px-6" style={{ padding: 'clamp(50px, 8vw, 100px) 24px' }}>

        {/* Header */}
        <FadeIn>
          <div className="text-center mb-10">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent mb-3">Precios</p>
            <h1 className="text-ink" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 400, letterSpacing: '-0.8px', lineHeight: 1.1 }}>
              Un agente para cada área de tu negocio
            </h1>
            <p className="text-sm text-ink-light mt-3 max-w-md mx-auto" style={{ fontFamily: "'Source Serif 4', Georgia, serif", lineHeight: 1.6 }}>
              <a href="/demo" className="text-accent hover:underline font-medium">Prueba la demo gratis →</a>
            </p>
          </div>
        </FadeIn>

        {/* Toggle */}
        <FadeIn className="mb-10">
          <div className="flex items-center justify-center gap-3">
            <button onClick={() => setBilling('monthly')}
              className={`text-sm px-4 py-1.5 rounded-full transition-colors ${billing === 'monthly' ? 'bg-ink text-ivory' : 'text-muted hover:text-ink'}`}>
              Mensual
            </button>
            <button onClick={() => setBilling('annual')}
              className={`text-sm px-4 py-1.5 rounded-full transition-colors ${billing === 'annual' ? 'bg-ink text-ivory' : 'text-muted hover:text-ink'}`}>
              Anual
              {billing === 'annual' && <span className="ml-1.5 text-[10px] text-clay">-15%</span>}
            </button>
          </div>
        </FadeIn>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
          {PLANES.map((plan, pi) => {
            const anual = billing === 'annual'
            const precio = anual ? plan.anual : plan.mensual
            const precioMes = anual ? plan.anual / 12 : plan.mensual
            const localEquiv = rate > 0 ? formatLocal(precioMes * rate, currency) : ''

            return (
              <motion.div key={plan.nombre}
                className={`rounded-xl p-6 ${plan.destacado ? 'bg-ink text-ivory relative' : 'border border-ink/[0.06] bg-ivory'}`}
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, ease, delay: pi * 0.08 }}>

                {plan.destacado && (
                  <span className="absolute -top-2.5 left-6 bg-accent text-ivory text-[11px] font-medium px-2.5 py-0.5 rounded">
                    Más popular
                  </span>
                )}

                <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '20px' }}>{plan.nombre}</p>
                <p className={`text-xs mt-1 ${plan.destacado ? 'text-ivory/50' : 'text-muted'}`}>{plan.desc}</p>

                <div className="mt-5 mb-6">
                  {anual ? (
                    <>
                      <span className={`text-xs line-through ${plan.destacado ? 'text-ivory/30' : 'text-muted/50'}`}>${plan.mensual}/mes</span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '36px', fontWeight: 400, letterSpacing: '-1px' }}>
                          ${plan.anual.toLocaleString('es-CL')}
                        </span>
                        <span className={`text-xs ${plan.destacado ? 'text-ivory/50' : 'text-muted'}`}>USD/año</span>
                      </div>
                      <p className={`text-[11px] mt-0.5 ${plan.destacado ? 'text-ivory/30' : 'text-muted/50'}`}>~${(plan.anual / 12).toFixed(0)} USD/mes</p>
                      {localEquiv && (
                        <p className={`text-[11px] mt-0.5 ${plan.destacado ? 'text-ivory/40' : 'text-accent/70'}`}>
                          ≈ {localEquiv}/{currency === 'CLP' ? 'mes' : 'mes'}
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="flex items-baseline gap-1">
                        <span style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '36px', fontWeight: 400, letterSpacing: '-1px' }}>${plan.mensual}</span>
                        <span className={`text-xs ${plan.destacado ? 'text-ivory/50' : 'text-muted'}`}>USD/mes</span>
                      </div>
                      {localEquiv && (
                        <p className={`text-[11px] mt-1 ${plan.destacado ? 'text-ivory/40' : 'text-accent/70'}`}>
                          ≈ {localEquiv}/mes
                        </p>
                      )}
                    </>
                  )}
                </div>

                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      {f.ok ? (
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8.5L6.5 12L13 4" stroke={plan.destacado ? '#d97757' : '#c6613f'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                          <path d="M4 4L12 12M12 4L4 12" stroke={plan.destacado ? '#87867f' : '#d1cfc5'} strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      )}
                      <span className={`text-sm ${!f.ok ? (plan.destacado ? 'text-muted' : 'text-muted/40') : ''}`}>{f.t}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/registro"
                  className={`block w-full text-center rounded-md py-2.5 text-sm font-medium transition-colors ${
                    plan.destacado ? 'bg-ivory text-ink hover:bg-ivory-mid' : 'bg-ink text-ivory hover:bg-ink-mid'
                  }`}>
                  Comenzar ahora
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Separator */}
        <div className="h-px bg-ink/[0.06] mb-16" />

        {/* Agentes */}
        <FadeIn className="mb-20">
          <div className="md:flex md:justify-between md:items-end mb-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted mb-2">Personaliza</p>
              <h2 className="text-lg font-medium text-ink">Agentes adicionales</h2>
            </div>
            <p className="text-sm text-muted mt-2 md:mt-0">Agrega solo lo que necesitas</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {AGENTES.map((a) => {
              const localAgent = rate > 0 && a.p !== 'Incluido' ? ` ≈ ${formatLocal(19 * rate, currency)}` : ''
              return (
                <div key={a.n} className="border border-ink/[0.06] rounded-lg px-4 py-3 bg-ivory flex items-center justify-between hover:border-ink/[0.12] transition-colors">
                  <div>
                    <p className="text-sm text-ink">{a.n}</p>
                    <p className="text-[11px] text-muted">{a.r}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-medium ${a.p === 'Incluido' ? 'text-muted/40' : 'text-accent'}`}>{a.p}</span>
                    {localAgent && <p className="text-[10px] text-muted">{localAgent}</p>}
                  </div>
                </div>
              )
            })}
          </div>
        </FadeIn>

        {/* FAQ */}
        <FadeIn>
          <div className="max-w-lg mx-auto">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted mb-2">FAQ</p>
            <h2 className="text-lg font-medium text-ink mb-6">Preguntas frecuentes</h2>
            {FAQS.map((f, i) => (
              <div key={i} className="py-5 border-b border-ink/[0.06] last:border-none">
                <p className="text-sm font-medium text-ink">{f.q}</p>
                <p className="text-sm text-muted mt-1.5 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
