'use client'

import type { TipoAgente } from '@/lib/prompts'
import { AGENTES } from '@/lib/prompts'

interface CrossReferralBannerProps {
  agenteRecomendado: TipoAgente
  razon: string
  onAbrir: (tipo: TipoAgente) => void
}

export default function CrossReferralBanner({ agenteRecomendado, razon, onAbrir }: CrossReferralBannerProps) {
  const agente = AGENTES.find(a => a.tipo === agenteRecomendado)
  if (!agente) return null

  return (
    <div className="ml-0 md:ml-5 mt-2 mb-4 max-w-[75%] border-l-2 border-accent/30 bg-ivory rounded-r-lg px-4 py-3">
      <p className="text-[12px] text-ink-light leading-relaxed" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
        💡 {razon}
      </p>
      <button
        onClick={() => onAbrir(agenteRecomendado)}
        className="mt-2 text-[11px] font-medium text-accent hover:text-accent/80 transition-colors
                   bg-accent/8 hover:bg-accent/12 px-3 py-1.5 rounded-md"
      >
        Abrir conversación con {agente.nombre}
      </button>
    </div>
  )
}
