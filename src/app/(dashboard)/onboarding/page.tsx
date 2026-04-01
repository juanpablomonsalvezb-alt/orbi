'use client'

import OrbiLogo from '@/components/ui/OrbiLogo'
import OnboardingForm from '@/components/onboarding/OnboardingForm'

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <OrbiLogo size={32} showText={false} className="text-obsidian" />
        </div>
        <h1 className="text-display text-obsidian">Configuremos tu agente</h1>
        <p className="text-caption mt-3">
          Responde estas preguntas para que orbbi conozca tu negocio en profundidad.
        </p>
      </div>

      <OnboardingForm />
    </div>
  )
}
