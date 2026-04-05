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
            Tu cuenta de Orbbi ya está activa. Tus 7 gerentes especializados están listos
            para ayudarte con tu negocio.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #5e5d59; margin-bottom: 24px;">
            El siguiente paso es completar el onboarding — son 3 preguntas rápidas para que
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

export async function enviarEmailInvitacion(email: string, empresaNombre: string, invitadoPor: string) {
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://orbbi.com'
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Te invitaron a ${empresaNombre} en Orbbi`,
      html: `
        <div style="font-family: 'Georgia', serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #141413;">
          <h1 style="font-size: 28px; font-weight: 400; margin-bottom: 24px; letter-spacing: -0.5px;">
            Te invitaron a Orbbi
          </h1>
          <p style="font-size: 16px; line-height: 1.6; color: #5e5d59; margin-bottom: 16px;">
            Hola,
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #5e5d59; margin-bottom: 16px;">
            <strong>${invitadoPor}</strong> te ha invitado a unirte al equipo de
            <strong>${empresaNombre}</strong> en Orbbi — agentes de IA para tu negocio.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #5e5d59; margin-bottom: 24px;">
            Crea tu cuenta para empezar a colaborar con tu equipo.
          </p>
          <a href="${appUrl}/registro"
             style="display: inline-block; background: #141413; color: #faf9f5; padding: 12px 24px;
                    border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 500;">
            Aceptar invitación
          </a>
          <p style="font-size: 13px; color: #87867f; margin-top: 32px; line-height: 1.5;">
            Si no esperabas esta invitación, puedes ignorar este email.
          </p>
          <hr style="border: none; border-top: 1px solid #e8e6dc; margin: 32px 0;" />
          <p style="font-size: 12px; color: #b0aea5;">
            Orbbi — El agente que orbita tu negocio 24/7
          </p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Error enviando email de invitación:', error)
  }
}

export async function enviarEmailReengagement(email: string, nombre: string) {
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://orbbi.com'
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: '¿Te olvidaste de Orbbi? Tu agente te está esperando',
      html: `
        <div style="font-family: 'Georgia', serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #141413;">
          <h1 style="font-size: 28px; font-weight: 400; margin-bottom: 24px; letter-spacing: -0.5px;">
            Tu agente te extraña
          </h1>
          <p style="font-size: 16px; line-height: 1.6; color: #5e5d59; margin-bottom: 16px;">
            Hola ${nombre},
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #5e5d59; margin-bottom: 16px;">
            Han pasado unos días desde tu última conversación con Orbbi.
            Tu agente sigue disponible 24/7 para ayudarte con finanzas,
            ventas, marketing y más.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #5e5d59; margin-bottom: 24px;">
            ¿Sabías que puedes preguntarle cualquier cosa sobre tu negocio?
            Prueba algo como: "¿Cómo puedo aumentar mis ventas este mes?"
          </p>
          <a href="${appUrl}/chat"
             style="display: inline-block; background: #141413; color: #faf9f5; padding: 12px 24px;
                    border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 500;">
            Volver a chatear
          </a>
          <hr style="border: none; border-top: 1px solid #e8e6dc; margin: 32px 0;" />
          <p style="font-size: 12px; color: #b0aea5;">
            Orbbi — El agente que orbita tu negocio 24/7
          </p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Error enviando email de reengagement:', error)
  }
}

export async function enviarEmailOnboardingIncompleto(email: string, nombre: string) {
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://orbbi.com'
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Completa tu onboarding en 2 minutos',
      html: `
        <div style="font-family: 'Georgia', serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #141413;">
          <h1 style="font-size: 28px; font-weight: 400; margin-bottom: 24px; letter-spacing: -0.5px;">
            Falta poco para activar Orbbi
          </h1>
          <p style="font-size: 16px; line-height: 1.6; color: #5e5d59; margin-bottom: 16px;">
            Hola ${nombre},
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #5e5d59; margin-bottom: 16px;">
            Notamos que aún no completaste el onboarding de Orbbi.
            Son solo <strong>3 preguntas rápidas</strong> (menos de 2 minutos) para que
            nuestros agentes conozcan tu empresa y puedan ayudarte mejor.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #5e5d59; margin-bottom: 24px;">
            Sin el onboarding, tus agentes no tienen contexto sobre tu negocio
            y no pueden darte respuestas personalizadas.
          </p>
          <a href="${appUrl}/onboarding"
             style="display: inline-block; background: #141413; color: #faf9f5; padding: 12px 24px;
                    border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 500;">
            Completar onboarding
          </a>
          <hr style="border: none; border-top: 1px solid #e8e6dc; margin: 32px 0;" />
          <p style="font-size: 12px; color: #b0aea5;">
            Orbbi — El agente que orbita tu negocio 24/7
          </p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Error enviando email onboarding incompleto:', error)
  }
}
