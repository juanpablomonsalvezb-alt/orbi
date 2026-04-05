'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'

// ── Types ──
interface Campana {
  id: string
  nombre: string
  tipo: string
  asunto: string
  cuerpo_html: string
  estado: string
  total_enviados: number
  total_abiertos: number
  total_clicks: number
  total_rebotes: number
  created_at: string
}

interface Prospecto {
  id: string
  nombre: string
  cargo_destinatario: string
  email: string
  pais: string
  tipo: string
  sitio_web: string
  pymnes_aprox: number
  notas: string
}

interface EmailEnviado {
  id: string
  destinatario_nombre: string
  destinatario_org: string
  destinatario_email: string
  pais: string
  estado: string
  enviado_at: string | null
}

type Tab = 'campanas' | 'prospectos' | 'plantillas'

// ── Email templates ──
const PLANTILLAS: Record<string, { asunto: string; tipo: string; html: string }> = {
  universal: {
    asunto: 'Orbbi — IA para las PYMEs de {{pais}}',
    tipo: 'gremio',
    html: `<div style="font-family:'Georgia',serif;max-width:540px;margin:0 auto;padding:48px 24px;color:#141413;background:#ffffff;">

<p style="font-size:15px;line-height:1.8;color:#5e5d59;margin:0 0 20px;">
  Estimado/a {{nombre}},
</p>

<p style="font-size:15px;line-height:1.8;color:#5e5d59;margin:0 0 20px;">
  Mi nombre es Juan Pablo Monsalvez. Soy el fundador de <strong style="color:#141413;">Orbbi</strong>, una startup chilena que lanzamos este año con una idea simple: que cualquier PYME en Latinoamérica pueda tomar mejores decisiones, sin necesitar contratar más gente ni pagar consultores.
</p>

<p style="font-size:15px;line-height:1.8;color:#5e5d59;margin:0 0 20px;">
  Lo hacemos con agentes de inteligencia artificial especializados — uno para finanzas, otro para ventas, marketing, recursos humanos, inventario. Cada uno conoce el negocio en profundidad y está disponible 24/7 desde <strong style="color:#141413;">$29 USD al mes</strong>.
</p>

<p style="font-size:15px;line-height:1.8;color:#5e5d59;margin:0 0 20px;">
  Le escribo porque {{org}} trabaja directamente con el tipo de empresa que Orbbi puede transformar. No busco una venta inmediata — busco conversación. Si ve potencial en que las empresas que acompaña accedan a esta herramienta, me encantaría mostrársela en 20 minutos.
</p>

<p style="font-size:15px;line-height:1.8;color:#5e5d59;margin:0 0 32px;">
  También puede ver la demo en vivo ahora mismo, sin registro:
</p>

<a href="https://www.orbbilatam.com/demo"
   style="display:inline-block;background:#141413;color:#faf9f5;padding:13px 28px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:500;letter-spacing:0.2px;">
  Ver demo gratuita →
</a>

<p style="font-size:14px;line-height:1.7;color:#87867f;margin:36px 0 0;">
  Quedo atento a cualquier pregunta. Responda directamente a este correo.
</p>

<p style="font-size:14px;color:#87867f;margin:4px 0 0;">
  Juan Pablo Monsalvez<br/>
  Fundador, Orbbi<br/>
  <a href="https://www.orbbilatam.com" style="color:#c6613f;text-decoration:none;">orbbilatam.com</a>
</p>

<hr style="border:none;border-top:1px solid #e8e6dc;margin:40px 0 20px;" />

<p style="font-size:11px;color:#b0aea5;line-height:1.6;margin:0;">
  Si no deseas recibir más información de Orbbi, responde este correo con "dar de baja" y te eliminamos de inmediato.
</p>

</div>`,
  },
  gremio: {
    asunto: 'Orbbi — IA para las PYMEs de {{org}}',
    tipo: 'gremio',
    html: `<div style="font-family:'Georgia',serif;max-width:560px;margin:0 auto;padding:40px 24px;color:#141413;">
<p style="font-size:14px;color:#87867f;margin-bottom:32px;">Para: {{nombre}} · {{cargo}}, {{org}}</p>
<h1 style="font-size:26px;font-weight:400;letter-spacing:-0.5px;margin-bottom:24px;line-height:1.3;">
  Sus PYMEs asociadas merecen un gerente de IA 24/7
</h1>
<p style="font-size:15px;line-height:1.7;color:#5e5d59;margin-bottom:16px;">
  Estimado/a {{nombre}},
</p>
<p style="font-size:15px;line-height:1.7;color:#5e5d59;margin-bottom:16px;">
  Soy Juan Pablo Monsalvez, fundador de Orbbi. Lanzamos una plataforma de agentes de IA especializados para PYMEs en Latinoamérica — diseñada específicamente para empresas como las que {{org}} representa.
</p>
<p style="font-size:15px;line-height:1.7;color:#5e5d59;margin-bottom:16px;">
  En lugar de contratar consultores o usar herramientas genéricas, los empresarios acceden a 7 agentes especializados: Gerente General, Financiero, Ventas, Marketing, RRHH, Inventario y Cumplimiento. Todos operan con el contexto específico del negocio, disponibles 24/7.
</p>
<p style="font-size:15px;line-height:1.7;color:#5e5d59;margin-bottom:24px;">
  Planes desde <strong>$29 USD/mes</strong>. Demo gratuita sin registro.
</p>
<a href="https://www.orbbilatam.com/demo" style="display:inline-block;background:#141413;color:#faf9f5;padding:12px 24px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:500;">
  Ver demo en vivo →
</a>
<p style="font-size:14px;color:#87867f;margin-top:32px;line-height:1.6;">
  Si le parece relevante para los socios de {{org}}, me encantaría explorar una presentación o colaboración. Responda a este email.
</p>
<hr style="border:none;border-top:1px solid #e8e6dc;margin:32px 0;" />
<p style="font-size:12px;color:#b0aea5;">Orbbi — El agente que orbita tu negocio 24/7 · <a href="https://www.orbbilatam.com" style="color:#c6613f;">orbbilatam.com</a></p>
<p style="font-size:11px;color:#b0aea5;margin-top:8px;">Si no deseas recibir más información, responde con "dar de baja" y te eliminamos de inmediato.</p>
</div>`,
  },
  aceleradora: {
    asunto: 'Orbbi — IA para el portafolio de {{org}}',
    tipo: 'aceleradora',
    html: `<div style="font-family:'Georgia',serif;max-width:560px;margin:0 auto;padding:40px 24px;color:#141413;">
<p style="font-size:14px;color:#87867f;margin-bottom:32px;">Para: {{nombre}} · {{cargo}}, {{org}}</p>
<h1 style="font-size:26px;font-weight:400;letter-spacing:-0.5px;margin-bottom:24px;line-height:1.3;">
  ¿Qué pasaría si cada startup de {{org}} tuviera un equipo completo de gerentes IA?
</h1>
<p style="font-size:15px;line-height:1.7;color:#5e5d59;margin-bottom:16px;">
  Hola {{nombre}},
</p>
<p style="font-size:15px;line-height:1.7;color:#5e5d59;margin-bottom:16px;">
  Soy Juan Pablo Monsalvez, fundador de Orbbi — agentes de IA especializados para PYMEs en LATAM. Desarrollamos la plataforma pensando exactamente en los desafíos que enfrentan los founders en etapas tempranas: poca capacidad de contratar, decisiones urgentes, cero tiempo.
</p>
<p style="font-size:15px;line-height:1.7;color:#5e5d59;margin-bottom:16px;">
  Orbbi les da acceso a 7 agentes especializados (Finanzas, Ventas, Marketing, RRHH, y más) que conocen el contexto específico del negocio. Todo desde $29 USD/mes.
</p>
<p style="font-size:15px;line-height:1.7;color:#5e5d59;margin-bottom:24px;">
  ¿Podría ser un recurso útil para las empresas en programa de {{org}}?
</p>
<a href="https://www.orbbilatam.com/demo" style="display:inline-block;background:#141413;color:#faf9f5;padding:12px 24px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:500;">
  Explorar demo →
</a>
<p style="font-size:14px;color:#87867f;margin-top:32px;line-height:1.6;">
  Podemos coordinar una presentación o una integración como recurso para el portafolio. Responda a este correo.
</p>
<hr style="border:none;border-top:1px solid #e8e6dc;margin:32px 0;" />
<p style="font-size:12px;color:#b0aea5;">Orbbi · <a href="https://www.orbbilatam.com" style="color:#c6613f;">orbbilatam.com</a></p>
<p style="font-size:11px;color:#b0aea5;margin-top:8px;">Si no deseas recibir más información, responde con "dar de baja".</p>
</div>`,
  },
  medio: {
    asunto: 'Nota de prensa: Orbbi lanza agentes de IA para PYMEs en LATAM',
    tipo: 'medio',
    html: `<div style="font-family:'Georgia',serif;max-width:560px;margin:0 auto;padding:40px 24px;color:#141413;">
<p style="font-size:14px;color:#87867f;margin-bottom:32px;">Para: {{nombre}} · {{cargo}}, {{org}}</p>
<h1 style="font-size:26px;font-weight:400;letter-spacing:-0.5px;margin-bottom:24px;line-height:1.3;">
  Startup chilena lanza plataforma de IA para que PYMEs tengan gerentes especializados 24/7
</h1>
<p style="font-size:15px;line-height:1.7;color:#5e5d59;margin-bottom:16px;">
  Estimado/a {{nombre}},
</p>
<p style="font-size:15px;line-height:1.7;color:#5e5d59;margin-bottom:16px;">
  Le escribo desde Orbbi, una startup chilena que lanzó en abril de 2026 una plataforma de agentes de IA especializados para PYMEs latinoamericanas. La propuesta: democratizar el acceso a consultoría especializada en finanzas, ventas, marketing, RRHH e inventario — a una fracción del costo tradicional.
</p>
<p style="font-size:15px;line-height:1.7;color:#5e5d59;margin-bottom:16px;">
  <strong>Datos relevantes para cobertura:</strong>
</p>
<ul style="font-size:14px;line-height:1.8;color:#5e5d59;margin-bottom:16px;padding-left:20px;">
  <li>7 agentes especializados con IA Gemini 2.0 Flash de Google</li>
  <li>Contexto personalizado por empresa vía onboarding estructurado</li>
  <li>Disponible en 6 países de LATAM. Planes desde $29 USD/mes</li>
  <li>Demo gratuita sin necesidad de registro</li>
</ul>
<p style="font-size:15px;line-height:1.7;color:#5e5d59;margin-bottom:24px;">
  Con gusto agendo una entrevista o envío un kit de prensa completo.
</p>
<a href="https://www.orbbilatam.com/demo" style="display:inline-block;background:#141413;color:#faf9f5;padding:12px 24px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:500;">
  Ver demo →
</a>
<hr style="border:none;border-top:1px solid #e8e6dc;margin:32px 0;" />
<p style="font-size:13px;color:#87867f;">Juan Pablo Monsalvez · Fundador, Orbbi · jp@orbbilatam.com</p>
<p style="font-size:12px;color:#b0aea5;margin-top:8px;">Orbbi · <a href="https://www.orbbilatam.com" style="color:#c6613f;">orbbilatam.com</a></p>
</div>`,
  },
  empresa: {
    asunto: '¿Qué pasaría si {{org}} tuviera un gerente de IA 24/7?',
    tipo: 'empresa',
    html: `<div style="font-family:'Georgia',serif;max-width:560px;margin:0 auto;padding:40px 24px;color:#141413;">
<p style="font-size:14px;color:#87867f;margin-bottom:32px;">Para: {{nombre}} · {{cargo}}, {{org}}</p>
<h1 style="font-size:26px;font-weight:400;letter-spacing:-0.5px;margin-bottom:24px;line-height:1.3;">
  Sus decisiones de negocio merecen mejores datos
</h1>
<p style="font-size:15px;line-height:1.7;color:#5e5d59;margin-bottom:16px;">
  Estimado/a {{nombre}},
</p>
<p style="font-size:15px;line-height:1.7;color:#5e5d59;margin-bottom:16px;">
  Soy Juan Pablo Monsalvez, fundador de Orbbi. Construimos agentes de IA especializados para empresas como {{org}} — no un chatbot genérico, sino agentes que conocen su negocio en profundidad y pueden ayudar con finanzas, ventas, marketing y operaciones.
</p>
<p style="font-size:15px;line-height:1.7;color:#5e5d59;margin-bottom:16px;">
  La idea es simple: en lugar de esperar consultores o revisar reportes, usted o su equipo le pregunta directamente al agente lo que necesita saber — y recibe una respuesta basada en el contexto real de su empresa.
</p>
<p style="font-size:15px;line-height:1.7;color:#5e5d59;margin-bottom:24px;">
  <strong>Gratis para probar, sin tarjeta de crédito.</strong>
</p>
<a href="https://www.orbbilatam.com/demo" style="display:inline-block;background:#141413;color:#faf9f5;padding:12px 24px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:500;">
  Probar demo ahora →
</a>
<p style="font-size:14px;color:#87867f;margin-top:32px;line-height:1.6;">
  Si le interesa, con gusto agendo 20 minutos para mostrarle cómo funciona para un negocio como el suyo.
</p>
<hr style="border:none;border-top:1px solid #e8e6dc;margin:32px 0;" />
<p style="font-size:12px;color:#b0aea5;">Orbbi · <a href="https://www.orbbilatam.com" style="color:#c6613f;">orbbilatam.com</a></p>
<p style="font-size:11px;color:#b0aea5;margin-top:8px;">Si no deseas recibir más información, responde con "dar de baja".</p>
</div>`,
  },
}

const PAISES: Record<string, string> = { CL: '🇨🇱 Chile', MX: '🇲🇽 México', CO: '🇨🇴 Colombia', PE: '🇵🇪 Perú', AR: '🇦🇷 Argentina', UY: '🇺🇾 Uruguay' }
const TIPOS_ORG: Record<string, string> = { gremio: 'Gremio', camara: 'Cámara', aceleradora: 'Aceleradora', medio: 'Medio', gobierno: 'Gobierno', fondo: 'Fondo' }
const ESTADO_COLORS: Record<string, string> = { borrador: '#9b9a97', activa: '#2563eb', pausada: '#d97706', completada: '#16a34a' }

export default function EmailPage() {
  const router = useRouter()
  const [empresaId, setEmpresaId] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [tab, setTab] = useState<Tab>('campanas')
  const [cargando, setCargando] = useState(true)

  // Campañas
  const [campanas, setCampanas] = useState<Campana[]>([])
  const [modalCampana, setModalCampana] = useState(false)
  const [formCampana, setFormCampana] = useState({ nombre: '', tipo: 'gremio', asunto: '', cuerpo_html: '' })
  const [guardandoCampana, setGuardandoCampana] = useState(false)
  const [campanaSeleccionada, setCampanaSeleccionada] = useState<Campana | null>(null)

  // Prospectos
  const [prospectos, setProspectos] = useState<Prospecto[]>([])
  const [filtroPais, setFiltroPais] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('')
  const [seleccionados, setSeleccionados] = useState<Set<string>>(new Set())
  const [enviando, setEnviando] = useState(false)
  const [enviados, setEnviados] = useState<EmailEnviado[]>([])
  const [resultadoEnvio, setResultadoEnvio] = useState<{ enviados: number; fallidos: number; detalles: string[] } | null>(null)

  const cargarCampanas = useCallback(async (eid: string, tok: string) => {
    const res = await fetch(`/api/marketing/email-campaigns?empresa_id=${eid}`, {
      headers: { Authorization: `Bearer ${tok}` },
    })
    const data = await res.json()
    if (data.campanas) setCampanas(data.campanas)
  }, [])

  const cargarProspectos = useCallback(async (eid: string, tok: string) => {
    let url = `/api/marketing/email-campaigns?empresa_id=${eid}&tipo=prospectos`
    if (filtroPais) url += `&pais=${filtroPais}`
    if (filtroTipo) url += `&tipo_org=${filtroTipo}`
    const res = await fetch(url, { headers: { Authorization: `Bearer ${tok}` } })
    const data = await res.json()
    if (data.prospectos) setProspectos(data.prospectos)
  }, [filtroPais, filtroTipo])

  const cargarEnviados = useCallback(async (eid: string, tok: string, campana_id?: string) => {
    let url = `/api/marketing/email-campaigns?empresa_id=${eid}&tipo=enviados`
    if (campana_id) url += `&campana_id=${campana_id}`
    const res = await fetch(url, { headers: { Authorization: `Bearer ${tok}` } })
    const data = await res.json()
    if (data.enviados) setEnviados(data.enviados)
  }, [])

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data: { session } } = await supabase.auth.getSession()
      const tok = session?.access_token || ''
      setToken(tok)
      const { data: empresa } = await supabase.from('empresas').select('id').eq('user_id', user.id).single()
      if (empresa) {
        setEmpresaId(empresa.id)
        await cargarCampanas(empresa.id, tok)
      }
      setCargando(false)
    }
    init()
  }, [router, cargarCampanas])

  useEffect(() => {
    if (empresaId && token && tab === 'prospectos') {
      cargarProspectos(empresaId, token)
    }
  }, [tab, filtroPais, filtroTipo, empresaId, token, cargarProspectos])

  useEffect(() => {
    if (empresaId && token && campanaSeleccionada) {
      cargarEnviados(empresaId, token, campanaSeleccionada.id)
    }
  }, [campanaSeleccionada, empresaId, token, cargarEnviados])

  const crearCampana = async () => {
    if (!formCampana.nombre || !formCampana.asunto || !formCampana.cuerpo_html || !empresaId || !token) return
    setGuardandoCampana(true)
    try {
      const res = await fetch('/api/marketing/email-campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ empresa_id: empresaId, ...formCampana }),
      })
      const data = await res.json()
      if (data.campana) {
        setCampanas(prev => [data.campana, ...prev])
        setModalCampana(false)
        setFormCampana({ nombre: '', tipo: 'gremio', asunto: '', cuerpo_html: '' })
      }
    } finally {
      setGuardandoCampana(false)
    }
  }

  const usarPlantilla = (key: string) => {
    const p = PLANTILLAS[key]
    if (p) setFormCampana(prev => ({ ...prev, tipo: p.tipo, asunto: p.asunto, cuerpo_html: p.html }))
  }

  const toggleSeleccion = (id: string) => {
    setSeleccionados(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const seleccionarTodos = () => {
    if (seleccionados.size === prospectos.length) {
      setSeleccionados(new Set())
    } else {
      setSeleccionados(new Set(prospectos.map(p => p.id)))
    }
  }

  const enviarCampana = async () => {
    if (!campanaSeleccionada || seleccionados.size === 0 || !empresaId || !token) return
    setEnviando(true)
    setResultadoEnvio(null)
    try {
      const destinos = prospectos
        .filter(p => seleccionados.has(p.id))
        .map(p => ({
          prospecto_id: p.id,
          nombre: p.cargo_destinatario,
          cargo: p.cargo_destinatario,
          org: p.nombre,
          email: p.email,
          pais: p.pais,
          tipo_org: p.tipo,
        }))

      const res = await fetch('/api/marketing/email-send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ empresa_id: empresaId, campana_id: campanaSeleccionada.id, destinatarios: destinos }),
      })
      const data = await res.json()
      setResultadoEnvio(data)
      setSeleccionados(new Set())
      await cargarCampanas(empresaId, token)
      await cargarEnviados(empresaId, token, campanaSeleccionada.id)
    } finally {
      setEnviando(false)
    }
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
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/marketing')} className="text-[#9b9a97] hover:text-[#37352f] text-sm">←</button>
            <div>
              <h1 className="text-2xl font-semibold text-[#1a1a1a]" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                Campañas de Email
              </h1>
              <p className="text-sm text-[#6b6b6b]">Outreach corporativo a gremios, cámaras y medios en LATAM</p>
            </div>
          </div>
          {tab === 'campanas' && (
            <button
              onClick={() => setModalCampana(true)}
              className="px-4 py-2 bg-[#c6613f] text-white rounded-lg text-sm font-medium hover:bg-[#b5522f] transition-colors"
            >
              + Nueva campaña
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-[#e5e5e0]">
          {(['campanas', 'prospectos', 'plantillas'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                tab === t ? 'border-[#c6613f] text-[#c6613f]' : 'border-transparent text-[#9b9a97] hover:text-[#37352f]'
              }`}
            >
              {t === 'campanas' ? 'Campañas' : t === 'prospectos' ? 'Prospectos LATAM' : 'Plantillas'}
            </button>
          ))}
        </div>

        {/* ── TAB: CAMPAÑAS ── */}
        {tab === 'campanas' && (
          <div>
            {campanas.length === 0 ? (
              <div className="bg-white border border-dashed border-[#e5e5e0] rounded-xl p-12 text-center">
                <p className="text-sm text-[#9b9a97] mb-3">Sin campañas todavía</p>
                <button
                  onClick={() => setModalCampana(true)}
                  className="text-sm text-[#c6613f] hover:underline"
                >
                  Crear primera campaña →
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                {campanas.map(c => (
                  <div key={c.id} className="bg-white border border-[#e5e5e0] rounded-xl p-5 hover:border-[#c6613f]/40 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-semibold text-[#37352f]">{c.nombre}</h3>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-[#f0f0ee]" style={{ color: ESTADO_COLORS[c.estado] || '#9b9a97' }}>
                            {c.estado}
                          </span>
                          <span className="text-xs text-[#9b9a97] capitalize">{TIPOS_ORG[c.tipo] || c.tipo}</span>
                        </div>
                        <p className="text-xs text-[#6b6b6b]">Asunto: {c.asunto}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => { setCampanaSeleccionada(c); setTab('prospectos') }}
                          className="text-xs px-3 py-1.5 bg-[#c6613f] text-white rounded-lg hover:bg-[#b5522f] transition-colors"
                        >
                          Enviar
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-3 mt-4">
                      {[
                        { label: 'Enviados', value: c.total_enviados },
                        { label: 'Abiertos', value: c.total_abiertos },
                        { label: 'Clicks', value: c.total_clicks },
                        { label: 'Rebotes', value: c.total_rebotes },
                      ].map(s => (
                        <div key={s.label} className="bg-[#fafafa] rounded-lg p-3">
                          <p className="text-lg font-semibold text-[#1a1a1a]">{s.value}</p>
                          <p className="text-[11px] text-[#9b9a97]">{s.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Enviados detail */}
                    {campanaSeleccionada?.id === c.id && enviados.length > 0 && (
                      <div className="mt-4 border-t border-[#f0f0ee] pt-4">
                        <p className="text-xs font-medium text-[#37352f] mb-2">Últimos envíos</p>
                        <div className="space-y-1 max-h-40 overflow-y-auto">
                          {enviados.slice(0, 20).map(e => (
                            <div key={e.id} className="flex items-center justify-between text-xs text-[#6b6b6b]">
                              <span>{e.destinatario_nombre} · {e.destinatario_org}</span>
                              <span className={e.estado === 'enviado' ? 'text-[#16a34a]' : e.estado === 'rebotado' ? 'text-[#dc2626]' : 'text-[#9b9a97]'}>
                                {e.estado}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TAB: PROSPECTOS LATAM ── */}
        {tab === 'prospectos' && (
          <div>
            {/* Campaign selector */}
            {campanas.length > 0 && (
              <div className="bg-white border border-[#e5e5e0] rounded-xl p-4 mb-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <div>
                    <label className="block text-xs text-[#9b9a97] mb-1">Campaña para envío</label>
                    <select
                      value={campanaSeleccionada?.id || ''}
                      onChange={e => setCampanas(prev => {
                        const c = prev.find(x => x.id === e.target.value) || null
                        setCampanaSeleccionada(c)
                        return prev
                      })}
                      className="border border-[#e5e5e0] rounded-lg px-3 py-1.5 text-sm text-[#37352f] focus:outline-none focus:border-[#c6613f]"
                    >
                      <option value="">— Seleccionar campaña —</option>
                      {campanas.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-[#9b9a97] mb-1">País</label>
                    <select
                      value={filtroPais}
                      onChange={e => setFiltroPais(e.target.value)}
                      className="border border-[#e5e5e0] rounded-lg px-3 py-1.5 text-sm text-[#37352f] focus:outline-none focus:border-[#c6613f]"
                    >
                      <option value="">Todos</option>
                      {Object.entries(PAISES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-[#9b9a97] mb-1">Tipo</label>
                    <select
                      value={filtroTipo}
                      onChange={e => setFiltroTipo(e.target.value)}
                      className="border border-[#e5e5e0] rounded-lg px-3 py-1.5 text-sm text-[#37352f] focus:outline-none focus:border-[#c6613f]"
                    >
                      <option value="">Todos</option>
                      {Object.entries(TIPOS_ORG).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                  </div>
                  {seleccionados.size > 0 && campanaSeleccionada && (
                    <button
                      onClick={enviarCampana}
                      disabled={enviando}
                      className="ml-auto px-4 py-2 bg-[#c6613f] text-white rounded-lg text-sm font-medium hover:bg-[#b5522f] disabled:opacity-50 transition-colors"
                    >
                      {enviando ? 'Enviando...' : `Enviar a ${seleccionados.size} seleccionados`}
                    </button>
                  )}
                </div>
              </div>
            )}

            {campanas.length === 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4 text-sm text-amber-800">
                Crea una campaña primero en la pestaña <strong>Campañas</strong>, luego vuelve aquí para enviar.
              </div>
            )}

            {/* Send result */}
            {resultadoEnvio && (
              <div className="bg-white border border-[#e5e5e0] rounded-xl p-4 mb-4">
                <p className="text-sm font-medium text-[#37352f] mb-2">Resultado del envío</p>
                <p className="text-sm text-[#16a34a]">✓ {resultadoEnvio.enviados} enviados</p>
                {resultadoEnvio.fallidos > 0 && <p className="text-sm text-[#dc2626]">✗ {resultadoEnvio.fallidos} fallidos</p>}
                <div className="mt-2 max-h-24 overflow-y-auto">
                  {resultadoEnvio.detalles.map((d, i) => (
                    <p key={i} className="text-xs text-[#9b9a97]">{d}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Prospectos table */}
            <div className="bg-white border border-[#e5e5e0] rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-[#fafafa] border-b border-[#f0f0ee]">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={seleccionados.size === prospectos.length && prospectos.length > 0}
                    onChange={seleccionarTodos}
                    className="rounded"
                  />
                  <span className="text-xs text-[#9b9a97]">{prospectos.length} prospectos · {seleccionados.size} seleccionados</span>
                </div>
              </div>

              {prospectos.length === 0 ? (
                <div className="p-10 text-center text-sm text-[#9b9a97]">
                  Cargando prospectos… Si la tabla está vacía, ejecuta la migración 004 en Supabase.
                </div>
              ) : (
                <div className="divide-y divide-[#f0f0ee]">
                  {prospectos.map(p => (
                    <div
                      key={p.id}
                      className={`flex items-center gap-3 px-4 py-3 hover:bg-[#fafafa] transition-colors cursor-pointer ${seleccionados.has(p.id) ? 'bg-orange-50' : ''}`}
                      onClick={() => toggleSeleccion(p.id)}
                    >
                      <input
                        type="checkbox"
                        checked={seleccionados.has(p.id)}
                        onChange={() => toggleSeleccion(p.id)}
                        onClick={e => e.stopPropagation()}
                        className="rounded shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[#37352f] truncate">{p.nombre}</span>
                          <span className="text-[10px] text-[#9b9a97] shrink-0">{PAISES[p.pais] || p.pais}</span>
                          <span className="text-[10px] px-1.5 py-0.5 bg-[#f0f0ee] rounded text-[#6b6b6b] shrink-0">{TIPOS_ORG[p.tipo] || p.tipo}</span>
                        </div>
                        <p className="text-xs text-[#9b9a97] truncate">{p.cargo_destinatario} · {p.email}</p>
                      </div>
                      {p.pymnes_aprox > 0 && (
                        <span className="text-xs text-[#c6613f] shrink-0">{p.pymnes_aprox.toLocaleString()} PYMEs</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB: PLANTILLAS ── */}
        {tab === 'plantillas' && (
          <div className="grid gap-4">
            {Object.entries(PLANTILLAS).map(([key, p]) => (
              <div key={key} className="bg-white border border-[#e5e5e0] rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-[#37352f] capitalize">{TIPOS_ORG[key] || key}</h3>
                    <p className="text-xs text-[#9b9a97] mt-0.5">Asunto: {p.asunto}</p>
                  </div>
                  <button
                    onClick={() => {
                      usarPlantilla(key)
                      setModalCampana(true)
                    }}
                    className="text-xs px-3 py-1.5 border border-[#c6613f] text-[#c6613f] rounded-lg hover:bg-[#c6613f] hover:text-white transition-colors"
                  >
                    Usar plantilla
                  </button>
                </div>
                <div
                  className="text-xs text-[#6b6b6b] border border-[#f0f0ee] rounded-lg p-3 max-h-32 overflow-hidden relative"
                  dangerouslySetInnerHTML={{ __html: p.html }}
                />
                <p className="text-[10px] text-[#9b9a97] mt-2">Variables: {'{{nombre}}'} · {'{{cargo}}'} · {'{{org}}'} · {'{{pais}}'}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal nueva campaña */}
      {modalCampana && (
        <div className="fixed inset-0 bg-black/40 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl my-8">
            <h3 className="text-base font-semibold text-[#37352f] mb-4">Nueva campaña de email</h3>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#6b6b6b] mb-1">Nombre de la campaña *</label>
                  <input
                    type="text"
                    value={formCampana.nombre}
                    onChange={e => setFormCampana(p => ({ ...p, nombre: e.target.value }))}
                    placeholder="Ej: Outreach gremios Chile Abril 2026"
                    className="w-full border border-[#e5e5e0] rounded-lg px-3 py-1.5 text-sm text-[#37352f] focus:outline-none focus:border-[#c6613f]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#6b6b6b] mb-1">Tipo de destinatario</label>
                  <select
                    value={formCampana.tipo}
                    onChange={e => setFormCampana(p => ({ ...p, tipo: e.target.value }))}
                    className="w-full border border-[#e5e5e0] rounded-lg px-3 py-1.5 text-sm text-[#37352f] focus:outline-none focus:border-[#c6613f]"
                  >
                    {Object.entries(TIPOS_ORG).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-[#6b6b6b]">Asunto *</label>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => usarPlantilla('universal')}
                      className="text-[10px] px-2 py-0.5 bg-[#c6613f] rounded text-white hover:bg-[#b5522f] transition-colors font-medium"
                    >
                      ★ Universal (recomendado)
                    </button>
                    {Object.keys(PLANTILLAS).filter(k => k !== 'universal').map(k => (
                      <button
                        key={k}
                        onClick={() => usarPlantilla(k)}
                        className="text-[10px] px-2 py-0.5 bg-[#f0f0ee] rounded text-[#6b6b6b] hover:bg-[#e5e5e0] transition-colors"
                      >
                        {TIPOS_ORG[k]}
                      </button>
                    ))}
                  </div>
                </div>
                <input
                  type="text"
                  value={formCampana.asunto}
                  onChange={e => setFormCampana(p => ({ ...p, asunto: e.target.value }))}
                  placeholder="Usa {{org}}, {{nombre}} para personalizar"
                  className="w-full border border-[#e5e5e0] rounded-lg px-3 py-1.5 text-sm text-[#37352f] focus:outline-none focus:border-[#c6613f]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#6b6b6b] mb-1">Cuerpo HTML *</label>
                <textarea
                  value={formCampana.cuerpo_html}
                  onChange={e => setFormCampana(p => ({ ...p, cuerpo_html: e.target.value }))}
                  rows={10}
                  placeholder="HTML del email. Variables disponibles: {{nombre}}, {{cargo}}, {{org}}, {{pais}}"
                  className="w-full border border-[#e5e5e0] rounded-lg px-3 py-2 text-xs font-mono text-[#37352f] focus:outline-none focus:border-[#c6613f] resize-y"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => { setModalCampana(false); setFormCampana({ nombre: '', tipo: 'gremio', asunto: '', cuerpo_html: '' }) }}
                className="flex-1 py-2 border border-[#e5e5e0] rounded-lg text-sm text-[#9b9a97] hover:bg-[#f7f6f3]"
              >
                Cancelar
              </button>
              <button
                onClick={crearCampana}
                disabled={guardandoCampana || !formCampana.nombre || !formCampana.asunto || !formCampana.cuerpo_html}
                className="flex-1 py-2 bg-[#c6613f] text-white rounded-lg text-sm font-medium hover:bg-[#b5522f] disabled:opacity-50"
              >
                {guardandoCampana ? 'Guardando...' : 'Guardar campaña'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
