/**
 * Datos estaticos de referencia para ORBBI.
 * Actualizados manualmente. Ultima actualizacion: Abril 2026
 */

export const SALARIOS_MINIMOS = {
  chile: { monto: 500000, moneda: 'CLP', periodo: 'mensual', vigencia: '2026' },
  mexico: { monto: 9338, moneda: 'MXN', periodo: 'mensual', vigencia: '2026', nota: '$311.27/dia x 30' },
  colombia: { monto: 1423500, moneda: 'COP', periodo: 'mensual', vigencia: '2026', auxTransporte: 200000 },
  peru: { monto: 1130, moneda: 'PEN', periodo: 'mensual', vigencia: '2025' },
  argentina: { monto: 286000, moneda: 'ARS', periodo: 'mensual', vigencia: '2025', nota: 'Actualizacion trimestral' },
  uruguay: { monto: 22268, moneda: 'UYU', periodo: 'mensual', vigencia: '2025' },
}

// --- Unidades de referencia por pais (valores fijos anuales) ---
export const UNIDADES_REFERENCIA = {
  chile: {
    uf: { valor: 'Variable diario (~$38,000 CLP)', descripcion: 'Unidad de Fomento — se obtiene en tiempo real via mindicador.cl' },
    utm: { valor: 'Variable mensual (~$67,000 CLP)', descripcion: 'Unidad Tributaria Mensual' },
  },
  peru: {
    uit: { valor: 5350, moneda: 'PEN', vigencia: '2026', descripcion: 'Unidad Impositiva Tributaria — usada para tramos tributarios, multas, etc.' },
  },
  mexico: {
    uma: { valor_diario: 113.14, valor_mensual: 3439.46, valor_anual: 41273.04, moneda: 'MXN', vigencia: '2026', descripcion: 'Unidad de Medida y Actualizacion — usada para multas, creditos INFONAVIT, seguridad social' },
  },
  colombia: {
    uvt: { valor: 49799, moneda: 'COP', vigencia: '2026', descripcion: 'Unidad de Valor Tributario — usada para tramos de renta, multas DIAN' },
  },
  argentina: {
    uma_ar: { valor: 'Variable', descripcion: 'En Argentina no existe UMA; se usa el SMVM (Salario Minimo Vital y Movil) como referencia' },
  },
  uruguay: {
    bpc: { valor: 6177, moneda: 'UYU', vigencia: '2025', descripcion: 'Base de Prestaciones y Contribuciones — usada para tramos tributarios y prestaciones sociales' },
  },
}

export function getUnidadesReferencia(country: string): string {
  const data = UNIDADES_REFERENCIA[country as keyof typeof UNIDADES_REFERENCIA]
  if (!data) return ''
  const items = Object.entries(data).map(([key, val]) => {
    const v = val as Record<string, unknown>
    const valor = v.valor_diario ? `${v.valor_diario} ${v.moneda}/dia (${v.valor_mensual} /mes)` : `${v.valor} ${v.moneda || ''}`
    return `${key.toUpperCase()}: ${valor} (${v.vigencia || 'variable'}) — ${v.descripcion}`
  })
  return `UNIDADES DE REFERENCIA (${country}):\n${items.map(i => ` * ${i}`).join('\n')}`
}

export const CALENDARIO_TRIBUTARIO = {
  chile: {
    iva_f29: 'Dia 12-20 de cada mes (segun ultimo digito RUT)',
    renta_anual: '1-30 de abril',
    ppm: 'Dia 12-20 de cada mes (junto con F29)',
    iva_tasa: '19%',
    renta_pyme: '25% (Pro PYME) o 27% (Semi-Integrado)',
  },
  mexico: {
    provisionales: 'Dia 17 de cada mes (ISR + IVA)',
    renta_pm: '31 de marzo',
    renta_pf: '30 de abril',
    iva_tasa: '16%',
    isr_resico: '1-2.5%',
    isr_general: '30%',
  },
  colombia: {
    iva_bimestral: 'Segun ultimo digito NIT (meses pares)',
    renta_gm: 'Febrero/Abril/Junio (Grandes Contribuyentes)',
    renta_pj: 'Abril-Mayo',
    renta_pn: 'Agosto-Octubre',
    iva_tasa: '19%',
    renta_simple: '1.8-14.5% (Regimen Simple)',
  },
  peru: {
    igv_mensual: 'Segun ultimo digito RUC (mes siguiente)',
    renta_anual: 'Marzo-Abril',
    igv_tasa: '18%',
    renta_mype: '10% (hasta 15 UIT) / 29.5% (resto)',
  },
  argentina: {
    iva_mensual: 'Segun terminacion CUIT',
    ganancias: '5to mes post cierre ejercicio',
    monotributo: 'Dia 20 de cada mes',
    iva_tasa: '21%',
    ganancias_tasa: '25-35%',
  },
  uruguay: {
    iva: 'Mensual (grandes contribuyentes) o bimestral (pequenos)',
    irae_anual: 'Declaracion anual, anticipos mensuales',
    irpf: 'Retencion mensual por empleador',
    bps: 'Aporte mensual',
    iva_tasa: '22% (tasa basica), 10% (tasa minima)',
    irae_tasa: '25%',
    autoridad: 'DGI (dgi.gub.uy)',
  },
}

export const COTIZACIONES_PREVISIONALES = {
  chile: {
    afp_trabajador: '10% + comision AFP (0.46-1.45%)',
    salud_trabajador: '7%',
    seguro_cesantia_trabajador: '0.6%',
    seguro_cesantia_empleador: '2.4%',
    mutual_empleador: '0.93% base + tasa adicional segun riesgo',
    sis_empleador: '1.54%',
    costo_total_empleador: '~5-7% adicional sobre remuneracion bruta',
  },
  mexico: {
    imss_patron: '~25-35% del SBC (varia por riesgo de trabajo)',
    infonavit: '5%',
    sar_retiro: '2%',
    cesantia_vejez: '3.15% (2026, incremento gradual)',
    isr_retencion: 'Segun tabla progresiva',
  },
  colombia: {
    salud_empleador: '8.5%',
    pension_empleador: '12%',
    arl_empleador: '0.522-6.96% segun riesgo',
    caja_compensacion: '4%',
    nota: 'Empresas <10 trabajadores exentas de algunos parafiscales',
  },
  peru: {
    essalud_empleador: '9%',
    pension_trabajador: '13% (ONP) o AFP (~13.5%)',
    cts: '~8.33% (2 depositos al año)',
    gratificaciones: '~16.67% (2 gratificaciones al año)',
    sctr: '0.53-1.55% segun riesgo',
    costo_total_empleador: '~45-50% sobre remuneracion bruta',
  },
  argentina: {
    jubilacion_empleador: '10.77%',
    insjjp_empleador: '1.62%',
    asignaciones_familiares: '5.56%',
    fondo_empleo: '0.89%',
    obra_social_empleador: '6%',
    costo_total_empleador: '~24-27% sobre remuneracion bruta',
    nota: 'Varia por convenio colectivo',
  },
  uruguay: {
    bps_jubilacion_empleador: '7.5%',
    bps_fonasa_empleador: '5%',
    bps_frl_empleador: '0.125%',
    bps_trabajador_jubilacion: '15%',
    bps_trabajador_fonasa: '3-8%',
    aguinaldo: '1 sueldo/ano (pagado en 2 cuotas: junio y diciembre)',
    licencia: '20 dias habiles minimo',
    salario_vacacional: '100% del salario del periodo de licencia',
    costo_total_empleador: '~12.625% sobre remuneracion bruta + aguinaldo + salario vacacional',
  },
}

// --- Precios de combustible por pais (referencia aproximada) ---
export const PRECIOS_COMBUSTIBLE: Record<string, Record<string, unknown>> = {
  chile: { gasolina_93: 1250, gasolina_97: 1450, diesel: 1100, moneda: 'CLP/litro', vigencia: 'Abril 2026 aprox.' },
  mexico: { regular: 24.5, premium: 27.0, diesel: 26.5, moneda: 'MXN/litro', vigencia: 'Abril 2026 aprox.' },
  colombia: { corriente: 14500, extra: 17000, diesel: 10500, moneda: 'COP/galon', vigencia: 'Abril 2026 aprox.' },
  peru: { regular_90: 16.5, premium_95: 19.0, diesel: 15.5, moneda: 'PEN/galon', vigencia: 'Abril 2026 aprox.' },
  argentina: { super: 1200, premium: 1500, diesel: 1100, moneda: 'ARS/litro', vigencia: 'Abril 2026 aprox.', nota: 'Varia por provincia' },
  uruguay: { nafta_super_95: 76, gasoil_50s: 58, moneda: 'UYU/litro', vigencia: '2026' },
}

// --- Calendario comercial por pais ---
export const CALENDARIO_COMERCIAL: Record<string, Array<{ mes: string; evento: string; impacto: string }>> = {
  chile: [
    { mes: 'Enero-Febrero', evento: 'Temporada baja, vacaciones', impacto: 'bajo' },
    { mes: 'Marzo', evento: 'Vuelta a clases', impacto: 'medio' },
    { mes: 'Mayo', evento: 'Dia de la Madre', impacto: 'alto' },
    { mes: 'Junio', evento: 'CyberDay', impacto: 'alto' },
    { mes: 'Septiembre', evento: 'Fiestas Patrias', impacto: 'muy alto' },
    { mes: 'Noviembre', evento: 'Black Friday / CyberMonday', impacto: 'alto' },
    { mes: 'Diciembre', evento: 'Navidad', impacto: 'muy alto' },
  ],
  mexico: [
    { mes: 'Febrero', evento: 'San Valentin + Dia de la Bandera', impacto: 'medio' },
    { mes: 'Mayo', evento: 'Dia de la Madre (10 mayo - mayor venta del año)', impacto: 'muy alto' },
    { mes: 'Junio', evento: 'Dia del Padre + Hot Sale', impacto: 'alto' },
    { mes: 'Septiembre', evento: 'Independencia (15-16 sep)', impacto: 'alto' },
    { mes: 'Noviembre', evento: 'Buen Fin + Black Friday', impacto: 'muy alto' },
    { mes: 'Diciembre', evento: 'Navidad + Aguinaldos', impacto: 'muy alto' },
  ],
  colombia: [
    { mes: 'Marzo-Abril', evento: 'Semana Santa', impacto: 'medio' },
    { mes: 'Mayo', evento: 'Dia de la Madre', impacto: 'alto' },
    { mes: 'Junio', evento: 'Dia sin IVA #1', impacto: 'muy alto' },
    { mes: 'Julio', evento: 'Dia sin IVA #2 + independencia (20 jul)', impacto: 'alto' },
    { mes: 'Noviembre', evento: 'Black Friday + Dia sin IVA #3', impacto: 'alto' },
    { mes: 'Diciembre', evento: 'Navidad + primas', impacto: 'muy alto' },
  ],
  peru: [
    { mes: 'Mayo', evento: 'Dia de la Madre', impacto: 'alto' },
    { mes: 'Junio', evento: 'Dia del Padre', impacto: 'medio' },
    { mes: 'Julio', evento: 'Fiestas Patrias (28-29 jul) + gratificacion', impacto: 'muy alto' },
    { mes: 'Noviembre', evento: 'Cyber Wow + Black Friday', impacto: 'alto' },
    { mes: 'Diciembre', evento: 'Navidad + gratificacion', impacto: 'muy alto' },
  ],
  argentina: [
    { mes: 'Marzo', evento: 'Vuelta a clases', impacto: 'medio' },
    { mes: 'Mayo', evento: 'Dia de la Madre (3er domingo oct en AR)', impacto: 'alto' },
    { mes: 'Junio', evento: 'Dia del Padre + Hot Sale', impacto: 'alto' },
    { mes: 'Noviembre', evento: 'CyberMonday AR + Black Friday', impacto: 'alto' },
    { mes: 'Diciembre', evento: 'Navidad + aguinaldo', impacto: 'muy alto' },
  ],
  uruguay: [
    { mes: 'Marzo', evento: 'Semana de Turismo (Semana Santa)', impacto: 'alto (turismo)' },
    { mes: 'Mayo', evento: 'Dia de la Madre', impacto: 'alto' },
    { mes: 'Agosto', evento: 'Dia del Nino', impacto: 'medio' },
    { mes: 'Septiembre', evento: 'Dia del Patrimonio', impacto: 'medio' },
    { mes: 'Noviembre', evento: 'Black Friday', impacto: 'alto' },
    { mes: 'Diciembre', evento: 'Navidad + aguinaldo', impacto: 'muy alto' },
  ],
}

// --- Costos publicitarios referencia por pais ---
export const COSTOS_PUBLICIDAD: Record<string, Record<string, string>> = {
  chile: { meta_cpc: '$150-400 CLP', meta_cpm: '$3,000-8,000 CLP', google_cpc: '$200-800 CLP' },
  mexico: { meta_cpc: '$3-8 MXN', meta_cpm: '$50-150 MXN', google_cpc: '$5-15 MXN' },
  colombia: { meta_cpc: '$500-2,000 COP', meta_cpm: '$8,000-25,000 COP', google_cpc: '$1,000-4,000 COP' },
  peru: { meta_cpc: '$0.50-1.50 PEN', meta_cpm: '$8-20 PEN', google_cpc: '$1-4 PEN' },
  argentina: { meta_cpc: '$50-200 ARS', meta_cpm: '$800-3,000 ARS', google_cpc: '$100-500 ARS', nota: 'Muy volatil por inflacion' },
  uruguay: { meta_cpc: '$0.20-0.60 USD', meta_cpm: '$4-12 USD', google_cpc: '$0.40-1.50 USD' },
}

// --- Integraciones disponibles (OAuth / API key del usuario) ---
export const INTEGRACIONES_DISPONIBLES = {
  google_analytics: {
    nombre: 'Google Analytics',
    descripcion: 'Conecta tu Google Analytics para que el agente de Marketing vea tu trafico real.',
    como_conectar: 'Proximamente — podras vincular tu cuenta de Google Analytics directamente desde el chat.',
    estado: 'proximamente' as const,
  },
  google_search_console: {
    nombre: 'Google Search Console',
    descripcion: 'Conecta tu Search Console para que el agente de Marketing vea tus keywords y posiciones.',
    como_conectar: 'Proximamente — podras vincular tu cuenta directamente desde el chat.',
    estado: 'proximamente' as const,
  },
  meta_business: {
    nombre: 'Meta Business Suite',
    descripcion: 'Conecta tu cuenta de Facebook/Instagram Business para metricas reales de campanas.',
    como_conectar: 'Proximamente — podras vincular tu cuenta directamente desde el chat.',
    estado: 'proximamente' as const,
  },
  mercadolibre: {
    nombre: 'MercadoLibre',
    descripcion: 'Conecta tu cuenta de vendedor para que los agentes vean tus ventas y metricas reales.',
    como_conectar: 'Proximamente — podras vincular tu cuenta directamente desde el chat.',
    estado: 'proximamente' as const,
  },
  banxico: {
    nombre: 'Banxico SIE',
    descripcion: 'Indicadores del Banco de Mexico (tipo de cambio FIX, TIIE). Se activa con token gratuito.',
    como_conectar: 'Agrega BANXICO_TOKEN en las variables de entorno. Obtenlo gratis en https://www.banxico.org.mx/SieAPIRest/service/v1/token',
    estado: 'requiere_token' as const,
  },
  inegi: {
    nombre: 'INEGI (Mexico)',
    descripcion: 'Indicadores economicos y Directorio de negocios DENUE. Se activa con token gratuito.',
    como_conectar: 'Agrega INEGI_TOKEN en las variables de entorno. Obtenlo gratis en https://www.inegi.org.mx/app/api/denue/v1/tokenVerify.aspx',
    estado: 'requiere_token' as const,
  },
}

// --- Tarifas energia referencia por pais ---
export const TARIFAS_ENERGIA: Record<string, Record<string, string>> = {
  chile: {
    residencial: '$130-180 CLP/kWh',
    comercial: '$100-150 CLP/kWh',
    fuente: 'CNE — Comision Nacional de Energia',
    vigencia: '2026 aprox.',
  },
  mexico: {
    residencial_basica: '$0.99 MXN/kWh (primeros 75 kWh)',
    residencial_intermedia: '$1.30-2.80 MXN/kWh',
    comercial: '$3.50-5.50 MXN/kWh',
    fuente: 'CFE — Comision Federal de Electricidad',
    vigencia: '2026 aprox.',
  },
  colombia: {
    residencial_estrato3: '$650-900 COP/kWh',
    comercial: '$500-750 COP/kWh',
    fuente: 'CREG / XM',
    vigencia: '2026 aprox.',
    nota: 'Varia por estrato y ciudad',
  },
  peru: {
    residencial: 'S/0.60-0.80 PEN/kWh',
    comercial: 'S/0.40-0.60 PEN/kWh',
    fuente: 'OSINERGMIN',
    vigencia: '2026 aprox.',
  },
  argentina: {
    residencial: '$60-120 ARS/kWh',
    comercial: '$80-150 ARS/kWh',
    fuente: 'ENRE',
    vigencia: '2026 aprox.',
    nota: 'Muy variable por subsidios y zona',
  },
  uruguay: {
    residencial: '$U 5.50-7.50 UYU/kWh',
    comercial: '$U 4.50-6.50 UYU/kWh',
    fuente: 'UTE (Administracion Nacional de Usinas y Trasmisiones Electricas)',
    vigencia: '2026 aprox.',
  },
}

// --- Costos logistica/envio referencia por pais ---
export const COSTOS_ENVIO: Record<string, Record<string, string>> = {
  chile: {
    correos_chile: 'Desde $2,500 CLP (hasta 1kg, nacional)',
    chilexpress: 'Desde $3,500 CLP (hasta 3kg, nacional)',
    starken: 'Desde $3,000 CLP (hasta 3kg, nacional)',
    nota: 'Precios varian por origen/destino y peso',
  },
  mexico: {
    estafeta: 'Desde $120 MXN (hasta 1kg, local)',
    fedex_mx: 'Desde $180 MXN (hasta 1kg, nacional)',
    noventa_y_nueve_minutos: 'Desde $80 MXN (same-day CDMX)',
    nota: 'Varia por zona y servicio',
  },
  colombia: {
    servientrega: 'Desde $8,000 COP (hasta 1kg, nacional)',
    interrapidisimo: 'Desde $7,000 COP (hasta 1kg, nacional)',
    coordinadora: 'Desde $9,000 COP (hasta 1kg, nacional)',
    nota: 'Cotizacion exacta via API Servientrega disponible',
  },
  peru: {
    olva_courier: 'Desde S/8 PEN (hasta 1kg, Lima)',
    serpost: 'Desde S/6 PEN (hasta 500g, nacional)',
    nota: 'Lima vs provincias tiene diferencia significativa',
  },
  argentina: {
    correo_argentino: 'Desde $2,500 ARS (hasta 1kg, nacional)',
    andreani: 'Desde $3,000 ARS (hasta 1kg, nacional)',
    oca: 'Desde $2,800 ARS (hasta 1kg, nacional)',
    nota: 'Precios muy variables por inflacion',
  },
  uruguay: {
    dac: 'Desde $U 250 UYU (hasta 1kg, nacional)',
    ues: 'Desde $U 200 UYU (hasta 1kg, Montevideo)',
    mirtrans: 'Desde $U 280 UYU (hasta 1kg, nacional)',
    nota: 'Precios varian por origen/destino y peso',
  },
}

// --- Tasas de interes referencia (creditos PYME) por pais ---
export const TASAS_CREDITO_PYME: Record<string, Record<string, string>> = {
  chile: {
    credito_pyme_bancos: '8-15% anual (UF+spread)',
    fogape: 'Tasa preferencial via garantia estatal FOGAPE',
    microCredito: '15-30% anual',
    fuente: 'CMF / bancos comerciales',
  },
  mexico: {
    credito_pyme: '12-25% anual',
    nafin: 'Tasa preferencial via Nacional Financiera',
    microCredito: '25-50% anual',
    fuente: 'CNBV / bancos comerciales',
  },
  colombia: {
    credito_pyme: '15-25% anual (EA)',
    bancoldex: 'Tasa preferencial via Bancoldex',
    microCredito: '30-50% anual',
    fuente: 'Superfinanciera / bancos comerciales',
  },
  peru: {
    credito_pyme: '15-30% anual (TEA)',
    cofide: 'Tasa preferencial via COFIDE',
    microCredito: '30-60% anual',
    fuente: 'SBS / bancos comerciales',
  },
  argentina: {
    credito_pyme: '40-80% anual (TNA)',
    foga: 'Tasa preferencial via FOGAR',
    nota: 'Tasas altisimas por inflacion; creditos a tasa subsidiada disponibles',
    fuente: 'BCRA / bancos comerciales',
  },
  uruguay: {
    credito_pyme: '10-18% anual (UI o pesos)',
    ande: 'Lineas preferenciales via ANDE (Agencia Nacional de Desarrollo)',
    microCredito: '20-40% anual',
    fuente: 'BCU / bancos comerciales',
  },
}

export function getTarifasEnergia(country: string): string {
  const data = TARIFAS_ENERGIA[country]
  if (!data) return ''
  const items = Object.entries(data)
    .filter(([k]) => !['fuente', 'vigencia', 'nota'].includes(k))
    .map(([k, v]) => `${k.replace(/_/g, ' ')}: ${v}`)
  const nota = data.nota ? ` (${data.nota})` : ''
  return `TARIFAS ENERGIA (${country}, ${data.vigencia || '2026'})${nota}:\n ${items.join(' | ')}\n Fuente: ${data.fuente || 'N/D'}`
}

export function getCostosEnvio(country: string): string {
  const data = COSTOS_ENVIO[country]
  if (!data) return ''
  const items = Object.entries(data)
    .filter(([k]) => k !== 'nota')
    .map(([k, v]) => `${k.replace(/_/g, ' ')}: ${v}`)
  const nota = data.nota ? ` (${data.nota})` : ''
  return `COSTOS ENVIO REFERENCIA (${country})${nota}:\n ${items.join(' | ')}`
}

export function getTasasCreditoPyme(country: string): string {
  const data = TASAS_CREDITO_PYME[country]
  if (!data) return ''
  const items = Object.entries(data)
    .filter(([k]) => !['fuente', 'nota'].includes(k))
    .map(([k, v]) => `${k.replace(/_/g, ' ')}: ${v}`)
  const nota = data.nota ? ` (${data.nota})` : ''
  return `TASAS CREDITO PYME (${country})${nota}:\n ${items.join(' | ')}\n Fuente: ${data.fuente || 'N/D'}`
}

// Helper para obtener datos por pais
export function getSalarioMinimo(country: string): string {
  const data = SALARIOS_MINIMOS[country as keyof typeof SALARIOS_MINIMOS]
  if (!data) return ''
  return `Salario minimo ${country}: ${data.moneda} $${data.monto.toLocaleString()} /mes (${data.vigencia})${(data as Record<string, unknown>).nota ? '. ' + (data as Record<string, unknown>).nota : ''}`
}

export function getCalendarioTributario(country: string): string {
  const cal = CALENDARIO_TRIBUTARIO[country as keyof typeof CALENDARIO_TRIBUTARIO]
  if (!cal) return ''
  return Object.entries(cal).map(([k, v]) => `* ${k.replace(/_/g, ' ')}: ${v}`).join('\n')
}

export function getCotizaciones(country: string): string {
  const cot = COTIZACIONES_PREVISIONALES[country as keyof typeof COTIZACIONES_PREVISIONALES]
  if (!cot) return ''
  return Object.entries(cot).map(([k, v]) => `* ${k.replace(/_/g, ' ')}: ${v}`).join('\n')
}

export function getPreciosCombustible(country: string): string {
  const data = PRECIOS_COMBUSTIBLE[country]
  if (!data) return ''
  const moneda = data.moneda as string
  const vigencia = data.vigencia as string
  const nota = data.nota ? ` (${data.nota})` : ''
  const items = Object.entries(data)
    .filter(([k]) => !['moneda', 'vigencia', 'nota'].includes(k))
    .map(([k, v]) => `${k.replace(/_/g, ' ')}: ${v} ${moneda}`)
  return `PRECIOS COMBUSTIBLE (${country}, ${vigencia})${nota}:\n ${items.join(' | ')}`
}

const MONTH_ORDER: Record<string, number> = {
  'Enero': 1, 'Febrero': 2, 'Marzo': 3, 'Abril': 4, 'Mayo': 5, 'Junio': 6,
  'Julio': 7, 'Agosto': 8, 'Septiembre': 9, 'Octubre': 10, 'Noviembre': 11, 'Diciembre': 12,
}

function parseEventMonth(mes: string): number {
  // Extrae el primer mes mencionado: "Marzo-Abril" -> 3, "Enero-Febrero" -> 1
  for (const [name, num] of Object.entries(MONTH_ORDER)) {
    if (mes.toLowerCase().includes(name.toLowerCase())) return num
  }
  return 13 // fallback al final
}

export function getProximoEventoComercial(country: string): string {
  const eventos = CALENDARIO_COMERCIAL[country]
  if (!eventos) return ''
  const currentMonth = new Date().getMonth() + 1 // 1-12
  // Filtrar eventos cuyo mes principal es >= mes actual
  const proximos = eventos
    .filter(e => parseEventMonth(e.mes) >= currentMonth)
    .slice(0, 2)
  // Si no hay suficientes, agregar desde el inicio del año siguiente
  if (proximos.length < 2) {
    const faltan = 2 - proximos.length
    const desdeInicio = eventos.slice(0, faltan)
    proximos.push(...desdeInicio)
  }
  if (proximos.length === 0) return ''
  const items = proximos.map(e => `${e.mes} - ${e.evento} (impacto ${e.impacto})`)
  return `PROXIMOS EVENTOS COMERCIALES (${country}): ${items.join(' | ')}`
}

export function getCostosPublicidad(country: string): string {
  const data = COSTOS_PUBLICIDAD[country]
  if (!data) return ''
  const nota = data.nota ? ` (${data.nota})` : ''
  const items = Object.entries(data)
    .filter(([k]) => k !== 'nota')
    .map(([k, v]) => `${k.replace(/_/g, ' ')}: ${v}`)
  return `COSTOS PUBLICIDAD REFERENCIA (${country})${nota}:\n ${items.join(' | ')}`
}
