'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase-client'
import { authFetch } from '@/lib/auth-fetch'
import { Tarea } from '@/types/database'
import type { TipoAgente } from '@/lib/prompts'
import { AGENTES } from '@/lib/prompts'

const AGENTE_LABELS: Record<string, string> = {
  general: 'Gerente General',
  financiero: 'Financiero',
  ventas: 'Ventas',
  marketing: 'Marketing',
  rrhh: 'RRHH',
  inventario: 'Inventario',
  legal: 'Legal',
}

const PRIORIDAD_BADGE: Record<string, { bg: string; text: string; label: string }> = {
  alta: { bg: 'bg-red-500/15', text: 'text-red-400', label: 'Alta' },
  media: { bg: 'bg-yellow-500/15', text: 'text-yellow-400', label: 'Media' },
  baja: { bg: 'bg-green-500/15', text: 'text-green-400', label: 'Baja' },
}

type EstadoVisible = 'pendiente' | 'en_progreso' | 'completada'

const COLUMNAS: { estado: EstadoVisible; titulo: string }[] = [
  { estado: 'pendiente', titulo: 'Pendientes' },
  { estado: 'en_progreso', titulo: 'En progreso' },
  { estado: 'completada', titulo: 'Completadas' },
]

const NEXT_ESTADO: Record<EstadoVisible, EstadoVisible> = {
  pendiente: 'en_progreso',
  en_progreso: 'completada',
  completada: 'pendiente',
}

export default function TareasPage() {
  const [tareas, setTareas] = useState<Tarea[]>([])
  const [empresaId, setEmpresaId] = useState<string>('')
  const [cargando, setCargando] = useState(true)
  const [filtroAgente, setFiltroAgente] = useState<string>('todos')

  const cargarTareas = useCallback(async (empId: string) => {
    const { data } = await supabase
      .from('tareas')
      .select('*')
      .eq('empresa_id', empId)
      .neq('estado', 'descartada')
      .order('created_at', { ascending: false })

    if (data) setTareas(data as Tarea[])
  }, [])

  useEffect(() => {
    const init = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data: empresa } = await supabase
          .from('empresas')
          .select('id')
          .eq('user_id', user.id)
          .single()

        if (!empresa) return
        setEmpresaId(empresa.id)
        await cargarTareas(empresa.id)
      } finally {
        setCargando(false)
      }
    }
    init()
  }, [cargarTareas])

  const actualizarEstado = async (tareaId: string, nuevoEstado: string) => {
    await authFetch(`/api/tareas/${tareaId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: nuevoEstado }),
    })
    setTareas(prev =>
      prev.map(t => t.id === tareaId ? { ...t, estado: nuevoEstado as Tarea['estado'] } : t)
    )
  }

  const descartarTarea = async (tareaId: string) => {
    await fetch(`/api/tareas/${tareaId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: 'descartada' }),
    })
    setTareas(prev => prev.filter(t => t.id !== tareaId))
  }

  const eliminarTarea = async (tareaId: string) => {
    await authFetch(`/api/tareas/${tareaId}`, { method: 'DELETE' })
    setTareas(prev => prev.filter(t => t.id !== tareaId))
  }

  const tareasFiltradas = filtroAgente === 'todos'
    ? tareas
    : tareas.filter(t => t.agente_tipo === filtroAgente)

  // Get unique agent types that have tasks
  const agentesConTareas = [...new Set(tareas.map(t => t.agente_tipo))]

  if (cargando) {
    return (
      <div className="flex h-screen items-center justify-center bg-obsidian">
        <div className="animate-spin rounded-full h-6 w-6 border-b border-ceniza" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-obsidian text-white p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-[22px] font-light tracking-[-0.3px]">Tareas</h1>
            <p className="text-[13px] text-ceniza/50 mt-1">
              Acciones recomendadas por tus agentes
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Filter by agent */}
            <select
              value={filtroAgente}
              onChange={e => setFiltroAgente(e.target.value)}
              className="bg-white/[0.06] border border-white/[0.08] rounded-lg px-3 py-2 text-[12px] text-white/80
                         outline-none focus:border-white/[0.15] transition-colors appearance-none cursor-pointer"
            >
              <option value="todos">Todos los agentes</option>
              {agentesConTareas.map(tipo => (
                <option key={tipo} value={tipo}>
                  {AGENTE_LABELS[tipo] || tipo}
                </option>
              ))}
            </select>

            {/* Back to chat */}
            <a
              href="/chat"
              className="text-[11px] text-ceniza/50 hover:text-white/80 transition-colors
                         bg-white/[0.04] border border-white/[0.06] px-3 py-2 rounded-lg"
            >
              Volver al chat
            </a>
          </div>
        </div>

        {/* Empty state */}
        {tareas.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-ceniza/20 mb-4">
              <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-[14px] text-ceniza/40">No hay tareas pendientes</p>
            <p className="text-[12px] text-ceniza/30 mt-1">Las tareas se crean cuando tus agentes hacen recomendaciones</p>
          </div>
        )}

        {/* Kanban columns */}
        {tareas.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {COLUMNAS.map(col => {
              const columnTareas = tareasFiltradas.filter(t => t.estado === col.estado)
              return (
                <div key={col.estado} className="flex flex-col">
                  {/* Column header */}
                  <div className="flex items-center justify-between mb-3 px-1">
                    <h2 className="text-[13px] font-medium text-white/70">{col.titulo}</h2>
                    <span className="text-[11px] text-ceniza/40 bg-white/[0.04] px-2 py-0.5 rounded-full">
                      {columnTareas.length}
                    </span>
                  </div>

                  {/* Cards */}
                  <div className="space-y-2 flex-1">
                    {columnTareas.length === 0 && (
                      <div className="border border-dashed border-white/[0.06] rounded-xl p-6 text-center">
                        <p className="text-[11px] text-ceniza/30">Sin tareas</p>
                      </div>
                    )}

                    {columnTareas.map(tarea => {
                      const prio = PRIORIDAD_BADGE[tarea.prioridad] || PRIORIDAD_BADGE.media
                      return (
                        <div
                          key={tarea.id}
                          className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.1] transition-colors group"
                        >
                          {/* Priority + Agent */}
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full ${prio.bg} ${prio.text}`}>
                              {prio.label}
                            </span>
                            <span className="text-[10px] text-ceniza/40">
                              {AGENTE_LABELS[tarea.agente_tipo] || tarea.agente_tipo}
                            </span>
                          </div>

                          {/* Title */}
                          <p className="text-[13px] text-white/85 leading-snug mb-2">{tarea.titulo}</p>

                          {/* Description */}
                          {tarea.descripcion && (
                            <p className="text-[11px] text-ceniza/50 leading-relaxed mb-3 line-clamp-2">
                              {tarea.descripcion}
                            </p>
                          )}

                          {/* Deadline */}
                          {tarea.fecha_limite && (
                            <p className="text-[10px] text-ceniza/40 mb-3">
                              Fecha límite: {new Date(tarea.fecha_limite).toLocaleDateString('es-CL', { day: 'numeric', month: 'short' })}
                            </p>
                          )}

                          {/* Actions */}
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => actualizarEstado(tarea.id, NEXT_ESTADO[tarea.estado as EstadoVisible])}
                              className="text-[10px] text-señal hover:text-señal/80 bg-señal/10 hover:bg-señal/15 px-2.5 py-1 rounded-md transition-colors"
                            >
                              {tarea.estado === 'pendiente' && 'Iniciar'}
                              {tarea.estado === 'en_progreso' && 'Completar'}
                              {tarea.estado === 'completada' && 'Reabrir'}
                            </button>
                            <button
                              onClick={() => descartarTarea(tarea.id)}
                              className="text-[10px] text-ceniza/30 hover:text-ceniza/60 transition-colors opacity-0 group-hover:opacity-100"
                            >
                              Descartar
                            </button>
                            <button
                              onClick={() => eliminarTarea(tarea.id)}
                              className="text-[10px] text-red-400/30 hover:text-red-400/60 transition-colors opacity-0 group-hover:opacity-100"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
