import { GoogleGenerativeAI } from '@google/generative-ai'

// Instancia única de Gemini 2.0 Flash
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

// Modelo configurado para el agente ORBBI
export const modelo = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
  generationConfig: {
    temperature: 0.7,       // Balanceado: creativo pero consistente
    topP: 0.9,
    maxOutputTokens: 2048,  // Respuestas completas pero no excesivas
  }
})

// Tipo para el historial de Gemini
export interface GeminiMessage {
  role: 'user' | 'model'
  parts: { text: string }[]
}

// Enviar mensaje al agente con contexto e historial
export async function enviarMensajeGemini(
  systemPrompt: string,
  historial: GeminiMessage[],
  mensajeNuevo: string
): Promise<string> {
  const chat = modelo.startChat({
    history: [
      // System prompt como primer mensaje del "usuario" + respuesta del modelo
      {
        role: 'user',
        parts: [{ text: `INSTRUCCIONES DEL SISTEMA:\n${systemPrompt}\n\nResponde "Entendido" para confirmar.` }]
      },
      {
        role: 'model',
        parts: [{ text: 'Entendido. Estoy listo para asistirte como tu gerente de operaciones virtual.' }]
      },
      // Historial previo de la conversación
      ...historial
    ]
  })

  const resultado = await chat.sendMessage(mensajeNuevo)
  const respuesta = resultado.response.text()

  return respuesta
}
