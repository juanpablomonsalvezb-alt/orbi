import { GoogleGenerativeAI } from '@google/generative-ai'
import { GeminiMessage } from './gemini'

let _genAI: GoogleGenerativeAI | null = null

function getGenAI() {
  if (!_genAI) {
    _genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
  }
  return _genAI
}

export async function streamMensajeGemini(
  systemPrompt: string,
  historial: GeminiMessage[],
  mensajeNuevo: string
) {
  const modelo = getGenAI().getGenerativeModel({
    model: 'gemini-2.0-flash',
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      maxOutputTokens: 2048,
    }
  })

  const chat = modelo.startChat({
    history: [
      {
        role: 'user',
        parts: [{ text: `INSTRUCCIONES DEL SISTEMA:\n${systemPrompt}\n\nResponde "Entendido" para confirmar.` }]
      },
      {
        role: 'model',
        parts: [{ text: 'Entendido. Estoy listo para asistirte como tu gerente de operaciones virtual.' }]
      },
      ...historial
    ]
  })

  const result = await chat.sendMessageStream(mensajeNuevo)
  return result
}
