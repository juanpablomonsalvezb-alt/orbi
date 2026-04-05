'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'

interface Link {
  id: string
  nombre: string
  url_destino: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  slug: string
  clics: number
  created_at: string
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.orbbilatam.com'

const SOURCE_OPTIONS = ['linkedin', 'whatsapp', 'instagram', 'facebook', 'reddit', 'email', 'otro']
const MEDIUM_OPTIONS = ['social', 'message', 'referral', 'organic', 'paid']
const CAMPAIGN_OPTIONS = ['lanzamiento', 'contador', 'grupo-whatsapp', 'demo', 'otro']

export default function LinksPage() {
  const router = useRouter()
  const [empresaId, setEmpresaId] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [links, setLinks] = useState<Link[]>([])
  const [cargando, setCargando] = useState(true)
  const [copiado, setCopiado] = useState<string | null>(null)
  const [form, setForm] = useState({
    nombre: '',
    url_destino: APP_URL,
    utm_source: 'linkedin',
    utm_medium: 'social',
    utm_campaign: '',
  })
  const [creando, setCreando] = useState(false)

  const cargarLinks = useCallback(async (eid: string, tok: string) => {
    const res = await fetch(`/api/marketing/links?empresa_id=${eid}`, {
      headers: { 'Authorization': `Bearer ${tok}` },
    })
    const data = await res.json()
    if (data.links) setLinks(data.links)
  }, [])

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data: { session } } = await supabase.auth.getSession()
      const tok = session?.access_token || ''
      setToken(tok)

      const { data: empresa } = await supabase
        .from('empresas')
        .select('id')
        .eq('user_id', user.id)
        .single()

      if (empresa) {
        setEmpresaId(empresa.id)
        await cargarLinks(empresa.id, tok)
      }
      setCargando(false)
    }
    init()
  }, [router, cargarLinks])

  const crearLink = async () => {
    if (!form.nombre || !form.url_destino || !empresaId || !token) return
    setCreando(true)
    try {
      const res = await fetch('/api/marketing/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ empresa_id: empresaId, ...form }),
      })
      const data = await res.json()
      if (data.link) {
        setLinks(prev => [data.link, ...prev])
        setForm({ nombre: '', url_destino: APP_URL, utm_source: 'linkedin', utm_medium: 'social', utm_campaign: '' })
      }
    } catch (err) {
      console.error('Error creando link:', err)
    } finally {
      setCreando(false)
    }
  }

  const eliminarLink = async (id: string) => {
    if (!empresaId || !token) return
    await fetch(`/api/marketing/links?id=${id}&empresa_id=${empresaId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    })
    setLinks(prev => prev.filter(l => l.id !== id))
  }

  const copiar = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text)
    setCopiado(key)
    setTimeout(() => setCopiado(null), 2000)
  }

  const buildShortUrl = (slug: string) => `${APP_URL}/r/${slug}`

  // Stats
  const totalClics = links.reduce((sum, l) => sum + l.clics, 0)
  const mejorLink = links.length > 0 ? links[0] : null
  const canalMejor = links.length > 0
    ? links.reduce<Record<string, number>>((acc, l) => {
        acc[l.utm_source] = (acc[l.utm_source] || 0) + l.clics
        return acc
      }, {})
    : {}
  const canalTop = Object.entries(canalMejor).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'

  if (cargando) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FFFFF0]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c6613f]" />
      </div>
    )
  }

  const previewUrl = form.utm_source || form.utm_medium || form.utm_campaign
    ? `${APP_URL}/r/abc123 → ${form.url_destino}?utm_source=${form.utm_source}&utm_medium=${form.utm_medium}&utm_campaign=${form.utm_campaign}`
    : `${APP_URL}/r/abc123`

  return (
    <div className="min-h-screen bg-[#FFFFF0] p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => router.push('/marketing')} className="text-[#9b9a97] hover:text-[#37352f] text-sm">←</button>
          <div>
            <h1 className="text-2xl font-semibold text-[#1a1a1a]" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
              UTM Link Generator
            </h1>
            <p className="text-sm text-[#6b6b6b]">Crea links rastreables con parámetros UTM</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total clics', value: totalClics },
            { label: 'Link más clicado', value: mejorLink?.nombre || '—' },
            { label: 'Canal top', value: canalTop },
          ].map(s => (
            <div key={s.label} className="bg-white border border-[#e5e5e0] rounded-xl p-4">
              <p className="text-xl font-semibold text-[#1a1a1a] truncate">{s.value}</p>
              <p className="text-xs text-[#9b9a97] mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white border border-[#e5e5e0] rounded-xl p-6">
            <h2 className="text-sm font-semibold text-[#37352f] mb-4">Crear nuevo link</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-[#6b6b6b] mb-1">Nombre del link *</label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={e => setForm(prev => ({ ...prev, nombre: e.target.value }))}
                  placeholder="Ej: Post LinkedIn lanzamiento"
                  className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2 text-sm text-[#37352f] focus:outline-none focus:border-[#c6613f]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#6b6b6b] mb-1">URL de destino *</label>
                <input
                  type="url"
                  value={form.url_destino}
                  onChange={e => setForm(prev => ({ ...prev, url_destino: e.target.value }))}
                  className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2 text-sm text-[#37352f] focus:outline-none focus:border-[#c6613f]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#6b6b6b] mb-1">Source</label>
                  <select
                    value={form.utm_source}
                    onChange={e => setForm(prev => ({ ...prev, utm_source: e.target.value }))}
                    className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2 text-sm text-[#37352f] focus:outline-none focus:border-[#c6613f]"
                  >
                    {SOURCE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-[#6b6b6b] mb-1">Medium</label>
                  <select
                    value={form.utm_medium}
                    onChange={e => setForm(prev => ({ ...prev, utm_medium: e.target.value }))}
                    className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2 text-sm text-[#37352f] focus:outline-none focus:border-[#c6613f]"
                  >
                    {MEDIUM_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs text-[#6b6b6b] mb-1">Campaign</label>
                <input
                  type="text"
                  value={form.utm_campaign}
                  onChange={e => setForm(prev => ({ ...prev, utm_campaign: e.target.value }))}
                  placeholder="Ej: lanzamiento-abril"
                  list="campaigns"
                  className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2 text-sm text-[#37352f] focus:outline-none focus:border-[#c6613f]"
                />
                <datalist id="campaigns">
                  {CAMPAIGN_OPTIONS.map(o => <option key={o} value={o} />)}
                </datalist>
              </div>

              {/* Preview */}
              <div className="bg-[#f7f6f3] rounded-lg p-3">
                <p className="text-xs text-[#9b9a97] mb-1">Preview del link</p>
                <p className="text-xs text-[#37352f] font-mono break-all">{previewUrl}</p>
              </div>

              <button
                onClick={crearLink}
                disabled={creando || !form.nombre || !form.url_destino}
                className="w-full py-2.5 bg-[#c6613f] text-white rounded-lg text-sm font-medium hover:bg-[#b5522f] disabled:opacity-50 transition-colors"
              >
                {creando ? 'Creando...' : 'Crear link'}
              </button>
            </div>
          </div>

          {/* Links table */}
          <div>
            {links.length === 0 ? (
              <div className="bg-white border border-dashed border-[#e5e5e0] rounded-xl p-10 text-center">
                <p className="text-sm text-[#9b9a97]">Sin links aún. Crea el primero.</p>
              </div>
            ) : (
              <div className="bg-white border border-[#e5e5e0] rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#f0f0ee] bg-[#fafafa]">
                      <th className="text-left text-xs font-medium text-[#9b9a97] px-4 py-3">Nombre</th>
                      <th className="text-left text-xs font-medium text-[#9b9a97] px-4 py-3">Canal</th>
                      <th className="text-left text-xs font-medium text-[#9b9a97] px-4 py-3">Clics</th>
                      <th className="text-left text-xs font-medium text-[#9b9a97] px-4 py-3">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {links.map(link => (
                      <tr key={link.id} className="border-b border-[#f0f0ee] hover:bg-[#fafafa] transition-colors">
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-[#37352f] truncate max-w-[120px]">{link.nombre}</p>
                          <p className="text-xs text-[#9b9a97] font-mono">/r/{link.slug}</p>
                        </td>
                        <td className="px-4 py-3 text-xs text-[#6b6b6b] capitalize">{link.utm_source}</td>
                        <td className="px-4 py-3 text-sm font-medium text-[#37352f]">{link.clics}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => copiar(buildShortUrl(link.slug), link.id)}
                              className="text-xs text-[#c6613f] hover:underline"
                            >
                              {copiado === link.id ? '✓ Copiado' : 'Copiar'}
                            </button>
                            <button
                              onClick={() => eliminarLink(link.id)}
                              className="text-xs text-[#eb5757] hover:text-red-700"
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
