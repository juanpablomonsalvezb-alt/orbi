/**
 * Real-time data fetcher for ORBBI AI agents.
 * Fetches from 6 free APIs, caches in memory with TTL.
 * All output in Spanish for LATAM business context.
 */

import {
  getSalarioMinimo, getCalendarioTributario, getCotizaciones,
  getPreciosCombustible, getProximoEventoComercial, getCostosPublicidad,
} from './static-data'

// --- In-memory cache with TTL ---
const cache = new Map<string, { data: unknown; expires: number }>()

async function cached<T>(key: string, ttlMs: number, fetcher: () => Promise<T>): Promise<T> {
  const entry = cache.get(key)
  if (entry && Date.now() < entry.expires) return entry.data as T
  const data = await fetcher()
  cache.set(key, { data, expires: Date.now() + ttlMs })
  return data
}

// --- Constants ---
const SIX_HOURS = 6 * 60 * 60 * 1000
const THREE_HOURS = 3 * 60 * 60 * 1000
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000

const COUNTRY_TO_CODE: Record<string, string> = {
  chile: 'CL', mexico: 'MX', colombia: 'CO', peru: 'PE',
  argentina: 'AR', bolivia: 'BO', ecuador: 'EC',
}

const COUNTRY_TO_WB_CODE: Record<string, string> = {
  chile: 'CHL', mexico: 'MEX', colombia: 'COL', peru: 'PER',
  argentina: 'ARG', bolivia: 'BOL', ecuador: 'ECU',
}

const CITY_COORDS: Record<string, { lat: number; lon: number; name: string }> = {
  chile: { lat: -33.45, lon: -70.65, name: 'Santiago' },
  mexico: { lat: 19.43, lon: -99.13, name: 'CDMX' },
  colombia: { lat: 4.71, lon: -74.07, name: 'Bogota' },
  peru: { lat: -12.04, lon: -77.03, name: 'Lima' },
  argentina: { lat: -34.60, lon: -58.38, name: 'Buenos Aires' },
  bolivia: { lat: -16.50, lon: -68.15, name: 'La Paz' },
  ecuador: { lat: -0.18, lon: -78.47, name: 'Quito' },
}

const COUNTRY_NAMES: Record<string, string> = {
  chile: 'Chile', mexico: 'Mexico', colombia: 'Colombia', peru: 'Peru',
  argentina: 'Argentina', bolivia: 'Bolivia', ecuador: 'Ecuador',
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  CLP: '$', MXN: '$', COP: '$', PEN: 'S/', ARS: '$', BOB: 'Bs',
}

const WEATHER_CODES: Record<number, string> = {
  0: 'despejado', 1: 'mayormente despejado', 2: 'parcialmente nublado', 3: 'nublado',
  45: 'niebla', 48: 'niebla helada', 51: 'llovizna ligera', 53: 'llovizna', 55: 'llovizna intensa',
  61: 'lluvia ligera', 63: 'lluvia', 65: 'lluvia intensa',
  71: 'nieve ligera', 73: 'nieve', 75: 'nieve intensa',
  80: 'chubascos ligeros', 81: 'chubascos', 82: 'chubascos intensos',
  95: 'tormenta', 96: 'tormenta con granizo', 99: 'tormenta con granizo intenso',
}

const MONTH_NAMES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

// --- Helper: format number with thousands separator ---
function fmt(n: number, decimals = 0): string {
  return n.toLocaleString('es-CL', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

function formatDate(d: Date): string {
  return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`
}

// --- API 1: Frankfurter + mindicador — Exchange rates ---
export async function getExchangeRates(): Promise<string> {
  return cached('exchange-rates', SIX_HOURS, async () => {
    // Frankfurter solo soporta MXN de LATAM; CLP lo obtenemos de mindicador
    const [frankRes, minRes] = await Promise.allSettled([
      fetch('https://api.frankfurter.dev/v1/latest?from=USD&to=MXN,EUR', {
        signal: AbortSignal.timeout(8000),
      }),
      fetch('https://mindicador.cl/api/dolar', {
        signal: AbortSignal.timeout(8000),
      }),
    ])

    const parts: string[] = []
    let fecha = new Date().toISOString().slice(0, 10)

    // Frankfurter: MXN y EUR
    if (frankRes.status === 'fulfilled' && frankRes.value.ok) {
      const data = await frankRes.value.json()
      const rates = data.rates as Record<string, number>
      fecha = data.date || fecha
      for (const [cur, val] of Object.entries(rates)) {
        const sym = CURRENCY_SYMBOLS[cur] || ''
        parts.push(`1 USD = ${sym}${fmt(val, cur === 'EUR' ? 2 : 0)} ${cur}`)
      }
    }

    // mindicador: CLP (dolar observado)
    if (minRes.status === 'fulfilled' && minRes.value.ok) {
      const data = await minRes.value.json()
      const valor = data.serie?.[0]?.valor
      if (valor) {
        parts.push(`1 USD = $${fmt(valor)} CLP`)
      }
    }

    if (parts.length === 0) return ''
    return `TIPOS DE CAMBIO (actualizado ${fecha}):\n ${parts.join(' | ')}`
  })
}

// --- API 2: mindicador.cl — Chilean indicators ---
export async function getChileanIndicators(): Promise<string> {
  return cached('chilean-indicators', SIX_HOURS, async () => {
    const res = await fetch('https://mindicador.cl/api', {
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) throw new Error(`mindicador ${res.status}`)
    const data = await res.json()
    const fecha = data.fecha ? new Date(data.fecha).toLocaleDateString('es-CL') : new Date().toLocaleDateString('es-CL')
    const uf = data.uf?.valor ? `UF: $${fmt(data.uf.valor)}` : ''
    const utm = data.utm?.valor ? `UTM: $${fmt(data.utm.valor)}` : ''
    const dolar = data.dolar?.valor ? `Dolar: $${fmt(data.dolar.valor)}` : ''
    const euro = data.euro?.valor ? `Euro: $${fmt(data.euro.valor)}` : ''
    const ipc = data.ipc?.valor != null ? `IPC mensual: ${data.ipc.valor}%` : ''
    const tpm = data.tpm?.valor != null ? `TPM: ${data.tpm.valor}%` : ''
    const desempleo = data.tasa_desempleo?.valor != null ? `Desempleo: ${data.tasa_desempleo.valor}%` : ''
    const items = [uf, utm, dolar, euro, ipc, tpm, desempleo].filter(Boolean)
    return `INDICADORES CHILE (actualizado ${fecha}):\n ${items.join(' | ')}`
  })
}

// --- API 3: Nager.Date — Holidays ---
export async function getUpcomingHolidays(countryCode: string): Promise<string> {
  const cc = countryCode.toUpperCase()
  const year = new Date().getFullYear()
  return cached(`holidays-${cc}-${year}`, TWENTY_FOUR_HOURS, async () => {
    const res = await fetch(`https://date.nager.at/api/v3/publicholidays/${year}/${cc}`, {
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) throw new Error(`Nager ${res.status}`)
    const holidays = (await res.json()) as Array<{ date: string; localName: string; name: string }>
    const today = new Date().toISOString().slice(0, 10)
    const upcoming = holidays.filter(h => h.date >= today).slice(0, 3)
    if (upcoming.length === 0) return ''
    const countryName = COUNTRY_NAMES[Object.keys(COUNTRY_TO_CODE).find(k => COUNTRY_TO_CODE[k] === cc) || ''] || cc
    const lines = upcoming.map(h => {
      const d = new Date(h.date + 'T12:00:00')
      return ` * ${d.getDate()} ${MONTH_NAMES[d.getMonth()]} - ${h.localName || h.name}`
    })
    return `PROXIMOS FERIADOS (${countryName}):\n${lines.join('\n')}`
  })
}

// --- API 4: World Bank — Macro indicators ---
export async function getCountryIndicators(wbCode: string): Promise<string> {
  const code = wbCode.toUpperCase()
  return cached(`wb-indicators-${code}`, TWENTY_FOUR_HOURS, async () => {
    const indicators = [
      { id: 'NY.GDP.MKTP.KD.ZG', label: 'PIB crecimiento' },
      { id: 'FP.CPI.TOTL.ZG', label: 'Inflacion anual' },
      { id: 'SL.UEM.TOTL.ZS', label: 'Desempleo' },
    ]
    const results: string[] = []
    await Promise.allSettled(
      indicators.map(async (ind) => {
        const res = await fetch(
          `https://api.worldbank.org/v2/country/${code}/indicator/${ind.id}?format=json&per_page=1&mrnev=1`,
          { signal: AbortSignal.timeout(10000) }
        )
        if (!res.ok) return
        const json = await res.json()
        const val = json?.[1]?.[0]?.value
        if (val != null) {
          results.push(`${ind.label}: ${Number(val).toFixed(1)}%`)
        }
      })
    )
    if (results.length === 0) return ''
    const countryName = COUNTRY_NAMES[Object.keys(COUNTRY_TO_WB_CODE).find(k => COUNTRY_TO_WB_CODE[k] === code) || ''] || code
    return `INDICADORES MACROECONOMICOS (${countryName}, ultimo dato disponible):\n ${results.join(' | ')}`
  })
}

// --- API 6: Open-Meteo — Weather ---
export async function getWeather(country: string): Promise<string> {
  const city = CITY_COORDS[country]
  if (!city) return ''
  return cached(`weather-${country}`, THREE_HOURS, async () => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto&forecast_days=3`
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
    if (!res.ok) throw new Error(`Open-Meteo ${res.status}`)
    const data = await res.json()
    const current = data.current
    const daily = data.daily
    const temp = current?.temperature_2m != null ? `${Math.round(current.temperature_2m)}°C` : '?'
    const weatherDesc = WEATHER_CODES[current?.weather_code] || 'sin datos'
    let forecast = ''
    if (daily?.temperature_2m_max && daily?.temperature_2m_min) {
      const days = daily.temperature_2m_max.map((max: number, i: number) => {
        const min = daily.temperature_2m_min[i]
        return `${Math.round(max)}°/${Math.round(min)}°`
      })
      forecast = `. Proximos 3 dias: ${days.join(', ')}`
    }
    return `CLIMA ${city.name}: ${temp}, ${weatherDesc}${forecast}`
  })
}

// --- API 7: Servientrega Colombia — Cotizacion de envios ---
export async function getShippingCostColombia(
  ciudadOrigen: string, ciudadDestino: string,
  peso: number, largo: number, alto: number, ancho: number,
  valorDeclarado: number
): Promise<string> {
  try {
    const url = `https://mobile.servientrega.com/ApiIngresoCLientes/api/Cotizador/Tarifas/${encodeURIComponent(ciudadOrigen)}/${encodeURIComponent(ciudadDestino)}/${largo}/${alto}/${ancho}/${peso}/${valorDeclarado}/2/es`
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) })
    if (!res.ok) return `Error al consultar Servientrega: HTTP ${res.status}`
    const data = await res.json()
    if (Array.isArray(data) && data.length > 0) {
      const opcion = data[0]
      const costo = opcion.ValorTotal ?? opcion.valorTotal ?? opcion.Valor ?? 'N/D'
      const dias = opcion.TiempoEntrega ?? opcion.tiempoEntrega ?? opcion.Dias ?? 'N/D'
      return `Envio Servientrega (${ciudadOrigen} -> ${ciudadDestino}): $${Number(costo).toLocaleString('es-CO')} COP, ${dias} dias habiles`
    }
    return `Servientrega: sin tarifas disponibles para la ruta ${ciudadOrigen} -> ${ciudadDestino}`
  } catch (err) {
    return `Error al consultar Servientrega: ${err instanceof Error ? err.message : 'desconocido'}`
  }
}

// --- API 8: BCRA Argentina — Indicadores economicos ---
export async function getArgentinaIndicators(): Promise<string> {
  return cached('argentina-indicators', SIX_HOURS, async () => {
    const variables = [
      { id: 4, label: 'Tipo de cambio minorista (USD/ARS)' },
      { id: 6, label: 'Tasa BADLAR' },
      { id: 27, label: 'Tasa de politica monetaria' },
      { id: 29, label: 'Reservas internacionales (USD mill.)' },
    ]
    const results: string[] = []
    await Promise.allSettled(
      variables.map(async (v) => {
        try {
          const res = await fetch(
            `https://api.bcra.gob.ar/estadisticas/v2.0/DatosVariable/${v.id}/Ultimos/1`,
            { signal: AbortSignal.timeout(10000), headers: { Accept: 'application/json' } }
          )
          if (!res.ok) return
          const json = await res.json()
          const dato = json?.results?.[0]
          if (dato?.valor != null) {
            results.push(`${v.label}: ${Number(dato.valor).toLocaleString('es-AR')}`)
          }
        } catch {
          // skip silently
        }
      })
    )
    if (results.length === 0) return ''
    return `INDICADORES BCRA (Argentina, tiempo real):\n ${results.join(' | ')}`
  })
}

// --- API 9: BCRP Peru — Indicadores economicos ---
export async function getPeruIndicators(): Promise<string> {
  return cached('peru-indicators', SIX_HOURS, async () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const prevMonth = now.getMonth() === 0 ? '12' : String(now.getMonth()).padStart(2, '0')
    const prevYear = now.getMonth() === 0 ? year - 1 : year
    const desde = `${prevYear}-${prevMonth}`
    const hasta = `${year}-${month}`

    const series = [
      { id: 'PD04637PD', label: 'Tipo de cambio venta (USD/PEN)' },
      { id: 'PD04648PD', label: 'Tasa de referencia BCRP' },
    ]
    const results: string[] = []
    await Promise.allSettled(
      series.map(async (s) => {
        try {
          const res = await fetch(
            `https://estadisticas.bcrp.gob.pe/estadisticas/series/api/${s.id}/json/${desde}/${hasta}`,
            { signal: AbortSignal.timeout(10000) }
          )
          if (!res.ok) return
          const json = await res.json()
          const periodos = json?.periods
          if (Array.isArray(periodos) && periodos.length > 0) {
            const ultimo = periodos[periodos.length - 1]
            const valor = ultimo?.values?.[0]
            if (valor && valor !== 'n.d.') {
              results.push(`${s.label}: ${valor}`)
            }
          }
        } catch {
          // skip silently
        }
      })
    )
    if (results.length === 0) return ''
    return `INDICADORES BCRP (Peru, tiempo real):\n ${results.join(' | ')}`
  })
}

// --- Precios de commodities (pendiente API key) ---
export async function getCommodityPrices(): Promise<string> {
  // Por ahora retorna vacio — se activara cuando se obtenga API key (API Ninjas u otra fuente)
  return ''
}

// --- MercadoLibre Site IDs ---
const COUNTRY_TO_ML_SITE: Record<string, string> = {
  chile: 'MLC', mexico: 'MLM', colombia: 'MCO', peru: 'MPE',
  argentina: 'MLA', bolivia: 'MBO', ecuador: 'MEC',
}

// --- API: MercadoLibre Trends (public endpoint, no auth) ---
export async function getMercadoLibreTrends(country: string): Promise<string> {
  const site = COUNTRY_TO_ML_SITE[country]
  if (!site) return ''
  return cached(`ml-trends-${site}`, TWENTY_FOUR_HOURS, async () => {
    try {
      const res = await fetch(`https://api.mercadolibre.com/trends/${site}`, {
        signal: AbortSignal.timeout(8000),
      })
      if (!res.ok) return ''
      const data = await res.json()
      if (!Array.isArray(data) || data.length === 0) return ''
      const keywords = data.slice(0, 10).map((t: { keyword: string }) => t.keyword)
      const countryName = COUNTRY_NAMES[country] || country
      return `TENDENCIAS MERCADOLIBRE (${countryName}): ${keywords.join(', ')}`
    } catch {
      return ''
    }
  })
}

// --- API: MercadoLibre Search (public endpoint, may require auth) ---
export async function searchMercadoLibre(query: string, country: string): Promise<string> {
  const site = COUNTRY_TO_ML_SITE[country]
  if (!site) return ''
  const cacheKey = `ml-search-${site}-${query.toLowerCase().trim().replace(/\s+/g, '-')}`
  return cached(cacheKey, TWENTY_FOUR_HOURS, async () => {
    try {
      const res = await fetch(
        `https://api.mercadolibre.com/sites/${site}/search?q=${encodeURIComponent(query)}&limit=5`,
        { signal: AbortSignal.timeout(10000) }
      )
      if (!res.ok) {
        // Si falla (403, etc.), intentar con las tendencias como fallback
        return ''
      }
      const data = await res.json()
      const results = data.results as Array<{ title: string; price: number; currency_id: string; permalink: string; sold_quantity?: number }> | undefined
      if (!results || results.length === 0) return ''
      const countryName = COUNTRY_NAMES[country] || country
      const items = results.map((r) => {
        const sym = CURRENCY_SYMBOLS[r.currency_id] || ''
        const vendidos = r.sold_quantity ? ` (${r.sold_quantity} vendidos)` : ''
        return `  * ${r.title} — ${sym}${fmt(r.price)} ${r.currency_id}${vendidos}`
      })
      return `RESULTADOS MERCADOLIBRE (${countryName}, "${query}"):\n${items.join('\n')}`
    } catch {
      return ''
    }
  })
}

// --- API: Google PageSpeed Insights (free, no key required) ---
export async function analyzeWebsite(url: string): Promise<string> {
  const cacheKey = `pagespeed-${url}`
  return cached(cacheKey, TWENTY_FOUR_HOURS, async () => {
    try {
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=performance&category=accessibility&category=seo`
      const res = await fetch(apiUrl, { signal: AbortSignal.timeout(30000) })
      if (!res.ok) return ''
      const data = await res.json()
      const categories = data.lighthouseResult?.categories
      if (!categories) return ''

      const performance = categories.performance?.score != null ? Math.round(categories.performance.score * 100) : null
      const accessibility = categories.accessibility?.score != null ? Math.round(categories.accessibility.score * 100) : null
      const seo = categories.seo?.score != null ? Math.round(categories.seo.score * 100) : null

      const audits = data.lighthouseResult?.audits
      const fcp = audits?.['first-contentful-paint']?.displayValue || 'N/D'
      const lcp = audits?.['largest-contentful-paint']?.displayValue || 'N/D'
      const si = audits?.['speed-index']?.displayValue || 'N/D'
      const cls = audits?.['cumulative-layout-shift']?.displayValue || 'N/D'

      const scores: string[] = []
      if (performance != null) scores.push(`Performance: ${performance}/100`)
      if (accessibility != null) scores.push(`Accesibilidad: ${accessibility}/100`)
      if (seo != null) scores.push(`SEO: ${seo}/100`)

      if (scores.length === 0) return ''

      return `ANALISIS WEB (${url}):\n ${scores.join(' | ')}\n First Contentful Paint: ${fcp} | Largest Contentful Paint: ${lcp} | Speed Index: ${si} | CLS: ${cls}`
    } catch {
      return ''
    }
  })
}

// --- API: Banxico SIE (Mexico central bank — requires free token) ---
export async function getMexicoIndicators(): Promise<string> {
  const token = process.env.BANXICO_TOKEN
  if (!token) return '' // Se activa cuando se configure BANXICO_TOKEN
  return cached('banxico-indicators', SIX_HOURS, async () => {
    try {
      const series = [
        { id: 'SF43718', label: 'Tipo de cambio FIX (USD/MXN)' },
        { id: 'SF61745', label: 'TIIE 28 dias' },
      ]
      const results: string[] = []
      await Promise.allSettled(
        series.map(async (s) => {
          try {
            const res = await fetch(
              `https://www.banxico.org.mx/SieAPIRest/service/v1/series/${s.id}/datos/oportuno?token=${token}`,
              { signal: AbortSignal.timeout(10000), headers: { Accept: 'application/json' } }
            )
            if (!res.ok) return
            const json = await res.json()
            const dato = json?.bmx?.series?.[0]?.datos?.[0]
            if (dato?.dato) {
              results.push(`${s.label}: ${dato.dato}`)
            }
          } catch {
            // skip silently
          }
        })
      )
      if (results.length === 0) return ''
      return `INDICADORES BANXICO (Mexico, tiempo real):\n ${results.join(' | ')}`
    } catch {
      return ''
    }
  })
}

// --- Country detection from onboarding context ---
export function detectCountry(contexto: Array<{ pregunta?: string; respuesta?: string }>): string {
  const allText = contexto.map(c => c.respuesta || '').join(' ').toLowerCase()
  if (allText.includes('chile') || allText.includes('santiago') || allText.includes('sii')) return 'chile'
  if (allText.includes('méxico') || allText.includes('mexico') || allText.includes('cdmx') || allText.includes('sat')) return 'mexico'
  if (allText.includes('colombia') || allText.includes('bogotá') || allText.includes('bogota') || allText.includes('medellín') || allText.includes('medellin') || allText.includes('dian')) return 'colombia'
  if (allText.includes('perú') || allText.includes('peru') || allText.includes('lima') || allText.includes('sunat')) return 'peru'
  if (allText.includes('argentina') || allText.includes('buenos aires') || allText.includes('afip')) return 'argentina'
  if (allText.includes('bolivia') || allText.includes('la paz') || allText.includes('sin')) return 'bolivia'
  if (allText.includes('ecuador') || allText.includes('quito') || allText.includes('sri')) return 'ecuador'
  return 'chile' // default
}

// --- Compiled real-time context for agents ---
export async function getRealTimeContext(country: string): Promise<string> {
  const cc = COUNTRY_TO_CODE[country] || 'CL'
  const wbCode = COUNTRY_TO_WB_CODE[country] || 'CHL'

  const promises = [
    getExchangeRates(),
    getUpcomingHolidays(cc),
    getCountryIndicators(wbCode),
    getWeather(country),
  ]

  // Indicadores especificos por pais
  if (country === 'chile') {
    promises.push(getChileanIndicators())
  }
  if (country === 'argentina') {
    promises.push(getArgentinaIndicators())
  }
  if (country === 'peru') {
    promises.push(getPeruIndicators())
  }
  if (country === 'mexico') {
    promises.push(getMexicoIndicators())
  }

  // Tendencias MercadoLibre (util para ventas/inventario/marketing)
  try {
    promises.push(getMercadoLibreTrends(country))
  } catch {
    // skip silently
  }

  const results = await Promise.allSettled(promises)

  const parts: string[] = []
  for (const r of results) {
    if (r.status === 'fulfilled' && r.value) {
      parts.push(r.value)
    }
  }

  // Agregar datos estaticos de referencia
  const salario = getSalarioMinimo(country)
  if (salario) parts.push(salario)

  const calendario = getCalendarioTributario(country)
  if (calendario) parts.push('CALENDARIO TRIBUTARIO:\n' + calendario)

  const cotizaciones = getCotizaciones(country)
  if (cotizaciones) parts.push('COTIZACIONES PREVISIONALES:\n' + cotizaciones)

  // Precios de combustible (util para inventario/logistica)
  const combustible = getPreciosCombustible(country)
  if (combustible) parts.push(combustible)

  // Proximos eventos comerciales (util para ventas/marketing)
  const eventosComerciales = getProximoEventoComercial(country)
  if (eventosComerciales) parts.push(eventosComerciales)

  // Costos publicidad referencia (util para marketing)
  const costosPub = getCostosPublicidad(country)
  if (costosPub) parts.push(costosPub)

  if (parts.length === 0) return ''

  return '\n\nDATOS EN TIEMPO REAL:\n' + parts.join('\n\n') + '\n'
}
