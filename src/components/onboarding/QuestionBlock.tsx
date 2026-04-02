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
      <label className="block text-sm text-ink mb-2">
        <span className="text-accent font-medium mr-1">{pregunta.orden}.</span>
        {pregunta.pregunta}
      </label>
      <textarea
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder={pregunta.placeholder}
        rows={2}
        className="w-full rounded-md border border-ink/[0.08] px-3 py-2.5 text-sm text-ink bg-ivory
                   resize-none placeholder:text-muted/50
                   focus:outline-none focus:border-ink/25 transition-colors"
      />
    </div>
  )
}
