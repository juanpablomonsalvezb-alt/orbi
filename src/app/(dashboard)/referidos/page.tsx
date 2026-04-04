'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase-client'
import { authFetch } from '@/lib/auth-fetch'

export default function ReferidosPage() {
  const [link, setLink] = useState('')
  const [copiado, setCopiado] = useState(false)
  const [empresaNombre, setEmpresaNombre] = useState('')

  useEffect(() => {
    const cargar = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: empresa } = await supabase
        .from('empresas')
        .select('id, nombre')
        .eq('user_id', user.id)
        .single()

      if (!empresa) return

      setEmpresaNombre(empresa.nombre)
      const res = await authFetch(`/api/referidos?empresa_id=${empresa.id}`)
      if (res.ok) {
        const data = await res.json()
        setLink(data.link)
      }
    }
    cargar()
  }, [])

  const copiar = () => {
    navigator.clipboard.writeText(link)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 3000)
  }

  const mensajeWhatsApp = encodeURIComponent(
    `Te recomiendo Orbbi — son 7 gerentes de IA para tu negocio por $29/mes. Yo lo uso para ${empresaNombre} y es increíble. Pruébalo gratis 7 días: ${link}`
  )

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-xl mx-auto px-6 py-16">
        <h1 className="text-[28px] text-[#37352f] mb-2" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
          Invita y gana
        </h1>
        <p className="text-[15px] text-[#9b9a97] mb-10" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
          Comparte Orbbi con otro emprendedor. Tú ganas 1 mes de un agente extra gratis. Tu invitado recibe 14 días de prueba.
        </p>

        {/* Referral link */}
        <div className="bg-[#f7f6f3] border border-[#e9e9e7] rounded-xl p-6 mb-8">
          <p className="text-[12px] text-[#9b9a97] uppercase tracking-wider font-medium mb-3">Tu link personal</p>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={link}
              readOnly
              className="flex-1 bg-white border border-[#e9e9e7] rounded-lg px-4 py-2.5 text-[14px] text-[#37352f]"
            />
            <button
              onClick={copiar}
              className={`px-5 py-2.5 rounded-lg text-[13px] font-medium transition-colors ${
                copiado ? 'bg-green-100 text-green-700' : 'bg-[#37352f] text-white hover:bg-[#2f3437]'
              }`}
            >
              {copiado ? 'Copiado' : 'Copiar'}
            </button>
          </div>
        </div>

        {/* Share buttons */}
        <div className="space-y-3">
          <a
            href={`https://wa.me/?text=${mensajeWhatsApp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white rounded-lg py-3 text-[14px] font-medium hover:bg-[#1eb954] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.632-1.467A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.115 0-4.075-.652-5.693-1.766l-.408-.243-2.75.871.838-2.675-.267-.424A9.697 9.697 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
            Compartir por WhatsApp
          </a>

          <button
            onClick={() => {
              const subject = encodeURIComponent('Te recomiendo Orbbi para tu negocio')
              const body = encodeURIComponent(`Hola,\n\nTe recomiendo Orbbi — son 7 gerentes de IA para tu negocio por $29/mes.\n\nPruébalo gratis 7 días: ${link}\n\nSaludos`)
              window.open(`mailto:?subject=${subject}&body=${body}`)
            }}
            className="flex items-center justify-center gap-2 w-full border border-[#e9e9e7] text-[#37352f] rounded-lg py-3 text-[14px] font-medium hover:bg-[#f7f6f3] transition-colors"
          >
            Compartir por email
          </button>
        </div>

        {/* How it works */}
        <div className="mt-12 pt-8 border-t border-[#e9e9e7]">
          <h3 className="text-[16px] text-[#37352f] font-medium mb-4">Cómo funciona</h3>
          <div className="space-y-3">
            {[
              { step: '1', text: 'Comparte tu link con otro emprendedor' },
              { step: '2', text: 'Ellos se registran y prueban Orbbi 14 días gratis' },
              { step: '3', text: 'Cuando contratan un plan, tú recibes 1 mes de un agente extra gratis' },
            ].map(item => (
              <div key={item.step} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#f7f6f3] flex items-center justify-center text-[12px] text-[#9b9a97] font-medium shrink-0">{item.step}</span>
                <p className="text-[14px] text-[#37352f]" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
