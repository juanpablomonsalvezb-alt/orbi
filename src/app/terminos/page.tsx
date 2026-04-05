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

          <h2 className="text-lg text-ink font-medium mt-8">3. Demo gratuita</h2>
          <p>Orbbi ofrece una demo gratuita sin necesidad de registro para que puedas conocer el producto. Para acceso completo a todos los agentes, necesitas crear una cuenta y seleccionar un plan de pago.</p>

          <h2 className="text-lg text-ink font-medium mt-8">4. Pagos y facturación</h2>
          <p>Los pagos se procesan a través de MercadoPago. Al suscribirte, autorizas el cobro recurrente según el plan elegido. Puedes cancelar en cualquier momento desde tu panel de facturación. Las suscripciones mensuales se cancelan sin penalidad. Las anuales dan acceso hasta el fin del período pagado.</p>

          <h2 className="text-lg text-ink font-medium mt-8">5. Uso del servicio y limitaciones de la IA</h2>
          <p>Los agentes de Orbbi son sistemas de inteligencia artificial generativa. Sus respuestas se generan automáticamente mediante modelos de lenguaje y pueden contener errores, imprecisiones o información desactualizada. Las recomendaciones NO constituyen asesoría profesional certificada en ninguna materia (financiera, legal, contable, tributaria, laboral). El usuario acepta que: (a) verificará de forma independiente cualquier información antes de tomar decisiones; (b) consultará con profesionales certificados para decisiones críticas; (c) Orbbi no será responsable por pérdidas derivadas de actuar con base en las respuestas.</p>

          <h2 className="text-lg text-ink font-medium mt-8">6. Privacidad de datos</h2>
          <p>La información de tu empresa se almacena de forma segura y solo se usa para personalizar las respuestas de tus agentes. No compartimos tus datos con terceros. Consulta nuestra <Link href="/privacidad" className="text-accent hover:underline">Política de Privacidad</Link> para más detalles.</p>

          <h2 className="text-lg text-ink font-medium mt-8">7. Limitaciones</h2>
          <p>Orbbi se proporciona &quot;tal como está&quot;. No garantizamos que las recomendaciones de los agentes sean correctas en todos los casos. La responsabilidad máxima de Orbbi se limita al monto pagado en los últimos 12 meses.</p>

          <h2 className="text-lg text-ink font-medium mt-8">8. Modificaciones</h2>
          <p>Podemos actualizar estos términos. Te notificaremos por email sobre cambios significativos. El uso continuado del servicio constituye aceptación de los términos actualizados.</p>

          <h2 className="text-lg text-ink font-medium mt-8">8.5. Propiedad intelectual</h2>
          <p>Tus datos y contenido te pertenecen. Orbbi no reclama propiedad sobre ellos. Las respuestas de los agentes se proporcionan como herramienta y puedes usarlas libremente. La plataforma, código, diseño y marca son propiedad de Orbbi.</p>

          <h2 className="text-lg text-ink font-medium mt-8">9. Contacto</h2>
          <p>Para consultas sobre estos términos: <a href="mailto:legal@orbbilatam.com" className="text-accent hover:underline">legal@orbbilatam.com</a></p>

          <h2 className="text-lg text-ink font-medium mt-8">9.5. Ley aplicable</h2>
          <p>Estos términos se rigen por las leyes de la República de Chile. Disputas serán sometidas a tribunales de Santiago de Chile, sin perjuicio de derechos del consumidor en tu país.</p>

          <h2 className="text-lg text-ink font-medium mt-8">10. Suspensión</h2>
          <p>Orbbi puede suspender tu cuenta si: incumples términos, uso ilegal, acceso a datos de terceros, impago mayor a 30 días. Podrás exportar datos 30 días después de la notificación.</p>

          <h2 className="text-lg text-ink font-medium mt-8">11. Edad mínima</h2>
          <p>Debes tener al menos 18 años para crear una cuenta.</p>
        </div>
      </div>
    </div>
  )
}
