// Tipos para el sistema de chat

export interface ChatMessage {
  id: string
  rol: 'user' | 'assistant'
  contenido: string
  created_at: string
}

// Info de archivo adjunto
export interface ArchivoAdjuntoInfo {
  id: string
  nombre: string
  tipo: string
}

// Request al endpoint /api/chat
export interface ChatRequest {
  mensaje: string
  conversacion_id: string
  empresa_id: string
  archivo_id?: string
}

// Response del endpoint /api/chat
export interface ChatResponse {
  mensaje: ChatMessage
  error?: string
}
