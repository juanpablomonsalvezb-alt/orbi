import type { TipoAgente } from '@/lib/prompts'

export interface CrossReferral {
  agenteRecomendado: TipoAgente
  razon: string
}

// Keywords that each agent "owns" — if another agent mentions them, cross-refer
const AGENT_KEYWORDS: Record<TipoAgente, string[]> = {
  financiero: [
    'margen', 'márgenes', 'costos', 'flujo de caja', 'punto de equilibrio',
    'rentabilidad', 'presupuesto', 'utilidad', 'gastos fijos', 'capital de trabajo',
    'endeudamiento', 'liquidez', 'ratio financiero', 'ebitda', 'costo variable',
    'flujo de efectivo', 'precio', 'pricing',
  ],
  ventas: [
    'retención', 'clientes', 'pipeline', 'embudo', 'conversión', 'cartera de clientes',
    'prospección', 'cierre', 'ticket promedio', 'recompra', 'cac', 'ltv',
    'lifetime value', 'canal de ventas', 'referidos',
  ],
  marketing: [
    'campaña', 'posicionamiento', 'canal de marketing', 'contenido', 'redes sociales',
    'instagram', 'facebook', 'google ads', 'meta ads', 'seo', 'branding',
    'boca a boca', 'reseñas', 'google my business', 'publicidad',
  ],
  rrhh: [
    'contratar', 'contratación', 'equipo', 'cultura', 'desempeño', 'delegación',
    'delegar', 'nómina', 'talento', 'capacitación', 'motivación', 'despido',
    'liderazgo', 'feedback', 'rotación de personal',
  ],
  legal: [
    'contrato', 'legal', 'impuestos', 'fiscal', 'regulación', 'cumplimiento',
    'demanda', 'licencia', 'permiso', 'propiedad intelectual', 'protección de datos',
    'laboral', 'ley laboral', 'sii', 'sat', 'dian', 'sunat', 'afip',
  ],
  inventario: [
    'inventario', 'proveedor', 'proveedores', 'stock', 'bodega', 'rotación de inventario',
    'logística', 'distribución', 'quiebre de stock', 'reorden', 'abc de productos',
    'cadena de suministro', 'almacén',
  ],
  general: [], // General agent doesn't trigger cross-referrals
}

const AGENTE_NOMBRES: Record<TipoAgente, string> = {
  general: 'Gerente General',
  financiero: 'Finanzas',
  ventas: 'Ventas',
  marketing: 'Marketing',
  rrhh: 'Recursos Humanos',
  inventario: 'Inventario',
  legal: 'Legal',
}

export function detectCrossReferral(
  agenteTipo: TipoAgente,
  mensajeAgente: string
): CrossReferral | null {
  const lower = mensajeAgente.toLowerCase()

  // Don't cross-refer to the same agent
  // Check each agent type for keyword matches
  let bestMatch: { tipo: TipoAgente; count: number; keywords: string[] } | null = null

  for (const [tipo, keywords] of Object.entries(AGENT_KEYWORDS) as [TipoAgente, string[]][]) {
    // Skip the current agent and general
    if (tipo === agenteTipo || tipo === 'general') continue

    const matched = keywords.filter(k => lower.includes(k))
    if (matched.length > 0 && (!bestMatch || matched.length > bestMatch.count)) {
      bestMatch = { tipo, count: matched.length, keywords: matched }
    }
  }

  if (!bestMatch || bestMatch.count < 2) {
    // Require at least 2 keyword matches to avoid false positives
    return null
  }

  const nombre = AGENTE_NOMBRES[bestMatch.tipo]
  const topKeywords = bestMatch.keywords.slice(0, 3).join(', ')

  return {
    agenteRecomendado: bestMatch.tipo,
    razon: `Este tema está relacionado con ${nombre}. Se mencionaron temas como: ${topKeywords}.`,
  }
}
