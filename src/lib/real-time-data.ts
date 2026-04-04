/**
 * Real-time data fetcher for ORBBI AI agents.
 * Fetches from 6 free APIs, caches in memory with TTL.
 * All output in Spanish for LATAM business context.
 */

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

// --- API 1: Frankfurter — Exchange rates ---
export async function getExchangeRates(): Promise<string> {
  return cached('exchange-rates', SIX_HOURS, async () => {
    const res = await fetch('https://api.frankfurter.dev/latest?from=USD&to=CLP,MXN,COP,PEN,ARS,BOB', {
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) throw new Error(`Frankfurter ${res.status}`)
    const data = await res.json()
    const rates = data.rates as Record<string, number>
    const fecha = data.date || new Date().toISOString().slice(0, 10)
    const parts = Object.entries(rates).map(([cur, val]) => {
      const sym = CURRENCY_SYMBOLS[cur] || ''
      return `1 USD = ${sym}${fmt(val, cur === 'PEN' || cur === 'BOB' ? 2 : 0)} ${cur}`
    })
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

// --- API 7: Compiled real-time context for agents ---
export async function getRealTimeContext(country: string): Promise<string> {
  const cc = COUNTRY_TO_CODE[country] || 'CL'
  const wbCode = COUNTRY_TO_WB_CODE[country] || 'CHL'

  const promises = [
    getExchangeRates(),
    getUpcomingHolidays(cc),
    getCountryIndicators(wbCode),
    getWeather(country),
  ]

  // Add Chilean indicators if country is Chile
  if (country === 'chile') {
    promises.push(getChileanIndicators())
  }

  const results = await Promise.allSettled(promises)

  const parts: string[] = []
  for (const r of results) {
    if (r.status === 'fulfilled' && r.value) {
      parts.push(r.value)
    }
  }

  if (parts.length === 0) return ''

  return '\n\nDATOS EN TIEMPO REAL:\n' + parts.join('\n\n') + '\n'
}
