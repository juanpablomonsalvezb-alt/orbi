'use client'

import { useState, useRef, useEffect } from 'react'

interface ChatInputProps {
  onEnviar: (mensaje: string) => void
  deshabilitado: boolean
}

// Input de chat con textarea autoexpandible — fondo oscuro
export default function ChatInput({ onEnviar, deshabilitado }: ChatInputProps) {
  const [texto, setTexto] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`
    }
  }, [texto])

  const handleEnviar = () => {
    const mensajeLimpio = texto.trim()
    if (!mensajeLimpio || deshabilitado) return
    onEnviar(mensajeLimpio)
    setTexto('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleEnviar()
    }
  }

  return (
    <div className="border-t border-humo/10 bg-obsidian px-6 py-4">
      <div className="flex items-end space-x-3 max-w-4xl mx-auto">
        <textarea
          ref={textareaRef}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu mensaje..."
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
          disabled={deshabilitado || !texto.trim()}
          className="rounded-[8px] bg-señal px-4 py-2.5 text-white text-[14px] font-medium
                     hover:bg-señal/90 transition-colors
                     disabled:opacity-40 disabled:cursor-not-allowed"
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
