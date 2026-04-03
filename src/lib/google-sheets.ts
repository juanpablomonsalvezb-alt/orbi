/**
 * Google Sheets reader — fetches public/shared spreadsheet data
 * Works with any Google Sheet that has "Anyone with the link can view" enabled
 * No OAuth needed — uses the public CSV export endpoint
 */

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/SHEET_ID/export?format=csv&gid=GID'

/**
 * Extract sheet ID and optional GID from a Google Sheets URL
 */
export function parseSheetUrl(url: string): { sheetId: string; gid: string } | null {
  // Formats:
  // https://docs.google.com/spreadsheets/d/SHEET_ID/edit#gid=0
  // https://docs.google.com/spreadsheets/d/SHEET_ID/edit?usp=sharing
  // https://docs.google.com/spreadsheets/d/SHEET_ID
  const match = url.match(/spreadsheets\/d\/([a-zA-Z0-9_-]+)/)
  if (!match) return null

  const sheetId = match[1]
  const gidMatch = url.match(/gid=(\d+)/)
  const gid = gidMatch ? gidMatch[1] : '0'

  return { sheetId, gid }
}

/**
 * Fetch a Google Sheet as CSV text
 */
export async function fetchSheetCSV(sheetId: string, gid: string = '0'): Promise<string> {
  const url = SHEET_CSV_URL.replace('SHEET_ID', sheetId).replace('GID', gid)

  const response = await fetch(url, {
    headers: { 'Accept': 'text/csv' },
    redirect: 'follow',
  })

  if (!response.ok) {
    if (response.status === 404) throw new Error('Hoja no encontrada. Verifica que el link sea correcto.')
    if (response.status === 403) throw new Error('Sin acceso. Cambia los permisos de la hoja a "Cualquier persona con el enlace puede ver".')
    throw new Error(`Error al leer la hoja: ${response.status}`)
  }

  return response.text()
}

/**
 * Parse CSV into structured data
 */
export function parseCSV(csv: string): { headers: string[]; rows: string[][]; summary: string } {
  const lines = csv.split('\n').filter(l => l.trim())
  if (lines.length < 2) return { headers: [], rows: [], summary: 'Hoja vacía' }

  const headers = parseCsvLine(lines[0])
  const rows = lines.slice(1).map(parseCsvLine)

  // Generate summary
  const numRows = rows.length
  const numCols = headers.length

  // Detect numeric columns and calculate totals
  const numericCols: { col: number; name: string; sum: number; min: number; max: number; avg: number }[] = []

  for (let c = 0; c < numCols; c++) {
    const values = rows.map(r => parseFloat((r[c] || '').replace(/[$,.\s]/g, '').replace(',', '.'))).filter(v => !isNaN(v))
    if (values.length >= numRows * 0.5) {
      numericCols.push({
        col: c,
        name: headers[c],
        sum: values.reduce((a, b) => a + b, 0),
        min: Math.min(...values),
        max: Math.max(...values),
        avg: values.reduce((a, b) => a + b, 0) / values.length,
      })
    }
  }

  let summary = `Hoja con ${numRows} filas y ${numCols} columnas.\n`
  summary += `Columnas: ${headers.join(', ')}\n`

  if (numericCols.length > 0) {
    summary += '\nResumen numérico:\n'
    for (const nc of numericCols) {
      summary += `• ${nc.name}: Total=${formatNum(nc.sum)}, Promedio=${formatNum(nc.avg)}, Min=${formatNum(nc.min)}, Max=${formatNum(nc.max)}\n`
    }
  }

  // First 5 rows as preview
  summary += '\nPrimeras filas:\n'
  summary += '| ' + headers.join(' | ') + ' |\n'
  summary += '| ' + headers.map(() => '---').join(' | ') + ' |\n'
  for (const row of rows.slice(0, 8)) {
    summary += '| ' + row.join(' | ') + ' |\n'
  }
  if (rows.length > 8) {
    summary += `... (${rows.length - 8} filas más)\n`
  }

  return { headers, rows, summary }
}

function parseCsvLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  result.push(current.trim())
  return result
}

function formatNum(n: number): string {
  if (Math.abs(n) >= 1000000) return `$${(n / 1000000).toFixed(1)}M`
  if (Math.abs(n) >= 1000) return `$${(n / 1000).toFixed(0)}K`
  return n.toFixed(0)
}

/**
 * Full pipeline: URL → fetch → parse → context string for agent
 */
export async function readGoogleSheet(url: string): Promise<string> {
  const parsed = parseSheetUrl(url)
  if (!parsed) throw new Error('URL no es una hoja de Google Sheets válida')

  const csv = await fetchSheetCSV(parsed.sheetId, parsed.gid)
  const { summary } = parseCSV(csv)

  return summary
}
