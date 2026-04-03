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

// Input de chat con textarea autoexpandible — fondo oscuro
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

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.error || 'Error al subir archivo')
      }

      const data = await response.json()
      return {
        id: data.id,
        nombre: data.nombre,
        tipo: data.tipo,
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error al subir archivo'
      throw new Error(errorMsg)
    }
  }, [empresaId])

  const handleSeleccionarArchivo = (file: File) => {
    setArchivo({
      file,
      nombre: file.name,
      tipo: file.type,
      tamano: file.size,
      uploading: false,
      progress: 0,
    })
  }

  const handleRemoverArchivo = () => {
    setArchivo(null)
  }

  const handleEnviar = async () => {
    const mensajeLimpio = texto.trim()
    if ((!mensajeLimpio && !archivo) || deshabilitado) return

    let archivoInfo: ArchivoInfo | undefined

    // If there's a file, upload it first
    if (archivo && !archivo.id) {
      setArchivo(prev => prev ? { ...prev, uploading: true, progress: 30 } : null)

      try {
        setArchivo(prev => prev ? { ...prev, progress: 60 } : null)
        const result = await subirArchivo(archivo.file)
        setArchivo(prev => prev ? { ...prev, progress: 100, uploading: false } : null)

        if (result) {
          archivoInfo = result
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Error al subir archivo'
        setArchivo(prev => prev ? { ...prev, uploading: false, error: errorMsg } : null)
        return
      }
    } else if (archivo?.id) {
      archivoInfo = {
        id: archivo.id,
        nombre: archivo.nombre,
        tipo: archivo.tipo,
      }
    }

    const mensajeFinal = mensajeLimpio || (archivoInfo ? `[Archivo adjunto: ${archivoInfo.nombre}]` : '')
    if (!mensajeFinal) return

    onEnviar(mensajeFinal, archivoInfo)
    setTexto('')
    setArchivo(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleEnviar()
    }
  }

  return (
    <div className="border-t border-humo/10 bg-obsidian px-6 py-4 relative">
      {/* Attached file preview (rendered above input) */}
      {archivo && (
        <div className="flex items-center space-x-3 bg-grafito border border-white/[0.08] rounded-[10px] px-3 py-2 mb-3 max-w-md">
          <span className="text-[16px]">{getIconoArchivo(archivo.nombre)}</span>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] text-white/80 truncate">{archivo.nombre}</p>
            <p className="text-[10px] text-ceniza/50">
              {formatearTamano(archivo.tamano)}
              {archivo.uploading && ' — Subiendo...'}
              {archivo.error && <span className="text-red-400"> — {archivo.error}</span>}
            </p>
            {archivo.uploading && (
              <div className="w-full h-1 bg-white/[0.06] rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full bg-señal rounded-full transition-all duration-300"
                  style={{ width: `${archivo.progress}%` }}
                />
              </div>
            )}
          </div>
          {!archivo.uploading && (
            <button
              onClick={handleRemoverArchivo}
              className="text-ceniza/40 hover:text-white transition-colors p-1"
              title="Quitar archivo"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      )}

      <div className="flex items-end space-x-3 max-w-4xl mx-auto">
        {/* Paperclip / attach button */}
        <button
          type="button"
          onClick={() => {
            const input = document.getElementById('file-input-hidden') as HTMLInputElement
            input?.click()
          }}
          disabled={deshabilitado || (archivo !== null && archivo.uploading)}
          className="rounded-[8px] p-2.5 text-ceniza/60 hover:text-white hover:bg-white/[0.06]
                     transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          title="Adjuntar archivo (PDF, Excel, CSV, imágenes, Word)"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
          </svg>
        </button>

        {/* Hidden file input */}
        <input
          id="file-input-hidden"
          type="file"
          accept=".pdf,.xlsx,.xls,.csv,.png,.jpg,.jpeg,.doc,.docx"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleSeleccionarArchivo(file)
            e.target.value = ''
          }}
          className="hidden"
        />

        <textarea
          ref={textareaRef}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={archivo ? 'Agrega un mensaje sobre el archivo...' : 'Escribe tu mensaje...'}
          disabled={deshabilitado}
          rows={1}
          className="flex-1 resize-none rounded-[8px] border border-humo/20 bg-grafito
                     px-3.5 py-2.5 text-[14px] text-[#f5f5f5] font-normal
                     placeholder:text-ceniza/60
                     focus:outline-none focus:border-ceniza transition-colors
                     disabled:opacity-40 disabled:cursor-not-allowed"
        />
        <button
          onClick={handleEnviar}
          disabled={deshabilitado || (!texto.trim() && !archivo) || (archivo?.uploading ?? false)}
          className="rounded-[8px] bg-señal px-4 py-2.5 text-white text-[14px] font-medium
                     hover:bg-señal/90 transition-colors
                     disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
        >
          Enviar
        </button>
      </div>
      <p className="text-[10px] text-ceniza/40 text-center mt-2">
        Shift + Enter para nueva línea
      </p>
    </div>
  )
}

function formatearTamano(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function getIconoArchivo(nombre: string): string {
  const ext = nombre.split('.').pop()?.toLowerCase() || ''
  if (['png', 'jpg', 'jpeg'].includes(ext)) return '\u{1F5BC}'
  if (ext === 'pdf') return '\u{1F4C4}'
  if (['xlsx', 'xls', 'csv'].includes(ext)) return '\u{1F4CA}'
  if (['doc', 'docx'].includes(ext)) return '\u{1F4DD}'
  return '\u{1F4CE}'
}
