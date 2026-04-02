import Link from 'next/link'
import OrbiLogo from '@/components/ui/OrbiLogo'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Branding panel */}
      <div className="hidden lg:flex lg:w-[44%] bg-ink flex-col justify-between p-10">
        <Link href="/"><OrbiLogo size={24} color="light" /></Link>
        <div>
          <h2 className="text-ivory max-w-xs" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '28px', fontWeight: 400, letterSpacing: '-0.5px', lineHeight: 1.15 }}>
            El agente que orbita tu negocio 24/7
          </h2>
          <p className="text-sm text-border mt-4 max-w-xs leading-relaxed" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
            Tu gerente virtual impulsado por IA. Analiza, alerta y apoya cada decisión.
          </p>
          <div className="mt-12 border-t border-ivory/[0.06] pt-5">
            <p className="text-sm text-ivory/30 italic leading-relaxed" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
              &ldquo;En dos semanas ya sabía más de mi negocio que yo mismo.&rdquo;
            </p>
            <p className="text-xs text-muted mt-3">Carolina Pérez · Café Don Pedro</p>
          </div>
        </div>
        <p className="text-[11px] text-muted/30">© 2026 Orbbi</p>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center bg-ivory px-6 py-12">
        <div className="w-full max-w-[340px]">
          <div className="lg:hidden flex justify-center mb-10">
            <Link href="/"><OrbiLogo size={28} color="dark" /></Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
