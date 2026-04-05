'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'

export default function ActualizarPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirm) { setError('Las contraseñas no coinciden'); return }
    if (password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres'); return }
    setLoading(true)
    try {
      const { error: err } = await supabase.auth.updateUser({ password })
      if (err) { setError(err.message); return }
      router.push('/chat')
    } catch { setError('Error al actualizar la contraseña. Intenta de nuevo.') } finally { setLoading(false) }
  }

  return (
    <div>
      <h2 className="text-ink mb-1" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '24px', fontWeight: 400, letterSpacing: '-0.3px' }}>
        Nueva contraseña
      </h2>
      <p className="text-sm text-muted mb-7">Elige una contraseña segura para tu cuenta.</p>

      {error && <div className="bg-accent-bg border border-accent/15 rounded-md px-3 py-2.5 mb-5"><p className="text-sm text-accent">{error}</p></div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-medium uppercase tracking-[0.1em] text-muted block mb-1.5">Nueva contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} placeholder="Mínimo 6 caracteres"
            className="w-full border border-ink/[0.08] rounded-md px-3 py-2.5 text-sm text-ink bg-ivory placeholder:text-muted/50 focus:outline-none focus:border-ink/25 transition-colors" />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-[0.1em] text-muted block mb-1.5">Confirmar contraseña</label>
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required minLength={6} placeholder="Repite la contraseña"
            className="w-full border border-ink/[0.08] rounded-md px-3 py-2.5 text-sm text-ink bg-ivory placeholder:text-muted/50 focus:outline-none focus:border-ink/25 transition-colors" />
        </div>
        <button type="submit" disabled={loading}
          className="w-full bg-ink text-ivory rounded-md py-2.5 text-sm font-medium hover:bg-ink-mid transition-colors disabled:opacity-40">
          {loading ? 'Actualizando...' : 'Actualizar contraseña'}
        </button>
      </form>
    </div>
  )
}
