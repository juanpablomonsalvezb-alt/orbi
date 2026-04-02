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
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setError(
          authError.message === 'Invalid login credentials'
            ? 'Email o contraseña incorrectos'
            : authError.message
        )
        return
      }

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: empresa } = await supabase
        .from('empresas')
        .select('onboarding_completado')
        .eq('user_id', user.id)
        .single()

      if (!empresa || !empresa.onboarding_completado) {
        router.push('/onboarding')
      } else {
        router.push('/chat')
      }
    } catch {
      setError('Error al iniciar sesión')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div>
      <h2 className="text-[24px] font-light text-obsidian tracking-[-0.5px] mb-2">
        Bienvenido de vuelta
      </h2>
      <p className="text-[14px] text-ceniza mb-8">
        Ingresa a tu cuenta para hablar con tu agente.
      </p>

      {error && (
        <div className="bg-red-50 text-red-600 text-[13px] rounded-[8px] px-4 py-3 mb-6 border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
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
            placeholder="••••••••"
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
          {cargando ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-humo/30">
        <p className="text-[13px] text-ceniza text-center">
          ¿No tienes cuenta?{' '}
          <Link href="/registro" className="text-señal hover:underline font-medium">
            Crea una gratis
          </Link>
        </p>
      </div>
    </div>
  )
}
