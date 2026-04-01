// Tipos que reflejan las tablas de Supabase

export interface Empresa {
  id: string
  user_id: string
  nombre: string
  email: string
  onboarding_completado: boolean
  created_at: string
  updated_at: string
}

export interface Contexto {
  id: string
  empresa_id: string
  pregunta: string
  respuesta: string
  bloque: number
  orden: number
  created_at: string
  updated_at: string
}

export interface Conversacion {
  id: string
  empresa_id: string
  titulo: string
  created_at: string
  updated_at: string
}

export interface Mensaje {
  id: string
  conversacion_id: string
  rol: 'user' | 'assistant'
  contenido: string
  created_at: string
}
