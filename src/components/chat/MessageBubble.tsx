'use client'

import { useState } from 'react'
import { ChatMessage } from '@/types/chat'
import { parseRichContent, CalloutBox, DataTable } from './RichContent'
import DocumentButton, { hasDocumentKeywords } from '@/components/chat/DocumentButton'

interface MessageBubbleProps {
  mensaje: ChatMessage
  empresaId?: string
  agente?: string
}

// ── Inline text formatting ──
function renderInline(texto: string) {
  const partes = texto.split(/(\*\*[^*]+\*\*)/)
  return partes.map((parte, i) => {
    if (parte.startsWith('**') && parte.endsWith('**')) {
      return <strong key={i} className="font-medium text-ink">{parte.slice(2, -2)}</strong>
    }
    return <span key={i}>{parte}</span>
  })
}

// ── Format a text block with lists, bold, etc ──
function FormatearTexto({ texto }: { texto: string }) {
  const lineas = texto.split('\n')
  return (
    <div className="space-y-1.5">
      {lineas.map((linea, i) => {
        if (linea.trim() === '') return <div key={i} className="h-2" />
        if (linea.trim().startsWith('- ') || linea.trim().startsWith('• ')) {
          const contenido = linea.trim().replace(/^[-•]\s*/, '')
          return (
            <div key={i} className="flex items-start gap-2.5 pl-1">
              <span className="text-clay mt-2 text-[6px]">●</span>
              <span className="flex-1">{renderInline(contenido)}</span>
            </div>
          )
        }
        const numMatch = linea.trim().match(/^(\d+)\.\s+(.+)/)
        if (numMatch) {
          return (
            <div key={i} className="flex items-start gap-2 pl-1">
              <span className="text-clay text-[13px] font-medium min-w-[20px] mt-0.5">{numMatch[1]}.</span>
              <span className="flex-1">{renderInline(numMatch[2])}</span>
            </div>
          )
        }
        return <p key={i}>{renderInline(linea)}</p>
      })}
    </div>
  )
}

// ── Rich content renderer — tables, callouts, and text ──
function RichResponse({ texto }: { texto: string }) {
  const blocks = parseRichContent(texto)

  // If no rich content detected, fall back to simple formatting
  if (blocks.length === 1 && blocks[0].type === 'text') {
    return <FormatearTexto texto={texto} />
  }

  return (
    <div className="space-y-2">
      {blocks.map((block, i) => {
        if (block.type === 'table' && block.data) {
          return <DataTable key={i} headers={block.data.headers as string[]} rows={block.data.rows as string[][]} />
        }
        if (block.type === 'callout') {
          const variant = (block.data?.variant as 'tip' | 'warning' | 'danger' | 'success') || 'tip'
          return <CalloutBox key={i} variant={variant}>{block.content}</CalloutBox>
        }
        return <FormatearTexto key={i} texto={block.content} />
      })}
    </div>
  )
}

export default function MessageBubble({ mensaje, empresaId, agente }: MessageBubbleProps) {
  const esUsuario = mensaje.rol === 'user'
  const [copiado, setCopiado] = useState(false)

  return (
    <div className={`mb-6 ${esUsuario ? 'flex justify-end' : ''} group`}>
      {esUsuario ? (
        /* User message — dark pill */
        <div className="bg-ink rounded-2xl rounded-br-md px-5 py-3.5 max-w-[80%] shadow-sm">
          <p className="text-[14px] leading-[1.7] text-ivory/90 whitespace-pre-wrap"
             style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
            {mensaje.contenido}
          </p>
        </div>
      ) : (
        /* Assistant — white card with rich content */
        <div className="relative">
          <div className="bg-ivory rounded-2xl shadow-sm border border-ink/[0.04] px-6 py-5">
            {/* Copy */}
            <button
              onClick={async () => { await navigator.clipboard.writeText(mensaje.contenido); setCopiado(true); setTimeout(() => setCopiado(false), 2000) }}
              className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 bg-ivory-mid border border-ink/[0.06] rounded-lg p-1.5 shadow-sm transition-all hover:shadow-md"
            >
              {copiado ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#b0aea5" strokeWidth="2" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
              )}
            </button>

            <div className="text-[15px] leading-[1.8] text-ink-light"
                 style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
              <RichResponse texto={mensaje.contenido} />
            </div>

            {empresaId && hasDocumentKeywords(mensaje.contenido) && (
              <DocumentButton contenido={mensaje.contenido} empresaId={empresaId} agente={agente || 'Gerente General'} />
            )}
          </div>

          <p className="text-[10px] text-cloud mt-1.5 ml-2">
            {new Date(mensaje.created_at).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      )}
    </div>
  )
}
