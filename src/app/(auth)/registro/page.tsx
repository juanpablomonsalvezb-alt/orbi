'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase-client'

export default function RegistroPage() {
  const router = useRouter()
  const [empresa, setEmpresa] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // 1. Create auth user
      console.log('Registrando usuario...')
      const { data, error: err } = await supabase.auth.signUp({ email, password })

      if (err) {
        console.error('Error auth:', err)
        setError(err.message === 'User already registered' ? 'Este email ya está registrado' : err.message)
        setLoading(false)
        return
      }

      if (!data.user) {
        setError('Error al crear la cuenta')
        setLoading(false)
        return
      }

      console.log('Usuario creado:', data.user.id)

      // 2. Create empresa via server API (bypasses RLS)
      console.log('Registrando empresa...')
      const regRes = await fetch('/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: data.user.id, nombre: empresa, email }),
      })

      if (!regRes.ok) {
        const regData = await regRes.json()
        console.error('Error empresa:', regData)
        setError(regData.error || 'Error al registrar la empresa')
        setLoading(false)
        return
      }

      console.log('Empresa registrada. Redirigiendo...')

      // 3. Send welcome email (fire and forget)
      fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'welcome', email, nombre: empresa }),
      }).catch(() => {})

      // 4. Redirect to onboarding
      router.push('/onboarding')
    } catch (err) {
      console.error('Error general:', err)
      setError('Error al registrarse. Intenta de nuevo.')
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-ink mb-1" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '24px', fontWeight: 400, letterSpacing: '-0.3px' }}>
        Crea tu cuenta
      </h2>
      <p className="text-sm text-muted mb-7">7 días gratis. Sin tarjeta.</p>

      {error && <div className="bg-accent-bg border border-accent/15 rounded-md px-3 py-2.5 mb-5"><p className="text-sm text-accent">{error}</p></div>}

      <form onSubmit={handleRegistro} className="space-y-4">
        <div>
          <label className="text-xs font-medium uppercase tracking-[0.1em] text-muted block mb-1.5">Empresa</label>
          <input type="text" value={empresa} onChange={(e) => setEmpresa(e.target.value)} required placeholder="Ej: Café Don Pedro"
            className="w-full border border-ink/[0.08] rounded-md px-3 py-2.5 text-sm text-ink bg-ivory placeholder:text-muted/50 focus:outline-none focus:border-ink/25 transition-colors" />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-[0.1em] text-muted block mb-1.5">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="tu@empresa.com"
            className="w-full border border-ink/[0.08] rounded-md px-3 py-2.5 text-sm text-ink bg-ivory placeholder:text-muted/50 focus:outline-none focus:border-ink/25 transition-colors" />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-[0.1em] text-muted block mb-1.5">Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} placeholder="Mínimo 6 caracteres"
            className="w-full border border-ink/[0.08] rounded-md px-3 py-2.5 text-sm text-ink bg-ivory placeholder:text-muted/50 focus:outline-none focus:border-ink/25 transition-colors" />
        </div>
        <button type="submit" disabled={loading}
          className="w-full bg-ink text-ivory rounded-md py-2.5 text-sm font-medium hover:bg-ink-mid transition-colors disabled:opacity-40">
          {loading ? 'Creando cuenta...' : 'Comenzar gratis'}
        </button>
      </form>

      <p className="text-[11px] text-muted/40 text-center mt-3">Al registrarte aceptas los <a href="/terminos" className="underline hover:text-muted">términos de servicio</a> y la <a href="/privacidad" className="underline hover:text-muted">política de privacidad</a>.</p>

      <div className="mt-7 pt-5 border-t border-ink/[0.06]">
        <p className="text-sm text-muted text-center">
          ¿Ya tienes cuenta? <Link href="/login" className="text-accent hover:underline font-medium">Inicia sesión</Link>
        </p>
      </div>
    </div>
  )
}
