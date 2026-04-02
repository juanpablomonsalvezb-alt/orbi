import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Orbbi — El agente que orbita tu negocio 24/7',
  description: 'Tu gerente de operaciones virtual impulsado por IA. Monitorea indicadores, genera alertas, apoya decisiones y entrega resúmenes semanales para PYMEs en Latinoamérica.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
