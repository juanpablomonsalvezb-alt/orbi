'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import OrbiLogo from '@/components/ui/OrbiLogo'
import PricingPage from '@/components/PricingPage'

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
        <Link href="/"><OrbiLogo size={36} color="dark" /></Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#producto" className="text-sm text-ink-light hover:text-ink transition-colors">Producto</a>
          <a href="#agentes" className="text-sm text-ink-light hover:text-ink transition-colors">Agentes</a>
          <a href="#precios" className="text-sm text-ink-light hover:text-ink transition-colors">Precios</a>
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

// ── Hero animated network — 6 agents, large circles, floating motion ──
function HeroNetwork() {
  const nodes = [
    { x: 250, y: 175, label: 'General', r: 58 },
    { x: 100, y: 70, label: 'Finanzas', r: 42 },
    { x: 400, y: 70, label: 'Ventas', r: 42 },
    { x: 60, y: 280, label: 'RRHH', r: 38 },
    { x: 440, y: 280, label: 'Marketing', r: 38 },
    { x: 250, y: 355, label: 'Inventario', r: 36 },
  ]
  const edges = [[0,1],[0,2],[0,3],[0,4],[0,5],[1,3],[2,4],[3,5],[4,5]]

  // Each node floats gently in a unique pattern
  const floats = [
    { x: [0, 0, 0], y: [0, -6, 0] },         // General — gentle up/down
    { x: [0, -5, 0], y: [0, -4, 0] },         // Finanzas
    { x: [0, 5, 0], y: [0, -4, 0] },          // Ventas
    { x: [0, -6, 0], y: [0, 4, 0] },          // RRHH
    { x: [0, 6, 0], y: [0, 4, 0] },           // Marketing
    { x: [0, 0, 0], y: [0, 5, 0] },           // Inventario
  ]

  return (
    <svg viewBox="0 0 500 400" className="w-full mx-auto" style={{ maxWidth: 480 }}>
      {/* Edges */}
      {edges.map(([a,b],i) => (
        <motion.line key={i}
          x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke="#d1cfc5" strokeWidth={1.5}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.35 }}
          transition={{ duration: 0.9, delay: 0.5 + i * 0.07, ease: [0.25,0.46,0.45,0.94] }}
        />
      ))}
      {/* Nodes — each floats independently */}
      {nodes.map((n,i) => (
        <motion.g key={i}
          animate={{ x: floats[i].x, y: floats[i].y }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: i * 0.3 }}
        >
          {/* Circle */}
          <motion.circle cx={n.x} cy={n.y} r={n.r}
            fill={i===0 ? '#d97757' : '#f0eee6'} stroke={i===0 ? '#c6613f' : '#d1cfc5'} strokeWidth={2}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.16,1,0.3,1] }}
          />
          {/* Label */}
          <motion.text x={n.x} y={n.y + (i===0 ? 6 : 5)} textAnchor="middle"
            fill={i===0 ? '#fff' : '#5e5d59'}
            fontSize={i===0 ? 20 : 15} fontFamily="'Source Serif 4', Georgia, serif" fontWeight={i===0 ? 500 : 400}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
          >{n.label}</motion.text>
        </motion.g>
      ))}
      {/* Pulse rings on center */}
      <motion.circle cx={250} cy={175} r={58} fill="none" stroke="#d97757" strokeWidth={1.5}
        animate={{ r: [58, 85, 58], opacity: [0.35, 0, 0.35] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.circle cx={250} cy={175} r={58} fill="none" stroke="#d97757" strokeWidth={0.8}
        animate={{ r: [58, 100, 58], opacity: [0.2, 0, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
      {/* Floating particles */}
      {[...Array(8)].map((_,i) => (
        <motion.circle key={`p${i}`}
          cx={50 + Math.random() * 400} cy={30 + Math.random() * 340} r={2}
          fill={`rgba(217,119,87,${0.1 + Math.random() * 0.15})`}
          animate={{ opacity: [0, 0.5, 0], cy: [30 + Math.random()*340, Math.random()*170, -10] }}
          transition={{ duration: 3 + Math.random()*2, delay: Math.random()*2, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  )
}

// ── Animated metric ring (reusable) ──
const RING_R = 42
const RING_C = 2 * Math.PI * RING_R

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    function tick(now: number) {
      const p = Math.min((now - start) / 1400, 1)
      setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value])
  return <span ref={ref}>{display}{suffix}</span>
}

function MetricRing({ value, max, label, color, delay = 0 }: {
  value: number; max: number; label: string; color: string; delay?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const pct = Math.max(0, Math.min(1, value / max))
  return (
    <motion.div ref={ref} className="flex flex-col items-center"
      initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease }}
    >
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx={50} cy={50} r={RING_R} fill="none" stroke="#e3dacc" strokeWidth={5} />
          {inView && (
            <motion.circle cx={50} cy={50} r={RING_R} fill="none" stroke={color} strokeWidth={5} strokeLinecap="round"
              strokeDasharray={RING_C}
              initial={{ strokeDashoffset: RING_C }}
              animate={{ strokeDashoffset: RING_C * (1 - pct) }}
              transition={{ duration: 1.6, delay: delay + 0.2, ease }}
            />
          )}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-semibold text-ink" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
            <AnimatedNumber value={value} suffix="%" />
          </span>
        </div>
      </div>
      <p className="text-xs font-medium text-ink mt-2">{label}</p>
    </motion.div>
  )
}

// ── Sparkline chart (reusable) ──
function SparklineChart() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const data = [320, 380, 350, 420, 480, 460, 520, 580, 550, 620, 680, 710]
  const w = 260, h = 50
  const min = Math.min(...data) - 20, max = Math.max(...data) + 20
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min)) * h}`).join(' ')
  const area = `M0,${h} L${data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min)) * h}`).join(' L')} L${w},${h} Z`

  return (
    <div ref={ref} className="bg-white rounded-xl border border-cloud-light/50 p-5 w-full">
      <p className="text-xs font-medium uppercase tracking-widest text-muted mb-3">Ingresos mensuales</p>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="spFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d97757" stopOpacity={0.15} />
            <stop offset="100%" stopColor="#d97757" stopOpacity={0} />
          </linearGradient>
        </defs>
        <motion.path d={area} fill="url(#spFill)" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.4 }} />
        <motion.polyline points={pts} fill="none" stroke="#d97757" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.3, ease }}
        />
      </svg>
      <div className="flex justify-between mt-2">
        <span className="text-xs text-muted">Ene</span>
        <span className="text-xs font-medium text-ink">$710K</span>
        <span className="text-xs text-muted">Dic</span>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <header className="bg-ivory-dark">
      <div style={{ paddingTop: 'clamp(3rem, 2rem + 3vw, 5rem)' }} />
      <div className="u-container">
        <div className="grid-12 items-center">
          {/* Left 7 cols */}
          <div style={{ gridColumn: 'span 7' }} className="max-md:col-span-full">
            <motion.h1 className="u-display-xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
            >
              <AnimatedWords>
                7 gerentes. 24/7. $29/mes.
              </AnimatedWords>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25,0.46,0.45,0.94] }}
            >
              <p className="u-paragraph-l mb-8" style={{ maxWidth: '44ch' }}>
                Las grandes empresas tienen un directorio completo: finanzas,
                ventas, marketing, RRHH, legal. Tu PYME ahora también — por
                menos de lo que pagas de internet.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.25,0.46,0.45,0.94] }}
            >
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
            </motion.div>
          </div>

          {/* Right 5 cols: Animated agent network */}
          <div style={{ gridColumn: 'span 5' }} className="max-md:col-span-full max-md:mt-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16,1,0.3,1] }}
            >
              <HeroNetwork />
            </motion.div>
          </div>
        </div>
      </div>
      <div style={{ paddingBottom: 'clamp(3rem, 2rem + 3vw, 5rem)' }} />
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
      title: 'Tu equipo directivo completo',
      desc: 'Finanzas, ventas, marketing, RRHH, inventario y legal — 7 gerentes especializados que antes solo las grandes empresas podían pagar.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 16h18" /><path d="M7 12l3-3 2 2 5-5" />
        </svg>
      ),
      title: 'Conoce tu negocio mejor que tú',
      desc: 'Cada agente aprende de tu empresa: tus números, clientes, metas y dolores. No da consejos genéricos — da recomendaciones específicas para TU negocio.',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
        </svg>
      ),
      title: 'Tu negocio nunca más decide solo',
      desc: 'Antes de cada decisión importante — subir precios, contratar, invertir — pregúntale a tu equipo. Disponible a las 3AM de un domingo.',
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
            <AnimatedWords>Lo que antes costaba $15M al mes, ahora cuesta $29</AnimatedWords>
          </h2>
          <p className="u-paragraph-s mx-auto" style={{ maxWidth: '50ch' }}>
            Un equipo directivo completo que conoce tu negocio en profundidad.
            Cada agente es un especialista que trabaja solo para ti, 24/7.
          </p>
        </FadeIn>

        {/* CTA banner */}
        <FadeIn delay={0.15} className="mb-16">
          <div className="bg-white rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
            <p className="u-paragraph-s text-ink" style={{ color: '#141413' }}>
              7 preguntas sobre tu negocio. 2 minutos. Y tu equipo directivo empieza a trabajar.
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
          <div style={{ gridColumn: 'span 6' }} className="max-md:col-span-full flex flex-col items-center justify-center gap-6">
            {/* Animated metric rings */}
            <FadeIn delay={0.15}>
              <div className="flex items-center justify-center gap-8">
                <MetricRing value={78} max={100} label="Ventas" color="#d97757" delay={0} />
                <MetricRing value={92} max={100} label="Margen" color="#22c55e" delay={0.15} />
                <MetricRing value={65} max={100} label="Cobertura" color="#f59e0b" delay={0.3} />
              </div>
            </FadeIn>
            {/* Animated sparkline */}
            <FadeIn delay={0.3} className="w-full max-w-sm">
              <SparklineChart />
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
            <AnimatedWords>Tu directorio trabaja así</AnimatedWords>
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
            <AnimatedWords>Mira cómo funciona</AnimatedWords>
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
              <h3 className="u-display-s">No es un chatbot. Es tu equipo.</h3>
            </FadeIn>
          </div>
          <div style={{ gridColumn: 'span 7' }} className="max-md:col-span-full flex items-end">
            <FadeIn delay={0.1}>
              <p className="u-paragraph-s" style={{ maxWidth: '48ch' }}>
                Orbbi recuerda cada conversación, hace seguimiento de las tareas
                que recomendó, y cuando detecta un problema fuera de su área,
                te conecta con el agente correcto. Como un equipo real.
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
  return (
    <section id="precios">
      <PricingPage />
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════
// 6. NOVEDADES SECTION
// ═══════════════════════════════════════════════════════════════════

function NovedadesSection() {
  const items = [
    { title: '7 agentes especializados con frameworks de negocio LATAM', tag: 'Producto' },
    { title: 'Onboarding de 7 preguntas para contextualizar tu empresa', tag: 'Funcionalidad' },
    { title: 'Chat ilimitado con historial de conversaciones', tag: 'Funcionalidad' },
    { title: 'Análisis financiero con benchmarks por industria', tag: 'Metodología' },
    { title: 'Frameworks de gestión: Cynefin, Fayol, OODA, Eisenhower', tag: 'Metodología' },
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
                  <AnimatedWords>¿Listo para tener tu propio directorio?</AnimatedWords>
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
    { title: 'Empresa', links: [
      { text: 'Sobre nosotros', href: '#' },
      { text: 'Contacto', href: 'mailto:hola@orbbi.com' },
      { text: 'Términos de servicio', href: '/terminos' },
      { text: 'Política de privacidad', href: '/privacidad' },
    ] },
  ]

  return (
    <footer className="footer-dark">
      <div className="u-container" style={{ paddingTop: 'clamp(3rem, 2rem + 2vw, 5rem)', paddingBottom: 'clamp(2rem, 1.5rem + 1vw, 3rem)' }}>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Logo column (2 cols) */}
          <div className="col-span-2">
            <OrbiLogo size={36} color="light" />
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
                {col.links.map((l) => {
                  const text = typeof l === 'string' ? l : l.text
                  const href = typeof l === 'string' ? '#' : l.href
                  return (
                    <li key={text}>
                      <Link href={href} className="text-sm text-cloud hover:text-ivory-mid transition-colors">
                        {text}
                      </Link>
                    </li>
                  )
                })}
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
