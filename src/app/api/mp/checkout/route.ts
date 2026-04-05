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

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.orbbilatam.com'

    const body = {
      items: [
        {
          title: `Orbbi - Plan ${plan.nombre} (1 mes)`,
          quantity: 1,
          unit_price: plan.precio,
          currency_id: 'USD',
        },
      ],
      payer: { email },
      back_urls: {
        success: `${appUrl}/chat?payment=success`,
        failure: `${appUrl}/chat?payment=failure`,
        pending: `${appUrl}/chat?payment=pending`,
      },
      auto_return: 'approved',
      external_reference: `${empresa_id}:${plan_id}`,
    }

    const response = await fetch(`${MP_API}/checkout/preferences`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('MercadoPago checkout error:', response.status, errorData)
      return NextResponse.json({ error: 'Error creando preferencia de pago en MercadoPago' }, { status: 500 })
    }

    const data = await response.json()

    return NextResponse.json({ init_point: data.init_point })
  } catch (error) {
    console.error('Error creating MP checkout:', error)
    return NextResponse.json({ error: 'Error creando sesión de pago' }, { status: 500 })
  }
}
