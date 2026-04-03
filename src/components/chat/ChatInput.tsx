'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { ArchivoAdjunto } from './FileAttachment'

export interface ArchivoInfo {
  id: string
  nombre: string
  tipo: string
}

interface ChatInputProps {
  onEnviar: (mensaje: string, archivo?: ArchivoInfo) => void
  deshabilitado: boolean
  empresaId?: string
}

export default function ChatInput({ onEnviar, deshabilitado, empresaId }: ChatInputProps) {
  const [texto, setTexto] = useState('')
  const [archivo, setArchivo] = useState<ArchivoAdjunto | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`
    }
  }, [texto])

  const subirArchivo = useCallback(async (file: File): Promise<ArchivoInfo | null> => {
    if (!empresaId) return null
    const formData = new FormData()
    formData.append('archivo', file)
    formData.append('empresa_id', empresaId)
    const response = await fetch('/api/upload', { method: 'POST', body: formData })
    if (!response.ok) throw new Error('Error al subir archivo')
    const data = await response.json()
    return { id: data.id, nombre: data.nombre, tipo: data.tipo }
  }, [empresaId])

  const handleEnviar = async () => {
    const mensajeLimpio = texto.trim()
    if ((!mensajeLimpio && !archivo) || deshabilitado) return

    let archivoInfo: ArchivoInfo | undefined
    if (archivo) {
      setArchivo(prev => prev ? { ...prev, uploading: true } : null)
      try {
        const result = await subirArchivo(archivo.file)
        if (result) archivoInfo = result
      } catch {
        setArchivo(prev => prev ? { ...prev, uploading: false, error: 'Error al subir' } : null)
        return
      }
    }

    onEnviar(mensajeLimpio || `[Archivo: ${archivoInfo?.nombre}]`, archivoInfo)
    setTexto('')
    setArchivo(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleEnviar() }
  }

  return (
    <div className="bg-ivory-mid px-6 pb-6 pt-2">
      <div className="max-w-[720px] mx-auto">
        {/* File preview */}
        {archivo && (
          <div className="flex items-center gap-2 mb-3 px-4 py-2.5 bg-ivory border border-ink/[0.06] rounded-xl shadow-sm max-w-sm">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#87867f" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /></svg>
            <span className="text-[13px] text-ink truncate flex-1">{archivo.nombre}</span>
            {archivo.uploading ? <span className="text-[10px] text-clay">Subiendo...</span> : (
              <button onClick={() => setArchivo(null)} className="text-muted hover:text-ink text-sm">✕</button>
            )}
          </div>
        )}

        {/* Input container — card-like */}
        <div className="bg-ivory rounded-2xl shadow-sm border border-ink/[0.06] flex items-end px-4 py-3 gap-3
                        focus-within:shadow-md focus-within:border-ink/[0.1] transition-all">
          {/* Attach */}
          <button
            onClick={() => (document.getElementById('file-input') as HTMLInputElement)?.click()}
            disabled={deshabilitado}
            className="text-cloud hover:text-ink-light transition-colors pb-0.5 disabled:opacity-30"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
            </svg>
          </button>
          <input id="file-input" type="file" className="hidden" accept=".pdf,.xlsx,.xls,.csv,.png,.jpg,.jpeg,.doc,.docx"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) setArchivo({ file, nombre: file.name, tipo: file.type, tamano: file.size, uploading: false, progress: 0 })
              e.target.value = ''
            }}
          />

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu mensaje..."
            disabled={deshabilitado}
            rows={1}
            className="flex-1 resize-none bg-transparent text-[15px] text-ink placeholder:text-cloud
                       focus:outline-none disabled:opacity-40 leading-relaxed"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          />

          {/* Send */}
          <button
            onClick={handleEnviar}
            disabled={deshabilitado || (!texto.trim() && !archivo)}
            className="bg-ink text-ivory rounded-xl px-4 py-2 text-[13px] font-medium
                       hover:bg-ink-mid transition-colors disabled:opacity-20 shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
