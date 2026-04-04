/**
 * Build script: Convert docs/*.md knowledge bases into src/lib/kb-sections.json
 *
 * Run at build time: node scripts/build-kb.js
 * This is called automatically via the "prebuild" npm script.
 *
 * The generated JSON file is imported by knowledge-base.ts at runtime,
 * eliminating the need for fs.readFileSync which fails in Vercel serverless.
 */

const fs = require('fs')
const path = require('path')

const KB_FILES = {
  general: 'gerente-general-knowledge-base.md',
  financiero: 'agente-financiero-knowledge.md',
  ventas: 'agente-ventas-knowledge.md',
  marketing: 'agente-marketing-knowledge.md',
  rrhh: 'agente-rrhh-knowledge.md',
  inventario: 'agente-inventario-knowledge.md',
  legal: 'agente-legal-knowledge.md',
}

function parseKBSections(content) {
  const sections = []
  const lines = content.split('\n')
  let currentTitle = ''
  let currentContent = []

  for (const line of lines) {
    const headingMatch = line.match(/^#{2,3}\s+(.+)/)
    if (headingMatch) {
      if (currentTitle && currentContent.length > 0) {
        const text = currentContent.join('\n').trim()
        sections.push({
          title: currentTitle,
          content: text.substring(0, 2000), // Truncate long sections
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
      content: text.substring(0, 2000),
      keywords: extractKeywords(currentTitle + ' ' + text),
    })
  }

  return sections
}

function extractKeywords(text) {
  const stopWords = new Set([
    'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'del', 'al',
    'en', 'con', 'por', 'para', 'es', 'son', 'que', 'se', 'no', 'si', 'como',
    'mas', 'pero', 'o', 'y', 'a', 'su', 'sus', 'este', 'esta', 'estos',
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
    .slice(0, 50) // Max 50 keywords per section
}

const docsDir = path.join(__dirname, '..', 'docs')
const output = {}

for (const [agente, file] of Object.entries(KB_FILES)) {
  const filePath = path.join(docsDir, file)
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    output[agente] = parseKBSections(content)
    console.log(`  ${agente}: ${output[agente].length} sections`)
  } catch (err) {
    console.error(`  Error reading ${file}: ${err.message}`)
    output[agente] = []
  }
}

const outPath = path.join(__dirname, '..', 'src', 'lib', 'kb-sections.json')
fs.writeFileSync(outPath, JSON.stringify(output))
const sizeKB = (fs.statSync(outPath).size / 1024).toFixed(0)
console.log(`\n  Written to src/lib/kb-sections.json (${sizeKB} KB)`)
