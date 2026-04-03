import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://orbi-ochre.vercel.app'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/chat/', '/onboarding/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
