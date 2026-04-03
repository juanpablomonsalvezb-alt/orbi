import { Resend } from 'resend'

let _resend: Resend | null = null

function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY)
  }
  return _resend
}

const FROM_EMAIL = 'Orbbi <noreply@orbbi.com>'

export async function enviarEmailBienvenida(email: string, nombre: string) {
  try {
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Bienvenido a Orbbi, ${nombre}`,
      html: `
        <div style="font-family: 'Georgia', serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #141413;">
          <h1 style="font-size: 28px; font-weight: 400; margin-bottom: 24px; letter-spacing: -0.5px;">
            Bienvenido a Orbbi
          </h1>
          <p style="font-size: 16px; line-height: 1.6; color: #5e5d59; margin-bottom: 16px;">
            Hola ${nombre},
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #5e5d59; margin-bottom: 16px;">
            Tu cuenta de Orbbi ya está activa. Tienes <strong>48 horas gratis</strong> para explorar
            todos los agentes y descubrir cómo pueden ayudar a tu negocio.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #5e5d59; margin-bottom: 24px;">
            El siguiente paso es completar el onboarding — son 7 preguntas rápidas para que
            nuestros agentes conozcan tu empresa en profundidad.
          </p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/onboarding"
             style="display: inline-block; background: #141413; color: #faf9f5; padding: 12px 24px;
                    border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 500;">
            Completar onboarding
          </a>
          <p style="font-size: 13px; color: #87867f; margin-top: 32px; line-height: 1.5;">
            Si tienes preguntas, responde a este email. Estamos aquí para ayudarte.
          </p>
          <hr style="border: none; border-top: 1px solid #e8e6dc; margin: 32px 0;" />
          <p style="font-size: 12px; color: #b0aea5;">
            Orbbi — El agente que orbita tu negocio 24/7
          </p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Error enviando email de bienvenida:', error)
  }
}

export async function enviarEmailTrialExpira(email: string, nombre: string, horasRestantes: number) {
  try {
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Tu prueba gratuita de Orbbi termina ${horasRestantes <= 6 ? 'pronto' : 'en ' + horasRestantes + ' horas'}`,
      html: `
        <div style="font-family: 'Georgia', serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #141413;">
          <h1 style="font-size: 28px; font-weight: 400; margin-bottom: 24px; letter-spacing: -0.5px;">
            Tu prueba termina ${horasRestantes <= 6 ? 'en pocas horas' : 'pronto'}
          </h1>
          <p style="font-size: 16px; line-height: 1.6; color: #5e5d59; margin-bottom: 16px;">
            Hola ${nombre},
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #5e5d59; margin-bottom: 16px;">
            Te quedan <strong>${horasRestantes} horas</strong> de prueba gratuita en Orbbi.
            Para seguir usando tus agentes sin interrupción, elige un plan.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #5e5d59; margin-bottom: 24px;">
            Planes desde <strong>$29/mes</strong> con el Gerente General incluido.
          </p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/chat?upgrade=true"
             style="display: inline-block; background: #141413; color: #faf9f5; padding: 12px 24px;
                    border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 500;">
            Elegir plan
          </a>
          <hr style="border: none; border-top: 1px solid #e8e6dc; margin: 32px 0;" />
          <p style="font-size: 12px; color: #b0aea5;">
            Orbbi — El agente que orbita tu negocio 24/7
          </p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Error enviando email trial expira:', error)
  }
}
