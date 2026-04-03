'use client'

import { useEffect, useRef, useState } from 'react'
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

/**
 * Typewriter hook — accumulates streaming text in a buffer
 * and releases it character by character at a fixed interval.
 * This ensures smooth typing regardless of API speed.
 */
function useTypewriter(source: string, speed: number = 20) {
  const [display, setDisplay] = useState('')
  const bufferRef = useRef('')
  const posRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // When source changes, update the buffer
  useEffect(() => {
    bufferRef.current = source
  }, [source])

  // When source starts, begin the interval
  useEffect(() => {
    if (source && !timerRef.current) {
      posRef.current = 0
      setDisplay('')

      timerRef.current = setInterval(() => {
        const buf = bufferRef.current
        const pos = posRef.current

        if (pos < buf.length) {
          // Release 1-2 chars per tick
          const step = buf[pos] === ' ' ? 2 : 1
          const nextPos = Math.min(pos + step, buf.length)
          posRef.current = nextPos
          setDisplay(buf.slice(0, nextPos))
        }
        // Don't clear interval — keep checking for new buffer content
      }, speed)
    }

    // Cleanup when streaming stops
    if (!source && timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
      setDisplay('')
      posRef.current = 0
    }

    return () => {
      if (!source && timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [source, speed])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const isTyping = source.length > 0 && posRef.current < bufferRef.current.length

  return { display, isTyping }
}

export default function ChatMessages({ mensajes, cargando, streamingText = '', agenteTipo = 'general', onSugerencia, crossReferrals = {}, onCrossReferral }: ChatMessagesProps) {
  const endRef = useRef<HTMLDivElement>(null)
  const { display, isTyping } = useTypewriter(streamingText, 18)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes, display])

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="max-w-[900px] mx-auto px-10 py-10">

        {/* Empty state */}
        {mensajes.length === 0 && !cargando && !streamingText && (
          <div className="flex flex-col items-start pt-16">
            <p className="text-[32px] text-[#37352f]" style={{ fontFamily: "'Source Serif 4', Georgia, serif", letterSpacing: '-0.5px', fontWeight: 400 }}>
              ¿En qué puedo ayudarte?
            </p>
            <p className="text-[15px] text-[#9b9a97] mt-2 mb-10">
              Elige una sugerencia o escribe tu pregunta
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
              {SUGERENCIAS[agenteTipo].map((s, i) => (
                <button key={i} onClick={() => onSugerencia?.(s)}
                  className="text-left px-5 py-4 rounded-lg text-[14px] text-[#37352f] border border-[#e9e9e7]
                             hover:bg-[#f7f6f3] hover:border-[#d3d3d0] transition-all"
                  style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                  {s}
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

        {/* Streaming with real typewriter */}
        {(display || (cargando && !streamingText)) && (
          <div className="mb-8 py-4 border-l-2 border-[#e9e9e7] pl-6">
            {display ? (
              <div className="text-[15px] leading-[1.85] text-[#37352f] whitespace-pre-wrap"
                   style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                {display}
                {isTyping && <span className="inline-block w-[2px] h-[1.1em] bg-clay ml-0.5 animate-pulse rounded-sm align-text-bottom" />}
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-clay/40 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-clay/40 rounded-full animate-bounce [animation-delay:0.15s]" />
                <span className="w-1.5 h-1.5 bg-clay/40 rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
            )}
          </div>
        )}

        {/* Follow-up chips */}
        {!cargando && !streamingText && mensajes.length > 0 && mensajes[mensajes.length - 1].rol === 'assistant' && onSugerencia && (
          <div className="flex flex-wrap gap-2 mb-6 mt-2">
            {['Profundizar', 'Plan de acción', 'Siguiente tema'].map(label => (
              <button key={label}
                onClick={() => onSugerencia(label === 'Profundizar' ? 'Profundiza en esto' : label === 'Plan de acción' ? 'Dame un plan de acción concreto' : '¿Qué más deberíamos revisar?')}
                className="text-[12px] text-[#9b9a97] border border-[#e9e9e7] px-3 py-1.5 rounded-md
                           hover:bg-[#f7f6f3] hover:text-[#37352f] hover:border-[#d3d3d0] transition-all">
                {label}
              </button>
            ))}
          </div>
        )}

        <div ref={endRef} />
      </div>
    </div>
  )
}
