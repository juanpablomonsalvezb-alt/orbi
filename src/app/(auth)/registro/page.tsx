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
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) {
        setError(
          authError.message === 'User already registered'
            ? 'Este email ya está registrado'
            : authError.message
        )
        return
      }

      if (!authData.user) {
        setError('Error al crear la cuenta')
        return
      }

      const { error: empresaError } = await supabase
        .from('empresas')
        .insert({
          user_id: authData.user.id,
          nombre: nombreEmpresa,
          email,
          onboarding_completado: false,
        })

      if (empresaError) {
        console.error('Error creando empresa:', empresaError)
        setError('Error al registrar la empresa')
        return
      }

      router.push('/onboarding')
    } catch {
      setError('Error al registrarse')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div>
      <h2 className="text-[24px] font-light text-obsidian tracking-[-0.5px] mb-2">
        Crea tu cuenta
      </h2>
      <p className="text-[14px] text-ceniza mb-8">
        14 días gratis. Sin tarjeta de crédito.
      </p>

      {error && (
        <div className="bg-red-50 text-red-600 text-[13px] rounded-[8px] px-4 py-3 mb-6 border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleRegistro} className="space-y-5">
        <div>
          <label htmlFor="empresa" className="text-label mb-2 block">Nombre de tu empresa</label>
          <input
            id="empresa"
            type="text"
            value={nombreEmpresa}
            onChange={(e) => setNombreEmpresa(e.target.value)}
            required
            placeholder="Ej: Café Don Pedro"
            className="w-full rounded-[8px] border border-humo px-3.5 py-3 text-[14px]
                       placeholder:text-ceniza/60 bg-white
                       focus:outline-none focus:border-obsidian transition-colors"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-label mb-2 block">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="tu@empresa.com"
            className="w-full rounded-[8px] border border-humo px-3.5 py-3 text-[14px]
                       placeholder:text-ceniza/60 bg-white
                       focus:outline-none focus:border-obsidian transition-colors"
          />
        </div>

        <div>
          <label htmlFor="password" className="text-label mb-2 block">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            placeholder="Mínimo 6 caracteres"
            className="w-full rounded-[8px] border border-humo px-3.5 py-3 text-[14px]
                       placeholder:text-ceniza/60 bg-white
                       focus:outline-none focus:border-obsidian transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={cargando}
          className="w-full rounded-[8px] bg-obsidian px-5 py-3 text-white text-[14px] font-medium
                     hover:bg-grafito transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {cargando ? 'Creando cuenta...' : 'Comenzar gratis'}
        </button>
      </form>

      <p className="text-[11px] text-ceniza/60 text-center mt-4 leading-[1.5]">
        Al registrarte aceptas los términos de servicio y la política de privacidad.
      </p>

      <div className="mt-8 pt-6 border-t border-humo/30">
        <p className="text-[13px] text-ceniza text-center">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-señal hover:underline font-medium">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
