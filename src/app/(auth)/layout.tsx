import Link from 'next/link'
import OrbiLogo from '@/components/ui/OrbiLogo'

// Layout para auth — split screen en desktop
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      {/* Panel izquierdo — branding (solo desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-obsidian flex-col justify-between p-10">
        <Link href="/">
          <OrbiLogo size={28} className="text-white" />
        </Link>

        <div>
          <h2 className="text-[28px] font-light text-white tracking-[-0.5px] leading-[1.2] max-w-sm">
            El agente que orbita tu negocio 24/7
          </h2>
          <p className="text-[14px] text-ceniza mt-4 max-w-sm leading-[1.6]">
            Tu gerente de operaciones virtual impulsado por inteligencia artificial.
            Monitorea, analiza y apoya cada decisión de tu empresa.
          </p>

          {/* Testimonio visual mock */}
          <div className="mt-12 border-t border-white/10 pt-6">
            <p className="text-[13px] text-white/60 italic leading-[1.6]">
              &ldquo;En dos semanas ya sabía más de mi negocio que yo mismo.
              Me avisó que mi margen en un producto era negativo
              y nunca me había dado cuenta.&rdquo;
            </p>
            <div className="flex items-center mt-4 space-x-3">
              <div className="w-8 h-8 rounded-full bg-grafito flex items-center justify-center">
                <span className="text-[11px] text-white font-medium">CP</span>
              </div>
              <div>
                <p className="text-[12px] text-white/80 font-medium">Carolina Pérez</p>
                <p className="text-[11px] text-ceniza">Dueña, Café Don Pedro</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-ceniza/40">
          © 2026 Orbbi
        </p>
      </div>

      {/* Panel derecho — formulario */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Logo mobile */}
          <div className="lg:hidden flex justify-center mb-10">
            <Link href="/">
              <OrbiLogo size={32} className="text-obsidian" />
            </Link>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
