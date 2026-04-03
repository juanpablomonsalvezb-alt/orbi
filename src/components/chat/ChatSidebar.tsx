'use client'

import { useState } from 'react'
import { Conversacion } from '@/types/database'
import { AGENTES, TipoAgente, ESTILOS, EstiloComunicacion } from '@/lib/prompts'
import { useRouter } from 'next/navigation'
import OrbiLogo from '@/components/ui/OrbiLogo'

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
    <aside className="w-[272px] bg-ink flex flex-col h-full">
      {/* Brand header */}
      <div className="px-5 pt-5 pb-4">
        <OrbiLogo size={28} showText={true} color="light" />
      </div>

      {/* New conversation button */}
      <div className="px-3 pb-3">
        <button
          onClick={() => { setMostrarAgentes(!mostrarAgentes); setAgenteSeleccionado(null) }}
          className="w-full rounded-lg bg-ivory/[0.08] px-4 py-2.5 text-[13px] font-medium text-ivory/80
                     hover:bg-ivory/[0.12] transition-all text-left flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
            Nueva conversación
          </div>
          <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5"
            className={`transition-transform duration-200 opacity-40 ${mostrarAgentes ? 'rotate-180' : ''}`}>
            <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Agent selector */}
        {mostrarAgentes && !agenteSeleccionado && (
          <div className="mt-2 bg-ink-mid/50 rounded-lg p-1">
            {AGENTES.map((a) => (
              <button key={a.tipo}
                onClick={() => setAgenteSeleccionado(a.tipo)}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-ivory/[0.06] transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-ivory/70 hover:text-ivory">{a.nombre}</span>
                  {a.precio !== 'Incluido' && <span className="text-[10px] text-clay/80">{a.precio}</span>}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Style selector */}
        {mostrarAgentes && agenteSeleccionado && (
          <div className="mt-2 bg-ink-mid/50 rounded-lg p-1">
            <button onClick={() => setAgenteSeleccionado(null)} className="text-[10px] text-ivory/30 hover:text-ivory/60 px-3 py-1 mb-1">← Volver</button>
            {ESTILOS.map((e) => (
              <button key={e.id}
                onClick={() => { onNuevaConversacion(agenteSeleccionado, e.id); setMostrarAgentes(false); setAgenteSeleccionado(null) }}
                className="w-full text-left px-3 py-2.5 rounded-md hover:bg-ivory/[0.06] transition-colors">
                <p className="text-[13px] text-ivory/80 font-medium">{e.nombre}</p>
                <p className="text-[11px] text-ivory/30 mt-0.5">{e.paraQuien}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="mx-5 h-px bg-ivory/[0.06]" />

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
        {conversaciones.length === 0 && (
          <p className="text-[12px] text-ivory/20 text-center mt-12 px-4" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
            Tu primera conversación aparecerá aquí
          </p>
        )}

        {conversaciones.map((conv) => (
          <div key={conv.id} className="relative group">
            {editando === conv.id ? (
              <div className="px-2 py-2">
                <input autoFocus value={tituloEdit}
                  onChange={(e) => setTituloEdit(e.target.value)}
                  onBlur={() => { if (tituloEdit.trim()) onRenombrar?.(editando, tituloEdit.trim()); setEditando(null) }}
                  onKeyDown={(e) => { if (e.key === 'Enter') { if (tituloEdit.trim()) onRenombrar?.(editando!, tituloEdit.trim()); setEditando(null) } if (e.key === 'Escape') setEditando(null) }}
                  className="w-full bg-ivory/[0.08] border border-ivory/[0.12] rounded px-2.5 py-1.5 text-[13px] text-ivory outline-none" />
              </div>
            ) : (
              <button
                onClick={() => router.push(`/chat/${conv.id}`)}
                className={`w-full text-left px-3 py-2.5 rounded-lg transition-all ${
                  conversacionActiva === conv.id
                    ? 'bg-ivory/[0.1] text-ivory'
                    : 'text-ivory/50 hover:bg-ivory/[0.04] hover:text-ivory/70'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-semibold tracking-wide px-1.5 py-0.5 rounded ${
                    conversacionActiva === conv.id ? 'bg-clay/20 text-clay' : 'bg-ivory/[0.06] text-ivory/30'
                  }`}>
                    {AGENTE_LABELS[conv.agente_tipo] || 'GM'}
                  </span>
                  <span className="text-[13px] truncate flex-1">{conv.titulo}</span>
                </div>
              </button>
            )}

            {!editando && (
              <button onClick={(e) => { e.stopPropagation(); setMenuAbierto(menuAbierto === conv.id ? null : conv.id) }}
                className="absolute top-2 right-1.5 opacity-0 group-hover:opacity-100 text-ivory/20 hover:text-ivory/60 transition-all p-1 rounded">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" /></svg>
              </button>
            )}

            {menuAbierto === conv.id && (
              <div className="absolute right-2 top-8 z-50 bg-ink-mid border border-ivory/[0.08] rounded-lg shadow-xl py-1 min-w-[140px]">
                <button onClick={() => { setEditando(conv.id); setTituloEdit(conv.titulo); setMenuAbierto(null) }}
                  className="w-full text-left px-3 py-1.5 text-[12px] text-ivory/60 hover:bg-ivory/[0.06] hover:text-ivory">Renombrar</button>
                <button onClick={() => { onEliminar?.(conv.id); setMenuAbierto(null) }}
                  className="w-full text-left px-3 py-1.5 text-[12px] text-red-400/70 hover:bg-red-500/10 hover:text-red-400">Eliminar</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer nav */}
      <div className="px-4 py-4 border-t border-ivory/[0.06] space-y-0.5">
        {[
          { href: '/dashboard', label: 'Panel', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="12" width="4" height="9" rx="1" /><rect x="10" y="7" width="4" height="14" rx="1" /><rect x="17" y="3" width="4" height="18" rx="1" /></svg> },
          { href: '/tareas', label: 'Tareas', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg> },
          { href: '/equipo', label: 'Equipo', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /></svg> },
        ].map(item => (
          <a key={item.href} href={item.href} className="flex items-center gap-2 text-[12px] text-ivory/30 hover:text-ivory/60 transition-colors px-2 py-1.5 rounded-md hover:bg-ivory/[0.04]">
            {item.icon}{item.label}
          </a>
        ))}
        <a href="/#precios" className="block text-center text-[11px] text-clay/60 hover:text-clay transition-colors py-2 mt-1">
          Actualizar plan
        </a>
      </div>
    </aside>
  )
}
