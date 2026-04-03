import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = getSupabase()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const empresaId = session.metadata?.empresa_id
      const planId = session.metadata?.plan_id

      if (empresaId && planId) {
        await supabase
          .from('empresas')
          .update({
            plan: planId,
            stripe_subscription_id: session.subscription as string,
            trial_ends_at: null,
          })
          .eq('id', empresaId)
      }
      break
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string

      const { data: empresa } = await supabase
        .from('empresas')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single()

      if (empresa) {
        const status = subscription.status
        await supabase
          .from('empresas')
          .update({
            subscription_status: status,
          })
          .eq('id', empresa.id)
      }
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string

      const { data: empresa } = await supabase
        .from('empresas')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single()

      if (empresa) {
        await supabase
          .from('empresas')
          .update({
            plan: 'free',
            subscription_status: 'cancelled',
            stripe_subscription_id: null,
          })
          .eq('id', empresa.id)
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
