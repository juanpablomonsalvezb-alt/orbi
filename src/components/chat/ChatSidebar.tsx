'use client'

import { useState } from 'react'
import { Conversacion } from '@/types/database'
import { AGENTES, TipoAgente } from '@/lib/prompts'
import { useRouter } from 'next/navigation'

interface ChatSidebarProps {
  conversaciones: Conversacion[]
  conversacionActiva?: string
  onNuevaConversacion: (agenteTipo: TipoAgente) => void
}

// Nombres cortos para el badge del sidebar
const AGENTE_LABELS: Record<TipoAgente, string> = {
  general: 'GM',
  financiero: 'FIN',
  ventas: 'VEN',
  marketing: 'MKT',
  rrhh: 'RRHH',
  inventario: 'INV',
  legal: 'LEG',
}

export default function ChatSidebar({
  conversaciones,
  conversacionActiva,
  onNuevaConversacion
}: ChatSidebarProps) {
  const router = useRouter()
  const [mostrarAgentes, setMostrarAgentes] = useState(false)

  return (
    <aside className="w-64 border-r border-white/[0.06] bg-grafito flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-white/[0.06]">
        <button
          onClick={() => setMostrarAgentes(!mostrarAgentes)}
          className="w-full rounded-[8px] bg-white/[0.06] border border-white/[0.06] px-4 py-2.5 text-white text-[13px] font-medium
                     hover:bg-white/[0.1] transition-colors text-left flex items-center justify-between"
        >
          <span>+ Nueva conversación</span>
          <svg
            viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5"
            className={`transition-transform duration-200 ${mostrarAgentes ? 'rotate-180' : ''}`}
          >
            <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Selector de agente */}
        {mostrarAgentes && (
          <div className="mt-2 space-y-1">
            {AGENTES.map((a) => (
              <button
                key={a.tipo}
                onClick={() => {
                  onNuevaConversacion(a.tipo)
                  setMostrarAgentes(false)
                }}
                className="w-full text-left px-3 py-2 rounded-[6px] hover:bg-white/[0.06] transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[13px] text-white/80 group-hover:text-white">{a.nombre}</p>
                  <span className="text-[10px] text-señal font-medium">{a.precio === 'Incluido' ? '' : a.precio}</span>
                </div>
                <p className="text-[11px] text-ceniza/60 mt-0.5">{a.rol}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lista de conversaciones */}
      <div className="flex-1 overflow-y-auto p-2">
        {conversaciones.length === 0 && (
          <p className="text-[12px] text-ceniza/40 text-center mt-8 px-4">
            Sin conversaciones aún
          </p>
        )}

        {conversaciones.map((conv) => (
          <button
            key={conv.id}
            onClick={() => router.push(`/chat/${conv.id}`)}
            className={`w-full text-left px-3 py-2.5 rounded-[6px] mb-0.5 transition-colors ${
              conversacionActiva === conv.id
                ? 'bg-white/[0.08] text-white'
                : 'text-white/60 hover:bg-white/[0.04] hover:text-white/80'
            }`}
          >
            <div className="flex items-center space-x-2">
              <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${
                conversacionActiva === conv.id ? 'bg-señal/20 text-señal' : 'bg-white/[0.06] text-ceniza/60'
              }`}>
                {AGENTE_LABELS[conv.agente_tipo] || 'GM'}
              </span>
              <p className="text-[13px] font-normal truncate flex-1">
                {conv.titulo}
              </p>
            </div>
            <p className="text-[10px] text-ceniza/40 mt-1 ml-7">
              {new Date(conv.created_at).toLocaleDateString('es-CL', {
                day: 'numeric',
                month: 'short'
              })}
            </p>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/[0.06]">
        <p className="text-[10px] text-ceniza/30 text-center tracking-[0.05em]">
          ORBBI v1.0
        </p>
      </div>
    </aside>
  )
}
