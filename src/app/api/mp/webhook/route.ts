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

      const supabase = getSupabase()

      if (payment.status === 'approved') {
        // Payment approved - activate the plan
        await supabase
          .from('empresas')
          .update({
            plan: planId,
            subscription_status: 'active',
            mp_payment_id: String(paymentId),
            trial_ends_at: null,
          })
          .eq('id', empresaId)

        console.log(`Plan ${planId} activated for empresa ${empresaId}`)
      } else if (payment.status === 'rejected' || payment.status === 'cancelled') {
        console.log(`Payment ${paymentId} status: ${payment.status} for empresa ${empresaId}`)
      }
      // Other statuses (pending, in_process) - do nothing, wait for final status
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

      const supabase = getSupabase()

      if (preapproval.status === 'authorized') {
        // Subscription authorized - activate the plan
        await supabase
          .from('empresas')
          .update({
            plan: planId,
            subscription_status: 'active',
            mp_subscription_id: String(preapprovalId),
            trial_ends_at: null,
          })
          .eq('id', empresaId)

        console.log(`Subscription ${planId} activated for empresa ${empresaId}`)
      } else if (preapproval.status === 'cancelled' || preapproval.status === 'paused') {
        await supabase
          .from('empresas')
          .update({
            plan: 'free',
            subscription_status: preapproval.status,
            mp_subscription_id: null,
          })
          .eq('id', empresaId)

        console.log(`Subscription ${preapproval.status} for empresa ${empresaId}`)
      }
    }

    // Handle subscription authorized payment
    if (type === 'subscription_authorized_payment') {
      const paymentId = data?.id
      if (paymentId) {
        console.log(`Subscription payment received: ${paymentId}`)
        // The subscription is already active, payment just confirms continued access
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('MP Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing error' }, { status: 500 })
  }
}
