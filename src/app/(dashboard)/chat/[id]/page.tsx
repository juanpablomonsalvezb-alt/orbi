'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'
import { ChatMessage } from '@/types/chat'
import { Conversacion } from '@/types/database'
import ChatMessages from '@/components/chat/ChatMessages'
import ChatInput from '@/components/chat/ChatInput'
import ChatSidebar from '@/components/chat/ChatSidebar'
import OrbiLogo from '@/components/ui/OrbiLogo'

export default function ChatPage() {
  const params = useParams()
  const conversacionId = params.id as string

  const [mensajes, setMensajes] = useState<ChatMessage[]>([])
  const [conversaciones, setConversaciones] = useState<Conversacion[]>([])
  const [empresaId, setEmpresaId] = useState<string>('')
  const [cargando, setCargando] = useState(false)
  const [cargandoInicial, setCargandoInicial] = useState(true)

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

        const { data: msgs } = await supabase
          .from('mensajes')
          .select('*')
          .eq('conversacion_id', conversacionId)
          .order('created_at', { ascending: true })

        if (msgs) setMensajes(msgs)
      } catch (error) {
        console.error('Error cargando datos:', error)
      } finally {
        setCargandoInicial(false)
      }
    }

    cargarDatos()
  }, [conversacionId])

  const enviarMensaje = useCallback(async (texto: string) => {
    if (!empresaId || cargando) return

    const mensajeUsuario: ChatMessage = {
      id: crypto.randomUUID(),
      rol: 'user',
      contenido: texto,
      created_at: new Date().toISOString()
    }
    setMensajes((prev) => [...prev, mensajeUsuario])
    setCargando(true)

    try {
      await supabase.from('mensajes').insert({
        conversacion_id: conversacionId,
        rol: 'user',
        contenido: texto
      })

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mensaje: texto,
          conversacion_id: conversacionId,
          empresa_id: empresaId
        })
      })

      const data = await response.json()

      if (data.error) throw new Error(data.error)

      setMensajes((prev) => [...prev, data.mensaje])

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
    } catch (error) {
      console.error('Error enviando mensaje:', error)
      setMensajes((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          rol: 'assistant',
          contenido: 'Lo siento, hubo un error al procesar tu mensaje. Intenta de nuevo.',
          created_at: new Date().toISOString()
        }
      ])
    } finally {
      setCargando(false)
    }
  }, [empresaId, cargando, conversacionId, mensajes.length])

  const crearConversacion = async () => {
    if (!empresaId) return

    const { data } = await supabase
      .from('conversaciones')
      .insert({
        empresa_id: empresaId,
        titulo: 'Nueva conversación'
      })
      .select()
      .single()

    if (data) {
      setConversaciones((prev) => [data, ...prev])
      window.location.href = `/chat/${data.id}`
    }
  }

  if (cargandoInicial) {
    return (
      <div className="flex h-screen items-center justify-center bg-obsidian">
        <div className="animate-spin rounded-full h-6 w-6 border-b border-ceniza" />
      </div>
    )
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <ChatSidebar
        conversaciones={conversaciones}
        conversacionActiva={conversacionId}
        onNuevaConversacion={crearConversacion}
      />

      {/* Área principal del chat */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-14 border-b border-humo/50 bg-white px-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <OrbiLogo size={24} showText={false} className="text-obsidian" />
            <div>
              <h1 className="text-[14px] font-medium text-obsidian">orbbi</h1>
              <p className="text-[11px] text-ceniza">Tu gerente virtual</p>
            </div>
          </div>
          <button
            onClick={async () => {
              await supabase.auth.signOut()
              window.location.href = '/login'
            }}
            className="text-[13px] text-ceniza hover:text-obsidian transition-colors"
          >
            Salir
          </button>
        </header>

        {/* Mensajes — fondo oscuro */}
        <ChatMessages mensajes={mensajes} cargando={cargando} />

        {/* Input — fondo oscuro */}
        <ChatInput onEnviar={enviarMensaje} deshabilitado={cargando} />
      </div>
    </div>
  )
}
