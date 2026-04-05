import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { GoogleGenerativeAI } from '@google/generative-ai'

interface GenerateRequestBody {
  topic: string
  categoria: string
  pais_target: string
  secret: string
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function estimateReadingTime(text: string): number {
  const wordsPerMinute = 200
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / wordsPerMinute))
}

export async function POST(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET

  let body: GenerateRequestBody
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  // Verify secret
  if (!cronSecret || body.secret !== cronSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { topic, categoria = 'gestion', pais_target = 'LATAM' } = body

  if (!topic) {
    return NextResponse.json({ error: 'topic is required' }, { status: 400 })
  }

  // Initialize Gemini
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    generationConfig: {
      temperature: 0.8,
      topP: 0.9,
      maxOutputTokens: 4096,
    },
  })

  const systemPrompt = `Eres un experto en gestión empresarial para PYMEs latinoamericanas. Escribe artículos de blog útiles, prácticos y bien estructurados en español. Formato markdown con H2 y H3. Sin bullets genéricos — párrafos sustanciales. Al final, CTA natural hacia Orbbi (plataforma de agentes de IA para PYMEs, orbbilatam.com).

Responde ÚNICAMENTE con JSON válido en este formato exacto (sin markdown code blocks):
{
  "titulo": "Título del artículo (SEO optimizado, 50-70 chars)",
  "descripcion": "Meta descripción SEO (máximo 155 caracteres, incluye keyword principal)",
  "contenido_md": "Contenido completo en markdown (800-1200 palabras, H2 y H3, párrafos sustanciales, CTA al final)",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}`

  const userPrompt = `Escribe un artículo de blog completo sobre: "${topic}"

País/región objetivo: ${pais_target}
Categoría: ${categoria}

El artículo debe:
- Ser entre 800 y 1200 palabras
- Usar H2 para secciones principales y H3 para subsecciones
- Estar escrito para dueños de PYMEs en Latinoamérica
- Ser práctico y accionable (no teórico)
- Terminar con un CTA natural que mencione cómo Orbbi puede ayudar con esto
- Incluir entre 5 y 8 keywords relevantes para SEO`

  let generatedContent: {
    titulo: string
    descripcion: string
    contenido_md: string
    keywords: string[]
  }

  try {
    const result = await model.generateContent(`${systemPrompt}\n\n${userPrompt}`)
    const rawText = result.response.text().trim()

    // Strip markdown code blocks if present
    const jsonText = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/, '')
      .trim()

    generatedContent = JSON.parse(jsonText)
  } catch (err) {
    console.error('Gemini generation error:', err)
    return NextResponse.json({ error: 'Failed to generate article content' }, { status: 500 })
  }

  const slug = slugify(generatedContent.titulo)
  const tiempo_lectura = estimateReadingTime(generatedContent.contenido_md)

  // Save to Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: articulo, error } = await supabase
    .from('blog_articulos')
    .insert({
      slug,
      titulo: generatedContent.titulo,
      descripcion: generatedContent.descripcion,
      contenido_md: generatedContent.contenido_md,
      contenido_html: '',
      categoria,
      pais_target,
      keywords: generatedContent.keywords,
      publicado: true,
      tiempo_lectura,
    })
    .select()
    .single()

  if (error) {
    console.error('Supabase insert error:', error)
    return NextResponse.json({ error: 'Failed to save article', details: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, articulo })
}
