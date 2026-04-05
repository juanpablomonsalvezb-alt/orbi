'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase-client'

export default function RecuperarPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/actualizar-password`,
      })
      if (err) { setError(err.message); return }
      setSent(true)
    } catch { setError('Error al enviar el correo. Intenta de nuevo.') } finally { setLoading(false) }
  }

  if (sent) {
    return (
      <div>
        <h2 className="text-ink mb-1" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '24px', fontWeight: 400, letterSpacing: '-0.3px' }}>
          Revisa tu correo
        </h2>
        <p className="text-sm text-muted mb-7 leading-relaxed">
          Si existe una cuenta con <strong className="text-ink">{email}</strong>, recibirás un enlace para restablecer tu contraseña en los próximos minutos.
        </p>
        <Link href="/login" className="text-sm text-accent hover:underline">← Volver al inicio de sesión</Link>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-ink mb-1" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '24px', fontWeight: 400, letterSpacing: '-0.3px' }}>
        Recupera tu contraseña
      </h2>
      <p className="text-sm text-muted mb-7">Ingresa tu email y te enviamos un enlace para restablecer tu contraseña.</p>

      {error && <div className="bg-accent-bg border border-accent/15 rounded-md px-3 py-2.5 mb-5"><p className="text-sm text-accent">{error}</p></div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-medium uppercase tracking-[0.1em] text-muted block mb-1.5">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="tu@empresa.com"
            className="w-full border border-ink/[0.08] rounded-md px-3 py-2.5 text-sm text-ink bg-ivory placeholder:text-muted/50 focus:outline-none focus:border-ink/25 transition-colors" />
        </div>
        <button type="submit" disabled={loading}
          className="w-full bg-ink text-ivory rounded-md py-2.5 text-sm font-medium hover:bg-ink-mid transition-colors disabled:opacity-40">
          {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
        </button>
      </form>

      <div className="mt-7 pt-5 border-t border-ink/[0.06]">
        <p className="text-sm text-muted text-center">
          <Link href="/login" className="text-accent hover:underline font-medium">← Volver al inicio de sesión</Link>
        </p>
      </div>
    </div>
  )
}
