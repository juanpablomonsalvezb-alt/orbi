import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { MP_API, getHeaders } from '@/lib/mercadopago'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { type, data } = body

    // MercadoPago sends different notification types
    // Handle payment notifications
    if (type === 'payment') {
      const paymentId = data?.id
      if (!paymentId) {
        return NextResponse.json({ error: 'Missing payment id' }, { status: 400 })
      }

      // Fetch payment details from MercadoPago
      const paymentRes = await fetch(`${MP_API}/v1/payments/${paymentId}`, {
        headers: getHeaders(),
      })

      if (!paymentRes.ok) {
        console.error('Error fetching payment:', paymentRes.status)
        return NextResponse.json({ error: 'Error fetching payment' }, { status: 500 })
      }

      const payment = await paymentRes.json()
      const externalRef = payment.external_reference

      if (!externalRef) {
        console.warn('Payment without external_reference:', paymentId)
        return NextResponse.json({ received: true })
      }

      const [empresaId, planId] = externalRef.split(':')

      if (!empresaId || !planId) {
        console.warn('Invalid external_reference format:', externalRef)
        return NextResponse.json({ received: true })
      }

      // Whitelist valid plans and validate empresaId is a UUID
      const VALID_PLANS = ['solo', 'equipo', 'empresa']
      const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      if (!VALID_PLANS.includes(planId) || !UUID_REGEX.test(empresaId)) {
        console.warn('Invalid plan or empresaId in webhook:', { planId, empresaId })
        return NextResponse.json({ received: true })
      }

      const supabase = getSupabase()

      if (payment.status === 'approved') {
        // Payment approved - activate the plan
        // Uses stripe_customer_id column to store MP payment reference
        const { error: updateErr } = await supabase
          .from('empresas')
          .update({
            plan: planId,
            subscription_status: 'active',
            stripe_customer_id: `mp_payment:${paymentId}`,
            trial_ends_at: null,
          })
          .eq('id', empresaId)

        if (updateErr) {
          console.error(`Failed to activate plan ${planId} for empresa ${empresaId}:`, updateErr)
        }
      }
      // Other statuses (pending, in_process, rejected, cancelled) - do nothing, wait for final status
    }

    // Handle subscription (preapproval) notifications
    if (type === 'subscription_preapproval') {
      const preapprovalId = data?.id
      if (!preapprovalId) {
        return NextResponse.json({ received: true })
      }

      const preapprovalRes = await fetch(`${MP_API}/preapproval/${preapprovalId}`, {
        headers: getHeaders(),
      })

      if (!preapprovalRes.ok) {
        console.error('Error fetching preapproval:', preapprovalRes.status)
        return NextResponse.json({ error: 'Error fetching preapproval' }, { status: 500 })
      }

      const preapproval = await preapprovalRes.json()
      const externalRef = preapproval.external_reference

      if (!externalRef) {
        return NextResponse.json({ received: true })
      }

      const [empresaId, planId] = externalRef.split(':')

      if (!empresaId || !planId) {
        return NextResponse.json({ received: true })
      }

      // Whitelist valid plans and validate empresaId is a UUID
      const VALID_PLANS_SUB = ['solo', 'equipo', 'empresa']
      const UUID_REGEX_SUB = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      if (!VALID_PLANS_SUB.includes(planId) || !UUID_REGEX_SUB.test(empresaId)) {
        console.warn('Invalid plan or empresaId in subscription webhook:', { planId, empresaId })
        return NextResponse.json({ received: true })
      }

      const supabase = getSupabase()

      if (preapproval.status === 'authorized') {
        // Subscription authorized - activate the plan
        // Uses stripe_subscription_id column to store MP subscription reference
        const { error: updateErr } = await supabase
          .from('empresas')
          .update({
            plan: planId,
            subscription_status: 'active',
            stripe_subscription_id: `mp_sub:${preapprovalId}`,
            trial_ends_at: null,
          })
          .eq('id', empresaId)

        if (updateErr) {
          console.error(`Failed to activate subscription ${planId} for empresa ${empresaId}:`, updateErr)
        }
      } else if (preapproval.status === 'cancelled' || preapproval.status === 'paused') {
        const { error: updateErr } = await supabase
          .from('empresas')
          .update({
            plan: 'free',
            subscription_status: preapproval.status,
            stripe_subscription_id: null,
          })
          .eq('id', empresaId)

        if (updateErr) {
          console.error(`Failed to cancel subscription for empresa ${empresaId}:`, updateErr)
        }
      }
    }

    // Handle subscription authorized payment
    // The subscription is already active, payment just confirms continued access
    if (type === 'subscription_authorized_payment') {
      // No action needed - subscription stays active
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('MP Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing error' }, { status: 500 })
  }
}
