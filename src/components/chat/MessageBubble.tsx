'use client'

import { ChatMessage } from '@/types/chat'

interface MessageBubbleProps {
  mensaje: ChatMessage
}

// Burbuja de chat: agente = fondo oscuro, usuario = fondo blanco con borde
export default function MessageBubble({ mensaje }: MessageBubbleProps) {
  const esUsuario = mensaje.rol === 'user'

  return (
    <div className={`flex ${esUsuario ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[75%] px-4 py-3 ${
          esUsuario
            ? 'bg-white border border-humo/50 rounded-[16px] rounded-br-[4px]'
            : 'bg-obsidian text-[#f5f5f5] rounded-[16px] rounded-bl-[4px]'
        }`}
      >
        {/* Indicador de rol */}
        <p className={`text-[11px] font-medium uppercase tracking-[0.1em] mb-1.5 ${
          esUsuario ? 'text-ceniza' : 'text-ceniza'
        }`}>
          {esUsuario ? 'Tú' : 'orbbi'}
        </p>

        {/* Contenido */}
        <p className="text-[13px] leading-[1.6] whitespace-pre-wrap font-normal">
          {mensaje.contenido}
        </p>

        {/* Hora */}
        <p className={`text-[10px] mt-1.5 text-right ${
          esUsuario ? 'text-ceniza' : 'text-ceniza/60'
        }`}>
          {new Date(mensaje.created_at).toLocaleTimeString('es-CL', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
    </div>
  )
}
