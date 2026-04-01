// Preguntas del onboarding organizadas por bloque

export interface PreguntaOnboarding {
  orden: number
  bloque: number
  bloqueNombre: string
  pregunta: string
  placeholder: string
}

export const PREGUNTAS_ONBOARDING: PreguntaOnboarding[] = [
  // BLOQUE 1 — El negocio
  {
    orden: 1,
    bloque: 1,
    bloqueNombre: 'El negocio',
    pregunta: '¿A qué se dedica exactamente tu empresa?',
    placeholder: 'Ej: Vendemos ropa deportiva por Instagram y en una tienda física en Santiago'
  },
  {
    orden: 2,
    bloque: 1,
    bloqueNombre: 'El negocio',
    pregunta: '¿Cuántos años lleva operando?',
    placeholder: 'Ej: 3 años'
  },
  {
    orden: 3,
    bloque: 1,
    bloqueNombre: 'El negocio',
    pregunta: '¿Cuántas personas trabajan contigo?',
    placeholder: 'Ej: Somos 5, incluyéndome'
  },
  {
    orden: 4,
    bloque: 1,
    bloqueNombre: 'El negocio',
    pregunta: '¿Cuál es tu mayor dolor o problema hoy?',
    placeholder: 'Ej: No sé cuánto gano realmente al final del mes'
  },
  // BLOQUE 2 — Finanzas básicas
  {
    orden: 5,
    bloque: 2,
    bloqueNombre: 'Finanzas básicas',
    pregunta: '¿Cuánto vendes aproximadamente al mes?',
    placeholder: 'Ej: Entre 3 y 5 millones de pesos'
  },
  {
    orden: 6,
    bloque: 2,
    bloqueNombre: 'Finanzas básicas',
    pregunta: '¿Cuáles son tus 3 principales costos fijos?',
    placeholder: 'Ej: Arriendo, sueldos y proveedor de telas'
  },
  {
    orden: 7,
    bloque: 2,
    bloqueNombre: 'Finanzas básicas',
    pregunta: '¿Sabes cuál es tu margen de ganancia?',
    placeholder: 'Ej: Creo que anda por el 30% pero no estoy seguro'
  },
  {
    orden: 8,
    bloque: 2,
    bloqueNombre: 'Finanzas básicas',
    pregunta: '¿Tienes deudas o créditos activos?',
    placeholder: 'Ej: Sí, un crédito pyme de $2M que pago en cuotas'
  },
  // BLOQUE 3 — Clientes y mercado
  {
    orden: 9,
    bloque: 3,
    bloqueNombre: 'Clientes y mercado',
    pregunta: '¿Quién es tu cliente típico?',
    placeholder: 'Ej: Mujeres de 25-40 años que hacen deporte y compran por redes sociales'
  },
  {
    orden: 10,
    bloque: 3,
    bloqueNombre: 'Clientes y mercado',
    pregunta: '¿Cómo consigues clientes nuevos hoy?',
    placeholder: 'Ej: Instagram y boca a boca, a veces publicidad en Facebook'
  },
  {
    orden: 11,
    bloque: 3,
    bloqueNombre: 'Clientes y mercado',
    pregunta: '¿Tienes competidores directos? ¿Quiénes?',
    placeholder: 'Ej: Sí, hay 3 tiendas similares en mi zona'
  },
  // BLOQUE 4 — Metas y decisiones
  {
    orden: 12,
    bloque: 4,
    bloqueNombre: 'Metas y decisiones',
    pregunta: '¿Qué quieres lograr en los próximos 6 meses?',
    placeholder: 'Ej: Abrir un segundo punto de venta y duplicar las ventas online'
  },
  {
    orden: 13,
    bloque: 4,
    bloqueNombre: 'Metas y decisiones',
    pregunta: '¿Qué decisiones te quitan más el sueño?',
    placeholder: 'Ej: Si debo contratar más gente o si me alcanza la plata para otro local'
  },
  {
    orden: 14,
    bloque: 4,
    bloqueNombre: 'Metas y decisiones',
    pregunta: '¿Qué información necesitas ver cada semana?',
    placeholder: 'Ej: Ventas totales, gastos principales y cuánto me quedó de ganancia'
  }
]
