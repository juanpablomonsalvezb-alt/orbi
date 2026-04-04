'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import OrbiLogo from '@/components/ui/OrbiLogo'

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]
const EASE_CINE: [number, number, number, number] = [0.16, 1, 0.3, 1]

// ════════════════════════════════════════════════════════════════
// 1. SVG PATH DRAW — Logo Orbbi dibujándose
// ════════════════════════════════════════════════════════════════

function PathDrawLogo() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  // Paths abstractos que representan la marca Orbbi (hexágono + conexiones)
  const paths = [
    'M60 10 L110 35 L110 85 L60 110 L10 85 L10 35 Z',
    'M60 30 L90 47 L90 78 L60 95 L30 78 L30 47 Z',
    'M60 10 L60 30 M110 35 L90 47 M110 85 L90 78 M60 110 L60 95 M10 85 L30 78 M10 35 L30 47',
  ]

  return (
    <div ref={ref} className="flex flex-col items-center gap-4">
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
          <defs>
            <filter id="glow-logo" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <g filter={inView ? 'url(#glow-logo)' : undefined}>
            {paths.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                stroke="#d97757"
                strokeWidth={i === 2 ? 1 : 2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{
                  pathLength: { duration: 1.4, delay: i * 0.3, ease: [0.65, 0, 0.35, 1] },
                  opacity: { duration: 0.2, delay: i * 0.3 },
                }}
              />
            ))}
            {/* Centro relleno */}
            <motion.circle
              cx={60} cy={60} r={8}
              fill="none"
              stroke="#d97757"
              strokeWidth={2}
              initial={{ pathLength: 0, opacity: 0, fill: 'rgba(217,119,87,0)' }}
              animate={inView ? { pathLength: 1, opacity: 1, fill: 'rgba(217,119,87,0.15)' } : {}}
              transition={{ pathLength: { duration: 0.6, delay: 0.9 }, fill: { duration: 0.8, delay: 1.2 } }}
            />
          </g>
        </svg>
      </div>
      <p className="text-xs text-muted uppercase tracking-widest">SVG Path Draw</p>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
// 2. CIRCULAR PROGRESS RINGS — KPIs de negocio
// ════════════════════════════════════════════════════════════════

const RING_R = 42
const RING_C = 2 * Math.PI * RING_R

function AnimatedNumber({ value, duration = 1.2, suffix = '' }: { value: number; duration?: number; suffix?: string }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    function tick(now: number) {
      const elapsed = (now - start) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(value * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value, duration])

  return <span ref={ref}>{display}{suffix}</span>
}

function MetricRing({ value, max, label, color, delay = 0 }: {
  value: number; max: number; label: string; color: string; delay?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const pct = Math.max(0, Math.min(1, value / max))

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx={50} cy={50} r={RING_R} fill="none" stroke="#e3dacc" strokeWidth={5} />
          {inView && (
            <motion.circle
              cx={50} cy={50} r={RING_R}
              fill="none" stroke={color} strokeWidth={5} strokeLinecap="round"
              strokeDasharray={RING_C}
              initial={{ strokeDashoffset: RING_C }}
              animate={{ strokeDashoffset: RING_C * (1 - pct) }}
              transition={{ duration: 1.6, delay: delay + 0.2, ease: EASE }}
            />
          )}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-semibold text-ink" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
            <AnimatedNumber value={value} suffix="%" duration={1.6} />
          </span>
        </div>
      </div>
      <p className="text-xs font-medium text-ink mt-2">{label}</p>
    </motion.div>
  )
}

function BusinessRings() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-center gap-8">
        <MetricRing value={78} max={100} label="Ventas" color="#d97757" delay={0} />
        <MetricRing value={92} max={100} label="Margen" color="#22c55e" delay={0.15} />
        <MetricRing value={65} max={100} label="Cobertura" color="#f59e0b" delay={0.3} />
      </div>
      <p className="text-xs text-muted uppercase tracking-widest">Circular Progress Rings</p>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
// 3. SPARKLINE CHART — Tendencia de ingresos
// ════════════════════════════════════════════════════════════════

function SparklineChart() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const data = [320, 380, 350, 420, 480, 460, 520, 580, 550, 620, 680, 710]
  const w = 280, h = 60
  const min = Math.min(...data) - 20
  const max = Math.max(...data) + 20

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / (max - min)) * h
    return `${x},${y}`
  }).join(' ')

  const areaPath = `M0,${h} L${data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / (max - min)) * h
    return `${x},${y}`
  }).join(' L')} L${w},${h} Z`

  return (
    <div ref={ref} className="flex flex-col items-center gap-4">
      <div className="bg-white rounded-xl border border-cloud-light/50 p-5 w-full max-w-sm">
        <p className="text-xs font-medium uppercase tracking-widest text-muted mb-3">Ingresos mensuales</p>
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d97757" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#d97757" stopOpacity={0} />
            </linearGradient>
          </defs>
          <motion.path
            d={areaPath} fill="url(#sparkFill)"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          />
          <motion.polyline
            points={points} fill="none" stroke="#d97757" strokeWidth={2}
            strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
          />
        </svg>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-muted">Ene</span>
          <span className="text-xs font-medium text-ink">$710K</span>
          <span className="text-xs text-muted">Dic</span>
        </div>
      </div>
      <p className="text-xs text-muted uppercase tracking-widest">Sparkline Path Animation</p>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
// 4. BREATHING PULSE — Pulso de actividad
// ════════════════════════════════════════════════════════════════

function ActivityPulse() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex items-center justify-center w-28 h-28">
        {/* Outer glow rings */}
        <motion.div
          className="absolute w-28 h-28 rounded-full border border-clay/20"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-20 h-20 rounded-full border border-clay/30"
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0.2, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        {/* Core circle */}
        <motion.div
          className="w-14 h-14 rounded-full bg-clay/10 border-2 border-clay flex items-center justify-center"
          animate={{ scale: [0.9, 1.05, 0.9] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-sm font-semibold text-clay">ON</span>
        </motion.div>
      </div>
      <p className="text-xs text-muted uppercase tracking-widest">Breathing Pulse</p>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
// 5. AMBIENT PARTICLES — Partículas flotantes
// ════════════════════════════════════════════════════════════════

function AmbientParticles() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-48 h-32 bg-ink rounded-xl overflow-hidden flex items-center justify-center">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 2 + Math.random() * 3,
              height: 2 + Math.random() * 3,
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              background: `rgba(217,119,87,${0.15 + Math.random() * 0.3})`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              y: [10, -20, -40],
            }}
            transition={{
              duration: 2.5 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
        <span className="text-ivory/60 text-xs font-medium z-10 tracking-wider">ORBBI</span>
      </div>
      <p className="text-xs text-muted uppercase tracking-widest">Ambient Particles</p>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
// 6. XP PROGRESS BAR — Progreso de onboarding
// ════════════════════════════════════════════════════════════════

function ProgressBar() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="flex flex-col items-center gap-4 w-full max-w-sm">
      <div className="bg-white rounded-xl border border-cloud-light/50 p-5 w-full">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-ink">Configuración completada</span>
          <span className="text-sm font-semibold text-clay">
            <AnimatedNumber value={73} suffix="%" duration={1.2} />
          </span>
        </div>
        <div className="h-2 bg-oat rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #d97757, #c6613f)' }}
            initial={{ width: '0%' }}
            animate={inView ? { width: '73%' } : {}}
            transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
          />
        </div>
        <div className="flex gap-2 mt-3">
          {['Empresa', 'Finanzas', 'Clientes', 'Metas'].map((step, i) => (
            <motion.div
              key={step}
              className={`flex-1 h-1 rounded-full ${i < 3 ? 'bg-clay' : 'bg-oat'}`}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.15, ease: EASE }}
              style={{ transformOrigin: 'left' }}
            />
          ))}
        </div>
      </div>
      <p className="text-xs text-muted uppercase tracking-widest">Animated Progress Bar</p>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
// 7. HEATMAP GRID — Actividad semanal
// ════════════════════════════════════════════════════════════════

function ActivityHeatmap() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const weeks = 12
  const days = 7
  const colors = ['bg-ivory-dark', 'bg-clay/20', 'bg-clay/40', 'bg-clay/60', 'bg-clay/80']

  return (
    <div ref={ref} className="flex flex-col items-center gap-4">
      <div className="bg-white rounded-xl border border-cloud-light/50 p-5">
        <p className="text-xs font-medium uppercase tracking-widest text-muted mb-3">Actividad de agentes</p>
        <div className="flex gap-[3px]">
          {Array.from({ length: weeks }).map((_, w) => (
            <div key={w} className="flex flex-col gap-[3px]">
              {Array.from({ length: days }).map((_, d) => {
                const level = Math.floor(Math.random() * 5)
                const cellDelay = (w * days + d) * 0.008
                return (
                  <motion.div
                    key={d}
                    className={`w-3 h-3 rounded-[2px] ${colors[level]}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.2, delay: cellDelay, ease: EASE }}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-muted uppercase tracking-widest">Staggered Heatmap Grid</p>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
// 8. COUNTDOWN TIMER — Próximo reporte semanal
// ════════════════════════════════════════════════════════════════

function ReportCountdown() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const days = 3
  const hours = 14

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center gap-4"
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <div className="bg-white rounded-xl border border-cloud-light/50 p-5 flex items-center gap-5"
        style={{ boxShadow: '0 0 24px rgba(217,119,87,0.08)' }}>
        <div className="text-center min-w-[56px]">
          <motion.p
            className="text-3xl font-semibold text-clay leading-none"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_CINE }}
          >
            {days}
          </motion.p>
          <p className="text-[10px] font-medium uppercase tracking-widest text-muted mt-1">días</p>
        </div>
        <div className="h-10 w-px bg-cloud-light/60" />
        <div>
          <p className="text-sm font-medium text-ink">Próximo reporte semanal</p>
          <p className="text-xs text-muted">{days}d {hours}h · Lunes 8:00 AM</p>
        </div>
      </div>
      <p className="text-xs text-muted uppercase tracking-widest">Urgency Countdown</p>
    </motion.div>
  )
}

// ════════════════════════════════════════════════════════════════
// 9. PHASE TRANSITIONS — Agente pensando
// ════════════════════════════════════════════════════════════════

function AgentThinking() {
  const [phase, setPhase] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    if (!inView) return
    const t1 = setTimeout(() => setPhase(1), 800)
    const t2 = setTimeout(() => setPhase(2), 1800)
    const t3 = setTimeout(() => setPhase(3), 2800)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [inView])

  const labels = ['Analizando datos...', 'Detectando patrones...', 'Generando recomendación...', 'Margen bajo en Q3 — sugiero revisar costos operativos']

  return (
    <div ref={ref} className="flex flex-col items-center gap-4">
      <div className="bg-ink rounded-xl p-6 w-full max-w-sm min-h-[120px] flex flex-col justify-center">
        {/* Thinking dots */}
        <div className="flex gap-1.5 mb-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-clay"
              animate={phase < 3 ? { opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] } : { opacity: 0, scale: 0 }}
              transition={{ duration: 1, repeat: phase < 3 ? Infinity : 0, delay: i * 0.2 }}
            />
          ))}
        </div>
        {/* Phase text */}
        <motion.p
          key={phase}
          className={`text-sm ${phase === 3 ? 'text-ivory font-medium' : 'text-ivory/50'}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          {labels[phase]}
        </motion.p>
        {/* Result bar */}
        {phase === 3 && (
          <motion.div
            className="h-px bg-gradient-to-r from-clay/60 via-clay to-clay/60 mt-3"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE_CINE }}
          />
        )}
      </div>
      <p className="text-xs text-muted uppercase tracking-widest">Phase Transitions</p>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
// 10. NETWORK GRAPH — Red de agentes conectados
// ════════════════════════════════════════════════════════════════

function AgentNetwork() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const nodes = [
    { x: 100, y: 60, label: 'General', r: 14 },
    { x: 40, y: 30, label: 'Finanzas', r: 10 },
    { x: 160, y: 30, label: 'Ventas', r: 10 },
    { x: 30, y: 90, label: 'RRHH', r: 9 },
    { x: 170, y: 90, label: 'Marketing', r: 9 },
    { x: 60, y: 110, label: 'Inventario', r: 8 },
    { x: 140, y: 110, label: 'Cump.', r: 8 },
  ]

  const edges = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
    [1, 3], [2, 4], [5, 6],
  ]

  return (
    <div ref={ref} className="flex flex-col items-center gap-4">
      <svg viewBox="0 0 200 130" className="w-full max-w-xs">
        {/* Edges */}
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x} y1={nodes[a].y}
            x2={nodes[b].x} y2={nodes[b].y}
            stroke="#d1cfc5"
            strokeWidth={1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.6 } : {}}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease: EASE }}
          />
        ))}
        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={i}>
            <motion.circle
              cx={node.x} cy={node.y} r={node.r}
              fill={i === 0 ? '#d97757' : '#f0eee6'}
              stroke={i === 0 ? '#c6613f' : '#d1cfc5'}
              strokeWidth={1.5}
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.1, ease: EASE_CINE }}
            />
            <motion.text
              x={node.x} y={node.y + (node.r + 10)}
              textAnchor="middle"
              fill="#87867f"
              fontSize={7}
              fontFamily="Inter, system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
            >
              {node.label}
            </motion.text>
          </g>
        ))}
        {/* Pulse on center node */}
        <motion.circle
          cx={100} cy={60} r={14}
          fill="none"
          stroke="#d97757"
          strokeWidth={1}
          animate={inView ? { r: [14, 24, 14], opacity: [0.6, 0, 0.6] } : {}}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
      <p className="text-xs text-muted uppercase tracking-widest">Agent Network Graph</p>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
// SHOWCASE PAGE
// ════════════════════════════════════════════════════════════════

export default function ShowcasePage() {
  return (
    <main className="bg-ivory-mid min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-ivory-mid border-b border-cloud-light/40" style={{ height: 'var(--nav-height)' }}>
        <div className="u-container h-full flex items-center justify-between">
          <Link href="/"><OrbiLogo size={24} color="dark" /></Link>
          <Link href="/" className="text-sm text-ink-light hover:text-ink transition-colors">← Volver</Link>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-ivory-dark">
        <div className="space-main" />
        <div className="u-container text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-clay mb-4">Showcase</p>
          <h1 className="u-display-l mb-4">Animaciones vectoriales de Orbbi</h1>
          <p className="u-paragraph-s mx-auto" style={{ maxWidth: '50ch' }}>
            10 patrones de animación SVG y Framer Motion adaptados al ADN de Orbbi —
            métricas de negocio, agentes IA, progreso y análisis en tiempo real.
          </p>
        </div>
        <div className="space-medium" />
      </section>

      {/* Grid de animaciones */}
      <section className="bg-ivory">
        <div className="space-main" />
        <div className="u-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">

            {/* 1 */}
            <div className="flex justify-center"><PathDrawLogo /></div>
            {/* 2 */}
            <div className="flex justify-center"><BusinessRings /></div>
            {/* 3 */}
            <div className="flex justify-center"><SparklineChart /></div>
            {/* 4 */}
            <div className="flex justify-center"><ActivityPulse /></div>
            {/* 5 */}
            <div className="flex justify-center"><AmbientParticles /></div>
            {/* 6 */}
            <div className="flex justify-center"><ProgressBar /></div>
            {/* 7 */}
            <div className="flex justify-center"><ActivityHeatmap /></div>
            {/* 8 */}
            <div className="flex justify-center"><ReportCountdown /></div>
            {/* 9 */}
            <div className="flex justify-center"><AgentThinking /></div>
            {/* 10 */}
            <div className="flex justify-center"><AgentNetwork /></div>

          </div>
        </div>
        <div className="space-main" />
      </section>

      {/* CTA */}
      <section className="bg-ivory-dark">
        <div className="space-medium" />
        <div className="u-container text-center">
          <p className="u-paragraph-s mb-6">Estas animaciones se integran en el landing page y el dashboard de Orbbi.</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-ink text-ivory text-sm font-medium px-6 py-3 rounded hover:opacity-90 transition-opacity">
            Ver landing page
            <svg width="16" height="16" viewBox="0 0 30 30" fill="none">
              <path d="M25.98 15.66L17.54 24.1a.94.94 0 01-1.33-1.33l6.84-6.84H4.69a.94.94 0 010-1.87h18.36l-6.84-6.84a.94.94 0 011.33-1.33l8.44 8.44a.94.94 0 010 1.33z" fill="currentColor"/>
            </svg>
          </Link>
        </div>
        <div className="space-medium" />
      </section>
    </main>
  )
}
