'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import OrbiLogo from '@/components/ui/OrbiLogo'

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

// ── Word-by-word animation (matches Anthropic's word animation exactly) ──
function AnimatedWords({ children, className = '' }: { children: string; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const words = children.split(' ')

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(24px)',
          transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)`,
          transitionDelay: `${100 + Math.random() * 400}ms`,
        }}>
          {word}{i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </span>
  )
}

// ── Fade in section ──
function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease, delay }}>
      {children}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// NAV
// ═══════════════════════════════════════════════════════════════════

function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-ivory-mid" style={{ height: 'var(--nav-height)' }}>
      <div className="u-container h-full flex items-center justify-between">
        <Link href="/"><OrbiLogo size={24} color="dark" /></Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="#producto" className="text-sm text-ink-light hover:text-ink transition-colors">Producto</Link>
          <Link href="#agentes" className="text-sm text-ink-light hover:text-ink transition-colors">Agentes</Link>
          <Link href="/precios" className="text-sm text-ink-light hover:text-ink transition-colors">Precios</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-ink-light hover:text-ink transition-colors hidden sm:block">Entrar</Link>
          <Link href="/registro" className="bg-ink text-ivory text-sm font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity">
            Probar gratis
          </Link>
        </div>
      </div>
    </nav>
  )
}

// ═══════════════════════════════════════════════════════════════════
// 1. HERO (full width, bg-ivory-dark)
// ═══════════════════════════════════════════════════════════════════

function Hero() {
  return (
    <header className="bg-ivory-dark">
      <div className="space-main" />
      <div className="u-container">
        <div className="grid-12 items-center">
          {/* Left 7 cols: heading + subtitle + prompt bar */}
          <div style={{ gridColumn: 'span 7' }} className="max-md:col-span-full">
            <h1 className="u-display-xl mb-6">
              <AnimatedWords>
                Conoce a tu socio estratégico
              </AnimatedWords>
            </h1>
            <FadeIn delay={0.3}>
              <p className="u-paragraph-l mb-8" style={{ maxWidth: '42ch' }}>
                Orbbi es un equipo de agentes de IA que conoce tu empresa en
                profundidad. Analiza, decide, ejecuta y reporta — disponible
                24/7 para que tu negocio nunca se detenga.
              </p>
            </FadeIn>
            <FadeIn delay={0.5}>
              <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-sm" style={{ maxWidth: '480px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#87867f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="¿Cómo puedo ayudarte hoy?"
                  className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
                  readOnly
                />
                <Link href="/registro" className="bg-clay text-white text-sm font-medium px-5 py-2 rounded-lg hover:opacity-90 transition-opacity shrink-0">
                  Preguntar
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right 5 cols: decorative placeholder */}
          <div style={{ gridColumn: 'span 5' }} className="max-md:col-span-full max-md:mt-8">
            <FadeIn delay={0.4}>
              <div className="bg-oat rounded-2xl flex items-center justify-center" style={{ aspectRatio: '1/1', maxHeight: '480px' }}>
                <OrbiLogo size={64} color="dark" />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
      <div className="space-medium" />
    </header>
  )
}

// ═══════════════════════════════════════════════════════════════════
// 2. PROBLEM SOLVERS SECTION (bg-ivory-mid)
// ═══════════════════════════════════════════════════════════════════

function ProblemSolversSection() {
  const features = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
      title: 'Resuelve problemas junto a ti',
      desc: 'Orbbi construye sobre tus ideas, expande tu lógica y simplifica la complejidad paso a paso para cada área de tu negocio.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 16h18" /><path d="M7 12l3-3 2 2 5-5" />
        </svg>
      ),
      title: 'Aborda tu trabajo más difícil',
      desc: 'Colaboración experta en lo que necesitas resolver — desde análisis financiero crítico hasta estrategia comercial.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
        </svg>
      ),
      title: 'Explora lo que sigue',
      desc: 'Como un equipo experto en tu bolsillo, colaborar con Orbbi expande lo que puedes construir por tu cuenta.',
    },
  ]

  return (
    <section id="producto" className="bg-ivory-mid">
      <div className="space-main" />
      <div className="u-container">
        {/* Centered heading */}
        <FadeIn className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h2 className="u-display-l mb-4">
            <AnimatedWords>La IA para quienes toman decisiones</AnimatedWords>
          </h2>
          <p className="u-paragraph-s mx-auto" style={{ maxWidth: '50ch' }}>
            Delega tareas complejas a agentes especializados.
            Orbbi trabaja con tus datos para darte respuestas accionables.
          </p>
        </FadeIn>

        {/* CTA banner */}
        <FadeIn delay={0.15} className="mb-16">
          <div className="bg-white rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
            <p className="u-paragraph-s text-ink" style={{ color: '#141413' }}>
              Configura tu agente en 5 minutos y recibe tu primer análisis hoy.
            </p>
            <Link href="/registro" className="bg-clay text-white text-sm font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-opacity shrink-0">
              Comenzar gratis
            </Link>
          </div>
        </FadeIn>

        {/* 2-col: features left + mindmap placeholder right */}
        <div className="grid-12">
          <div style={{ gridColumn: 'span 6' }} className="max-md:col-span-full">
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.08}>
                <div className={`py-6 ${i < features.length - 1 ? 'border-b border-cloud-light/50' : ''}`}>
                  <div className="flex items-start gap-4">
                    <div className="text-clay mt-1 shrink-0">{f.icon}</div>
                    <div>
                      <h3 className="text-ink font-medium mb-2" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '18px' }}>
                        {f.title}
                      </h3>
                      <p className="text-sm text-ink-light leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <div style={{ gridColumn: 'span 6' }} className="max-md:col-span-full flex items-center justify-center">
            <FadeIn delay={0.2}>
              <div className="bg-ivory rounded-2xl flex items-center justify-center w-full" style={{ aspectRatio: '1/1', maxWidth: '420px' }}>
                <OrbiLogo size={56} color="dark" />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
      <div className="space-main" />
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════
// 3. USE CASES TABS SECTION (bg-ivory / white)
// ═══════════════════════════════════════════════════════════════════

const TABS_DATA = [
  {
    id: 'tareas', label: 'Tareas',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg>,
    title: 'Gestiona tareas con inteligencia',
    desc: 'Orbbi prioriza, delega y da seguimiento a tus tareas usando frameworks como Eisenhower y GTD. Nada se queda pendiente.',
    artifact: ['$ orbbi tareas --priorizar', '', '> Analizando 12 tareas pendientes...', '> Aplicando matriz Eisenhower...', '', '  URGENTE + IMPORTANTE:', '  [1] Revisar flujo de caja mensual', '  [2] Responder propuesta cliente ABC', '', '  IMPORTANTE (agendar):', '  [3] Planificar campaña Q2', '  [4] Entrevistar candidato senior', '', '> 4 tareas requieren acción inmediata'],
  },
  {
    id: 'finanzas', label: 'Finanzas',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v22" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>,
    title: 'Controla tus finanzas con claridad',
    desc: 'Analiza flujo de caja, márgenes, ratios y proyecciones. El agente financiero detecta problemas antes de que se conviertan en crisis.',
    artifact: ['$ orbbi finanzas --reporte-mensual', '', '> Conectando con datos financieros...', '', '  RESUMEN MARZO 2026', '  ─────────────────────', '  Ingresos:     $42.500.000', '  Egresos:      $31.200.000', '  Margen bruto: 26.6%', '  Flujo neto:   +$11.300.000', '', '> ALERTA: Cuentas por cobrar +15d', '> Sugerencia: Revisar política de cobranza'],
  },
  {
    id: 'ventas', label: 'Ventas',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
    title: 'Optimiza tu pipeline de ventas',
    desc: 'Monitorea tu embudo, analiza retención, CAC/LTV y tasas de cierre. Recibe alertas cuando un indicador requiere atención.',
    artifact: ['$ orbbi ventas --pipeline', '', '> Analizando pipeline de ventas...', '', '  EMBUDO ACTUAL', '  ──────────────', '  Prospectos:     84', '  Calificados:    31 (37%)', '  Propuestas:     12 (39%)', '  Cierre:          5 (42%)', '', '> Tasa de conversión: 5.9%', '> vs. mes anterior: +1.2pp'],
  },
  {
    id: 'marketing', label: 'Marketing',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>,
    title: 'Maximiza el ROI de tus campañas',
    desc: 'Evalúa canales, posicionamiento y contenido. Identifica qué inversiones generan mayor retorno en el mercado latinoamericano.',
    artifact: ['$ orbbi marketing --roi-canales', '', '> Evaluando rendimiento por canal...', '', '  CANAL          INVERSIÓN    ROI', '  ─────────────────────────────', '  Google Ads     $850.000    3.2x', '  Meta Ads       $620.000    2.8x', '  Email          $120.000    7.1x', '  Orgánico       $0          --', '', '> Mejor canal: Email marketing', '> Sugerencia: Aumentar inversión email +40%'],
  },
  {
    id: 'rrhh', label: 'RRHH',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>,
    title: 'Gestiona tu equipo con inteligencia',
    desc: 'Desde contratación hasta desempeño. Analiza cultura organizacional y ayuda a construir equipos de alto rendimiento.',
    artifact: ['$ orbbi rrhh --equipo-resumen', '', '> Analizando equipo (14 personas)...', '', '  SATISFACCIÓN:    7.8/10', '  ROTACIÓN:        8% anual', '  VACANTES:        2 abiertas', '', '  ALERTAS:', '  [!] 3 personas sin evaluación 90d', '  [!] Carga desbalanceada en ventas', '', '> Acción: Programar 1-on-1 con equipo ventas'],
  },
  {
    id: 'legal', label: 'Legal',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /><path d="M16 13H8" /><path d="M16 17H8" /><path d="M10 9H8" /></svg>,
    title: 'Mantente al día con regulaciones',
    desc: 'Revisa contratos, cumplimiento normativo, permisos y regulación. Recibe alertas sobre cambios legales que impactan tu industria.',
    artifact: ['$ orbbi legal --cumplimiento', '', '> Revisando estado regulatorio...', '', '  CONTRATOS ACTIVOS: 8', '  POR VENCER (30d):  2', '  PERMISOS VIGENTES: 5/5', '', '  ALERTAS NORMATIVAS:', '  [!] Nueva ley laboral - revisar contratos', '  [i] Actualización tributaria Q2 2026', '', '> Todo en regla. Próxima revisión: 15 abril'],
  },
]

function UseCasesTabSection() {
  const [active, setActive] = useState(0)
  const tab = TABS_DATA[active]

  return (
    <section id="agentes" className="bg-ivory">
      <div className="space-main" />
      <div className="u-container">
        {/* Centered heading */}
        <FadeIn className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" />
            </svg>
          </div>
          <h2 className="u-display-l">
            <AnimatedWords>Cómo usar Orbbi</AnimatedWords>
          </h2>
        </FadeIn>

        {/* Tab buttons */}
        <FadeIn delay={0.1} className="mb-10">
          <div className="flex flex-wrap justify-center gap-2">
            {TABS_DATA.map((t, i) => (
              <button key={t.id} onClick={() => setActive(i)}
                className={`inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full transition-colors ${
                  i === active
                    ? 'bg-ink text-ivory'
                    : 'bg-ivory-mid text-ink-light hover:bg-cloud-light/60'
                }`}>
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Tab content: 2-col */}
        <div className="grid-12 items-start">
          {/* Left: artifact card */}
          <div style={{ gridColumn: 'span 7' }} className="max-md:col-span-full">
            <FadeIn key={tab.id + '-artifact'}>
              <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#3d3d3a' }}>
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-5 pt-4 pb-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#5e5d59' }} />
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#5e5d59' }} />
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#5e5d59' }} />
                </div>
                {/* Terminal body */}
                <div className="px-5 pb-6 font-mono text-[13px] leading-relaxed" style={{ color: '#d1cfc5' }}>
                  {tab.artifact.map((line, i) => (
                    <div key={i} className={line === '' ? 'h-4' : ''}>
                      {line.startsWith('$') ? (
                        <span><span style={{ color: '#d97757' }}>$</span>{line.slice(1)}</span>
                      ) : line.startsWith('>') ? (
                        <span style={{ color: '#87867f' }}>{line}</span>
                      ) : (
                        <span>{line}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
          {/* Right: description */}
          <div style={{ gridColumn: 'span 5' }} className="max-md:col-span-full flex flex-col justify-center">
            <FadeIn key={tab.id + '-desc'}>
              <h3 className="u-display-s mb-4">{tab.title}</h3>
              <p className="u-paragraph-s mb-6" style={{ maxWidth: '40ch' }}>{tab.desc}</p>
              <Link href="/registro" className="inline-flex items-center gap-2 text-sm font-medium text-clay hover:opacity-70 transition-opacity">
                Explorar
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>
      <div className="space-main" />
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════
// 4. VIDEO / MEDIA SECTION (bg-ivory)
// ═══════════════════════════════════════════════════════════════════

function VideoSection() {
  return (
    <section className="bg-ivory">
      <div className="space-medium" />
      <div className="u-container">
        <FadeIn className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
          <h2 className="u-display-l">
            <AnimatedWords>Sigue pensando con Orbbi</AnimatedWords>
          </h2>
        </FadeIn>

        {/* Video placeholder */}
        <FadeIn delay={0.15}>
          <div className="bg-oat rounded-2xl flex items-center justify-center" style={{ aspectRatio: '16/9' }}>
            <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#141413">
                <polygon points="8 5 20 12 8 19 8 5" />
              </svg>
            </div>
          </div>
        </FadeIn>

        {/* 2-col subtitle */}
        <div className="space-medium" />
        <div className="grid-12">
          <div style={{ gridColumn: 'span 5' }} className="max-md:col-span-full">
            <FadeIn>
              <h3 className="u-display-s">Tu colaborador de confianza</h3>
            </FadeIn>
          </div>
          <div style={{ gridColumn: 'span 7' }} className="max-md:col-span-full flex items-end">
            <FadeIn delay={0.1}>
              <p className="u-paragraph-s" style={{ maxWidth: '48ch' }}>
                Orbbi no solo responde preguntas. Analiza contexto, anticipa problemas,
                sugiere acciones y aprende de tu negocio cada semana. Es la diferencia
                entre buscar información y tener un socio que piensa contigo.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
      <div className="space-medium" />
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════
// 5. PLANES SECTION (bg-ivory-mid)
// ═══════════════════════════════════════════════════════════════════

function PlanesSection() {
  const planes = [
    {
      nombre: 'Básico',
      desc: 'Ideal para emprendedores que quieren empezar a tomar mejores decisiones con IA.',
      features: ['1 agente', 'Consultas básicas', 'Onboarding guiado', 'Soporte email'],
    },
    {
      nombre: 'Pro',
      desc: 'Para negocios en crecimiento que necesitan análisis profundo y reportes automatizados.',
      features: ['7 agentes', 'Reportes semanales', 'Análisis avanzado', 'Soporte prioritario'],
    },
    {
      nombre: 'Enterprise',
      desc: 'Para empresas que necesitan personalización completa, integraciones y soporte dedicado.',
      features: ['Agentes ilimitados', 'API integración', 'Soporte 24/7', 'White-label'],
    },
  ]

  return (
    <section className="bg-ivory-mid">
      <div className="space-main" />
      <div className="u-container">
        <FadeIn className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" /><rect x="4" y="3" width="16" height="4" rx="1" /><path d="M10 14h4" />
            </svg>
          </div>
          <h2 className="u-display-l">
            <AnimatedWords>Planes de Orbbi</AnimatedWords>
          </h2>
        </FadeIn>

        <div className="max-w-3xl mx-auto space-y-4">
          {planes.map((p, i) => (
            <FadeIn key={p.nombre} delay={i * 0.08}>
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Left: plan name */}
                  <div className="md:w-1/3 shrink-0">
                    <h3 className="u-display-s">{p.nombre}</h3>
                  </div>
                  {/* Right: desc, features, link */}
                  <div className="flex-1">
                    <p className="u-paragraph-s mb-4">{p.desc}</p>
                    <p className="text-sm text-ink-light mb-5">
                      {p.features.map((f, fi) => (
                        <span key={fi}>
                          {fi > 0 && <span className="mx-2 text-cloud">·</span>}
                          {f}
                        </span>
                      ))}
                    </p>
                    <Link href="/precios"
                      className="inline-flex items-center gap-2 text-sm font-medium text-ink border border-cloud-light rounded-lg px-4 py-2 hover:bg-ivory-mid transition-colors">
                      Ver detalles
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      <div className="space-main" />
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════
// 6. NOVEDADES SECTION
// ═══════════════════════════════════════════════════════════════════

function NovedadesSection() {
  const items = [
    { title: 'Agente Financiero mejorado con análisis predictivo', tag: 'Producto' },
    { title: 'Reportes semanales automáticos por email', tag: 'Funcionalidad' },
    { title: 'Integración con WhatsApp Business', tag: 'Integración' },
    { title: 'Base de conocimiento ampliada: 10,000+ líneas', tag: 'Metodología' },
    { title: 'Dashboard ejecutivo en tiempo real', tag: 'Funcionalidad' },
  ]

  return (
    <section className="bg-ivory-mid">
      <div className="border-t border-cloud-light/50" />
      <div className="space-medium" />
      <div className="u-container">
        <div className="grid-12">
          {/* Left: heading */}
          <div style={{ gridColumn: 'span 4' }} className="max-md:col-span-full">
            <FadeIn>
              <div className="mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h2 className="u-display-s" style={{ maxWidth: '16ch' }}>
                Explora las últimas novedades
              </h2>
            </FadeIn>
          </div>
          {/* Right: stacked cards */}
          <div style={{ gridColumn: 'span 8' }} className="max-md:col-span-full">
            {items.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.06}>
                <div className="group cursor-pointer py-6 border-b border-cloud-light/40 hover:opacity-70 transition-opacity">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="u-paragraph-s" style={{ color: '#141413', fontFamily: "'Source Serif 4', Georgia, serif" }}>
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-muted">{item.tag}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b0aea5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
      <div className="space-medium" />
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════
// 7. FINAL CTA
// ═══════════════════════════════════════════════════════════════════

function FinalCTA() {
  return (
    <section className="bg-ivory">
      <div className="space-main" />
      <div className="u-container">
        <FadeIn>
          <div className="bg-white rounded-2xl shadow-sm" style={{ padding: 'clamp(2.5rem, 2rem + 2vw, 5rem)' }}>
            <div className="grid-12 items-center">
              {/* Left: heading */}
              <div style={{ gridColumn: 'span 5' }} className="max-md:col-span-full">
                <h2 className="u-display-l">
                  <AnimatedWords>¿Qué desafío enfrenta tu negocio?</AnimatedWords>
                </h2>
              </div>
              {/* Right: prompt bar */}
              <div style={{ gridColumn: 'span 7' }} className="max-md:col-span-full">
                <div className="flex items-center gap-2 bg-ivory rounded-xl px-4 py-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#87867f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Describe tu desafío..."
                    className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
                    readOnly
                  />
                  <Link href="/registro" className="bg-clay text-white text-sm font-medium px-5 py-2 rounded-lg hover:opacity-90 transition-opacity shrink-0">
                    Preguntar a Orbbi
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
      <div className="space-main" />
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════
// 8. FOOTER (dark bg #141413)
// ═══════════════════════════════════════════════════════════════════

function Footer() {
  const cols = [
    { title: 'Productos', links: ['Gerente General', 'Agente Financiero', 'Agente de Ventas', 'Agente de Marketing', 'RRHH', 'Inventario', 'Legal'] },
    { title: 'Soluciones', links: ['Para emprendedores', 'Para PYMEs', 'Para empresas', 'Por industria'] },
    { title: 'Recursos', links: ['Documentación', 'Blog', 'Casos de uso', 'Tutoriales', 'API'] },
    { title: 'Empresa', links: ['Sobre nosotros', 'Contacto', 'Términos de servicio', 'Privacidad'] },
  ]

  return (
    <footer className="footer-dark">
      <div className="u-container" style={{ paddingTop: 'clamp(3rem, 2rem + 2vw, 5rem)', paddingBottom: 'clamp(2rem, 1.5rem + 1vw, 3rem)' }}>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Logo column (2 cols) */}
          <div className="col-span-2">
            <OrbiLogo size={28} color="light" />
            {/* Mini prompt */}
            <div className="flex items-center gap-2 bg-ink-mid rounded-lg px-3 py-2 mt-6 mb-4" style={{ maxWidth: '280px' }}>
              <input
                type="text"
                placeholder="Pregunta algo..."
                className="flex-1 bg-transparent text-xs text-cloud outline-none placeholder:text-muted"
                readOnly
              />
              <button className="text-cloud hover:text-ivory transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
            {/* Pill buttons */}
            <div className="flex gap-2 mb-6">
              {['Escribir', 'Aprender', 'Analizar'].map((label) => (
                <span key={label} className="text-[11px] text-muted border border-ink-mid rounded-full px-3 py-1">
                  {label}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted">By Orbbi</p>
            <p className="text-xs text-muted mt-1">&copy; 2026 Orbbi. Todos los derechos reservados.</p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-medium text-ivory-mid mb-4">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link href="#" className="text-sm text-cloud hover:text-ivory-mid transition-colors">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom social row */}
        <div className="border-t border-ink-mid pt-6 flex items-center gap-4">
          {/* Twitter/X */}
          <a href="#" className="text-muted hover:text-ivory transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          {/* LinkedIn */}
          <a href="#" className="text-muted hover:text-ivory transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          {/* Instagram */}
          <a href="#" className="text-muted hover:text-ivory transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}

// ═══════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════

export default function Home() {
  return (
    <main className="bg-ivory-mid">
      <Nav />
      <Hero />
      <ProblemSolversSection />
      <UseCasesTabSection />
      <VideoSection />
      <PlanesSection />
      <NovedadesSection />
      <FinalCTA />
      <Footer />
    </main>
  )
}
