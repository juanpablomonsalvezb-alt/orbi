// MercadoPago integration for ORBBI
// Supports: subscriptions (auto-recurring) + one-time payments

const MP_API = 'https://api.mercadopago.com'

export function getHeaders() {
  return {
    'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  }
}

export { MP_API }

export const PLANS = {
  solo: { nombre: 'Solo', precio: 29, agentes: 1 },
  equipo: { nombre: 'Equipo', precio: 79, agentes: 3 },
  empresa: { nombre: 'Empresa', precio: 249, agentes: 7 },
} as const

export type PlanId = keyof typeof PLANS
