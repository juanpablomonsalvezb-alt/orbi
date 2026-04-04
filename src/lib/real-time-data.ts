/**
 * Real-time data fetcher for ORBBI AI agents.
 * Fetches from 30+ free APIs, caches in memory with TTL.
 * All output in Spanish for LATAM business context.
 */

import {
  getSalarioMinimo, getCalendarioTributario, getCotizaciones,
  getPreciosCombustible, getProximoEventoComercial, getCostosPublicidad,
  getUnidadesReferencia, getTarifasEnergia, getCostosEnvio, getTasasCreditoPyme,
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
const ONE_HOUR = 60 * 60 * 1000
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

// --- API 1: Exchange rates — Frankfurter + mindicador + open.er-api (ALL LATAM currencies) ---
export async function getExchangeRates(): Promise<string> {
  return cached('exchange-rates', SIX_HOURS, async () => {
    const [frankRes, minRes, erRes] = await Promise.allSettled([
      fetch('https://api.frankfurter.dev/v1/latest?from=USD&to=MXN,EUR', {
        signal: AbortSignal.timeout(8000),
      }),
      fetch('https://mindicador.cl/api/dolar', {
        signal: AbortSignal.timeout(8000),
      }),
      // open.er-api: CLP, COP, PEN, ARS, BOB + confirmacion MXN
      fetch('https://open.er-api.com/v1/latest/USD', {
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

    // open.er-api: todas las monedas LATAM que falten
    if (erRes.status === 'fulfilled' && erRes.value.ok) {
      try {
        const data = await erRes.value.json()
        const rates = data.rates as Record<string, number> | undefined
        if (rates) {
          const latamCurrencies = ['COP', 'PEN', 'ARS', 'BOB']
          // Solo agregar CLP si no lo obtuvimos de mindicador
          if (!parts.some(p => p.includes('CLP'))) latamCurrencies.push('CLP')
          for (const cur of latamCurrencies) {
            if (rates[cur]) {
              const sym = CURRENCY_SYMBOLS[cur] || ''
              parts.push(`1 USD = ${sym}${fmt(rates[cur], cur === 'PEN' ? 2 : 0)} ${cur}`)
            }
          }
        }
      } catch { /* skip */ }
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

// --- API: Commodity & Precious Metal Prices via fawazahmed0 currency-api (free, no key, CDN) ---
export async function getCommodityPrices(): Promise<string> {
  return cached('commodity-prices', SIX_HOURS, async () => {
    try {
      const res = await fetch(
        'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.min.json',
        { signal: AbortSignal.timeout(10000) }
      )
      if (!res.ok) throw new Error(`currency-api ${res.status}`)
      const data = await res.json()
      const usd = data?.usd as Record<string, number> | undefined
      if (!usd) throw new Error('no usd rates')

      const parts: string[] = []
      const fecha = data.date || new Date().toISOString().slice(0, 10)

      // Precious metals (rates are USD per 1 unit, so we invert: 1/rate = price in USD per oz)
      if (usd.xau) {
        const goldPrice = Math.round(1 / usd.xau)
        parts.push(`Oro: $${fmt(goldPrice)} USD/oz`)
      }
      if (usd.xag) {
        const silverPrice = Number((1 / usd.xag).toFixed(2))
        parts.push(`Plata: $${fmt(silverPrice, 2)} USD/oz`)
      }
      if (usd.xpt) {
        const platinumPrice = Math.round(1 / usd.xpt)
        parts.push(`Platino: $${fmt(platinumPrice)} USD/oz`)
      }
      if (usd.xpd) {
        const palladiumPrice = Math.round(1 / usd.xpd)
        parts.push(`Paladio: $${fmt(palladiumPrice)} USD/oz`)
      }

      if (parts.length === 0) {
        return 'COMMODITIES (referencial): Petroleo WTI ~$70-80 USD/barril | Cobre ~$4.0-4.5 USD/lb'
      }
      return `METALES PRECIOSOS (${fecha}): ${parts.join(' | ')}`
    } catch {
      return 'COMMODITIES (referencial): Petroleo WTI ~$70-80 USD/barril | Cobre ~$4.0-4.5 USD/lb'
    }
  })
}

// --- API: REST Countries — Country demographics (free, no key) ---
export async function getCountryInfo(country: string): Promise<string> {
  const codeMap: Record<string, string> = {
    chile: 'cl', mexico: 'mx', colombia: 'co', peru: 'pe',
    argentina: 'ar', bolivia: 'bo', ecuador: 'ec',
  }
  const code = codeMap[country]
  if (!code) return ''
  return cached(`restcountries-${code}`, TWENTY_FOUR_HOURS, async () => {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/alpha/${code}?fields=name,capital,population,area,gini,timezones`,
        { signal: AbortSignal.timeout(8000) }
      )
      if (!res.ok) return ''
      const data = await res.json()
      const parts: string[] = []
      const nombre = data.name?.common || country
      if (data.capital?.[0]) parts.push(`Capital: ${data.capital[0]}`)
      if (data.population) parts.push(`Poblacion: ${fmt(data.population)}`)
      if (data.area) parts.push(`Area: ${fmt(data.area)} km2`)
      if (data.gini) {
        const giniYear = Object.keys(data.gini).sort().pop()
        if (giniYear) parts.push(`Gini: ${data.gini[giniYear]} (${giniYear})`)
      }
      if (parts.length === 0) return ''
      return `DATOS PAIS (${nombre}): ${parts.join(' | ')}`
    } catch {
      return ''
    }
  })
}

// --- API: INEGI Indicadores (Mexico — requires free token) ---
export async function getINEGIIndicators(): Promise<string> {
  const token = process.env.INEGI_TOKEN
  if (!token) return ''
  return cached('inegi-indicators', TWENTY_FOUR_HOURS, async () => {
    try {
      // Indicadores clave: INPC (inflacion), PIB trimestral, Tasa desocupacion
      const indicators = [
        { id: '628194', label: 'INPC (Indice de Precios al Consumidor)' },
        { id: '493911', label: 'Tasa de desocupacion' },
      ]
      const results: string[] = []
      await Promise.allSettled(
        indicators.map(async (ind) => {
          try {
            const res = await fetch(
              `https://www.inegi.org.mx/app/api/indicadores/desarrolladores/jsonxml/INDICATOR/${ind.id}/es/0700/false/BISE/2.0/${token}?type=json`,
              { signal: AbortSignal.timeout(12000) }
            )
            if (!res.ok) return
            const json = await res.json()
            const series = json?.Series
            if (Array.isArray(series) && series.length > 0) {
              const obs = series[0]?.OBSERVATIONS
              if (Array.isArray(obs) && obs.length > 0) {
                const ultimo = obs[obs.length - 1]
                const valor = ultimo?.OBS_VALUE
                const periodo = ultimo?.TIME_PERIOD
                if (valor) {
                  results.push(`${ind.label}: ${valor}${periodo ? ` (${periodo})` : ''}`)
                }
              }
            }
          } catch { /* skip */ }
        })
      )
      if (results.length === 0) return ''
      return `INDICADORES INEGI (Mexico):\n ${results.join(' | ')}`
    } catch {
      return ''
    }
  })
}

// --- API: INEGI DENUE — Directorio de negocios Mexico (requires free token) ---
export async function searchDENUE(query: string, estado: string): Promise<string> {
  const token = process.env.INEGI_TOKEN
  if (!token) return ''
  const cacheKey = `denue-${query.toLowerCase().trim().replace(/\s+/g, '-')}-${estado}`
  return cached(cacheKey, TWENTY_FOUR_HOURS, async () => {
    try {
      // estado: 00 = todo Mexico, 01-32 = por estado
      const cveEnt = estado || '00'
      const res = await fetch(
        `https://www.inegi.org.mx/app/api/denue/v1/consulta/nombre/${encodeURIComponent(query)}/${cveEnt}/1/10/${token}`,
        { signal: AbortSignal.timeout(12000) }
      )
      if (!res.ok) return ''
      const data = await res.json()
      if (!Array.isArray(data) || data.length === 0) return ''
      const items = data.slice(0, 5).map((e: Record<string, string>) => {
        const nombre = e.Nombre || e.nombre || 'N/D'
        const actividad = e.Actividad || e.actividad || ''
        const ubicacion = e.Ubicacion || e.ubicacion || e.Calle || ''
        return `  * ${nombre}${actividad ? ` — ${actividad}` : ''}${ubicacion ? ` (${ubicacion})` : ''}`
      })
      return `NEGOCIOS EN MEXICO (DENUE, "${query}"):\n${items.join('\n')}`
    } catch {
      return ''
    }
  })
}

// --- API: datos.gov.co Socrata — Indicadores economicos Colombia (free, no key) ---
export async function getColombiaEconomicIndicators(): Promise<string> {
  return cached('colombia-economic-indicators', TWENTY_FOUR_HOURS, async () => {
    try {
      // Indicadores de coyuntura economica local
      const res = await fetch(
        'https://www.datos.gov.co/resource/m5ti-ecrw.json?$limit=10&$order=a_o%20DESC,mes_no%20DESC',
        { signal: AbortSignal.timeout(10000) }
      )
      if (!res.ok) return ''
      const data = await res.json()
      if (!Array.isArray(data) || data.length === 0) return ''
      // Group by indicator, take latest of each
      const seen = new Map<string, string>()
      for (const row of data) {
        const ind = row.indicador as string
        if (!seen.has(ind) && row.valor_original) {
          seen.set(ind, `${ind}: ${row.valor_original} (${row.mes} ${row.a_o})`)
        }
      }
      const items = Array.from(seen.values()).slice(0, 5)
      if (items.length === 0) return ''
      return `INDICADORES ECONOMICOS COLOMBIA (datos.gov.co):\n ${items.join(' | ')}`
    } catch {
      return ''
    }
  })
}

// --- API: datos.gov.co — IPC Colombia (Socrata, free, no key) ---
export async function getColombiaIPC(): Promise<string> {
  return cached('colombia-ipc', TWENTY_FOUR_HOURS, async () => {
    try {
      const res = await fetch(
        'https://www.datos.gov.co/resource/y4cg-3jbp.json?$limit=6&$order=a_o%20DESC,mes_no%20DESC',
        { signal: AbortSignal.timeout(10000) }
      )
      if (!res.ok) return ''
      const data = await res.json()
      if (!Array.isArray(data) || data.length === 0) return ''
      const items = data.slice(0, 6).map((row: Record<string, string>) => {
        return `${row.mes || ''} ${row.a_o || ''}: ${row.ipc_total || row.valor || 'N/D'}`
      }).filter((s: string) => !s.includes('N/D'))
      if (items.length === 0) return ''
      return `IPC COLOMBIA (ultimos meses): ${items.join(' | ')}`
    } catch {
      return ''
    }
  })
}

// --- API: ip-api.com — Auto-detect country from server IP (free, no key) ---
export async function detectCountryFromIP(): Promise<string> {
  return cached('ip-country-detect', TWENTY_FOUR_HOURS, async () => {
    try {
      const res = await fetch('http://ip-api.com/json/?fields=country,countryCode,city,timezone,currency', {
        signal: AbortSignal.timeout(5000),
      })
      if (!res.ok) return ''
      const data = await res.json()
      return data.countryCode?.toLowerCase() || ''
    } catch {
      return ''
    }
  })
}

// --- API: Coursera Catalog — Cursos gratuitos de negocios (free, no key) ---
export async function getBusinessCourses(topic: string): Promise<string> {
  const cacheKey = `coursera-${topic.toLowerCase().trim().replace(/\s+/g, '-')}`
  return cached(cacheKey, TWENTY_FOUR_HOURS, async () => {
    try {
      const res = await fetch(
        `https://api.coursera.org/api/courses.v1?limit=5&fields=name,slug,workload&q=search&query=${encodeURIComponent(topic + ' business')}`,
        { signal: AbortSignal.timeout(10000) }
      )
      // If search finder not implemented, try simple list
      if (!res.ok) return ''
      const data = await res.json()
      const elements = data.elements as Array<{ name: string; slug: string; workload?: string }> | undefined
      if (!elements || elements.length === 0) return ''
      const items = elements.slice(0, 5).map((c) => {
        const duracion = c.workload ? ` (${c.workload})` : ''
        return `  * ${c.name}${duracion} — coursera.org/learn/${c.slug}`
      })
      return `CURSOS RECOMENDADOS (Coursera, "${topic}"):\n${items.join('\n')}`
    } catch {
      return ''
    }
  })
}

// --- API: fawazahmed0 currency-api — Backup exchange rates (free, no key, CDN) ---
export async function getBackupExchangeRates(): Promise<string> {
  return cached('backup-exchange-rates', SIX_HOURS, async () => {
    try {
      const res = await fetch(
        'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.min.json',
        { signal: AbortSignal.timeout(10000) }
      )
      if (!res.ok) return ''
      const data = await res.json()
      const usd = data?.usd as Record<string, number> | undefined
      if (!usd) return ''
      const fecha = data.date || ''
      const currencies: Array<{ code: string; label: string; decimals: number }> = [
        { code: 'clp', label: 'CLP', decimals: 0 },
        { code: 'mxn', label: 'MXN', decimals: 2 },
        { code: 'cop', label: 'COP', decimals: 0 },
        { code: 'pen', label: 'PEN', decimals: 2 },
        { code: 'ars', label: 'ARS', decimals: 0 },
        { code: 'bob', label: 'BOB', decimals: 2 },
      ]
      const parts: string[] = []
      for (const c of currencies) {
        if (usd[c.code]) {
          const sym = CURRENCY_SYMBOLS[c.label] || '$'
          parts.push(`1 USD = ${sym}${fmt(usd[c.code], c.decimals)} ${c.label}`)
        }
      }
      if (parts.length === 0) return ''
      return `TIPOS DE CAMBIO RESPALDO (${fecha}): ${parts.join(' | ')}`
    } catch {
      return ''
    }
  })
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

// --- API: Dolar Blue Argentina (dolarapi.com — free, no key) ---
export async function getDolarBlue(): Promise<string> {
  return cached('dolar-blue', ONE_HOUR, async () => {
    try {
      const res = await fetch('https://dolarapi.com/v1/dolares/blue', {
        signal: AbortSignal.timeout(8000),
      })
      if (!res.ok) return ''
      const data = await res.json()
      const compra = data.compra
      const venta = data.venta
      const fecha = data.fechaActualizacion || new Date().toISOString()
      if (!compra || !venta) return ''
      return `DOLAR BLUE (Argentina): Compra $${fmt(compra)} | Venta $${fmt(venta)} ARS (actualizado ${fecha.slice(0, 16).replace('T', ' ')})`
    } catch {
      return ''
    }
  })
}

// --- API: Cotizaciones dolar Argentina completas (dolarapi.com) ---
export async function getDolaresArgentina(): Promise<string> {
  return cached('dolares-argentina', ONE_HOUR, async () => {
    try {
      const res = await fetch('https://dolarapi.com/v1/dolares', {
        signal: AbortSignal.timeout(8000),
      })
      if (!res.ok) return ''
      const data = await res.json()
      if (!Array.isArray(data)) return ''
      const lines = data.slice(0, 6).map((d: { nombre: string; compra: number; venta: number }) => {
        return `${d.nombre}: Compra $${fmt(d.compra)} / Venta $${fmt(d.venta)}`
      })
      return `COTIZACIONES DOLAR ARGENTINA:\n ${lines.join(' | ')}`
    } catch {
      return ''
    }
  })
}

// --- API: TRM Colombia (datos.gov.co — Socrata API, free) ---
export async function getTRMColombia(): Promise<string> {
  return cached('trm-colombia', SIX_HOURS, async () => {
    try {
      const res = await fetch(
        'https://www.datos.gov.co/resource/mcec-87by.json?$limit=1&$order=vigenciadesde%20DESC',
        { signal: AbortSignal.timeout(10000) }
      )
      if (!res.ok) return ''
      const data = await res.json()
      if (!Array.isArray(data) || data.length === 0) return ''
      const trm = data[0]
      const valor = trm.valor ? Number(trm.valor).toFixed(2) : null
      const fecha = trm.vigenciadesde ? trm.vigenciadesde.slice(0, 10) : ''
      if (!valor) return ''
      return `TRM COLOMBIA (oficial): 1 USD = $${valor} COP (vigencia ${fecha})`
    } catch {
      return ''
    }
  })
}

// --- API: Inflation historical (World Bank — last 5 years) ---
export async function getInflationHistory(wbCode: string): Promise<string> {
  const code = wbCode.toUpperCase()
  return cached(`inflation-history-${code}`, TWENTY_FOUR_HOURS, async () => {
    try {
      const res = await fetch(
        `https://api.worldbank.org/v2/country/${code}/indicator/FP.CPI.TOTL.ZG?format=json&per_page=5&mrnev=5`,
        { signal: AbortSignal.timeout(10000) }
      )
      if (!res.ok) return ''
      const json = await res.json()
      const datos = json?.[1]
      if (!Array.isArray(datos) || datos.length === 0) return ''
      const countryName = COUNTRY_NAMES[Object.keys(COUNTRY_TO_WB_CODE).find(k => COUNTRY_TO_WB_CODE[k] === code) || ''] || code
      const items = datos
        .filter((d: { value: number | null; date: string }) => d.value != null)
        .map((d: { value: number; date: string }) => `${d.date}: ${Number(d.value).toFixed(1)}%`)
        .reverse()
      if (items.length === 0) return ''
      return `INFLACION HISTORICA (${countryName}): ${items.join(' | ')}`
    } catch {
      return ''
    }
  })
}

// --- API: mindicador.cl TPM historica (Chile) ---
export async function getTPMHistory(): Promise<string> {
  return cached('tpm-history', TWENTY_FOUR_HOURS, async () => {
    try {
      const year = new Date().getFullYear()
      const res = await fetch(`https://mindicador.cl/api/tpm/${year}`, {
        signal: AbortSignal.timeout(8000),
      })
      if (!res.ok) return ''
      const data = await res.json()
      const serie = data.serie
      if (!Array.isArray(serie) || serie.length === 0) return ''
      // Ultimos 6 valores
      const ultimos = serie.slice(0, 6).reverse()
      const items = ultimos.map((v: { fecha: string; valor: number }) => {
        const fecha = v.fecha ? v.fecha.slice(0, 10) : ''
        return `${fecha}: ${v.valor}%`
      })
      return `TPM CHILE (${year}, ultimos datos): ${items.join(' | ')}`
    } catch {
      return ''
    }
  })
}

// --- API: mindicador.cl IPC historico (Chile) ---
export async function getIPCHistory(): Promise<string> {
  return cached('ipc-history', TWENTY_FOUR_HOURS, async () => {
    try {
      const year = new Date().getFullYear()
      const res = await fetch(`https://mindicador.cl/api/ipc/${year}`, {
        signal: AbortSignal.timeout(8000),
      })
      if (!res.ok) return ''
      const data = await res.json()
      const serie = data.serie
      if (!Array.isArray(serie) || serie.length === 0) return ''
      const ultimos = serie.slice(0, 6).reverse()
      const items = ultimos.map((v: { fecha: string; valor: number }) => {
        const fecha = v.fecha ? new Date(v.fecha).toLocaleDateString('es-CL', { month: 'short', year: 'numeric' }) : ''
        return `${fecha}: ${v.valor}%`
      })
      return `IPC CHILE MENSUAL (${year}): ${items.join(' | ')}`
    } catch {
      return ''
    }
  })
}

// --- API: CoinGecko — Bitcoin/crypto prices in local currencies ---
export async function getCryptoPrices(country: string): Promise<string> {
  const currencyMap: Record<string, string> = {
    chile: 'clp', mexico: 'mxn', colombia: 'cop', peru: 'pen',
    argentina: 'ars', bolivia: 'usd', ecuador: 'usd',
  }
  const localCur = currencyMap[country] || 'usd'
  return cached(`crypto-${localCur}`, THREE_HOURS, async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=${localCur},usd`,
        { signal: AbortSignal.timeout(10000) }
      )
      if (!res.ok) return ''
      const data = await res.json()
      const parts: string[] = []
      const curUpper = localCur.toUpperCase()
      const sym = CURRENCY_SYMBOLS[curUpper] || '$'
      if (data.bitcoin?.[localCur]) {
        parts.push(`Bitcoin: ${sym}${fmt(data.bitcoin[localCur])} ${curUpper}`)
      }
      if (data.ethereum?.[localCur]) {
        parts.push(`Ethereum: ${sym}${fmt(data.ethereum[localCur])} ${curUpper}`)
      }
      if (data.bitcoin?.usd && localCur !== 'usd') {
        parts.push(`BTC ref: $${fmt(data.bitcoin.usd)} USD`)
      }
      if (parts.length === 0) return ''
      return `CRIPTOMONEDAS: ${parts.join(' | ')}`
    } catch {
      return ''
    }
  })
}

// --- API: Open-Meteo Extended — Weather + Air quality + Sunrise/Sunset ---
export async function getWeatherExtended(country: string): Promise<string> {
  const city = CITY_COORDS[country]
  if (!city) return ''
  return cached(`weather-ext-${country}`, THREE_HOURS, async () => {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset,uv_index_max&timezone=auto&forecast_days=3`
      const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
      if (!res.ok) return ''
      const data = await res.json()
      const current = data.current
      const daily = data.daily

      const parts: string[] = []
      if (current?.relative_humidity_2m != null) {
        parts.push(`Humedad: ${current.relative_humidity_2m}%`)
      }
      if (current?.wind_speed_10m != null) {
        parts.push(`Viento: ${Math.round(current.wind_speed_10m)} km/h`)
      }
      if (daily?.sunrise?.[0]) {
        const sunrise = daily.sunrise[0].split('T')[1] || daily.sunrise[0]
        const sunset = daily.sunset?.[0]?.split('T')[1] || ''
        parts.push(`Amanecer: ${sunrise} | Atardecer: ${sunset}`)
      }
      if (daily?.uv_index_max?.[0] != null) {
        parts.push(`UV max hoy: ${daily.uv_index_max[0]}`)
      }
      if (parts.length === 0) return ''
      return `CLIMA DETALLE (${city.name}): ${parts.join(' | ')}`
    } catch {
      return ''
    }
  })
}

// --- API: Open-Meteo Air Quality ---
export async function getAirQuality(country: string): Promise<string> {
  const city = CITY_COORDS[country]
  if (!city) return ''
  return cached(`air-quality-${country}`, THREE_HOURS, async () => {
    try {
      const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${city.lat}&longitude=${city.lon}&current=european_aqi,pm10,pm2_5`
      const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
      if (!res.ok) return ''
      const data = await res.json()
      const current = data.current
      if (!current) return ''
      const aqi = current.european_aqi
      const pm25 = current.pm2_5
      const pm10 = current.pm10
      let calidad = 'buena'
      if (aqi > 100) calidad = 'muy mala'
      else if (aqi > 75) calidad = 'mala'
      else if (aqi > 50) calidad = 'moderada'
      else if (aqi > 25) calidad = 'aceptable'
      const parts: string[] = [`Calidad del aire: ${calidad} (AQI: ${aqi})`]
      if (pm25 != null) parts.push(`PM2.5: ${pm25}`)
      if (pm10 != null) parts.push(`PM10: ${pm10}`)
      return `CALIDAD AIRE (${CITY_COORDS[country]?.name}): ${parts.join(' | ')}`
    } catch {
      return ''
    }
  })
}

// --- API: RSS Business news (Spanish-language feeds) ---
export async function getBusinessNews(country: string): Promise<string> {
  const feedMap: Record<string, { url: string; name: string }> = {
    chile: { url: 'https://www.df.cl/noticias/site/tax/port/all/rss___1.xml', name: 'Diario Financiero' },
    mexico: { url: 'https://www.elfinanciero.com.mx/arc/outboundfeeds/rss/?outputType=xml', name: 'El Financiero' },
    colombia: { url: 'https://www.portafolio.co/rss', name: 'Portafolio' },
    peru: { url: 'https://gestion.pe/arcio/rss/', name: 'Gestion' },
    argentina: { url: 'https://www.ambito.com/rss/noticias.xml', name: 'Ambito' },
  }
  const feed = feedMap[country]
  if (!feed) return ''
  return cached(`news-${country}`, THREE_HOURS, async () => {
    try {
      const res = await fetch(feed.url, { signal: AbortSignal.timeout(10000) })
      if (!res.ok) return ''
      const xml = await res.text()
      // Parse RSS XML — extract <title> tags (skip the first which is the channel title)
      const titleRegex = /<title><!\[CDATA\[(.*?)\]\]>|<title>(.*?)<\/title>/g
      const titles: string[] = []
      let match
      let count = 0
      while ((match = titleRegex.exec(xml)) !== null) {
        count++
        if (count <= 1) continue // skip channel title
        const title = (match[1] || match[2] || '').trim()
        if (title && title.length > 5) {
          titles.push(title)
        }
        if (titles.length >= 5) break
      }
      if (titles.length === 0) return ''
      return `NOTICIAS DE NEGOCIOS (${feed.name}):\n${titles.map(t => ` * ${t}`).join('\n')}`
    } catch {
      return ''
    }
  })
}

// --- API: MercadoLibre search for product prices (on-demand) ---
export async function searchProductPrices(query: string, country: string): Promise<string> {
  const site = COUNTRY_TO_ML_SITE[country]
  if (!site || !query.trim()) return ''
  const cacheKey = `ml-price-${site}-${query.toLowerCase().trim().replace(/\s+/g, '-')}`
  return cached(cacheKey, SIX_HOURS, async () => {
    try {
      const res = await fetch(
        `https://api.mercadolibre.com/sites/${site}/search?q=${encodeURIComponent(query)}&limit=8&sort=relevance`,
        { signal: AbortSignal.timeout(10000) }
      )
      if (!res.ok) return ''
      const data = await res.json()
      const results = data.results as Array<{
        title: string; price: number; currency_id: string;
        sold_quantity?: number; condition?: string; shipping?: { free_shipping?: boolean }
      }> | undefined
      if (!results || results.length === 0) return ''

      // Calcular rango de precios
      const prices = results.map(r => r.price).filter(p => p > 0)
      const minPrice = Math.min(...prices)
      const maxPrice = Math.max(...prices)
      const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length
      const cur = results[0].currency_id || ''
      const sym = CURRENCY_SYMBOLS[cur] || '$'

      const countryName = COUNTRY_NAMES[country] || country
      const items = results.slice(0, 5).map((r) => {
        const envio = r.shipping?.free_shipping ? ' (envio gratis)' : ''
        const vendidos = r.sold_quantity ? ` - ${r.sold_quantity} vendidos` : ''
        return `  * ${r.title} — ${sym}${fmt(r.price)} ${cur}${vendidos}${envio}`
      })

      return `PRECIOS "${query}" EN MERCADOLIBRE (${countryName}):\nRango: ${sym}${fmt(minPrice)} - ${sym}${fmt(maxPrice)} ${cur} | Promedio: ${sym}${fmt(avgPrice)} ${cur}\n${items.join('\n')}`
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

  const promises: Promise<string>[] = [
    getExchangeRates(),
    getUpcomingHolidays(cc),
    getCountryIndicators(wbCode),
    getWeather(country),
    getWeatherExtended(country),
    getAirQuality(country),
    getCryptoPrices(country),
    getInflationHistory(wbCode),
    getCommodityPrices(),
    getBusinessNews(country),
    // --- New universal APIs ---
    getCountryInfo(country),
  ]

  // Indicadores especificos por pais
  if (country === 'chile') {
    promises.push(getChileanIndicators())
    promises.push(getTPMHistory())
    promises.push(getIPCHistory())
  }
  if (country === 'argentina') {
    promises.push(getArgentinaIndicators())
    promises.push(getDolarBlue())
    promises.push(getDolaresArgentina())
  }
  if (country === 'peru') {
    promises.push(getPeruIndicators())
  }
  if (country === 'mexico') {
    promises.push(getMexicoIndicators())
    promises.push(getINEGIIndicators())
  }
  if (country === 'colombia') {
    promises.push(getTRMColombia())
    promises.push(getColombiaEconomicIndicators())
    promises.push(getColombiaIPC())
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

  // Unidades de referencia (UIT, UMA, UVT, etc.)
  const unidades = getUnidadesReferencia(country)
  if (unidades) parts.push(unidades)

  // Tarifas de energia (util para inventario/operaciones)
  const energia = getTarifasEnergia(country)
  if (energia) parts.push(energia)

  // Costos de envio referencia (util para inventario/ventas/logistica)
  const envio = getCostosEnvio(country)
  if (envio) parts.push(envio)

  // Tasas de credito PYME (util para financiero)
  const tasas = getTasasCreditoPyme(country)
  if (tasas) parts.push(tasas)

  if (parts.length === 0) return ''

  return '\n\nDATOS EN TIEMPO REAL:\n' + parts.join('\n\n') + '\n'
}
