import { NextRequest, NextResponse } from 'next/server'
import { PLANS, PlanId, MP_API, getHeaders } from '@/lib/mercadopago'
import { verifyEmpresaAccess } from '@/lib/api-auth'

export async function POST(request: NextRequest) {
  try {
    const { plan_id, empresa_id, email } = await request.json()

    if (!plan_id || !empresa_id || !email) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    // Verify the authenticated user owns this empresa
    const hasAccess = await verifyEmpresaAccess(request, empresa_id)
    if (!hasAccess) {
      return NextResponse.json({ error: 'Tu sesión expiró. Recarga la página.' }, { status: 401 })
    }

    const plan = PLANS[plan_id as PlanId]
    if (!plan) {
      return NextResponse.json({ error: 'Plan no válido' }, { status: 400 })
    }

    // Apply 10% discount for subscriptions
    const subscriptionPrice = Math.round(plan.precio * 0.9 * 100) / 100

    const body = {
      reason: `Orbbi - Plan ${plan.nombre}`,
      auto_recurring: {
        frequency: 1,
        frequency_type: 'months',
        transaction_amount: subscriptionPrice,
        currency_id: 'USD',
      },
      payer_email: email,
      back_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.orbbilatam.com'}/chat?payment=success`,
      status: 'pending',
      external_reference: `${empresa_id}:${plan_id}`,
    }

    const response = await fetch(`${MP_API}/preapproval`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('MercadoPago subscription error:', response.status, errorData)
      return NextResponse.json({ error: 'Error creando suscripción en MercadoPago' }, { status: 500 })
    }

    const data = await response.json()

    return NextResponse.json({ init_point: data.init_point })
  } catch (error) {
    console.error('Error creating MP subscription:', error)
    return NextResponse.json({ error: 'Error creando suscripción' }, { status: 500 })
  }
}
