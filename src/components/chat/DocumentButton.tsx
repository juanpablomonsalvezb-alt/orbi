'use client'

import { useState } from 'react'
import { DocType } from '@/lib/document-generator'

interface DocumentButtonProps {
  contenido: string
  empresaId: string
  agente: string
}

// Palabras clave que indican que el asistente ofrece/generó un documento
const DOCUMENT_KEYWORDS = [
  'he preparado',
  'te genero',
  'aquí tienes',
  'documento',
  'contrato',
  'reporte',
  'cotización',
  'cotizacion',
  'análisis',
  'analisis',
]

// Detecta el tipo de documento según el contenido del mensaje
function detectDocType(text: string): DocType {
  const lower = text.toLowerCase()
  if (lower.includes('contrato')) return 'contrato'
  if (lower.includes('cotización') || lower.includes('cotizacion')) return 'cotizacion'
  if (lower.includes('análisis') || lower.includes('analisis')) return 'analisis'
  return 'reporte'
}

// Extrae un título razonable del contenido
function extractTitle(text: string, docType: DocType): string {
  const labels: Record<DocType, string> = {
    reporte: 'Reporte',
    contrato: 'Contrato',
    cotizacion: 'Cotización',
    analisis: 'Análisis',
  }

  // Intentar extraer del primer encabezado o línea bold
  const boldMatch = text.match(/\*\*([^*]+)\*\*/)
  if (boldMatch) return boldMatch[1].slice(0, 80)

  // Usar primera línea significativa
  const firstLine = text.split('\n').find((l) => l.trim().length > 10)
  if (firstLine) return firstLine.trim().slice(0, 80)

  return `${labels[docType]} generado por Orbbi`
}

export function hasDocumentKeywords(text: string): boolean {
  const lower = text.toLowerCase()
  return DOCUMENT_KEYWORDS.some((kw) => lower.includes(kw))
}

export default function DocumentButton({ contenido, empresaId, agente }: DocumentButtonProps) {
  const [descargando, setDescargando] = useState(false)

  const handleDownload = async () => {
    setDescargando(true)
    try {
      const docType = detectDocType(contenido)
      const title = extractTitle(contenido, docType)

      const response = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: docType,
          title,
          content: contenido,
          empresa_id: empresaId,
          agente,
        }),
      })

      if (!response.ok) {
        throw new Error('Error generando documento')
      }

      // Obtener el blob y disparar descarga
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')

      // Extraer filename del header o usar fallback
      const disposition = response.headers.get('Content-Disposition')
      const filenameMatch = disposition?.match(/filename="([^"]+)"/)
      a.download = filenameMatch?.[1] || `orbbi-${docType}.html`

      a.href = url
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error descargando documento:', error)
    } finally {
      setDescargando(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={descargando}
      className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium rounded-md bg-white/[0.08] border border-white/[0.1] text-white/70 hover:text-white hover:bg-white/[0.12] transition-all disabled:opacity-50"
    >
      {descargando ? (
        <>
          <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v4m0 12v4m-7.07-3.93l2.83-2.83m8.48-8.48l2.83-2.83M2 12h4m12 0h4m-3.93 7.07l-2.83-2.83M7.76 7.76L4.93 4.93" />
          </svg>
          Generando...
        </>
      ) : (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Descargar documento
        </>
      )}
    </button>
  )
}
