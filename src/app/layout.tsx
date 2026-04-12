import type { Metadata } from 'next'
import './globals.css'
import PostHogProvider from '@/components/PostHogProvider'
import CookieBanner from '@/components/CookieBanner'
import LenisProvider from '@/components/LenisProvider'

export const metadata: Metadata = {
  verification: {
    google: 'nGHKPqMTM96eNxu15Iec8ODTV_0ccRsDleY-Q_VDkdE',
  },
  title: '300 Feet Out — Brand Strategy & Creative Agency',
  description: 'We help brands grow through strategy, design, and digital. Brand strategy, web design, and demand generation for ambitious companies.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://www.orbbilatam.com'),
  robots: {
    index: true,
    follow: true,
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ background: '#0a0a0a' }}>
      <body style={{ background: '#0a0a0a', color: '#ffffff', margin: 0, fontFamily: "'Aeonik', 'Inter', system-ui, sans-serif" }}>
        <PostHogProvider>
          <LenisProvider>
            {children}
          </LenisProvider>
          <CookieBanner />
        </PostHogProvider>
      </body>
    </html>
  )
}
