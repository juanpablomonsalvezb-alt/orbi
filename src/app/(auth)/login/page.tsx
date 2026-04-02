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
        .from('empresas')
        .select('onboarding_completado')
        .eq('user_id', user.id)
        .single()

      router.push(!empresa || !empresa.onboarding_completado ? '/onboarding' : '/chat')
    } catch {
      setError('Error al iniciar sesión')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div>
      <h2 className="text-[28px] font-light text-obsidian tracking-[-0.8px] leading-[1.1]">
        Bienvenido
        <br />
        de vuelta
      </h2>
      <p className="t-small text-ceniza mt-3 mb-10">
        Ingresa para hablar con tu agente.
      </p>

      {error && (
        <div className="rounded-[8px] bg-red-50 border border-red-100 px-4 py-3 mb-6">
          <p className="t-small text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
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
            placeholder="••••••••"
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
          {cargando ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>

      <div className="mt-10 pt-6 border-t border-humo/40">
        <p className="t-small text-ceniza text-center">
          ¿No tienes cuenta?{' '}
          <Link href="/registro" className="text-señal hover:underline font-medium">
            Crea una gratis
          </Link>
        </p>
      </div>
    </div>
  )
}
