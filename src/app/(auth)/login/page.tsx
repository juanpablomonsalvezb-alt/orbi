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
  const [cargando, setCargando] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setCargando(true)

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
      if (authError) {
        setError(authError.message === 'Invalid login credentials' ? 'Email o contraseña incorrectos' : authError.message)
        return
      }
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: empresa } = await supabase
        .from('empresas').select('onboarding_completado').eq('user_id', user.id).single()
      router.push(!empresa || !empresa.onboarding_completado ? '/onboarding' : '/chat')
    } catch {
      setError('Error al iniciar sesión')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div>
      <h2 className="tracking-[-0.5px] leading-[1.1] text-ink" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '28px', fontWeight: 400 }}>
        Bienvenido de vuelta
      </h2>
      <p className="t-small text-muted mt-2 mb-8">
        Ingresa para hablar con tu agente.
      </p>

      {error && (
        <div className="rounded-[4px] bg-accent-bg border border-accent/20 px-4 py-3 mb-6">
          <p className="text-[13px] text-accent">{error}</p>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="t-detail mb-2 block">Email</label>
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
            placeholder="tu@empresa.com"
            className="w-full rounded-[4px] border border-border-light bg-ivory px-3.5 py-3 text-[14px] text-ink
                       placeholder:text-muted/60 focus:outline-none focus:border-ink transition-colors duration-200"
          />
        </div>
        <div>
          <label className="t-detail mb-2 block">Contraseña</label>
          <input
            type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
            placeholder="••••••••"
            className="w-full rounded-[4px] border border-border-light bg-ivory px-3.5 py-3 text-[14px] text-ink
                       placeholder:text-muted/60 focus:outline-none focus:border-ink transition-colors duration-200"
          />
        </div>
        <button type="submit" disabled={cargando}
          className="w-full rounded-[4px] bg-ink text-ivory px-5 py-3 text-[14px] font-medium
                     hover:bg-ink-mid transition-colors duration-200 disabled:opacity-40">
          {cargando ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-border-light">
        <p className="t-small text-muted text-center">
          ¿No tienes cuenta?{' '}
          <Link href="/registro" className="text-accent hover:underline font-medium">Crea una gratis</Link>
        </p>
      </div>
    </div>
  )
}
