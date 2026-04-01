'use client'

import { useEffect, useRef } from 'react'
import { ChatMessage } from '@/types/chat'
import MessageBubble from './MessageBubble'
import OrbiLogo from '@/components/ui/OrbiLogo'

interface ChatMessagesProps {
  mensajes: ChatMessage[]
  cargando: boolean
}

// Lista de mensajes con auto-scroll y fondo oscuro
export default function ChatMessages({ mensajes, cargando }: ChatMessagesProps) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes])

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-obsidian">
      {/* Estado vacío */}
      {mensajes.length === 0 && !cargando && (
        <div className="flex flex-col items-center justify-center h-full text-ceniza">
          <OrbiLogo size={40} showText={false} className="text-ceniza/40 mb-4" />
          <p className="text-heading text-[#f5f5f5]">orbbi está listo</p>
          <p className="text-caption mt-1">Pregúntame lo que necesites sobre tu negocio</p>
        </div>
      )}

      {/* Mensajes */}
      {mensajes.map((msg) => (
        <MessageBubble key={msg.id} mensaje={msg} />
      ))}

      {/* Indicador de escritura */}
      {cargando && (
        <div className="flex justify-start">
          <div className="bg-grafito rounded-[16px] rounded-bl-[4px] px-4 py-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-ceniza mb-1.5">orbbi</p>
            <div className="flex space-x-1.5">
              <span className="w-1.5 h-1.5 bg-ceniza rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-ceniza rounded-full animate-bounce [animation-delay:0.1s]" />
              <span className="w-1.5 h-1.5 bg-ceniza rounded-full animate-bounce [animation-delay:0.2s]" />
            </div>
          </div>
        </div>
      )}

      <div ref={endRef} />
    </div>
  )
}
