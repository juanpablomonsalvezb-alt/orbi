// Tipos para el sistema de chat

export interface ChatMessage {
  id: string
  rol: 'user' | 'assistant'
  contenido: string
  created_at: string
}

// Request al endpoint /api/chat
export interface ChatRequest {
  mensaje: string
  conversacion_id: string
  empresa_id: string
}

// Response del endpoint /api/chat
export interface ChatResponse {
  mensaje: ChatMessage
  error?: string
}
