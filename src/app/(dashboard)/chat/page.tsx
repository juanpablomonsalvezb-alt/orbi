'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'

// /chat sin ID: crea o redirige a la conversación más reciente
export default function ChatIndexPage() {
  const router = useRouter()

  useEffect(() => {
    const redirigir = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: empresa } = await supabase
        .from('empresas')
        .select('id, onboarding_completado')
        .eq('user_id', user.id)
        .single()

      if (!empresa) return

      // Si no completó onboarding, redirigir allá
      if (!empresa.onboarding_completado) {
        router.push('/onboarding')
        return
      }

      // Buscar conversación más reciente
      const { data: conversaciones } = await supabase
        .from('conversaciones')
        .select('id')
        .eq('empresa_id', empresa.id)
        .order('updated_at', { ascending: false })
        .limit(1)

      if (conversaciones && conversaciones.length > 0) {
        router.push(`/chat/${conversaciones[0].id}`)
      } else {
        // Crear primera conversación
        const { data: nueva } = await supabase
          .from('conversaciones')
          .insert({
            empresa_id: empresa.id,
            titulo: 'Nueva conversación',
          })
          .select()
          .single()

        if (nueva) router.push(`/chat/${nueva.id}`)
      }
    }

    redirigir()
  }, [router])

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
    </div>
  )
}
