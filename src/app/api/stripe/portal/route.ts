import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const { customer_id } = await request.json()

    if (!customer_id) {
      return NextResponse.json({ error: 'customer_id requerido' }, { status: 400 })
    }

    const session = await getStripe().billingPortal.sessions.create({
      customer: customer_id,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/chat`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creating portal session:', error)
    return NextResponse.json({ error: 'Error creando portal de facturación' }, { status: 500 })
  }
}
