'use client'

import type { TipoAgente } from '@/lib/prompts'
import { AGENTES } from '@/lib/prompts'

interface CrossReferralBannerProps {
  agenteRecomendado: TipoAgente
  razon: string
  onAbrir: (tipo: TipoAgente) => void
}

const AGENTE_COLORES: Record<TipoAgente, string> = {
  general: 'border-white/20',
  financiero: 'border-green-500/50',
  ventas: 'border-blue-500/50',
  marketing: 'border-purple-500/50',
  rrhh: 'border-yellow-500/50',
  inventario: 'border-orange-500/50',
  legal: 'border-red-500/50',
}

export default function CrossReferralBanner({ agenteRecomendado, razon, onAbrir }: CrossReferralBannerProps) {
  const agente = AGENTES.find(a => a.tipo === agenteRecomendado)
  if (!agente) return null

  const borderColor = AGENTE_COLORES[agenteRecomendado] || 'border-white/20'

  return (
    <div className={`ml-0 md:ml-5 mt-2 max-w-[80%] border-l-2 ${borderColor} bg-white/[0.02] rounded-r-lg px-4 py-3`}>
      <p className="text-[12px] text-ceniza/70 leading-relaxed">
        <span className="mr-1">💡</span>
        {razon}
      </p>
      <button
        onClick={() => onAbrir(agenteRecomendado)}
        className="mt-2 text-[11px] font-medium text-señal hover:text-señal/80 transition-colors
                   bg-señal/10 hover:bg-señal/15 px-3 py-1.5 rounded-md"
      >
        Abrir conversación con {agente.nombre}
      </button>
    </div>
  )
}
