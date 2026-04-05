'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'

interface Stats {
  contenido: number
  contactos: number
  links: number
  clicsTotales: number
}

interface Contenido {
  id: string
  tema: string
  created_at: string
}

interface Contacto {
  id: string
  nombre: string
  empresa_nombre: string
  estado: string
  proximo_contacto: string | null
}

export default function MarketingPage() {
  const router = useRouter()
  const [empresaId, setEmpresaId] = useState<string | null>(null)
  const [stats, setStats] = useState<Stats>({ contenido: 0, contactos: 0, links: 0, clicsTotales: 0 })
  const [ultimoContenido, setUltimoContenido] = useState<Contenido[]>([])
  const [proximosFollowups, setProximosFollowups] = useState<Contacto[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const cargar = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const { data: empresa } = await supabase
        .from('empresas')
        .select('id')
        .eq('user_id', user.id)
        .single()

      if (!empresa) { setCargando(false); return }
      setEmpresaId(empresa.id)

      const [contenidoRes, contactosRes, linksRes] = await Promise.all([
        supabase.from('marketing_contenido').select('id, tema, created_at').eq('empresa_id', empresa.id).order('created_at', { ascending: false }),
        supabase.from('marketing_contactos').select('id, nombre, empresa_nombre, estado, proximo_contacto').eq('empresa_id', empresa.id),
        supabase.from('marketing_links').select('id, clics').eq('empresa_id', empresa.id),
      ])

      const contenidos = contenidoRes.data || []
      const contactos = contactosRes.data || []
      const links = linksRes.data || []
      const clicsTotales = links.reduce((sum: number, l: { clics: number }) => sum + (l.clics || 0), 0)

      setStats({
        contenido: contenidos.length,
        contactos: contactos.length,
        links: links.length,
        clicsTotales,
      })

      setUltimoContenido(contenidos.slice(0, 5) as Contenido[])

      const hoy = new Date().toISOString().split('T')[0]
      const enUnaSemanaa = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      const followups = (contactos as Contacto[])
        .filter(c => c.proximo_contacto && c.proximo_contacto >= hoy && c.proximo_contacto <= enUnaSemanaa)
        .sort((a, b) => (a.proximo_contacto || '').localeCompare(b.proximo_contacto || ''))
        .slice(0, 5)

      setProximosFollowups(followups)
      setCargando(false)
    }

    cargar()
  }, [router])

  const quickActions = [
    { label: 'Generar contenido', href: '/marketing/contenido', color: '#c6613f', icon: '✦' },
    { label: 'CRM Outreach', href: '/marketing/contactos', color: '#2563eb', icon: '◎' },
    { label: 'Campañas Email', href: '/marketing/email', color: '#7c3aed', icon: '✉' },
    { label: 'Links UTM', href: '/marketing/links', color: '#16a34a', icon: '⊛' },
    { label: 'Broadcast WhatsApp', href: '/marketing/whatsapp', color: '#25D366', icon: '▶' },
  ]

  if (cargando) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FFFFF0]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c6613f]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFFFF0] p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[#1a1a1a]" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
            Marketing Hub
          </h1>
          <p className="mt-1 text-[#6b6b6b] text-sm">Crea contenido, gestiona contactos y mide tus campañas desde un solo lugar.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Contenido creado', value: stats.contenido },
            { label: 'Contactos en CRM', value: stats.contactos },
            { label: 'Links activos', value: stats.links },
            { label: 'Clics totales', value: stats.clicsTotales },
          ].map(stat => (
            <div key={stat.label} className="bg-white border border-[#e5e5e0] rounded-xl p-4">
              <p className="text-2xl font-semibold text-[#1a1a1a]">{stat.value}</p>
              <p className="text-xs text-[#9b9a97] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10">
          {quickActions.map(action => (
            <button
              key={action.href}
              onClick={() => router.push(action.href)}
              className="bg-white border border-[#e5e5e0] rounded-xl p-4 text-left hover:border-[#c6613f] hover:shadow-sm transition-all group"
            >
              <span className="text-xl block mb-2" style={{ color: action.color }}>{action.icon}</span>
              <span className="text-sm font-medium text-[#37352f] group-hover:text-[#c6613f] transition-colors">{action.label}</span>
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Último contenido */}
          <div className="bg-white border border-[#e5e5e0] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-[#37352f]">Último contenido generado</h2>
              <button onClick={() => router.push('/marketing/contenido')} className="text-xs text-[#c6613f] hover:underline">Ver todo</button>
            </div>
            {ultimoContenido.length === 0 ? (
              <p className="text-xs text-[#9b9a97] py-4 text-center">Sin contenido aún. ¡Genera tu primero!</p>
            ) : (
              <ul className="space-y-2">
                {ultimoContenido.map(c => (
                  <li key={c.id} className="flex items-start justify-between py-2 border-b border-[#f0f0ee] last:border-0">
                    <span className="text-sm text-[#37352f] truncate flex-1 pr-2">{c.tema}</span>
                    <span className="text-xs text-[#9b9a97] shrink-0">
                      {new Date(c.created_at).toLocaleDateString('es-CL', { day: '2-digit', month: 'short' })}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Próximos follow-ups */}
          <div className="bg-white border border-[#e5e5e0] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-[#37352f]">Próximos follow-ups</h2>
              <button onClick={() => router.push('/marketing/contactos')} className="text-xs text-[#c6613f] hover:underline">Ver CRM</button>
            </div>
            {proximosFollowups.length === 0 ? (
              <p className="text-xs text-[#9b9a97] py-4 text-center">Sin follow-ups esta semana.</p>
            ) : (
              <ul className="space-y-2">
                {proximosFollowups.map(c => (
                  <li key={c.id} className="flex items-center justify-between py-2 border-b border-[#f0f0ee] last:border-0">
                    <div>
                      <p className="text-sm text-[#37352f]">{c.nombre}</p>
                      <p className="text-xs text-[#9b9a97]">{c.empresa_nombre}</p>
                    </div>
                    <span className="text-xs text-[#c6613f] font-medium">
                      {c.proximo_contacto ? new Date(c.proximo_contacto + 'T12:00:00').toLocaleDateString('es-CL', { day: '2-digit', month: 'short' }) : ''}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Back link */}
        <div className="mt-8">
          <button onClick={() => router.push('/dashboard')} className="text-xs text-[#9b9a97] hover:text-[#37352f] transition-colors">
            ← Volver al panel
          </button>
        </div>
      </div>
    </div>
  )
}
