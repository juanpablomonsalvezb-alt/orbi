'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase-client'

export default function ExportarPage() {
  const [empresaId, setEmpresaId] = useState<string | null>(null)
  const [descargando, setDescargando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const cargarEmpresa = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: empresa } = await supabase
        .from('empresas')
        .select('id')
        .eq('user_id', user.id)
        .single()

      if (empresa) setEmpresaId(empresa.id)
    }
    cargarEmpresa()
  }, [])

  const descargar = async () => {
    if (!empresaId) return
    setDescargando(true)
    setError(null)

    try {
      const response = await fetch(`/api/export?empresa_id=${empresaId}`)
      if (!response.ok) throw new Error('Error al exportar')

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `orbbi-export-${new Date().toISOString().slice(0, 10)}.json`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      setError('Error descargando los datos. Intenta de nuevo.')
    } finally {
      setDescargando(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-[480px] w-full">
        <a href="/chat" className="text-[13px] text-[#9b9a97] hover:text-[#37352f] transition-colors mb-8 inline-block">
          &larr; Volver al chat
        </a>

        <h1 className="text-[28px] font-semibold text-[#37352f] mb-2" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
          Exportar mis datos
        </h1>
        <p className="text-[15px] text-[#9b9a97] mb-8">
          Descarga todos tus datos en formato JSON. Cumplimiento GDPR.
        </p>

        <div className="bg-[#f7f6f3] rounded-lg p-5 mb-6 border border-[#e9e9e7]">
          <p className="text-[13px] font-medium text-[#37352f] mb-3">Se incluye:</p>
          <ul className="space-y-2">
            {[
              'Informacion de tu empresa',
              'Respuestas del onboarding',
              'Todas las conversaciones y mensajes',
              'Memorias de los agentes',
              'Tareas creadas',
              'Feedback enviado',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-[13px] text-[#37352f]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#37a169" strokeWidth="2" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4">
            <p className="text-[13px] text-red-600">{error}</p>
          </div>
        )}

        <button
          onClick={descargar}
          disabled={descargando || !empresaId}
          className="w-full bg-[#37352f] text-white text-[14px] py-3 rounded-lg hover:bg-[#2f3437] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {descargando ? 'Descargando...' : 'Descargar todos mis datos'}
        </button>
      </div>
    </div>
  )
}
