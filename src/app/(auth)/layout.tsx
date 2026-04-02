import Link from 'next/link'
import OrbiLogo from '@/components/ui/OrbiLogo'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      {/* Panel izquierdo — branding */}
      <div className="hidden lg:flex lg:w-[45%] bg-ink flex-col justify-between p-10">
        <Link href="/">
          <OrbiLogo size={26} color="light" />
        </Link>

        <div>
          <p className="t-detail text-accent-light mb-6">orbbi</p>
          <h2 className="text-ivory tracking-[-0.5px] leading-[1.1] max-w-sm" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '32px', fontWeight: 400 }}>
            El agente que orbita
            <br />tu negocio 24/7
          </h2>
          <p className="text-[15px] text-border mt-5 max-w-xs leading-[1.6]" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
            Tu gerente virtual impulsado por IA.
            Analiza, alerta y apoya cada decisión.
          </p>

          <div className="mt-14 border-t border-ivory/[0.08] pt-6">
            <p className="text-[15px] text-ivory/40 italic leading-[1.7]" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
              &ldquo;En dos semanas ya sabía más de mi negocio
              que yo mismo.&rdquo;
            </p>
            <p className="text-[12px] text-muted mt-4">
              Carolina Pérez · Café Don Pedro
            </p>
          </div>
        </div>

        <p className="text-[11px] text-muted/30">© 2026 Orbbi</p>
      </div>

      {/* Panel derecho — formulario */}
      <div className="flex-1 flex items-center justify-center bg-ivory px-6 py-12">
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
