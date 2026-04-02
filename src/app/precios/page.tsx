import Link from 'next/link'
import OrbiLogo from '@/components/ui/OrbiLogo'
import PricingPage from '@/components/PricingPage'

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-obsidian/80 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="h-16 flex items-center justify-between border-b border-white/[0.06]">
          <Link href="/">
            <OrbiLogo size={26} color="light" />
          </Link>
          <div className="hidden md:flex items-center space-x-10">
            <Link href="/#producto" className="t-small text-ceniza hover:text-white transition-colors duration-300">
              Producto
            </Link>
            <Link href="/#agentes" className="t-small text-ceniza hover:text-white transition-colors duration-300">
              Agentes
            </Link>
            <Link href="/precios" className="t-small text-white font-medium">
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

function Footer() {
  return (
    <footer className="bg-obsidian border-t border-white/[0.04] py-10 px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <OrbiLogo size={22} color="light" />
        <div className="flex items-center space-x-8">
          <Link href="/" className="t-small text-ceniza hover:text-white transition-colors duration-300">
            Inicio
          </Link>
          <Link href="/login" className="t-small text-ceniza hover:text-white transition-colors duration-300">
            Entrar
          </Link>
        </div>
        <p className="text-[11px] text-ceniza/40">© 2026 Orbbi</p>
      </div>
    </footer>
  )
}

export default function PreciosPage() {
  return (
    <>
      <Nav />
      <div className="pt-16">
        <PricingPage />
      </div>
      <Footer />
    </>
  )
}
