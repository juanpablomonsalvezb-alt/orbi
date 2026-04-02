'use client'

import { useState } from 'react'

type Billing = 'monthly' | 'annual'

interface Plan {
  nombre: string
  descripcion: string
  precioMensual: number
  precioAnual: number
  features: { texto: string; incluido: boolean }[]
  destacado?: boolean
}

const PLANES: Plan[] = [
  {
    nombre: 'Solo',
    descripcion: 'Para microempresas y emprendedores',
    precioMensual: 29, precioAnual: 295.80,
    features: [
      { texto: '1 agente incluido (Gerente General)', incluido: true },
      { texto: 'Onboarding guiado del negocio', incluido: true },
      { texto: 'Chat ilimitado con el agente', incluido: true },
      { texto: 'Resumen semanal automático', incluido: true },
      { texto: 'Agentes adicionales à la carte', incluido: false },
      { texto: 'Soporte prioritario', incluido: false },
    ],
  },
  {
    nombre: 'Equipo',
    descripcion: 'Para negocios con operación activa',
    precioMensual: 79, precioAnual: 805.80, destacado: true,
    features: [
      { texto: '3 agentes incluidos a elegir', incluido: true },
      { texto: 'Onboarding guiado del negocio', incluido: true },
      { texto: 'Chat ilimitado con todos los agentes', incluido: true },
      { texto: 'Resumen semanal automático', incluido: true },
      { texto: 'Agentes adicionales à la carte', incluido: true },
      { texto: 'Soporte prioritario', incluido: true },
    ],
  },
  {
    nombre: 'Empresa',
    descripcion: 'Para medianas empresas con múltiples áreas',
    precioMensual: 249, precioAnual: 2539.80,
    features: [
      { texto: 'Todos los agentes incluidos (7)', incluido: true },
      { texto: 'Onboarding personalizado con consultor', incluido: true },
      { texto: 'Chat ilimitado con todos los agentes', incluido: true },
      { texto: 'Reportes semanales y mensuales', incluido: true },
      { texto: 'Agentes adicionales à la carte', incluido: true },
      { texto: 'Soporte prioritario 24/7', incluido: true },
    ],
  },
]

const AGENTES = [
  { nombre: 'Gerente General', rol: 'Estrategia y operaciones', precio: 'Incluido' },
  { nombre: 'Financiero', rol: 'Finanzas y contabilidad', precio: '+$19/mes' },
  { nombre: 'Ventas', rol: 'Pipeline y conversión', precio: '+$19/mes' },
  { nombre: 'Marketing', rol: 'Campañas y ROI', precio: '+$19/mes' },
  { nombre: 'RRHH', rol: 'Personas y cultura', precio: '+$19/mes' },
  { nombre: 'Inventario', rol: 'Stock y logística', precio: '+$19/mes' },
  { nombre: 'Legal', rol: 'Contratos y cumplimiento', precio: '+$19/mes' },
]

const FAQS = [
  { pregunta: '¿Puedo cancelar cuando quiera?', respuesta: 'Sí. En el plan mensual cancelas sin penalidad. En el anual tienes acceso hasta el fin del período.' },
  { pregunta: '¿Qué pasa después de los 14 días gratis?', respuesta: 'Te pedimos una tarjeta para continuar. Si no sigues, no se cobra nada.' },
  { pregunta: '¿Puedo cambiar de plan?', respuesta: 'Sí. Si subes se cobra la diferencia proporcional. Si bajas, aplica al siguiente ciclo.' },
]

function Toggle({ billing, onChange }: { billing: Billing; onChange: (b: Billing) => void }) {
  return (
    <div className="flex items-center justify-center space-x-4">
      <span className={`text-[14px] transition-colors duration-200 ${billing === 'monthly' ? 'text-ink font-medium' : 'text-muted'}`}>
        Mensual
      </span>
      <button
        onClick={() => onChange(billing === 'monthly' ? 'annual' : 'monthly')}
        className="relative w-12 h-6 rounded-full bg-border-light transition-colors duration-200"
      >
        <span className={`absolute top-[3px] w-[18px] h-[18px] rounded-full transition-all duration-200 ${
          billing === 'annual' ? 'translate-x-[27px] bg-accent' : 'translate-x-[3px] bg-muted'
        }`} />
      </button>
      <span className={`text-[14px] transition-colors duration-200 ${billing === 'annual' ? 'text-ink font-medium' : 'text-muted'}`}>
        Anual
      </span>
      <span className={`text-[11px] font-medium px-2 py-1 rounded-[4px] transition-all duration-200 ${
        billing === 'annual' ? 'bg-accent-bg text-accent opacity-100' : 'opacity-0'
      }`}>
        -15%
      </span>
    </div>
  )
}

function PlanCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  const anual = billing === 'annual'
  const equiv = (plan.precioAnual / 12).toFixed(0)
  const ahorro = ((plan.precioMensual * 12) - plan.precioAnual).toFixed(0)

  return (
    <div className={`rounded-[12px] p-7 flex flex-col relative ${
      plan.destacado
        ? 'bg-ink text-ivory'
        : 'bg-ivory border border-border-light'
    }`}>
      {plan.destacado && (
        <span className="absolute -top-3 left-7 bg-accent text-ivory text-[11px] font-medium px-3 py-1 rounded-[4px]">
          Más popular
        </span>
      )}

      <h3 className="text-[22px] font-normal tracking-[-0.3px]" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
        {plan.nombre}
      </h3>
      <p className={`text-[13px] mt-1 ${plan.destacado ? 'text-border' : 'text-muted'}`}>
        {plan.descripcion}
      </p>

      <div className="mt-5 mb-7">
        {anual ? (
          <>
            <span className={`text-[13px] line-through ${plan.destacado ? 'text-border/60' : 'text-muted/60'}`}>
              ${plan.precioMensual}/mes
            </span>
            <div className="flex items-baseline space-x-1 mt-1">
              <span className="text-[40px] font-light tracking-[-1.5px]" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                ${plan.precioAnual.toLocaleString('es-CL')}
              </span>
              <span className={`text-[13px] ${plan.destacado ? 'text-border' : 'text-muted'}`}>/año</span>
            </div>
            <p className={`text-[12px] mt-1 ${plan.destacado ? 'text-border/60' : 'text-muted/60'}`}>
              ~${equiv}/mes · Ahorras ${ahorro}
            </p>
          </>
        ) : (
          <div className="flex items-baseline space-x-1">
            <span className="text-[40px] font-light tracking-[-1.5px]" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
              ${plan.precioMensual}
            </span>
            <span className={`text-[13px] ${plan.destacado ? 'text-border' : 'text-muted'}`}>/mes</span>
          </div>
        )}
      </div>

      <ul className="space-y-3 flex-1">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start space-x-2.5">
            {f.incluido ? (
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" className="mt-0.5 flex-shrink-0">
                <path d="M3 8.5L6.5 12L13 4" stroke={plan.destacado ? '#d97757' : '#c6613f'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" width="12" height="12" fill="none" className="mt-1 flex-shrink-0">
                <path d="M4 4L12 12M12 4L4 12" stroke={plan.destacado ? '#b0aea5' : '#d1cfc5'} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
            <span className={`text-[13px] leading-[1.5] ${
              f.incluido ? '' : plan.destacado ? 'text-border/40' : 'text-muted/40'
            }`}>
              {f.texto}
            </span>
          </li>
        ))}
      </ul>

      <button className={`w-full mt-7 rounded-[4px] px-5 py-3 text-[14px] font-medium transition-colors duration-200 ${
        plan.destacado
          ? 'bg-ivory text-ink hover:bg-ivory-mid'
          : 'bg-ink text-ivory hover:bg-ink-mid'
      }`}>
        Empezar gratis 14 días
      </button>
    </div>
  )
}

export default function PricingPage() {
  const [billing, setBilling] = useState<Billing>('annual')

  return (
    <div className="bg-ivory-mid">
      <div className="max-w-[1100px] mx-auto" style={{ padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 4vw, 5rem)' }}>

        <div className="text-center" style={{ marginBottom: 'clamp(2rem, 4vw, 4rem)' }}>
          <p className="t-detail text-accent mb-4">Precios</p>
          <h1 className="t-display">
            Un agente para cada
            <br />área de tu negocio
          </h1>
          <p className="t-body mt-4 max-w-md mx-auto">
            Elige el plan que se ajuste a tu operación. Todos incluyen 14 días gratis.
          </p>
        </div>

        <div className="mb-12">
          <Toggle billing={billing} onChange={setBilling} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start" style={{ marginBottom: 'clamp(5rem, 8vw, 8rem)' }}>
          {PLANES.map((plan) => (
            <PlanCard key={plan.nombre} plan={plan} billing={billing} />
          ))}
        </div>

        {/* Agentes à la carte */}
        <div style={{ marginBottom: 'clamp(5rem, 8vw, 8rem)' }}>
          <div className="md:flex md:items-end md:justify-between mb-8">
            <div>
              <p className="t-detail text-muted mb-3">Personaliza</p>
              <h2 className="t-heading">Agentes adicionales — à la carte</h2>
            </div>
            <p className="t-small text-muted mt-3 md:mt-0">Agrega solo lo que necesitas</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {AGENTES.map((a) => (
              <div key={a.nombre}
                className="rounded-[8px] border border-border-light bg-ivory px-5 py-4 flex items-center justify-between
                           hover:border-border transition-colors duration-200">
                <div>
                  <p className="text-[14px] text-ink font-normal">{a.nombre}</p>
                  <p className="text-[11px] text-muted mt-0.5">{a.rol}</p>
                </div>
                <span className={`text-[13px] font-medium ${a.precio === 'Incluido' ? 'text-muted/40' : 'text-accent'}`}>
                  {a.precio}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <p className="t-detail text-muted mb-3">FAQ</p>
            <h2 className="t-heading">Preguntas frecuentes</h2>
          </div>
          <div className="space-y-7">
            {FAQS.map((faq, i) => (
              <div key={i} className="border-b border-border-light pb-7">
                <h4 className="text-[15px] font-normal text-ink" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                  {faq.pregunta}
                </h4>
                <p className="t-small text-muted mt-2">{faq.respuesta}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
