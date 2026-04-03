export interface ExtractedTask {
  titulo: string
  descripcion: string
  prioridad: 'alta' | 'media' | 'baja'
}

// Keywords that signal urgency / priority
const ALTA_KEYWORDS = [
  'urgente', 'urgentemente', 'crítico', 'inmediatamente', 'ahora mismo',
  'cuanto antes', 'de inmediato', 'es urgente', 'prioridad alta',
  'esta semana', 'hoy mismo', 'alarma', 'riesgo alto',
]

const BAJA_KEYWORDS = [
  'cuando puedas', 'no es urgente', 'a futuro', 'eventualmente',
  'a mediano plazo', 'más adelante', 'sin prisa', 'en algún momento',
]

// Action verbs that indicate a recommendation
const ACTION_PATTERNS = [
  /\bdebes?\b/i,
  /\bnecesitas?\b/i,
  /\brecomiendo\b/i,
  /\bsugiero\b/i,
  /\bte aconsejo\b/i,
  /\bhay que\b/i,
  /\bes importante que\b/i,
  /\bes fundamental\b/i,
  /\bdeberías?\b/i,
  /\bconsidera\b/i,
  /\bimplementa\b/i,
  /\bcontrata\b/i,
  /\bnegocia\b/i,
  /\bsube\b/i,
  /\bbaja\b/i,
  /\bcambia\b/i,
  /\bpublica\b/i,
  /\bellama\b/i,
  /\bcontacta\b/i,
  /\bactualiza\b/i,
  /\brevisa\b/i,
]

// Numbered list pattern: "1.", "2.", etc.
const NUMBERED_PATTERN = /^\s*\d+[\.\)]\s+(.+)/

function detectPriority(sentence: string): 'alta' | 'media' | 'baja' {
  const lower = sentence.toLowerCase()
  if (ALTA_KEYWORDS.some(k => lower.includes(k))) return 'alta'
  if (BAJA_KEYWORDS.some(k => lower.includes(k))) return 'baja'
  return 'media'
}

function cleanTitle(text: string): string {
  // Remove markdown bold/italic
  let clean = text.replace(/\*{1,2}(.+?)\*{1,2}/g, '$1')
  // Remove leading bullets/dashes
  clean = clean.replace(/^[\s\-•*]+/, '')
  // Trim and cap length
  clean = clean.trim()
  if (clean.length > 120) {
    clean = clean.substring(0, 117) + '...'
  }
  return clean
}

export function extractTasks(agentMessage: string): ExtractedTask[] {
  const tasks: ExtractedTask[] = []
  const seen = new Set<string>()

  // Split message into sentences / lines
  const lines = agentMessage.split(/\n/)

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.length < 10) continue

    // Check for numbered recommendations
    const numberedMatch = trimmed.match(NUMBERED_PATTERN)
    if (numberedMatch) {
      const content = numberedMatch[1].trim()
      if (content.length >= 10 && ACTION_PATTERNS.some(p => p.test(content))) {
        const titulo = cleanTitle(content)
        if (!seen.has(titulo.toLowerCase())) {
          seen.add(titulo.toLowerCase())
          tasks.push({
            titulo,
            descripcion: content,
            prioridad: detectPriority(content),
          })
        }
        continue
      }
    }

    // Check for action verb patterns in regular sentences
    if (ACTION_PATTERNS.some(p => p.test(trimmed))) {
      // Split into sub-sentences on period/semicolon
      const sentences = trimmed.split(/[.;]/).filter(s => s.trim().length >= 10)
      for (const sentence of sentences) {
        if (ACTION_PATTERNS.some(p => p.test(sentence))) {
          const titulo = cleanTitle(sentence)
          if (!seen.has(titulo.toLowerCase())) {
            seen.add(titulo.toLowerCase())
            tasks.push({
              titulo,
              descripcion: sentence.trim(),
              prioridad: detectPriority(sentence),
            })
          }
        }
      }
    }
  }

  // Limit to top 5 tasks to avoid noise
  return tasks.slice(0, 5)
}
