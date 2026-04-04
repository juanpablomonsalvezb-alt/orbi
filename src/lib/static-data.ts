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
  bolivia: { monto: 2500, moneda: 'BOB', periodo: 'mensual', vigencia: '2025' },
  ecuador: { monto: 460, moneda: 'USD', periodo: 'mensual', vigencia: '2025' },
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
  bolivia: {
    smv: { valor: 2500, moneda: 'BOB', vigencia: '2025', descripcion: 'Salario Minimo Nacional' },
  },
  ecuador: {
    sbu: { valor: 460, moneda: 'USD', vigencia: '2025', descripcion: 'Salario Basico Unificado' },
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
  bolivia: {
    iva_mensual: 'Segun ultimo digito NIT (mes siguiente)',
    iue_anual: '120 dias post cierre (generalmente abril)',
    iva_tasa: '13%',
    iue_tasa: '25%',
    it_tasa: '3% sobre ingresos brutos',
  },
  ecuador: {
    iva_mensual: 'Segun 9no digito RUC (mes siguiente)',
    renta_anual: 'Marzo-Abril (segun 9no digito)',
    iva_tasa: '15%',
    renta_tasa: '25% (general) o RIMPE 1-2%',
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
  bolivia: {
    afp_empleador: '14.71% (2% riesgo profesional + 1.71% comision + 10% + 1% solidario)',
    cns_empleador: '10%',
    vivienda_empleador: '2%',
    costo_total_empleador: '~26-28% sobre remuneracion bruta',
  },
  ecuador: {
    iess_empleador: '11.15%',
    iess_trabajador: '9.45%',
    fondos_reserva: '8.33% (despues del primer año)',
    decimo_tercero: '1/12 de remuneracion',
    decimo_cuarto: '1 salario basico unificado/12',
    costo_total_empleador: '~30-35% sobre remuneracion bruta',
  },
}

// --- Precios de combustible por pais (referencia aproximada) ---
export const PRECIOS_COMBUSTIBLE: Record<string, Record<string, unknown>> = {
  chile: { gasolina_93: 1250, gasolina_97: 1450, diesel: 1100, moneda: 'CLP/litro', vigencia: 'Abril 2026 aprox.' },
  mexico: { regular: 24.5, premium: 27.0, diesel: 26.5, moneda: 'MXN/litro', vigencia: 'Abril 2026 aprox.' },
  colombia: { corriente: 14500, extra: 17000, diesel: 10500, moneda: 'COP/galon', vigencia: 'Abril 2026 aprox.' },
  peru: { regular_90: 16.5, premium_95: 19.0, diesel: 15.5, moneda: 'PEN/galon', vigencia: 'Abril 2026 aprox.' },
  argentina: { super: 1200, premium: 1500, diesel: 1100, moneda: 'ARS/litro', vigencia: 'Abril 2026 aprox.', nota: 'Varia por provincia' },
  bolivia: { gasolina: 3.74, diesel: 3.72, moneda: 'BOB/litro', vigencia: '2026', nota: 'Precio regulado por gobierno' },
  ecuador: { extra: 2.72, super: 3.89, diesel: 1.75, moneda: 'USD/galon', vigencia: '2026' },
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
  bolivia: [
    { mes: 'Febrero', evento: 'Carnaval de Oruro', impacto: 'alto (turismo)' },
    { mes: 'Mayo', evento: 'Dia de la Madre (27 mayo)', impacto: 'alto' },
    { mes: 'Agosto', evento: 'Independencia (6 ago)', impacto: 'medio' },
    { mes: 'Diciembre', evento: 'Navidad + aguinaldo', impacto: 'alto' },
  ],
  ecuador: [
    { mes: 'Febrero', evento: 'Carnaval', impacto: 'medio' },
    { mes: 'Mayo', evento: 'Dia de la Madre', impacto: 'alto' },
    { mes: 'Agosto', evento: 'Independencia (10 ago)', impacto: 'medio' },
    { mes: 'Noviembre', evento: 'Black Friday', impacto: 'alto' },
    { mes: 'Diciembre', evento: 'Navidad + decimo tercero', impacto: 'muy alto' },
  ],
}

// --- Costos publicitarios referencia por pais ---
export const COSTOS_PUBLICIDAD: Record<string, Record<string, string>> = {
  chile: { meta_cpc: '$150-400 CLP', meta_cpm: '$3,000-8,000 CLP', google_cpc: '$200-800 CLP' },
  mexico: { meta_cpc: '$3-8 MXN', meta_cpm: '$50-150 MXN', google_cpc: '$5-15 MXN' },
  colombia: { meta_cpc: '$500-2,000 COP', meta_cpm: '$8,000-25,000 COP', google_cpc: '$1,000-4,000 COP' },
  peru: { meta_cpc: '$0.50-1.50 PEN', meta_cpm: '$8-20 PEN', google_cpc: '$1-4 PEN' },
  argentina: { meta_cpc: '$50-200 ARS', meta_cpm: '$800-3,000 ARS', google_cpc: '$100-500 ARS', nota: 'Muy volatil por inflacion' },
  bolivia: { meta_cpc: '$0.30-0.80 BOB', meta_cpm: '$5-15 BOB', google_cpc: '$0.50-2 BOB' },
  ecuador: { meta_cpc: '$0.15-0.50 USD', meta_cpm: '$3-10 USD', google_cpc: '$0.30-1.50 USD' },
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
