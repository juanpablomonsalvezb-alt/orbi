import fs from 'fs'
import path from 'path'

// Re-declare the type here to avoid circular imports with prompts.ts
type TipoAgente = 'general' | 'financiero' | 'ventas' | 'marketing' | 'rrhh' | 'inventario' | 'legal'

// Map agent types to their knowledge base files
const KB_FILES: Record<TipoAgente, string> = {
  general: 'gerente-general-knowledge-base.md',
  financiero: 'agente-financiero-knowledge.md',
  ventas: 'agente-ventas-knowledge.md',
  marketing: 'agente-marketing-knowledge.md',
  rrhh: 'agente-rrhh-knowledge.md',
  inventario: 'agente-inventario-knowledge.md',
  legal: 'agente-legal-knowledge.md',
}

interface KBSection {
  title: string
  content: string
  keywords: string[]
}

// Cache parsed sections per agent
const sectionCache = new Map<TipoAgente, KBSection[]>()

/**
 * Parse a knowledge base markdown file into sections.
 * Each ## or ### heading starts a new section.
 */
function parseKBSections(content: string): KBSection[] {
  const sections: KBSection[] = []
  const lines = content.split('\n')
  let currentTitle = ''
  let currentContent: string[] = []

  for (const line of lines) {
    const headingMatch = line.match(/^#{2,3}\s+(.+)/)
    if (headingMatch) {
      // Save previous section
      if (currentTitle && currentContent.length > 0) {
        const text = currentContent.join('\n').trim()
        sections.push({
          title: currentTitle,
          content: text,
          keywords: extractKeywords(currentTitle + ' ' + text),
        })
      }
      currentTitle = headingMatch[1]
      currentContent = []
    } else {
      currentContent.push(line)
    }
  }

  // Save last section
  if (currentTitle && currentContent.length > 0) {
    const text = currentContent.join('\n').trim()
    sections.push({
      title: currentTitle,
      content: text,
      keywords: extractKeywords(currentTitle + ' ' + text),
    })
  }

  return sections
}

/**
 * Extract searchable keywords from text.
 * Removes stop words, normalizes, and returns unique words.
 */
function extractKeywords(text: string): string[] {
  const stopWords = new Set([
    'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'del', 'al',
    'en', 'con', 'por', 'para', 'es', 'son', 'que', 'se', 'no', 'si', 'como',
    'más', 'pero', 'o', 'y', 'a', 'su', 'sus', 'este', 'esta', 'estos',
    'cada', 'todo', 'todos', 'muy', 'ya', 'hay', 'ser', 'tener', 'hacer',
    'poder', 'deber', 'ir', 'ver', 'dar', 'saber', 'querer', 'llegar',
    'the', 'is', 'are', 'of', 'and', 'to', 'in', 'for', 'on', 'with',
  ])

  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !stopWords.has(w))
    .filter((w, i, arr) => arr.indexOf(w) === i) // unique
}

/**
 * Score how relevant a section is to a query.
 * Uses keyword overlap + title matching.
 */
function scoreSection(section: KBSection, queryKeywords: string[]): number {
  let score = 0
  const sectionKeywords = new Set(section.keywords)

  for (const qk of queryKeywords) {
    if (sectionKeywords.has(qk)) {
      score += 1
    }
    // Partial match (prefix)
    for (const sk of sectionKeywords) {
      if (sk.startsWith(qk) || qk.startsWith(sk)) {
        score += 0.5
      }
    }
  }

  // Boost if query keywords appear in the title
  const titleLower = section.title.toLowerCase()
  for (const qk of queryKeywords) {
    if (titleLower.includes(qk)) {
      score += 3
    }
  }

  return score
}

/**
 * Load and cache knowledge base sections for an agent type.
 */
function loadSections(agenteTipo: TipoAgente): KBSection[] {
  if (sectionCache.has(agenteTipo)) {
    return sectionCache.get(agenteTipo)!
  }

  const fileName = KB_FILES[agenteTipo]
  const filePath = path.join(process.cwd(), 'docs', fileName)

  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const sections = parseKBSections(content)
    sectionCache.set(agenteTipo, sections)
    return sections
  } catch (err) {
    console.error(`Error loading KB for ${agenteTipo}:`, err)
    return []
  }
}

/**
 * Retrieve the most relevant knowledge base sections for a user query.
 * Returns up to maxSections sections, each truncated to maxCharsPerSection.
 * Total output is capped at maxTotalChars to fit in context window.
 */
export function retrieveKnowledge(
  agenteTipo: TipoAgente,
  userMessage: string,
  conversationHistory: string = '',
  maxSections: number = 1,
  maxTotalChars: number = 1000
): string {
  const sections = loadSections(agenteTipo)
  if (sections.length === 0) return ''

  // Combine user message with recent conversation for better matching
  const fullQuery = userMessage + ' ' + conversationHistory.slice(-500)
  const queryKeywords = extractKeywords(fullQuery)

  if (queryKeywords.length === 0) return ''

  // Score and rank sections
  const scored = sections
    .map(section => ({ section, score: scoreSection(section, queryKeywords) }))
    .filter(s => s.score > 1) // Minimum relevance threshold
    .sort((a, b) => b.score - a.score)
    .slice(0, maxSections)

  if (scored.length === 0) return ''

  // Build knowledge context, respecting total char limit
  let result = '\n\nCONOCIMIENTO ESPECIALIZADO RELEVANTE:\n'
  let totalChars = result.length

  for (const { section } of scored) {
    const sectionText = `\n### ${section.title}\n${section.content}\n`
    if (totalChars + sectionText.length > maxTotalChars) {
      // Truncate this section to fit
      const remaining = maxTotalChars - totalChars - 50
      if (remaining > 200) {
        result += `\n### ${section.title}\n${section.content.substring(0, remaining)}...\n`
      }
      break
    }
    result += sectionText
    totalChars += sectionText.length
  }

  return result
}

/**
 * Get a general overview of the knowledge base for an agent.
 * Used for the first message to give the agent awareness of what it knows.
 */
export function getKBOverview(agenteTipo: TipoAgente): string {
  const sections = loadSections(agenteTipo)
  if (sections.length === 0) return ''

  const titles = sections.map(s => s.title).slice(0, 20)
  return `\nTu base de conocimiento incluye información detallada sobre:\n${titles.map(t => `• ${t}`).join('\n')}\nUsa este conocimiento cuando sea relevante para dar respuestas profundas y específicas.\n`
}
