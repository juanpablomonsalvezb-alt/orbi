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
  rrhh: 'RH', inventario: 'INV', legal: 'LEG',
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

  return (
    <aside className="w-[240px] bg-[#fbfbfa] flex flex-col h-full border-r border-[#e9e9e7]">
      {/* Brand */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-[14px] font-semibold text-[#37352f] tracking-tight">orbbi</p>
      </div>

      {/* New conversation */}
      <div className="px-2 pb-2">
        <button
          onClick={() => { setMostrarAgentes(!mostrarAgentes); setAgenteSeleccionado(null) }}
          className="w-full text-left px-3 py-1.5 rounded-md text-[13px] text-[#9b9a97] hover:bg-[#efefef] transition-colors flex items-center gap-2"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
          Nueva conversación
        </button>

        {mostrarAgentes && !agenteSeleccionado && (
          <div className="mt-1 ml-2 border-l border-[#e9e9e7] pl-3 space-y-0.5">
            {AGENTES.map((a) => (
              <button key={a.tipo}
                onClick={() => setAgenteSeleccionado(a.tipo)}
                className="w-full text-left px-2 py-1.5 rounded-md text-[13px] text-[#37352f] hover:bg-[#efefef] transition-colors">
                {a.nombre}
              </button>
            ))}
          </div>
        )}

        {mostrarAgentes && agenteSeleccionado && (
          <div className="mt-1 ml-2 border-l border-[#e9e9e7] pl-3">
            <button onClick={() => setAgenteSeleccionado(null)} className="text-[11px] text-[#9b9a97] hover:text-[#37352f] px-2 py-1">← Volver</button>
            {ESTILOS.map((e) => (
              <button key={e.id}
                onClick={() => { onNuevaConversacion(agenteSeleccionado, e.id); setMostrarAgentes(false); setAgenteSeleccionado(null) }}
                className="w-full text-left px-2 py-2 rounded-md hover:bg-[#efefef] transition-colors">
                <p className="text-[13px] text-[#37352f]">{e.nombre}</p>
                <p className="text-[11px] text-[#9b9a97]">{e.paraQuien}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto px-2 py-1">
        {conversaciones.length === 0 && (
          <p className="text-[12px] text-[#c4c4c0] text-center mt-8 px-4">Sin conversaciones</p>
        )}

        {conversaciones.map((conv) => (
          <div key={conv.id} className="relative group">
            {editando === conv.id ? (
              <div className="px-2 py-1">
                <input autoFocus value={tituloEdit}
                  onChange={(e) => setTituloEdit(e.target.value)}
                  onBlur={() => { if (tituloEdit.trim()) onRenombrar?.(editando, tituloEdit.trim()); setEditando(null) }}
                  onKeyDown={(e) => { if (e.key === 'Enter') { if (tituloEdit.trim()) onRenombrar?.(editando!, tituloEdit.trim()); setEditando(null) } if (e.key === 'Escape') setEditando(null) }}
                  className="w-full bg-white border border-[#e9e9e7] rounded px-2 py-1 text-[13px] text-[#37352f] outline-none focus:border-[#d3d3d0]" />
              </div>
            ) : (
              <button
                onClick={() => router.push(`/chat/${conv.id}`)}
                className={`w-full text-left px-3 py-1.5 rounded-md transition-colors text-[13px] ${
                  conversacionActiva === conv.id
                    ? 'bg-[#efefef] text-[#37352f]'
                    : 'text-[#787774] hover:bg-[#efefef]/60'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className={`text-[9px] font-semibold tracking-wide px-1 py-0.5 rounded ${
                    conversacionActiva === conv.id ? 'bg-clay/10 text-clay' : 'text-[#c4c4c0]'
                  }`}>
                    {AGENTE_LABELS[conv.agente_tipo] || 'GM'}
                  </span>
                  <span className="truncate">{conv.titulo}</span>
                </div>
              </button>
            )}

            {!editando && (
              <button onClick={(e) => { e.stopPropagation(); setMenuAbierto(menuAbierto === conv.id ? null : conv.id) }}
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-[#c4c4c0] hover:text-[#787774] p-1 rounded">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" /></svg>
              </button>
            )}

            {menuAbierto === conv.id && (
              <div className="absolute right-1 top-7 z-50 bg-white border border-[#e9e9e7] rounded-lg shadow-lg py-1 min-w-[120px]">
                <button onClick={() => { setEditando(conv.id); setTituloEdit(conv.titulo); setMenuAbierto(null) }}
                  className="w-full text-left px-3 py-1.5 text-[12px] text-[#37352f] hover:bg-[#f7f6f3]">Renombrar</button>
                <button onClick={() => { onEliminar?.(conv.id); setMenuAbierto(null) }}
                  className="w-full text-left px-3 py-1.5 text-[12px] text-[#eb5757] hover:bg-[#fef2f2]">Eliminar</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-2 py-3 border-t border-[#e9e9e7] space-y-0.5">
        {[
          { href: '/dashboard', label: 'Panel', icon: '📊' },
          { href: '/tareas', label: 'Tareas', icon: '✓' },
          { href: '/equipo', label: 'Equipo', icon: '👥' },
          { href: '/exportar', label: 'Exportar datos', icon: '📁' },
          { href: '/referidos', label: 'Invitar amigos', icon: '🎁' },
        ].map(item => (
          <a key={item.href} href={item.href}
            className="flex items-center gap-2 text-[12px] text-[#9b9a97] hover:text-[#37352f] hover:bg-[#efefef] transition-colors px-3 py-1.5 rounded-md">
            <span className="text-[11px]">{item.icon}</span>{item.label}
          </a>
        ))}
      </div>
    </aside>
  )
}
