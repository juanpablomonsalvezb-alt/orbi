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
    precioMensual: 29,
    precioAnual: 295.80,
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
    precioMensual: 79,
    precioAnual: 805.80,
    destacado: true,
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
    precioMensual: 249,
    precioAnual: 2539.80,
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
  {
    pregunta: '¿Puedo cancelar cuando quiera?',
    respuesta: 'Sí. En el plan mensual cancelas sin penalidad. En el anual tienes acceso hasta el fin del período.',
  },
  {
    pregunta: '¿Qué pasa después de los 14 días gratis?',
    respuesta: 'Te pedimos una tarjeta para continuar. Si no sigues, no se cobra nada.',
  },
  {
    pregunta: '¿Puedo cambiar de plan?',
    respuesta: 'Sí. Si subes se cobra la diferencia proporcional. Si bajas, aplica al siguiente ciclo.',
  },
]

// ============================================
// TOGGLE
// ============================================

function Toggle({ billing, onChange }: { billing: Billing; onChange: (b: Billing) => void }) {
  return (
    <div className="flex items-center justify-center space-x-4">
      <span className={`t-small transition-colors duration-300 ${billing === 'monthly' ? 'text-white' : 'text-ceniza'}`}>
        Mensual
      </span>
      <button
        onClick={() => onChange(billing === 'monthly' ? 'annual' : 'monthly')}
        className="relative w-14 h-7 rounded-full bg-white/[0.08] border border-white/[0.06] transition-colors"
      >
        <span
          className={`absolute top-[3px] w-[20px] h-[20px] rounded-full transition-all duration-300 ${
            billing === 'annual'
              ? 'translate-x-[29px] bg-señal'
              : 'translate-x-[3px] bg-white/40'
          }`}
        />
      </button>
      <span className={`t-small transition-colors duration-300 ${billing === 'annual' ? 'text-white' : 'text-ceniza'}`}>
        Anual
      </span>
      <span
        className={`t-micro px-2.5 py-1 rounded-full transition-all duration-300 ${
          billing === 'annual'
            ? 'bg-señal/15 text-señal opacity-100 translate-x-0'
            : 'opacity-0 -translate-x-2'
        }`}
      >
        -15%
      </span>
    </div>
  )
}

// ============================================
// PLAN CARD
// ============================================

function PlanCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  const anual = billing === 'annual'
  const equiv = (plan.precioAnual / 12).toFixed(0)
  const ahorro = ((plan.precioMensual * 12) - plan.precioAnual).toFixed(0)

  return (
    <div
      className={`rounded-[16px] p-7 flex flex-col relative transition-all duration-300 ${
        plan.destacado
          ? 'bg-white text-obsidian scale-[1.02]'
          : 'bg-white/[0.03] border border-white/[0.06] text-white hover:border-white/[0.12]'
      }`}
    >
      {plan.destacado && (
        <span className="absolute -top-3 left-7 bg-señal text-white t-micro px-3 py-1 rounded-full text-[10px]">
          Más popular
        </span>
      )}

      <div className="mb-6">
        <h3 className="text-[20px] font-normal tracking-[-0.3px]">{plan.nombre}</h3>
        <p className={`t-small mt-1 ${plan.destacado ? 'text-ceniza' : 'text-ceniza'}`}>
          {plan.descripcion}
        </p>
      </div>

      {/* Precio */}
      <div className="mb-8">
        {anual ? (
          <>
            <span className={`t-small line-through ${plan.destacado ? 'text-ceniza' : 'text-ceniza/60'}`}>
              ${plan.precioMensual}/mes
            </span>
            <div className="flex items-baseline space-x-1 mt-1">
              <span className="text-[44px] font-light tracking-[-2px] leading-none">
                ${plan.precioAnual.toLocaleString('es-CL')}
              </span>
              <span className={`t-small ${plan.destacado ? 'text-ceniza' : 'text-ceniza'}`}>/año</span>
            </div>
            <p className={`text-[12px] mt-2 ${plan.destacado ? 'text-ceniza' : 'text-ceniza/60'}`}>
              ~${equiv}/mes · Ahorras ${ahorro}
            </p>
          </>
        ) : (
          <div className="flex items-baseline space-x-1">
            <span className="text-[44px] font-light tracking-[-2px] leading-none">${plan.precioMensual}</span>
            <span className={`t-small ${plan.destacado ? 'text-ceniza' : 'text-ceniza'}`}>/mes</span>
          </div>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3 flex-1">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start space-x-2.5">
            {f.incluido ? (
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" className="mt-0.5 flex-shrink-0">
                <path d="M3 8.5L6.5 12L13 4" stroke={plan.destacado ? '#378ADD' : '#378ADD'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" width="12" height="12" fill="none" className="mt-0.5 flex-shrink-0">
                <path d="M4 4L12 12M12 4L4 12" stroke={plan.destacado ? '#D3D1C7' : '#888780'} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
              </svg>
            )}
            <span className={`t-small ${
              f.incluido ? '' : plan.destacado ? 'text-humo' : 'text-ceniza/40'
            }`}>
              {f.texto}
            </span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full mt-8 rounded-[8px] px-5 py-3 text-[14px] font-medium transition-all duration-300 ${
          plan.destacado
            ? 'bg-obsidian text-white hover:bg-grafito'
            : 'bg-white/[0.06] text-white hover:bg-white/[0.1] border border-white/[0.06]'
        }`}
      >
        Empezar gratis 14 días
      </button>
    </div>
  )
}

// ============================================
// PAGE
// ============================================

export default function PricingPage() {
  const [billing, setBilling] = useState<Billing>('annual')

  return (
    <div className="bg-obsidian min-h-screen">
      <div className="max-w-[1100px] mx-auto px-6 py-24 md:py-32">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="t-micro text-señal mb-5">Precios</p>
          <h1 className="t-display text-white">
            Un agente para cada
            <br />
            <span className="text-ceniza">área de tu negocio</span>
          </h1>
          <p className="t-body text-ceniza mt-5 max-w-md mx-auto">
            Elige el plan que se ajuste a tu operación. Todos incluyen 14 días gratis.
          </p>
        </div>

        {/* Toggle */}
        <div className="mb-14">
          <Toggle billing={billing} onChange={setBilling} />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-32 items-start">
          {PLANES.map((plan) => (
            <PlanCard key={plan.nombre} plan={plan} billing={billing} />
          ))}
        </div>

        {/* Agentes à la carte */}
        <div className="mb-32">
          <div className="md:flex md:items-end md:justify-between mb-12">
            <div>
              <p className="t-micro text-ceniza mb-4">Personaliza</p>
              <h2 className="t-title text-white">Agentes adicionales — à la carte</h2>
            </div>
            <p className="t-small text-ceniza mt-4 md:mt-0">Agrega solo lo que necesitas</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {AGENTES.map((a) => (
              <div
                key={a.nombre}
                className="rounded-[12px] border border-white/[0.06] bg-white/[0.02] px-5 py-4
                           flex items-center justify-between hover:border-white/[0.12] transition-colors duration-300"
              >
                <div>
                  <p className="text-[14px] text-white font-normal">{a.nombre}</p>
                  <p className="text-[11px] text-ceniza mt-0.5">{a.rol}</p>
                </div>
                <span className={`t-small font-medium ${a.precio === 'Incluido' ? 'text-ceniza/40' : 'text-señal'}`}>
                  {a.precio}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12">
            <p className="t-micro text-ceniza mb-4">FAQ</p>
            <h2 className="t-title text-white">Preguntas frecuentes</h2>
          </div>

          <div className="space-y-8">
            {FAQS.map((faq, i) => (
              <div key={i} className="border-b border-white/[0.04] pb-8">
                <h4 className="text-[15px] font-normal text-white">{faq.pregunta}</h4>
                <p className="t-small text-ceniza mt-2">{faq.respuesta}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
