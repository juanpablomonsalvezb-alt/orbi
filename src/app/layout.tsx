import type { Metadata } from 'next'
import { Inter, Source_Serif_4 } from 'next/font/google'
import './globals.css'
import PostHogProvider from '@/components/PostHogProvider'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-sans',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: 'Orbbi — El agente que orbita tu negocio 24/7',
  description: 'Agentes de IA especializados para PYMEs en Latinoamérica. Finanzas, ventas, marketing, RRHH, inventario y legal — todo en un solo lugar. 48 horas gratis.',
  keywords: ['IA para PYMEs', 'agente virtual', 'gestión empresarial', 'inteligencia artificial', 'PYME', 'Latinoamérica', 'CFO virtual', 'consultor IA'],
  authors: [{ name: 'Orbbi' }],
  creator: 'Orbbi',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://orbi-ochre.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: '/',
    siteName: 'Orbbi',
    title: 'Orbbi — El agente que orbita tu negocio 24/7',
    description: 'Agentes de IA especializados para PYMEs: finanzas, ventas, marketing, RRHH, inventario y legal. Prueba gratis 48 horas.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Orbbi — Agentes de IA para tu negocio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orbbi — El agente que orbita tu negocio 24/7',
    description: 'Agentes de IA especializados para PYMEs en Latinoamérica. Prueba gratis 48 horas.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body className={inter.className}>
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  )
}
