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
      textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`
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
        setArchivo(prev => prev ? { ...prev, uploading: false, error: 'Error' } : null)
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
    <div className="bg-white border-t border-[#e9e9e7]">
      <div className="max-w-[900px] mx-auto px-8 py-4">
        {/* File preview */}
        {archivo && (
          <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-[#f7f6f3] border border-[#e9e9e7] rounded-md text-[13px] max-w-xs">
            <span className="text-[#9b9a97]">📎</span>
            <span className="text-[#37352f] truncate flex-1">{archivo.nombre}</span>
            {archivo.uploading ? <span className="text-[11px] text-clay">Subiendo...</span> : (
              <button onClick={() => setArchivo(null)} className="text-[#9b9a97] hover:text-[#37352f]">✕</button>
            )}
          </div>
        )}

        {/* Input */}
        <div className="flex items-end gap-3">
          <button
            onClick={() => (document.getElementById('file-input') as HTMLInputElement)?.click()}
            disabled={deshabilitado}
            className="text-[#c4c4c0] hover:text-[#9b9a97] transition-colors pb-2 disabled:opacity-30"
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

          <textarea
            ref={textareaRef}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe aquí..."
            disabled={deshabilitado}
            rows={1}
            className="flex-1 resize-none bg-transparent text-[15px] text-[#37352f] placeholder:text-[#c4c4c0]
                       focus:outline-none disabled:opacity-40 leading-relaxed border-none"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          />

          <button
            onClick={handleEnviar}
            disabled={deshabilitado || (!texto.trim() && !archivo)}
            className="text-[#c4c4c0] hover:text-[#37352f] transition-colors pb-2 disabled:opacity-20"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
