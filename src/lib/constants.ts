// Preguntas del onboarding organizadas por bloque
// Reducido a 3 preguntas esenciales para maximizar conversión

export interface PreguntaOnboarding {
  orden: number
  bloque: number
  bloqueNombre: string
  pregunta: string
  placeholder: string
  opcional?: boolean
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
  {
    orden: 4,
    bloque: 2,
    bloqueNombre: 'Tus datos',
    pregunta: '¿Tienes datos de ventas, costos o inventario que quieras compartir? (opcional)',
    placeholder: 'Pega aquí cualquier tabla, lista o números de tu negocio. Por ejemplo:\n\nVentas últimos 3 meses:\nEnero: $4.2M\nFebrero: $3.8M\nMarzo: $5.1M\n\nCostos fijos mensuales:\nArriendo: $800.000\nSueldos: $2.100.000\nProveedores: $1.400.000',
    opcional: true,
  },
]

// Trial duration removed — replaced by self-service demo flow
