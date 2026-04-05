export const dynamic = 'force-dynamic'

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
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[0,1,2,3,4].map(i => (
                  <svg key={i} width="10" height="10" viewBox="0 0 10 10" fill="#d97757"><polygon points="5,1 6.2,3.8 9.5,4.1 7.2,6.2 7.9,9.5 5,7.8 2.1,9.5 2.8,6.2 0.5,4.1 3.8,3.8" /></svg>
                ))}
              </div>
              <p className="text-xs text-ivory/30">Demo disponible ahora — sin tarjeta</p>
            </div>
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
