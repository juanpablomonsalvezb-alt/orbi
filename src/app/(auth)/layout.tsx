import Link from 'next/link'
import OrbiLogo from '@/components/ui/OrbiLogo'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      {/* Panel izquierdo — dark, branding */}
      <div className="hidden lg:flex lg:w-[45%] bg-obsidian flex-col justify-between p-10 relative overflow-hidden">
        {/* Orbital rings background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] relative">
            <div className="absolute inset-0 rounded-full border border-white/[0.03]" />
            <div className="absolute inset-[20%] rounded-full border border-white/[0.05]" />
            <div className="absolute inset-[40%] rounded-full border border-white/[0.03]" />
            <div className="absolute inset-[35%] glow-orb rounded-full" />
          </div>
        </div>

        <Link href="/">
          <OrbiLogo size={26} color="light" />
        </Link>

        <div className="relative z-10">
          <p className="t-micro text-señal mb-6">orbbi</p>
          <h2 className="text-[32px] font-light text-white tracking-[-1px] leading-[1.1] max-w-sm">
            El agente que orbita tu negocio 24/7
          </h2>
          <p className="t-body text-ceniza mt-5 max-w-xs">
            Tu gerente virtual impulsado por IA.
            Analiza, alerta y apoya cada decisión.
          </p>

          <div className="mt-16 border-t border-white/[0.06] pt-6">
            <p className="t-small text-white/40 italic leading-[1.7]">
              &ldquo;En dos semanas ya sabía más de mi negocio que yo mismo.
              Me avisó que un producto tenía margen negativo.&rdquo;
            </p>
            <div className="flex items-center mt-5 space-x-3">
              <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center">
                <span className="text-[10px] text-white/60 font-medium">CP</span>
              </div>
              <div>
                <p className="text-[12px] text-white/60 font-medium">Carolina Pérez</p>
                <p className="text-[11px] text-ceniza/60">Dueña, Café Don Pedro</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-ceniza/30">© 2026 Orbbi</p>
      </div>

      {/* Panel derecho — formulario */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-[360px]">
          <div className="lg:hidden flex justify-center mb-12">
            <Link href="/">
              <OrbiLogo size={30} color="dark" />
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
