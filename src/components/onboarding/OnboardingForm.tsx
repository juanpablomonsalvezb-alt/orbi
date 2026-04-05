'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'
import { PREGUNTAS_ONBOARDING } from '@/lib/constants'

export default function OnboardingForm() {
  const router = useRouter()
  const [respuestas, setRespuestas] = useState<string[]>(
    new Array(PREGUNTAS_ONBOARDING.length).fill('')
  )
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  const requeridas = PREGUNTAS_ONBOARDING.filter(p => !p.opcional)
  const completo = requeridas.every((p) => respuestas[p.orden - 1]?.trim() !== '')

  const guardar = async () => {
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
      <p className="text-sm text-muted mb-8">
        3 preguntas rápidas para que tu equipo conozca tu negocio.
      </p>

      {error && (
        <div className="bg-accent-bg border border-accent/15 text-accent text-sm rounded-md px-3 py-2.5 mb-5">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {PREGUNTAS_ONBOARDING.map((pregunta, index) => (
          <div key={pregunta.orden}>
            {pregunta.opcional ? (
              <div className="border border-dashed border-ink/[0.12] rounded-xl p-5 bg-ivory/50">
                <div className="flex items-center gap-2 mb-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>
                  </svg>
                  <label className="text-sm font-medium text-ink">
                    {pregunta.pregunta}
                  </label>
                </div>
                <p className="text-xs text-muted mb-3">
                  Entre más datos compartes, más específicas serán las respuestas de tus agentes. Puedes pegar texto, tablas o listas.
                </p>
                <textarea
                  value={respuestas[index]}
                  onChange={(e) => {
                    const copia = [...respuestas]
                    copia[index] = e.target.value
                    setRespuestas(copia)
                  }}
                  placeholder={pregunta.placeholder}
                  rows={6}
                  className="w-full border border-ink/[0.08] rounded-lg px-4 py-3 text-sm text-ink bg-ivory
                             placeholder:text-muted/40 focus:outline-none focus:border-ink/25 transition-colors resize-none font-mono text-xs leading-relaxed"
                />
              </div>
            ) : (
              <>
                <label className="text-sm text-ink font-medium block mb-2">
                  {index + 1}. {pregunta.pregunta}
                </label>
                <textarea
                  value={respuestas[index]}
                  onChange={(e) => {
                    const copia = [...respuestas]
                    copia[index] = e.target.value
                    setRespuestas(copia)
                  }}
                  placeholder={pregunta.placeholder}
                  rows={2}
                  className="w-full border border-ink/[0.08] rounded-lg px-4 py-3 text-sm text-ink bg-ivory
                             placeholder:text-muted/50 focus:outline-none focus:border-ink/25 transition-colors resize-none"
                />
              </>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={guardar}
        disabled={!completo || cargando}
        className="w-full mt-8 rounded-lg bg-ink px-5 py-3 text-white text-sm font-medium
                   hover:bg-ink-mid transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {cargando ? 'Preparando tu equipo...' : 'Activar mis 7 gerentes'}
      </button>

      <p className="text-[11px] text-muted/40 text-center mt-3">
        Tus agentes usarán esta información para darte respuestas específicas.
      </p>
    </div>
  )
}
