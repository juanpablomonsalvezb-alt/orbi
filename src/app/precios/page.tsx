import Link from 'next/link'
import OrbiLogo from '@/components/ui/OrbiLogo'
import PricingPage from '@/components/PricingPage'

function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-ivory-mid/90 backdrop-blur-sm">
      <div className="max-w-[1200px] mx-auto" style={{ padding: '0 clamp(1.5rem, 4vw, 5rem)' }}>
        <div className="h-[68px] flex items-center justify-between">
          <Link href="/"><OrbiLogo size={26} color="dark" /></Link>
          <div className="hidden md:flex items-center space-x-10">
            <Link href="/#producto" className="t-small text-muted hover:text-ink transition-colors duration-200">Producto</Link>
            <Link href="/#agentes" className="t-small text-muted hover:text-ink transition-colors duration-200">Agentes</Link>
            <Link href="/precios" className="t-small text-ink font-medium">Precios</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="t-small text-muted hover:text-ink transition-colors duration-200">Entrar</Link>
            <Link href="/demo" className="rounded-[4px] bg-ink text-ivory px-4 py-2 text-[13px] font-medium hover:bg-ink-mid transition-colors duration-200">
              Ver demo gratis
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="bg-ivory-mid border-t border-border-light" style={{ padding: 'clamp(2.5rem, 4vw, 4rem) 0' }}>
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4" style={{ padding: '0 clamp(1.5rem, 4vw, 5rem)' }}>
        <OrbiLogo size={22} color="dark" />
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-[12px] text-muted hover:text-ink transition-colors duration-200">Inicio</Link>
          <Link href="/login" className="text-[12px] text-muted hover:text-ink transition-colors duration-200">Entrar</Link>
        </div>
        <p className="text-[11px] text-muted">© 2026 Orbbi</p>
      </div>
    </footer>
  )
}

export default function PreciosPage() {
  return (
    <>
      <Nav />
      <PricingPage />
      <Footer />
    </>
  )
}
