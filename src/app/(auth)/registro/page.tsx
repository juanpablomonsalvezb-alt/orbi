'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase-client'

export default function RegistroPage() {
  const router = useRouter()
  const [nombreEmpresa, setNombreEmpresa] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setCargando(true)

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({ email, password })
      if (authError) {
        setError(authError.message === 'User already registered' ? 'Este email ya está registrado' : authError.message)
        return
      }
      if (!authData.user) { setError('Error al crear la cuenta'); return }
      const { error: empresaError } = await supabase
        .from('empresas').insert({ user_id: authData.user.id, nombre: nombreEmpresa, email, onboarding_completado: false })
      if (empresaError) { setError('Error al registrar la empresa'); return }
      router.push('/onboarding')
    } catch {
      setError('Error al registrarse')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div>
      <h2 className="tracking-[-0.5px] leading-[1.1] text-ink" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '28px', fontWeight: 400 }}>
        Crea tu cuenta
      </h2>
      <p className="t-small text-muted mt-2 mb-8">
        14 días gratis. Sin tarjeta de crédito.
      </p>

      {error && (
        <div className="rounded-[4px] bg-accent-bg border border-accent/20 px-4 py-3 mb-6">
          <p className="text-[13px] text-accent">{error}</p>
        </div>
      )}

      <form onSubmit={handleRegistro} className="space-y-5">
        <div>
          <label className="t-detail mb-2 block">Nombre de tu empresa</label>
          <input type="text" value={nombreEmpresa} onChange={(e) => setNombreEmpresa(e.target.value)} required
            placeholder="Ej: Café Don Pedro"
            className="w-full rounded-[4px] border border-border-light bg-ivory px-3.5 py-3 text-[14px] text-ink
                       placeholder:text-muted/60 focus:outline-none focus:border-ink transition-colors duration-200" />
        </div>
        <div>
          <label className="t-detail mb-2 block">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
            placeholder="tu@empresa.com"
            className="w-full rounded-[4px] border border-border-light bg-ivory px-3.5 py-3 text-[14px] text-ink
                       placeholder:text-muted/60 focus:outline-none focus:border-ink transition-colors duration-200" />
        </div>
        <div>
          <label className="t-detail mb-2 block">Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6}
            placeholder="Mínimo 6 caracteres"
            className="w-full rounded-[4px] border border-border-light bg-ivory px-3.5 py-3 text-[14px] text-ink
                       placeholder:text-muted/60 focus:outline-none focus:border-ink transition-colors duration-200" />
        </div>
        <button type="submit" disabled={cargando}
          className="w-full rounded-[4px] bg-ink text-ivory px-5 py-3 text-[14px] font-medium
                     hover:bg-ink-mid transition-colors duration-200 disabled:opacity-40">
          {cargando ? 'Creando cuenta...' : 'Comenzar gratis'}
        </button>
      </form>

      <p className="text-[11px] text-muted/50 text-center mt-4">
        Al registrarte aceptas los términos de servicio.
      </p>

      <div className="mt-8 pt-6 border-t border-border-light">
        <p className="t-small text-muted text-center">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-accent hover:underline font-medium">Inicia sesión</Link>
        </p>
      </div>
    </div>
  )
}
