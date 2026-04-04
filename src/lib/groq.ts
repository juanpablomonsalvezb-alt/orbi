// LLM provider chain for ORBBI
// Priority: Groq (fastest) → Gemini (best Spanish) → OpenRouter (never fails)

export interface GroqMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent'

interface Provider {
  name: string
  url: string
  key: string
  model: string
  type: 'openai' | 'gemini'
}

function getProviderChain(): Provider[] {
  const chain: Provider[] = []

  // 1. Groq — fastest (0.5s), good quality
  if (process.env.GROQ_API_KEY) {
    chain.push({
      name: 'Groq',
      url: GROQ_URL,
      key: process.env.GROQ_API_KEY,
      model: 'llama-3.3-70b-versatile',
      type: 'openai',
    })
  }

  // 2. Gemini Flash — best Spanish, multimodal, free 1500 req/day per key
  // Rotate through multiple keys to multiply quota (4 keys = 6000 req/day)
  const geminiKeys = [
    process.env.GEMINI_API_KEY,
    process.env.GEMINI_API_KEY_2,
    process.env.GEMINI_API_KEY_3,
    process.env.GEMINI_API_KEY_4,
  ].filter(Boolean) as string[]

  if (geminiKeys.length > 0) {
    // Round-robin: pick key based on current minute
    const keyIndex = Math.floor(Date.now() / 60000) % geminiKeys.length
    chain.push({
      name: `Gemini-${keyIndex + 1}`,
      url: GEMINI_URL,
      key: geminiKeys[keyIndex],
      model: 'gemini-2.0-flash',
      type: 'gemini',
    })
    // Add a second Gemini key as backup (next in rotation)
    const backupIndex = (keyIndex + 1) % geminiKeys.length
    if (geminiKeys.length > 1) {
      chain.push({
        name: `Gemini-${backupIndex + 1}`,
        url: GEMINI_URL,
        key: geminiKeys[backupIndex],
        model: 'gemini-2.0-flash',
        type: 'gemini',
      })
    }
  }

  // 3. OpenRouter — no daily limit, reliable fallback
  if (process.env.OPENROUTER_API_KEY) {
    chain.push({
      name: 'OpenRouter',
      url: OPENROUTER_URL,
      key: process.env.OPENROUTER_API_KEY,
      model: 'qwen/qwen3.6-plus:free',
      type: 'openai',
    })
  }

  if (chain.length === 0) throw new Error('No LLM API key configured')
  return chain
}

// ============================================
// STREAMING (for chat)
// ============================================

async function streamOpenAI(provider: Provider, messages: GroqMessage[]): Promise<ReadableStream<Uint8Array>> {
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
      max_tokens: 700,
      stream: true,
      ...(provider.url.includes('openrouter') ? { reasoning: { effort: 'none' } } : {}),
    }),
  })

  if (!response.ok) throw new Error(`${provider.name} ${response.status}`)
  return response.body!
}

async function streamGemini(provider: Provider, messages: GroqMessage[]): Promise<ReadableStream<Uint8Array>> {
  // Convert OpenAI format to Gemini format
  const systemPrompt = messages.find(m => m.role === 'system')?.content || ''
  const history = messages.filter(m => m.role !== 'system')

  const geminiContents = [
    { role: 'user', parts: [{ text: `INSTRUCCIONES:\n${systemPrompt}\n\nResponde "Entendido".` }] },
    { role: 'model', parts: [{ text: 'Entendido.' }] },
    ...history.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    })),
  ]

  const response = await fetch(`${provider.url}?alt=sse&key=${provider.key}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: geminiContents,
      generationConfig: { temperature: 0.7, maxOutputTokens: 400 },
    }),
  })

  if (!response.ok) throw new Error(`Gemini ${response.status}`)

  // Transform Gemini SSE to OpenAI-compatible SSE
  const reader = response.body!.getReader()
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()

  return new ReadableStream({
    async pull(controller) {
      const { done, value } = await reader.read()
      if (done) { controller.close(); return }

      const chunk = decoder.decode(value, { stream: true })
      for (const line of chunk.split('\n')) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6))
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
            if (text) {
              // Re-encode as OpenAI-compatible SSE
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ choices: [{ delta: { content: text } }] })}\n\n`))
            }
          } catch { /* skip */ }
        }
      }
    }
  })
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

  const chain = getProviderChain()

  for (const provider of chain) {
    try {
      console.log(`Trying ${provider.name}...`)
      const stream = provider.type === 'gemini'
        ? await streamGemini(provider, messages)
        : await streamOpenAI(provider, messages)
      console.log(`${provider.name} OK`)
      return stream
    } catch (err) {
      console.log(`${provider.name} failed: ${err instanceof Error ? err.message : err}`)
    }
  }

  throw new Error('All LLM providers failed')
}

// ============================================
// NON-STREAMING (for memory extraction, etc.)
// ============================================

async function sendOpenAI(provider: Provider, messages: GroqMessage[]): Promise<string> {
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
      max_tokens: 700,
      stream: false,
      ...(provider.url.includes('openrouter') ? { reasoning: { effort: 'none' } } : {}),
    }),
  })

  if (!response.ok) throw new Error(`${provider.name} ${response.status}`)
  const data = await response.json()
  return data.choices[0].message.content
}

async function sendGemini(provider: Provider, messages: GroqMessage[]): Promise<string> {
  const systemPrompt = messages.find(m => m.role === 'system')?.content || ''
  const history = messages.filter(m => m.role !== 'system')

  const geminiContents = [
    { role: 'user', parts: [{ text: `INSTRUCCIONES:\n${systemPrompt}\n\nResponde "Entendido".` }] },
    { role: 'model', parts: [{ text: 'Entendido.' }] },
    ...history.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    })),
  ]

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${provider.key}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: geminiContents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 400 },
      }),
    }
  )

  if (!response.ok) throw new Error(`Gemini ${response.status}`)
  const data = await response.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text || ''
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

  const chain = getProviderChain()

  for (const provider of chain) {
    try {
      const result = provider.type === 'gemini'
        ? await sendGemini(provider, messages)
        : await sendOpenAI(provider, messages)
      return result
    } catch (err) {
      console.log(`${provider.name} send failed: ${err instanceof Error ? err.message : err}`)
    }
  }

  throw new Error('All LLM providers failed')
}
