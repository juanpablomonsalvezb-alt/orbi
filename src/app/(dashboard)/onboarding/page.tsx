'use client'

import OrbiLogo from '@/components/ui/OrbiLogo'
import OnboardingForm from '@/components/onboarding/OnboardingForm'

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-ivory py-16 px-6">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <OrbiLogo size={28} showText={false} color="dark" />
        </div>
        <h1 className="text-ink" style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '28px', fontWeight: 400, letterSpacing: '-0.5px' }}>
          Configuremos tu agente
        </h1>
        <p className="text-sm text-muted mt-2">
          Responde estas preguntas para que orbbi conozca tu negocio.
        </p>
      </div>
      <OnboardingForm />
    </div>
  )
}
