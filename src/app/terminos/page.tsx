import Link from 'next/link'
import OrbiLogo from '@/components/ui/OrbiLogo'

export const metadata = {
  title: 'Términos de Servicio — Orbbi',
}

export default function TerminosPage() {
  return (
    <div className="bg-ivory-mid min-h-screen">
      <nav className="sticky top-0 z-50 bg-ivory-mid h-[4.25rem]">
        <div className="max-w-3xl mx-auto px-6 h-full flex items-center">
          <Link href="/"><OrbiLogo size={36} color="dark" /></Link>
        </div>
      </nav>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-normal text-ink mb-8" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
          Términos de Servicio
        </h1>
        <div className="prose prose-sm text-ink-light space-y-6" style={{ fontFamily: "'Source Serif 4', Georgia, serif", lineHeight: 1.7 }}>
          <p><strong>Última actualización:</strong> Abril 2026</p>

          <h2 className="text-lg text-ink font-medium mt-8">1. Descripción del servicio</h2>
          <p>Orbbi es una plataforma SaaS que proporciona agentes virtuales de gestión empresarial impulsados por inteligencia artificial para pequeñas y medianas empresas (PYMEs) en Latinoamérica.</p>

          <h2 className="text-lg text-ink font-medium mt-8">2. Cuenta y registro</h2>
          <p>Al crear una cuenta, proporcionas información veraz y actual. Eres responsable de mantener la seguridad de tu cuenta y contraseña. Orbbi no será responsable de pérdidas causadas por acceso no autorizado a tu cuenta.</p>

          <h2 className="text-lg text-ink font-medium mt-8">3. Prueba gratuita</h2>
          <p>Las nuevas cuentas incluyen una prueba gratuita de 48 horas con acceso a todos los agentes. Al finalizar la prueba, necesitas seleccionar un plan de pago para continuar usando el servicio.</p>

          <h2 className="text-lg text-ink font-medium mt-8">4. Pagos y facturación</h2>
          <p>Los pagos se procesan a través de Stripe. Al suscribirte, autorizas el cobro recurrente según el plan elegido. Puedes cancelar en cualquier momento desde tu panel de facturación. Las suscripciones mensuales se cancelan sin penalidad. Las anuales dan acceso hasta el fin del período pagado.</p>

          <h2 className="text-lg text-ink font-medium mt-8">5. Uso del servicio</h2>
          <p>Los agentes de Orbbi proporcionan orientación y análisis basados en la información que compartes. Las recomendaciones no constituyen asesoría profesional certificada (financiera, legal, contable). Para decisiones críticas, consulta con profesionales certificados.</p>

          <h2 className="text-lg text-ink font-medium mt-8">6. Privacidad de datos</h2>
          <p>La información de tu empresa se almacena de forma segura y solo se usa para personalizar las respuestas de tus agentes. No compartimos tus datos con terceros. Consulta nuestra <Link href="/privacidad" className="text-accent hover:underline">Política de Privacidad</Link> para más detalles.</p>

          <h2 className="text-lg text-ink font-medium mt-8">7. Limitaciones</h2>
          <p>Orbbi se proporciona &quot;tal como está&quot;. No garantizamos que las recomendaciones de los agentes sean correctas en todos los casos. La responsabilidad máxima de Orbbi se limita al monto pagado en los últimos 12 meses.</p>

          <h2 className="text-lg text-ink font-medium mt-8">8. Modificaciones</h2>
          <p>Podemos actualizar estos términos. Te notificaremos por email sobre cambios significativos. El uso continuado del servicio constituye aceptación de los términos actualizados.</p>

          <h2 className="text-lg text-ink font-medium mt-8">9. Contacto</h2>
          <p>Para consultas sobre estos términos: <a href="mailto:legal@orbbi.com" className="text-accent hover:underline">legal@orbbi.com</a></p>
        </div>
      </div>
    </div>
  )
}
