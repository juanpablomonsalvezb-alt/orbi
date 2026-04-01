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
    <form onSubmit={handleRegistro} className="bg-white border border-humo/50 rounded-[12px] px-6 py-5">
      <h2 className="text-heading text-obsidian mb-6">Crear cuenta</h2>

      {error && (
        <div className="bg-red-50 text-red-600 text-[13px] rounded-[8px] px-4 py-3 mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="empresa" className="text-label mb-2 block">Nombre de tu empresa</label>
          <input
            id="empresa"
            type="text"
            value={nombreEmpresa}
            onChange={(e) => setNombreEmpresa(e.target.value)}
            required
            placeholder="Ej: Café Don Pedro"
            className="w-full rounded-[8px] border border-humo px-3.5 py-2.5 text-[14px]
                       placeholder:text-ceniza bg-transparent
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
            className="w-full rounded-[8px] border border-humo px-3.5 py-2.5 text-[14px]
                       placeholder:text-ceniza bg-transparent
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
            className="w-full rounded-[8px] border border-humo px-3.5 py-2.5 text-[14px]
                       placeholder:text-ceniza bg-transparent
                       focus:outline-none focus:border-obsidian transition-colors"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={cargando}
        className="w-full mt-6 rounded-[8px] bg-obsidian px-5 py-2.5 text-white text-[14px] font-medium
                   hover:bg-grafito transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {cargando ? 'Creando cuenta...' : 'Crear cuenta'}
      </button>

      <p className="text-[13px] text-ceniza text-center mt-5">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="text-señal hover:underline font-medium">
          Inicia sesión
        </Link>
      </p>
    </form>
  )
}
