'use client'

import { useEffect, useRef } from 'react'
import { ChatMessage } from '@/types/chat'
import { TipoAgente } from '@/lib/prompts'
import { CrossReferral } from '@/lib/cross-referral'
import MessageBubble from './MessageBubble'
import CrossReferralBanner from './CrossReferralBanner'

interface ChatMessagesProps {
  mensajes: ChatMessage[]
  cargando: boolean
  streamingText?: string
  agenteTipo?: TipoAgente
  onSugerencia?: (texto: string) => void
  crossReferrals?: Record<string, CrossReferral>
  onCrossReferral?: (tipo: TipoAgente) => void
}

const SUGERENCIAS: Record<TipoAgente, string[]> = {
  general: ['¿Cómo está la salud general de mi negocio?', '¿Cuáles son mis 3 prioridades esta semana?', '¿Qué oportunidades de mejora ves?'],
  financiero: ['¿Cómo está mi flujo de caja?', 'Ayúdame a calcular mi punto de equilibrio', '¿Cuál es mi margen real por producto?'],
  ventas: ['¿Cómo puedo aumentar la retención?', 'Analiza mi embudo de ventas', '¿Cuánto me cuesta adquirir un cliente?'],
  marketing: ['¿En qué canal debería invertir más?', 'Ayúdame a crear un plan de contenido', '¿Cómo sistematizar el boca a boca?'],
  rrhh: ['¿Cómo puedo delegar mejor?', 'Necesito contratar — ¿qué perfil busco?', '¿Cómo mejoro la cultura de equipo?'],
  inventario: ['¿Cuáles productos rotan más?', 'Organizar inventario con ABC', '¿Cómo negociar con proveedores?'],
  legal: ['¿Qué obligaciones fiscales tengo?', '¿Necesito contrato para este servicio?', '¿Cumplo con la ley laboral?'],
}

export default function ChatMessages({ mensajes, cargando, streamingText = '', agenteTipo = 'general', onSugerencia, crossReferrals = {}, onCrossReferral }: ChatMessagesProps) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes, streamingText])

  return (
    <div className="flex-1 overflow-y-auto bg-ivory-mid">
      <div className="max-w-[720px] mx-auto px-6 py-10">

        {/* Empty state — editorial, premium */}
        {mensajes.length === 0 && !cargando && (
          <div className="flex flex-col items-center pt-20">
            {/* Decorative circle */}
            <div className="w-16 h-16 rounded-full bg-oat/60 flex items-center justify-center mb-8">
              <div className="w-8 h-8 rounded-full bg-clay/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-clay/60" />
              </div>
            </div>
            <h2 className="u-display-s text-ink mb-2">¿En qué puedo ayudarte?</h2>
            <p className="text-sm text-muted mb-10" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
              Elige una sugerencia o escribe tu pregunta
            </p>
            <div className="grid grid-cols-1 gap-2.5 w-full max-w-lg">
              {SUGERENCIAS[agenteTipo].map((s, i) => (
                <button key={i} onClick={() => onSugerencia?.(s)}
                  className="text-left px-5 py-4 rounded-xl bg-ivory shadow-sm border border-ink/[0.04]
                             hover:shadow-md hover:border-ink/[0.08] transition-all duration-200 group">
                  <p className="text-[14px] text-ink-light group-hover:text-ink transition-colors"
                     style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                    {s}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {mensajes.map((msg) => (
          <div key={msg.id}>
            <MessageBubble mensaje={msg} />
            {msg.rol === 'assistant' && crossReferrals[msg.id] && onCrossReferral && (
              <CrossReferralBanner
                agenteRecomendado={crossReferrals[msg.id].agenteRecomendado}
                razon={crossReferrals[msg.id].razon}
                onAbrir={onCrossReferral}
              />
            )}
          </div>
        ))}

        {/* Streaming */}
        {streamingText && (
          <div className="mb-6">
            <div className="bg-ivory rounded-2xl shadow-sm border border-ink/[0.04] px-6 py-5">
              <div className="text-[15px] leading-[1.8] text-ink-light whitespace-pre-wrap"
                   style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                {streamingText}
                <span className="inline-block w-0.5 h-5 bg-clay ml-1 animate-pulse rounded-full" />
              </div>
            </div>
          </div>
        )}

        {/* Follow-up chips after last assistant message */}
        {!cargando && !streamingText && mensajes.length > 0 && mensajes[mensajes.length - 1].rol === 'assistant' && onSugerencia && (
          <div className="flex flex-wrap gap-2 mb-6 ml-1">
            <button onClick={() => onSugerencia('Profundiza en esto')}
              className="text-[12px] text-ink-light bg-ivory border border-ink/[0.06] px-3.5 py-1.5 rounded-full hover:border-ink/[0.12] hover:shadow-sm transition-all"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
              Profundizar
            </button>
            <button onClick={() => onSugerencia('Dame un plan de acción concreto')}
              className="text-[12px] text-ink-light bg-ivory border border-ink/[0.06] px-3.5 py-1.5 rounded-full hover:border-ink/[0.12] hover:shadow-sm transition-all"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
              Plan de acción
            </button>
            <button onClick={() => onSugerencia('¿Qué más deberíamos revisar?')}
              className="text-[12px] text-ink-light bg-ivory border border-ink/[0.06] px-3.5 py-1.5 rounded-full hover:border-ink/[0.12] hover:shadow-sm transition-all"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
              Siguiente tema
            </button>
          </div>
        )}

        {/* Loading */}
        {cargando && !streamingText && (
          <div className="mb-6">
            <div className="bg-ivory rounded-2xl shadow-sm border border-ink/[0.04] px-6 py-5 inline-block">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-clay/30 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-clay/30 rounded-full animate-bounce [animation-delay:0.15s]" />
                  <span className="w-2 h-2 bg-clay/30 rounded-full animate-bounce [animation-delay:0.3s]" />
                </div>
                <span className="text-[12px] text-muted ml-1">Pensando...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>
    </div>
  )
}
