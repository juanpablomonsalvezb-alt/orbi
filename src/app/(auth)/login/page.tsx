'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase-client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password })
      if (err) { setError(err.message === 'Invalid login credentials' ? 'Email o contraseña incorrectos' : err.message); return }
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: empresa } = await supabase.from('empresas').select('onboarding_completado').eq('user_id', user.id).single()
      router.push(!empresa || !empresa.onboarding_completado ? '/onboarding' : '/chat')
    } catch { setError('Error al iniciar sesión') } finally { setLoading(false) }
  }

  return (
    <div>
      <h2 className="text-ink mb-1" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '24px', fontWeight: 400, letterSpacing: '-0.3px' }}>
        Bienvenido de vuelta
      </h2>
      <p className="text-sm text-muted mb-7">Ingresa para hablar con tu agente.</p>

      {error && <div className="bg-accent-bg border border-accent/15 rounded-md px-3 py-2.5 mb-5"><p className="text-sm text-accent">{error}</p></div>}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="text-xs font-medium uppercase tracking-[0.1em] text-muted block mb-1.5">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="tu@empresa.com"
            className="w-full border border-ink/[0.08] rounded-md px-3 py-2.5 text-sm text-ink bg-ivory placeholder:text-muted/50 focus:outline-none focus:border-ink/25 transition-colors" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium uppercase tracking-[0.1em] text-muted">Contraseña</label>
            <Link href="/recuperar-password" className="text-xs text-muted hover:text-accent transition-colors">¿Olvidaste tu contraseña?</Link>
          </div>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••"
            className="w-full border border-ink/[0.08] rounded-md px-3 py-2.5 text-sm text-ink bg-ivory placeholder:text-muted/50 focus:outline-none focus:border-ink/25 transition-colors" />
        </div>
        <button type="submit" disabled={loading}
          className="w-full bg-ink text-ivory rounded-md py-2.5 text-sm font-medium hover:bg-ink-mid transition-colors disabled:opacity-40">
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>

      <div className="mt-7 pt-5 border-t border-ink/[0.06]">
        <p className="text-sm text-muted text-center">
          ¿No tienes cuenta? <Link href="/registro" className="text-accent hover:underline font-medium">Crea una gratis</Link>
        </p>
      </div>
    </div>
  )
}
