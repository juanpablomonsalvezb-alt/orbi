'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import OrbiLogo from '@/components/ui/OrbiLogo'

// Easing premium (de sokra-platform)
const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

// Wrapper para animar secciones al entrar en viewport
function Section({ children, className = '', delay = 0, id }: { children: React.ReactNode; className?: string; delay?: number; id?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease, delay }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

// Stagger container y items
const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } },
  item: { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } },
}

// ============================================
// SITE MARGIN (Anthropic-style fluid padding)
// ============================================
const siteMargin = { padding: '0 clamp(1.5rem, 1.08rem + 3.92vw, 5rem)' }

// ============================================
// NAV (sticky, glass, 68px height)
// ============================================

function Nav() {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-border-light/50" style={{ height: '68px' }}>
      <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between" style={siteMargin}>
        <Link href="/">
          <OrbiLogo size={26} color="dark" />
        </Link>

        <div className="hidden md:flex items-center space-x-10">
          {['Producto', 'Agentes', 'Precios'].map((item) => (
            <Link
              key={item}
              href={item === 'Precios' ? '/precios' : `#${item.toLowerCase()}`}
              className="text-[13px] text-muted hover:text-ink transition-colors duration-200"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-[13px] text-muted hover:text-ink transition-colors duration-200">
            Entrar
          </Link>
          <Link
            href="/registro"
            className="rounded-[4px] bg-ink text-ivory px-4 py-[9px] text-[13px] font-medium hover:bg-ink-mid transition-colors duration-200"
          >
            Probar gratis
          </Link>
        </div>
      </div>
    </nav>
  )
}

// ============================================
// HERO (full viewport, orbital visual, overlaid text)
// ============================================

function OrbitalVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg viewBox="0 0 800 800" className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] text-ink/[0.06]">
        {/* Anillos concéntricos */}
        <circle cx="400" cy="400" r="380" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="400" cy="400" r="300" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="400" cy="400" r="220" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="400" cy="400" r="140" fill="none" stroke="currentColor" strokeWidth="0.5" />

        {/* Elipse orbital */}
        <ellipse cx="400" cy="400" rx="350" ry="120" fill="none" stroke="currentColor" strokeWidth="0.5"
          transform="rotate(-20 400 400)" />
        <ellipse cx="400" cy="400" rx="280" ry="90" fill="none" stroke="currentColor" strokeWidth="0.5"
          transform="rotate(15 400 400)" />

        {/* Núcleo */}
        <circle cx="400" cy="400" r="8" fill="#141413" opacity="0.08" />
      </svg>

      {/* Punto orbitante animado */}
      <motion.div
        className="absolute"
        style={{ width: 10, height: 10 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute -top-[290px] left-1/2 -translate-x-1/2">
          <div className="w-[10px] h-[10px] rounded-full bg-accent" />
        </div>
      </motion.div>

      {/* Segundo punto */}
      <motion.div
        className="absolute"
        style={{ width: 10, height: 10 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute -top-[200px] left-1/2 -translate-x-1/2">
          <div className="w-[6px] h-[6px] rounded-full bg-ink/10" />
        </div>
      </motion.div>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative bg-ivory-dark overflow-hidden" style={{ minHeight: 'calc(100vh - 68px)' }}>
      <OrbitalVisual />

      {/* Contenido sobre el visual */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center"
        style={{ minHeight: 'calc(100vh - 68px)', ...siteMargin }}>

        <motion.p
          className="t-detail text-accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease }}
        >
          Inteligencia artificial para PYMEs
        </motion.p>

        <motion.h1
          className="t-hero text-ink mt-6 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
        >
          El agente que orbita
          <br />tu negocio 24/7
        </motion.h1>

        <motion.p
          className="t-subhead mt-6 max-w-md"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.25 }}
        >
          Un gerente de operaciones virtual que conoce tu empresa
          en profundidad. Analiza, alerta y te ayuda a decidir.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-3 mt-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.4 }}
        >
          <Link href="/registro"
            className="rounded-[4px] bg-ink text-ivory px-7 py-3 text-[14px] font-medium hover:bg-ink-mid transition-colors duration-200">
            Comenzar gratis — 14 días
          </Link>
          <Link href="#producto"
            className="rounded-[4px] border border-border text-ink px-7 py-3 text-[14px] hover:bg-ivory transition-colors duration-200">
            Cómo funciona
          </Link>
        </motion.div>

        <motion.p
          className="text-[12px] text-muted mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.55 }}
        >
          Sin tarjeta de crédito · Configuración en 5 minutos
        </motion.p>
      </div>
    </section>
  )
}

// ============================================
// DEMO (chat mock in card — como el video de Anthropic)
// ============================================

function Demo() {
  return (
    <Section className="bg-ivory-mid" delay={0}>
      <div className="max-w-[740px] mx-auto" style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 4vw, 5rem)' }}>
        <div className="text-center mb-10">
          <p className="t-detail text-accent mb-3">En acción</p>
          <h2 className="t-display text-ink">Una conversación real</h2>
        </div>

        <div className="card-premium !rounded-[12px] overflow-hidden">
          {/* Window chrome */}
          <div className="flex items-center px-5 py-3 border-b border-border-light/60">
            <div className="flex space-x-[6px]">
              <div className="w-[10px] h-[10px] rounded-full bg-border-light" />
              <div className="w-[10px] h-[10px] rounded-full bg-border-light" />
              <div className="w-[10px] h-[10px] rounded-full bg-border-light" />
            </div>
            <div className="flex-1 flex items-center justify-center gap-2">
              <div className="w-[6px] h-[6px] rounded-full bg-accent" />
              <span className="text-[12px] text-muted font-medium">orbbi · Gerente General</span>
            </div>
          </div>

          {/* Messages */}
          <div className="p-6 md:p-8 space-y-4">
            {[
              { rol: 'user', texto: '¿Cómo estuvieron las ventas este mes comparado con el anterior?' },
              { rol: 'agent', texto: 'Las ventas de marzo fueron $4.2M, un 18% más que febrero. Instagram creció 32% y ya representa el 45% de tus ventas. Te recomiendo mover presupuesto de Facebook (solo 8%) a Instagram.' },
              { rol: 'user', texto: '¿Y el margen? Siento que bajó' },
              { rol: 'agent', texto: 'Tienes razón. El margen bruto bajó de 34% a 28%. El problema son los costos de envío, que subieron 40% por el nuevo proveedor. ¿Quieres que analice alternativas?' },
            ].map((msg, i) => (
              <motion.div
                key={i}
                className={`flex ${msg.rol === 'user' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease, delay: i * 0.15 }}
              >
                <div className={`max-w-[82%] rounded-[8px] px-4 py-3 ${
                  msg.rol === 'user'
                    ? 'bg-ivory-dark text-ink'
                    : 'bg-ivory-mid border border-border-light/50 text-ink-mid'
                }`}>
                  <p className="text-[14px] leading-[1.7]">{msg.texto}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input mock */}
          <div className="px-6 md:px-8 pb-5">
            <div className="rounded-[4px] border border-border-light bg-ivory-mid/50 px-4 py-2.5 flex items-center justify-between">
              <span className="text-[13px] text-muted/40">Escribe tu mensaje...</span>
              <div className="w-7 h-7 rounded-[4px] bg-ink flex items-center justify-center">
                <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="#faf9f5" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

// ============================================
// PRODUCTO (bento grid — como featured stories de Anthropic)
// ============================================

function Producto() {
  return (
    <Section id="producto" className="bg-ivory">
      <div className="max-w-[1200px] mx-auto" style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 4vw, 5rem)' }}>
        <div className="text-center" style={{ marginBottom: 'clamp(3rem, 5vw, 5rem)' }}>
          <p className="t-detail text-accent mb-4">Producto</p>
          <h2 className="t-display text-ink">
            No es un chatbot.
            <br />Es un gerente.
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-6 gap-4"
          variants={stagger.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {/* Memoria — grande */}
          <motion.div variants={stagger.item}
            className="md:col-span-4 card-premium p-7 md:p-9 flex flex-col justify-between min-h-[280px]">
            <div>
              <p className="t-detail text-accent mb-4">Memoria</p>
              <h3 className="t-heading text-ink">Conoce tu negocio en profundidad</h3>
              <p className="t-body mt-3 max-w-md">
                14 preguntas configuran un perfil completo de tu empresa.
                Cada respuesta del agente es específica para tu negocio.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {['Ventas', 'Costos', 'Clientes', 'Metas'].map((t) => (
                <span key={t} className="text-[11px] text-muted bg-ivory-mid px-3 py-1.5 rounded-[4px]">{t}</span>
              ))}
            </div>
          </motion.div>

          {/* 24/7 — oscuro */}
          <motion.div variants={stagger.item}
            className="md:col-span-2 bg-ink rounded-[12px] p-7 flex flex-col justify-between min-h-[280px]">
            <p className="t-detail text-accent-light">Disponibilidad</p>
            <div>
              <p className="text-ivory tracking-[-2px] leading-none" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '52px', fontWeight: 400 }}>
                24/7
              </p>
              <p className="text-[14px] text-border mt-3 leading-[1.6]">
                Sin horarios. Sin esperas. Tu gerente responde al instante.
              </p>
            </div>
          </motion.div>

          {/* Alertas */}
          <motion.div variants={stagger.item}
            className="md:col-span-3 card-premium p-7 flex flex-col justify-between min-h-[220px]">
            <p className="t-detail text-muted mb-3">Alertas</p>
            <div>
              <h3 className="t-heading text-ink">Detecta problemas antes que tú</h3>
              <p className="t-body mt-2">Si algo se sale de rango — margen, costos, ventas — te avisa directamente.</p>
            </div>
          </motion.div>

          {/* Resúmenes */}
          <motion.div variants={stagger.item}
            className="md:col-span-3 card-premium p-7 flex flex-col justify-between min-h-[220px]">
            <p className="t-detail text-muted mb-3">Reportes</p>
            <div>
              <h3 className="t-heading text-ink">Resumen semanal automático</h3>
              <p className="t-body mt-2">Cada lunes: qué pasó, qué viene, qué debes atender.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}

// ============================================
// AGENTES (grid como values section de Anthropic)
// ============================================

const AGENTES = [
  { nombre: 'General', area: 'Estrategia y operaciones', desc: 'Visión completa del negocio. Tu punto de partida.' },
  { nombre: 'Financiero', area: 'Flujo de caja y márgenes', desc: 'Controla costos, proyecta ingresos, detecta fugas.' },
  { nombre: 'Ventas', area: 'Pipeline y conversión', desc: 'Canales, retención, lifetime value, cierre.' },
  { nombre: 'Marketing', area: 'Campañas y ROI', desc: 'Qué canal rinde, dónde invertir, cómo medir.' },
  { nombre: 'RRHH', area: 'Personas y cultura', desc: 'Contratación, delegación, desempeño, clima.' },
  { nombre: 'Inventario', area: 'Stock y logística', desc: 'Rotación, proveedores, puntos de quiebre.' },
  { nombre: 'Legal', area: 'Contratos y cumplimiento', desc: 'Regulación, obligaciones, riesgos legales.' },
]

function AgentesSection() {
  return (
    <Section id="agentes">
      <div className="max-w-[1200px] mx-auto" style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 4vw, 5rem)' }}>
        <div className="md:flex md:items-end md:justify-between" style={{ marginBottom: 'clamp(2.5rem, 4vw, 4rem)' }}>
          <div>
            <p className="t-detail text-accent mb-4">7 agentes especializados</p>
            <h2 className="t-display text-ink max-w-lg">Un equipo completo para tu negocio</h2>
          </div>
          <p className="t-body max-w-sm mt-4 md:mt-0">
            Cada agente está entrenado en su área. Comienza con uno, agrega los que necesites.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
          variants={stagger.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {AGENTES.map((a) => (
            <motion.div
              key={a.nombre}
              variants={stagger.item}
              className="card-premium p-5 group cursor-default"
            >
              <p className="t-detail text-muted mb-3 group-hover:text-accent transition-colors duration-200">{a.area}</p>
              <h3 className="text-ink tracking-[-0.2px]" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '18px' }}>
                {a.nombre}
              </h3>
              <p className="text-[13px] text-muted mt-2 leading-[1.5]">{a.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}

// ============================================
// PROCESO (dark section — como Anthropic's dark band)
// ============================================

function Proceso() {
  const pasos = [
    { num: '01', titulo: 'Crea tu cuenta', desc: '30 segundos. Sin tarjeta de crédito.' },
    { num: '02', titulo: 'Responde 14 preguntas', desc: 'Tu agente aprende todo sobre tu negocio.' },
    { num: '03', titulo: 'Conversa y decide', desc: 'Datos reales, recomendaciones específicas para ti.' },
  ]

  return (
    <Section className="bg-ink">
      <div className="max-w-[900px] mx-auto" style={{ padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 4vw, 5rem)' }}>
        <div className="text-center" style={{ marginBottom: 'clamp(3rem, 5vw, 5rem)' }}>
          <p className="t-detail text-accent-light mb-4">Proceso</p>
          <h2 className="t-display text-ivory">
            Configurado en 5 minutos.
            <br />Listo para siempre.
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
          variants={stagger.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {pasos.map((p) => (
            <motion.div key={p.num} variants={stagger.item}>
              <span className="text-accent-light text-[13px] font-medium">{p.num}</span>
              <div className="w-8 h-[1px] bg-accent-light/30 my-4" />
              <h3 className="text-[17px] font-medium text-ivory mb-2">{p.titulo}</h3>
              <p className="text-[14px] text-border leading-[1.6]">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}

// ============================================
// CTA FINAL
// ============================================

function CTAFinal() {
  return (
    <Section className="bg-ivory">
      <div className="max-w-[600px] mx-auto text-center" style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 4vw, 5rem)' }}>
        <h2 className="t-display text-ink">
          Tu negocio merece un gerente que nunca duerme
        </h2>
        <p className="t-body mt-5">
          Prueba Orbbi gratis por 14 días. Sin compromiso, sin tarjeta.
        </p>
        <div className="mt-8">
          <Link href="/registro"
            className="inline-block rounded-[4px] bg-ink text-ivory px-8 py-3.5 text-[14px] font-medium hover:bg-ink-mid transition-colors duration-200">
            Comenzar gratis
          </Link>
        </div>
      </div>
    </Section>
  )
}

// ============================================
// FOOTER (multi-column como Anthropic)
// ============================================

function Footer() {
  return (
    <footer className="border-t border-border-light" style={{ padding: 'clamp(3rem, 5vw, 5rem) 0 clamp(2rem, 3vw, 3rem)' }}>
      <div className="max-w-[1200px] mx-auto" style={siteMargin}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <p className="text-[12px] font-medium text-ink mb-4">Producto</p>
            <div className="space-y-2.5">
              {['Gerente General', 'Agente Financiero', 'Agente de Ventas', 'Agente de Marketing'].map((l) => (
                <p key={l} className="text-[13px] text-muted hover:text-ink transition-colors duration-200 cursor-default">{l}</p>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[12px] font-medium text-ink mb-4">Agentes</p>
            <div className="space-y-2.5">
              {['RRHH', 'Inventario', 'Legal', 'Todos los agentes'].map((l) => (
                <p key={l} className="text-[13px] text-muted hover:text-ink transition-colors duration-200 cursor-default">{l}</p>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[12px] font-medium text-ink mb-4">Recursos</p>
            <div className="space-y-2.5">
              {['Precios', 'Documentación', 'Blog', 'Casos de uso'].map((l) => (
                <Link key={l} href={l === 'Precios' ? '/precios' : '#'} className="block text-[13px] text-muted hover:text-ink transition-colors duration-200">{l}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[12px] font-medium text-ink mb-4">Empresa</p>
            <div className="space-y-2.5">
              {['Sobre nosotros', 'Contacto', 'Términos', 'Privacidad'].map((l) => (
                <p key={l} className="text-[13px] text-muted hover:text-ink transition-colors duration-200 cursor-default">{l}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border-light pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <OrbiLogo size={20} color="dark" />
          <p className="text-[11px] text-muted">© 2026 Orbbi. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

// ============================================
// PAGE
// ============================================

export default function Home() {
  return (
    <main className="bg-ivory-mid">
      <Nav />
      <Hero />
      <Demo />
      <Producto />
      <AgentesSection />
      <Proceso />
      <CTAFinal />
      <Footer />
    </main>
  )
}
