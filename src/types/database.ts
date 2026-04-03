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
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
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
