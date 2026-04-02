import Link from 'next/link'
import OrbiLogo from '@/components/ui/OrbiLogo'
import PricingPage from '@/components/PricingPage'

// Navbar para pricing (misma que landing)
function PricingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-humo/30">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/">
          <OrbiLogo size={28} className="text-obsidian" />
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/#features" className="text-[13px] text-ceniza hover:text-obsidian transition-colors">
            Funciones
          </Link>
          <Link href="/#agentes" className="text-[13px] text-ceniza hover:text-obsidian transition-colors">
            Agentes
          </Link>
          <Link href="/precios" className="text-[13px] text-obsidian font-medium">
            Precios
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <Link href="/login" className="text-[13px] text-ceniza hover:text-obsidian transition-colors">
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

function Footer() {
  return (
    <footer className="border-t border-humo/40 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <OrbiLogo size={22} className="text-obsidian" />
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-[12px] text-ceniza hover:text-obsidian transition-colors">
            Inicio
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

export default function PreciosPage() {
  return (
    <>
      <PricingNav />
      <div className="pt-14">
        <PricingPage />
      </div>
      <Footer />
    </>
  )
}
