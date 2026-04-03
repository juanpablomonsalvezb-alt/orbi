'use client'

import { useState } from 'react'
import { ChatMessage } from '@/types/chat'
import DocumentButton, { hasDocumentKeywords } from '@/components/chat/DocumentButton'

interface MessageBubbleProps {
  mensaje: ChatMessage
  empresaId?: string
  agente?: string
}

function FormatearTexto({ texto }: { texto: string }) {
  const lineas = texto.split('\n')

  return (
    <div className="space-y-1">
      {lineas.map((linea, i) => {
        if (linea.trim() === '') return <div key={i} className="h-2" />

        if (linea.trim().startsWith('- ') || linea.trim().startsWith('• ')) {
          const contenido = linea.trim().replace(/^[-•]\s*/, '')
          return (
            <div key={i} className="flex items-start space-x-2 pl-1">
              <span className="text-señal mt-1.5 text-[8px]">●</span>
              <span className="flex-1">{renderInline(contenido)}</span>
            </div>
          )
        }

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

function renderInline(texto: string) {
  const partes = texto.split(/(\*\*[^*]+\*\*)/)
  return partes.map((parte, i) => {
    if (parte.startsWith('**') && parte.endsWith('**')) {
      return <strong key={i} className="font-medium">{parte.slice(2, -2)}</strong>
    }
    return <span key={i}>{parte}</span>
  })
}

export default function MessageBubble({ mensaje, empresaId, agente }: MessageBubbleProps) {
  const esUsuario = mensaje.rol === 'user'
  const [copiado, setCopiado] = useState(false)

  const copiar = async () => {
    await navigator.clipboard.writeText(mensaje.contenido)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  return (
    <div className={`flex ${esUsuario ? 'justify-end' : 'justify-start'} group`}>
      <div
        className={`max-w-[85%] md:max-w-[80%] px-5 py-3.5 relative ${
          esUsuario
            ? 'bg-white/[0.06] border border-white/[0.06] rounded-[14px] rounded-br-[4px]'
            : 'bg-white/[0.03] border border-white/[0.04] rounded-[14px] rounded-bl-[4px]'
        }`}
      >
        {/* Copy button */}
        {!esUsuario && (
          <button
            onClick={copiar}
            className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 bg-grafito border border-white/[0.1] rounded-md p-1 transition-opacity"
            title="Copiar"
          >
            {copiado ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#87867f" strokeWidth="2" strokeLinecap="round">
                <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
            )}
          </button>
        )}

        <div className={`text-[13px] leading-[1.7] font-normal ${
          esUsuario ? 'text-white/80' : 'text-white/90'
        }`}>
          {esUsuario ? (
            <p className="whitespace-pre-wrap">{mensaje.contenido}</p>
          ) : (
            <FormatearTexto texto={mensaje.contenido} />
          )}
        </div>

        {/* Botón de descarga de documento cuando el asistente lo ofrece */}
        {!esUsuario && empresaId && hasDocumentKeywords(mensaje.contenido) && (
          <DocumentButton
            contenido={mensaje.contenido}
            empresaId={empresaId}
            agente={agente || 'Gerente General'}
          />
        )}

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
