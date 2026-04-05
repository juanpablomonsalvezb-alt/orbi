'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'

interface Destinatario {
  nombre: string
  telefono: string
  estado?: string
}

interface Broadcast {
  id: string
  nombre: string
  mensaje: string
  destinatarios: Destinatario[]
  estado: string
  enviados: number
  fallidos: number
  created_at: string
}

interface ContactoCRM {
  id: string
  nombre: string
  telefono: string
  empresa_nombre: string
}

export default function WhatsAppPage() {
  const router = useRouter()
  const [empresaId, setEmpresaId] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([])
  const [cargando, setCargando] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [progreso, setProgreso] = useState<string | null>(null)
  const [modalCRM, setModalCRM] = useState(false)
  const [contactosCRM, setContactosCRM] = useState<ContactoCRM[]>([])

  const [nombre, setNombre] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [destinatarios, setDestinatarios] = useState<Destinatario[]>([])
  const [activeBroadcast, setActiveBroadcast] = useState<Broadcast | null>(null)

  const cargarBroadcasts = useCallback(async (eid: string, tok: string) => {
    const res = await fetch(`/api/marketing/broadcast?empresa_id=${eid}`, {
      headers: { 'Authorization': `Bearer ${tok}` },
    })
    const data = await res.json()
    if (data.broadcasts) setBroadcasts(data.broadcasts)
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
        await cargarBroadcasts(empresa.id, tok)
      }
      setCargando(false)
    }
    init()
  }, [router, cargarBroadcasts])

  const agregarDestinatario = () => {
    setDestinatarios(prev => [...prev, { nombre: '', telefono: '' }])
  }

  const actualizarDestinatario = (idx: number, campo: keyof Destinatario, valor: string) => {
    setDestinatarios(prev => {
      const next = [...prev]
      next[idx] = { ...next[idx], [campo]: valor }
      return next
    })
  }

  const eliminarDestinatario = (idx: number) => {
    setDestinatarios(prev => prev.filter((_, i) => i !== idx))
  }

  const cargarDesdecrm = async () => {
    if (!empresaId || !token) return
    const res = await fetch(`/api/marketing/contactos?empresa_id=${empresaId}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    const data = await res.json()
    const conTelefono = (data.contactos || []).filter((c: ContactoCRM) => c.telefono)
    setContactosCRM(conTelefono)
    setModalCRM(true)
  }

  const importarContacto = (c: ContactoCRM) => {
    const yaExiste = destinatarios.some(d => d.telefono === c.telefono)
    if (!yaExiste) {
      setDestinatarios(prev => [...prev, { nombre: c.nombre, telefono: c.telefono }])
    }
  }

  const crearYEnviar = async () => {
    if (!nombre || !mensaje || destinatarios.length === 0 || !empresaId || !token) return
    setEnviando(true)
    setProgreso('Creando campaña...')

    try {
      // Create broadcast
      const createRes = await fetch('/api/marketing/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ empresa_id: empresaId, nombre, mensaje, destinatarios }),
      })
      const createData = await createRes.json()
      if (!createData.broadcast) throw new Error('Error creando broadcast')

      const broadcastId = createData.broadcast.id
      setProgreso(`Enviando a ${destinatarios.length} destinatarios...`)

      // Send
      const sendRes = await fetch('/api/marketing/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ empresa_id: empresaId, broadcast_id: broadcastId }),
      })
      const sendData = await sendRes.json()

      setProgreso(`Completado: ${sendData.enviados} enviados, ${sendData.fallidos} fallidos`)
      await cargarBroadcasts(empresaId, token)

      // Reset form
      setNombre('')
      setMensaje('')
      setDestinatarios([])

      setTimeout(() => setProgreso(null), 4000)
    } catch (err) {
      console.error('Error enviando broadcast:', err)
      setProgreso('Error al enviar. Revisa la configuración de WhatsApp.')
      setTimeout(() => setProgreso(null), 4000)
    } finally {
      setEnviando(false)
    }
  }

  const cargarBroadcastEnForm = (bc: Broadcast) => {
    setActiveBroadcast(bc)
    setNombre(bc.nombre)
    setMensaje(bc.mensaje)
    setDestinatarios(bc.destinatarios)
  }

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
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => router.push('/marketing')} className="text-[#9b9a97] hover:text-[#37352f] text-sm">←</button>
          <div>
            <h1 className="text-2xl font-semibold text-[#1a1a1a]" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
              Broadcast Manager
            </h1>
            <p className="text-sm text-[#6b6b6b]">Envía mensajes masivos por WhatsApp</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-4">
            <div className="bg-white border border-[#e5e5e0] rounded-xl p-6">
              <h2 className="text-sm font-semibold text-[#37352f] mb-4">
                {activeBroadcast ? `Editando: ${activeBroadcast.nombre}` : 'Nueva campaña'}
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-[#6b6b6b] mb-1">Nombre de la campaña *</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    placeholder="Ej: Lanzamiento abril contadores"
                    className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2 text-sm text-[#37352f] focus:outline-none focus:border-[#25D366]"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs text-[#6b6b6b]">Mensaje *</label>
                    <span className="text-xs text-[#9b9a97]">{mensaje.length}/1000</span>
                  </div>
                  <textarea
                    value={mensaje}
                    onChange={e => e.target.value.length <= 1000 && setMensaje(e.target.value)}
                    rows={5}
                    placeholder="Escribe el mensaje que recibirán tus contactos..."
                    className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2 text-sm text-[#37352f] focus:outline-none focus:border-[#25D366] resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Destinatarios */}
            <div className="bg-white border border-[#e5e5e0] rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[#37352f]">
                  Destinatarios ({destinatarios.length})
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={cargarDesdecrm}
                    className="text-xs text-[#2563eb] hover:underline"
                  >
                    Importar CRM
                  </button>
                  <button
                    onClick={agregarDestinatario}
                    className="text-xs text-[#c6613f] hover:underline"
                  >
                    + Agregar
                  </button>
                </div>
              </div>

              {destinatarios.length === 0 ? (
                <p className="text-xs text-[#9b9a97] text-center py-4">Sin destinatarios. Agrega manualmente o importa del CRM.</p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {destinatarios.map((d, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={d.nombre}
                        onChange={e => actualizarDestinatario(idx, 'nombre', e.target.value)}
                        placeholder="Nombre"
                        className="flex-1 border border-[#e5e5e0] rounded-lg px-2 py-1.5 text-xs text-[#37352f] focus:outline-none focus:border-[#25D366]"
                      />
                      <input
                        type="tel"
                        value={d.telefono}
                        onChange={e => actualizarDestinatario(idx, 'telefono', e.target.value)}
                        placeholder="+56912345678"
                        className="flex-1 border border-[#e5e5e0] rounded-lg px-2 py-1.5 text-xs text-[#37352f] focus:outline-none focus:border-[#25D366]"
                      />
                      <button onClick={() => eliminarDestinatario(idx)} className="text-[#eb5757] hover:text-red-700 text-xs">✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Progress / Send */}
            {progreso && (
              <div className="bg-[#f7f6f3] border border-[#e5e5e0] rounded-xl p-4">
                <p className="text-sm text-[#37352f]">{progreso}</p>
              </div>
            )}

            <button
              onClick={crearYEnviar}
              disabled={enviando || !nombre || !mensaje || destinatarios.length === 0}
              className="w-full py-3 bg-[#25D366] text-white rounded-xl text-sm font-semibold hover:bg-[#1ebe5c] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {enviando ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  Enviando...
                </span>
              ) : (
                `Enviar todo (${destinatarios.length} destinatarios)`
              )}
            </button>
          </div>

          {/* Campaigns history */}
          <div>
            <h2 className="text-sm font-semibold text-[#37352f] mb-3">Campañas anteriores</h2>
            {broadcasts.length === 0 ? (
              <div className="bg-white border border-dashed border-[#e5e5e0] rounded-xl p-8 text-center">
                <p className="text-sm text-[#9b9a97]">Sin campañas aún.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {broadcasts.map(bc => (
                  <div
                    key={bc.id}
                    className="bg-white border border-[#e5e5e0] rounded-xl p-4 cursor-pointer hover:border-[#25D366] transition-colors"
                    onClick={() => cargarBroadcastEnForm(bc)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-[#37352f]">{bc.nombre}</p>
                        <p className="text-xs text-[#9b9a97] mt-0.5">
                          {new Date(bc.created_at).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        bc.estado === 'completado'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {bc.estado}
                      </span>
                    </div>
                    {bc.estado === 'completado' && (
                      <div className="flex gap-4 mt-2">
                        <span className="text-xs text-green-600">✓ {bc.enviados} enviados</span>
                        {bc.fallidos > 0 && <span className="text-xs text-red-500">✗ {bc.fallidos} fallidos</span>}
                      </div>
                    )}
                    <p className="text-xs text-[#9b9a97] mt-2 line-clamp-1">{bc.mensaje}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal importar CRM */}
      {modalCRM && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-[#37352f]">Importar del CRM</h3>
              <button onClick={() => setModalCRM(false)} className="text-[#9b9a97] hover:text-[#37352f]">✕</button>
            </div>
            {contactosCRM.length === 0 ? (
              <p className="text-sm text-[#9b9a97] text-center py-4">No hay contactos con teléfono en el CRM.</p>
            ) : (
              <div className="max-h-64 overflow-y-auto space-y-2">
                {contactosCRM.map(c => {
                  const yaAgregado = destinatarios.some(d => d.telefono === c.telefono)
                  return (
                    <div key={c.id} className="flex items-center justify-between py-2 border-b border-[#f0f0ee]">
                      <div>
                        <p className="text-sm text-[#37352f]">{c.nombre}</p>
                        <p className="text-xs text-[#9b9a97]">{c.empresa_nombre} · {c.telefono}</p>
                      </div>
                      <button
                        onClick={() => importarContacto(c)}
                        disabled={yaAgregado}
                        className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                          yaAgregado
                            ? 'bg-green-50 text-green-600 cursor-default'
                            : 'bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20'
                        }`}
                      >
                        {yaAgregado ? 'Agregado' : 'Agregar'}
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
            <button
              onClick={() => setModalCRM(false)}
              className="mt-4 w-full py-2 border border-[#e5e5e0] rounded-lg text-sm text-[#9b9a97] hover:bg-[#f7f6f3]"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
