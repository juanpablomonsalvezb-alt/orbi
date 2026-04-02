'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import OrbiLogo from '@/components/ui/OrbiLogo'

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]
const siteM = { padding: '0 clamp(1.5rem, 1.08rem + 3.92vw, 5rem)' }

function Reveal({ children, className = '', delay = 0, id }: { children: React.ReactNode; className?: string; delay?: number; id?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} id={id} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease, delay }} className={className}>
      {children}
    </motion.div>
  )
}

const stagger = {
  c: { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } },
  i: { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } },
}

// ═══════════════════════════════════════════════════════════════════════════════
// NAV
// ═══════════════════════════════════════════════════════════════════════════════

function Nav() {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-border-light/50" style={{ height: 68 }}>
      <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between" style={siteM}>
        <Link href="/"><OrbiLogo size={26} color="dark" /></Link>
        <div className="hidden md:flex items-center gap-10">
          {[['Producto', '#producto'], ['Agentes', '#agentes'], ['Precios', '/precios']].map(([t, h]) => (
            <Link key={t} href={h} className="text-[13px] text-muted hover:text-ink transition-colors duration-200">{t}</Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-[13px] text-muted hover:text-ink transition-colors duration-200 hidden sm:inline">Entrar</Link>
          <Link href="/registro" className="rounded-[4px] bg-ink text-ivory px-4 py-[9px] text-[13px] font-medium hover:bg-ink-mid transition-all duration-200 hover:-translate-y-px active:scale-[0.98]">
            Probar gratis
          </Link>
        </div>
      </div>
    </nav>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// HERO — Full viewport, orbital visual, overlaid text
// ═══════════════════════════════════════════════════════════════════════════════

function Hero() {
  return (
    <section className="relative bg-ivory-dark noise-texture overflow-hidden" style={{ minHeight: 'calc(100vh - 68px)' }}>
      {/* Orbital rings SVG background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg viewBox="0 0 800 800" className="w-[600px] h-[600px] md:w-[800px] md:h-[800px]" style={{ color: 'rgba(20,20,19,0.05)' }}>
          <circle cx="400" cy="400" r="380" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="400" cy="400" r="300" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="400" cy="400" r="220" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="400" cy="400" r="140" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <ellipse cx="400" cy="400" rx="350" ry="120" fill="none" stroke="currentColor" strokeWidth="0.5" transform="rotate(-20 400 400)" />
          <ellipse cx="400" cy="400" rx="280" ry="90" fill="none" stroke="currentColor" strokeWidth="0.5" transform="rotate(15 400 400)" />
          <circle cx="400" cy="400" r="8" fill="currentColor" opacity="0.6" />
        </svg>
        {/* Orbiting dot */}
        <motion.div className="absolute" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
          <div className="absolute -top-[290px] left-1/2 -translate-x-1/2">
            <div className="w-[10px] h-[10px] rounded-full bg-accent" />
          </div>
        </motion.div>
        <motion.div className="absolute" animate={{ rotate: -360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}>
          <div className="absolute -top-[200px] left-1/2 -translate-x-1/2">
            <div className="w-[5px] h-[5px] rounded-full bg-ink/10" />
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center" style={{ minHeight: 'calc(100vh - 68px)', ...siteM }}>
        <motion.p className="t-detail text-accent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease }}>
          Inteligencia artificial para PYMEs
        </motion.p>
        <motion.h1 className="t-hero text-ink mt-6 max-w-4xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.1 }}>
          El agente que orbita<br />tu negocio 24/7
        </motion.h1>
        <motion.p className="t-subhead mt-6 max-w-md" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.25 }}>
          Un gerente de operaciones virtual que conoce tu empresa en profundidad. Analiza, alerta y te ayuda a decidir.
        </motion.p>
        <motion.div className="flex flex-col sm:flex-row items-center gap-3 mt-10" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease, delay: 0.4 }}>
          <Link href="/registro" className="rounded-[4px] bg-ink text-ivory px-7 py-3 text-[14px] font-medium hover:bg-ink-mid transition-all duration-200 hover:-translate-y-px">
            Comenzar gratis — 14 días
          </Link>
          <Link href="#producto" className="rounded-[4px] border border-border text-ink px-7 py-3 text-[14px] hover:bg-ivory transition-colors duration-200">
            Cómo funciona
          </Link>
        </motion.div>
        <motion.p className="text-[12px] text-muted mt-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
          Sin tarjeta de crédito · Configuración en 5 minutos
        </motion.p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SOCIAL PROOF — Números que validan (como Anthropic's metrics)
// ═══════════════════════════════════════════════════════════════════════════════

function SocialProof() {
  const stats = [
    { value: '10,474', label: 'líneas de conocimiento gerencial', suffix: '' },
    { value: '7', label: 'agentes especializados', suffix: '' },
    { value: '14', label: 'preguntas que configuran tu agente', suffix: '' },
    { value: '24/7', label: 'disponibilidad total', suffix: '' },
  ]

  return (
    <div className="bg-ivory-mid">
      <div className="max-w-[1200px] mx-auto" style={{ padding: 'clamp(3rem, 5vw, 5rem) clamp(1.5rem, 4vw, 5rem)' }}>
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div key={i} className="text-center" variants={stagger.i}>
                <p className="text-ink tracking-[-1px]" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 400 }}>
                  {s.value}
                </p>
                <p className="text-[12px] text-muted mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
      <div className="separator" />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// DEMO — Chat mock con calidad premium
// ═══════════════════════════════════════════════════════════════════════════════

function Demo() {
  const msgs = [
    { u: true, t: '¿Cómo estuvieron las ventas este mes comparado con el anterior?' },
    { u: false, t: 'Las ventas de marzo fueron **$4.2M**, un 18% más que febrero. Instagram creció 32% y ya representa el 45% de tus ventas. Te recomiendo mover presupuesto de Facebook (solo 8%) a Instagram.' },
    { u: true, t: '¿Y el margen? Siento que bajó' },
    { u: false, t: 'Tienes razón. El margen bruto bajó de 34% a 28%. El problema son los **costos de envío**, que subieron 40% por el nuevo proveedor. ¿Quieres que analice alternativas?' },
  ]

  return (
    <Reveal className="ambient-glow">
      <div className="max-w-[740px] mx-auto" style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 5rem)' }}>
        <div className="text-center mb-10">
          <p className="t-detail text-accent mb-3">En acción</p>
          <h2 className="t-display text-ink">Una conversación<br />con tu negocio</h2>
        </div>

        <div className="card-premium !rounded-[16px]">
          {/* Window chrome */}
          <div className="flex items-center px-5 py-3 border-b border-border-light/60">
            <div className="flex gap-[6px]">
              <div className="w-[10px] h-[10px] rounded-full bg-border-light" />
              <div className="w-[10px] h-[10px] rounded-full bg-border-light" />
              <div className="w-[10px] h-[10px] rounded-full bg-border-light" />
            </div>
            <div className="flex-1 flex items-center justify-center gap-2">
              <motion.div className="w-[6px] h-[6px] rounded-full bg-accent" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              <span className="text-[12px] text-muted font-medium">orbbi · Gerente General</span>
            </div>
          </div>

          <div className="p-5 md:p-7 space-y-4">
            {msgs.map((m, i) => (
              <motion.div key={i} className={`flex ${m.u ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, x: m.u ? 16 : -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease, delay: i * 0.12 }}>
                <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-[14px] leading-[1.7] ${
                  m.u
                    ? 'bg-ivory-dark text-ink rounded-br-md'
                    : 'bg-ivory inner-glow border border-border-light/40 text-ink-mid rounded-bl-md'
                }`}>
                  {m.t.split(/(\*\*[^*]+\*\*)/).map((p, j) =>
                    p.startsWith('**') ? <strong key={j} className="text-accent font-medium">{p.slice(2, -2)}</strong> : <span key={j}>{p}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="px-5 md:px-7 pb-5">
            <div className="rounded-[4px] border border-border-light bg-ivory-mid/50 px-4 py-2.5 flex items-center justify-between">
              <span className="text-[13px] text-muted/40">Escribe tu mensaje...</span>
              <div className="w-7 h-7 rounded-[4px] bg-ink flex items-center justify-center hover:bg-ink-mid transition-colors">
                <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="#faf9f5" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// PRODUCTO — Bento grid con card-premium + ambient glow
// ═══════════════════════════════════════════════════════════════════════════════

function Producto() {
  return (
    <section id="producto" className="bg-ivory noise-texture">
      <div className="max-w-[1200px] mx-auto" style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 4vw, 5rem)' }}>
        <Reveal>
          <div className="md:flex md:items-end md:justify-between" style={{ marginBottom: 'clamp(3rem, 5vw, 5rem)' }}>
            <div>
              <p className="t-detail text-accent mb-4">Producto</p>
              <h2 className="t-display text-ink max-w-lg">No es un chatbot.<br />Es un gerente.</h2>
            </div>
            <p className="t-body max-w-sm mt-4 md:mt-0">
              Cada respuesta está fundamentada en frameworks de gestión reales.
              No adivina. Analiza.
            </p>
          </div>
        </Reveal>

        <motion.div className="grid grid-cols-1 md:grid-cols-12 gap-4" variants={stagger.c} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}>
          {/* Memoria — 7 cols */}
          <motion.div variants={stagger.i} className="md:col-span-7 card-premium p-7 md:p-9 flex flex-col justify-between min-h-[300px]">
            <div>
              <p className="t-detail text-accent mb-4">Memoria profunda</p>
              <h3 className="t-heading text-ink">Conoce tu negocio mejor que cualquier consultor</h3>
              <p className="t-body mt-3 max-w-md">
                14 preguntas configuran un perfil completo: giro, finanzas, clientes, metas.
                El agente usa frameworks como Fayol, Porter y TOC para analizar tu situación.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-8">
              {['Ventas', 'Costos fijos', 'Clientes VIP', 'Metas 6M', 'Competencia', 'Equipo'].map((t) => (
                <span key={t} className="text-[11px] text-muted bg-ivory-mid px-3 py-1.5 rounded-[4px] border border-border-light/50">{t}</span>
              ))}
            </div>
          </motion.div>

          {/* 24/7 — 5 cols, dark */}
          <motion.div variants={stagger.i} className="md:col-span-5 bg-ink rounded-[16px] p-7 md:p-9 flex flex-col justify-between min-h-[300px] relative overflow-hidden">
            {/* Ambient glow inside dark card */}
            <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-accent/5 blur-[60px] pointer-events-none" />
            <p className="t-detail text-accent-light relative z-10">Disponibilidad</p>
            <div className="relative z-10">
              <p className="text-ivory tracking-[-3px] leading-none" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 'clamp(48px, 6vw, 72px)', fontWeight: 400 }}>
                24/7
              </p>
              <p className="text-[14px] text-border mt-4 leading-[1.6] max-w-xs">
                Sin horarios. Sin esperas. Sin agendar reuniones.
                Tu gerente responde al instante, con contexto completo.
              </p>
            </div>
          </motion.div>

          {/* Alertas — 4 cols */}
          <motion.div variants={stagger.i} className="md:col-span-4 card-premium p-7 flex flex-col justify-between min-h-[240px]">
            <p className="t-detail text-muted mb-3">Alertas inteligentes</p>
            <div>
              <h3 className="t-heading text-ink">Detecta problemas antes que tú</h3>
              <p className="t-body mt-2">Margen cayendo, costos disparados, cliente en riesgo — te avisa sin que preguntes.</p>
            </div>
          </motion.div>

          {/* Reportes — 4 cols */}
          <motion.div variants={stagger.i} className="md:col-span-4 card-premium p-7 flex flex-col justify-between min-h-[240px]">
            <p className="t-detail text-muted mb-3">Resúmenes semanales</p>
            <div>
              <h3 className="t-heading text-ink">Cada lunes, automático</h3>
              <p className="t-body mt-2">Qué pasó, qué viene, qué debes atender. Semáforo: verde, amarillo, rojo.</p>
            </div>
          </motion.div>

          {/* Decisiones — 4 cols */}
          <motion.div variants={stagger.i} className="md:col-span-4 card-premium p-7 flex flex-col justify-between min-h-[240px]">
            <p className="t-detail text-muted mb-3">Recomendaciones</p>
            <div>
              <h3 className="t-heading text-ink">Opciones, no problemas</h3>
              <p className="t-body mt-2">Siempre presenta mínimo 2 opciones con su recomendación y el por qué.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// AGENTES — Grid con hover premium
// ═══════════════════════════════════════════════════════════════════════════════

const AGENTES = [
  { nombre: 'General', area: 'Estrategia y operaciones', desc: 'Visión 360° del negocio. Tu punto de partida. Cubre finanzas, personas, clientes y estrategia.' },
  { nombre: 'Financiero', area: 'Flujo de caja y márgenes', desc: 'CFO virtual. Ratios, punto de equilibrio, flujo de caja a 13 semanas, alertas financieras.' },
  { nombre: 'Ventas', area: 'Pipeline y conversión', desc: 'Director comercial. Embudo, CAC/LTV, retención, scripts de cierre, cartera de clientes.' },
  { nombre: 'Marketing', area: 'Campañas y ROI', desc: 'ROI por canal, presupuesto por industria, Meta Ads, referidos, boca a boca sistematizado.' },
  { nombre: 'RRHH', area: 'Personas y cultura', desc: 'Contratación 30-60-90, ley laboral por país, delegación, feedback SBI, cultura.' },
  { nombre: 'Inventario', area: 'Stock y logística', desc: 'ABC, rotación, proveedores 2+1, stock de seguridad, TOC, Lean para PYMEs.' },
  { nombre: 'Legal', area: 'Contratos y cumplimiento', desc: 'Tipos de sociedad, obligaciones fiscales, contratos, datos personales, permisos.' },
]

function AgentesSection() {
  return (
    <section id="agentes" className="ambient-glow">
      <div className="max-w-[1200px] mx-auto" style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 4vw, 5rem)' }}>
        <Reveal>
          <div className="text-center" style={{ marginBottom: 'clamp(2.5rem, 4vw, 4rem)' }}>
            <p className="t-detail text-accent mb-4">7 agentes especializados</p>
            <h2 className="t-display text-ink max-w-lg mx-auto">Un equipo completo.<br />Tú eliges quiénes.</h2>
            <p className="t-body max-w-md mx-auto mt-4">
              Cada agente tiene su propia base de conocimiento con más de 1,000 líneas de frameworks, fórmulas y guías prácticas.
            </p>
          </div>
        </Reveal>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" variants={stagger.c} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}>
          {AGENTES.map((a) => (
            <motion.div key={a.nombre} variants={stagger.i} className="card-premium p-6 group cursor-default">
              <div className="flex items-center justify-between mb-4">
                <p className="t-detail text-muted group-hover:text-accent transition-colors duration-200">{a.area}</p>
                <div className="w-[6px] h-[6px] rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-ink tracking-[-0.3px] mb-2" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '20px' }}>
                {a.nombre}
              </h3>
              <p className="text-[13px] text-muted leading-[1.6]">{a.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROCESO — Dark section
// ═══════════════════════════════════════════════════════════════════════════════

function Proceso() {
  const pasos = [
    { num: '01', titulo: 'Crea tu cuenta', desc: '30 segundos. Sin tarjeta de crédito. Solo nombre, email y contraseña.' },
    { num: '02', titulo: 'Responde 14 preguntas', desc: 'Giro, finanzas, clientes, metas. Tu agente aprende todo sobre tu negocio.' },
    { num: '03', titulo: 'Conversa y decide', desc: 'Datos reales, frameworks probados, recomendaciones específicas para ti.' },
  ]

  return (
    <section className="bg-ink noise-texture relative overflow-hidden">
      {/* Ambient glow on dark */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-[80px] pointer-events-none" />

      <div className="max-w-[1000px] mx-auto relative z-10" style={{ padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 4vw, 5rem)' }}>
        <Reveal>
          <div className="text-center" style={{ marginBottom: 'clamp(3rem, 5vw, 5rem)' }}>
            <p className="t-detail text-accent-light mb-4">Proceso</p>
            <h2 className="t-display text-ivory">Configurado en 5 minutos.<br />Listo para siempre.</h2>
          </div>
        </Reveal>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-10" variants={stagger.c} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {pasos.map((p) => (
            <motion.div key={p.num} variants={stagger.i}>
              <span className="text-accent-light text-[13px] font-medium">{p.num}</span>
              <div className="w-10 h-[1px] bg-accent-light/30 my-4" />
              <h3 className="text-[18px] font-medium text-ivory mb-2 tracking-[-0.2px]">{p.titulo}</h3>
              <p className="text-[14px] text-border leading-[1.6]">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// CTA FINAL
// ═══════════════════════════════════════════════════════════════════════════════

function CTAFinal() {
  return (
    <section className="bg-ivory ambient-glow">
      <div className="max-w-[600px] mx-auto text-center relative z-10" style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 4vw, 5rem)' }}>
        <Reveal>
          <h2 className="t-display text-ink">Tu negocio merece un gerente que nunca duerme</h2>
          <p className="t-body mt-5">Prueba Orbbi gratis por 14 días. Sin compromiso, sin tarjeta.</p>
          <div className="mt-8">
            <Link href="/registro" className="inline-block rounded-[4px] bg-ink text-ivory px-8 py-3.5 text-[14px] font-medium hover:bg-ink-mid transition-all duration-200 hover:-translate-y-px active:scale-[0.98]">
              Comenzar gratis
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// FOOTER — Multi-column (Anthropic-style)
// ═══════════════════════════════════════════════════════════════════════════════

function Footer() {
  const cols = [
    { title: 'Producto', links: ['Gerente General', 'Agente Financiero', 'Agente de Ventas', 'Agente de Marketing'] },
    { title: 'Agentes', links: ['RRHH', 'Inventario', 'Legal', 'Todos los agentes'] },
    { title: 'Recursos', links: [{ t: 'Precios', h: '/precios' }, 'Documentación', 'Blog', 'Casos de uso'] },
    { title: 'Empresa', links: ['Sobre nosotros', 'Contacto', 'Términos', 'Privacidad'] },
  ]

  return (
    <footer className="border-t border-border-light/60" style={{ padding: 'clamp(3rem, 5vw, 5rem) 0 clamp(2rem, 3vw, 3rem)' }}>
      <div className="max-w-[1200px] mx-auto" style={siteM}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {cols.map((col) => (
            <div key={col.title}>
              <p className="text-[12px] font-medium text-ink mb-4">{col.title}</p>
              <div className="space-y-2.5">
                {col.links.map((l) => {
                  const text = typeof l === 'string' ? l : l.t
                  const href = typeof l === 'string' ? '#' : l.h
                  return (
                    <Link key={text} href={href} className="block text-[13px] text-muted hover:text-ink transition-colors duration-200">
                      {text}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="separator mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <OrbiLogo size={20} color="dark" />
          <p className="text-[11px] text-muted">© 2026 Orbbi. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function Home() {
  return (
    <main className="bg-ivory-mid">
      <Nav />
      <Hero />
      <SocialProof />
      <Demo />
      <Producto />
      <AgentesSection />
      <Proceso />
      <CTAFinal />
      <Footer />
    </main>
  )
}
