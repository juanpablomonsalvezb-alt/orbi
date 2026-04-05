'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import OrbiLogo from '@/components/ui/OrbiLogo'

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

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

// ── Nav ──
function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-ivory-mid border-b border-ink/[0.05]" style={{ height: '64px' }}>
      <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/"><OrbiLogo size={32} color="dark" /></Link>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-muted hover:text-ink transition-colors hidden sm:block">Entrar</Link>
          <Link href="/demo" className="bg-ink text-ivory text-sm font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity">
            Probar gratis
          </Link>
        </div>
      </div>
    </nav>
  )
}

// ── Hero ──
function Hero() {
  return (
    <header className="bg-ivory-dark">
      <div className="max-w-5xl mx-auto px-6" style={{ paddingTop: 'clamp(4rem, 3rem + 4vw, 7rem)', paddingBottom: 'clamp(4rem, 3rem + 4vw, 7rem)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="text-xs font-medium uppercase tracking-[0.15em] mb-4" style={{ color: '#d97757' }}>
            Para restaurantes
          </p>
          <h1 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 400, letterSpacing: '-1.5px', lineHeight: 1.05, color: '#141413' }}>
            Porque nadie debería decidir solo qué hacer con su restaurante.
          </h1>
          <p className="mt-6 text-base text-ink-light leading-relaxed" style={{ maxWidth: '46ch' }}>
            Food cost, rotación de personal, flujo de caja, proveedores — Orbbi es el gerente virtual que conoce tu restaurante y te dice exactamente qué hacer. 24/7. Sin sueldo.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link href="/demo" className="bg-clay text-white text-sm font-medium px-7 py-3 rounded-lg hover:opacity-90 transition-opacity text-center">
              Hablar con mi gerente ahora
            </Link>
            <Link href="/registro" className="border border-ink/20 text-ink text-sm font-medium px-7 py-3 rounded-lg hover:border-ink/40 transition-colors text-center">
              Crear cuenta gratis
            </Link>
          </div>
          <p className="text-xs text-muted mt-3">Sin tarjeta · Sin contrato · Responde en segundos</p>
        </motion.div>
      </div>
    </header>
  )
}

// ── Dolores ──
function DoloresSection() {
  const dolores = [
    {
      titulo: 'Tu food cost es un misterio',
      desc: 'Sabes cuánto vendes pero no cuánto te cuesta cada plato. Tu margen real puede ser la mitad de lo que crees — y no lo sabrás hasta que el banco te lo diga.',
    },
    {
      titulo: 'La rotación te está costando una fortuna',
      desc: 'Entrenar a un mesero cuesta más que su primer sueldo. Sin un proceso de contratación y onboarding claro, sigues contratando a las mismas personas equivocadas.',
    },
    {
      titulo: 'El flujo de caja no cuadra nunca',
      desc: 'Tienes mesas llenas y aún así la plata no alcanza. El problema suele ser el ciclo de pago a proveedores, no las ventas.',
    },
    {
      titulo: 'Los proveedores te controlan a ti',
      desc: 'No sabes cuándo negociar, qué precio es razonable ni qué proveedor te conviene. Aceptas lo que te ofrecen porque no tienes tiempo de comparar.',
    },
    {
      titulo: 'No sabes cuáles platos deberías eliminar',
      desc: 'Tu menú tiene 40 platos pero el 80% de las ventas viene de 8. Los demás te comen inventario y complejidad operacional.',
    },
    {
      titulo: 'Cada decisión la tomas solo',
      desc: 'Sin un equipo directivo, cada problema — subir precios, ampliar horario, abrir una sucursal — lo resuelves con instinto. A las 2AM. Sin datos.',
    },
  ]

  return (
    <section className="bg-ivory-mid">
      <div className="max-w-5xl mx-auto px-6" style={{ padding: 'clamp(4rem, 3rem + 3vw, 6rem) 24px' }}>
        <FadeIn className="text-center mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.15em] mb-3" style={{ color: '#d97757' }}>Lo que nadie te resuelve</p>
          <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 400, letterSpacing: '-0.8px', color: '#141413' }}>
            Los 6 problemas que tienen todos los restaurantes
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {dolores.map((d, i) => (
            <FadeIn key={d.titulo} delay={i * 0.06}>
              <div className="bg-white rounded-xl p-6 border border-ink/[0.05] h-full">
                <div className="w-7 h-7 rounded-full bg-clay/10 flex items-center justify-center mb-4">
                  <div className="w-2 h-2 rounded-full bg-clay" />
                </div>
                <h3 className="text-sm font-medium text-ink mb-2" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '15px' }}>
                  {d.titulo}
                </h3>
                <p className="text-sm text-ink-light leading-relaxed">{d.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Solución ──
function SolucionSection() {
  const agentes = [
    {
      nombre: 'Gerente General',
      pregunta: '¿Cuánto necesito vender este mes para no perder?',
      respuesta: 'Con tus costos fijos de $3.8M y margen promedio del 28%, necesitas facturar $13.6M. Llevas $9.2M en 18 días — vas bien pero debes acelerar el fin de semana.',
      tag: 'Estrategia',
    },
    {
      nombre: 'Agente Financiero',
      pregunta: 'Mis ventas subieron pero no tengo plata. ¿Qué pasó?',
      respuesta: 'Tu ciclo de cobro a eventos es de 45 días pero pagas a proveedores a 15 días. Tienes $4.2M atrapados en cuentas por cobrar. Negocia pago a 30 días con tus 3 proveedores principales.',
      tag: 'Finanzas',
    },
    {
      nombre: 'Agente de Inventario',
      pregunta: '¿Qué platos me están comiendo el margen?',
      respuesta: 'La pasta con mariscos tiene food cost de 42% — debería estar en 28%. O subes el precio $1.800 o reformulas la porción. El ahorro mensual estimado: $340.000.',
      tag: 'Food cost',
    },
    {
      nombre: 'Agente de RRHH',
      pregunta: '¿Cómo reduzco la rotación del personal de sala?',
      respuesta: 'El 70% de tu rotación ocurre en los primeros 60 días. Te falta un proceso de onboarding y una revisión de sueldo a los 90 días. Aquí tienes un template de semana 1 para nuevos meseros.',
      tag: 'Personas',
    },
  ]

  return (
    <section className="bg-ivory">
      <div className="max-w-5xl mx-auto px-6" style={{ padding: 'clamp(4rem, 3rem + 3vw, 6rem) 24px' }}>
        <FadeIn className="max-w-2xl mb-14">
          <p className="text-xs font-medium uppercase tracking-[0.15em] mb-3" style={{ color: '#d97757' }}>Cómo ayuda Orbbi</p>
          <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 400, letterSpacing: '-0.8px', color: '#141413' }}>
            Respuestas específicas para tu restaurante. No para cualquier negocio.
          </h2>
          <p className="mt-4 text-sm text-ink-light leading-relaxed">
            Orbbi aprende tu restaurante en 3 preguntas: qué vendes, cuánto facturan y qué te preocupa. Desde ahí, cada respuesta usa tus datos reales.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {agentes.map((a, i) => (
            <FadeIn key={a.nombre} delay={i * 0.07}>
              <div className="bg-ivory-dark rounded-xl p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium" style={{ color: '#d97757' }}>{a.nombre}</span>
                  <span className="text-[10px] font-medium uppercase tracking-widest bg-clay/10 text-clay px-2 py-0.5 rounded-full">{a.tag}</span>
                </div>
                <div className="bg-ink/[0.06] rounded-lg px-4 py-3 mb-3">
                  <p className="text-sm text-ink">{a.pregunta}</p>
                </div>
                <div className="bg-white rounded-lg px-4 py-3 border border-ink/[0.06]">
                  <p className="text-sm text-ink-light leading-relaxed">{a.respuesta}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Métricas restaurantes ──
function MetricasSection() {
  const datos = [
    { valor: '28–35%', etiqueta: 'Food cost ideal', desc: 'El rango que distingue un restaurante rentable de uno que sobrevive' },
    { valor: '180%', etiqueta: 'Rotación anual promedio', desc: 'El costo de cada salida equivale al sueldo de 2–3 meses del empleado' },
    { valor: '60%', etiqueta: 'Restaurantes cierran en año 1', desc: 'La mayoría por problemas de flujo de caja, no por falta de clientes' },
    { valor: '< 3 min', etiqueta: 'Setup en Orbbi', desc: 'De cero a tu gerente financiero, de inventario y de RRHH funcionando' },
  ]

  return (
    <section className="bg-ink">
      <div className="max-w-5xl mx-auto px-6" style={{ padding: 'clamp(4rem, 3rem + 3vw, 6rem) 24px' }}>
        <FadeIn className="text-center mb-12">
          <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400, letterSpacing: '-0.6px', color: '#fffff0' }}>
            Los números que definen tu industria
          </h2>
          <p className="text-sm mt-3" style={{ color: '#87867f' }}>
            Orbbi los conoce. Y te ayuda a estar del lado correcto de cada uno.
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-ivory/[0.06] rounded-2xl overflow-hidden">
          {datos.map((d, i) => (
            <FadeIn key={d.etiqueta} delay={i * 0.07}>
              <div className="bg-ink px-8 py-10 hover:bg-ink-mid transition-colors">
                <span style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 'clamp(36px, 4vw, 54px)', fontWeight: 400, letterSpacing: '-1.5px', color: '#d97757', lineHeight: 1 }}>
                  {d.valor}
                </span>
                <p className="text-sm font-medium mt-2" style={{ color: '#fffff0' }}>{d.etiqueta}</p>
                <p className="text-xs leading-relaxed mt-1" style={{ color: '#87867f' }}>{d.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Precio ──
function PrecioSection() {
  return (
    <section className="bg-ivory">
      <div className="max-w-5xl mx-auto px-6" style={{ padding: 'clamp(4rem, 3rem + 3vw, 6rem) 24px' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-3xl mx-auto">
          <FadeIn>
            <p className="text-xs font-medium uppercase tracking-[0.15em] mb-3" style={{ color: '#d97757' }}>Precio</p>
            <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, letterSpacing: '-0.8px', color: '#141413', lineHeight: 1.1 }}>
              Menos que un mesero por hora.
            </h2>
            <p className="text-sm text-ink-light mt-4 leading-relaxed">
              El plan Solo cuesta $29 USD al mes. Un Gerente General real en LATAM cuesta entre $2.000.000 y $5.000.000 mensuales. Orbbi trabaja 24/7 y conoce tu restaurante desde el primer día.
            </p>
            <div className="mt-6 space-y-2">
              {['Sin contrato de largo plazo', 'Cancela cuando quieras', 'Setup en menos de 3 minutos', 'Demo gratuita sin registro'].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8.5L6.5 12L13 4" stroke="#c6613f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm text-ink-light">{item}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-ink rounded-2xl p-8 text-center">
              <p style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '48px', fontWeight: 400, color: '#fffff0', letterSpacing: '-2px', lineHeight: 1 }}>
                $29
              </p>
              <p className="text-ivory/50 text-sm mt-1">USD / mes</p>
              <p className="text-ivory/30 text-xs mt-1">o $295.80 / año (-15%)</p>
              <Link href="/registro"
                className="block w-full mt-8 bg-clay text-white text-sm font-medium py-3 rounded-lg hover:opacity-90 transition-opacity">
                Activar mis agentes
              </Link>
              <Link href="/demo"
                className="block w-full mt-3 border border-ivory/20 text-ivory/70 text-sm font-medium py-3 rounded-lg hover:border-ivory/40 transition-colors">
                Probar la demo gratis primero
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

// ── CTA final ──
function CTAFinal() {
  return (
    <section className="bg-ink">
      <div className="max-w-5xl mx-auto px-6 text-center" style={{ padding: 'clamp(5rem, 4rem + 4vw, 8rem) 24px' }}>
        <FadeIn>
          <h2 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 400, letterSpacing: '-1px', color: '#fffff0', lineHeight: 1.1 }}>
            Tu restaurante merece un equipo directivo.
          </h2>
          <p className="text-ivory/50 text-sm mt-4 max-w-md mx-auto leading-relaxed">
            3 preguntas. 1 minuto. Y Orbbi empieza a trabajar para ti.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Link href="/demo"
              className="bg-clay text-white text-sm font-medium px-8 py-3.5 rounded-lg hover:opacity-90 transition-opacity">
              Hablar con mi gerente ahora
            </Link>
            <Link href="/registro"
              className="border border-ivory/20 text-ivory text-sm font-medium px-8 py-3.5 rounded-lg hover:border-ivory/40 transition-colors">
              Crear cuenta gratis
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ── Footer mínimo ──
function Footer() {
  return (
    <footer className="bg-ink border-t border-ivory/[0.06]" style={{ padding: '24px' }}>
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <OrbiLogo size={22} color="light" />
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xs text-ivory/30 hover:text-ivory/60 transition-colors">Inicio</Link>
          <Link href="/precios" className="text-xs text-ivory/30 hover:text-ivory/60 transition-colors">Precios</Link>
          <Link href="/demo" className="text-xs text-ivory/30 hover:text-ivory/60 transition-colors">Demo</Link>
          <Link href="/privacidad" className="text-xs text-ivory/30 hover:text-ivory/60 transition-colors">Privacidad</Link>
        </div>
        <p className="text-xs text-ivory/20">© 2026 Orbbi</p>
      </div>
    </footer>
  )
}

export default function RestaurantesPage() {
  return (
    <main>
      <Nav />
      <Hero />
      <DoloresSection />
      <SolucionSection />
      <MetricasSection />
      <PrecioSection />
      <CTAFinal />
      <Footer />
    </main>
  )
}
