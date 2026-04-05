import { NextRequest } from 'next/server'
import { streamGroq, GroqMessage } from '@/lib/groq'
import { rateLimit } from '@/lib/rate-limit'

const DEMO_SYSTEM_PROMPT = `Eres el GERENTE GENERAL virtual de Orbbi. Estás haciendo una DEMO GRATUITA para un posible cliente.

FLUJO OBLIGATORIO:
1. Primero pregunta: "¿A qué se dedica tu empresa y cuántas personas son?"
2. Después: "¿Cuánto vendes al mes y cuáles son tus costos principales?"
3. Último: "¿Qué decisión o problema te quita más el sueño?"
4. Con las 3 respuestas, da un DIAGNÓSTICO EXPRESS:
   - Semáforo: 🟢 Bien / 🟡 Atención / 🔴 Urgente para 3 áreas (Finanzas, Clientes, Operaciones)
   - 2 recomendaciones concretas con números
   - 1 alerta si detectas un riesgo
   - Presenta la información en una tabla simple con markdown
5. Después del diagnóstico, termina con: "Esto es solo una muestra de lo que tu equipo de 7 gerentes puede hacer 24/7. ¿Quieres activar tu cuenta?"

Y ofrece estas opciones (cada una en su propia línea, con el formato exacto):
>>>Crear mi cuenta ahora
>>>Quiero ver más antes de decidir
>>>Hablar con el agente financiero

REGLAS:
- Máximo 4-6 líneas por respuesta (excepto el diagnóstico, que puede ser más largo)
- Usa datos del negocio que te dieron (no genérico)
- Si mencionan un país, usa datos reales de ese país
- Después del diagnóstico, si siguen preguntando, responde 2-3 veces más y luego: "Para seguir conversando con acceso completo, crea tu cuenta gratuita en orbbi.com/registro"
- Si eligen "Crear mi cuenta ahora", responde: "¡Excelente decisión! Te llevo a crear tu cuenta ahora mismo." y nada más.
- Si eligen "Hablar con el agente financiero", responde: "Para hablar con los 7 agentes especializados, necesitas crear tu cuenta gratuita. Es rápido y sin compromiso." y ofrece: >>>Crear mi cuenta ahora
- Si eligen "Quiero ver más", continúa la conversación con información útil sobre su negocio, pero después de 2-3 mensajes más, cierra con el recordatorio de crear cuenta.
- NUNCA repitas una pregunta que ya fue respondida.
- Sé conversacional, cercano, profesional. Tutea al usuario.
- Usa formato markdown para tablas y negritas en el diagnóstico.`

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  const real = request.headers.get('x-real-ip')
  if (real) return real
  return '127.0.0.1'
}

export async function POST(request: NextRequest) {
  try {
    const { messages, messageCount } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Formato de mensaje inválido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Rate limiting by IP: 3 demos per hour, max 10 messages per demo
    const ip = getClientIP(request)
    const { allowed: demoAllowed } = rateLimit(`demo-session:${ip}`, 3, 3600000)
    if (!demoAllowed && messageCount <= 1) {
      return new Response(JSON.stringify({ error: 'Has alcanzado el límite de demos por hora. Intenta en un rato o crea tu cuenta para acceso ilimitado.' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Max 10 messages per demo session
    if (messageCount > 10) {
      return new Response(JSON.stringify({ error: 'Has alcanzado el límite de mensajes de la demo. Crea tu cuenta para continuar sin límites.' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Per-message rate limit: 10 messages per minute per IP
    const { allowed: msgAllowed } = rateLimit(`demo-msg:${ip}`, 10, 60000)
    if (!msgAllowed) {
      return new Response(JSON.stringify({ error: 'Estás enviando mensajes muy rápido. Espera unos segundos.' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Input validation
    const lastMessage = messages[messages.length - 1]
    if (!lastMessage || typeof lastMessage.content !== 'string' || lastMessage.content.length > 2000) {
      return new Response(JSON.stringify({ error: 'Mensaje inválido (máximo 2000 caracteres)' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Build history for LLM (only last 10 messages)
    const historial: GroqMessage[] = messages.slice(-10).map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' as const : 'assistant' as const,
      content: m.content,
    }))

    // Remove the last user message from history (it goes as mensajeNuevo)
    const lastUserMsg = historial.pop()

    // Stream response
    const groqStream = await streamGroq(DEMO_SYSTEM_PROMPT, historial, lastUserMsg?.content || '')

    let fullResponse = ''
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          const reader = groqStream.getReader()
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value, { stream: true })
            const lines = chunk.split('\n')
            for (const line of lines) {
              if (line.startsWith('data: ') && line !== 'data: [DONE]') {
                try {
                  const data = JSON.parse(line.slice(6))
                  const delta = data.choices?.[0]?.delta
                  const text = delta?.content || ''
                  if (text) {
                    fullResponse += text
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`))
                  }
                } catch { /* skip malformed chunks */ }
              }
            }
          }

          // Send done signal (no DB save — ephemeral)
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`))
          controller.close()
        } catch (error) {
          console.error('Demo stream error:', error)
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'Error al generar respuesta. Intenta de nuevo.' })}\n\n`))
          controller.close()
        }
      }
    })

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error)
    console.error('Error en /api/demo:', errMsg)
    return new Response(JSON.stringify({ error: 'Error al procesar la solicitud. Intenta de nuevo.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
