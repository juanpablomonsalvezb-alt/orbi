'use client'

import Link from 'next/link'
import OrbiLogo from '@/components/ui/OrbiLogo'

// ============================================
// NAV
// ============================================

function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-ivory-mid/90 backdrop-blur-sm">
      <div className="max-w-[1200px] mx-auto" style={{ padding: '0 clamp(1.5rem, 4vw, 5rem)' }}>
        <div className="h-[68px] flex items-center justify-between">
          <OrbiLogo size={26} color="dark" />

          <div className="hidden md:flex items-center space-x-10">
            <Link href="#producto" className="t-small text-muted hover:text-ink transition-colors duration-200">
              Producto
            </Link>
            <Link href="#agentes" className="t-small text-muted hover:text-ink transition-colors duration-200">
              Agentes
            </Link>
            <Link href="/precios" className="t-small text-muted hover:text-ink transition-colors duration-200">
              Precios
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/login" className="t-small text-muted hover:text-ink transition-colors duration-200">
              Entrar
            </Link>
            <Link
              href="/registro"
              className="rounded-[4px] bg-ink text-ivory px-4 py-2 text-[13px] font-medium hover:bg-ink-mid transition-colors duration-200"
            >
              Probar gratis
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

// ============================================
// HERO
// ============================================

function Hero() {
  return (
    <section className="bg-ivory-dark" style={{ padding: 'clamp(5rem, 12vw, 10rem) 0 clamp(4rem, 10vw, 8rem)' }}>
      <div className="max-w-[1200px] mx-auto text-center" style={{ padding: '0 clamp(1.5rem, 4vw, 5rem)' }}>
        <div className="anim-fade-up">
          <span className="t-detail text-accent">Inteligencia artificial para PYMEs</span>
        </div>

        <h1 className="t-hero mt-6 anim-fade-up d1">
          El agente que orbita
          <br />
          tu negocio 24/7
        </h1>

        <p className="t-subhead mt-6 max-w-lg mx-auto anim-fade-up d2">
          Un gerente de operaciones virtual que conoce tu empresa
          en profundidad. Analiza, alerta y te ayuda a decidir.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10 anim-fade-up d3">
          <Link
            href="/registro"
            className="rounded-[4px] bg-ink text-ivory px-6 py-3 text-[14px] font-medium hover:bg-ink-mid transition-colors duration-200"
          >
            Comenzar gratis — 14 días
          </Link>
          <Link
            href="/precios"
            className="rounded-[4px] border border-border text-ink px-6 py-3 text-[14px] font-normal hover:bg-ivory transition-colors duration-200"
          >
            Ver planes
          </Link>
        </div>

        <p className="text-[12px] text-muted mt-5 anim-fade-up d4">
          Sin tarjeta de crédito · Configuración en 5 minutos
        </p>
      </div>
    </section>
  )
}

// ============================================
// DEMO — Chat mock
// ============================================

function Demo() {
  return (
    <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 0' }}>
      <div className="max-w-[720px] mx-auto" style={{ padding: '0 clamp(1.5rem, 4vw, 5rem)' }}>
        <div className="rounded-[12px] border border-border-light bg-ivory overflow-hidden">
          {/* Barra superior */}
          <div className="flex items-center space-x-3 px-5 py-3.5 border-b border-border-light">
            <div className="flex space-x-1.5">
              <div className="w-[9px] h-[9px] rounded-full bg-border-light" />
              <div className="w-[9px] h-[9px] rounded-full bg-border-light" />
              <div className="w-[9px] h-[9px] rounded-full bg-border-light" />
            </div>
            <div className="flex-1 flex items-center justify-center space-x-2">
              <div className="w-[6px] h-[6px] rounded-full bg-accent" />
              <span className="text-[12px] text-muted font-medium">orbbi · Gerente General</span>
            </div>
          </div>

          {/* Conversación */}
          <div className="p-5 md:p-7 space-y-5">
            <div className="flex justify-end">
              <div className="bg-ivory-dark rounded-[8px] px-4 py-3 max-w-[80%]">
                <p className="text-[14px] text-ink leading-[1.6]">
                  ¿Cómo estuvieron las ventas este mes comparado con el anterior?
                </p>
              </div>
            </div>

            <div className="flex justify-start">
              <div className="bg-ivory-mid rounded-[8px] px-4 py-3 max-w-[85%]">
                <p className="text-[14px] text-ink-mid leading-[1.7]">
                  Las ventas de marzo fueron <span className="text-accent font-medium">$4.2M</span>, un 18% más que febrero.
                  Instagram creció 32% y ya representa el 45% de tus ventas.
                  Te recomiendo mover presupuesto de Facebook (solo 8%) a Instagram
                  y testear TikTok el próximo mes.
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="bg-ivory-dark rounded-[8px] px-4 py-3 max-w-[80%]">
                <p className="text-[14px] text-ink leading-[1.6]">
                  ¿Y el margen? Siento que bajó
                </p>
              </div>
            </div>

            <div className="flex justify-start">
              <div className="bg-ivory-mid rounded-[8px] px-4 py-3 max-w-[85%]">
                <p className="text-[14px] text-ink-mid leading-[1.7]">
                  Tienes razón. El margen bruto bajó de 34% a 28%.
                  El problema son los <span className="text-accent font-medium">costos de envío</span>,
                  que subieron 40% por el nuevo proveedor.
                  ¿Quieres que analice alternativas de logística?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// PRODUCTO — Bento
// ============================================

function Producto() {
  return (
    <section id="producto" className="bg-ivory" style={{ padding: 'clamp(5rem, 10vw, 9rem) 0' }}>
      <div className="max-w-[1200px] mx-auto" style={{ padding: '0 clamp(1.5rem, 4vw, 5rem)' }}>
        <div className="text-center" style={{ marginBottom: 'clamp(3rem, 5vw, 5rem)' }}>
          <p className="t-detail text-accent mb-4">Producto</p>
          <h2 className="t-display">
            No es un chatbot.
            <br />Es un gerente.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Memoria */}
          <div className="md:col-span-4 bg-ivory-mid border border-border-light rounded-[12px] p-7 md:p-9 flex flex-col justify-between min-h-[260px]">
            <div>
              <p className="t-detail text-accent mb-4">Memoria</p>
              <h3 className="t-heading">Conoce tu negocio en profundidad</h3>
              <p className="t-body mt-3 max-w-md">
                14 preguntas configuran un perfil completo de tu empresa.
                Cada respuesta del agente es específica para tu negocio.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {['Ventas', 'Costos', 'Clientes', 'Metas'].map((t) => (
                <span key={t} className="text-[11px] text-muted bg-ivory px-3 py-1.5 rounded-[4px] border border-border-light">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* 24/7 */}
          <div className="md:col-span-2 bg-ink rounded-[12px] p-7 flex flex-col justify-between min-h-[260px]">
            <p className="t-detail text-accent-light mb-4">Disponibilidad</p>
            <div>
              <p className="text-[48px] font-light text-ivory tracking-[-2px] leading-none" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>24/7</p>
              <p className="text-[14px] text-border mt-3 leading-[1.6]">
                Sin horarios. Sin esperas.
                Tu gerente responde al instante.
              </p>
            </div>
          </div>

          {/* Alertas */}
          <div className="md:col-span-3 bg-ivory-mid border border-border-light rounded-[12px] p-7 flex flex-col justify-between min-h-[220px]">
            <p className="t-detail text-muted mb-4">Alertas</p>
            <div>
              <h3 className="t-heading">Detecta problemas antes que tú</h3>
              <p className="t-body mt-2">
                Si algo se sale de rango — margen, costos, ventas —
                te avisa directamente.
              </p>
            </div>
          </div>

          {/* Resúmenes */}
          <div className="md:col-span-3 bg-ivory-mid border border-border-light rounded-[12px] p-7 flex flex-col justify-between min-h-[220px]">
            <p className="t-detail text-muted mb-4">Reportes</p>
            <div>
              <h3 className="t-heading">Resumen semanal automático</h3>
              <p className="t-body mt-2">
                Cada lunes: qué pasó, qué viene,
                qué debes atender. Sin pedirlo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// AGENTES
// ============================================

const AGENTES = [
  { nombre: 'General', area: 'Estrategia y operaciones' },
  { nombre: 'Financiero', area: 'Flujo de caja y márgenes' },
  { nombre: 'Ventas', area: 'Pipeline y conversión' },
  { nombre: 'Marketing', area: 'Campañas y ROI' },
  { nombre: 'RRHH', area: 'Personas y cultura' },
  { nombre: 'Inventario', area: 'Stock y logística' },
  { nombre: 'Legal', area: 'Contratos y cumplimiento' },
]

function AgentesSection() {
  return (
    <section id="agentes" style={{ padding: 'clamp(5rem, 10vw, 9rem) 0' }}>
      <div className="max-w-[1200px] mx-auto" style={{ padding: '0 clamp(1.5rem, 4vw, 5rem)' }}>
        <div className="md:flex md:items-end md:justify-between" style={{ marginBottom: 'clamp(2rem, 4vw, 4rem)' }}>
          <div>
            <p className="t-detail text-accent mb-4">7 agentes</p>
            <h2 className="t-display max-w-md">
              Un equipo completo para tu negocio
            </h2>
          </div>
          <p className="t-body max-w-sm mt-4 md:mt-0">
            Cada agente está entrenado en su área.
            Comienza con uno, agrega los que necesites.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {AGENTES.map((a, i) => (
            <div
              key={i}
              className="rounded-[8px] border border-border-light bg-ivory p-5
                         hover:border-border hover:bg-ivory-mid transition-all duration-200 group"
            >
              <p className="t-detail text-muted mb-3">{a.area}</p>
              <h3 className="text-[17px] font-normal text-ink tracking-[-0.2px]" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                {a.nombre}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// PROCESO
// ============================================

function Proceso() {
  const pasos = [
    { num: '01', titulo: 'Crea tu cuenta', desc: '30 segundos. Sin tarjeta.' },
    { num: '02', titulo: 'Responde 14 preguntas', desc: 'Tu agente aprende tu negocio.' },
    { num: '03', titulo: 'Conversa y decide', desc: 'Datos reales, recomendaciones específicas.' },
  ]

  return (
    <section className="bg-ink" style={{ padding: 'clamp(5rem, 10vw, 8rem) 0' }}>
      <div className="max-w-[900px] mx-auto" style={{ padding: '0 clamp(1.5rem, 4vw, 5rem)' }}>
        <div className="text-center" style={{ marginBottom: 'clamp(3rem, 5vw, 5rem)' }}>
          <p className="t-detail text-accent-light mb-4">Proceso</p>
          <h2 className="t-display text-ivory">
            Configurado en 5 minutos.
            <br />Listo para siempre.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {pasos.map((p) => (
            <div key={p.num}>
              <span className="text-accent-light text-[13px] font-medium">{p.num}</span>
              <div className="w-8 h-[1px] bg-accent-light/40 my-4" />
              <h3 className="text-[17px] font-medium text-ivory mb-2">{p.titulo}</h3>
              <p className="text-[14px] text-border leading-[1.6]">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// CTA FINAL
// ============================================

function CTAFinal() {
  return (
    <section className="bg-ivory" style={{ padding: 'clamp(5rem, 10vw, 9rem) 0' }}>
      <div className="max-w-[600px] mx-auto text-center" style={{ padding: '0 clamp(1.5rem, 4vw, 5rem)' }}>
        <h2 className="t-display">
          Tu negocio merece un gerente que nunca duerme
        </h2>
        <p className="t-body mt-5">
          Prueba Orbbi gratis por 14 días. Sin compromiso, sin tarjeta.
        </p>
        <div className="mt-8">
          <Link
            href="/registro"
            className="inline-block rounded-[4px] bg-ink text-ivory px-7 py-3.5 text-[14px] font-medium hover:bg-ink-mid transition-colors duration-200"
          >
            Comenzar gratis
          </Link>
        </div>
      </div>
    </section>
  )
}

// ============================================
// FOOTER
// ============================================

function Footer() {
  return (
    <footer className="border-t border-border-light" style={{ padding: 'clamp(2.5rem, 4vw, 4rem) 0' }}>
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4" style={{ padding: '0 clamp(1.5rem, 4vw, 5rem)' }}>
        <OrbiLogo size={22} color="dark" />
        <div className="flex items-center space-x-8">
          <Link href="/precios" className="text-[12px] text-muted hover:text-ink transition-colors duration-200">
            Precios
          </Link>
          <Link href="/login" className="text-[12px] text-muted hover:text-ink transition-colors duration-200">
            Entrar
          </Link>
        </div>
        <p className="text-[11px] text-muted">© 2026 Orbbi</p>
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
