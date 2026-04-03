// Groq client — primary LLM provider for ORBBI
// Uses Llama 3.3 70B — fast, high quality, good in Spanish

export interface GroqMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'

export async function streamGroq(
  systemPrompt: string,
  historial: GroqMessage[],
  mensajeNuevo: string
) {
  const messages: GroqMessage[] = [
    { role: 'system', content: systemPrompt },
    ...historial,
    { role: 'user', content: mensajeNuevo },
  ]

  const response = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages,
      temperature: 0.7,
      max_tokens: 2048,
      stream: true,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`Groq error ${response.status}: ${err}`)
  }

  return response.body!
}

export async function sendGroq(
  systemPrompt: string,
  historial: GroqMessage[],
  mensajeNuevo: string
): Promise<string> {
  const messages: GroqMessage[] = [
    { role: 'system', content: systemPrompt },
    ...historial,
    { role: 'user', content: mensajeNuevo },
  ]

  const response = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages,
      temperature: 0.7,
      max_tokens: 2048,
      stream: false,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`Groq error ${response.status}: ${err}`)
  }

  const data = await response.json()
  return data.choices[0].message.content
}
