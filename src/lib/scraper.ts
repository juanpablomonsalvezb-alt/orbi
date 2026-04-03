/**
 * Scraper de competidores — extrae precios, productos e información general de una URL.
 * Solo usa fetch + regex (sin Puppeteer ni dependencias externas).
 */

/** Resultado individual de precio detectado */
interface PrecioDetectado {
  producto: string
  precio: string
}

/** Extrae el dominio limpio de una URL */
function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return url
  }
}

/** Extrae el contenido de una meta tag */
function getMetaContent(html: string, name: string): string | null {
  // Match both name= and property= attributes
  const patterns = [
    new RegExp(`<meta[^>]*(?:name|property)=["']${name}["'][^>]*content=["']([^"']+)["']`, 'i'),
    new RegExp(`<meta[^>]*content=["']([^"']+)["'][^>]*(?:name|property)=["']${name}["']`, 'i'),
  ]
  for (const regex of patterns) {
    const match = html.match(regex)
    if (match) return match[1].trim()
  }
  return null
}

/** Extrae el título de la página */
function getTitle(html: string): string {
  const match = html.match(/<title[^>]*>([^<]+)<\/title>/i)
  return match ? match[1].trim() : '(sin título)'
}

/** Limpia tags HTML de un string */
function stripTags(str: string): string {
  return str.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

/** Extrae precios del HTML usando múltiples estrategias */
function extractPrices(html: string): PrecioDetectado[] {
  const precios: PrecioDetectado[] = []
  const seen = new Set<string>()

  function addPrecio(producto: string, precio: string) {
    const key = `${producto}::${precio}`
    if (!seen.has(key) && precio.length < 50 && producto.length < 200) {
      seen.add(key)
      precios.push({ producto: producto.trim(), precio: precio.trim() })
    }
  }

  // Strategy 1: structured data — itemprop="price" or data-price
  const structuredPriceRegex = /<[^>]*(?:itemprop=["']price["']|data-price=["']([^"']+)["'])[^>]*>([^<]*)<\/[^>]+>/gi
  let match: RegExpExecArray | null
  while ((match = structuredPriceRegex.exec(html)) !== null) {
    const precio = match[1] || match[2] || ''
    if (precio) {
      // Try to find nearby product name
      const contextStart = Math.max(0, match.index - 500)
      const context = html.substring(contextStart, match.index)
      const nameMatch = context.match(/<(?:h[1-6]|span|div|a)[^>]*(?:itemprop=["']name["']|class=["'][^"']*(?:product|item|title|nombre)[^"']*["'])[^>]*>([^<]+)/i)
      const productName = nameMatch ? stripTags(nameMatch[1]) : '(producto sin nombre)'
      addPrecio(productName, precio)
    }
  }

  // Strategy 2: elements with price-related classes
  const priceClassRegex = /<[^>]*class=["'][^"']*(?:price|precio|monto|amount|cost|valor)[^"']*["'][^>]*>([\s\S]*?)<\/[^>]+>/gi
  while ((match = priceClassRegex.exec(html)) !== null) {
    const inner = stripTags(match[1])
    if (inner && /[\$\d]/.test(inner) && inner.length < 50) {
      // Look back for a product name
      const contextStart = Math.max(0, match.index - 600)
      const context = html.substring(contextStart, match.index)
      const headingMatch = context.match(/<(?:h[1-6]|a|span|div)[^>]*class=["'][^"']*(?:product|item|title|nombre|name)[^"']*["'][^>]*>([^<]+)/i)
        || context.match(/<h[1-6][^>]*>([^<]+)/i)
        || context.match(/<a[^>]*>([^<]{5,80})<\/a>\s*$/i)
      const productName = headingMatch ? stripTags(headingMatch[1]) : '(producto)'
      addPrecio(productName, inner)
    }
  }

  // Strategy 3: price patterns in text — $XX.XXX, $X.XXX.XXX, USD, CLP, MXN
  const pricePatterns = /(?:\$\s?\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{1,2})?|(?:CLP|USD|MXN|ARS|COP|PEN|EUR)\s?\$?\s?\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{1,2})?|\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{1,2})?\s?(?:CLP|USD|MXN|ARS|COP|PEN|EUR))/gi
  while ((match = pricePatterns.exec(html)) !== null) {
    const precio = match[0]
    // Get surrounding context to find product name
    const contextStart = Math.max(0, match.index - 300)
    const contextEnd = Math.min(html.length, match.index + match[0].length + 100)
    const context = html.substring(contextStart, contextEnd)
    const stripped = stripTags(context)
    // Try to find a product reference nearby
    const headingBefore = html.substring(Math.max(0, match.index - 400), match.index)
    const hMatch = headingBefore.match(/<h[1-6][^>]*>([^<]+)<\/h[1-6]>\s*$/i)
    const productName = hMatch ? stripTags(hMatch[1]) : stripped.substring(0, 60).replace(precio, '').trim() || '(elemento)'
    addPrecio(productName.substring(0, 80), precio)
  }

  // Strategy 4: JSON-LD structured data
  const jsonLdRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  while ((match = jsonLdRegex.exec(html)) !== null) {
    try {
      const data = JSON.parse(match[1])
      const items = Array.isArray(data) ? data : [data]
      for (const item of items) {
        if (item.offers) {
          const offers = Array.isArray(item.offers) ? item.offers : [item.offers]
          for (const offer of offers) {
            if (offer.price) {
              const currency = offer.priceCurrency || ''
              addPrecio(
                item.name || '(producto)',
                `${currency} $${offer.price}`
              )
            }
          }
        }
        if (item['@graph']) {
          for (const node of item['@graph']) {
            if (node.offers) {
              const offers = Array.isArray(node.offers) ? node.offers : [node.offers]
              for (const offer of offers) {
                if (offer.price) {
                  addPrecio(node.name || '(producto)', `${offer.priceCurrency || ''} $${offer.price}`)
                }
              }
            }
          }
        }
      }
    } catch {
      // JSON-LD malformado, ignorar
    }
  }

  // Strategy 5: og:product meta tags
  const ogPrice = getMetaContent(html, 'product:price:amount') || getMetaContent(html, 'og:price:amount')
  const ogCurrency = getMetaContent(html, 'product:price:currency') || getMetaContent(html, 'og:price:currency') || ''
  const ogTitle = getMetaContent(html, 'og:title')
  if (ogPrice) {
    addPrecio(ogTitle || '(producto principal)', `${ogCurrency} $${ogPrice}`)
  }

  return precios.slice(0, 30) // Limitar a 30 resultados
}

/**
 * Escanea una URL de competidor y devuelve un resumen formateado.
 */
export async function scrapeCompetitor(url: string): Promise<string> {
  // Validar URL
  try {
    new URL(url)
  } catch {
    throw new Error('URL inválida')
  }

  const domain = getDomain(url)

  let html: string
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'es-CL,es;q=0.9,en;q=0.8',
      },
      signal: controller.signal,
      redirect: 'follow',
    })

    clearTimeout(timeout)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    html = await response.text()
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido'
    if (message.includes('abort')) {
      throw new Error(`Timeout al intentar acceder a ${domain}`)
    }
    throw new Error(`No se pudo acceder a ${domain}: ${message}`)
  }

  // Limitar tamaño para evitar consumir demasiada memoria
  if (html.length > 500000) {
    html = html.substring(0, 500000)
  }

  const title = getTitle(html)
  const description = getMetaContent(html, 'description') || getMetaContent(html, 'og:description') || '(sin descripción)'
  const ogTitle = getMetaContent(html, 'og:title') || title
  const precios = extractPrices(html)

  // Construir resumen
  let resumen = `ANÁLISIS DE COMPETIDOR: ${domain}\nURL: ${url}\n\n`

  if (precios.length > 0) {
    resumen += `PRECIOS ENCONTRADOS:\n`
    resumen += `| Producto/Servicio | Precio |\n`
    resumen += `|-------------------|--------|\n`
    for (const p of precios) {
      resumen += `| ${p.producto} | ${p.precio} |\n`
    }
    resumen += '\n'
  } else {
    resumen += `PRECIOS ENCONTRADOS: No se detectaron precios en la página.\n\n`
  }

  resumen += `INFORMACIÓN GENERAL:\n`
  resumen += `• Título: ${ogTitle}\n`
  resumen += `• Descripción: ${description}\n`

  // Extra: detect social links
  const socialPatterns = [
    { name: 'Instagram', regex: /href=["'](https?:\/\/(?:www\.)?instagram\.com\/[^"']+)["']/i },
    { name: 'Facebook', regex: /href=["'](https?:\/\/(?:www\.)?facebook\.com\/[^"']+)["']/i },
    { name: 'LinkedIn', regex: /href=["'](https?:\/\/(?:www\.)?linkedin\.com\/[^"']+)["']/i },
  ]
  const socials: string[] = []
  for (const s of socialPatterns) {
    const m = html.match(s.regex)
    if (m) socials.push(`${s.name}: ${m[1]}`)
  }
  if (socials.length > 0) {
    resumen += `\nREDES SOCIALES DETECTADAS:\n`
    for (const s of socials) {
      resumen += `• ${s}\n`
    }
  }

  return resumen
}
