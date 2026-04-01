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
    <form onSubmit={handleLogin} className="bg-white border border-humo/50 rounded-[12px] px-6 py-5">
      <h2 className="text-heading text-obsidian mb-6">Iniciar sesión</h2>

      {error && (
        <div className="bg-red-50 text-red-600 text-[13px] rounded-[8px] px-4 py-3 mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
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
            placeholder="••••••••"
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
        {cargando ? 'Ingresando...' : 'Ingresar'}
      </button>

      <p className="text-[13px] text-ceniza text-center mt-5">
        ¿No tienes cuenta?{' '}
        <Link href="/registro" className="text-señal hover:underline font-medium">
          Regístrate
        </Link>
      </p>
    </form>
  )
}
