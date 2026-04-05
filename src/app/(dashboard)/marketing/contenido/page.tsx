'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'

interface Versiones {
  linkedin?: string
  whatsapp?: string
  instagram?: string
  facebook?: string
  reddit?: string
  email?: string
}

interface Contenido {
  id: string
  tema: string
  versiones: Versiones
  created_at: string
}

interface Canal {
  key: keyof Versiones
  label: string
  color: string
  icon: React.ReactNode
}

const CANALES: Canal[] = [
  {
    key: 'linkedin',
    label: 'LinkedIn',
    color: '#0A66C2',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    color: '#25D366',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
      </svg>
    ),
  },
  {
    key: 'instagram',
    label: 'Instagram',
    color: '#E1306C',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="url(#igGrad)">
        <defs>
          <linearGradient id="igGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#833AB4" />
            <stop offset="50%" stopColor="#E1306C" />
            <stop offset="100%" stopColor="#F77737" />
          </linearGradient>
        </defs>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  {
    key: 'facebook',
    label: 'Facebook',
    color: '#1877F2',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    key: 'reddit',
    label: 'Reddit',
    color: '#FF4500',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF4500">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
      </svg>
    ),
  },
  {
    key: 'email',
    label: 'Email',
    color: '#6b6b6b',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b6b6b" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
]

export default function ContenidoPage() {
  const router = useRouter()
  const [empresaId, setEmpresaId] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [tema, setTema] = useState('')
  const [generando, setGenerando] = useState(false)
  const [versiones, setVersiones] = useState<Versiones | null>(null)
  const [historial, setHistorial] = useState<Contenido[]>([])
  const [copiado, setCopiado] = useState<string | null>(null)
  const [whatsappModal, setWhatsappModal] = useState(false)
  const [whatsappNumero, setWhatsappNumero] = useState('')
  const [enviandoWa, setEnviandoWa] = useState(false)

  const cargarHistorial = useCallback(async (eid: string) => {
    const { data } = await supabase
      .from('marketing_contenido')
      .select('id, tema, versiones, created_at')
      .eq('empresa_id', eid)
      .order('created_at', { ascending: false })
      .limit(10)
    if (data) setHistorial(data as Contenido[])
  }, [])

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.access_token) setToken(session.access_token)

      const { data: empresa } = await supabase
        .from('empresas')
        .select('id')
        .eq('user_id', user.id)
        .single()

      if (empresa) {
        setEmpresaId(empresa.id)
        cargarHistorial(empresa.id)
      }
    }
    init()
  }, [router, cargarHistorial])

  const generarContenido = async () => {
    if (!tema.trim() || !empresaId || !token) return
    setGenerando(true)
    setVersiones(null)

    try {
      const res = await fetch('/api/marketing/contenido', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ empresa_id: empresaId, tema }),
      })
      const data = await res.json()
      if (data.contenido?.versiones) {
        setVersiones(data.contenido.versiones)
        cargarHistorial(empresaId)
      }
    } catch (err) {
      console.error('Error generando contenido:', err)
    } finally {
      setGenerando(false)
    }
  }

  const copiar = async (key: string, texto: string) => {
    await navigator.clipboard.writeText(texto)
    setCopiado(key)
    setTimeout(() => setCopiado(null), 2000)
  }

  const formatearTexto = (canal: keyof Versiones, texto: string) => {
    if (canal === 'email') {
      const partes = texto.split('|||')
      return partes.length === 2
        ? `Asunto: ${partes[0].trim()}\n\n${partes[1].trim()}`
        : texto
    }
    return texto
  }

  return (
    <div className="min-h-screen bg-[#FFFFF0] p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => router.push('/marketing')} className="text-[#9b9a97] hover:text-[#37352f] text-sm">←</button>
          <div>
            <h1 className="text-2xl font-semibold text-[#1a1a1a]" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
              Content AI Hub
            </h1>
            <p className="text-sm text-[#6b6b6b]">Genera contenido adaptado para 6 canales con IA</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Input */}
          <div>
            <div className="bg-white border border-[#e5e5e0] rounded-xl p-6">
              <label className="block text-sm font-medium text-[#37352f] mb-2">
                ¿Sobre qué quieres comunicar hoy?
              </label>
              <textarea
                value={tema}
                onChange={e => setTema(e.target.value)}
                placeholder="Ej: Lanzamos nuestra nueva función de reportes automáticos para contadores..."
                className="w-full h-32 resize-none border border-[#e5e5e0] rounded-lg px-3 py-2 text-sm text-[#37352f] placeholder:text-[#c4c4c0] focus:outline-none focus:border-[#c6613f] transition-colors bg-[#fafafa]"
              />
              <button
                onClick={generarContenido}
                disabled={generando || !tema.trim()}
                className="mt-4 w-full py-2.5 bg-[#c6613f] text-white rounded-lg text-sm font-medium hover:bg-[#b5522f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {generando ? 'Adaptando para 6 canales...' : 'Generar contenido para todos los canales'}
              </button>
              {generando && (
                <p className="text-xs text-[#9b9a97] text-center mt-2 animate-pulse">Esto puede tomar unos segundos...</p>
              )}
            </div>

            {/* Historial */}
            {historial.length > 0 && (
              <div className="mt-6 bg-white border border-[#e5e5e0] rounded-xl p-5">
                <h3 className="text-sm font-semibold text-[#37352f] mb-3">Historial</h3>
                <ul className="space-y-2">
                  {historial.map(c => (
                    <li
                      key={c.id}
                      className="cursor-pointer py-2 px-3 rounded-lg hover:bg-[#f7f6f3] transition-colors"
                      onClick={() => { setVersiones(c.versiones); setTema(c.tema) }}
                    >
                      <p className="text-sm text-[#37352f] truncate">{c.tema}</p>
                      <p className="text-xs text-[#9b9a97]">
                        {new Date(c.created_at).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right: Canal cards */}
          <div>
            {!versiones && !generando && (
              <div className="bg-white border border-dashed border-[#e5e5e0] rounded-xl p-10 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
                <p className="text-4xl mb-3">✦</p>
                <p className="text-sm text-[#9b9a97]">Ingresa un tema y genera contenido para LinkedIn, WhatsApp, Instagram, Facebook, Reddit y Email al mismo tiempo.</p>
              </div>
            )}
            {generando && (
              <div className="bg-white border border-[#e5e5e0] rounded-xl p-10 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c6613f] mb-4" />
                <p className="text-sm text-[#9b9a97]">Adaptando para 6 canales...</p>
              </div>
            )}
            {versiones && !generando && (
              <div className="space-y-3">
                {CANALES.map(canal => {
                  const texto = versiones[canal.key] || ''
                  const textoFormateado = formatearTexto(canal.key, texto)
                  return (
                    <div key={canal.key} className="bg-white border border-[#e5e5e0] rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {canal.icon}
                          <span className="text-sm font-medium text-[#37352f]">{canal.label}</span>
                          <span className="text-xs text-[#9b9a97]">{texto.length} chars</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {canal.key === 'whatsapp' && (
                            <button
                              onClick={() => setWhatsappModal(true)}
                              className="text-xs px-2 py-1 bg-[#25D366]/10 text-[#25D366] rounded-md hover:bg-[#25D366]/20 transition-colors"
                            >
                              Enviar
                            </button>
                          )}
                          <button
                            onClick={() => copiar(canal.key, textoFormateado)}
                            className="text-xs px-2 py-1 bg-[#f7f6f3] text-[#9b9a97] rounded-md hover:bg-[#efefef] transition-colors"
                          >
                            {copiado === canal.key ? '✓ Copiado' : 'Copiar'}
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-[#6b6b6b] whitespace-pre-wrap leading-relaxed">{textoFormateado}</p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* WhatsApp send modal */}
      {whatsappModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-base font-semibold text-[#37352f] mb-4">Enviar por WhatsApp</h3>
            <label className="block text-sm text-[#6b6b6b] mb-1">Número (con código de país)</label>
            <input
              type="tel"
              value={whatsappNumero}
              onChange={e => setWhatsappNumero(e.target.value)}
              placeholder="+56912345678"
              className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2 text-sm text-[#37352f] focus:outline-none focus:border-[#25D366]"
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => { setWhatsappModal(false); setWhatsappNumero('') }}
                className="flex-1 py-2 border border-[#e5e5e0] rounded-lg text-sm text-[#9b9a97] hover:bg-[#f7f6f3]"
              >
                Cancelar
              </button>
              <button
                disabled={!whatsappNumero.trim() || enviandoWa}
                onClick={async () => {
                  if (!versiones?.whatsapp || !token || !empresaId) return
                  setEnviandoWa(true)
                  try {
                    await fetch('/api/marketing/broadcast', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                      body: JSON.stringify({
                        empresa_id: empresaId,
                        nombre: `Envío rápido: ${tema.slice(0, 40)}`,
                        mensaje: versiones.whatsapp,
                        destinatarios: [{ nombre: 'Destinatario', telefono: whatsappNumero }],
                      }),
                    })
                    setWhatsappModal(false)
                    setWhatsappNumero('')
                  } catch (err) {
                    console.error('Error enviando WhatsApp:', err)
                  } finally {
                    setEnviandoWa(false)
                  }
                }}
                className="flex-1 py-2 bg-[#25D366] text-white rounded-lg text-sm font-medium hover:bg-[#1ebe5c] disabled:opacity-50"
              >
                {enviandoWa ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
