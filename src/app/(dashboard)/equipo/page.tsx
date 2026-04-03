'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase-client'
import { authFetch } from '@/lib/auth-fetch'

interface Miembro {
  id: string
  email: string
  rol: string
  created_at: string
}

export default function EquipoPage() {
  const [miembros, setMiembros] = useState<Miembro[]>([])
  const [email, setEmail] = useState('')
  const [rol, setRol] = useState<'admin' | 'miembro'>('miembro')
  const [loading, setLoading] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [exito, setExito] = useState<string | null>(null)

  const cargarMiembros = async () => {
    try {
      const res = await authFetch('/api/equipo')
      if (!res.ok) throw new Error('Error cargando equipo')
      const data = await res.json()
      setMiembros(data.miembros || [])
    } catch {
      setError('No se pudo cargar el equipo')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargarMiembros()
  }, [])

  const invitar = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setExito(null)
    setEnviando(true)

    try {
      const res = await authFetch('/api/equipo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, rol }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Error invitando miembro')
      }

      setExito(`Invitación enviada a ${email}`)
      setEmail('')
      cargarMiembros()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error invitando miembro')
    } finally {
      setEnviando(false)
    }
  }

  const eliminar = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este miembro?')) return
    setError(null)

    try {
      const res = await authFetch(`/api/equipo/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Error eliminando miembro')
      cargarMiembros()
    } catch {
      setError('No se pudo eliminar el miembro')
    }
  }

  return (
    <div className="min-h-screen bg-obsidian text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-normal tracking-tight mb-1" style={{ fontFamily: 'Georgia, serif' }}>
          Equipo
        </h1>
        <p className="text-sm text-ceniza/60 mb-8">
          Administra los miembros de tu empresa en Orbbi.
        </p>

        {/* Invite form */}
        <form onSubmit={invitar} className="mb-10 p-5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
          <h2 className="text-sm font-medium text-white/80 mb-4">Invitar nuevo miembro</h2>
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="block text-[11px] text-ceniza/50 mb-1.5 uppercase tracking-wider">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@empresa.com"
                className="w-full bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-2.5 text-[13px] text-white
                           placeholder:text-ceniza/30 outline-none focus:border-señal/40 transition-colors"
              />
            </div>
            <div className="w-36">
              <label className="block text-[11px] text-ceniza/50 mb-1.5 uppercase tracking-wider">Rol</label>
              <select
                value={rol}
                onChange={(e) => setRol(e.target.value as 'admin' | 'miembro')}
                className="w-full bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-2.5 text-[13px] text-white
                           outline-none focus:border-señal/40 transition-colors appearance-none"
              >
                <option value="miembro">Miembro</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={enviando}
              className="px-5 py-2.5 bg-white text-obsidian text-[13px] font-medium rounded-lg
                         hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              {enviando ? 'Enviando...' : 'Invitar'}
            </button>
          </div>
        </form>

        {/* Messages */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[13px]">
            {error}
          </div>
        )}
        {exito && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-[13px]">
            {exito}
          </div>
        )}

        {/* Members list */}
        <div className="rounded-xl border border-white/[0.06] overflow-hidden">
          <div className="grid grid-cols-[1fr_100px_120px_60px] gap-4 px-5 py-3 bg-white/[0.02] border-b border-white/[0.06]">
            <span className="text-[11px] text-ceniza/50 uppercase tracking-wider">Email</span>
            <span className="text-[11px] text-ceniza/50 uppercase tracking-wider">Rol</span>
            <span className="text-[11px] text-ceniza/50 uppercase tracking-wider">Fecha</span>
            <span className="text-[11px] text-ceniza/50 uppercase tracking-wider"></span>
          </div>

          {loading ? (
            <div className="px-5 py-8 text-center text-[13px] text-ceniza/40">Cargando...</div>
          ) : miembros.length === 0 ? (
            <div className="px-5 py-8 text-center text-[13px] text-ceniza/40">
              No hay miembros en el equipo todavía.
            </div>
          ) : (
            miembros.map((m) => (
              <div
                key={m.id}
                className="grid grid-cols-[1fr_100px_120px_60px] gap-4 px-5 py-3.5 border-b border-white/[0.04] last:border-0
                           hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-[13px] text-white/80 truncate">{m.email}</span>
                <span className="text-[12px] text-ceniza/60 capitalize">{m.rol}</span>
                <span className="text-[12px] text-ceniza/40">
                  {new Date(m.created_at).toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
                <button
                  onClick={() => eliminar(m.id)}
                  className="text-[12px] text-red-400/60 hover:text-red-400 transition-colors text-right"
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>

        {/* Back link */}
        <div className="mt-8">
          <a href="/chat" className="text-[13px] text-señal hover:text-señal/80 transition-colors">
            &larr; Volver al chat
          </a>
        </div>
      </div>
    </div>
  )
}
