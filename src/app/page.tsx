'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const verificar = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

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
    }

    verificar()
  }, [router])

  return (
    <div className="flex h-screen items-center justify-center bg-marfil">
      <div className="animate-spin rounded-full h-6 w-6 border-b border-obsidian" />
    </div>
  )
}
