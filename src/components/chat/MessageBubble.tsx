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

function renderInline(texto: string) {
  const partes = texto.split(/(\*\*[^*]+\*\*)/)
  return partes.map((parte, i) => {
    if (parte.startsWith('**') && parte.endsWith('**')) {
      return <strong key={i} className="font-semibold text-[#37352f]">{parte.slice(2, -2)}</strong>
    }
    return <span key={i}>{parte}</span>
  })
}

function FormatearTexto({ texto }: { texto: string }) {
  const lineas = texto.split('\n')
  return (
    <div className="space-y-1">
      {lineas.map((linea, i) => {
        if (linea.trim() === '') return <div key={i} className="h-3" />
        if (linea.trim().startsWith('- ') || linea.trim().startsWith('• ')) {
          const contenido = linea.trim().replace(/^[-•]\s*/, '')
          return (
            <div key={i} className="flex items-start gap-2 pl-0.5 py-0.5">
              <span className="text-[#37352f] mt-[9px] text-[5px]">●</span>
              <span className="flex-1">{renderInline(contenido)}</span>
            </div>
          )
        }
        const numMatch = linea.trim().match(/^(\d+)\.\s+(.+)/)
        if (numMatch) {
          return (
            <div key={i} className="flex items-start gap-2 pl-0.5 py-0.5">
              <span className="text-[#37352f] text-[14px] font-medium min-w-[20px] tabular-nums">{numMatch[1]}.</span>
              <span className="flex-1">{renderInline(numMatch[2])}</span>
            </div>
          )
        }
        return <p key={i} className="py-0.5">{renderInline(linea)}</p>
      })}
    </div>
  )
}

function RichResponse({ texto }: { texto: string }) {
  const blocks = parseRichContent(texto)
  if (blocks.length === 1 && blocks[0].type === 'text') {
    return <FormatearTexto texto={texto} />
  }
  return (
    <div className="space-y-1">
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
    <div className={`mb-6 ${esUsuario ? '' : 'group'}`}>
      {esUsuario ? (
        /* User — right-aligned, subtle bg, Notion-style */
        <div className="flex justify-end">
          <div className="bg-[#2f3437] text-white rounded-[20px] rounded-br-[6px] px-5 py-3 max-w-[75%]">
            <p className="text-[14px] leading-[1.6] whitespace-pre-wrap"
               style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
              {mensaje.contenido}
            </p>
          </div>
        </div>
      ) : (
        /* Assistant — no bubble, clean content like Notion page */
        <div className="relative py-3 border-l-2 border-[#e9e9e7] pl-5 hover:border-clay/40 transition-colors">
          {/* Copy — appears on hover */}
          <button
            onClick={async () => { await navigator.clipboard.writeText(mensaje.contenido); setCopiado(true); setTimeout(() => setCopiado(false), 2000) }}
            className="absolute top-3 -left-3 opacity-0 group-hover:opacity-100 bg-white border border-[#e9e9e7] rounded-md p-1 transition-all hover:border-[#d3d3d0]"
          >
            {copiado ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#37a169" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9b9a97" strokeWidth="2" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
            )}
          </button>

          <div className="text-[15px] leading-[1.75] text-[#37352f]"
               style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
            <RichResponse texto={mensaje.contenido} />
          </div>

          {empresaId && hasDocumentKeywords(mensaje.contenido) && (
            <div className="mt-3">
              <DocumentButton contenido={mensaje.contenido} empresaId={empresaId} agente={agente || 'Gerente General'} />
            </div>
          )}

          <p className="text-[11px] text-[#c4c4c0] mt-2">
            {new Date(mensaje.created_at).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      )}
    </div>
  )
}
