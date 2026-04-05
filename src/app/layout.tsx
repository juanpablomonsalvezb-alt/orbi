import type { Metadata } from 'next'
import { Inter, Source_Serif_4 } from 'next/font/google'
import './globals.css'
import PostHogProvider from '@/components/PostHogProvider'
import CookieBanner from '@/components/CookieBanner'

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
  verification: {
    google: 'nGHKPqMTM96eNxu15Iec8ODTV_0ccRsDleY-Q_VDkdE',
  },
  title: 'Orbbi — 7 gerentes para tu PYME. 24/7. $29/mes.',
  description: 'El directorio completo que solo las grandes empresas podían pagar. Finanzas, ventas, marketing, RRHH, inventario y legal — 7 agentes de IA que conocen tu negocio. Prueba la demo gratis.',
  keywords: ['IA para PYMEs', 'agente virtual', 'gestión empresarial', 'inteligencia artificial', 'PYME', 'Latinoamérica', 'CFO virtual', 'consultor IA'],
  authors: [{ name: 'Orbbi' }],
  creator: 'Orbbi',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://www.orbbilatam.com'),
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: '/',
    siteName: 'Orbbi',
    title: 'Orbbi — 7 gerentes para tu PYME. 24/7. $29/mes.',
    description: 'El directorio que solo las grandes empresas podían pagar. 7 agentes de IA especializados para tu negocio. Prueba la demo gratis.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Orbbi — Agentes de IA para tu negocio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orbbi — El agente que orbita tu negocio 24/7',
    description: 'Agentes de IA especializados para PYMEs en Latinoamérica. Prueba la demo gratis.',
    images: ['/opengraph-image'],
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

const schemaSoftwareApplication = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Orbbi',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://www.orbbilatam.com',
  description: 'Plataforma de agentes de IA especializados para PYMEs en Latinoamérica. 7 agentes: Gerente General, Financiero, Ventas, Marketing, RRHH, Inventario y Cumplimiento.',
  offers: {
    '@type': 'Offer',
    price: '29',
    priceCurrency: 'USD',
    priceValidUntil: '2026-12-31',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '47',
  },
  availableLanguage: ['Spanish'],
  countriesSupported: ['CL', 'MX', 'CO', 'PE', 'AR', 'UY'],
}

const schemaOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Orbbi',
  url: 'https://www.orbbilatam.com',
  logo: 'https://www.orbbilatam.com/opengraph-image',
  description: 'Agentes de IA especializados para PYMEs latinoamericanas',
  foundingDate: '2026',
  areaServed: ['CL', 'MX', 'CO', 'PE', 'AR', 'UY'],
  sameAs: [
    'https://www.instagram.com/orbbilatam',
    'https://www.tiktok.com/@orbbilatam',
  ],
}

const schemaFAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Puedo cancelar cuando quiera?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Mensual cancelas sin penalidad. Anual tienes acceso hasta el fin del período.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Puedo probar antes de pagar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Puedes usar la demo gratuita sin registrarte. Cuando estés listo, creas tu cuenta en segundos.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué diferencia hay entre Orbbi y ChatGPT?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Orbbi conoce tu negocio en profundidad. Cada agente tiene frameworks especializados y contexto de tu empresa. No necesitas prompt engineering.',
      },
    },
    {
      '@type': 'Question',
      name: '¿En qué países está disponible Orbbi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Orbbi está disponible en Chile, México, Colombia, Perú, Argentina y Uruguay.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta Orbbi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Planes desde $29 USD/mes con el Gerente General incluido. Plan Equipo con 3 agentes a $79/mes. Plan Empresa con los 7 agentes a $249/mes.',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftwareApplication) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
        />
        <PostHogProvider>
          {children}
          <CookieBanner />
        </PostHogProvider>
      </body>
    </html>
  )
}
