'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'

interface Contacto {
  id: string
  nombre: string
  cargo: string
  empresa_nombre: string
  canal: string
  telefono: string
  email: string
  linkedin_url: string
  estado: string
  notas: string
  proximo_contacto: string | null
  clientes_potenciales: number
  created_at: string
}

type EstadoContacto = 'todos' | 'prospecto' | 'contactado' | 'interesado' | 'aliado' | 'rechazado'

const ESTADO_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  prospecto:   { label: 'Prospecto',   color: '#6b7280', bg: '#f3f4f6' },
  contactado:  { label: 'Contactado',  color: '#2563eb', bg: '#eff6ff' },
  interesado:  { label: 'Interesado',  color: '#d97706', bg: '#fffbeb' },
  aliado:      { label: 'Aliado',      color: '#16a34a', bg: '#f0fdf4' },
  rechazado:   { label: 'Rechazado',   color: '#dc2626', bg: '#fef2f2' },
}

const CANAL_OPTIONS = ['whatsapp', 'email', 'linkedin', 'llamada', 'otro']
const ESTADO_OPTIONS = ['prospecto', 'contactado', 'interesado', 'aliado', 'rechazado']

const MENSAJE_WA = (nombre: string) =>
  `Hola ${nombre}, te escribo porque trabajo con Orbbi, una plataforma de IA para PYMEs. Muchos de tus clientes podrían optimizar su gestión con los 7 agentes que tenemos. ¿Tienes 10 minutos para conocer cómo funciona? La demo es gratis: orbbi.com/demo`

const EMPTY_FORM = {
  nombre: '', cargo: '', empresa_nombre: '', canal: 'whatsapp',
  telefono: '', email: '', linkedin_url: '', estado: 'prospecto',
  notas: '', proximo_contacto: '', clientes_potenciales: 0,
}

export default function ContactosPage() {
  const router = useRouter()
  const [empresaId, setEmpresaId] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [contactos, setContactos] = useState<Contacto[]>([])
  const [filtroEstado, setFiltroEstado] = useState<EstadoContacto>('todos')
  const [cargando, setCargando] = useState(true)
  const [modalCrear, setModalCrear] = useState(false)
  const [modalEditar, setModalEditar] = useState<Contacto | null>(null)
  const [form, setForm] = useState({ ...EMPTY_FORM })
  const [guardando, setGuardando] = useState(false)

  const cargarContactos = useCallback(async (eid: string, tok: string) => {
    const url = filtroEstado === 'todos'
      ? `/api/marketing/contactos?empresa_id=${eid}`
      : `/api/marketing/contactos?empresa_id=${eid}&estado=${filtroEstado}`
    const res = await fetch(url, { headers: { 'Authorization': `Bearer ${tok}` } })
    const data = await res.json()
    if (data.contactos) setContactos(data.contactos)
  }, [filtroEstado])

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
        await cargarContactos(empresa.id, tok)
      }
      setCargando(false)
    }
    init()
  }, [router, cargarContactos])

  useEffect(() => {
    if (empresaId && token) cargarContactos(empresaId, token)
  }, [filtroEstado, empresaId, token, cargarContactos])

  const guardarContacto = async () => {
    if (!form.nombre || !empresaId || !token) return
    setGuardando(true)
    try {
      if (modalEditar) {
        await fetch('/api/marketing/contactos', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ id: modalEditar.id, empresa_id: empresaId, ...form }),
        })
      } else {
        await fetch('/api/marketing/contactos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ empresa_id: empresaId, ...form }),
        })
      }
      await cargarContactos(empresaId, token)
      setModalCrear(false)
      setModalEditar(null)
      setForm({ ...EMPTY_FORM })
    } catch (err) {
      console.error('Error guardando contacto:', err)
    } finally {
      setGuardando(false)
    }
  }

  const eliminarContacto = async (id: string) => {
    if (!empresaId || !token) return
    await fetch(`/api/marketing/contactos?id=${id}&empresa_id=${empresaId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    })
    setContactos(prev => prev.filter(c => c.id !== id))
  }

  const abrirEditar = (contacto: Contacto) => {
    setForm({
      nombre: contacto.nombre,
      cargo: contacto.cargo,
      empresa_nombre: contacto.empresa_nombre,
      canal: contacto.canal,
      telefono: contacto.telefono,
      email: contacto.email,
      linkedin_url: contacto.linkedin_url,
      estado: contacto.estado,
      notas: contacto.notas,
      proximo_contacto: contacto.proximo_contacto || '',
      clientes_potenciales: contacto.clientes_potenciales,
    })
    setModalEditar(contacto)
  }

  // Stats
  const aliados = contactos.filter(c => c.estado === 'aliado').length
  const hoy = new Date().toISOString().split('T')[0]
  const enUnaSemanaa = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  const followupsEstaSemanaa = contactos.filter(
    c => c.proximo_contacto && c.proximo_contacto >= hoy && c.proximo_contacto <= enUnaSemanaa
  ).length

  if (cargando) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FFFFF0]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c6613f]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFFFF0] p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/marketing')} className="text-[#9b9a97] hover:text-[#37352f] text-sm">←</button>
            <div>
              <h1 className="text-2xl font-semibold text-[#1a1a1a]" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                Outreach CRM
              </h1>
              <p className="text-sm text-[#6b6b6b]">Gestiona tus contactos y seguimientos</p>
            </div>
          </div>
          <button
            onClick={() => { setForm({ ...EMPTY_FORM }); setModalCrear(true) }}
            className="px-4 py-2 bg-[#c6613f] text-white rounded-lg text-sm font-medium hover:bg-[#b5522f] transition-colors"
          >
            + Agregar contacto
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Total contactos', value: contactos.length },
            { label: 'Aliados activos', value: aliados },
            { label: 'Follow-ups esta semana', value: followupsEstaSemanaa },
          ].map(s => (
            <div key={s.label} className="bg-white border border-[#e5e5e0] rounded-xl p-4">
              <p className="text-2xl font-semibold text-[#1a1a1a]">{s.value}</p>
              <p className="text-xs text-[#9b9a97] mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {(['todos', ...ESTADO_OPTIONS] as EstadoContacto[]).map(estado => (
            <button
              key={estado}
              onClick={() => setFiltroEstado(estado)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filtroEstado === estado
                  ? 'bg-[#c6613f] text-white'
                  : 'bg-white border border-[#e5e5e0] text-[#6b6b6b] hover:border-[#c6613f]'
              }`}
            >
              {estado === 'todos' ? 'Todos' : ESTADO_CONFIG[estado]?.label || estado}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white border border-[#e5e5e0] rounded-xl overflow-hidden">
          {contactos.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-sm text-[#9b9a97]">Sin contactos. Agrega tu primero para empezar.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#f0f0ee] bg-[#fafafa]">
                    <th className="text-left text-xs font-medium text-[#9b9a97] px-4 py-3">Nombre</th>
                    <th className="text-left text-xs font-medium text-[#9b9a97] px-4 py-3">Empresa</th>
                    <th className="text-left text-xs font-medium text-[#9b9a97] px-4 py-3">Canal</th>
                    <th className="text-left text-xs font-medium text-[#9b9a97] px-4 py-3">PYMEs</th>
                    <th className="text-left text-xs font-medium text-[#9b9a97] px-4 py-3">Estado</th>
                    <th className="text-left text-xs font-medium text-[#9b9a97] px-4 py-3">Próx. contacto</th>
                    <th className="text-left text-xs font-medium text-[#9b9a97] px-4 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {contactos.map(c => {
                    const ec = ESTADO_CONFIG[c.estado] || ESTADO_CONFIG.prospecto
                    return (
                      <tr key={c.id} className="border-b border-[#f0f0ee] hover:bg-[#fafafa] transition-colors">
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-[#37352f]">{c.nombre}</p>
                          <p className="text-xs text-[#9b9a97]">{c.cargo}</p>
                        </td>
                        <td className="px-4 py-3 text-sm text-[#6b6b6b]">{c.empresa_nombre}</td>
                        <td className="px-4 py-3 text-xs text-[#6b6b6b] capitalize">{c.canal}</td>
                        <td className="px-4 py-3 text-sm text-[#6b6b6b]">{c.clientes_potenciales || '—'}</td>
                        <td className="px-4 py-3">
                          <span
                            className="text-xs px-2 py-1 rounded-full font-medium"
                            style={{ color: ec.color, backgroundColor: ec.bg }}
                          >
                            {ec.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-[#6b6b6b]">
                          {c.proximo_contacto
                            ? new Date(c.proximo_contacto + 'T12:00:00').toLocaleDateString('es-CL', { day: '2-digit', month: 'short' })
                            : '—'}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {c.telefono && (
                              <a
                                href={`https://wa.me/${c.telefono.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(MENSAJE_WA(c.nombre))}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Enviar WhatsApp"
                                className="text-[#25D366] hover:text-[#1ebe5c]"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                                </svg>
                              </a>
                            )}
                            <button onClick={() => abrirEditar(c)} className="text-xs text-[#9b9a97] hover:text-[#37352f]">Editar</button>
                            <button onClick={() => eliminarContacto(c.id)} className="text-xs text-[#eb5757] hover:text-red-700">Eliminar</button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal Crear/Editar */}
      {(modalCrear || modalEditar) && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl my-4">
            <h3 className="text-base font-semibold text-[#37352f] mb-4">
              {modalEditar ? 'Editar contacto' : 'Nuevo contacto'}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'nombre', label: 'Nombre *', type: 'text' },
                { key: 'cargo', label: 'Cargo', type: 'text' },
                { key: 'empresa_nombre', label: 'Empresa', type: 'text' },
                { key: 'telefono', label: 'Teléfono', type: 'tel' },
                { key: 'email', label: 'Email', type: 'email' },
                { key: 'linkedin_url', label: 'LinkedIn URL', type: 'url' },
                { key: 'proximo_contacto', label: 'Próximo contacto', type: 'date' },
                { key: 'clientes_potenciales', label: '¿Cuántas PYMEs maneja?', type: 'number' },
              ].map(field => (
                <div key={field.key} className={field.key === 'linkedin_url' || field.key === 'nombre' ? 'col-span-2' : ''}>
                  <label className="block text-xs text-[#6b6b6b] mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    value={form[field.key as keyof typeof form] as string}
                    onChange={e => setForm(prev => ({
                      ...prev,
                      [field.key]: field.type === 'number' ? parseInt(e.target.value) || 0 : e.target.value
                    }))}
                    className="w-full border border-[#e5e5e0] rounded-lg px-3 py-1.5 text-sm text-[#37352f] focus:outline-none focus:border-[#c6613f]"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs text-[#6b6b6b] mb-1">Canal</label>
                <select
                  value={form.canal}
                  onChange={e => setForm(prev => ({ ...prev, canal: e.target.value }))}
                  className="w-full border border-[#e5e5e0] rounded-lg px-3 py-1.5 text-sm text-[#37352f] focus:outline-none focus:border-[#c6613f]"
                >
                  {CANAL_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#6b6b6b] mb-1">Estado</label>
                <select
                  value={form.estado}
                  onChange={e => setForm(prev => ({ ...prev, estado: e.target.value }))}
                  className="w-full border border-[#e5e5e0] rounded-lg px-3 py-1.5 text-sm text-[#37352f] focus:outline-none focus:border-[#c6613f]"
                >
                  {ESTADO_OPTIONS.map(s => <option key={s} value={s}>{ESTADO_CONFIG[s].label}</option>)}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs text-[#6b6b6b] mb-1">Notas</label>
                <textarea
                  value={form.notas}
                  onChange={e => setForm(prev => ({ ...prev, notas: e.target.value }))}
                  rows={2}
                  className="w-full border border-[#e5e5e0] rounded-lg px-3 py-1.5 text-sm text-[#37352f] focus:outline-none focus:border-[#c6613f] resize-none"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => { setModalCrear(false); setModalEditar(null); setForm({ ...EMPTY_FORM }) }}
                className="flex-1 py-2 border border-[#e5e5e0] rounded-lg text-sm text-[#9b9a97] hover:bg-[#f7f6f3]"
              >
                Cancelar
              </button>
              <button
                onClick={guardarContacto}
                disabled={guardando || !form.nombre}
                className="flex-1 py-2 bg-[#c6613f] text-white rounded-lg text-sm font-medium hover:bg-[#b5522f] disabled:opacity-50"
              >
                {guardando ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
