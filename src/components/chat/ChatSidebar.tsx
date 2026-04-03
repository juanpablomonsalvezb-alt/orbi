'use client'

import { useState } from 'react'
import { Conversacion } from '@/types/database'
import { AGENTES, TipoAgente, ESTILOS, EstiloComunicacion } from '@/lib/prompts'
import { useRouter } from 'next/navigation'

interface ChatSidebarProps {
  conversaciones: Conversacion[]
  conversacionActiva?: string
  onNuevaConversacion: (agenteTipo: TipoAgente, estilo?: EstiloComunicacion) => void
  onRenombrar?: (id: string, titulo: string) => void
  onEliminar?: (id: string) => void
}

const AGENTE_LABELS: Record<TipoAgente, string> = {
  general: 'GM', financiero: 'FIN', ventas: 'VEN', marketing: 'MKT',
  rrhh: 'RRHH', inventario: 'INV', legal: 'LEG',
}

export default function ChatSidebar({
  conversaciones, conversacionActiva, onNuevaConversacion, onRenombrar, onEliminar
}: ChatSidebarProps) {
  const router = useRouter()
  const [mostrarAgentes, setMostrarAgentes] = useState(false)
  const [agenteSeleccionado, setAgenteSeleccionado] = useState<TipoAgente | null>(null)
  const [menuAbierto, setMenuAbierto] = useState<string | null>(null)
  const [editando, setEditando] = useState<string | null>(null)
  const [tituloEdit, setTituloEdit] = useState('')

  const iniciarEdicion = (conv: Conversacion) => {
    setEditando(conv.id)
    setTituloEdit(conv.titulo)
    setMenuAbierto(null)
  }

  const guardarEdicion = () => {
    if (editando && tituloEdit.trim()) {
      onRenombrar?.(editando, tituloEdit.trim())
    }
    setEditando(null)
  }

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
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5"
            className={`transition-transform duration-200 ${mostrarAgentes ? 'rotate-180' : ''}`}>
            <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {mostrarAgentes && !agenteSeleccionado && (
          <div className="mt-2 space-y-1">
            {AGENTES.map((a) => (
              <button key={a.tipo}
                onClick={() => setAgenteSeleccionado(a.tipo)}
                className="w-full text-left px-3 py-2 rounded-[6px] hover:bg-white/[0.06] transition-colors group">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] text-white/80 group-hover:text-white">{a.nombre}</p>
                  <span className="text-[10px] text-señal font-medium">{a.precio === 'Incluido' ? '' : a.precio}</span>
                </div>
                <p className="text-[11px] text-ceniza/60 mt-0.5">{a.rol}</p>
              </button>
            ))}
          </div>
        )}

        {/* Estilo selector — appears after agent selection */}
        {mostrarAgentes && agenteSeleccionado && (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-2 px-1">
              <p className="text-[11px] text-ceniza/60">Elige un estilo</p>
              <button onClick={() => setAgenteSeleccionado(null)} className="text-[10px] text-ceniza/40 hover:text-white">← Volver</button>
            </div>
            <div className="space-y-1">
              {ESTILOS.map((e) => (
                <button key={e.id}
                  onClick={() => {
                    onNuevaConversacion(agenteSeleccionado, e.id)
                    setMostrarAgentes(false)
                    setAgenteSeleccionado(null)
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-[6px] hover:bg-white/[0.06] transition-colors group">
                  <p className="text-[13px] text-white/80 group-hover:text-white font-medium">{e.nombre}</p>
                  <p className="text-[11px] text-ceniza/60 mt-0.5">{e.descripcion}</p>
                  <p className="text-[10px] text-ceniza/40 mt-0.5">{e.paraQuien}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto p-2">
        {conversaciones.length === 0 && (
          <p className="text-[12px] text-ceniza/40 text-center mt-8 px-4">Sin conversaciones aún</p>
        )}

        {conversaciones.map((conv) => (
          <div key={conv.id} className="relative group mb-0.5">
            {editando === conv.id ? (
              <div className="px-3 py-2.5">
                <input
                  autoFocus
                  value={tituloEdit}
                  onChange={(e) => setTituloEdit(e.target.value)}
                  onBlur={guardarEdicion}
                  onKeyDown={(e) => { if (e.key === 'Enter') guardarEdicion(); if (e.key === 'Escape') setEditando(null) }}
                  className="w-full bg-white/[0.08] border border-white/[0.12] rounded px-2 py-1 text-[13px] text-white outline-none"
                />
              </div>
            ) : (
              <button
                onClick={() => router.push(`/chat/${conv.id}`)}
                className={`w-full text-left px-3 py-2.5 rounded-[6px] transition-colors ${
                  conversacionActiva === conv.id
                    ? 'bg-white/[0.08] text-white'
                    : 'text-white/60 hover:bg-white/[0.04] hover:text-white/80'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded shrink-0 ${
                    conversacionActiva === conv.id ? 'bg-señal/20 text-señal' : 'bg-white/[0.06] text-ceniza/60'
                  }`}>
                    {AGENTE_LABELS[conv.agente_tipo] || 'GM'}
                  </span>
                  <p className="text-[13px] font-normal truncate flex-1">{conv.titulo}</p>
                </div>
                <p className="text-[10px] text-ceniza/40 mt-1 ml-7">
                  {new Date(conv.created_at).toLocaleDateString('es-CL', { day: 'numeric', month: 'short' })}
                </p>
              </button>
            )}

            {/* Context menu trigger */}
            {!editando && (
              <button
                onClick={(e) => { e.stopPropagation(); setMenuAbierto(menuAbierto === conv.id ? null : conv.id) }}
                className="absolute top-2.5 right-2 opacity-0 group-hover:opacity-100 text-ceniza/40 hover:text-white transition-all p-1"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
                </svg>
              </button>
            )}

            {/* Context menu */}
            {menuAbierto === conv.id && (
              <div className="absolute right-2 top-8 z-50 bg-grafito border border-white/[0.1] rounded-md shadow-lg py-1 min-w-[140px]">
                <button
                  onClick={() => iniciarEdicion(conv)}
                  className="w-full text-left px-3 py-1.5 text-[12px] text-white/70 hover:bg-white/[0.06] hover:text-white"
                >
                  Renombrar
                </button>
                <button
                  onClick={() => { onEliminar?.(conv.id); setMenuAbierto(null) }}
                  className="w-full text-left px-3 py-1.5 text-[12px] text-red-400/70 hover:bg-red-500/10 hover:text-red-400"
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer with dashboard + upgrade link */}
      <div className="p-4 border-t border-white/[0.06] space-y-2">
        <a
          href="/dashboard"
          className="flex items-center justify-center gap-1.5 text-[11px] text-white/50 hover:text-white/80 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="12" width="4" height="9" rx="1" />
            <rect x="10" y="7" width="4" height="14" rx="1" />
            <rect x="17" y="3" width="4" height="18" rx="1" />
          </svg>
          Panel de control
        </a>
        <a
          href="/tareas"
          className="flex items-center justify-center gap-1.5 text-[11px] text-white/50 hover:text-white/80 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
          </svg>
          Tareas
        </a>
        <a
          href="/equipo"
          className="flex items-center justify-center gap-1.5 text-[11px] text-white/50 hover:text-white/80 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          Equipo
        </a>
        <a href="/#precios" className="block text-center text-[11px] text-señal hover:text-señal/80 transition-colors">
          Actualizar plan
        </a>
        <p className="text-[10px] text-ceniza/30 text-center tracking-[0.05em]">ORBBI v1.0</p>
      </div>
    </aside>
  )
}
