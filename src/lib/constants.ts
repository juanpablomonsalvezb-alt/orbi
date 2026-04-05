// Preguntas del onboarding organizadas por bloque
// Reducido a 3 preguntas esenciales para maximizar conversión

export interface PreguntaOnboarding {
  orden: number
  bloque: number
  bloqueNombre: string
  pregunta: string
  placeholder: string
}

export const PREGUNTAS_ONBOARDING: PreguntaOnboarding[] = [
  {
    orden: 1,
    bloque: 1,
    bloqueNombre: 'Tu negocio',
    pregunta: '¿A qué se dedica tu empresa, cuántos años lleva y cuántas personas son?',
    placeholder: 'Ej: Vendemos ropa deportiva por Instagram y tienda física, 3 años, somos 5 personas'
  },
  {
    orden: 2,
    bloque: 1,
    bloqueNombre: 'Tu negocio',
    pregunta: '¿Cuánto vendes al mes y cuáles son tus costos principales?',
    placeholder: 'Ej: Vendo entre 3 y 5 millones. Costos: arriendo, sueldos y proveedor de telas'
  },
  {
    orden: 3,
    bloque: 1,
    bloqueNombre: 'Tu negocio',
    pregunta: '¿Qué decisión o problema te quita más el sueño hoy?',
    placeholder: 'Ej: No sé si debo contratar más gente o si me alcanza la plata para otro local'
  },
]

// Trial duration removed — replaced by self-service demo flow
