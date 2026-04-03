import 'server-only'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

interface Memoria {
  id: string
  categoria: string
  contenido: string
  created_at: string
}

const CATEGORY_LABELS: Record<string, string> = {
  dato: 'DATOS CONFIRMADOS',
  decision: 'DECISIONES TOMADAS',
  meta: 'METAS',
  alerta: 'ALERTAS ACTIVAS',
  tarea: 'TAREAS PENDIENTES',
}

const CATEGORY_ORDER = ['dato', 'decision', 'meta', 'alerta', 'tarea']

/**
 * Builds a memory context string from stored memories for injection into prompts.
 * Groups by category and caps at 2000 chars total.
 */
export async function buildMemoryContext(empresaId: string): Promise<string> {
  const supabase = getSupabase()

  const { data: memorias, error } = await supabase
    .from('memorias')
    .select('id, categoria, contenido, created_at')
    .eq('empresa_id', empresaId)
    .eq('activa', true)
    .order('created_at', { ascending: false })
    .limit(50)

  if (error || !memorias || memorias.length === 0) {
    return ''
  }

  // Group by category
  const grouped: Record<string, Memoria[]> = {}
  for (const mem of memorias as Memoria[]) {
    if (!grouped[mem.categoria]) {
      grouped[mem.categoria] = []
    }
    grouped[mem.categoria].push(mem)
  }

  let result = '\nMEMORIA DEL NEGOCIO (lo que ya sé de conversaciones anteriores):\n'

  for (const cat of CATEGORY_ORDER) {
    if (!grouped[cat] || grouped[cat].length === 0) continue
    const label = CATEGORY_LABELS[cat] || cat.toUpperCase()
    result += `\n${label}:\n`
    for (const mem of grouped[cat]) {
      const date = new Date(mem.created_at)
      const dateStr = `${date.getDate()} ${date.toLocaleString('es', { month: 'short' })}`
      result += `\u2022 ${mem.contenido} (${dateStr})\n`
    }
  }

  // Cap at 2000 chars
  if (result.length > 2000) {
    result = result.substring(0, 1997) + '...'
  }

  return result
}
