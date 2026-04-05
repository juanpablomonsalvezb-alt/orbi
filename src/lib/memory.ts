// server-only removed for Vercel compatibility
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

/** Simple time-based cache to avoid hitting DB on every request */
const memoryCache = new Map<string, { data: string; timestamp: number }>()
const MEMORY_CACHE_TTL = 60000 // 1 minute

/**
 * Builds a memory context string from stored memories for injection into prompts.
 * Groups by category and caps at 800 chars total.
 * Results are cached for 1 minute per empresa.
 */
export async function buildMemoryContext(empresaId: string): Promise<string> {
  const cached = memoryCache.get(empresaId)
  if (cached && Date.now() - cached.timestamp < MEMORY_CACHE_TTL) {
    return cached.data
  }

  const supabase = getSupabase()

  const { data: memorias, error } = await supabase
    .from('memorias')
    .select('id, categoria, contenido, created_at')
    .eq('empresa_id', empresaId)
    .eq('activa', true)
    .order('created_at', { ascending: false })
    .limit(50)

  if (error || !memorias || memorias.length === 0) {
    memoryCache.set(empresaId, { data: '', timestamp: Date.now() })
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

  // Cap at 800 chars to keep prompt size manageable
  if (result.length > 800) {
    result = result.substring(0, 797) + '...'
  }

  memoryCache.set(empresaId, { data: result, timestamp: Date.now() })
  return result
}
