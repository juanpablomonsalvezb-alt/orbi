'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
          <a href="/demo" className="text-sm text-ink-light hover:text-ink transition-colors">Demo</a>
          <a href="#contacto" className="text-sm text-ink-light hover:text-ink transition-colors">Contacto</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-ink-light hover:text-ink transition-colors hidden sm:block">Entrar</Link>
          <Link href="/demo" className="bg-ink text-ivory text-sm font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity">
            Ver demo gratis
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
    { x: 370, y: 380, label: 'Cumplimiento', r: 44 },
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
  const router = useRouter()
  return (
    <header className="bg-ivory-dark">
      <div style={{ paddingTop: 'clamp(3rem, 2rem + 3vw, 5rem)' }} />
      <div className="u-container">
        <div className="grid-12 items-center">
          {/* Left 7 cols */}
          <div style={{ gridColumn: 'span 7' }} className="max-md:col-span-full">
            <motion.p className="text-xs font-medium tracking-widest uppercase mb-4"
              style={{ color: '#d97757', letterSpacing: '0.12em' }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25,0.46,0.45,0.94] }}
            >
              Plataforma de agentes de IA para PYMEs
            </motion.p>
            <motion.h1 className="u-display-xl mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
            >
              <AnimatedWords>
                7 gerentes de IA que conocen tu negocio.
              </AnimatedWords>
            </motion.h1>
            <motion.p className="text-base mb-6"
              style={{ color: '#87867f', fontFamily: "'Source Serif 4', Georgia, serif", fontStyle: 'italic' }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.25,0.46,0.45,0.94] }}
            >
              Porque nadie debería decidir solo.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.25,0.46,0.45,0.94] }}
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
              transition={{ duration: 0.6, delay: 0.6, ease: [0.25,0.46,0.45,0.94] }}
            >
              <div
                className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-sm cursor-text group hover:shadow-md transition-shadow"
                style={{ maxWidth: '480px' }}
                onClick={() => router.push('/demo')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#87867f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Pregúntale algo a tu gerente..."
                  className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted cursor-text"
                  onFocus={() => router.push('/demo')}
                  readOnly
                />
                <Link
                  href="/demo"
                  onClick={e => e.stopPropagation()}
                  className="bg-clay text-white text-sm font-medium px-5 py-2 rounded-lg hover:opacity-90 transition-opacity shrink-0"
                >
                  Ver demo
                </Link>
              </div>
              <p className="text-xs text-muted mt-2 ml-1">Sin registro · Sin tarjeta · Responde en segundos</p>
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
            <Link href="/demo" className="bg-clay text-white text-sm font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-opacity shrink-0">
              Ver demo gratis
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
    id: 'legal', label: 'Cumplimiento',
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
              <Link href="/demo" className="inline-flex items-center gap-2 text-sm font-medium text-clay hover:opacity-70 transition-opacity">
                Probar demo
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

function SocialProofSection() {
  const partners = [
    {
      name: 'Vercel',
      svg: (
        <svg height="20" viewBox="0 0 283 64" fill="currentColor" aria-label="Vercel">
          <path d="M141.68 16.25c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-18-18.99-18zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zm117.14-14.5c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-18-18.99-18zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zm-39.03 3.5c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9v-46h9zM37.59.25l36.95 64H.64l36.95-64zm92.38 5l-27.71 48-27.71-48h10.39l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10v14.8h-9v-34h9v9.2c0-5.08 5.91-9.2 13.2-9.2z" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      svg: (
        <svg height="20" viewBox="0 0 24 24" fill="currentColor" aria-label="GitHub">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      name: 'Supabase',
      svg: (
        <svg height="20" viewBox="0 0 109 113" fill="none" aria-label="Supabase">
          <path d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874L63.708 110.284z" fill="url(#supaA)" />
          <path d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874L63.708 110.284z" fill="url(#supaB)" fillOpacity=".2" />
          <path d="M45.317 2.071C48.177-1.53 53.976.443 54.044 5.041l.558 67.251H9.936c-8.19 0-12.759-9.46-7.665-15.875L45.317 2.071z" fill="#3ECF8E" />
          <defs>
            <linearGradient id="supaA" x1="53.974" y1="54.974" x2="94.163" y2="71.829" gradientUnits="userSpaceOnUse">
              <stop stopColor="#249361" /><stop offset="1" stopColor="#3ECF8E" />
            </linearGradient>
            <linearGradient id="supaB" x1="36.156" y1="30.578" x2="54.484" y2="65.035" gradientUnits="userSpaceOnUse">
              <stop /><stop offset="1" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      name: 'Next.js',
      svg: (
        <svg height="20" viewBox="0 0 180 180" fill="currentColor" aria-label="Next.js">
          <mask id="nextMask" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
            <circle cx="90" cy="90" r="90" fill="black" />
          </mask>
          <g mask="url(#nextMask)">
            <circle cx="90" cy="90" r="90" fill="black" />
            <path d="M149.508 157.52L69.142 54H54V125.97H66.1V69.3L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#nextGrad)" />
            <rect x="115" y="54" width="12" height="72" fill="url(#nextGrad2)" />
          </g>
          <defs>
            <linearGradient id="nextGrad" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" /><stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="nextGrad2" x1="115" y1="54" x2="115.48" y2="106.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" /><stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      name: 'Google Gemini',
      svg: (
        <svg height="20" viewBox="0 0 28 28" fill="none" aria-label="Google Gemini">
          <path d="M14 28A14 14 0 0 1 14 0a6.587 6.587 0 0 0 6.235 4.42 6.587 6.587 0 0 0 1.765-4.42A14 14 0 0 1 28 14a6.587 6.587 0 0 0-4.42 6.235 6.587 6.587 0 0 0 4.42 1.765A14 14 0 0 1 14 28a6.587 6.587 0 0 0-6.235-4.42A6.587 6.587 0 0 0 0 21.765 14 14 0 0 1 0 14a6.587 6.587 0 0 0 4.42-6.235A6.587 6.587 0 0 0 0 6.235 14 14 0 0 1 14 0z" fill="url(#geminiGrad)" />
          <defs>
            <linearGradient id="geminiGrad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4285F4" /><stop offset=".5" stopColor="#9B72CB" /><stop offset="1" stopColor="#D96570" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      name: 'MercadoPago',
      svg: (
        <svg height="20" viewBox="0 0 80 20" fill="none" aria-label="MercadoPago">
          <text x="0" y="15" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="600" fill="#009EE3">Mercado</text>
          <text x="44" y="15" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="600" fill="#00BCFF">Pago</text>
        </svg>
      ),
    },
    {
      name: 'Groq',
      svg: (
        <svg height="20" viewBox="0 0 80 20" fill="none" aria-label="Groq">
          <text x="0" y="15" fontFamily="system-ui, sans-serif" fontSize="15" fontWeight="700" fill="currentColor" letterSpacing="-0.5">groq</text>
        </svg>
      ),
    },
    {
      name: 'Resend',
      svg: (
        <svg height="20" viewBox="0 0 80 20" fill="none" aria-label="Resend">
          <text x="0" y="15" fontFamily="system-ui, sans-serif" fontSize="15" fontWeight="600" fill="currentColor">Resend</text>
        </svg>
      ),
    },
  ]

  return (
    <section className="bg-ivory-mid border-y border-ink/[0.05]">
      <div className="u-container" style={{ padding: 'clamp(2.5rem, 2rem + 2vw, 4rem) 0' }}>
        <FadeIn>
          <p className="text-center text-xs font-medium uppercase tracking-[0.15em] text-muted mb-8">
            Construido con tecnología de clase mundial
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {partners.map((p) => (
              <div key={p.name} className="text-ink/30 hover:text-ink/60 transition-colors" title={p.name}>
                {p.svg}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
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
              <Link
                href="/demo"
                className="bg-clay text-white text-sm font-medium px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Ver demo con mi negocio
              </Link>
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
// 5. TESTIMONIALS SECTION (bg-ivory-dark)
// ═══════════════════════════════════════════════════════════════════

function MetricsSection() {
  const metrics = [
    {
      value: '7',
      label: 'Gerentes especializados',
      sub: 'Finanzas, Ventas, Marketing, RRHH, Inventario, Legal + General',
    },
    {
      value: '24/7',
      label: 'Disponibilidad',
      sub: 'Sin horarios, sin feriados, sin días de enfermedad',
    },
    {
      value: '< 2s',
      label: 'Tiempo de respuesta',
      sub: 'Más rápido que cualquier consultor humano',
    },
    {
      value: '6',
      label: 'Países de LATAM',
      sub: 'Chile · México · Colombia · Perú · Argentina · Uruguay',
    },
    {
      value: '3 min',
      label: 'Setup completo',
      sub: 'De cero a tu equipo directivo funcionando',
    },
    {
      value: '$29',
      label: 'USD al mes',
      sub: 'Vs. $2M+ que cuesta un gerente general real',
    },
  ]

  return (
    <section className="bg-ink">
      <div className="space-main" />
      <div className="u-container">
        <FadeIn className="text-center mb-14">
          <p className="text-xs font-medium uppercase tracking-[0.15em] mb-3" style={{ color: '#d97757' }}>
            Por qué Orbbi
          </p>
          <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 400, letterSpacing: '-0.8px', color: '#fffff0', lineHeight: 1.1 }}>
            El directorio que tu negocio<br />nunca pudo pagar
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-ivory/[0.06] rounded-2xl overflow-hidden">
          {metrics.map((m, i) => (
            <FadeIn key={m.label} delay={i * 0.06}>
              <div className="bg-ink px-8 py-10 flex flex-col gap-2 hover:bg-ink-mid transition-colors">
                <span style={{
                  fontFamily: "'Source Serif 4', Georgia, serif",
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  fontWeight: 400,
                  letterSpacing: '-1.5px',
                  color: '#d97757',
                  lineHeight: 1,
                }}>
                  {m.value}
                </span>
                <p className="text-sm font-medium" style={{ color: '#fffff0' }}>{m.label}</p>
                <p className="text-xs leading-relaxed" style={{ color: '#87867f' }}>{m.sub}</p>
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
// 6. PLANES SECTION (bg-ivory-mid)
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
    { num: '01', titulo: 'Prueba la demo gratis', desc: 'Sin registrarte. Habla con el Gerente General y recibe un diagnóstico de tu negocio en 1 minuto.' },
    { num: '02', titulo: 'Crea tu cuenta', desc: 'Cuando estés listo, regístrate con email y contraseña. Accede a tus 7 gerentes especializados.' },
    { num: '03', titulo: 'Tu equipo empieza a trabajar', desc: 'El Gerente General analiza tu situación y te propone las primeras acciones. Después, activa los agentes que necesites.' },
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
          <Link href="/demo" className="bg-ink text-ivory text-sm font-medium px-8 py-3 rounded-lg hover:bg-ink-mid transition-colors inline-block">
            Ver demo con mi negocio
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
                      <option value="Uruguay">Uruguay</option>
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
    { title: 'Productos', links: ['Gerente General', 'Agente Financiero', 'Agente de Ventas', 'Agente de Marketing', 'RRHH', 'Inventario', 'Cumplimiento'] },
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
      <MetricsSection />
      <ComoEmpezarSection />
      <FinalCTA />
      <Footer />
    </main>
  )
}
