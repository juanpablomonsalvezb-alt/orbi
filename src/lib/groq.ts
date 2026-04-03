// Groq client — primary LLM provider for ORBBI
// Uses Llama 3.3 70B — fast, high quality, good in Spanish

export interface GroqMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

// Fallback chain: Groq → OpenRouter (free models)
function getProvider(): { url: string; key: string; model: string } {
  // OpenRouter first (no daily limit), Groq as fallback
  if (process.env.OPENROUTER_API_KEY) {
    return { url: OPENROUTER_URL, key: process.env.OPENROUTER_API_KEY, model: 'qwen/qwen3.6-plus:free' }
  }
  if (process.env.GROQ_API_KEY) {
    return { url: GROQ_URL, key: process.env.GROQ_API_KEY, model: 'llama-3.3-70b-versatile' }
  }
  throw new Error('No LLM API key configured')
}

function getFallback(): { url: string; key: string; model: string } | null {
  if (process.env.GROQ_API_KEY) {
    return { url: GROQ_URL, key: process.env.GROQ_API_KEY, model: 'llama-3.3-70b-versatile' }
  }
  return null
}

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

  const providers = [getProvider(), getFallback()].filter(Boolean) as { url: string; key: string; model: string }[]

  for (const provider of providers) {
    try {
      const response = await fetch(provider.url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${provider.key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: provider.model,
          messages,
          temperature: 0.7,
          max_tokens: 400,
          stream: true,
          // Disable reasoning/thinking to get faster responses
          ...(provider.url.includes('openrouter') ? { reasoning: { effort: 'none' } } : {}),
        }),
      })

      if (response.ok) return response.body!
      console.log(`${provider.url} failed (${response.status}), trying next...`)
    } catch (err) {
      console.log(`${provider.url} error, trying next...`, err)
    }
  }

  throw new Error('All LLM providers failed')
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

  const providers = [getProvider(), getFallback()].filter(Boolean) as { url: string; key: string; model: string }[]

  for (const provider of providers) {
    try {
      const response = await fetch(provider.url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${provider.key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: provider.model,
          messages,
          temperature: 0.7,
          max_tokens: 400,
          stream: false,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        return data.choices[0].message.content
      }

      console.log(`${provider.url} failed (${response.status}), trying next...`)
    } catch (err) {
      console.log(`${provider.url} error, trying next...`, err)
    }
  }

  throw new Error('All LLM providers failed')
}
