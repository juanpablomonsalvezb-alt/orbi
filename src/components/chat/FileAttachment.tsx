'use client'

import { useState, useRef } from 'react'

export interface ArchivoAdjunto {
  file: File
  id?: string
  nombre: string
  tipo: string
  tamano: number
  uploading: boolean
  progress: number
  error?: string
}

interface FileAttachmentProps {
  archivo: ArchivoAdjunto | null
  onSeleccionar: (file: File) => void
  onRemover: () => void
  deshabilitado: boolean
}

const EXTENSIONES_PERMITIDAS = ['pdf', 'xlsx', 'xls', 'csv', 'png', 'jpg', 'jpeg', 'doc', 'docx']
const MAX_SIZE = 10 * 1024 * 1024 // 10MB

function formatearTamano(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function getIconoArchivo(nombre: string): string {
  const ext = nombre.split('.').pop()?.toLowerCase() || ''
  if (['png', 'jpg', 'jpeg'].includes(ext)) return '🖼'
  if (ext === 'pdf') return '📄'
  if (['xlsx', 'xls', 'csv'].includes(ext)) return '📊'
  if (['doc', 'docx'].includes(ext)) return '📝'
  return '📎'
}

export default function FileAttachment({ archivo, onSeleccionar, onRemover, deshabilitado }: FileAttachmentProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [errorLocal, setErrorLocal] = useState<string | null>(null)

  const handleClick = () => {
    if (deshabilitado) return
    setErrorLocal(null)
    inputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Reset input so the same file can be selected again
    e.target.value = ''

    // Validate extension
    const extension = file.name.split('.').pop()?.toLowerCase() || ''
    if (!EXTENSIONES_PERMITIDAS.includes(extension)) {
      setErrorLocal(`Formato no soportado. Usa: ${EXTENSIONES_PERMITIDAS.join(', ')}`)
      return
    }

    // Validate size
    if (file.size > MAX_SIZE) {
      setErrorLocal('El archivo excede 10MB')
      return
    }

    setErrorLocal(null)
    onSeleccionar(file)
  }

  return (
    <div className="flex flex-col">
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.xlsx,.xls,.csv,.png,.jpg,.jpeg,.doc,.docx"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Paperclip button */}
      <button
        type="button"
        onClick={handleClick}
        disabled={deshabilitado || (archivo !== null && archivo.uploading)}
        className="rounded-[8px] p-2.5 text-ceniza/60 hover:text-white hover:bg-white/[0.06]
                   transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        title="Adjuntar archivo"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
        </svg>
      </button>

      {/* Error message */}
      {errorLocal && (
        <p className="text-[10px] text-red-400 mt-1 px-1">{errorLocal}</p>
      )}

      {/* Attached file preview */}
      {archivo && (
        <div className="absolute bottom-full left-0 right-0 px-6 pb-2">
          <div className="flex items-center space-x-3 bg-grafito border border-white/[0.08] rounded-[10px] px-3 py-2 max-w-md">
            <span className="text-[16px]">{getIconoArchivo(archivo.nombre)}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] text-white/80 truncate">{archivo.nombre}</p>
              <p className="text-[10px] text-ceniza/50">
                {formatearTamano(archivo.tamano)}
                {archivo.uploading && ' — Subiendo...'}
                {archivo.error && ` — ${archivo.error}`}
              </p>
              {/* Progress bar */}
              {archivo.uploading && (
                <div className="w-full h-1 bg-white/[0.06] rounded-full mt-1 overflow-hidden">
                  <div
                    className="h-full bg-señal rounded-full transition-all duration-300"
                    style={{ width: `${archivo.progress}%` }}
                  />
                </div>
              )}
            </div>
            {/* Remove button */}
            {!archivo.uploading && (
              <button
                onClick={onRemover}
                className="text-ceniza/40 hover:text-white transition-colors p-1"
                title="Quitar archivo"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
