import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Demo gratis — Orbbi | Habla con tu gerente virtual',
  description: 'Prueba gratis el gerente virtual de Orbbi. Recibe un diagnóstico de tu negocio en 1 minuto. Sin registrarte, sin tarjeta.',
  openGraph: {
    title: 'Demo gratis — Orbbi | Tu gerente virtual',
    description: 'Habla con tu gerente virtual y recibe un diagnóstico de tu negocio en 1 minuto. Gratis, sin registro.',
  },
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children
}
