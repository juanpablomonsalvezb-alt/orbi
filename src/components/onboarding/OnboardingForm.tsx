'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'
import { PREGUNTAS_ONBOARDING } from '@/lib/constants'
import QuestionBlock from './QuestionBlock'

export default function OnboardingForm() {
  const router = useRouter()
  const [respuestas, setRespuestas] = useState<string[]>(
    new Array(PREGUNTAS_ONBOARDING.length).fill('')
  )
  const [bloqueActual, setBloqueActual] = useState(1)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  const preguntasBloque = PREGUNTAS_ONBOARDING.filter((p) => p.bloque === bloqueActual)

  const bloques = [
    { num: 1, nombre: 'El negocio' },
    { num: 2, nombre: 'Finanzas' },
    { num: 3, nombre: 'Clientes' },
    { num: 4, nombre: 'Metas' },
  ]

  const actualizarRespuesta = (orden: number, valor: string) => {
    setRespuestas((prev) => {
      const copia = [...prev]
      copia[orden - 1] = valor
      return copia
    })
  }

  const bloqueCompleto = preguntasBloque.every((p) => respuestas[p.orden - 1].trim() !== '')

  const siguienteBloque = () => {
    if (bloqueActual < 4) setBloqueActual(bloqueActual + 1)
  }

  const bloqueAnterior = () => {
    if (bloqueActual > 1) setBloqueActual(bloqueActual - 1)
  }

  const guardarOnboarding = async () => {
    setError('')
    setCargando(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No autenticado')

      const { data: empresa } = await supabase
        .from('empresas')
        .select('id')
        .eq('user_id', user.id)
        .single()

      if (!empresa) throw new Error('Empresa no encontrada')

      const registros = PREGUNTAS_ONBOARDING.map((pregunta, index) => ({
        empresa_id: empresa.id,
        pregunta: pregunta.pregunta,
        respuesta: respuestas[index],
        bloque: pregunta.bloque,
        orden: pregunta.orden,
      }))

      const { error: insertError } = await supabase
        .from('contexto')
        .upsert(registros, { onConflict: 'empresa_id,orden' })

      if (insertError) throw insertError

      await supabase
        .from('empresas')
        .update({ onboarding_completado: true })
        .eq('id', empresa.id)

      const { data: conv } = await supabase
        .from('conversaciones')
        .insert({
          empresa_id: empresa.id,
          titulo: 'Chat con Gerente General',
          agente_tipo: 'general',
        })
        .select()
        .single()

      if (conv) {
        router.push(`/chat/${conv.id}`)
      } else {
        router.push('/chat')
      }
    } catch (err) {
      console.error('Error guardando onboarding:', err)
      setError('Error al guardar. Intenta de nuevo.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress bar */}
      <div className="flex items-center space-x-2 mb-10">
        {bloques.map((b) => (
          <div key={b.num} className="flex-1">
            <div
              className={`h-[2px] transition-colors ${
                b.num <= bloqueActual ? 'bg-ink' : 'bg-border-light'
              }`}
            />
            <p className={`text-[11px] mt-2 ${
              b.num === bloqueActual ? 'text-ink font-medium' : 'text-muted'
            }`}>
              {b.nombre}
            </p>
          </div>
        ))}
      </div>

      {/* Título del bloque */}
      <h2 className="text-lg font-medium text-ink mb-1">
        {bloques[bloqueActual - 1].nombre}
      </h2>
      <p className="text-sm text-muted mb-8">
        {bloqueActual === 1 && 'Cuéntanos sobre tu empresa para que orbbi la conozca.'}
        {bloqueActual === 2 && 'Información financiera básica para entender tu negocio.'}
        {bloqueActual === 3 && 'Sobre tus clientes y el mercado donde compites.'}
        {bloqueActual === 4 && 'Tus metas y las decisiones que más te importan.'}
      </p>

      {error && (
        <div className="bg-accent-bg border border-accent/15 text-accent text-sm rounded-md px-3 py-2.5 mb-5">
          {error}
        </div>
      )}

      {/* Preguntas */}
      <div className="space-y-5">
        {preguntasBloque.map((pregunta) => (
          <QuestionBlock
            key={pregunta.orden}
            pregunta={pregunta}
            valor={respuestas[pregunta.orden - 1]}
            onChange={(valor) => actualizarRespuesta(pregunta.orden, valor)}
          />
        ))}
      </div>

      {/* Navegación */}
      <div className="flex justify-between mt-10">
        <button
          onClick={bloqueAnterior}
          disabled={bloqueActual === 1}
          className="rounded-md border border-ink/10 px-5 py-2.5 text-sm font-medium text-ink
                     hover:bg-ivory-mid transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Anterior
        </button>

        {bloqueActual < 4 ? (
          <button
            onClick={siguienteBloque}
            disabled={!bloqueCompleto}
            className="rounded-md bg-ink px-5 py-2.5 text-white text-sm font-medium
                       hover:bg-ink-mid transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        ) : (
          <button
            onClick={guardarOnboarding}
            disabled={!bloqueCompleto || cargando}
            className="rounded-md bg-ink px-5 py-2.5 text-white text-sm font-medium
                       hover:bg-ink-mid transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {cargando ? 'Guardando...' : 'Comenzar con orbbi'}
          </button>
        )}
      </div>
    </div>
  )
}
