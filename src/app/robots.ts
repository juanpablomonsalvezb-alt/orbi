import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.orbbilatam.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/chat/', '/onboarding/', '/dashboard/', '/equipo/', '/tareas/', '/exportar/', '/referidos/', '/api/', '/login', '/registro', '/logo'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
