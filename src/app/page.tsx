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
          <a href="#contacto" className="text-sm text-ink-light hover:text-ink transition-colors">Contacto</a>
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

// ── Hero animated network — 7 agents, bigger circles, rich animations ──
function HeroNetwork() {
  const nodes = [
    { x: 260, y: 200, label: 'General', r: 70 },
    { x: 110, y: 75, label: 'Finanzas', r: 50 },
    { x: 410, y: 75, label: 'Ventas', r: 50 },
    { x: 50, y: 260, label: 'RRHH', r: 46 },
    { x: 470, y: 260, label: 'Marketing', r: 46 },
    { x: 150, y: 380, label: 'Inventario', r: 44 },
    { x: 370, y: 380, label: 'Legal', r: 44 },
  ]
  const edges = [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,3],[2,4],[3,5],[4,6],[5,6],[1,2]]

  const floats = [
    { x: [0, 0, 0], y: [0, -8, 0] },
    { x: [0, -6, 0], y: [0, -5, 0] },
    { x: [0, 6, 0], y: [0, -5, 0] },
    { x: [0, -7, 0], y: [0, 5, 0] },
    { x: [0, 7, 0], y: [0, 5, 0] },
    { x: [0, -4, 0], y: [0, 6, 0] },
    { x: [0, 4, 0], y: [0, 6, 0] },
  ]

  // Colors for satellite nodes
  const colors = ['', '#e8c4b0', '#e8c4b0', '#ddd5c8', '#ddd5c8', '#d6cfc3', '#d6cfc3']

  return (
    <svg viewBox="0 0 520 460" className="w-full mx-auto" style={{ maxWidth: 520 }}>
      <defs>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d97757" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#d97757" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background glow */}
      <circle cx={260} cy={200} r={160} fill="url(#centerGlow)" />

      {/* Animated orbit rings */}
      <motion.circle cx={260} cy={200} r={120} fill="none" stroke="#d1cfc5" strokeWidth={0.5} strokeDasharray="4 6"
        animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '260px 200px' }}
      />
      <motion.circle cx={260} cy={200} r={180} fill="none" stroke="#d1cfc5" strokeWidth={0.3} strokeDasharray="3 8"
        animate={{ rotate: -360 }} transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '260px 200px' }}
      />

      {/* Edges with gradient */}
      {edges.map(([a,b],i) => (
        <motion.line key={i}
          x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke="#d1cfc5" strokeWidth={1.2}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.25 }}
          transition={{ duration: 1, delay: 0.5 + i * 0.06, ease: [0.25,0.46,0.45,0.94] }}
        />
      ))}

      {/* Data flow dots on edges */}
      {[0,1,2,3,4,5].map(i => {
        const [a,b] = edges[i]
        return (
          <motion.circle key={`flow${i}`} r={2.5} fill="#d97757"
            animate={{
              cx: [nodes[a].x, nodes[b].x],
              cy: [nodes[a].y, nodes[b].y],
              opacity: [0, 0.6, 0],
            }}
            transition={{ duration: 2 + i * 0.3, delay: 1.5 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )
      })}

      {/* Nodes */}
      {nodes.map((n,i) => (
        <motion.g key={i}
          animate={{ x: floats[i].x, y: floats[i].y }}
          transition={{ duration: 4 + i * 0.4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: i * 0.2 }}
        >
          {/* Shadow */}
          {i === 0 && <circle cx={n.x} cy={n.y + 4} r={n.r + 2} fill="#d97757" opacity={0.1} />}

          {/* Circle */}
          <motion.circle cx={n.x} cy={n.y} r={n.r}
            fill={i===0 ? '#d97757' : colors[i] || '#f0eee6'}
            stroke={i===0 ? '#c6613f' : '#c8c3b8'}
            strokeWidth={i===0 ? 2.5 : 1.5}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 + i * 0.08, ease: [0.16,1,0.3,1] }}
          />

          {/* Label */}
          <motion.text x={n.x} y={n.y + (i===0 ? 7 : 5)} textAnchor="middle"
            fill={i===0 ? '#fff' : '#5e5d59'}
            fontSize={i===0 ? 22 : 16} fontFamily="'Source Serif 4', Georgia, serif" fontWeight={i===0 ? 500 : 400}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
          >{n.label}</motion.text>
        </motion.g>
      ))}

      {/* Center pulse rings */}
      {[0, 1, 2].map(i => (
        <motion.circle key={`pulse${i}`} cx={260} cy={200} fill="none" stroke="#d97757" strokeWidth={1.2 - i * 0.3}
          animate={{ r: [70, 100 + i * 20, 70], opacity: [0.3 - i * 0.08, 0, 0.3 - i * 0.08] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
        />
      ))}

      {/* Floating particles */}
      {[...Array(12)].map((_,i) => (
        <motion.circle key={`p${i}`}
          cx={30 + Math.random() * 460} cy={20 + Math.random() * 420} r={1.5 + Math.random()}
          fill="#d97757"
          animate={{
            opacity: [0, 0.3 + Math.random() * 0.2, 0],
            y: [0, -30 - Math.random() * 40, 0],
          }}
          transition={{ duration: 3 + Math.random()*3, delay: Math.random()*3, repeat: Infinity, ease: 'easeInOut' }}
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
              3 preguntas sobre tu negocio. 1 minuto. Y tu equipo directivo empieza a trabajar.
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
// SOCIAL PROOF / TESTIMONIALS SECTION
// ═══════════════════════════════════════════════════════════════════

const TESTIMONIALS = [
  {
    quote: 'Antes tomaba decisiones financieras a ciegas. Ahora el agente financiero me muestra mi punto de equilibrio real y me alerta cuando el flujo de caja se pone crítico.',
    name: 'María Fernanda López',
    role: 'Dueña, Café del Parque',
    country: '\u{1F1E8}\u{1F1F1} Chile',
  },
  {
    quote: 'Lo que más me sorprendió es que recuerda todo. Le dije hace 3 semanas que mi proveedor subió precios y hoy me preguntó si pude negociar. Ningún chatbot hace eso.',
    name: 'Carlos Mendoza',
    role: 'Gerente, Distribuidora del Norte',
    country: '\u{1F1F2}\u{1F1FD} México',
  },
  {
    quote: 'Reemplacé 3 consultores por Orbbi. El de marketing me dio una estrategia mejor que la agencia que me cobraba $2M al mes. Y está disponible a las 11PM cuando cierro el local.',
    name: 'Ana Sofía Ramírez',
    role: 'Fundadora, Boutique Tres60',
    country: '\u{1F1E8}\u{1F1F4} Colombia',
  },
]

const STATS = [
  { label: 'PYMEs en beta', value: 100, suffix: '+' },
  { label: 'países', value: 7, suffix: '' },
  { label: 'consultas respondidas', value: 10000, suffix: '+' },
]

function SocialProofSection() {
  return (
    <section className="bg-ivory-dark">
      <div className="space-main" />
      <div className="u-container">
        {/* Numbers banner */}
        <FadeIn className="mb-16">
          <div className="bg-white rounded-2xl px-8 py-8 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 shadow-sm">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-semibold text-ink" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                  <AnimatedNumber value={s.value} suffix={s.suffix} />
                </p>
                <p className="text-sm text-ink-light mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Section heading */}
        <FadeIn className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          </div>
          <h2 className="u-display-l mb-4">
            <AnimatedWords>Lo que dicen nuestros primeros usuarios</AnimatedWords>
          </h2>
          <p className="u-paragraph-s mx-auto" style={{ maxWidth: '50ch' }}>
            PYMEs de toda Latinoamérica ya están tomando mejores decisiones con Orbbi.
          </p>
        </FadeIn>

        {/* 3 testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-8 shadow-sm h-full flex flex-col">
                {/* Quote icon */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-clay mb-4 shrink-0">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" fill="#d97757" opacity="0.15" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" fill="#d97757" opacity="0.15" />
                </svg>
                <p className="text-sm text-ink leading-relaxed flex-1 mb-6" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-cloud-light/50 pt-4">
                  <p className="text-sm font-medium text-ink">{t.name}</p>
                  <p className="text-xs text-ink-light mt-0.5">{t.role}</p>
                  <p className="text-xs text-muted mt-1">{t.country}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Logo bar placeholder */}
        <FadeIn delay={0.3}>
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted mb-6">
              Empresas que confían en Orbbi
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-30">
              {['Café del Parque', 'Distribuidora del Norte', 'Boutique Tres60', 'Grupo Andino', 'TechLatam'].map((name) => (
                <span key={name} className="text-sm font-medium text-ink" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                  {name}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
      <div className="space-main" />
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════
// 4. VIDEO / MEDIA SECTION (bg-ivory)
// ═══════════════════════════════════════════════════════════════════

function VideoSection() {
  const chatLines = [
    { from: 'user', text: '¿Cuánto necesito vender este mes para cubrir costos fijos?' },
    { from: 'agent', label: 'Agente Financiero', text: 'Basado en tus costos fijos de $8.2M y margen promedio de 34%, necesitas vender al menos $24.1M este mes. Llevas $18.7M — te faltan $5.4M en 12 días.' },
    { from: 'user', text: '¿Qué puedo hacer para acelerar ventas?' },
    { from: 'agent', label: 'Agente de Ventas', text: 'Tienes 8 cotizaciones pendientes por $12.3M. Te recomiendo priorizar las 3 con mayor probabilidad de cierre. ¿Quieres que prepare un plan de seguimiento?' },
  ]

  return (
    <section className="bg-ivory">
      <div className="space-medium" />
      <div className="u-container">
        <FadeIn className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" />
            </svg>
          </div>
          <h2 className="u-display-l">
            <AnimatedWords>Ve cómo funciona</AnimatedWords>
          </h2>
        </FadeIn>

        {/* Chat mockup preview */}
        <FadeIn delay={0.15}>
          <div className="relative rounded-2xl overflow-hidden shadow-lg mx-auto" style={{ maxWidth: '720px' }}>
            {/* Chat interface mockup */}
            <div className="bg-white">
              {/* Chat header */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-cloud-light/50">
                <div className="w-8 h-8 rounded-full bg-clay/15 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">Orbbi Chat</p>
                  <p className="text-xs text-muted">Tu equipo directivo inteligente</p>
                </div>
              </div>
              {/* Chat messages */}
              <div className="px-6 py-5 space-y-4">
                {chatLines.map((line, i) => (
                  <div key={i} className={`flex ${line.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-xl px-4 py-3 ${
                      line.from === 'user'
                        ? 'bg-ink text-ivory text-sm'
                        : 'bg-ivory-dark text-ink text-sm'
                    }`}>
                      {line.from === 'agent' && (
                        <p className="text-xs font-medium text-clay mb-1">{line.label}</p>
                      )}
                      <p className="leading-relaxed">{line.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Semi-transparent overlay with CTA */}
            <div className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/80 to-transparent flex flex-col items-center justify-end pb-10">
              <p className="text-lg font-medium text-ink mb-4" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                Así conversa tu equipo directivo
              </p>
              <a
                href="#contacto"
                className="bg-clay text-white text-sm font-medium px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Solicitar demo
              </a>
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

function ComoEmpezarSection() {
  const pasos = [
    { num: '01', titulo: 'Regístrate en 30 segundos', desc: 'Solo necesitas email y contraseña. Sin tarjeta de crédito. 7 días gratis con acceso a todos los agentes.' },
    { num: '02', titulo: '3 preguntas sobre tu negocio', desc: 'Cuéntanos a qué te dedicas, tus ventas y tu mayor desafío. En 1 minuto tu equipo te conoce.' },
    { num: '03', titulo: 'Habla con tu primer agente', desc: 'El Gerente General analiza tu situación y te propone las primeras acciones. Después, activa los agentes que necesites.' },
  ]

  return (
    <section className="bg-ivory">
      <div className="space-medium" />
      <div className="u-container">
        <FadeIn className="text-center mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent mb-3">Empieza hoy</p>
          <h2 className="u-display-l">
            <AnimatedWords>3 pasos y tu equipo está listo</AnimatedWords>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {pasos.map((paso, i) => (
            <FadeIn key={paso.num} delay={i * 0.1}>
              <div className="text-center">
                <span className="text-4xl font-light text-clay/30 block mb-4" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>{paso.num}</span>
                <h3 className="text-ink font-medium mb-2" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '18px' }}>
                  {paso.titulo}
                </h3>
                <p className="text-sm text-ink-light leading-relaxed">{paso.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3} className="text-center mt-10">
          <Link href="/registro" className="bg-ink text-ivory text-sm font-medium px-8 py-3 rounded-lg hover:bg-ink-mid transition-colors inline-block">
            Comenzar gratis
          </Link>
        </FadeIn>
      </div>
      <div className="space-medium" />
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════
// 7. FINAL CTA
// ═══════════════════════════════════════════════════════════════════

function FinalCTA() {
  const [form, setForm] = useState({ nombre: '', email: '', pais: '', mensaje: '' })
  const [estado, setEstado] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nombre || !form.email || !form.pais || !form.mensaje) return
    setEstado('sending')
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setEstado('sent')
        setForm({ nombre: '', email: '', pais: '', mensaje: '' })
      } else {
        setEstado('error')
      }
    } catch {
      setEstado('error')
    }
  }

  return (
    <section id="contacto" className="bg-ivory">
      <div className="space-main" />
      <div className="u-container">
        <div className="grid-12">
          {/* Left: heading */}
          <div style={{ gridColumn: 'span 5' }} className="max-md:col-span-full">
            <FadeIn>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent mb-3">Contacto</p>
              <h2 className="u-display-l mb-4">
                <AnimatedWords>¿Tienes preguntas? Escríbenos</AnimatedWords>
              </h2>
              <p className="u-paragraph-s" style={{ maxWidth: '36ch' }}>
                Nuestro equipo te responderá en menos de 24 horas.
              </p>
            </FadeIn>
          </div>

          {/* Right: form */}
          <div style={{ gridColumn: 'span 7' }} className="max-md:col-span-full">
            <FadeIn delay={0.1}>
              {estado === 'sent' ? (
                <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
                  </div>
                  <h3 className="text-lg text-ink font-medium mb-2" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>Mensaje enviado</h3>
                  <p className="text-sm text-muted">Te responderemos pronto a {form.email || 'tu email'}.</p>
                </div>
              ) : (
                <form onSubmit={enviar} className="bg-white rounded-2xl shadow-sm p-8 space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium uppercase tracking-[0.1em] text-muted block mb-1.5">Nombre</label>
                      <input
                        type="text" required value={form.nombre}
                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                        placeholder="Tu nombre"
                        className="w-full border border-ink/[0.08] rounded-lg px-4 py-2.5 text-sm text-ink bg-ivory placeholder:text-muted/50 focus:outline-none focus:border-ink/25 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium uppercase tracking-[0.1em] text-muted block mb-1.5">Email</label>
                      <input
                        type="email" required value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="tu@email.com"
                        className="w-full border border-ink/[0.08] rounded-lg px-4 py-2.5 text-sm text-ink bg-ivory placeholder:text-muted/50 focus:outline-none focus:border-ink/25 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium uppercase tracking-[0.1em] text-muted block mb-1.5">País</label>
                    <select
                      required value={form.pais}
                      onChange={(e) => setForm({ ...form, pais: e.target.value })}
                      className="w-full border border-ink/[0.08] rounded-lg px-4 py-2.5 text-sm text-ink bg-ivory focus:outline-none focus:border-ink/25 transition-colors"
                    >
                      <option value="">Selecciona tu país</option>
                      <option value="Chile">Chile</option>
                      <option value="México">México</option>
                      <option value="Colombia">Colombia</option>
                      <option value="Perú">Perú</option>
                      <option value="Argentina">Argentina</option>
                      <option value="Bolivia">Bolivia</option>
                      <option value="Ecuador">Ecuador</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium uppercase tracking-[0.1em] text-muted block mb-1.5">Mensaje</label>
                    <textarea
                      required rows={4} value={form.mensaje}
                      onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                      placeholder="¿En qué podemos ayudarte?"
                      className="w-full border border-ink/[0.08] rounded-lg px-4 py-2.5 text-sm text-ink bg-ivory placeholder:text-muted/50 focus:outline-none focus:border-ink/25 transition-colors resize-none"
                    />
                  </div>
                  {estado === 'error' && (
                    <p className="text-sm text-red-500">Error al enviar. Intenta de nuevo.</p>
                  )}
                  <button
                    type="submit"
                    disabled={estado === 'sending'}
                    className="bg-ink text-ivory rounded-lg px-6 py-3 text-sm font-medium hover:bg-ink-mid transition-colors disabled:opacity-40"
                  >
                    {estado === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
                  </button>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
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
            {/* Key numbers */}
            <div className="flex gap-4 mb-6">
              <div>
                <p className="text-sm font-medium text-ivory-mid">7</p>
                <p className="text-[10px] text-muted">agentes</p>
              </div>
              <div>
                <p className="text-sm font-medium text-ivory-mid">7</p>
                <p className="text-[10px] text-muted">países</p>
              </div>
              <div>
                <p className="text-sm font-medium text-ivory-mid">24/7</p>
                <p className="text-[10px] text-muted">disponible</p>
              </div>
            </div>
            <p className="text-xs text-muted">Orbbi — Tu equipo directivo virtual</p>
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
      <SocialProofSection />
      <VideoSection />
      <PlanesSection />
      <ComoEmpezarSection />
      <FinalCTA />
      <Footer />
    </main>
  )
}
