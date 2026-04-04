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
