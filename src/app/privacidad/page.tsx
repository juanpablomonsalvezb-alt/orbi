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

          <h2 className="text-lg text-ink font-medium mt-8">0. Responsable del tratamiento</h2>
          <p><strong>Razón social:</strong> Orbbi SpA. <strong>Domicilio:</strong> Santiago, Chile. <strong>Contacto DPO:</strong> <a href="mailto:privacidad@orbbi.com" className="text-accent hover:underline">privacidad@orbbi.com</a></p>

          <h2 className="text-lg text-ink font-medium mt-8">1. Información que recopilamos</h2>
          <p><strong>Datos de cuenta:</strong> nombre de empresa, email, contraseña (encriptada).</p>
          <p><strong>Datos de onboarding:</strong> respuestas a las 3 preguntas sobre tu negocio (rubro, finanzas, clientes, metas).</p>
          <p><strong>Conversaciones:</strong> mensajes entre tú y los agentes de Orbbi.</p>
          <p><strong>Datos de uso:</strong> páginas visitadas, frecuencia de uso, agentes utilizados (via PostHog).</p>

          <h2 className="text-lg text-ink font-medium mt-8">2. Cómo usamos tu información</h2>
          <p>Tus datos de negocio se usan exclusivamente para personalizar las respuestas de tus agentes. No entrenamos modelos de IA con tus datos. No vendemos ni compartimos tu información con terceros.</p>

          <h2 className="text-lg text-ink font-medium mt-8">2.5. Base legal del tratamiento</h2>
          <p>Tratamos datos con base en: ejecución del contrato, consentimiento expreso al registrarte, intereses legítimos, obligaciones legales.</p>

          <h2 className="text-lg text-ink font-medium mt-8">3. Almacenamiento y seguridad</h2>
          <p>Tus datos se almacenan en Supabase (PostgreSQL) con Row-Level Security. Cada empresa solo puede acceder a sus propios datos. Las contraseñas se encriptan con bcrypt. La comunicación es HTTPS en todo momento.</p>

          <h2 className="text-lg text-ink font-medium mt-8">4. Procesador de IA</h2>
          <p>Usamos Google Gemini para generar respuestas. Tus mensajes se envían a la API de Google con tu contexto de negocio. Google no almacena las conversaciones de la API según sus términos de servicio para desarrolladores.</p>

          <h2 className="text-lg text-ink font-medium mt-8">5. Pagos</h2>
          <p>Los pagos se procesan a través de Stripe. Orbbi no almacena números de tarjeta. Stripe cumple con PCI DSS Level 1.</p>

          <h2 className="text-lg text-ink font-medium mt-8">6. Tus derechos (ARCO)</h2>
          <p>Tienes derecho a:</p>
          <ul>
            <li><strong>Acceso:</strong> solicitar una copia de tus datos personales.</li>
            <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
            <li><strong>Cancelación/Supresión:</strong> solicitar la eliminación de tus datos.</li>
            <li><strong>Oposición:</strong> oponerte al tratamiento de tus datos para fines específicos.</li>
            <li><strong>Portabilidad:</strong> exportar tus datos en formato estructurado desde <a href="/exportar" className="text-accent hover:underline">/exportar</a>.</li>
          </ul>
          <p>Para ejercer estos derechos, escribe a <a href="mailto:privacidad@orbbi.com" className="text-accent hover:underline">privacidad@orbbi.com</a>. Procesaremos tu solicitud en un máximo de 15 días hábiles.</p>

          <h2 className="text-lg text-ink font-medium mt-8">7. Cookies y analytics</h2>
          <p>Usamos PostHog para analytics de producto. Puedes optar por no ser rastreado configurando &quot;Do Not Track&quot; en tu navegador.</p>

          <h2 className="text-lg text-ink font-medium mt-8">7.5. Transferencia internacional de datos</h2>
          <p>Para operar el servicio, tus datos pueden ser procesados por proveedores ubicados fuera de tu país:</p>
          <ul>
            <li><strong>Google Gemini</strong> (Estados Unidos) — procesamiento de IA</li>
            <li><strong>Supabase</strong> (Estados Unidos) — base de datos y autenticación</li>
            <li><strong>Stripe</strong> (Estados Unidos) — procesamiento de pagos</li>
            <li><strong>PostHog</strong> (Estados Unidos) — analytics de producto</li>
          </ul>
          <p>Al registrarte consientes la transferencia de datos a estos proveedores.</p>

          <h2 className="text-lg text-ink font-medium mt-8">8. Contacto</h2>
          <p>Para consultas de privacidad: <a href="mailto:privacidad@orbbi.com" className="text-accent hover:underline">privacidad@orbbi.com</a></p>

          <h2 className="text-lg text-ink font-medium mt-8">8.5. Retención de datos</h2>
          <p>Datos se mantienen mientras tu cuenta esté activa. Tras cancelación, tienes 90 días para exportar tus datos. Luego se procede a la eliminación, excepto datos requeridos por obligaciones legales (hasta 5 años).</p>
        </div>
      </div>
    </div>
  )
}
