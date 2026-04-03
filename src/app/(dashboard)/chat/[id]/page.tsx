'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'
import { ChatMessage } from '@/types/chat'
import { Conversacion } from '@/types/database'
import { AGENTES, TipoAgente, ESTILOS, EstiloComunicacion } from '@/lib/prompts'
import ChatMessages from '@/components/chat/ChatMessages'
import ChatInput, { ArchivoInfo } from '@/components/chat/ChatInput'
import ChatSidebar from '@/components/chat/ChatSidebar'
import OnboardingTour from '@/components/chat/OnboardingTour'
import PushNotifications from '@/components/PushNotifications'
import OrbiLogo from '@/components/ui/OrbiLogo'
import { detectCrossReferral, type CrossReferral } from '@/lib/cross-referral'
import { authFetch } from '@/lib/auth-fetch'

export default function ChatPage() {
  const params = useParams()
  const conversacionId = params.id as string

  const [mensajes, setMensajes] = useState<ChatMessage[]>([])
  const [conversaciones, setConversaciones] = useState<Conversacion[]>([])
  const [empresaId, setEmpresaId] = useState<string>('')
  const [agenteTipo, setAgenteTipo] = useState<TipoAgente>('general')
  const [estilo, setEstilo] = useState<EstiloComunicacion>('directo')
  const [cargando, setCargando] = useState(false)
  const [cargandoInicial, setCargandoInicial] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [crossReferrals, setCrossReferrals] = useState<Record<string, CrossReferral>>({})
  const [mostrarTour, setMostrarTour] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  // Typewriter buffer system — controls display speed independently of stream speed
  const streamBuffer = useRef('')
  const displayedLength = useRef(0)
  const streamInterval = useRef<ReturnType<typeof setInterval> | null>(null)
  const streamComplete = useRef(false)
  const finalMessage = useRef<ChatMessage | null>(null)
  const agenteTipoRef = useRef(agenteTipo)

  // Keep agenteTipoRef in sync
  useEffect(() => {
    agenteTipoRef.current = agenteTipo
  }, [agenteTipo])

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (streamInterval.current) {
        clearInterval(streamInterval.current)
        streamInterval.current = null
      }
    }
  }, [])

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data: empresa } = await supabase
          .from('empresas')
          .select('id')
          .eq('user_id', user.id)
          .single()

        if (!empresa) return
        setEmpresaId(empresa.id)

        const { data: convs } = await supabase
          .from('conversaciones')
          .select('*')
          .eq('empresa_id', empresa.id)
          .order('updated_at', { ascending: false })

        if (convs) setConversaciones(convs)

        const convActual = convs?.find(c => c.id === conversacionId)
        if (convActual) {
          setAgenteTipo(convActual.agente_tipo || 'general')
          setEstilo((convActual.estilo as EstiloComunicacion) || 'directo')
        }

        const { data: msgs } = await supabase
          .from('mensajes')
          .select('*')
          .eq('conversacion_id', conversacionId)
          .order('created_at', { ascending: true })

        if (msgs) setMensajes(msgs)

        // Empty conversation — show suggestions immediately (no auto-first-message)

        // Show onboarding tour if first time
        if (typeof window !== 'undefined' && !localStorage.getItem('orbbi_tour_completed')) {
          setMostrarTour(true)
        }
      } catch (err) {
        console.error('Error cargando datos:', err)
        setError('Error cargando la conversación. Recarga la página.')
      } finally {
        setCargandoInicial(false)
      }
    }

    cargarDatos()
  }, [conversacionId])

  const enviarMensaje = useCallback(async (texto: string, archivo?: ArchivoInfo) => {
    if (!empresaId || cargando) return
    setError(null)

    // Build display text: if there's a file, show it in the message
    const contenidoDisplay = archivo
      ? `${texto}\n\n📎 ${archivo.nombre}`
      : texto

    const mensajeUsuario: ChatMessage = {
      id: crypto.randomUUID(),
      rol: 'user',
      contenido: contenidoDisplay,
      created_at: new Date().toISOString()
    }
    setMensajes((prev) => [...prev, mensajeUsuario])
    setCargando(true)
    setStreamingText('')

    try {
      await supabase.from('mensajes').insert({
        conversacion_id: conversacionId,
        rol: 'user',
        contenido: contenidoDisplay
      })

      // Use streaming API
      abortRef.current = new AbortController()
      const response = await authFetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mensaje: texto,
          conversacion_id: conversacionId,
          empresa_id: empresaId,
          ...(archivo ? { archivo_id: archivo.id } : {}),
        }),
        signal: abortRef.current.signal,
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.error || 'Error del servidor')
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      // Reset typewriter buffer state
      streamBuffer.current = ''
      displayedLength.current = 0
      streamComplete.current = false
      finalMessage.current = null

      // Start the typewriter interval — releases chars at a steady pace
      if (streamInterval.current) {
        clearInterval(streamInterval.current)
      }
      streamInterval.current = setInterval(() => {
        if (displayedLength.current < streamBuffer.current.length) {
          // Release 2 chars per tick (or 3 for spaces for smoother feel)
          const nextChar = streamBuffer.current[displayedLength.current]
          const step = nextChar === ' ' ? 3 : 2
          displayedLength.current = Math.min(displayedLength.current + step, streamBuffer.current.length)
          setStreamingText(streamBuffer.current.slice(0, displayedLength.current))
        } else if (streamComplete.current && displayedLength.current >= streamBuffer.current.length) {
          // Stream is done AND we've displayed everything — show final message
          clearInterval(streamInterval.current!)
          streamInterval.current = null
          setStreamingText('')

          const finalMsg = finalMessage.current
          if (finalMsg) {
            setMensajes((prev) => [...prev, finalMsg])
            // Check for cross-referral
            if (finalMsg.rol === 'assistant' && finalMsg.contenido) {
              const referral = detectCrossReferral(agenteTipoRef.current, finalMsg.contenido)
              if (referral) {
                setCrossReferrals(prev => ({ ...prev, [finalMsg.id]: referral }))
              }
            }
          }

          displayedLength.current = 0
          streamBuffer.current = ''
          streamComplete.current = false
          finalMessage.current = null
        }
      }, 15) // ~130 chars/sec

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6))
                if (data.text) {
                  streamBuffer.current += data.text
                }
                if (data.done && data.mensaje) {
                  finalMessage.current = data.mensaje
                  streamComplete.current = true
                }
                if (data.error) {
                  throw new Error(data.error)
                }
              } catch (e) {
                if (e instanceof SyntaxError) continue
                throw e
              }
            }
          }
        }
      }

      // Auto-title the conversation
      if (mensajes.length === 0) {
        const tituloCorto = texto.length > 40 ? texto.substring(0, 40) + '...' : texto
        await supabase
          .from('conversaciones')
          .update({ titulo: tituloCorto })
          .eq('id', conversacionId)

        setConversaciones((prev) =>
          prev.map((c) =>
            c.id === conversacionId ? { ...c, titulo: tituloCorto } : c
          )
        )
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return
      console.error('Error enviando mensaje:', err)
      const errorMsg = err instanceof Error ? err.message : 'Error al procesar tu mensaje'
      // Clean up typewriter interval on error
      if (streamInterval.current) {
        clearInterval(streamInterval.current)
        streamInterval.current = null
      }
      streamBuffer.current = ''
      displayedLength.current = 0
      streamComplete.current = false
      finalMessage.current = null
      setStreamingText('')
      setError(errorMsg)
      setMensajes((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          rol: 'assistant',
          contenido: `Lo siento, hubo un error: ${errorMsg}. Intenta de nuevo.`,
          created_at: new Date().toISOString()
        }
      ])
    } finally {
      setCargando(false)
    }
  }, [empresaId, cargando, conversacionId, mensajes.length])

  const crearConversacion = async (tipo: TipoAgente, estiloNuevo: EstiloComunicacion = 'directo') => {
    if (!empresaId) return
    const agente = AGENTES.find(a => a.tipo === tipo)
    const estiloInfo = ESTILOS.find(e => e.id === estiloNuevo)
    const titulo = agente ? `Chat con ${agente.nombre} (${estiloInfo?.nombre || 'Directo'})` : 'Nueva conversación'

    const { data } = await supabase
      .from('conversaciones')
      .insert({ empresa_id: empresaId, titulo, agente_tipo: tipo, estilo: estiloNuevo })
      .select()
      .single()

    if (data) {
      setConversaciones((prev) => [data, ...prev])
      window.location.href = `/chat/${data.id}`
    }
  }

  const renombrarConversacion = async (id: string, nuevoTitulo: string) => {
    await authFetch(`/api/conversaciones/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo: nuevoTitulo }),
    })
    setConversaciones((prev) =>
      prev.map((c) => c.id === id ? { ...c, titulo: nuevoTitulo } : c)
    )
  }

  const eliminarConversacion = async (id: string) => {
    await authFetch(`/api/conversaciones/${id}`, { method: 'DELETE' })
    setConversaciones((prev) => prev.filter((c) => c.id !== id))
    if (id === conversacionId) {
      window.location.href = '/chat'
    }
  }

  const exportarConversacion = () => {
    const agente = AGENTES.find(a => a.tipo === agenteTipo) || AGENTES[0]
    const texto = mensajes.map(m =>
      `[${m.rol === 'user' ? 'Tú' : agente.nombre}] ${new Date(m.created_at).toLocaleString('es-CL')}\n${m.contenido}`
    ).join('\n\n---\n\n')

    const blob = new Blob([texto], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `orbbi-${agente.tipo}-${new Date().toISOString().slice(0, 10)}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const agenteActual = AGENTES.find(a => a.tipo === agenteTipo) || AGENTES[0]

  if (cargandoInicial) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-6 w-6 border-b border-accent" />
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-ink/30 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:relative z-40 h-full transition-transform duration-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <ChatSidebar
          conversaciones={conversaciones}
          conversacionActiva={conversacionId}
          onNuevaConversacion={crearConversacion}
          onRenombrar={renombrarConversacion}
          onEliminar={eliminarConversacion}
        />
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-[44px] border-b border-[#e9e9e7] bg-white px-4 md:px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-[#9b9a97] hover:text-[#37352f]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
            </button>
            <h1 className="text-[13px] text-[#37352f] font-medium">{agenteActual.nombre}</h1>
            <span className="text-[10px] text-[#9b9a97] bg-[#f7f6f3] px-2 py-0.5 rounded">
              {ESTILOS.find(e => e.id === estilo)?.nombre || 'Directo'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {mensajes.length > 0 && (
              <button onClick={exportarConversacion} className="text-[#c4c4c0] hover:text-[#37352f] transition-colors" title="Exportar">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </button>
            )}
            <button onClick={async () => { await supabase.auth.signOut(); window.location.href = '/login' }}
              className="text-[12px] text-[#9b9a97] hover:text-[#37352f] transition-colors">
              Salir
            </button>
          </div>
        </header>

        {/* Error banner */}
        {error && (
          <div className="bg-red-500/10 border-b border-red-500/20 px-4 py-2 flex items-center justify-between">
            <p className="text-xs text-red-400">{error}</p>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-300 text-xs">✕</button>
          </div>
        )}

        {/* Messages */}
        <ChatMessages
          mensajes={mensajes}
          cargando={cargando}
          streamingText={streamingText}
          agenteTipo={agenteTipo}
          empresaId={empresaId}
          onSugerencia={(texto: string) => enviarMensaje(texto)}
          crossReferrals={crossReferrals}
          onCrossReferral={(tipo) => crearConversacion(tipo)}
        />

        {/* Input */}
        <ChatInput onEnviar={enviarMensaje} deshabilitado={cargando} empresaId={empresaId} />
      </div>

      {/* Onboarding tour */}
      {mostrarTour && (
        <OnboardingTour onComplete={() => {
          localStorage.setItem('orbbi_tour_completed', 'true')
          setMostrarTour(false)
        }} />
      )}

      {/* Push notifications prompt */}
      {empresaId && <PushNotifications empresaId={empresaId} />}
    </div>
  )
}
