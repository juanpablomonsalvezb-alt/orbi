import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const PLANS = {
  starter: {
    nombre: 'Starter',
    precio: 49900, // CLP en centavos (equivalente a USD ~499)
    descripcion: 'Sitio web de 1 página, dominio incluido, entrega en 72h',
  },
  pro: {
    nombre: 'Pro',
    precio: 99900,
    descripcion: 'Sitio web de hasta 5 páginas, SEO, analytics, entrega en 5 días',
  },
  premium: {
    nombre: 'Premium',
    precio: 199900,
    descripcion: 'Sitio web completo, tienda online, integraciones, soporte 3 meses',
  },
}

export async function POST(request: NextRequest) {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY
    if (!stripeKey) {
      return NextResponse.json({ error: 'Stripe no configurado' }, { status: 503 })
    }

    const stripe = new Stripe(stripeKey)
    const { plan_id, email } = await request.json()

    if (!plan_id || !PLANS[plan_id as keyof typeof PLANS]) {
      return NextResponse.json({ error: 'Plan inválido' }, { status: 400 })
    }

    const plan = PLANS[plan_id as keyof typeof PLANS]
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.nebbuler.com'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Nebbuler — Plan ${plan.nombre}`,
              description: plan.descripcion,
            },
            unit_amount: plan.precio,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${appUrl}/gracias?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/contact`,
      metadata: { plan_id },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error Stripe checkout:', error)
    return NextResponse.json({ error: 'Error al crear pago' }, { status: 500 })
  }
}
