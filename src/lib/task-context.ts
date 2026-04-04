import { createClient } from '@supabase/supabase-js'

const AGENTE_NOMBRES: Record<string, string> = {
  general: 'Gerente General',
  financiero: 'Agente Financiero',
  ventas: 'Agente de Ventas',
  marketing: 'Agente de Marketing',
  rrhh: 'Agente de RRHH',
  inventario: 'Agente de Inventario',
  legal: 'Agente de Cumplimiento',
}

function timeAgo(dateStr: string): string {
  const now = new Date()
  const date = new Date(dateStr)
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'hoy'
  if (diffDays === 1) return 'ayer'
  if (diffDays < 7) return `hace ${diffDays} días`
  if (diffDays < 30) return `hace ${Math.floor(diffDays / 7)} semanas`
  return `hace ${Math.floor(diffDays / 30)} meses`
}

/** Simple time-based cache to avoid hitting DB on every request */
const taskCache = new Map<string, { data: string; timestamp: number }>()
const TASK_CACHE_TTL = 60000 // 1 minute

export async function buildTaskContext(empresaId: string): Promise<string> {
  const cached = taskCache.get(empresaId)
  if (cached && Date.now() - cached.timestamp < TASK_CACHE_TTL) {
    return cached.data
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: tareas, error } = await supabase
    .from('tareas')
    .select('*')
    .eq('empresa_id', empresaId)
    .in('estado', ['pendiente', 'en_progreso'])
    .order('prioridad', { ascending: true })
    .order('created_at', { ascending: false })
    .limit(5)

  if (error || !tareas || tareas.length === 0) {
    taskCache.set(empresaId, { data: '', timestamp: Date.now() })
    return ''
  }

  const prioridadLabel: Record<string, string> = {
    alta: 'ALTA',
    media: 'MEDIA',
    baja: 'BAJA',
  }

  const lines = tareas.map(t => {
    const prio = prioridadLabel[t.prioridad] || 'MEDIA'
    const agente = AGENTE_NOMBRES[t.agente_tipo] || t.agente_tipo
    const ago = timeAgo(t.created_at)
    const estado = t.estado === 'en_progreso' ? ' - EN PROGRESO' : ''
    return `• [${prio}] ${t.titulo} (recomendada por ${agente}, ${ago}${estado})`
  })

  const result = `
TAREAS PENDIENTES DEL NEGOCIO:
${lines.join('\n')}

Cuando el usuario mencione un tema relacionado con una tarea pendiente, pregunta si ya la completó.
Si dice que sí, felicítalo y sugiere marcarla como completada.
`.trim()

  taskCache.set(empresaId, { data: result, timestamp: Date.now() })
  return result
}
