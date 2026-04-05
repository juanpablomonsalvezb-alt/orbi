import { TipoAgente } from '@/lib/prompts'

// Tipos que reflejan las tablas de Supabase

export interface Empresa {
  id: string
  user_id: string
  nombre: string
  email: string
  onboarding_completado: boolean
  plan: 'free' | 'solo' | 'equipo' | 'empresa'
  trial_ends_at: string | null
  stripe_customer_id: string | null       // Stores MercadoPago payment reference
  stripe_subscription_id: string | null   // Stores MercadoPago subscription reference
  subscription_status: string | null
  telefono: string | null
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
  agente_tipo: TipoAgente
  estilo: 'directo' | 'didactico' | 'estrategico'
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

export interface Tarea {
  id: string
  empresa_id: string
  agente_tipo: string
  titulo: string
  descripcion: string | null
  estado: 'pendiente' | 'en_progreso' | 'completada' | 'descartada'
  prioridad: 'alta' | 'media' | 'baja'
  fecha_limite: string | null
  fuente_conversacion_id: string | null
  created_at: string
  updated_at: string
}
