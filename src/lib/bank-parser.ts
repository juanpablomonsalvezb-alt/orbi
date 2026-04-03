/**
 * Bank Statement Parser for ORBBI
 * Parses CSV bank statements, auto-detects columns, categorizes transactions,
 * and generates a structured financial summary in Spanish.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

interface Transaction {
  fecha: Date
  descripcion: string
  monto: number       // positive = ingreso, negative = egreso
  saldo?: number
  categoria: string
}

interface WeeklyFlow {
  semana: string
  ingresos: number
  egresos: number
  neto: number
}

interface CategorySummary {
  categoria: string
  monto: number
  count: number
  porcentaje: number
}

// ─── Category keywords (Spanish) ─────────────────────────────────────────────

const CATEGORY_RULES: { categoria: string; keywords: string[] }[] = [
  {
    categoria: 'Nomina/Sueldos',
    keywords: ['sueldo', 'remuneracion', 'remuneración', 'nomina', 'nómina', 'salario', 'honorario', 'liquidacion sueldo', 'pago personal'],
  },
  {
    categoria: 'Arriendo',
    keywords: ['arriendo', 'renta', 'alquiler', 'canon arrendamiento', 'lease'],
  },
  {
    categoria: 'Servicios',
    keywords: ['luz', 'agua', 'internet', 'gas', 'enel', 'essal', 'telefono', 'teléfono', 'electricidad', 'entel', 'movistar', 'claro', 'vtr', 'wom', 'cgef', 'chilquinta'],
  },
  {
    categoria: 'Impuestos',
    keywords: ['sii', 'sat', 'dian', 'sunat', 'impuesto', 'ppm', 'iva', 'declaracion', 'declaración', 'tesoreria', 'tesorería', 'contribucion', 'contribución', 'afp', 'isapre', 'fonasa', 'prevision', 'previsión'],
  },
  {
    categoria: 'Comisiones bancarias',
    keywords: ['comision', 'comisión', 'mantencion cuenta', 'mantención cuenta', 'cargo bancario', 'cargo mensual', 'costo mantencion', 'seguro desgravamen', 'cargo administracion'],
  },
  {
    categoria: 'Transferencias',
    keywords: ['transferencia', 'traspaso', 'tef', 'abono cuenta', 'deposito', 'depósito'],
  },
]

// ─── Column detection patterns ───────────────────────────────────────────────

const DATE_COLUMN_NAMES = ['fecha', 'date', 'fch', 'dia', 'día', 'f. operacion', 'f. contable', 'fecha operacion', 'fecha contable', 'fecha movimiento', 'fecha_transaccion']
const DESC_COLUMN_NAMES = ['descripcion', 'descripción', 'detalle', 'concepto', 'glosa', 'movimiento', 'referencia', 'description', 'nota']
const AMOUNT_COLUMN_NAMES = ['monto', 'amount', 'valor', 'importe', 'cargo', 'abono', 'debe', 'haber', 'debito', 'débito', 'credito', 'crédito', 'ingreso', 'egreso']
const BALANCE_COLUMN_NAMES = ['saldo', 'balance', 'saldo disponible', 'saldo contable', 'saldo final']

const DATE_REGEX = /^\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}$/
const AMOUNT_REGEX = /^[\s$\-+]*[\d.,]+[\s$]*$/

// ─── Helpers ─────────────────────────────────────────────────────────────────

function normalizeText(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
}

function parseCSVLine(line: string): string[] {
  const fields: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if ((ch === ',' || ch === ';' || ch === '\t') && !inQuotes) {
      fields.push(current.trim())
      current = ''
    } else {
      current += ch
    }
  }
  fields.push(current.trim())
  return fields
}

function detectDelimiter(lines: string[]): string {
  const counts: Record<string, number[]> = { ',': [], ';': [], '\t': [] }
  for (const line of lines.slice(0, 5)) {
    for (const delim of [',', ';', '\t']) {
      counts[delim].push((line.match(new RegExp(delim === '\t' ? '\t' : delim.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length)
    }
  }
  // Pick delimiter with most consistent non-zero count
  let best = ','
  let bestScore = 0
  for (const [delim, arr] of Object.entries(counts)) {
    const avg = arr.reduce((a, b) => a + b, 0) / arr.length
    const variance = arr.reduce((s, v) => s + (v - avg) ** 2, 0) / arr.length
    const score = avg > 0 ? avg / (1 + variance) : 0
    if (score > bestScore) {
      bestScore = score
      best = delim
    }
  }
  return best
}

function parseAmount(raw: string): number {
  if (!raw || raw.trim() === '' || raw.trim() === '-') return 0
  let cleaned = raw.replace(/[$\s]/g, '')
  // Handle parenthesized negatives: (1234.56) → -1234.56
  if (/^\([\d.,]+\)$/.test(cleaned)) {
    cleaned = '-' + cleaned.replace(/[()]/g, '')
  }
  // Detect decimal separator: if last separator has 2 digits after → decimal comma
  const lastComma = cleaned.lastIndexOf(',')
  const lastDot = cleaned.lastIndexOf('.')
  if (lastComma > lastDot) {
    // Comma is decimal separator (e.g. 1.234,56)
    cleaned = cleaned.replace(/\./g, '').replace(',', '.')
  } else {
    // Dot is decimal separator (e.g. 1,234.56)
    cleaned = cleaned.replace(/,/g, '')
  }
  const num = parseFloat(cleaned)
  return isNaN(num) ? 0 : num
}

function parseDate(raw: string): Date | null {
  if (!raw || raw.trim() === '') return null
  const cleaned = raw.trim()
  // Try dd/mm/yyyy, dd-mm-yyyy, dd.mm.yyyy
  const match = cleaned.match(/^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2,4})$/)
  if (match) {
    let [, d, m, y] = match
    let year = parseInt(y)
    if (year < 100) year += 2000
    const date = new Date(year, parseInt(m) - 1, parseInt(d))
    if (!isNaN(date.getTime())) return date
  }
  // Try yyyy-mm-dd (ISO)
  const isoMatch = cleaned.match(/^(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})$/)
  if (isoMatch) {
    const date = new Date(parseInt(isoMatch[1]), parseInt(isoMatch[2]) - 1, parseInt(isoMatch[3]))
    if (!isNaN(date.getTime())) return date
  }
  // Fallback
  const fallback = new Date(cleaned)
  return isNaN(fallback.getTime()) ? null : fallback
}

function formatMoney(amount: number): string {
  const abs = Math.abs(amount)
  const formatted = abs.toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
  return amount < 0 ? `-$${formatted}` : `$${formatted}`
}

function formatDate(date: Date): string {
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const yyyy = date.getFullYear()
  return `${dd}/${mm}/${yyyy}`
}

function getWeekKey(date: Date): string {
  // ISO week start (Monday)
  const d = new Date(date)
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7))
  return formatDate(d)
}

// ─── Column mapping detection ────────────────────────────────────────────────

interface ColumnMapping {
  dateCol: number
  descCol: number
  amountCol: number       // single amount column (positive/negative)
  debitCol: number        // separate debit column (cargo/debe)
  creditCol: number       // separate credit column (abono/haber)
  balanceCol: number
}

function detectColumns(headers: string[], sampleRows: string[][]): ColumnMapping {
  const mapping: ColumnMapping = {
    dateCol: -1,
    descCol: -1,
    amountCol: -1,
    debitCol: -1,
    creditCol: -1,
    balanceCol: -1,
  }

  const normalizedHeaders = headers.map(h => normalizeText(h))

  // Match by header name first
  for (let i = 0; i < normalizedHeaders.length; i++) {
    const h = normalizedHeaders[i]
    if (mapping.dateCol === -1 && DATE_COLUMN_NAMES.some(n => h.includes(n))) {
      mapping.dateCol = i
    }
    if (mapping.descCol === -1 && DESC_COLUMN_NAMES.some(n => h.includes(n))) {
      mapping.descCol = i
    }
    if (BALANCE_COLUMN_NAMES.some(n => h.includes(n))) {
      mapping.balanceCol = i
    }
    // Check for split debit/credit columns
    if (['cargo', 'debe', 'debito', 'débito', 'egreso'].some(n => h.includes(normalizeText(n)))) {
      mapping.debitCol = i
    }
    if (['abono', 'haber', 'credito', 'crédito', 'ingreso'].some(n => h.includes(normalizeText(n)))) {
      mapping.creditCol = i
    }
    // General amount column
    if (mapping.amountCol === -1 && ['monto', 'amount', 'valor', 'importe'].some(n => h.includes(n))) {
      mapping.amountCol = i
    }
  }

  // If we have debit+credit, don't need a single amount column
  if (mapping.debitCol !== -1 && mapping.creditCol !== -1) {
    mapping.amountCol = -1
  }
  // If no amount column and no debit/credit, try to find by content
  if (mapping.amountCol === -1 && mapping.debitCol === -1) {
    for (let i = 0; i < headers.length; i++) {
      if (i === mapping.dateCol || i === mapping.descCol || i === mapping.balanceCol) continue
      const values = sampleRows.map(r => r[i] || '')
      const amountLike = values.filter(v => AMOUNT_REGEX.test(v) && parseAmount(v) !== 0).length
      if (amountLike >= values.length * 0.5) {
        mapping.amountCol = i
        break
      }
    }
  }

  // Fallback: detect date column by content
  if (mapping.dateCol === -1) {
    for (let i = 0; i < headers.length; i++) {
      const values = sampleRows.map(r => r[i] || '')
      const dateLike = values.filter(v => DATE_REGEX.test(v.trim()) || parseDate(v) !== null).length
      if (dateLike >= values.length * 0.5) {
        mapping.dateCol = i
        break
      }
    }
  }

  // Fallback: detect description as the longest text column
  if (mapping.descCol === -1) {
    let maxAvgLen = 0
    for (let i = 0; i < headers.length; i++) {
      if (i === mapping.dateCol || i === mapping.amountCol || i === mapping.debitCol || i === mapping.creditCol || i === mapping.balanceCol) continue
      const avgLen = sampleRows.reduce((sum, r) => sum + (r[i] || '').length, 0) / Math.max(sampleRows.length, 1)
      if (avgLen > maxAvgLen) {
        maxAvgLen = avgLen
        mapping.descCol = i
      }
    }
  }

  return mapping
}

// ─── Categorization ──────────────────────────────────────────────────────────

function categorizeTransaction(desc: string, monto: number): string {
  const normalized = normalizeText(desc)
  for (const rule of CATEGORY_RULES) {
    if (rule.keywords.some(kw => normalized.includes(normalizeText(kw)))) {
      return rule.categoria
    }
  }
  // Default based on sign
  if (monto > 0) return 'Ventas/Ingresos'
  return 'Proveedores/Otros'
}

// ─── Detection ───────────────────────────────────────────────────────────────

export function looksLikeBankStatement(csv: string): boolean {
  if (!csv || csv.trim().length === 0) return false

  const lines = csv.split(/\r?\n/).filter(l => l.trim().length > 0)
  if (lines.length < 3) return false

  const lower = csv.toLowerCase()

  // Check for bank statement keywords
  const bankKeywords = ['saldo', 'balance', 'cargo', 'abono', 'debe', 'haber', 'cartola', 'estado de cuenta', 'extracto']
  const hasKeywords = bankKeywords.some(kw => lower.includes(kw))

  // Check if first few lines have date-like and amount-like values
  const delimiter = detectDelimiter(lines)
  const headerLine = lines[0]
  const headerLower = headerLine.toLowerCase()

  const hasDateHeader = DATE_COLUMN_NAMES.some(n => headerLower.includes(n))
  const hasAmountHeader = AMOUNT_COLUMN_NAMES.some(n => headerLower.includes(n))

  // Content-based detection: check sample rows for dates and amounts
  let dateCount = 0
  let amountCount = 0
  const sampleLines = lines.slice(1, Math.min(6, lines.length))
  for (const line of sampleLines) {
    const fields = parseCSVLine(line)
    for (const field of fields) {
      if (DATE_REGEX.test(field.trim())) dateCount++
      if (AMOUNT_REGEX.test(field.trim()) && parseAmount(field) !== 0) amountCount++
    }
  }

  const hasDateContent = dateCount >= sampleLines.length * 0.5
  const hasAmountContent = amountCount >= sampleLines.length * 0.5

  // Return true if we have good signal
  if (hasKeywords && (hasDateContent || hasDateHeader)) return true
  if (hasDateHeader && hasAmountHeader) return true
  if (hasDateContent && hasAmountContent && hasKeywords) return true

  return false
}

// ─── Main parser ─────────────────────────────────────────────────────────────

export function parseBankStatement(csv: string): string {
  if (!csv || csv.trim().length === 0) {
    return 'ANALISIS DE CARTOLA BANCARIA\n\nError: El archivo CSV esta vacio o no contiene datos.'
  }

  const lines = csv.split(/\r?\n/).filter(l => l.trim().length > 0)
  if (lines.length < 2) {
    return 'ANALISIS DE CARTOLA BANCARIA\n\nError: El archivo no contiene suficientes filas para analizar.'
  }

  // Parse header and sample rows
  const headers = parseCSVLine(lines[0])
  const dataLines = lines.slice(1)
  const sampleRows = dataLines.slice(0, Math.min(10, dataLines.length)).map(l => parseCSVLine(l))

  const mapping = detectColumns(headers, sampleRows)

  if (mapping.dateCol === -1 && mapping.amountCol === -1 && mapping.debitCol === -1) {
    return 'ANALISIS DE CARTOLA BANCARIA\n\nError: No se pudieron detectar las columnas de fecha y monto en el archivo. Verifica que el CSV tenga encabezados claros.'
  }

  // Parse all transactions
  const transactions: Transaction[] = []

  for (const line of dataLines) {
    const fields = parseCSVLine(line)
    if (fields.length <= 1 && fields[0]?.trim() === '') continue

    const fechaRaw = mapping.dateCol >= 0 ? fields[mapping.dateCol] : ''
    const fecha = parseDate(fechaRaw)
    if (!fecha) continue // Skip rows without valid dates

    const descripcion = mapping.descCol >= 0 ? (fields[mapping.descCol] || '').trim() : ''

    let monto = 0
    if (mapping.debitCol >= 0 && mapping.creditCol >= 0) {
      const debito = parseAmount(fields[mapping.debitCol] || '')
      const credito = parseAmount(fields[mapping.creditCol] || '')
      monto = credito > 0 ? credito : (debito > 0 ? -debito : debito)
    } else if (mapping.amountCol >= 0) {
      monto = parseAmount(fields[mapping.amountCol] || '')
    }

    if (monto === 0 && descripcion === '') continue // Skip empty rows

    const saldo = mapping.balanceCol >= 0 ? parseAmount(fields[mapping.balanceCol] || '') : undefined

    const categoria = categorizeTransaction(descripcion, monto)

    transactions.push({ fecha, descripcion, monto, saldo, categoria })
  }

  if (transactions.length === 0) {
    return 'ANALISIS DE CARTOLA BANCARIA\n\nNo se encontraron transacciones validas en el archivo.'
  }

  // Sort by date
  transactions.sort((a, b) => a.fecha.getTime() - b.fecha.getTime())

  // ─── Calculations ───────────────────────────────────────────────────
  const fechaInicio = transactions[0].fecha
  const fechaFin = transactions[transactions.length - 1].fecha

  const ingresos = transactions.filter(t => t.monto > 0)
  const egresos = transactions.filter(t => t.monto < 0)

  const totalIngresos = ingresos.reduce((s, t) => s + t.monto, 0)
  const totalEgresos = egresos.reduce((s, t) => s + t.monto, 0)
  const flujoNeto = totalIngresos + totalEgresos

  // Category breakdown
  const categoryMap = new Map<string, { monto: number; count: number }>()
  for (const t of transactions) {
    const key = t.categoria
    const existing = categoryMap.get(key) || { monto: 0, count: 0 }
    existing.monto += Math.abs(t.monto)
    existing.count++
    categoryMap.set(key, existing)
  }
  const totalAbsoluto = [...categoryMap.values()].reduce((s, c) => s + c.monto, 0)
  const categories: CategorySummary[] = [...categoryMap.entries()]
    .map(([categoria, data]) => ({
      categoria,
      monto: data.monto,
      count: data.count,
      porcentaje: totalAbsoluto > 0 ? (data.monto / totalAbsoluto) * 100 : 0,
    }))
    .sort((a, b) => b.monto - a.monto)

  // Top 5 expenses
  const topEgresos = [...egresos]
    .sort((a, b) => a.monto - b.monto)
    .slice(0, 5)

  // Top 5 ingresos
  const topIngresos = [...ingresos]
    .sort((a, b) => b.monto - a.monto)
    .slice(0, 5)

  // Weekly flow
  const weekMap = new Map<string, { ingresos: number; egresos: number }>()
  for (const t of transactions) {
    const wk = getWeekKey(t.fecha)
    const existing = weekMap.get(wk) || { ingresos: 0, egresos: 0 }
    if (t.monto > 0) existing.ingresos += t.monto
    else existing.egresos += t.monto
    weekMap.set(wk, existing)
  }
  const weeklyFlows: WeeklyFlow[] = [...weekMap.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([semana, data]) => ({
      semana,
      ingresos: data.ingresos,
      egresos: data.egresos,
      neto: data.ingresos + data.egresos,
    }))

  // ─── Pattern detection / Alerts ─────────────────────────────────────
  const alertas: string[] = []

  // Recurring payments: same description + similar amount appearing 2+ times
  const descFreq = new Map<string, { count: number; amounts: number[] }>()
  for (const t of egresos) {
    const key = normalizeText(t.descripcion).substring(0, 30)
    if (key.length < 3) continue
    const existing = descFreq.get(key) || { count: 0, amounts: [] }
    existing.count++
    existing.amounts.push(t.monto)
    descFreq.set(key, existing)
  }
  const recurring = [...descFreq.entries()].filter(([, v]) => v.count >= 2)
  if (recurring.length > 0) {
    const topRecurring = recurring.sort((a, b) => b[1].count - a[1].count).slice(0, 3)
    for (const [desc, data] of topRecurring) {
      const avgAmount = data.amounts.reduce((s, a) => s + a, 0) / data.amounts.length
      alertas.push(`Pago recurrente detectado: "${desc}" (${data.count} veces, promedio ${formatMoney(avgAmount)})`)
    }
  }

  // Negative cash flow warning
  if (flujoNeto < 0) {
    alertas.push(`Flujo de caja negativo en el periodo: ${formatMoney(flujoNeto)}. Los egresos superan a los ingresos.`)
  }

  // Large single transactions (>30% of total egresos)
  for (const t of egresos) {
    if (totalEgresos !== 0 && Math.abs(t.monto) > Math.abs(totalEgresos) * 0.3) {
      alertas.push(`Egreso significativo: "${t.descripcion}" por ${formatMoney(t.monto)} (${formatDate(t.fecha)}) representa mas del 30% del total de egresos.`)
    }
  }

  // High bank fees
  const comisionesCat = categories.find(c => c.categoria === 'Comisiones bancarias')
  if (comisionesCat && comisionesCat.porcentaje > 5) {
    alertas.push(`Las comisiones bancarias representan ${comisionesCat.porcentaje.toFixed(1)}% del movimiento total. Considere revisar su plan bancario.`)
  }

  // Declining weekly income trend
  if (weeklyFlows.length >= 3) {
    const lastThree = weeklyFlows.slice(-3)
    if (lastThree[0].ingresos > lastThree[1].ingresos && lastThree[1].ingresos > lastThree[2].ingresos && lastThree[0].ingresos > 0) {
      alertas.push(`Tendencia: los ingresos semanales han disminuido en las ultimas 3 semanas.`)
    }
  }

  if (alertas.length === 0) {
    alertas.push('No se detectaron alertas significativas en este periodo.')
  }

  // ─── Build output ───────────────────────────────────────────────────
  let output = ''

  output += `ANALISIS DE CARTOLA BANCARIA\n`
  output += `Periodo: ${formatDate(fechaInicio)} a ${formatDate(fechaFin)}\n`
  output += `Total de transacciones: ${transactions.length}\n\n`

  output += `RESUMEN:\n`
  output += `- Ingresos totales: ${formatMoney(totalIngresos)}\n`
  output += `- Egresos totales: ${formatMoney(totalEgresos)}\n`
  output += `- Flujo neto: ${formatMoney(flujoNeto)} (${flujoNeto >= 0 ? 'positivo' : 'negativo'})\n\n`

  output += `DESGLOSE POR CATEGORIA:\n`
  output += `| Categoria | Monto | % del total | # Transacciones |\n`
  output += `|-----------|-------|-------------|------------------|\n`
  for (const cat of categories) {
    output += `| ${cat.categoria.padEnd(22)} | ${formatMoney(cat.monto).padStart(12)} | ${cat.porcentaje.toFixed(1).padStart(6)}% | ${String(cat.count).padStart(16)} |\n`
  }
  output += `\n`

  if (topEgresos.length > 0) {
    output += `TOP 5 EGRESOS:\n`
    for (let i = 0; i < topEgresos.length; i++) {
      const t = topEgresos[i]
      output += `${i + 1}. ${t.descripcion || '(sin descripcion)'} — ${formatMoney(t.monto)} (${formatDate(t.fecha)})\n`
    }
    output += `\n`
  }

  if (topIngresos.length > 0) {
    output += `TOP 5 INGRESOS:\n`
    for (let i = 0; i < topIngresos.length; i++) {
      const t = topIngresos[i]
      output += `${i + 1}. ${t.descripcion || '(sin descripcion)'} — ${formatMoney(t.monto)} (${formatDate(t.fecha)})\n`
    }
    output += `\n`
  }

  output += `ALERTAS:\n`
  for (const alerta of alertas) {
    output += `- ${alerta}\n`
  }
  output += `\n`

  if (weeklyFlows.length > 0) {
    output += `FLUJO SEMANAL:\n`
    output += `| Semana     | Ingresos     | Egresos      | Neto         |\n`
    output += `|------------|--------------|--------------|---------------|\n`
    for (const wf of weeklyFlows) {
      output += `| ${wf.semana} | ${formatMoney(wf.ingresos).padStart(12)} | ${formatMoney(wf.egresos).padStart(12)} | ${formatMoney(wf.neto).padStart(13)} |\n`
    }
  }

  return output
}
