'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'
import { AGENTES, TipoAgente } from '@/lib/prompts'

// ── Types ──────────────────────────────────────────────────────────

interface DashboardData {
  empresaNombre: string
  diasDesdeRegistro: number
  totalConversaciones: number
  totalMensajes: number
  agenteMasUsado: TipoAgente | null
  mensajesPorDia: { fecha: string; cantidad: number }[]
  usoPorAgente: { agente: TipoAgente; cantidad: number }[]
  conversacionesRecientes: {
    id: string
    titulo: string
    agente_tipo: TipoAgente
    created_at: string
  }[]
}

// ── Animated counter ───────────────────────────────────────────────

function AnimatedNumber({ value, duration = 800 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<number | null>(null)

  useEffect(() => {
    const start = performance.now()
    const from = 0
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      setDisplay(Math.round(from + (value - from) * eased))
      if (progress < 1) ref.current = requestAnimationFrame(step)
    }
    ref.current = requestAnimationFrame(step)
    return () => { if (ref.current) cancelAnimationFrame(ref.current) }
  }, [value, duration])

  return <>{display.toLocaleString('es-CL')}</>
}

// ── Agent labels & colors ──────────────────────────────────────────

const AGENTE_LABELS: Record<TipoAgente, string> = {
  general: 'Gerente General',
  financiero: 'Financiero',
  ventas: 'Ventas',
  marketing: 'Marketing',
  rrhh: 'RRHH',
  inventario: 'Inventario',
  legal: 'Cumplimiento',
}

const AGENTE_COLORS: Record<TipoAgente, string> = {
  general: '#d97757',
  financiero: '#5b9bd5',
  ventas: '#70c1b3',
  marketing: '#f4a261',
  rrhh: '#e76f51',
  inventario: '#8ecae6',
  legal: '#b5838d',
}

const AGENTE_TAGS: Record<TipoAgente, string> = {
  general: 'GM',
  financiero: 'FIN',
  ventas: 'VEN',
  marketing: 'MKT',
  rrhh: 'RRHH',
  inventario: 'INV',
  legal: 'LEG',
}

// ── Dashboard page ─────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      // Get empresa
      const { data: empresa } = await supabase
        .from('empresas')
        .select('id, nombre, created_at')
        .eq('user_id', user.id)
        .single()

      if (!empresa) { router.push('/onboarding'); return }

      const empresaId = empresa.id
      const diasDesdeRegistro = Math.floor(
        (Date.now() - new Date(empresa.created_at).getTime()) / (1000 * 60 * 60 * 24)
      )

      // Fetch conversations
      const { data: conversaciones } = await supabase
        .from('conversaciones')
        .select('id, titulo, agente_tipo, created_at')
        .eq('empresa_id', empresaId)
        .order('created_at', { ascending: false })

      const allConvs = conversaciones || []

      // Count usage per agent
      const agentCounts: Partial<Record<TipoAgente, number>> = {}
      for (const c of allConvs) {
        agentCounts[c.agente_tipo as TipoAgente] = (agentCounts[c.agente_tipo as TipoAgente] || 0) + 1
      }
      const usoPorAgente = Object.entries(agentCounts)
        .map(([agente, cantidad]) => ({ agente: agente as TipoAgente, cantidad }))
        .sort((a, b) => b.cantidad - a.cantidad)

      const agenteMasUsado = usoPorAgente.length > 0 ? usoPorAgente[0].agente : null

      // Get conversation IDs for message queries
      const convIds = allConvs.map(c => c.id)

      // Count total messages
      let totalMensajes = 0
      const mensajesPorDia: { fecha: string; cantidad: number }[] = []

      if (convIds.length > 0) {
        const { count } = await supabase
          .from('mensajes')
          .select('*', { count: 'exact', head: true })
          .in('conversacion_id', convIds)

        totalMensajes = count || 0

        // Messages per day (last 14 days)
        const hace14Dias = new Date()
        hace14Dias.setDate(hace14Dias.getDate() - 14)

        const { data: mensajes } = await supabase
          .from('mensajes')
          .select('created_at')
          .in('conversacion_id', convIds)
          .gte('created_at', hace14Dias.toISOString())
          .order('created_at', { ascending: true })

        // Aggregate by day
        const dayCounts: Record<string, number> = {}
        for (let i = 0; i < 14; i++) {
          const d = new Date()
          d.setDate(d.getDate() - 13 + i)
          dayCounts[d.toISOString().split('T')[0]] = 0
        }
        for (const m of (mensajes || [])) {
          const day = m.created_at.split('T')[0]
          if (day in dayCounts) dayCounts[day]++
        }
        for (const [fecha, cantidad] of Object.entries(dayCounts)) {
          mensajesPorDia.push({ fecha, cantidad })
        }
        mensajesPorDia.sort((a, b) => a.fecha.localeCompare(b.fecha))
      } else {
        // Fill 14 empty days
        for (let i = 0; i < 14; i++) {
          const d = new Date()
          d.setDate(d.getDate() - 13 + i)
          mensajesPorDia.push({ fecha: d.toISOString().split('T')[0], cantidad: 0 })
        }
      }

      setData({
        empresaNombre: empresa.nombre,
        diasDesdeRegistro,
        totalConversaciones: allConvs.length,
        totalMensajes,
        agenteMasUsado,
        mensajesPorDia,
        usoPorAgente,
        conversacionesRecientes: allConvs.slice(0, 5),
      })
    } catch (err) {
      console.error('Error loading dashboard:', err)
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => { fetchData() }, [fetchData])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-obsidian">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-señal" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center bg-obsidian">
        <p className="text-white/60 text-sm">No se pudieron cargar los datos.</p>
      </div>
    )
  }

  const maxMensajes = Math.max(...data.mensajesPorDia.map(d => d.cantidad), 1)
  const totalAgentUse = data.usoPorAgente.reduce((sum, a) => sum + a.cantidad, 0)

  return (
    <div className="min-h-screen bg-obsidian text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1
              className="text-3xl font-normal tracking-tight"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
            >
              Panel de control
            </h1>
            <p className="text-sm text-white/50 mt-1">{data.empresaNombre}</p>
          </div>
          <button
            onClick={() => router.push('/chat')}
            className="text-sm bg-señal/90 hover:bg-señal text-white px-4 py-2 rounded-lg transition-colors"
          >
            Ir al chat
          </button>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Conversaciones" value={<AnimatedNumber value={data.totalConversaciones} />} />
          <StatCard label="Mensajes totales" value={<AnimatedNumber value={data.totalMensajes} />} />
          <StatCard
            label="Agente top"
            value={data.agenteMasUsado ? AGENTE_LABELS[data.agenteMasUsado] : '—'}
            isText
          />
          <StatCard
            label="Dias desde registro"
            value={<AnimatedNumber value={data.diasDesdeRegistro} />}
          />
        </div>

        {/* Charts row */}
        <div className="grid lg:grid-cols-3 gap-4 mb-8">

          {/* Activity chart — messages per day */}
          <div className="lg:col-span-2 bg-white/[0.03] border border-white/[0.04] rounded-xl p-5">
            <h2
              className="text-sm font-medium text-white/70 mb-4"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
            >
              Actividad (ultimos 14 dias)
            </h2>
            <div className="h-48">
              <svg viewBox={`0 0 ${data.mensajesPorDia.length * 40} 180`} className="w-full h-full" preserveAspectRatio="none">
                {data.mensajesPorDia.map((d, i) => {
                  const barH = maxMensajes > 0 ? (d.cantidad / maxMensajes) * 140 : 0
                  const x = i * 40 + 8
                  return (
                    <g key={d.fecha}>
                      {/* Bar */}
                      <rect
                        x={x}
                        y={150 - barH}
                        width={24}
                        height={Math.max(barH, 2)}
                        rx={4}
                        fill={d.cantidad > 0 ? '#d97757' : 'rgba(255,255,255,0.06)'}
                        opacity={d.cantidad > 0 ? 0.85 : 1}
                      />
                      {/* Day label */}
                      <text
                        x={x + 12}
                        y={170}
                        textAnchor="middle"
                        fill="rgba(255,255,255,0.3)"
                        fontSize="9"
                        fontFamily="Inter, sans-serif"
                      >
                        {new Date(d.fecha + 'T12:00:00').toLocaleDateString('es-CL', { day: 'numeric' })}
                      </text>
                      {/* Count on top */}
                      {d.cantidad > 0 && (
                        <text
                          x={x + 12}
                          y={150 - barH - 6}
                          textAnchor="middle"
                          fill="rgba(255,255,255,0.5)"
                          fontSize="9"
                          fontFamily="Inter, sans-serif"
                        >
                          {d.cantidad}
                        </text>
                      )}
                    </g>
                  )
                })}
              </svg>
            </div>
          </div>

          {/* Donut chart — agent usage */}
          <div className="bg-white/[0.03] border border-white/[0.04] rounded-xl p-5">
            <h2
              className="text-sm font-medium text-white/70 mb-4"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
            >
              Uso por agente
            </h2>
            {data.usoPorAgente.length === 0 ? (
              <p className="text-xs text-white/30 text-center mt-12">Sin datos aun</p>
            ) : (
              <div className="flex flex-col items-center">
                <svg viewBox="0 0 120 120" className="w-32 h-32 mb-4">
                  {(() => {
                    let cumAngle = -90
                    const radius = 45
                    const cx = 60
                    const cy = 60
                    return data.usoPorAgente.map((a) => {
                      const pct = a.cantidad / totalAgentUse
                      const angle = pct * 360
                      const startAngle = cumAngle
                      cumAngle += angle
                      const endAngle = cumAngle

                      const startRad = (startAngle * Math.PI) / 180
                      const endRad = (endAngle * Math.PI) / 180
                      const largeArc = angle > 180 ? 1 : 0
                      const x1 = cx + radius * Math.cos(startRad)
                      const y1 = cy + radius * Math.sin(startRad)
                      const x2 = cx + radius * Math.cos(endRad)
                      const y2 = cy + radius * Math.sin(endRad)

                      // For single item, draw full circle
                      if (data.usoPorAgente.length === 1) {
                        return (
                          <circle key={a.agente} cx={cx} cy={cy} r={radius}
                            fill="none" stroke={AGENTE_COLORS[a.agente]} strokeWidth="18" />
                        )
                      }

                      return (
                        <path
                          key={a.agente}
                          d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`}
                          fill="none"
                          stroke={AGENTE_COLORS[a.agente]}
                          strokeWidth="18"
                          strokeLinecap="butt"
                        />
                      )
                    })
                  })()}
                  {/* Inner circle for donut */}
                  <circle cx="60" cy="60" r="30" fill="#1a1a19" />
                  <text x="60" y="64" textAnchor="middle" fill="white" fontSize="14" fontFamily="Inter, sans-serif" fontWeight="600">
                    {totalAgentUse}
                  </text>
                </svg>
                <div className="space-y-1.5 w-full">
                  {data.usoPorAgente.map((a) => (
                    <div key={a.agente} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: AGENTE_COLORS[a.agente] }}
                        />
                        <span className="text-white/70">{AGENTE_LABELS[a.agente]}</span>
                      </div>
                      <span className="text-white/40">
                        {Math.round((a.cantidad / totalAgentUse) * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid lg:grid-cols-2 gap-4">

          {/* Recent conversations */}
          <div className="bg-white/[0.03] border border-white/[0.04] rounded-xl p-5">
            <h2
              className="text-sm font-medium text-white/70 mb-4"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
            >
              Conversaciones recientes
            </h2>
            {data.conversacionesRecientes.length === 0 ? (
              <p className="text-xs text-white/30 text-center mt-8">Ninguna conversacion aun</p>
            ) : (
              <div className="space-y-2">
                {data.conversacionesRecientes.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => router.push(`/chat/${c.id}`)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/[0.04] transition-colors text-left group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-white/[0.06] text-señal shrink-0">
                        {AGENTE_TAGS[c.agente_tipo] || 'GM'}
                      </span>
                      <span className="text-sm text-white/70 group-hover:text-white truncate">
                        {c.titulo}
                      </span>
                    </div>
                    <span className="text-[10px] text-white/30 shrink-0 ml-3">
                      {new Date(c.created_at).toLocaleDateString('es-CL', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick actions */}
          <div className="bg-white/[0.03] border border-white/[0.04] rounded-xl p-5">
            <h2
              className="text-sm font-medium text-white/70 mb-4"
              style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
            >
              Nueva conversacion
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {AGENTES.map((a) => (
                <button
                  key={a.tipo}
                  onClick={() => router.push(`/chat?agente=${a.tipo}`)}
                  className="flex items-center gap-2.5 px-3 py-3 rounded-lg border border-white/[0.04] hover:border-señal/30 hover:bg-white/[0.04] transition-all text-left group"
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: AGENTE_COLORS[a.tipo] }}
                  />
                  <div className="min-w-0">
                    <p className="text-xs text-white/80 group-hover:text-white font-medium truncate">
                      {a.nombre}
                    </p>
                    <p className="text-[10px] text-white/30 truncate">{a.rol}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Stat card component ────────────────────────────────────────────

function StatCard({
  label,
  value,
  isText = false,
}: {
  label: string
  value: React.ReactNode
  isText?: boolean
}) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.04] rounded-xl p-5">
      <p className="text-[11px] text-white/40 uppercase tracking-wider mb-2">{label}</p>
      <p
        className={`${isText ? 'text-lg' : 'text-3xl'} font-semibold text-white tracking-tight`}
        style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
      >
        {value}
      </p>
    </div>
  )
}
