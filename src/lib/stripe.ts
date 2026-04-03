import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-04-30.basil',
    })
  }
  return _stripe
}

// Price IDs — configure these in Stripe Dashboard
export const PLANS = {
  solo: {
    nombre: 'Solo',
    mensual: process.env.STRIPE_PRICE_SOLO_MONTHLY || '',
    anual: process.env.STRIPE_PRICE_SOLO_ANNUAL || '',
    agentes: 1,
    precio_mensual: 29,
    precio_anual: 295.80,
  },
  equipo: {
    nombre: 'Equipo',
    mensual: process.env.STRIPE_PRICE_EQUIPO_MONTHLY || '',
    anual: process.env.STRIPE_PRICE_EQUIPO_ANNUAL || '',
    agentes: 3,
    precio_mensual: 79,
    precio_anual: 805.80,
  },
  empresa: {
    nombre: 'Empresa',
    mensual: process.env.STRIPE_PRICE_EMPRESA_MONTHLY || '',
    anual: process.env.STRIPE_PRICE_EMPRESA_ANNUAL || '',
    agentes: 7,
    precio_mensual: 249,
    precio_anual: 2539.80,
  },
} as const

export type PlanId = keyof typeof PLANS
