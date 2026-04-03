// ============================================
// ORBBI — WhatsApp Business API Helper
// Envío de mensajes via Meta Cloud API
// ============================================

const WHATSAPP_API_URL = 'https://graph.facebook.com/v21.0'
const MAX_MESSAGE_LENGTH = 4096

/**
 * Envía un mensaje de texto por WhatsApp via Meta Cloud API.
 * Si el texto excede 4096 caracteres, lo divide en múltiples mensajes.
 */
export async function sendWhatsAppMessage(to: string, text: string): Promise<void> {
  const token = process.env.WHATSAPP_TOKEN
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID

  if (!token || !phoneNumberId) {
    throw new Error('Faltan variables de entorno WHATSAPP_TOKEN o WHATSAPP_PHONE_NUMBER_ID')
  }

  const chunks = splitMessage(text, MAX_MESSAGE_LENGTH)

  for (const chunk of chunks) {
    const response = await fetch(
      `${WHATSAPP_API_URL}/${phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to,
          type: 'text',
          text: { body: chunk },
        }),
      }
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Error enviando mensaje WhatsApp:', errorData)
      throw new Error(`WhatsApp API error: ${response.status}`)
    }
  }
}

/**
 * Divide un texto largo en fragmentos respetando el límite de caracteres.
 * Intenta cortar en saltos de línea o espacios para no romper palabras.
 */
function splitMessage(text: string, maxLength: number): string[] {
  if (text.length <= maxLength) return [text]

  const chunks: string[] = []
  let remaining = text

  while (remaining.length > 0) {
    if (remaining.length <= maxLength) {
      chunks.push(remaining)
      break
    }

    // Buscar el mejor punto de corte: primero salto de línea, luego espacio
    let cutIndex = remaining.lastIndexOf('\n', maxLength)
    if (cutIndex < maxLength * 0.5) {
      cutIndex = remaining.lastIndexOf(' ', maxLength)
    }
    if (cutIndex < maxLength * 0.5) {
      cutIndex = maxLength
    }

    chunks.push(remaining.slice(0, cutIndex))
    remaining = remaining.slice(cutIndex).trimStart()
  }

  return chunks
}
