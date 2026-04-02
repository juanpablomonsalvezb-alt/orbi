'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import OrbiLogo from '@/components/ui/OrbiLogo'

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

function FadeIn({ children, className = '', delay = 0, id }: {
  children: React.ReactNode; className?: string; delay?: number; id?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} id={id} className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease, delay }}>
      {children}
    </motion.div>
  )
}

// ─── NAV ────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-ivory-mid/90 backdrop-blur-md border-b border-ink/[0.05]" style={{ height: 64 }}>
      <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/"><OrbiLogo size={24} color="dark" /></Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="#producto" className="text-sm text-ink-light hover:text-ink transition-colors">Producto</Link>
          <Link href="#agentes" className="text-sm text-ink-light hover:text-ink transition-colors">Agentes</Link>
          <Link href="/precios" className="text-sm text-ink-light hover:text-ink transition-colors">Precios</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-ink-light hover:text-ink transition-colors hidden sm:block">Entrar</Link>
          <Link href="/registro" className="bg-ink text-ivory text-sm px-4 py-2 rounded-md hover:bg-ink-mid transition-colors">
            Probar gratis
          </Link>
        </div>
      </div>
    </nav>
  )
}

// ─── HERO ───────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="bg-ivory-dark relative overflow-hidden">
      {/* Orbital background — sutil */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
        <svg viewBox="0 0 600 600" className="w-[500px] h-[500px] md:w-[700px] md:h-[700px]">
          <circle cx="300" cy="300" r="280" fill="none" stroke="#141413" strokeWidth="0.5" />
          <circle cx="300" cy="300" r="200" fill="none" stroke="#141413" strokeWidth="0.5" />
          <circle cx="300" cy="300" r="120" fill="none" stroke="#141413" strokeWidth="0.5" />
          <ellipse cx="300" cy="300" rx="260" ry="100" fill="none" stroke="#141413" strokeWidth="0.5" transform="rotate(-15 300 300)" />
        </svg>
      </div>

      {/* Orbiting dot */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
          <div className="w-2.5 h-2.5 rounded-full bg-accent" style={{ transform: 'translateY(-220px)' }} />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center" style={{ paddingTop: 'clamp(100px, 14vh, 160px)', paddingBottom: 'clamp(80px, 12vh, 140px)' }}>
        <motion.p className="text-xs font-medium uppercase tracking-[0.15em] text-accent"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          Inteligencia artificial para PYMEs
        </motion.p>

        <motion.h1 className="mt-5 text-ink"
          style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 'clamp(36px, 5.5vw, 64px)', fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.05 }}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.1 }}>
          El agente que orbita<br />tu negocio 24/7
        </motion.h1>

        <motion.p className="mt-5 text-ink-light max-w-md mx-auto"
          style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 'clamp(16px, 1.3vw, 19px)', lineHeight: 1.6 }}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease, delay: 0.25 }}>
          Un gerente virtual que conoce tu empresa en profundidad. Analiza, alerta y te ayuda a decidir.
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease, delay: 0.4 }}>
          <Link href="/registro" className="bg-ink text-ivory text-sm px-6 py-2.5 rounded-md hover:bg-ink-mid transition-colors">
            Comenzar gratis — 14 días
          </Link>
          <Link href="#producto" className="border border-ink/10 text-ink text-sm px-6 py-2.5 rounded-md hover:bg-ivory/60 transition-colors">
            Cómo funciona
          </Link>
        </motion.div>

        <motion.p className="mt-4 text-xs text-muted"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          Sin tarjeta de crédito · 5 minutos de configuración
        </motion.p>
      </div>
    </section>
  )
}

// ─── CHAT DEMO ──────────────────────────────────────────────────────────────

function ChatDemo() {
  const msgs = [
    { u: true, t: '¿Cómo estuvieron las ventas comparado con el mes pasado?' },
    { u: false, t: 'Marzo cerró en $4.2M, un 18% arriba. Instagram ya es el 45% de tus ventas — te recomiendo mover presupuesto desde Facebook que solo aporta el 8%.' },
    { u: true, t: '¿Y el margen? Siento que bajó.' },
    { u: false, t: 'Bajó de 34% a 28%. Los costos de envío subieron 40% con el nuevo proveedor. ¿Analizamos alternativas?' },
  ]

  return (
    <FadeIn className="max-w-2xl mx-auto px-6 py-20">
      <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent mb-3">En acción</p>
      <h2 className="text-ink mb-8" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400, letterSpacing: '-0.5px', lineHeight: 1.15 }}>
        Una conversación real con tu negocio
      </h2>

      <div className="rounded-xl border border-ink/[0.06] bg-ivory overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-ink/[0.04]">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-ink/[0.08]" />
            <div className="w-2 h-2 rounded-full bg-ink/[0.08]" />
            <div className="w-2 h-2 rounded-full bg-ink/[0.08]" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-muted">orbbi · Gerente General</span>
          </div>
        </div>

        {/* Messages */}
        <div className="p-5 space-y-3">
          {msgs.map((m, i) => (
            <motion.div key={i} className={`flex ${m.u ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.35, ease, delay: i * 0.1 }}>
              <div className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${
                m.u ? 'bg-ivory-dark text-ink' : 'bg-ivory-mid text-ink-mid'
              }`}>
                {m.t}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </FadeIn>
  )
}

// ─── PRODUCTO ───────────────────────────────────────────────────────────────

function Producto() {
  const features = [
    { title: 'Memoria profunda', desc: '14 preguntas configuran al agente con el contexto completo de tu negocio. Cada respuesta es específica para ti.' },
    { title: 'Alertas inteligentes', desc: 'Si el margen cae, los costos suben o un cliente está en riesgo, te avisa sin que preguntes.' },
    { title: 'Resumen semanal', desc: 'Cada lunes recibes qué pasó, qué viene y qué debes atender. Automático, sin pedirlo.' },
    { title: 'Decisiones con fundamento', desc: 'Presenta opciones con datos, no problemas sin solución. Siempre explica el por qué.' },
    { title: 'Disponible 24/7', desc: 'Sin horarios, sin esperas, sin agendar. Tu gerente responde al instante con contexto completo.' },
    { title: '10,000+ líneas de conocimiento', desc: 'Cada agente tiene frameworks de gestión reales: Fayol, Porter, TOC, Lean, Hersey-Blanchard.' },
  ]

  return (
    <FadeIn id="producto" className="bg-ivory">
      <div className="max-w-5xl mx-auto px-6" style={{ padding: 'clamp(60px, 10vw, 120px) 24px' }}>
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent mb-3">Producto</p>
        <h2 className="text-ink max-w-lg mb-4" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400, letterSpacing: '-0.5px', lineHeight: 1.15 }}>
          No es un chatbot. Es un gerente.
        </h2>
        <p className="text-ink-light max-w-lg mb-12" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '16px', lineHeight: 1.6 }}>
          Cada respuesta está fundamentada en frameworks de gestión reales, aplicados al contexto específico de tu negocio.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {features.map((f, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, ease, delay: i * 0.06 }}>
              <h3 className="text-[15px] font-medium text-ink mb-2">{f.title}</h3>
              <p className="text-sm text-ink-light leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </FadeIn>
  )
}

// ─── AGENTES ────────────────────────────────────────────────────────────────

const AGENTES = [
  { nombre: 'General', desc: 'Estrategia, operaciones, visión 360°' },
  { nombre: 'Financiero', desc: 'Flujo de caja, márgenes, ratios' },
  { nombre: 'Ventas', desc: 'Pipeline, retención, CAC/LTV' },
  { nombre: 'Marketing', desc: 'Canales, ROI, posicionamiento' },
  { nombre: 'RRHH', desc: 'Contratación, cultura, desempeño' },
  { nombre: 'Inventario', desc: 'Stock, proveedores, logística' },
  { nombre: 'Legal', desc: 'Contratos, cumplimiento, permisos' },
]

function AgentesSection() {
  return (
    <FadeIn id="agentes">
      <div className="max-w-5xl mx-auto px-6" style={{ padding: 'clamp(60px, 10vw, 120px) 24px' }}>
        <div className="md:flex md:items-end md:justify-between mb-10">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent mb-3">7 agentes</p>
            <h2 className="text-ink max-w-md" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400, letterSpacing: '-0.5px', lineHeight: 1.15 }}>
              Un equipo completo para tu negocio
            </h2>
          </div>
          <p className="text-sm text-ink-light max-w-xs mt-3 md:mt-0">
            Cada agente tiene su propia base de conocimiento. Comienza con uno, agrega los que necesites.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {AGENTES.map((a, i) => (
            <motion.div key={a.nombre}
              className="border border-ink/[0.06] rounded-lg p-4 bg-ivory hover:border-ink/[0.12] hover:bg-ivory-mid/50 transition-all duration-200"
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.35, ease, delay: i * 0.05 }}>
              <p className="text-[15px] text-ink" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>{a.nombre}</p>
              <p className="text-xs text-muted mt-1">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </FadeIn>
  )
}

// ─── PROCESO ────────────────────────────────────────────────────────────────

function Proceso() {
  const pasos = [
    { n: '1', t: 'Crea tu cuenta', d: '30 segundos. Sin tarjeta.' },
    { n: '2', t: 'Responde 14 preguntas', d: 'Tu agente aprende tu negocio.' },
    { n: '3', t: 'Conversa y decide', d: 'Datos reales, recomendaciones específicas.' },
  ]

  return (
    <FadeIn className="bg-ink">
      <div className="max-w-4xl mx-auto px-6" style={{ padding: 'clamp(60px, 10vw, 100px) 24px' }}>
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent-light mb-3">Proceso</p>
        <h2 className="text-ivory mb-12" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400, letterSpacing: '-0.5px', lineHeight: 1.15 }}>
          Configurado en 5 minutos. Listo para siempre.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pasos.map((p) => (
            <div key={p.n}>
              <span className="text-accent-light text-sm font-medium">{p.n}</span>
              <div className="w-6 h-px bg-accent-light/30 my-3" />
              <h3 className="text-base font-medium text-ivory mb-1">{p.t}</h3>
              <p className="text-sm text-border leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  )
}

// ─── CTA ────────────────────────────────────────────────────────────────────

function CTA() {
  return (
    <FadeIn className="bg-ivory">
      <div className="max-w-xl mx-auto px-6 text-center" style={{ padding: 'clamp(60px, 10vw, 120px) 24px' }}>
        <h2 className="text-ink" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400, letterSpacing: '-0.5px', lineHeight: 1.15 }}>
          Tu negocio merece un gerente que nunca duerme
        </h2>
        <p className="text-sm text-ink-light mt-4 mb-6" style={{ fontFamily: "'Source Serif 4', Georgia, serif", lineHeight: 1.6 }}>
          Prueba Orbbi gratis por 14 días. Sin compromiso, sin tarjeta.
        </p>
        <Link href="/registro" className="inline-block bg-ink text-ivory text-sm px-6 py-2.5 rounded-md hover:bg-ink-mid transition-colors">
          Comenzar gratis
        </Link>
      </div>
    </FadeIn>
  )
}

// ─── FOOTER ─────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-ink/[0.06]" style={{ padding: '40px 0 32px' }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {[
            { t: 'Producto', l: ['Gerente General', 'Financiero', 'Ventas', 'Marketing'] },
            { t: 'Más agentes', l: ['RRHH', 'Inventario', 'Legal'] },
            { t: 'Recursos', l: ['Precios', 'Documentación', 'Blog'] },
            { t: 'Empresa', l: ['Contacto', 'Términos', 'Privacidad'] },
          ].map((col) => (
            <div key={col.t}>
              <p className="text-xs font-medium text-ink mb-3">{col.t}</p>
              <div className="space-y-1.5">
                {col.l.map((l) => (
                  <Link key={l} href={l === 'Precios' ? '/precios' : '#'}
                    className="block text-sm text-muted hover:text-ink transition-colors">{l}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-ink/[0.06] pt-5">
          <OrbiLogo size={18} color="dark" />
          <p className="text-xs text-muted">© 2026 Orbbi</p>
        </div>
      </div>
    </footer>
  )
}

// ─── PAGE ───────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="bg-ivory-mid">
      <Nav />
      <Hero />
      <ChatDemo />
      <Producto />
      <AgentesSection />
      <Proceso />
      <CTA />
      <Footer />
    </main>
  )
}
