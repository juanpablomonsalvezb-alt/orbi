import { NextRequest, NextResponse } from 'next/server'

const TOPICS = [
  { topic: 'flujo de caja para pymes', categoria: 'finanzas' },
  { topic: 'como aumentar ventas pequeña empresa', categoria: 'ventas' },
  { topic: 'gestión de inventario pyme latam', categoria: 'gestion' },
  { topic: 'como contratar primer empleado', categoria: 'rrhh' },
  { topic: 'marketing digital sin presupuesto pyme', categoria: 'marketing' },
  { topic: 'errores financieros pymes latinoamerica', categoria: 'finanzas' },
  { topic: 'como preparar empresa para auditoria', categoria: 'gestion' },
  { topic: 'gestión de cobranzas pyme', categoria: 'finanzas' },
  { topic: 'reducir costos operacionales empresa', categoria: 'gestion' },
  { topic: 'plan de negocios pyme 2026', categoria: 'gestion' },
  { topic: 'como fidelizar clientes pequeña empresa', categoria: 'ventas' },
  { topic: 'indicadores kpi para pymes', categoria: 'gestion' },
  { topic: 'como digitalizar mi empresa pyme', categoria: 'tecnologia' },
  { topic: 'gestion de personal pequena empresa', categoria: 'rrhh' },
  { topic: 'precio justo para mis productos o servicios', categoria: 'ventas' },
  { topic: 'expansion a otro pais pyme latam', categoria: 'gestion' },
  { topic: 'financiamiento para pymes latinoamerica', categoria: 'finanzas' },
  { topic: 'como hacer presupuesto anual pyme', categoria: 'finanzas' },
  { topic: 'recuperarse de una crisis financiera pyme', categoria: 'finanzas' },
  { topic: 'herramientas gratuitas para gestionar pyme', categoria: 'tecnologia' },
]

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const secret = process.env.CRON_SECRET

  if (!secret || !authHeader || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.orbbilatam.com'
  const now = Date.now()

  // Pick 2 topics based on current time to ensure rotation
  const index1 = Math.floor(now / (1000 * 60 * 60 * 24)) % TOPICS.length
  const index2 = (index1 + 1) % TOPICS.length

  const selectedTopics = [TOPICS[index1], TOPICS[index2]]
  const results = []

  for (const { topic, categoria } of selectedTopics) {
    try {
      const response = await fetch(`${baseUrl}/api/blog/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          categoria,
          pais_target: 'LATAM',
          secret,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        results.push({ ok: true, topic, slug: data.articulo?.slug })
      } else {
        results.push({ ok: false, topic, error: data.error })
      }
    } catch (err) {
      results.push({ ok: false, topic, error: String(err) })
    }
  }

  const successful = results.filter((r) => r.ok).length

  return NextResponse.json({
    ok: true,
    generated: successful,
    total: selectedTopics.length,
    results,
    timestamp: new Date().toISOString(),
  })
}
