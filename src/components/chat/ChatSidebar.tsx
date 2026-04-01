'use client'

import { Conversacion } from '@/types/database'
import { useRouter } from 'next/navigation'

interface ChatSidebarProps {
  conversaciones: Conversacion[]
  conversacionActiva?: string
  onNuevaConversacion: () => void
}

// Sidebar con lista de conversaciones — fondo marfil
export default function ChatSidebar({
  conversaciones,
  conversacionActiva,
  onNuevaConversacion
}: ChatSidebarProps) {
  const router = useRouter()

  return (
    <aside className="w-60 border-r border-humo/50 bg-marfil flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-humo/50">
        <button
          onClick={onNuevaConversacion}
          className="w-full rounded-[8px] bg-obsidian px-4 py-2.5 text-white text-[13px] font-medium
                     hover:bg-grafito transition-colors"
        >
          + Nueva conversación
        </button>
      </div>

      {/* Lista */}
      <div className="flex-1 overflow-y-auto p-2">
        {conversaciones.length === 0 && (
          <p className="text-caption text-center mt-8 px-4">
            Sin conversaciones aún
          </p>
        )}

        {conversaciones.map((conv) => (
          <button
            key={conv.id}
            onClick={() => router.push(`/chat/${conv.id}`)}
            className={`w-full text-left px-4 py-2.5 rounded-[6px] mb-0.5 transition-colors ${
              conversacionActiva === conv.id
                ? 'bg-obsidian text-white'
                : 'text-obsidian hover:bg-humo/30'
            }`}
          >
            <p className="text-[14px] font-normal truncate">
              {conv.titulo}
            </p>
            <p className={`text-[11px] mt-0.5 ${
              conversacionActiva === conv.id ? 'text-ceniza' : 'text-ceniza'
            }`}>
              {new Date(conv.created_at).toLocaleDateString('es-CL', {
                day: 'numeric',
                month: 'short'
              })}
            </p>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-humo/50">
        <p className="text-[10px] text-ceniza text-center tracking-[0.05em]">
          ORBBI v1.0
        </p>
      </div>
    </aside>
  )
}
