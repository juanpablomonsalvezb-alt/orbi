import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { TipoAgente } from '@/lib/prompts'
import { buildSystemPromptWithRAG } from '@/lib/prompts-server'
import { streamGroq, GroqMessage } from '@/lib/groq'
import { rateLimit } from '@/lib/rate-limit'
import { readGoogleSheet, parseSheetUrl } from '@/lib/google-sheets'
import { looksLikeBankStatement, parseBankStatement } from '@/lib/bank-parser'
import { scrapeCompetitor } from '@/lib/scraper'
import { getInstagramProfile, cleanInstagramUsername } from '@/lib/instagram'
import { verifyEmpresaAccess } from '@/lib/api-auth'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

/** Extract text content from a CSV buffer */
function extraerTextoCSV(buffer: ArrayBuffer): string {
  const decoder = new TextDecoder('utf-8')
  const text = decoder.decode(buffer)
  // Limit to first 5000 chars to avoid overwhelming the model
  return text.length > 5000 ? text.substring(0, 5000) + '\n... (contenido truncado)' : text
}

/** Try to extract readable text from an Excel file (basic approach: read shared strings XML) */
function extraerTextoExcel(buffer: ArrayBuffer): string {
  // For xlsx files, we do a simple text extraction from the binary
  // A full parser would need a library, but we can extract visible ASCII/UTF-8 strings
  const decoder = new TextDecoder('utf-8', { fatal: false })
  const raw = decoder.decode(buffer)

  // xlsx is actually a zip file with XML inside; extract text between XML tags
  const textMatches: string[] = []
  const regex = /<t[^>]*>([^<]+)<\/t>/g
  let match
  while ((match = regex.exec(raw)) !== null) {
    textMatches.push(match[1])
  }

  if (textMatches.length > 0) {
    const text = textMatches.join(' | ')
    return text.length > 5000 ? text.substring(0, 5000) + '\n... (contenido truncado)' : text
  }

  return '(No se pudo extraer texto del archivo Excel. El usuario adjuntó una hoja de cálculo.)'
}

/** Try to extract text from a PDF (basic approach) */
function extraerTextoPDF(buffer: ArrayBuffer): string {
  const decoder = new TextDecoder('latin1', { fatal: false })
  const raw = decoder.decode(buffer)

  // Very basic PDF text extraction: find text between BT and ET operators
  const textChunks: string[] = []
  const regex = /\(([^)]{1,500})\)/g
  let match
  while ((match = regex.exec(raw)) !== null) {
    const text = match[1].replace(/\\[nrt]/g, ' ').trim()
    if (text.length > 2 && /[a-zA-ZáéíóúñÁÉÍÓÚÑ]/.test(text)) {
      textChunks.push(text)
    }
  }

  if (textChunks.length > 0) {
    const text = textChunks.join(' ')
    return text.length > 5000 ? text.substring(0, 5000) + '\n... (contenido truncado)' : text
  }

  return '(No se pudo extraer texto del PDF. El usuario adjuntó un documento PDF.)'
}

/** Try to extract text from a Word doc/docx */
function extraerTextoWord(buffer: ArrayBuffer): string {
  const decoder = new TextDecoder('utf-8', { fatal: false })
  const raw = decoder.decode(buffer)

  // docx is zip with XML; extract text from <w:t> tags
  const textMatches: string[] = []
  const regex = /<w:t[^>]*>([^<]+)<\/w:t>/g
  let match
  while ((match = regex.exec(raw)) !== null) {
    textMatches.push(match[1])
  }

  if (textMatches.length > 0) {
    const text = textMatches.join(' ')
    return text.length > 5000 ? text.substring(0, 5000) + '\n... (contenido truncado)' : text
  }

  return '(No se pudo extraer texto del documento Word. El usuario adjuntó un archivo .doc/.docx.)'
}

export async function POST(request: NextRequest) {
  try {
    const { mensaje, conversacion_id, empresa_id, archivo_id } = await request.json()

    if (!mensaje || !conversacion_id || !empresa_id) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: mensaje, conversacion_id, empresa_id' },
        { status: 400 }
      )
    }

    // Verify the authenticated user owns this empresa
    const hasAccess = await verifyEmpresaAccess(request, empresa_id)
    if (!hasAccess) {
      return NextResponse.json({ error: 'Tu sesión expiró. Recarga la página.' }, { status: 401 })
    }

    // Rate limit: 20 messages per minute per empresa
    const { allowed } = rateLimit(`chat:${empresa_id}`, 20, 60000)
    const { allowed: dailyAllowed } = rateLimit(`daily:${empresa_id}`, 100, 86400000)
    if (!allowed || !dailyAllowed) {
      return NextResponse.json(
        { error: 'Estás enviando mensajes muy rápido. Espera unos segundos.' },
        { status: 429 }
      )
    }

    // Input validation
    if (typeof mensaje !== 'string' || mensaje.length > 5000) {
      return NextResponse.json(
        { error: 'Mensaje inválido (máximo 5000 caracteres)' },
        { status: 400 }
      )
    }

    const supabase = getSupabase()

    // 1. Obtener datos de la empresa + verificar plan/trial
    const { data: empresa, error: errorEmpresa } = await supabase
      .from('empresas')
      .select('nombre, plan, trial_ends_at, subscription_status')
      .eq('id', empresa_id)
      .single()

    if (errorEmpresa || !empresa) {
      return NextResponse.json({ error: 'No encontramos tu empresa. Intenta cerrar sesión y volver a entrar.' }, { status: 404 })
    }

    // Check trial/plan
    const hasActivePlan = empresa.plan !== 'free' && empresa.subscription_status === 'active'
    const trialEndsAt = empresa.trial_ends_at ? new Date(empresa.trial_ends_at) : null
    if (!hasActivePlan && trialEndsAt && new Date() > trialEndsAt) {
      return NextResponse.json({ error: 'Tu prueba gratuita ha expirado. Elige un plan para continuar.' }, { status: 403 })
    }

    // 2. Obtener tipo de agente de la conversación
    const { data: conversacion } = await supabase
      .from('conversaciones')
      .select('agente_tipo, estilo')
      .eq('id', conversacion_id)
      .single()

    const agenteTipo = (conversacion?.agente_tipo || 'general') as TipoAgente
    const estilo = (conversacion?.estilo || 'directo') as import('@/lib/prompts').EstiloComunicacion

    // 3. Check agent access based on plan
    const agentesPermitidos = getAgentesPermitidos(empresa.plan)
    if (!agentesPermitidos.includes(agenteTipo)) {
      return NextResponse.json(
        { error: `Tu plan no incluye el agente ${agenteTipo}. Actualiza tu plan para acceder.` },
        { status: 403 }
      )
    }

    // 4. Obtener contexto del onboarding
    const { data: contexto } = await supabase
      .from('contexto')
      .select('*')
      .eq('empresa_id', empresa_id)
      .order('orden', { ascending: true })

    // 5. Obtener historial (últimos 10 mensajes)
    const { data: historialDB } = await supabase
      .from('mensajes')
      .select('rol, contenido')
      .eq('conversacion_id', conversacion_id)
      .order('created_at', { ascending: true })
      .limit(10)

    const historial: GroqMessage[] = (historialDB || []).map((msg) => ({
      role: msg.rol === 'user' ? 'user' as const : 'assistant' as const,
      content: msg.contenido
    }))

    // 6. Construir system prompt with RAG (knowledge base loaded from pre-built JSON)
    const historialTexto = (historialDB || []).map(m => m.contenido).join(' ').slice(-1000)
    let systemPrompt = await buildSystemPromptWithRAG(empresa.nombre, contexto || [], agenteTipo, mensaje, historialTexto, estilo, empresa_id)

    // 6.1. Append real-time data (exchange rates, holidays, weather, macro indicators)
    try {
      const { getRealTimeContext, detectCountry } = await import('@/lib/real-time-data')
      const country = detectCountry(contexto || [])
      const realTimeData = await getRealTimeContext(country)
      systemPrompt += realTimeData
    } catch (err) {
      console.log('Real-time data skipped:', err)
    }

    // 6.5. Detect Google Sheets URL in message and auto-read
    let mensajeConArchivo = mensaje

    // 6.2. Detect price queries ("cuánto cuesta", "precio de", "cuánto vale")
    try {
      const priceMatch = mensaje.match(/cu[aá]nto\s+cuesta|precio\s+de|cu[aá]nto\s+vale|precios?\s+del?/i)
      if (priceMatch) {
        const { searchProductPrices, detectCountry } = await import('@/lib/real-time-data')
        const country = detectCountry(contexto || [])
        const product = mensaje.replace(/.*(?:cu[aá]nto\s+cuesta|precio\s+de|cu[aá]nto\s+vale|precios?\s+del?)\s*/i, '').replace(/\?.*$/, '').trim()
        if (product && product.length > 1) {
          const prices = await searchProductPrices(product, country)
          if (prices) {
            mensajeConArchivo += '\n\n' + prices
            console.log('Price search added for:', product)
          }
        }
      }
    } catch (err) {
      console.log('Price search skipped:', err)
    }

    // 6.3. Detect course/training queries ("curso de", "capacitacion en", "aprender")
    try {
      const courseMatch = mensaje.match(/curso\s+de|capacitaci[oó]n\s+en|quiero\s+aprender|cursos?\s+sobre|formaci[oó]n\s+en/i)
      if (courseMatch) {
        const { getBusinessCourses } = await import('@/lib/real-time-data')
        const topic = mensaje.replace(/.*(?:curso\s+de|capacitaci[oó]n\s+en|quiero\s+aprender|cursos?\s+sobre|formaci[oó]n\s+en)\s*/i, '').replace(/\?.*$/, '').trim()
        if (topic && topic.length > 1) {
          const courses = await getBusinessCourses(topic)
          if (courses) {
            mensajeConArchivo += '\n\n' + courses
            console.log('Course search added for:', topic)
          }
        }
      }
    } catch (err) {
      console.log('Course search skipped:', err)
    }

    // 6.4. Detect business search queries for Mexico DENUE ("buscar negocio", "negocios de", "directorio")
    try {
      const denueMatch = mensaje.match(/buscar\s+negocio|negocios?\s+de|directorio\s+de|empresas?\s+de|establecimientos?\s+de/i)
      if (denueMatch) {
        const { searchDENUE, detectCountry } = await import('@/lib/real-time-data')
        const country = detectCountry(contexto || [])
        if (country === 'mexico') {
          const query = mensaje.replace(/.*(?:buscar\s+negocio|negocios?\s+de|directorio\s+de|empresas?\s+de|establecimientos?\s+de)\s*/i, '').replace(/\?.*$/, '').trim()
          if (query && query.length > 1) {
            const results = await searchDENUE(query, '00')
            if (results) {
              mensajeConArchivo += '\n\n' + results
              console.log('DENUE search added for:', query)
            }
          }
        }
      }
    } catch (err) {
      console.log('DENUE search skipped:', err)
    }

    const sheetsMatch = mensaje.match(/https:\/\/docs\.google\.com\/spreadsheets\/d\/[a-zA-Z0-9_-]+[^\s]*/g)
    if (sheetsMatch && sheetsMatch[0]) {
      try {
        const sheetData = await readGoogleSheet(sheetsMatch[0])
        mensajeConArchivo = `${mensaje}\n\n[DATOS DE GOOGLE SHEETS - LEÍDOS EN TIEMPO REAL]\n${sheetData}`
        console.log('Google Sheet read successfully:', sheetData.length, 'chars')
      } catch (err) {
        console.error('Error reading Google Sheet:', err)
        mensajeConArchivo = `${mensaje}\n\n(El usuario compartió un link de Google Sheets pero no se pudo leer. Posiblemente no tiene permisos públicos. Pídele que cambie los permisos a "Cualquier persona con el enlace puede ver".)`
      }
    }

    // 6.6. Detect Instagram URLs or @username mentions
    const instagramUrlMatch = mensaje.match(/https?:\/\/(?:www\.)?instagram\.com\/([a-zA-Z0-9_.]+)/i)
    const instagramAtMatch = !instagramUrlMatch ? mensaje.match(/(?:mi\s+instagram\s+es|mi\s+ig\s+es|instagram[:\s]+|ig[:\s]+)\s*@([a-zA-Z0-9_.]+)/i) : null
    const instagramUser = instagramUrlMatch?.[1] || instagramAtMatch?.[1]

    if (instagramUser && !sheetsMatch) {
      try {
        const igData = await getInstagramProfile(instagramUser)
        mensajeConArchivo = `${mensajeConArchivo}\n\n[DATOS DE INSTAGRAM - LEÍDOS EN TIEMPO REAL]\n${igData}`
        console.log('Instagram profile read:', instagramUser)
      } catch (err) {
        console.error('Error reading Instagram profile:', err)
      }
    }

    // 6.7. Detect competitor URLs (any URL that is NOT Google Sheets and NOT Instagram)
    const urlMatch = mensaje.match(/https?:\/\/[^\s]+/g)
    if (urlMatch && !sheetsMatch && !instagramUrlMatch) {
      // Filter out known non-scrapeable URLs
      const scrapableUrl = urlMatch.find(u =>
        !u.includes('docs.google.com') &&
        !u.includes('instagram.com') &&
        !u.includes('facebook.com/messages') &&
        !u.includes('wa.me')
      )
      if (scrapableUrl) {
        try {
          const scrapedData = await scrapeCompetitor(scrapableUrl)
          mensajeConArchivo = `${mensajeConArchivo}\n\n[DATOS DE SITIO WEB - LEÍDOS EN TIEMPO REAL]\n${scrapedData}`
          console.log('URL scraped successfully:', scrapableUrl)
        } catch (err) {
          console.error('Error scraping URL:', err)
          // No agregar nada al mensaje si falla — el scraping es best-effort
        }

        // Si es agente de marketing, tambien analizar rendimiento del sitio con PageSpeed
        if (agenteTipo === 'marketing') {
          try {
            const { analyzeWebsite } = await import('@/lib/real-time-data')
            const analysis = await analyzeWebsite(scrapableUrl)
            if (analysis) {
              mensajeConArchivo += '\n\n' + analysis
              console.log('PageSpeed analysis added for:', scrapableUrl)
            }
          } catch {
            // PageSpeed es best-effort — no bloquear el chat
          }
        }
      }
    }

    // 7. Process file attachment if present
    let imagePart: { inlineData: { data: string; mimeType: string } } | null = null

    if (archivo_id) {
      try {
        // Fetch file metadata
        const { data: archivo, error: archivoError } = await supabase
          .from('archivos')
          .select('*')
          .eq('id', archivo_id)
          .single()

        if (!archivoError && archivo) {
          // Download file from storage
          const { data: fileData, error: downloadError } = await supabase.storage
            .from('archivos')
            .download(archivo.storage_path)

          if (!downloadError && fileData) {
            const buffer = await fileData.arrayBuffer()

            if (archivo.tipo === 'imagen') {
              // For images: prepare inline data for Gemini multimodal
              const base64 = Buffer.from(buffer).toString('base64')
              const ext = archivo.nombre.split('.').pop()?.toLowerCase() || 'png'
              const mimeType = ext === 'png' ? 'image/png' : 'image/jpeg'
              imagePart = {
                inlineData: {
                  data: base64,
                  mimeType,
                }
              }
              mensajeConArchivo = `${mensaje}\n\n[El usuario adjuntó una imagen: ${archivo.nombre}. Analízala y responde en contexto.]`
            } else if (archivo.tipo === 'hoja_calculo') {
              const ext = archivo.nombre.split('.').pop()?.toLowerCase() || ''
              if (ext === 'csv') {
                const csvText = extraerTextoCSV(buffer)
                // Check if it looks like a bank statement — use specialized parser
                if (looksLikeBankStatement(csvText)) {
                  // Re-decode full text (up to 50k chars) for complete analysis
                  const fullCsvText = new TextDecoder('utf-8').decode(buffer)
                  const bankCsv = fullCsvText.length > 50000 ? fullCsvText.substring(0, 50000) : fullCsvText
                  const bankAnalysis = parseBankStatement(bankCsv)
                  mensajeConArchivo = `${mensaje}\n\n[CARTOLA BANCARIA DETECTADA - ${archivo.nombre}]\n${bankAnalysis}`
                } else {
                  mensajeConArchivo = `${mensaje}\n\nEl usuario adjuntó un archivo: ${archivo.nombre}.\nContenido extraído:\n${csvText}`
                }
              } else {
                const textoExtraido = extraerTextoExcel(buffer)
                mensajeConArchivo = `${mensaje}\n\nEl usuario adjuntó un archivo: ${archivo.nombre}.\nContenido extraído:\n${textoExtraido}`
              }
            } else if (archivo.tipo === 'pdf') {
              const textoExtraido = extraerTextoPDF(buffer)
              mensajeConArchivo = `${mensaje}\n\nEl usuario adjuntó un archivo PDF: ${archivo.nombre}.\nContenido extraído:\n${textoExtraido}`
            } else if (archivo.tipo === 'documento') {
              const textoExtraido = extraerTextoWord(buffer)
              mensajeConArchivo = `${mensaje}\n\nEl usuario adjuntó un documento Word: ${archivo.nombre}.\nContenido extraído:\n${textoExtraido}`
            } else {
              mensajeConArchivo = `${mensaje}\n\nEl usuario adjuntó un archivo: ${archivo.nombre} (tipo: ${archivo.tipo}).`
            }
          }
        }
      } catch (fileError) {
        console.error('Error procesando archivo adjunto:', fileError)
        // Continue without file context rather than failing the whole request
        mensajeConArchivo = `${mensaje}\n\n(El usuario intentó adjuntar un archivo pero no se pudo procesar.)`
      }
    }

    // 8. Stream response from Groq (primary)
    const groqStream = await streamGroq(systemPrompt, historial, mensajeConArchivo)

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

          // Save complete response to DB
          const { data: mensajeGuardado } = await supabase
            .from('mensajes')
            .insert({
              conversacion_id,
              rol: 'assistant',
              contenido: fullResponse
            })
            .select()
            .single()

          // Update conversation timestamp
          await supabase
            .from('conversaciones')
            .update({ updated_at: new Date().toISOString() })
            .eq('id', conversacion_id)

          // Fire-and-forget: extract memories from the assistant response
          try {
            const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ? request.url.split('/api/')[0] : ''
            const authToken = request.headers.get('authorization') || ''
            fetch(`${baseUrl}/api/memory`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken,
              },
              body: JSON.stringify({
                message: fullResponse,
                userMessage: mensaje,
                empresa_id,
                agente_tipo: agenteTipo,
                conversacion_id,
              }),
            }).catch((err) => console.error('Memory extraction failed:', err))
          } catch (memErr) {
            console.error('Memory extraction error:', memErr)
          }

          // Send final message with saved ID
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true, mensaje: mensajeGuardado })}\n\n`))
          controller.close()
        } catch (error) {
          console.error('Stream error:', error)
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'Nuestros servidores están ocupados. Intenta en unos segundos.' })}\n\n`))
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
    console.error('Error en /api/chat:', errMsg, error)
    return NextResponse.json({ error: 'Nuestros servidores están ocupados. Intenta en unos segundos.', debug: process.env.NODE_ENV === 'development' ? errMsg : undefined }, { status: 500 })
  }
}

function getAgentesPermitidos(plan: string): TipoAgente[] {
  // During trial, all agents are available
  switch (plan) {
    case 'empresa': return ['general', 'financiero', 'ventas', 'marketing', 'rrhh', 'inventario', 'legal']
    case 'equipo': return ['general', 'financiero', 'ventas', 'marketing', 'rrhh', 'inventario', 'legal'] // They pick 3 but we allow all during setup
    case 'solo': return ['general']
    case 'free': return ['general', 'financiero', 'ventas', 'marketing', 'rrhh', 'inventario', 'legal'] // Trial gets all
    default: return ['general']
  }
}

// Helper: stream Gemini with an image part (multimodal)
async function streamMensajeGeminiConImagen(
  systemPrompt: string,
  historial: { role: string; parts: { text: string }[] }[],
  mensaje: string,
  imagePart: { inlineData: { data: string; mimeType: string } }
) {
  // Dynamic import to avoid circular dependency issues
  const { GoogleGenerativeAI } = await import('@google/generative-ai')
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
  const modelo = genAI.getGenerativeModel({
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

  const result = await chat.sendMessageStream([
    { text: mensaje },
    imagePart,
  ])

  return result
}
