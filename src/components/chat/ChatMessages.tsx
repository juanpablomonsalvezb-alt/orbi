'use client'

import { useEffect, useRef } from 'react'
import { ChatMessage } from '@/types/chat'
import { TipoAgente } from '@/lib/prompts'
import MessageBubble from './MessageBubble'
import OrbiLogo from '@/components/ui/OrbiLogo'

interface ChatMessagesProps {
  mensajes: ChatMessage[]
  cargando: boolean
  agenteTipo?: TipoAgente
  onSugerencia?: (texto: string) => void
}

// Sugerencias iniciales por tipo de agente
const SUGERENCIAS: Record<TipoAgente, string[]> = {
  general: [
    '¿Cómo está la salud general de mi negocio?',
    '¿Cuáles son mis 3 prioridades esta semana?',
    '¿Qué oportunidades de mejora ves?',
  ],
  financiero: [
    '¿Cómo está mi flujo de caja?',
    'Ayúdame a calcular mi punto de equilibrio',
    '¿Cuál es mi margen real por producto?',
  ],
  ventas: [
    '¿Cómo puedo aumentar la retención de clientes?',
    'Analiza mi embudo de ventas',
    '¿Cuánto me cuesta adquirir un cliente?',
  ],
  marketing: [
    '¿En qué canal debería invertir más?',
    'Ayúdame a crear un plan de contenido',
    '¿Cómo puedo sistematizar el boca a boca?',
  ],
  rrhh: [
    '¿Cómo puedo delegar mejor?',
    'Necesito contratar — ¿qué perfil busco?',
    '¿Cómo mejoro la cultura con mi equipo?',
  ],
  inventario: [
    '¿Cuáles son mis productos de mayor rotación?',
    'Ayúdame a organizar mi inventario con ABC',
    '¿Cómo negociar mejor con proveedores?',
  ],
  legal: [
    '¿Qué obligaciones fiscales tengo este mes?',
    '¿Necesito contrato para este servicio?',
    '¿Estoy cumpliendo con la ley laboral?',
  ],
}

export default function ChatMessages({ mensajes, cargando, agenteTipo = 'general', onSugerencia }: ChatMessagesProps) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes])

  const sugerencias = SUGERENCIAS[agenteTipo]

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-obsidian">
      {/* Estado vacío con sugerencias */}
      {mensajes.length === 0 && !cargando && (
        <div className="flex flex-col items-center justify-center h-full">
          <OrbiLogo size={36} showText={false} color="light" className="opacity-20 mb-6" />
          <p className="text-[18px] font-light text-white/80 tracking-[-0.3px]">
            ¿En qué puedo ayudarte?
          </p>
          <p className="t-small text-ceniza/40 mt-2 mb-8">
            Elige una sugerencia o escribe tu pregunta
          </p>

          <div className="flex flex-col space-y-2 w-full max-w-md">
            {sugerencias.map((s, i) => (
              <button
                key={i}
                onClick={() => onSugerencia?.(s)}
                className="text-left px-4 py-3 rounded-[10px] border border-white/[0.06] bg-white/[0.02]
                           text-[13px] text-white/60 hover:text-white/90 hover:border-white/[0.12]
                           hover:bg-white/[0.04] transition-all duration-200"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mensajes */}
      {mensajes.map((msg) => (
        <MessageBubble key={msg.id} mensaje={msg} />
      ))}

      {/* Indicador de escritura */}
      {cargando && (
        <div className="flex justify-start">
          <div className="bg-white/[0.03] border border-white/[0.04] rounded-[14px] rounded-bl-[4px] px-5 py-3.5">
            <div className="flex space-x-1.5">
              <span className="w-1.5 h-1.5 bg-ceniza/60 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-ceniza/60 rounded-full animate-bounce [animation-delay:0.15s]" />
              <span className="w-1.5 h-1.5 bg-ceniza/60 rounded-full animate-bounce [animation-delay:0.3s]" />
            </div>
          </div>
        </div>
      )}

      <div ref={endRef} />
    </div>
  )
}
