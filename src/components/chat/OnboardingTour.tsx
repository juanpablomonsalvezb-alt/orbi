'use client'

import { useState } from 'react'

interface OnboardingTourProps {
  onComplete: () => void
}

const PASOS = [
  {
    titulo: 'Tu equipo de 7 gerentes',
    descripcion: 'Crea conversaciones con cualquier agente: finanzas, ventas, marketing, RRHH, inventario o legal.',
    icono: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#37352f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    titulo: 'Conecta tus datos reales',
    descripcion: 'Pega un link de Google Sheets o sube un archivo y el agente analiza tus numeros reales.',
    icono: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#37352f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    titulo: 'Respuestas que llevan a accion',
    descripcion: 'Despues de cada respuesta, elige una opcion para profundizar. Tus tareas se guardan automaticamente.',
    icono: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#37352f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
  },
]

export default function OnboardingTour({ onComplete }: OnboardingTourProps) {
  const [paso, setPaso] = useState(0)

  const siguiente = () => {
    if (paso < PASOS.length - 1) {
      setPaso(paso + 1)
    } else {
      onComplete()
    }
  }

  const saltar = () => {
    onComplete()
  }

  const actual = PASOS[paso]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl max-w-[420px] w-full mx-4 p-8" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#f7f6f3] flex items-center justify-center">
            {actual.icono}
          </div>
        </div>

        {/* Content */}
        <h2 className="text-[20px] font-semibold text-[#37352f] text-center mb-3">
          {actual.titulo}
        </h2>
        <p className="text-[15px] text-[#9b9a97] text-center leading-relaxed mb-8">
          {actual.descripcion}
        </p>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-6">
          {PASOS.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === paso ? 'bg-[#37352f]' : 'bg-[#e9e9e7]'
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={saltar}
            className="text-[13px] text-[#9b9a97] hover:text-[#37352f] transition-colors"
          >
            Saltar
          </button>
          <button
            onClick={siguiente}
            className="bg-[#37352f] text-white text-[13px] px-6 py-2 rounded-lg hover:bg-[#2f3437] transition-colors"
          >
            {paso < PASOS.length - 1 ? 'Siguiente' : 'Comenzar'}
          </button>
        </div>
      </div>
    </div>
  )
}
