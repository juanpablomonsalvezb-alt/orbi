import Link from 'next/link'
import OrbiLogo from '@/components/ui/OrbiLogo'

export const metadata = {
  title: 'Política de Privacidad — Orbbi',
}

export default function PrivacidadPage() {
  return (
    <div className="bg-ivory-mid min-h-screen">
      <nav className="sticky top-0 z-50 bg-ivory-mid h-[4.25rem]">
        <div className="max-w-3xl mx-auto px-6 h-full flex items-center">
          <Link href="/"><OrbiLogo size={36} color="dark" /></Link>
        </div>
      </nav>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-normal text-ink mb-8" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
          Política de Privacidad
        </h1>
        <div className="prose prose-sm text-ink-light space-y-6" style={{ fontFamily: "'Source Serif 4', Georgia, serif", lineHeight: 1.7 }}>
          <p><strong>Última actualización:</strong> Abril 2026</p>

          <h2 className="text-lg text-ink font-medium mt-8">1. Información que recopilamos</h2>
          <p><strong>Datos de cuenta:</strong> nombre de empresa, email, contraseña (encriptada).</p>
          <p><strong>Datos de onboarding:</strong> respuestas a las 7 preguntas sobre tu negocio (rubro, finanzas, clientes, metas).</p>
          <p><strong>Conversaciones:</strong> mensajes entre tú y los agentes de Orbbi.</p>
          <p><strong>Datos de uso:</strong> páginas visitadas, frecuencia de uso, agentes utilizados (via PostHog).</p>

          <h2 className="text-lg text-ink font-medium mt-8">2. Cómo usamos tu información</h2>
          <p>Tus datos de negocio se usan exclusivamente para personalizar las respuestas de tus agentes. No entrenamos modelos de IA con tus datos. No vendemos ni compartimos tu información con terceros.</p>

          <h2 className="text-lg text-ink font-medium mt-8">3. Almacenamiento y seguridad</h2>
          <p>Tus datos se almacenan en Supabase (PostgreSQL) con Row-Level Security. Cada empresa solo puede acceder a sus propios datos. Las contraseñas se encriptan con bcrypt. La comunicación es HTTPS en todo momento.</p>

          <h2 className="text-lg text-ink font-medium mt-8">4. Procesador de IA</h2>
          <p>Usamos Google Gemini para generar respuestas. Tus mensajes se envían a la API de Google con tu contexto de negocio. Google no almacena las conversaciones de la API según sus términos de servicio para desarrolladores.</p>

          <h2 className="text-lg text-ink font-medium mt-8">5. Pagos</h2>
          <p>Los pagos se procesan a través de Stripe. Orbbi no almacena números de tarjeta. Stripe cumple con PCI DSS Level 1.</p>

          <h2 className="text-lg text-ink font-medium mt-8">6. Tus derechos</h2>
          <p>Puedes solicitar la exportación o eliminación de todos tus datos escribiendo a <a href="mailto:privacidad@orbbi.com" className="text-accent hover:underline">privacidad@orbbi.com</a>. Procesaremos tu solicitud en un máximo de 30 días.</p>

          <h2 className="text-lg text-ink font-medium mt-8">7. Cookies y analytics</h2>
          <p>Usamos PostHog para analytics de producto. Puedes optar por no ser rastreado configurando &quot;Do Not Track&quot; en tu navegador.</p>

          <h2 className="text-lg text-ink font-medium mt-8">8. Contacto</h2>
          <p>Para consultas de privacidad: <a href="mailto:privacidad@orbbi.com" className="text-accent hover:underline">privacidad@orbbi.com</a></p>
        </div>
      </div>
    </div>
  )
}
