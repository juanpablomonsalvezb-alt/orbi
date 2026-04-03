/**
 * Lector de métricas públicas de Instagram.
 * Intenta extraer datos de perfiles públicos sin autenticación.
 * Instagram bloquea la mayoría del scraping, así que incluimos fallbacks.
 */

interface InstagramProfileData {
  username: string
  fullName: string
  bio: string
  followers: number
  following: number
  posts: number
  profilePic: string
  isBusiness: boolean
  externalUrl: string
}

/** Formatea un número grande para lectura humana */
function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}

/** Limpia un username de Instagram (quita @, espacios, trailing /) */
export function cleanInstagramUsername(input: string): string {
  // Handle full URLs
  const urlMatch = input.match(/instagram\.com\/([a-zA-Z0-9_.]+)/i)
  if (urlMatch) return urlMatch[1].toLowerCase()

  // Handle @username
  return input.replace(/^@/, '').replace(/\/$/, '').trim().toLowerCase()
}

/** Intenta extraer datos de perfil de Instagram */
async function fetchInstagramData(username: string): Promise<InstagramProfileData | null> {
  const cleanUser = cleanInstagramUsername(username)

  // Strategy 1: Fetch the profile page and parse meta/og tags + embedded JSON
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)

    const response = await fetch(`https://www.instagram.com/${cleanUser}/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'es-CL,es;q=0.9,en;q=0.8',
      },
      signal: controller.signal,
      redirect: 'follow',
    })

    clearTimeout(timeout)

    if (!response.ok) return null

    const html = await response.text()

    // Try to find _sharedData or similar embedded JSON
    let data: InstagramProfileData | null = null

    // Pattern 1: window._sharedData (legacy, may still work)
    const sharedDataMatch = html.match(/window\._sharedData\s*=\s*({[\s\S]*?});\s*<\/script>/i)
    if (sharedDataMatch) {
      try {
        const parsed = JSON.parse(sharedDataMatch[1])
        const user = parsed?.entry_data?.ProfilePage?.[0]?.graphql?.user
        if (user) {
          data = {
            username: user.username,
            fullName: user.full_name || '',
            bio: user.biography || '',
            followers: user.edge_followed_by?.count || 0,
            following: user.edge_follow?.count || 0,
            posts: user.edge_owner_to_timeline_media?.count || 0,
            profilePic: user.profile_pic_url_hd || user.profile_pic_url || '',
            isBusiness: user.is_business_account || false,
            externalUrl: user.external_url || '',
          }
        }
      } catch { /* JSON parse failed */ }
    }

    // Pattern 2: JSON-LD or embedded data in newer Instagram format
    if (!data) {
      const jsonLdMatch = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)
      if (jsonLdMatch) {
        for (const block of jsonLdMatch) {
          const contentMatch = block.match(/>([^<]+)<\/script>/i)
          if (contentMatch) {
            try {
              const parsed = JSON.parse(contentMatch[1])
              if (parsed?.mainEntityofPage || parsed?.['@type'] === 'ProfilePage') {
                data = {
                  username: cleanUser,
                  fullName: parsed.name || '',
                  bio: parsed.description || '',
                  followers: parseInt(parsed.mainEntityofPage?.interactionStatistic?.userInteractionCount) || 0,
                  following: 0,
                  posts: 0,
                  profilePic: parsed.image || '',
                  isBusiness: false,
                  externalUrl: '',
                }
              }
            } catch { /* ignore */ }
          }
        }
      }
    }

    // Pattern 3: parse meta tags as fallback
    if (!data) {
      const descMatch = html.match(/<meta[^>]*(?:name|property)=["'](?:description|og:description)["'][^>]*content=["']([^"']+)["']/i)
        || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*(?:name|property)=["'](?:description|og:description)["']/i)

      if (descMatch) {
        const desc = descMatch[1]
        // Instagram descriptions typically follow: "X Followers, Y Following, Z Posts - See Instagram photos..."
        const statsMatch = desc.match(/([\d,.]+[KMkm]?)\s*Followers?,?\s*([\d,.]+[KMkm]?)\s*Following,?\s*([\d,.]+[KMkm]?)\s*Posts?/i)
          || desc.match(/([\d,.]+[KMkm]?)\s*seguidores?,?\s*([\d,.]+[KMkm]?)\s*seguidos?,?\s*([\d,.]+[KMkm]?)\s*publicaciones?/i)

        const titleMatch = html.match(/<meta[^>]*(?:property)=["']og:title["'][^>]*content=["']([^"']+)["']/i)
          || html.match(/<title[^>]*>([^<]+)<\/title>/i)

        const parseShortNumber = (s: string): number => {
          if (!s) return 0
          const clean = s.replace(/,/g, '')
          if (/[Mm]/.test(clean)) return Math.round(parseFloat(clean) * 1_000_000)
          if (/[Kk]/.test(clean)) return Math.round(parseFloat(clean) * 1_000)
          return parseInt(clean) || 0
        }

        if (statsMatch) {
          const fullName = titleMatch ? titleMatch[1].split(/[(@]/)[0].trim() : ''
          data = {
            username: cleanUser,
            fullName,
            bio: desc.split(' - ').slice(1).join(' - ').trim() || '',
            followers: parseShortNumber(statsMatch[1]),
            following: parseShortNumber(statsMatch[2]),
            posts: parseShortNumber(statsMatch[3]),
            profilePic: '',
            isBusiness: false,
            externalUrl: '',
          }
        }
      }
    }

    return data
  } catch {
    return null
  }
}

/**
 * Obtiene y formatea un perfil público de Instagram.
 * Si no puede obtener datos, retorna un mensaje pidiendo screenshot.
 */
export async function getInstagramProfile(username: string): Promise<string> {
  const cleanUser = cleanInstagramUsername(username)

  if (!cleanUser || cleanUser.length < 1) {
    return 'No se pudo identificar un nombre de usuario de Instagram válido.'
  }

  const data = await fetchInstagramData(cleanUser)

  if (!data || (data.followers === 0 && data.posts === 0 && !data.bio)) {
    return [
      `PERFIL DE INSTAGRAM: @${cleanUser}`,
      '',
      '⚠️ No se pudieron obtener las métricas públicas de este perfil.',
      'Instagram restringe el acceso automatizado a sus datos.',
      '',
      'ALTERNATIVAS PARA OBTENER DATOS:',
      '1. Pídele al usuario que comparta un screenshot de sus Instagram Insights (puede subirlo como imagen usando el botón de adjuntar archivo)',
      '2. Pídele que te diga manualmente: seguidores, alcance promedio, engagement rate, publicaciones por semana',
      '3. Si tiene cuenta de negocio, puede exportar datos desde Meta Business Suite',
      '',
      `URL del perfil: https://www.instagram.com/${cleanUser}/`,
    ].join('\n')
  }

  // Calcular métricas estimadas
  const engagementNote = data.followers > 0
    ? `Si el usuario comparte sus likes/comentarios promedio, podemos calcular el engagement rate exacto (interacciones / seguidores × 100).`
    : ''

  const postFrequencyNote = data.posts > 0
    ? `Con ${formatNumber(data.posts)} publicaciones totales.`
    : ''

  const sizeCategory = data.followers < 1000
    ? 'nano-influencer o cuenta inicial'
    : data.followers < 10000
    ? 'micro-cuenta en crecimiento'
    : data.followers < 100000
    ? 'cuenta mediana con buena base'
    : data.followers < 1000000
    ? 'cuenta grande / macro-influencer'
    : 'mega-cuenta'

  // Generar recomendaciones
  const recomendaciones: string[] = []

  if (data.followers < 1000) {
    recomendaciones.push('Enfocarse en contenido de nicho y engagement con la comunidad existente')
    recomendaciones.push('Publicar al menos 3-4 veces por semana con hashtags específicos del sector')
  } else if (data.followers < 10000) {
    recomendaciones.push('Buen momento para colaboraciones con cuentas del mismo tamaño')
    recomendaciones.push('Usar Reels y contenido de video corto para crecer más rápido')
  } else {
    recomendaciones.push('Considerar monetización directa (colaboraciones pagadas, tienda)')
    recomendaciones.push('Diversificar formatos: Reels, Stories, carruseles, Lives')
  }

  if (data.posts > 0 && data.followers > 0) {
    const ratio = data.followers / data.posts
    if (ratio > 100) {
      recomendaciones.push('Buena relación seguidores/publicaciones — el contenido está resonando')
    } else if (ratio < 10) {
      recomendaciones.push('Se publica mucho contenido pero los seguidores no crecen al mismo ritmo — revisar estrategia de contenido')
    }
  }

  if (!data.isBusiness) {
    recomendaciones.push('Cambiar a cuenta profesional/negocio para acceder a Instagram Insights')
  }

  let result = [
    `PERFIL DE INSTAGRAM: @${data.username}`,
    `Nombre: ${data.fullName || '(no disponible)'}`,
    `Bio: ${data.bio || '(no disponible)'}`,
    `Seguidores: ${formatNumber(data.followers)}`,
    `Siguiendo: ${formatNumber(data.following)}`,
    `Publicaciones: ${formatNumber(data.posts)}`,
    data.externalUrl ? `Sitio web: ${data.externalUrl}` : '',
    data.isBusiness ? `Tipo: Cuenta de negocio` : '',
    '',
    `MÉTRICAS ESTIMADAS:`,
    `• Categoría: ${sizeCategory}`,
    `• ${postFrequencyNote}`,
    engagementNote ? `• ${engagementNote}` : '',
    '',
    `RECOMENDACIONES BASADAS EN DATOS:`,
    ...recomendaciones.map(r => `• ${r}`),
    '',
    'NOTA: Para métricas más precisas (alcance, impresiones, engagement rate real), el usuario puede compartir un screenshot de sus Instagram Insights.',
  ].filter(Boolean).join('\n')

  return result
}
