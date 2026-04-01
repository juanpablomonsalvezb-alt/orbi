'use client'

import { PreguntaOnboarding } from '@/lib/constants'

interface QuestionBlockProps {
  pregunta: PreguntaOnboarding
  valor: string
  onChange: (valor: string) => void
}

export default function QuestionBlock({ pregunta, valor, onChange }: QuestionBlockProps) {
  return (
    <div>
      <label className="block text-[14px] font-normal text-obsidian mb-2">
        <span className="text-señal font-medium mr-1.5">{pregunta.orden}.</span>
        {pregunta.pregunta}
      </label>
      <textarea
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder={pregunta.placeholder}
        rows={2}
        className="w-full rounded-[8px] border border-humo px-3.5 py-2.5 text-[14px] font-normal
                   resize-none bg-transparent placeholder:text-ceniza
                   focus:outline-none focus:border-obsidian transition-colors"
      />
    </div>
  )
}
