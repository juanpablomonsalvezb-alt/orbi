'use client'

import { ChatMessage } from '@/types/chat'

interface MessageBubbleProps {
  mensaje: ChatMessage
}

// Renderiza texto con formato básico (bold, listas, líneas)
function FormatearTexto({ texto }: { texto: string }) {
  const lineas = texto.split('\n')

  return (
    <div className="space-y-1">
      {lineas.map((linea, i) => {
        // Línea vacía → espaciado
        if (linea.trim() === '') return <div key={i} className="h-2" />

        // Lista con bullet
        if (linea.trim().startsWith('- ') || linea.trim().startsWith('• ')) {
          const contenido = linea.trim().replace(/^[-•]\s*/, '')
          return (
            <div key={i} className="flex items-start space-x-2 pl-1">
              <span className="text-señal mt-1.5 text-[8px]">●</span>
              <span className="flex-1">{renderInline(contenido)}</span>
            </div>
          )
        }

        // Lista numerada
        const numMatch = linea.trim().match(/^(\d+)\.\s+(.+)/)
        if (numMatch) {
          return (
            <div key={i} className="flex items-start space-x-2 pl-1">
              <span className="text-señal text-[11px] font-medium min-w-[16px]">{numMatch[1]}.</span>
              <span className="flex-1">{renderInline(numMatch[2])}</span>
            </div>
          )
        }

        return <p key={i}>{renderInline(linea)}</p>
      })}
    </div>
  )
}

// Renderiza **bold** inline
function renderInline(texto: string) {
  const partes = texto.split(/(\*\*[^*]+\*\*)/)
  return partes.map((parte, i) => {
    if (parte.startsWith('**') && parte.endsWith('**')) {
      return <strong key={i} className="font-medium">{parte.slice(2, -2)}</strong>
    }
    return <span key={i}>{parte}</span>
  })
}

export default function MessageBubble({ mensaje }: MessageBubbleProps) {
  const esUsuario = mensaje.rol === 'user'

  return (
    <div className={`flex ${esUsuario ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] px-5 py-3.5 ${
          esUsuario
            ? 'bg-white/[0.06] border border-white/[0.06] rounded-[14px] rounded-br-[4px]'
            : 'bg-white/[0.03] border border-white/[0.04] rounded-[14px] rounded-bl-[4px]'
        }`}
      >
        {/* Contenido */}
        <div className={`text-[13px] leading-[1.7] font-normal ${
          esUsuario ? 'text-white/80' : 'text-white/90'
        }`}>
          {esUsuario ? (
            <p className="whitespace-pre-wrap">{mensaje.contenido}</p>
          ) : (
            <FormatearTexto texto={mensaje.contenido} />
          )}
        </div>

        {/* Hora */}
        <p className="text-[10px] text-ceniza/30 mt-2 text-right">
          {new Date(mensaje.created_at).toLocaleTimeString('es-CL', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
    </div>
  )
}
