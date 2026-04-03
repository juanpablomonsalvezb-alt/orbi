import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

let _resend: Resend | null = null
function getResend(): Resend {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY)
  return _resend
}

export async function POST(request: NextRequest) {
  try {
    const { nombre, email, pais, mensaje } = await request.json()

    if (!nombre || !email || !pais || !mensaje) {
      return NextResponse.json({ error: 'Todos los campos son requeridos' }, { status: 400 })
    }

    await getResend().emails.send({
      from: 'Orbbi <noreply@orbbi.com>',
      to: 'cseplataforma@gmail.com',
      replyTo: email,
      subject: `Contacto Orbbi: ${nombre}`,
      html: `
        <div style="font-family: 'Georgia', serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #141413;">
          <h1 style="font-size: 24px; font-weight: 400; margin-bottom: 24px; letter-spacing: -0.5px;">
            Nuevo mensaje de contacto
          </h1>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; color: #87867f; font-size: 14px; width: 100px;">Nombre</td>
              <td style="padding: 8px 0; font-size: 14px; font-weight: 500;">${nombre}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #87867f; font-size: 14px;">Email</td>
              <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #c6613f;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #87867f; font-size: 14px;">País</td>
              <td style="padding: 8px 0; font-size: 14px; font-weight: 500;">${pais}</td>
            </tr>
          </table>
          <div style="background: #f7f6f3; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <p style="font-size: 15px; line-height: 1.7; color: #37352f; margin: 0; white-space: pre-wrap;">${mensaje}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #e8e6dc; margin: 24px 0;" />
          <p style="font-size: 12px; color: #b0aea5;">
            Enviado desde el formulario de contacto de orbbi.com
          </p>
        </div>
      `,
    })

    return NextResponse.json({ sent: true })
  } catch (error) {
    console.error('Error enviando contacto:', error)
    return NextResponse.json({ error: 'Error enviando mensaje' }, { status: 500 })
  }
}
