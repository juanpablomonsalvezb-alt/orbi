'use client'

import { useState } from 'react'

// ============================================
// TIPOS
// ============================================

type Billing = 'monthly' | 'annual'

interface Plan {
  nombre: string
  descripcion: string
  precioMensual: number
  precioAnual: number
  agentesIncluidos: string
  features: { texto: string; incluido: boolean }[]
  destacado?: boolean
  badge?: string
}

interface Agente {
  nombre: string
  rol: string
  precio: string
}

// ============================================
// DATOS
// ============================================

const PLANES: Plan[] = [
  {
    nombre: 'Solo',
    descripcion: 'Para microempresas y emprendedores',
    precioMensual: 29,
    precioAnual: 295.80,
    agentesIncluidos: '1 (Gerente General)',
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
    descripcion: 'Para negocios con equipo y operación activa',
    precioMensual: 79,
    precioAnual: 805.80,
    agentesIncluidos: '3 a elegir',
    destacado: true,
    badge: 'Más popular',
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
    agentesIncluidos: '7 (todos)',
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

const AGENTES: Agente[] = [
  { nombre: 'Gerente General', rol: 'Estrategia y operaciones', precio: 'Incluido' },
  { nombre: 'Agente Financiero', rol: 'Finanzas y contabilidad', precio: '+$19/mes' },
  { nombre: 'Agente de Ventas', rol: 'Pipeline y conversión', precio: '+$19/mes' },
  { nombre: 'Agente de Marketing', rol: 'Campañas y posicionamiento', precio: '+$19/mes' },
  { nombre: 'Agente de RRHH', rol: 'Personas y cultura', precio: '+$19/mes' },
  { nombre: 'Agente de Inventario', rol: 'Stock y logística', precio: '+$19/mes' },
  { nombre: 'Agente Legal', rol: 'Contratos y cumplimiento', precio: '+$19/mes' },
]

const FAQS = [
  {
    pregunta: '¿Puedo cancelar cuando quiera?',
    respuesta: 'Sí. En el plan mensual cancelas cuando quieras sin penalidad. En el plan anual tienes acceso hasta el fin del período pagado.',
  },
  {
    pregunta: '¿Qué pasa después de los 14 días gratis?',
    respuesta: 'Te pedimos una tarjeta para continuar. Si decides no seguir, no se te cobra nada.',
  },
  {
    pregunta: '¿Puedo cambiar de plan?',
    respuesta: 'Sí, en cualquier momento. Si subes de plan se cobra la diferencia proporcional. Si bajas, el cambio aplica al siguiente ciclo.',
  },
]

// ============================================
// ICONOS SVG
// ============================================

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.5L6.5 12L13 4" />
    </svg>
  )
}

function CrossIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4 4L12 12M12 4L4 12" />
    </svg>
  )
}

// ============================================
// TOGGLE MENSUAL / ANUAL
// ============================================

function PricingToggle({ billing, onChange }: { billing: Billing; onChange: (b: Billing) => void }) {
  return (
    <div className="flex items-center justify-center space-x-3">
      <span className={`text-[14px] transition-colors ${billing === 'monthly' ? 'text-obsidian font-medium' : 'text-ceniza'}`}>
        Mensual
      </span>

      <button
        onClick={() => onChange(billing === 'monthly' ? 'annual' : 'monthly')}
        className="relative w-12 h-6 rounded-full transition-colors bg-obsidian"
        aria-label="Cambiar entre mensual y anual"
      >
        <span
          className={`absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white transition-transform duration-200 ${
            billing === 'annual' ? 'translate-x-[27px]' : 'translate-x-[3px]'
          }`}
        />
      </button>

      <span className={`text-[14px] transition-colors ${billing === 'annual' ? 'text-obsidian font-medium' : 'text-ceniza'}`}>
        Anual
      </span>

      {/* Badge ahorro */}
      <span
        className={`text-[11px] font-medium px-2 py-0.5 rounded-full transition-all duration-200 ${
          billing === 'annual'
            ? 'bg-señal/10 text-señal opacity-100'
            : 'opacity-0'
        }`}
      >
        Ahorra 15%
      </span>
    </div>
  )
}

// ============================================
// CARD DE PLAN
// ============================================

function PricingCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  const esAnual = billing === 'annual'
  const precioMensualEquivalente = (plan.precioAnual / 12).toFixed(2)
  const ahorro = ((plan.precioMensual * 12) - plan.precioAnual).toFixed(0)

  return (
    <div
      className={`rounded-[16px] px-6 py-6 flex flex-col relative ${
        plan.destacado
          ? 'bg-obsidian text-white'
          : 'bg-marfil border border-humo/50'
      }`}
    >
      {/* Badge */}
      {plan.badge && (
        <span className="absolute -top-3 left-6 bg-señal text-white text-[11px] font-medium px-3 py-1 rounded-full">
          {plan.badge}
        </span>
      )}

      {/* Nombre y descripción */}
      <h3 className="text-[20px] font-medium tracking-[-0.3px]">{plan.nombre}</h3>
      <p className={`text-[13px] mt-1 ${plan.destacado ? 'text-ceniza' : 'text-ceniza'}`}>
        {plan.descripcion}
      </p>

      {/* Precio */}
      <div className="mt-5 mb-6">
        {esAnual ? (
          <>
            <div className="flex items-baseline space-x-2">
              <span className={`text-[14px] line-through ${plan.destacado ? 'text-ceniza' : 'text-ceniza'}`}>
                ${plan.precioMensual}/mes
              </span>
            </div>
            <div className="flex items-baseline space-x-1 mt-1">
              <span className="text-[36px] font-light tracking-[-1px]">
                ${plan.precioAnual.toLocaleString('es-CL')}
              </span>
              <span className={`text-[14px] ${plan.destacado ? 'text-ceniza' : 'text-ceniza'}`}>/año</span>
            </div>
            <p className={`text-[12px] mt-1 ${plan.destacado ? 'text-ceniza' : 'text-ceniza'}`}>
              equivale a ${precioMensualEquivalente}/mes
            </p>
            <span className="inline-block mt-2 text-[11px] font-medium px-2 py-0.5 rounded-full bg-señal/15 text-señal">
              Ahorras ${ahorro}
            </span>
          </>
        ) : (
          <>
            <div className="flex items-baseline space-x-1">
              <span className="text-[36px] font-light tracking-[-1px]">${plan.precioMensual}</span>
              <span className={`text-[14px] ${plan.destacado ? 'text-ceniza' : 'text-ceniza'}`}>/mes</span>
            </div>
          </>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3 flex-1">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start space-x-2.5">
            {f.incluido ? (
              <CheckIcon className={`mt-0.5 flex-shrink-0 ${plan.destacado ? 'text-señal' : 'text-obsidian'}`} />
            ) : (
              <CrossIcon className={`mt-0.5 flex-shrink-0 ${plan.destacado ? 'text-ceniza/40' : 'text-ceniza/40'}`} />
            )}
            <span className={`text-[13px] leading-[1.5] ${
              f.incluido
                ? ''
                : plan.destacado ? 'text-ceniza/40' : 'text-ceniza/40'
            }`}>
              {f.texto}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        className={`w-full mt-6 rounded-[8px] px-5 py-2.5 text-[14px] font-medium transition-colors ${
          plan.destacado
            ? 'bg-señal text-white hover:bg-señal/90'
            : 'bg-obsidian text-white hover:bg-grafito'
        }`}
      >
        Empezar gratis 14 días
      </button>
    </div>
  )
}

// ============================================
// CARD DE AGENTE
// ============================================

function AgentCard({ agente }: { agente: Agente }) {
  const esIncluido = agente.precio === 'Incluido'

  return (
    <div className="bg-white border border-humo/50 rounded-[12px] px-5 py-4 flex items-center justify-between">
      <div>
        <p className="text-[14px] font-medium text-obsidian">{agente.nombre}</p>
        <p className="text-[12px] text-ceniza mt-0.5">{agente.rol}</p>
      </div>
      <span className={`text-[13px] font-medium ${esIncluido ? 'text-ceniza' : 'text-señal'}`}>
        {agente.precio}
      </span>
    </div>
  )
}

// ============================================
// FAQ
// ============================================

function PricingFAQ() {
  return (
    <div className="space-y-6">
      {FAQS.map((faq, i) => (
        <div key={i}>
          <h4 className="text-[14px] font-medium text-obsidian">{faq.pregunta}</h4>
          <p className="text-[13px] text-ceniza mt-1.5 leading-[1.6]">{faq.respuesta}</p>
        </div>
      ))}
    </div>
  )
}

// ============================================
// PÁGINA COMPLETA
// ============================================

export default function PricingPage() {
  const [billing, setBilling] = useState<Billing>('annual')

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 py-16 md:py-24">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-label mb-3">Precios</p>
          <h1 className="text-display text-obsidian">
            Un agente para cada área de tu negocio
          </h1>
          <p className="text-[15px] text-ceniza mt-4 max-w-md mx-auto leading-[1.7]">
            Elige el plan que se ajuste a tu operación. Todos incluyen 14 días gratis.
          </p>
        </div>

        {/* Toggle */}
        <div className="mb-12">
          <PricingToggle billing={billing} onChange={setBilling} />
        </div>

        {/* Cards de planes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-24">
          {PLANES.map((plan) => (
            <PricingCard key={plan.nombre} plan={plan} billing={billing} />
          ))}
        </div>

        {/* Agentes à la carte */}
        <div className="mb-24">
          <div className="text-center mb-10">
            <p className="text-label mb-3">Personaliza</p>
            <h2 className="text-heading text-obsidian">
              Agentes adicionales — à la carte
            </h2>
            <p className="text-[13px] text-ceniza mt-2">
              Agrega solo lo que tu negocio necesita
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {AGENTES.map((agente) => (
              <AgentCard key={agente.nombre} agente={agente} />
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10">
            <p className="text-label mb-3">FAQ</p>
            <h2 className="text-heading text-obsidian">Preguntas frecuentes</h2>
          </div>
          <PricingFAQ />
        </div>

      </div>
    </div>
  )
}
