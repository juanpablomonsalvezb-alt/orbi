'use client'

import Link from 'next/link'
import OrbiLogo from '@/components/ui/OrbiLogo'

// ============================================
// NAV
// ============================================

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="h-16 flex items-center justify-between border-b border-white/[0.06]">
          <OrbiLogo size={26} color="light" />

          <div className="hidden md:flex items-center space-x-10">
            <Link href="#producto" className="t-small text-ceniza hover:text-white transition-colors duration-300">
              Producto
            </Link>
            <Link href="#agentes" className="t-small text-ceniza hover:text-white transition-colors duration-300">
              Agentes
            </Link>
            <Link href="/precios" className="t-small text-ceniza hover:text-white transition-colors duration-300">
              Precios
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/login" className="t-small text-ceniza hover:text-white transition-colors duration-300">
              Entrar
            </Link>
            <Link
              href="/registro"
              className="rounded-[8px] bg-white text-obsidian px-4 py-2 text-[13px] font-medium hover:bg-marfil transition-colors duration-300"
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
// HERO — Fullscreen, dark, orbital visual
// ============================================

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Orbital background element */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[600px] h-[600px] md:w-[800px] md:h-[800px]">
          {/* Anillos orbitales */}
          <div className="absolute inset-0 rounded-full border border-white/[0.04]" />
          <div className="absolute inset-[15%] rounded-full border border-white/[0.06]" />
          <div className="absolute inset-[30%] rounded-full border border-white/[0.08]" />
          <div className="absolute inset-[45%] rounded-full border border-white/[0.03]" />

          {/* Punto orbitante */}
          <div className="absolute inset-0" style={{ animation: 'orbit-slow 20s linear infinite' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-3 h-3 rounded-full bg-señal" />
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-señal animate-ping opacity-30" />
            </div>
          </div>

          {/* Segundo punto orbitante */}
          <div className="absolute inset-[15%]" style={{ animation: 'orbit-slow 14s linear reverse infinite' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            </div>
          </div>

          {/* Glow central */}
          <div className="absolute inset-[35%] glow-orb rounded-full" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center">
        <div className="anim-fade-up">
          <span className="t-micro text-señal">Inteligencia artificial para PYMEs</span>
        </div>

        <h1 className="t-hero text-white mt-6 anim-fade-up d1">
          Tu gerente
          <br />
          <span className="text-ceniza">nunca duerme</span>
        </h1>

        <p className="t-body text-ceniza mt-8 max-w-md mx-auto anim-fade-up d2">
          Un agente de IA que conoce tu negocio en profundidad.
          Analiza, alerta y te ayuda a decidir — disponible 24/7.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10 anim-fade-up d3">
          <Link
            href="/registro"
            className="rounded-[8px] bg-white text-obsidian px-7 py-3 text-[14px] font-medium hover:bg-marfil transition-all duration-300 hover:scale-[1.02]"
          >
            Comenzar gratis
          </Link>
          <Link
            href="#producto"
            className="rounded-[8px] border border-white/10 text-white px-7 py-3 text-[14px] font-normal hover:border-white/25 transition-all duration-300"
          >
            Cómo funciona
          </Link>
        </div>

        <p className="t-small text-ceniza/50 mt-5 anim-fade-up d4">
          14 días gratis · Sin tarjeta · Configura en 5 minutos
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 anim-fade-in d6">
        <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-ceniza/30" />
      </div>
    </section>
  )
}

// ============================================
// DEMO — Chat mock on dark background
// ============================================

function Demo() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="t-micro text-ceniza mb-4">Así se ve</p>
          <h2 className="t-display text-white">
            Una conversación con tu negocio
          </h2>
        </div>

        <div className="rounded-[16px] border border-white/[0.06] bg-grafito/50 backdrop-blur-sm overflow-hidden">
          {/* Barra superior */}
          <div className="flex items-center space-x-3 px-6 py-4 border-b border-white/[0.06]">
            <div className="flex space-x-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            </div>
            <div className="flex-1 flex items-center justify-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-señal" style={{ animation: 'pulse-soft 2s ease infinite' }} />
              <span className="t-small text-ceniza">orbbi · en línea</span>
            </div>
          </div>

          {/* Mensajes */}
          <div className="p-6 md:p-8 space-y-5">
            {/* Usuario */}
            <div className="flex justify-end">
              <div className="bg-white/[0.06] border border-white/[0.06] rounded-[14px] rounded-br-[4px] px-5 py-3.5 max-w-[75%]">
                <p className="t-small text-white/80">
                  ¿Cómo estuvo marzo comparado con febrero?
                </p>
              </div>
            </div>

            {/* Agente */}
            <div className="flex justify-start">
              <div className="bg-white/[0.03] border border-white/[0.04] rounded-[14px] rounded-bl-[4px] px-5 py-3.5 max-w-[85%]">
                <p className="t-small text-white/90 leading-[1.7]">
                  Marzo cerró en <span className="text-señal font-medium">$4.2M</span>, un 18% arriba de febrero.
                  Instagram creció fuerte: ya es el 45% de tus ventas.
                  Facebook solo trae el 8% — te recomiendo mover ese presupuesto a Instagram
                  y testear TikTok el próximo mes.
                </p>
              </div>
            </div>

            {/* Usuario */}
            <div className="flex justify-end">
              <div className="bg-white/[0.06] border border-white/[0.06] rounded-[14px] rounded-br-[4px] px-5 py-3.5 max-w-[75%]">
                <p className="t-small text-white/80">
                  ¿Y el margen? Siento que bajó
                </p>
              </div>
            </div>

            {/* Agente */}
            <div className="flex justify-start">
              <div className="bg-white/[0.03] border border-white/[0.04] rounded-[14px] rounded-bl-[4px] px-5 py-3.5 max-w-[85%]">
                <p className="t-small text-white/90 leading-[1.7]">
                  Tienes razón. El margen bruto bajó de 34% a 28%.
                  El problema son los <span className="text-señal font-medium">costos de envío</span>, que subieron 40% por el nuevo proveedor.
                  ¿Quieres que analice alternativas de logística?
                </p>
              </div>
            </div>
          </div>

          {/* Input mock */}
          <div className="px-6 md:px-8 pb-6">
            <div className="rounded-[8px] border border-white/[0.06] bg-white/[0.02] px-4 py-3 flex items-center justify-between">
              <span className="t-small text-ceniza/40">Escribe tu mensaje...</span>
              <div className="w-7 h-7 rounded-[6px] bg-señal/80 flex items-center justify-center">
                <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// PRODUCTO — Bento grid
// ============================================

function Producto() {
  return (
    <section id="producto" className="py-32 px-6 bg-marfil">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-20">
          <p className="t-micro text-ceniza mb-4">Producto</p>
          <h2 className="t-display text-obsidian">
            No es un chatbot.
            <br />
            <span className="text-ceniza">Es un gerente.</span>
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Card grande — Contexto profundo */}
          <div className="md:col-span-4 bg-white border border-humo/40 rounded-[16px] p-8 md:p-10 flex flex-col justify-between min-h-[280px]">
            <div>
              <p className="t-micro text-señal mb-4">Memoria</p>
              <h3 className="t-title text-obsidian">
                Conoce tu negocio mejor que cualquier consultor
              </h3>
              <p className="t-body text-ceniza mt-3 max-w-md">
                14 preguntas configuran un perfil completo: giro, finanzas, clientes, metas.
                Cada respuesta del agente es específica para ti.
              </p>
            </div>
            <div className="flex space-x-2 mt-8">
              {['Ventas', 'Costos', 'Clientes', 'Metas'].map((t) => (
                <span key={t} className="text-[11px] text-ceniza bg-marfil px-3 py-1.5 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Card — 24/7 */}
          <div className="md:col-span-2 bg-obsidian rounded-[16px] p-8 flex flex-col justify-between min-h-[280px]">
            <p className="t-micro text-señal mb-4">Disponibilidad</p>
            <div>
              <p className="text-[56px] font-light text-white tracking-[-2px] leading-none">24/7</p>
              <p className="t-small text-ceniza mt-3">
                Sin horarios. Sin esperas. Sin agendar reuniones.
                Tu gerente responde al instante.
              </p>
            </div>
          </div>

          {/* Card — Alertas */}
          <div className="md:col-span-2 bg-obsidian rounded-[16px] p-8 flex flex-col justify-between min-h-[240px]">
            <p className="t-micro text-señal mb-4">Alertas</p>
            <div>
              <p className="t-title text-white">Detecta problemas antes que tú</p>
              <p className="t-small text-ceniza mt-3">
                Si algo se sale de rango — margen, costos, ventas — te avisa directamente.
              </p>
            </div>
          </div>

          {/* Card — Resúmenes */}
          <div className="md:col-span-2 bg-white border border-humo/40 rounded-[16px] p-8 flex flex-col justify-between min-h-[240px]">
            <p className="t-micro text-ceniza mb-4">Reportes</p>
            <div>
              <p className="t-title text-obsidian">Resumen semanal automático</p>
              <p className="t-small text-ceniza mt-3">
                Cada lunes: qué pasó, qué viene, qué debes atender. Sin pedirlo.
              </p>
            </div>
          </div>

          {/* Card — Decisiones */}
          <div className="md:col-span-2 bg-white border border-humo/40 rounded-[16px] p-8 flex flex-col justify-between min-h-[240px]">
            <p className="t-micro text-ceniza mb-4">Decisiones</p>
            <div>
              <p className="t-title text-obsidian">Recomendaciones con fundamento</p>
              <p className="t-small text-ceniza mt-3">
                No adivina. Analiza tus datos y te dice por qué recomienda cada acción.
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
  { nombre: 'General', area: 'Estrategia y operaciones', desc: 'Visión completa del negocio. Tu punto de partida.' },
  { nombre: 'Financiero', area: 'Flujo de caja y márgenes', desc: 'Controla costos, proyecta ingresos, detecta fugas.' },
  { nombre: 'Ventas', area: 'Pipeline y conversión', desc: 'Analiza canales, mide conversión, identifica oportunidades.' },
  { nombre: 'Marketing', area: 'Campañas y ROI', desc: 'Evalúa qué canal rinde y dónde invertir más.' },
  { nombre: 'RRHH', area: 'Personas y cultura', desc: 'Contrataciones, clima laboral, productividad.' },
  { nombre: 'Inventario', area: 'Stock y logística', desc: 'Rotación, proveedores, puntos de quiebre.' },
  { nombre: 'Legal', area: 'Contratos y cumplimiento', desc: 'Riesgos regulatorios, contratos, obligaciones.' },
]

function AgentesSection() {
  return (
    <section id="agentes" className="py-32 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="md:flex md:items-end md:justify-between mb-16">
          <div>
            <p className="t-micro text-señal mb-4">7 agentes</p>
            <h2 className="t-display text-white max-w-lg">
              Un equipo completo.
              <br />
              <span className="text-ceniza">Tú eliges quiénes.</span>
            </h2>
          </div>
          <p className="t-body text-ceniza max-w-sm mt-6 md:mt-0">
            Cada agente está entrenado para su área.
            Comienza con uno, agrega los que necesites.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {AGENTES.map((a, i) => (
            <div
              key={i}
              className="group rounded-[12px] border border-white/[0.06] bg-white/[0.02] p-6
                         hover:border-señal/30 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="t-micro text-ceniza">{a.area}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-señal opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-[18px] font-normal text-white tracking-[-0.3px]">{a.nombre}</h3>
              <p className="t-small text-ceniza mt-2">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// CÓMO FUNCIONA
// ============================================

function Proceso() {
  const pasos = [
    { num: '01', titulo: 'Crea tu cuenta', desc: '30 segundos. Sin tarjeta.' },
    { num: '02', titulo: 'Responde 14 preguntas', desc: 'Tu agente aprende tu negocio.' },
    { num: '03', titulo: 'Conversa y decide', desc: 'Datos reales, recomendaciones específicas.' },
  ]

  return (
    <section className="py-32 px-6 border-t border-white/[0.04]">
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-20">
          <p className="t-micro text-ceniza mb-4">Proceso</p>
          <h2 className="t-display text-white">
            5 minutos para configurar.
            <br />
            <span className="text-ceniza">Listo para siempre.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {pasos.map((p, i) => (
            <div key={i} className="relative">
              <span className="text-[64px] font-light text-white/[0.04] leading-none absolute -top-4 -left-2">
                {p.num}
              </span>
              <div className="relative pt-12">
                <div className="w-8 h-[1px] bg-señal mb-5" />
                <h3 className="text-[17px] font-medium text-white mb-2">{p.titulo}</h3>
                <p className="t-small text-ceniza">{p.desc}</p>
              </div>
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
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Glow de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] glow-orb pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h2 className="t-display text-white">
          Tu negocio merece
          <br />
          un gerente que
          <br />
          <span className="text-señal">nunca duerme</span>
        </h2>

        <div className="mt-10">
          <Link
            href="/registro"
            className="inline-block rounded-[8px] bg-white text-obsidian px-8 py-3.5 text-[14px] font-medium hover:bg-marfil transition-all duration-300 hover:scale-[1.02]"
          >
            Comenzar gratis — 14 días
          </Link>
        </div>

        <p className="t-small text-ceniza/40 mt-5">Sin compromiso · Sin tarjeta de crédito</p>
      </div>
    </section>
  )
}

// ============================================
// FOOTER
// ============================================

function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-10 px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <OrbiLogo size={22} color="light" />
        <div className="flex items-center space-x-8">
          <Link href="/precios" className="t-small text-ceniza hover:text-white transition-colors duration-300">
            Precios
          </Link>
          <Link href="/login" className="t-small text-ceniza hover:text-white transition-colors duration-300">
            Entrar
          </Link>
        </div>
        <p className="text-[11px] text-ceniza/40">
          © 2026 Orbbi
        </p>
      </div>
    </footer>
  )
}

// ============================================
// PAGE
// ============================================

export default function Home() {
  return (
    <main className="bg-obsidian">
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
