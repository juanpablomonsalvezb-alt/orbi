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
        .from('empresas')
        .insert({ user_id: authData.user.id, nombre: nombreEmpresa, email, onboarding_completado: false })

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
      <h2 className="text-[28px] font-light text-obsidian tracking-[-0.8px] leading-[1.1]">
        Crea tu
        <br />
        cuenta
      </h2>
      <p className="t-small text-ceniza mt-3 mb-10">
        14 días gratis. Sin tarjeta de crédito.
      </p>

      {error && (
        <div className="rounded-[8px] bg-red-50 border border-red-100 px-4 py-3 mb-6">
          <p className="t-small text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleRegistro} className="space-y-5">
        <div>
          <label className="t-micro text-ceniza mb-2.5 block">Empresa</label>
          <input
            type="text"
            value={nombreEmpresa}
            onChange={(e) => setNombreEmpresa(e.target.value)}
            required
            placeholder="Ej: Café Don Pedro"
            className="w-full rounded-[8px] border border-humo bg-white px-4 py-3 text-[14px] text-obsidian
                       placeholder:text-ceniza/50 focus:outline-none focus:border-obsidian transition-colors"
          />
        </div>

        <div>
          <label className="t-micro text-ceniza mb-2.5 block">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="tu@empresa.com"
            className="w-full rounded-[8px] border border-humo bg-white px-4 py-3 text-[14px] text-obsidian
                       placeholder:text-ceniza/50 focus:outline-none focus:border-obsidian transition-colors"
          />
        </div>

        <div>
          <label className="t-micro text-ceniza mb-2.5 block">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            placeholder="Mínimo 6 caracteres"
            className="w-full rounded-[8px] border border-humo bg-white px-4 py-3 text-[14px] text-obsidian
                       placeholder:text-ceniza/50 focus:outline-none focus:border-obsidian transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={cargando}
          className="w-full rounded-[8px] bg-obsidian text-white px-5 py-3 text-[14px] font-medium
                     hover:bg-grafito transition-all duration-300 disabled:opacity-40"
        >
          {cargando ? 'Creando cuenta...' : 'Comenzar gratis'}
        </button>
      </form>

      <p className="text-[11px] text-ceniza/40 text-center mt-4 leading-[1.5]">
        Al registrarte aceptas los términos de servicio.
      </p>

      <div className="mt-10 pt-6 border-t border-humo/40">
        <p className="t-small text-ceniza text-center">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-señal hover:underline font-medium">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
