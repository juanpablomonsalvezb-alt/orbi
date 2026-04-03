'use client'

import { useState } from 'react'

// ============================================
// METRIC CARD — Big number + label + trend
// ============================================
export function MetricCard({ label, value, trend, trendLabel }: {
  label: string; value: string; trend?: 'up' | 'down' | 'neutral'; trendLabel?: string
}) {
  const trendColor = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-500' : 'text-muted'
  const trendIcon = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'

  return (
    <div className="bg-ivory-mid border border-ink/[0.04] rounded-xl px-5 py-4 inline-block min-w-[140px]">
      <p className="text-[11px] uppercase tracking-[0.1em] text-muted font-medium mb-1">{label}</p>
      <p className="text-2xl text-ink font-normal tracking-tight" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>{value}</p>
      {trendLabel && (
        <p className={`text-[11px] mt-1 ${trendColor}`}>{trendIcon} {trendLabel}</p>
      )}
    </div>
  )
}

// ============================================
// CALLOUT BOX — Colored border + icon
// ============================================
const CALLOUT_STYLES = {
  tip: { border: 'border-l-clay', bg: 'bg-clay/[0.04]', icon: '💡', iconColor: 'text-clay' },
  warning: { border: 'border-l-amber-500', bg: 'bg-amber-50/50', icon: '⚠️', iconColor: 'text-amber-600' },
  success: { border: 'border-l-green-500', bg: 'bg-green-50/50', icon: '✓', iconColor: 'text-green-600' },
  danger: { border: 'border-l-red-500', bg: 'bg-red-50/50', icon: '🔴', iconColor: 'text-red-600' },
  info: { border: 'border-l-blue-500', bg: 'bg-blue-50/50', icon: 'ℹ️', iconColor: 'text-blue-600' },
}

export function CalloutBox({ variant = 'tip', title, children }: {
  variant?: keyof typeof CALLOUT_STYLES; title?: string; children: React.ReactNode
}) {
  const style = CALLOUT_STYLES[variant]
  return (
    <div className={`${style.border} border-l-[3px] ${style.bg} rounded-r-lg px-4 py-3 my-3`}>
      {title && (
        <p className="text-[13px] font-medium text-ink mb-1 flex items-center gap-1.5">
          <span>{style.icon}</span>{title}
        </p>
      )}
      <div className="text-[13px] text-ink-light leading-relaxed" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
        {children}
      </div>
    </div>
  )
}

// ============================================
// DATA TABLE — Formatted with proper headers
// ============================================
export function DataTable({ headers, rows }: {
  headers: string[]; rows: string[][]
}) {
  // Detect numeric columns for chart generation
  const numericColIndex = headers.length > 1 ? findNumericColumn(rows) : -1
  const hasChart = numericColIndex > 0 && rows.length >= 2

  return (
    <div className="my-5">
      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-[#e9e9e7]">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="bg-[#f7f6f3] border-b border-[#e9e9e7]">
              {headers.map((h, i) => (
                <th key={i} className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#9b9a97]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="border-b border-[#f0f0ee] last:border-none hover:bg-[#fafaf9] transition-colors">
                {row.map((cell, ci) => (
                  <td key={ci} className={`px-5 py-3 ${ci === 0 ? 'font-medium text-[#37352f]' : 'text-[#6b6b6b]'}`}
                      style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                    {renderCellContent(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Auto-generated bar chart from numeric data */}
      {hasChart && (
        <div className="mt-4 px-1">
          <InlineBarChart data={extractChartData(rows, numericColIndex)} />
        </div>
      )}
    </div>
  )
}

function renderCellContent(cell: string) {
  if (cell.includes('🟢') || cell.includes('✅')) return <span className="text-green-600">{cell}</span>
  if (cell.includes('🔴')) return <span className="text-red-500 font-medium">{cell}</span>
  if (cell.includes('⚠️')) return <span className="text-amber-600">{cell}</span>
  if (cell.includes('❌')) return <span className="text-red-400">{cell}</span>
  // Highlight percentages
  const pctMatch = cell.match(/^[\d,.]+%$/)
  if (pctMatch) return <span className="font-medium text-[#37352f] tabular-nums">{cell}</span>
  // Highlight currency
  const currMatch = cell.match(/^\$[\d,.]+/)
  if (currMatch) return <span className="font-medium text-[#37352f] tabular-nums">{cell}</span>
  return cell
}

function findNumericColumn(rows: string[][]): number {
  for (let ci = 1; ci < (rows[0]?.length || 0); ci++) {
    const numericCount = rows.filter(row => {
      const val = row[ci]?.replace(/[$%,.\s]/g, '')
      return val && !isNaN(Number(val))
    }).length
    if (numericCount >= rows.length * 0.6) return ci
  }
  return -1
}

function extractChartData(rows: string[][], colIndex: number): { label: string; value: number; max: number }[] {
  const data = rows.map(row => ({
    label: row[0] || '',
    value: parseFloat(row[colIndex]?.replace(/[$%,\s]/g, '') || '0'),
  }))
  const max = Math.max(...data.map(d => d.value), 1)
  return data.map(d => ({ ...d, max }))
}

// ============================================
// COLLAPSIBLE SECTION — Summary + expandable detail
// ============================================
export function CollapsibleSection({ title, summary, children }: {
  title: string; summary?: string; children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="my-3 border border-ink/[0.06] rounded-lg overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-ivory-mid/50 hover:bg-ivory-mid transition-colors text-left">
        <div>
          <p className="text-[13px] font-medium text-ink">{title}</p>
          {summary && !open && <p className="text-[11px] text-muted mt-0.5">{summary}</p>}
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#87867f" strokeWidth="2" strokeLinecap="round"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="px-4 py-3 text-[13px] text-ink-light leading-relaxed border-t border-ink/[0.04]"
             style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
          {children}
        </div>
      )}
    </div>
  )
}

// ============================================
// STATUS BADGE — Colored pill
// ============================================
const STATUS_STYLES = {
  good: { bg: 'bg-green-100', text: 'text-green-700', label: 'En control' },
  warning: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Atención' },
  critical: { bg: 'bg-red-100', text: 'text-red-700', label: 'Urgente' },
}

export function StatusBadge({ status, label }: { status: 'good' | 'warning' | 'critical'; label?: string }) {
  const style = STATUS_STYLES[status]
  return (
    <span className={`inline-flex items-center gap-1 ${style.bg} ${style.text} text-[11px] font-medium px-2.5 py-1 rounded-full`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'good' ? 'bg-green-500' : status === 'warning' ? 'bg-amber-500' : 'bg-red-500'}`} />
      {label || style.label}
    </span>
  )
}

// ============================================
// CHART COMPONENT — Uses Recharts for professional charts
// ============================================
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const CHART_COLORS = ['#d97757', '#e8a87c', '#c6613f', '#f0c9a8', '#a34e30', '#d4a574', '#8b3a20']

export function InlineBarChart({ data }: { data: { label: string; value: number; max: number }[] }) {
  const chartData = data.map(d => ({ name: d.label, value: d.value }))

  return (
    <div className="my-5">
      {/* Vertical bar chart */}
      <div className="bg-[#fafaf9] border border-[#e9e9e7] rounded-xl p-5">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9b9a97' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9b9a97' }} axisLine={false} tickLine={false} width={70}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ background: '#fff', border: '1px solid #e9e9e7', borderRadius: 8, fontSize: 13, fontFamily: "'Source Serif 4', Georgia, serif" }}
              formatter={(value: unknown) => [`$${Number(value).toLocaleString()}`, 'Valor']}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={50}>
              {chartData.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Donut chart if 3+ items */}
      {data.length >= 3 && (
        <div className="bg-[#fafaf9] border border-[#e9e9e7] rounded-xl p-5 mt-3">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {chartData.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#fff', border: '1px solid #e9e9e7', borderRadius: 8, fontSize: 13 }}
                formatter={(value: unknown) => [`$${Number(value).toLocaleString()}`, 'Valor']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

// ============================================
// RICH TEXT PARSER — Detects patterns in agent text and renders rich components
// ============================================
export function parseRichContent(text: string): { type: 'text' | 'metric' | 'callout' | 'table'; content: string; data?: Record<string, unknown> }[] {
  // First, strip ASCII art blocks (code blocks with charts drawn in text)
  let cleaned = text
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/Gráfico de (?:barras|sectores|líneas?)[\s\S]*?(?=\n\n|\n[A-Z]|\n\*\*|$)/gi, '') // Remove ASCII chart sections
    .replace(/\+[-=]+\+[\s\S]*?\+[-=]+\+/g, '') // Remove box drawings
    .replace(/\n{3,}/g, '\n\n') // Clean extra blank lines

  const blocks: { type: 'text' | 'metric' | 'callout' | 'table'; content: string; data?: Record<string, unknown> }[] = []
  const lines = cleaned.split('\n')
  let currentText: string[] = []
  let inTable = false
  let tableHeaders: string[] = []
  let tableRows: string[][] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Detect tables: lines with | separators (flexible — doesn't require starting/ending with |)
    const pipeCount = (line.match(/\|/g) || []).length
    const isTableLine = pipeCount >= 2 && !line.includes('```')

    if (isTableLine) {
      // Skip separator lines (---|---|---)
      if (line.replace(/[\s|:-]/g, '').length === 0) continue

      const cells = line.split('|').map(c => c.trim()).filter(c => c.length > 0 && !c.match(/^[-:]+$/))
      if (cells.length < 2) continue

      if (!inTable) {
        if (currentText.length > 0) {
          blocks.push({ type: 'text', content: currentText.join('\n') })
          currentText = []
        }
        inTable = true
        tableHeaders = cells
      } else {
        tableRows.push(cells)
      }
      continue
    } else if (inTable) {
      if (tableRows.length > 0) {
        blocks.push({ type: 'table', content: '', data: { headers: tableHeaders, rows: tableRows } })
      }
      inTable = false
      tableHeaders = []
      tableRows = []
    }

    // Detect callout patterns
    if (line.match(/^(⚠️|🔴|💡|✅|ℹ️|ALERTA|IMPORTANTE|RECOMENDACIÓN|TIP)/i)) {
      if (currentText.length > 0) {
        blocks.push({ type: 'text', content: currentText.join('\n') })
        currentText = []
      }
      const calloutLines = [line]
      let j = i + 1
      while (j < lines.length && lines[j].trim() !== '') {
        calloutLines.push(lines[j])
        j++
      }
      i = j - 1
      const variant = line.match(/^(⚠️|ALERTA)/i) ? 'warning' : line.match(/^(🔴|URGENTE|CRÍTICO)/i) ? 'danger' : line.match(/^(✅)/i) ? 'success' : 'tip'
      blocks.push({ type: 'callout', content: calloutLines.join('\n'), data: { variant } })
      continue
    }

    // Skip lines that look like ASCII art
    if (line.match(/^[\s|+\-*=>{}<\[\]]+$/) && line.length > 5) continue

    currentText.push(line)
  }

  if (inTable && tableRows.length > 0) {
    blocks.push({ type: 'table', content: '', data: { headers: tableHeaders, rows: tableRows } })
  }
  if (currentText.length > 0) {
    const finalText = currentText.join('\n').trim()
    if (finalText) blocks.push({ type: 'text', content: finalText })
  }

  return blocks
}
