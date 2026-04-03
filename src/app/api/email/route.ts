import { NextRequest, NextResponse } from 'next/server'
import { enviarEmailBienvenida, enviarEmailTrialExpira } from '@/lib/resend'

export async function POST(request: NextRequest) {
  try {
    const { type, email, nombre, horasRestantes } = await request.json()

    switch (type) {
      case 'welcome':
        await enviarEmailBienvenida(email, nombre)
        break
      case 'trial_expiring':
        await enviarEmailTrialExpira(email, nombre, horasRestantes || 6)
        break
      default:
        return NextResponse.json({ error: 'Tipo de email no válido' }, { status: 400 })
    }

    return NextResponse.json({ sent: true })
  } catch (error) {
    console.error('Error enviando email:', error)
    return NextResponse.json({ error: 'Error enviando email' }, { status: 500 })
  }
}
