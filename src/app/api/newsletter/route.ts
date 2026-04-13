import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

let _resend: Resend | null = null
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY)
  return _resend
}

function escapeHtml(str: string) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }

    const safeEmail = escapeHtml(String(email).slice(0, 200))

    // 1. Si hay Resend Audience configurada, añadir contacto
    const audienceId = process.env.RESEND_AUDIENCE_ID
    if (audienceId) {
      await getResend().contacts.create({
        email: safeEmail,
        audienceId,
        unsubscribed: false,
      })
    }

    // 2. Enviar email de bienvenida al suscriptor
    await getResend().emails.send({
      from: 'Nebbuler <noreply@nebbuler.com>',
      to: safeEmail,
      subject: '¡Bienvenido a Nebbuler! 🎉',
      html: `
        <div style="font-family: 'Georgia', serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #141413;">
          <h1 style="font-size: 28px; font-weight: 700; margin-bottom: 16px; letter-spacing: -0.5px;">
            Ya estás dentro.
          </h1>
          <p style="font-size: 16px; line-height: 1.7; color: #37352f; margin-bottom: 24px;">
            Gracias por suscribirte a Nebbuler. Te enviaremos novedades sobre diseño web, tendencias digitales y casos de éxito de nuestros clientes.
          </p>
          <p style="font-size: 16px; line-height: 1.7; color: #37352f; margin-bottom: 32px;">
            Si necesitas un sitio web, estamos a un mensaje.
          </p>
          <a href="https://www.nebbuler.com/contact" style="display: inline-block; background: #fdc115; color: #000; font-weight: 700; font-size: 15px; padding: 14px 32px; border-radius: 100px; text-decoration: none;">
            Hablemos →
          </a>
          <hr style="border: none; border-top: 1px solid #e8e6dc; margin: 40px 0;" />
          <p style="font-size: 12px; color: #b0aea5;">
            Nebbuler · www.nebbuler.com · <a href="https://www.nebbuler.com/privacidad" style="color: #b0aea5;">Política de privacidad</a>
          </p>
        </div>
      `,
    })

    // 3. Notificar internamente
    await getResend().emails.send({
      from: 'Nebbuler <noreply@nebbuler.com>',
      to: 'cseplataforma@gmail.com',
      subject: `Nuevo suscriptor: ${safeEmail}`,
      html: `<p>Nuevo suscriptor en nebbuler.com: <strong>${safeEmail}</strong></p>`,
    })

    return NextResponse.json({ subscribed: true })
  } catch (error) {
    console.error('Error newsletter:', error)
    return NextResponse.json({ error: 'Error al suscribir' }, { status: 500 })
  }
}
