// MercadoPago client-side helpers for ORBBI
// The public key is used to initialize MercadoPago Checkout on the client

export const MP_PUBLIC_KEY = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY || ''

/**
 * Redirect the user to a MercadoPago checkout URL (init_point).
 * This is the primary flow: backend creates a preference/subscription,
 * returns the init_point URL, and the client redirects.
 */
export function redirectToCheckout(initPoint: string) {
  window.location.href = initPoint
}
