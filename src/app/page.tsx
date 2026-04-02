'use client'

import Link from 'next/link'
import OrbiLogo from '@/components/ui/OrbiLogo'

// ============================================
// ICONOS PARA FEATURES
// ============================================

function IconChat() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  )
}

function IconChart() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 20V10M12 20V4M6 20v-6" />
    </svg>
  )
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function IconZap() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}

function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  )
}

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

// ============================================
// NAVBAR
// ============================================

function LandingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-humo/30">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <OrbiLogo size={28} className="text-obsidian" />

        <div className="hidden md:flex items-center space-x-8">
          <Link href="#features" className="text-[13px] text-ceniza hover:text-obsidian transition-colors">
            Funciones
          </Link>
          <Link href="#agentes" className="text-[13px] text-ceniza hover:text-obsidian transition-colors">
            Agentes
          </Link>
          <Link href="/precios" className="text-[13px] text-ceniza hover:text-obsidian transition-colors">
            Precios
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/login"
            className="text-[13px] text-ceniza hover:text-obsidian transition-colors"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/registro"
            className="rounded-[8px] bg-obsidian text-white px-4 py-2 text-[13px] font-medium hover:bg-grafito transition-colors"
          >
            Empezar gratis
          </Link>
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
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Label */}
        <div className="animate-fade-up">
          <span className="text-label bg-marfil px-3 py-1.5 rounded-full">
            Inteligencia artificial para PYMEs
          </span>
        </div>

        {/* Título */}
        <h1 className="text-display text-obsidian mt-8 animate-fade-up delay-100">
          El agente que orbita
          <br />
          tu negocio 24/7
        </h1>

        {/* Subtítulo */}
        <p className="text-body-lg mt-6 max-w-lg mx-auto animate-fade-up delay-200">
          Un gerente de operaciones virtual que conoce tu empresa en profundidad.
          Monitorea, analiza y te ayuda a tomar mejores decisiones.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10 animate-fade-up delay-300">
          <Link
            href="/registro"
            className="rounded-[8px] bg-obsidian text-white px-6 py-3 text-[14px] font-medium hover:bg-grafito transition-colors"
          >
            Comenzar gratis — 14 días
          </Link>
          <Link
            href="/precios"
            className="rounded-[8px] border border-humo text-obsidian px-6 py-3 text-[14px] font-medium hover:bg-marfil transition-colors"
          >
            Ver planes
          </Link>
        </div>

        {/* Trust line */}
        <p className="text-caption mt-6 animate-fade-up delay-400">
          Sin tarjeta de crédito · Configuración en 5 minutos
        </p>
      </div>

      {/* Visual: mock del chat */}
      <div className="max-w-2xl mx-auto mt-16 animate-fade-up delay-500">
        <div className="rounded-[16px] bg-obsidian p-6 md:p-8">
          {/* Header del mock */}
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-white/10">
            <OrbiLogo size={20} showText={false} className="text-white" />
            <div>
              <p className="text-[13px] text-white font-medium">orbbi</p>
              <p className="text-[11px] text-ceniza">Gerente virtual · en línea</p>
            </div>
          </div>

          {/* Mensajes mock */}
          <div className="space-y-4">
            <div className="flex justify-end">
              <div className="bg-white rounded-[16px] rounded-br-[4px] px-4 py-3 max-w-[80%]">
                <p className="text-[13px] text-obsidian leading-[1.6]">
                  ¿Cómo estuvieron las ventas este mes comparado con el anterior?
                </p>
              </div>
            </div>

            <div className="flex justify-start">
              <div className="bg-grafito rounded-[16px] rounded-bl-[4px] px-4 py-3 max-w-[85%]">
                <p className="text-[13px] text-white/90 leading-[1.6]">
                  Las ventas de marzo fueron $4.2M, un 18% más que febrero ($3.5M).
                  El canal Instagram creció 32% y ya representa el 45% de tus ventas totales.
                  Te recomiendo aumentar la inversión ahí y reducir el gasto en Facebook
                  que solo trae el 8%.
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
// FEATURES
// ============================================

const FEATURES = [
  {
    icono: <IconChat />,
    titulo: 'Chat inteligente',
    descripcion: 'Conversa con un agente que conoce cada detalle de tu negocio. Sin respuestas genéricas.',
  },
  {
    icono: <IconChart />,
    titulo: 'Análisis en tiempo real',
    descripcion: 'Indicadores clave, tendencias y alertas automáticas basadas en tus datos.',
  },
  {
    icono: <IconZap />,
    titulo: 'Decisiones más rápidas',
    descripcion: 'Recomendaciones específicas para tu negocio. El agente detecta problemas y oportunidades.',
  },
  {
    icono: <IconClock />,
    titulo: 'Resúmenes semanales',
    descripcion: 'Cada lunes recibes un reporte con lo que pasó, lo que viene y lo que debes atender.',
  },
  {
    icono: <IconUsers />,
    titulo: 'Múltiples agentes',
    descripcion: 'Finanzas, ventas, marketing, RRHH — cada área con su propio agente especializado.',
  },
  {
    icono: <IconShield />,
    titulo: 'Datos privados y seguros',
    descripcion: 'Tu información está aislada y encriptada. Nadie más accede a los datos de tu empresa.',
  },
]

function Features() {
  return (
    <section id="features" className="py-24 px-6 bg-marfil">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-label mb-3">Funciones</p>
          <h2 className="text-display-sm text-obsidian">
            Todo lo que un gerente haría,
            <br className="hidden md:block" />
            pero disponible 24/7
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="bg-white border border-humo/40 rounded-[12px] p-6 hover:border-humo transition-colors"
            >
              <div className="w-10 h-10 rounded-[10px] bg-marfil flex items-center justify-center text-obsidian mb-4">
                {f.icono}
              </div>
              <h3 className="text-[15px] font-medium text-obsidian mb-2">{f.titulo}</h3>
              <p className="text-[13px] text-ceniza leading-[1.6]">{f.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// AGENTES
// ============================================

const AGENTES_PREVIEW = [
  { nombre: 'Gerente General', rol: 'Estrategia y operaciones diarias', emoji: '🎯' },
  { nombre: 'Financiero', rol: 'Flujo de caja, márgenes, costos', emoji: '📊' },
  { nombre: 'Ventas', rol: 'Pipeline, conversión, clientes', emoji: '📈' },
  { nombre: 'Marketing', rol: 'Campañas, posicionamiento, ROI', emoji: '🎯' },
  { nombre: 'RRHH', rol: 'Personas, cultura, contrataciones', emoji: '👥' },
  { nombre: 'Inventario', rol: 'Stock, logística, proveedores', emoji: '📦' },
  { nombre: 'Legal', rol: 'Contratos, cumplimiento, riesgos', emoji: '⚖️' },
]

function AgentesSection() {
  return (
    <section id="agentes" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-label mb-3">Agentes especializados</p>
          <h2 className="text-display-sm text-obsidian">
            Un equipo completo de IA
            <br className="hidden md:block" />
            para cada área de tu negocio
          </h2>
          <p className="text-body-lg mt-4 max-w-lg mx-auto">
            Cada agente está entrenado para su área. Elige los que necesites.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {AGENTES_PREVIEW.map((a, i) => (
            <div
              key={i}
              className="bg-marfil rounded-[12px] p-5 text-center hover:bg-humo/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mx-auto mb-3 text-lg">
                {a.emoji}
              </div>
              <p className="text-[14px] font-medium text-obsidian">{a.nombre}</p>
              <p className="text-[12px] text-ceniza mt-1">{a.rol}</p>
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

function ComoFunciona() {
  const pasos = [
    { num: '01', titulo: 'Crea tu cuenta', desc: 'Registro en 30 segundos. Sin tarjeta de crédito.' },
    { num: '02', titulo: 'Cuenta sobre tu negocio', desc: '14 preguntas que configuran tu agente personalizado.' },
    { num: '03', titulo: 'Habla con tu gerente virtual', desc: 'Pregunta, decide y actúa con datos de tu negocio.' },
  ]

  return (
    <section className="py-24 px-6 bg-obsidian text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ceniza mb-3">Cómo funciona</p>
          <h2 className="text-display-sm text-white">
            Configurado en 5 minutos.
            <br className="hidden md:block" />
            Listo para siempre.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pasos.map((p, i) => (
            <div key={i} className="text-center md:text-left">
              <span className="text-señal text-[13px] font-medium">{p.num}</span>
              <h3 className="text-[17px] font-medium text-white mt-2 mb-2">{p.titulo}</h3>
              <p className="text-[14px] text-ceniza leading-[1.6]">{p.desc}</p>
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
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-display-sm text-obsidian">
          Tu negocio merece un gerente
          <br className="hidden md:block" />
          que nunca duerme
        </h2>
        <p className="text-body-lg mt-4 max-w-md mx-auto">
          Prueba Orbbi gratis por 14 días. Sin compromiso, sin tarjeta.
        </p>
        <div className="mt-8">
          <Link
            href="/registro"
            className="inline-block rounded-[8px] bg-obsidian text-white px-8 py-3.5 text-[14px] font-medium hover:bg-grafito transition-colors"
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
    <footer className="border-t border-humo/40 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <OrbiLogo size={22} className="text-obsidian" />
        <div className="flex items-center space-x-6">
          <Link href="/precios" className="text-[12px] text-ceniza hover:text-obsidian transition-colors">
            Precios
          </Link>
          <Link href="/login" className="text-[12px] text-ceniza hover:text-obsidian transition-colors">
            Iniciar sesión
          </Link>
        </div>
        <p className="text-[11px] text-ceniza">
          © 2026 Orbbi. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

// ============================================
// PÁGINA COMPLETA
// ============================================

export default function Home() {
  return (
    <main>
      <LandingNav />
      <Hero />
      <Features />
      <AgentesSection />
      <ComoFunciona />
      <CTAFinal />
      <Footer />
    </main>
  )
}
