'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import OrbiLogo from '@/components/ui/OrbiLogo'

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
// NAV (matches Anthropic: 4.25rem height, sticky, ivory-medium bg)
// ═══════════════════════════════════════════════════════════════════

function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-ivory-mid" style={{ height: 'var(--nav-height)' }}>
      <div className="u-container h-full flex items-center justify-between">
        <Link href="/"><OrbiLogo size={24} color="dark" /></Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="#producto" className="text-sm text-ink-light hover:text-ink transition-colors">Producto</Link>
          <Link href="#agentes" className="text-sm text-ink-light hover:text-ink transition-colors">Agentes</Link>
          <Link href="/precios" className="text-sm text-ink-light hover:text-ink transition-colors">Precios</Link>
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
// HERO (matches Anthropic: 7-col title + 5-col description, split grid)
// ═══════════════════════════════════════════════════════════════════

function Hero() {
  return (
    <header className="bg-ivory-dark">
      <div className="space-main" />
      <div className="u-container">
        <div className="grid-12">
          {/* 7 columns — main title */}
          <div style={{ gridColumn: 'span 7' }} className="max-md:col-span-full">
            <h1 className="u-display-xl">
              <AnimatedWords>
                Agentes de IA que operan tu negocio como un gerente experimentado
              </AnimatedWords>
            </h1>
          </div>

          {/* 5 columns — description */}
          <div style={{ gridColumn: 'span 5' }} className="max-md:col-span-full flex items-end">
            <div className="pb-1">
              <FadeIn delay={0.4}>
                <p className="u-paragraph-l" style={{ maxWidth: '40ch' }}>
                  Orbbi conoce tu empresa en profundidad. Analiza indicadores,
                  detecta problemas, apoya decisiones y entrega resúmenes
                  semanales — disponible 24/7.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
      <div className="space-medium" />
    </header>
  )
}

// ═══════════════════════════════════════════════════════════════════
// FEATURED — 3 cards in a row (matches Anthropic's "Latest releases")
// ═══════════════════════════════════════════════════════════════════

function Featured() {
  const items = [
    {
      title: 'Gerente General con IA',
      desc: '10,000+ líneas de conocimiento gerencial: Fayol, Porter, TOC, Lean, Eisenhower, Cynefin — todo aplicado a tu negocio.',
      label: 'Agente principal',
      cta: 'Conocer más',
    },
    {
      title: '7 agentes especializados',
      desc: 'Finanzas, ventas, marketing, RRHH, inventario y legal. Cada uno con su propia base de conocimiento profunda.',
      label: 'Equipo completo',
      cta: 'Ver agentes',
    },
    {
      title: 'Configurado en 5 minutos',
      desc: '14 preguntas configuran tu agente con el contexto completo de tu negocio. Sin integraciones complejas.',
      label: 'Onboarding',
      cta: 'Comenzar gratis',
    },
  ]

  return (
    <section>
      <div className="space-medium" />
      <div className="u-container">
        <FadeIn>
          <h2 className="u-display-s mb-6">Qué hace Orbbi</h2>
        </FadeIn>
        <div className="grid-12">
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1} className="col-span-4 max-md:col-span-full">
              <div className="bg-oat rounded p-6 md:p-8 h-full flex flex-col justify-between">
                <div>
                  <h3 className="u-display-s mb-4">{item.title}</h3>
                  <p className="u-paragraph-s mb-4">{item.desc}</p>
                </div>
                <div>
                  <ul className="mb-6">
                    <li className="text-xs text-ink-light py-1 flex justify-between border-b border-cloud-light/40">
                      <span className="font-mono uppercase text-[11px] text-muted">Categoría</span>
                      <span className="text-[13px]">{item.label}</span>
                    </li>
                  </ul>
                  <Link href="/registro" className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:opacity-70 transition-opacity">
                    {item.cta}
                    <svg width="20" height="20" viewBox="0 0 30 30" fill="none">
                      <path d="M25.98 15.66L17.54 24.1a.94.94 0 01-1.33-1.33l6.84-6.84H4.69a.94.94 0 010-1.87h18.36l-6.84-6.84a.94.94 0 011.33-1.33l8.44 8.44a.94.94 0 010 1.33z" fill="currentColor"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════
// MISSION + LINKS (matches Anthropic's "At Anthropic..." section)
// Left: display-s heading. Right: list of links.
// ═══════════════════════════════════════════════════════════════════

function MissionSection() {
  const links = [
    { title: 'Cómo funciona el onboarding', tag: 'Producto' },
    { title: 'Base de conocimiento gerencial', tag: 'Metodología' },
    { title: '7 agentes y sus capacidades', tag: 'Agentes' },
    { title: 'Planes y precios', tag: 'Precios' },
    { title: 'Seguridad y privacidad de datos', tag: 'Confianza' },
  ]

  return (
    <section id="producto">
      <div className="space-medium" />
      <div className="u-container">
        <div className="grid-12">
          {/* Left: heading */}
          <div style={{ gridColumn: 'span 4' }} className="max-md:col-span-full">
            <FadeIn>
              <h2 className="u-display-s" style={{ maxWidth: '20ch' }}>
                Orbbi transforma datos en decisiones para tu negocio.
              </h2>
            </FadeIn>
          </div>

          {/* Right: article list */}
          <div style={{ gridColumn: 'span 8' }} className="max-md:col-span-full">
            <ul>
              {links.map((link, i) => (
                <FadeIn key={i} delay={i * 0.06}>
                  <li className="flex items-center justify-between py-4 border-b border-cloud-light/40 group cursor-pointer hover:opacity-70 transition-opacity">
                    <span className="text-sm font-medium text-ink">{link.title}</span>
                    <span className="text-xs text-muted">{link.tag}</span>
                  </li>
                </FadeIn>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="space-medium" />
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════
// AGENTES (simple grid, matches Anthropic's "Values" 4-col grid)
// ═══════════════════════════════════════════════════════════════════

const AGENTES = [
  { nombre: 'General', desc: 'Estrategia, operaciones, visión 360° del negocio' },
  { nombre: 'Financiero', desc: 'Flujo de caja, márgenes, ratios, proyecciones' },
  { nombre: 'Ventas', desc: 'Pipeline, retención, CAC/LTV, cierre' },
  { nombre: 'Marketing', desc: 'Canales, ROI, posicionamiento, contenido' },
  { nombre: 'RRHH', desc: 'Contratación, cultura, desempeño, delegación' },
  { nombre: 'Inventario', desc: 'Stock, proveedores, logística, rotación' },
  { nombre: 'Legal', desc: 'Contratos, cumplimiento, permisos, regulación' },
]

function AgentesSection() {
  return (
    <section id="agentes" className="bg-ivory">
      <div className="space-main" />
      <div className="u-container">
        <FadeIn>
          <p className="u-detail-s mb-4" style={{ color: '#d97757' }}>7 agentes especializados</p>
          <h2 className="u-display-l mb-2" style={{ maxWidth: '20ch' }}>
            <AnimatedWords>Un equipo completo para cada área de tu negocio</AnimatedWords>
          </h2>
          <p className="u-paragraph-s mb-12" style={{ maxWidth: '50ch' }}>
            Cada agente tiene su propia base de conocimiento con frameworks, fórmulas
            y guías prácticas específicas para PYMEs en Latinoamérica.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {AGENTES.map((a, i) => (
            <FadeIn key={a.nombre} delay={i * 0.05}>
              <div className="bg-ivory-mid border border-cloud-light/50 rounded-lg p-5 hover:border-cloud transition-colors">
                <p className="text-xs text-muted uppercase tracking-wider mb-3">Agente</p>
                <h3 className="text-ink mb-2" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '18px' }}>
                  {a.nombre}
                </h3>
                <p className="text-sm text-ink-light leading-relaxed">{a.desc}</p>
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
// CTA
// ═══════════════════════════════════════════════════════════════════

function CTA() {
  return (
    <section>
      <div className="space-main" />
      <div className="u-container text-center">
        <FadeIn>
          <h2 className="u-display-l mx-auto" style={{ maxWidth: '20ch' }}>
            <AnimatedWords>Tu negocio merece un gerente que nunca duerme</AnimatedWords>
          </h2>
          <p className="u-paragraph-s mt-4 mb-8 mx-auto" style={{ maxWidth: '45ch' }}>
            Prueba Orbbi gratis por 14 días. Sin compromiso, sin tarjeta de crédito.
            Configuración en 5 minutos.
          </p>
          <Link href="/registro"
            className="inline-flex items-center gap-2 bg-ink text-ivory text-sm font-medium px-6 py-3 rounded hover:opacity-90 transition-opacity">
            Comenzar gratis — 14 días
            <svg width="20" height="20" viewBox="0 0 30 30" fill="none">
              <path d="M25.98 15.66L17.54 24.1a.94.94 0 01-1.33-1.33l6.84-6.84H4.69a.94.94 0 010-1.87h18.36l-6.84-6.84a.94.94 0 011.33-1.33l8.44 8.44a.94.94 0 010 1.33z" fill="currentColor"/>
            </svg>
          </Link>
        </FadeIn>
      </div>
      <div className="space-main" />
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════
// FOOTER (matches Anthropic: dark bg, multi-column, social icons)
// ═══════════════════════════════════════════════════════════════════

function Footer() {
  const cols = [
    { title: 'Producto', links: ['Gerente General', 'Agente Financiero', 'Agente de Ventas', 'Agente de Marketing', 'RRHH', 'Inventario', 'Legal', {t:'Precios', h:'/precios'}] },
    { title: 'Recursos', links: ['Documentación', 'Blog', 'Casos de uso', 'Tutoriales'] },
    { title: 'Empresa', links: ['Sobre nosotros', 'Contacto', 'Términos de servicio', 'Política de privacidad'] },
  ]

  return (
    <footer className="footer-dark">
      <div className="u-container" style={{ paddingTop: 'clamp(3rem, 2rem + 2vw, 5rem)', paddingBottom: 'clamp(2rem, 1.5rem + 1vw, 3rem)' }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Logo column */}
          <div>
            <OrbiLogo size={28} color="light" />
            <p className="text-xs text-muted mt-6">© 2026 Orbbi</p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-medium text-ivory-mid mb-4">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map((l) => {
                  const text = typeof l === 'string' ? l : l.t
                  const href = typeof l === 'string' ? '#' : l.h
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
      <Featured />
      <MissionSection />
      <AgentesSection />
      <CTA />
      <Footer />
    </main>
  )
}
