// Preguntas del onboarding organizadas por bloque
// Reducido a 7 preguntas esenciales para maximizar conversión

export interface PreguntaOnboarding {
  orden: number
  bloque: number
  bloqueNombre: string
  pregunta: string
  placeholder: string
}

export const PREGUNTAS_ONBOARDING: PreguntaOnboarding[] = [
  // BLOQUE 1 — Tu negocio
  {
    orden: 1,
    bloque: 1,
    bloqueNombre: 'Tu negocio',
    pregunta: '¿A qué se dedica tu empresa y cuántos años lleva operando?',
    placeholder: 'Ej: Vendemos ropa deportiva por Instagram y en tienda física, llevamos 3 años'
  },
  {
    orden: 2,
    bloque: 1,
    bloqueNombre: 'Tu negocio',
    pregunta: '¿Cuántas personas trabajan contigo y cuál es tu mayor dolor hoy?',
    placeholder: 'Ej: Somos 5 personas. Mi mayor dolor es que no sé cuánto gano realmente al mes'
  },
  // BLOQUE 2 — Finanzas
  {
    orden: 3,
    bloque: 2,
    bloqueNombre: 'Finanzas',
    pregunta: '¿Cuánto vendes al mes aproximadamente y cuáles son tus costos principales?',
    placeholder: 'Ej: Vendo entre 3 y 5 millones. Mis costos principales son arriendo, sueldos y proveedor'
  },
  {
    orden: 4,
    bloque: 2,
    bloqueNombre: 'Finanzas',
    pregunta: '¿Sabes cuál es tu margen de ganancia? ¿Tienes deudas o créditos?',
    placeholder: 'Ej: Creo que anda por el 30%. Tengo un crédito PYME de $2M en cuotas'
  },
  // BLOQUE 3 — Clientes
  {
    orden: 5,
    bloque: 3,
    bloqueNombre: 'Clientes',
    pregunta: '¿Quién es tu cliente típico y cómo los consigues?',
    placeholder: 'Ej: Mujeres de 25-40 que hacen deporte. Los consigo por Instagram y boca a boca'
  },
  // BLOQUE 4 — Metas
  {
    orden: 6,
    bloque: 4,
    bloqueNombre: 'Metas',
    pregunta: '¿Qué quieres lograr en los próximos 6 meses?',
    placeholder: 'Ej: Abrir un segundo local y duplicar las ventas online'
  },
  {
    orden: 7,
    bloque: 4,
    bloqueNombre: 'Metas',
    pregunta: '¿Qué decisiones te quitan más el sueño?',
    placeholder: 'Ej: Si debo contratar más gente o si me alcanza para otro local'
  },
]

// Trial duration in hours
export const TRIAL_HOURS = 48
