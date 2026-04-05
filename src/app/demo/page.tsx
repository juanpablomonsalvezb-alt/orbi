'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import OrbiLogo from '@/components/ui/OrbiLogo'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: '¡Hola! Soy tu Gerente General virtual. Para darte un diagnóstico de tu negocio, necesito saber 3 cosas.\n\nPrimero: **¿a qué se dedica tu empresa y cuántas personas son?**',
}

const MAX_MESSAGES = 20

export default function DemoPage() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const userMessageCount = messages.filter(m => m.role === 'user').length

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (!isStreaming) inputRef.current?.focus()
  }, [isStreaming])

  const handleOptionClick = (option: string) => {
    if (option === 'Crear mi cuenta ahora') {
      window.location.href = '/registro'
      return
    }
    // Send as a user message
    sendMessage(option)
  }

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim()
    if (!messageText || isStreaming) return
    if (userMessageCount >= MAX_MESSAGES) {
      setError('Has alcanzado el límite de la demo. Crea tu cuenta para continuar.')
      return
    }

    setError('')
    setInput('')
    const userMsg: Message = { role: 'user', content: messageText }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setIsStreaming(true)

    try {
      // Build messages array for API (exclude the initial agent message from context to save tokens)
      const apiMessages = newMessages.map(m => ({ role: m.role, content: m.content }))

      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          messageCount: userMessageCount + 1,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Error al conectar con el servidor')
        setIsStreaming(false)
        return
      }

      // Stream SSE response
      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let assistantContent = ''

      // Add empty assistant message to fill via stream
      setMessages(prev => [...prev, { role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              if (data.error) {
                setError(data.error)
                break
              }
              if (data.done) break
              if (data.text) {
                assistantContent += data.text
                setMessages(prev => {
                  const updated = [...prev]
                  updated[updated.length - 1] = { role: 'assistant', content: assistantContent }
                  return updated
                })
              }
            } catch { /* skip */ }
          }
        }
      }
    } catch (err) {
      console.error('Demo error:', err)
      setError('Error de conexión. Intenta de nuevo.')
    }

    setIsStreaming(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage()
  }

  return (
    <div className="min-h-screen bg-ivory-mid flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-ivory-mid border-b border-ink/[0.06]">
        <div className="max-w-[760px] mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/"><OrbiLogo size={32} color="dark" /></Link>
            <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-accent bg-accent/10 px-2 py-0.5 rounded-full">
              Demo gratuita
            </span>
          </div>
          <Link
            href="/registro"
            className="bg-ink text-ivory text-sm font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
          >
            Crear cuenta
          </Link>
        </div>
      </header>

      {/* Chat area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[700px] mx-auto px-4 py-6">
          {messages.map((msg, i) => (
            <div key={i} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center mr-2 mt-1 shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-ink text-ivory text-sm'
                    : 'bg-white text-ink text-sm border border-ink/[0.06]'
                }`}
              >
                <MessageContent content={msg.content} onOptionClick={handleOptionClick} />
              </div>
            </div>
          ))}

          {isStreaming && messages[messages.length - 1]?.content === '' && (
            <div className="mb-4 flex justify-start">
              <div className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center mr-2 mt-1 shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              </div>
              <div className="bg-white text-ink text-sm border border-ink/[0.06] rounded-xl px-4 py-3">
                <span className="inline-flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input area */}
      <div className="sticky bottom-0 bg-ivory-mid border-t border-ink/[0.06]">
        <div className="max-w-[700px] mx-auto px-4 py-3">
          {error && (
            <div className="mb-2 text-center">
              <p className="text-xs text-accent">{error}</p>
              {userMessageCount >= MAX_MESSAGES && (
                <Link href="/registro" className="text-xs text-accent font-medium underline hover:no-underline">
                  Crear cuenta para seguir
                </Link>
              )}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={userMessageCount >= MAX_MESSAGES ? 'Límite alcanzado — crea tu cuenta' : 'Escribe tu respuesta...'}
              disabled={isStreaming || userMessageCount >= MAX_MESSAGES}
              className="flex-1 border border-ink/[0.08] rounded-lg px-4 py-2.5 text-sm text-ink bg-ivory placeholder:text-muted/50 focus:outline-none focus:border-ink/25 transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isStreaming || !input.trim() || userMessageCount >= MAX_MESSAGES}
              className="bg-ink text-ivory rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-ink-mid transition-colors disabled:opacity-30 shrink-0"
            >
              Enviar
            </button>
          </form>
          <div className="flex items-center justify-between mt-2">
            <p className="text-[11px] text-muted">
              Mensaje {Math.min(userMessageCount + 1, MAX_MESSAGES)} de {MAX_MESSAGES}
            </p>
            <p className="text-[11px] text-muted">
              Powered by <span style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>orbbi</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Renders message content with markdown-like formatting and >>> option buttons */
function MessageContent({ content, onOptionClick }: { content: string; onOptionClick: (opt: string) => void }) {
  if (!content) return null

  // Split content into lines
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  for (const line of lines) {
    // Handle >>> option buttons
    if (line.startsWith('>>>')) {
      const optionText = line.slice(3).trim()
      elements.push(
        <button
          key={`opt-${i}`}
          onClick={() => onOptionClick(optionText)}
          className="block w-full text-left text-sm font-medium text-accent bg-accent/[0.07] hover:bg-accent/[0.14] rounded-lg px-3 py-2 mt-2 transition-colors"
        >
          {optionText}
        </button>
      )
    } else {
      // Render line with inline formatting
      elements.push(
        <span key={`line-${i}`}>
          {i > 0 && !lines[i - 1]?.startsWith('>>>') && <br />}
          <InlineFormatted text={line} />
        </span>
      )
    }
    i++
  }

  return <div className="leading-relaxed" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>{elements}</div>
}

/** Renders inline bold (**text**) formatting */
function InlineFormatted({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}
