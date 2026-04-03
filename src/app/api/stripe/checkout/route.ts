import { NextRequest, NextResponse } from 'next/server'
import { getStripe, PLANS, PlanId } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import { verifyEmpresaAccess } from '@/lib/api-auth'

export async function POST(request: NextRequest) {
  try {
    const { plan_id, billing, empresa_id, email } = await request.json()

    if (!plan_id || !billing || !empresa_id || !email) {
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

    const priceId = billing === 'annual' ? plan.anual : plan.mensual

    // Check if empresa already has a Stripe customer
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: empresa } = await supabase
      .from('empresas')
      .select('stripe_customer_id')
      .eq('id', empresa_id)
      .single()

    const stripe = getStripe()
    let customerId = empresa?.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({
        email,
        metadata: { empresa_id },
      })
      customerId = customer.id

      await supabase
        .from('empresas')
        .update({ stripe_customer_id: customerId })
        .eq('id', empresa_id)
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/chat?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/chat?payment=cancelled`,
      metadata: { empresa_id, plan_id },
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json({ error: 'Error creando sesión de pago' }, { status: 500 })
  }
}
