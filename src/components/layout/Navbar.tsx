'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'
import OrbiLogo from '@/components/ui/OrbiLogo'

export default function Navbar() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <nav className="h-14 border-b border-humo/50 bg-white px-6 flex items-center justify-between">
      <OrbiLogo size={28} />

      <button
        onClick={handleLogout}
        className="text-[13px] text-ceniza hover:text-obsidian transition-colors"
      >
        Cerrar sesión
      </button>
    </nav>
  )
}
