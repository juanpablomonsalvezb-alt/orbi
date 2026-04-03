import { NextRequest, NextResponse } from 'next/server'
import { scrapeCompetitor } from '@/lib/scraper'

export async function POST(request: NextRequest) {
  try {
    const { url, empresa_id } = await request.json()

    if (!url || !empresa_id) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: url, empresa_id' },
        { status: 400 }
      )
    }

    // Validar que es una URL válida
    try {
      new URL(url)
    } catch {
      return NextResponse.json(
        { error: 'URL inválida' },
        { status: 400 }
      )
    }

    const resultado = await scrapeCompetitor(url)

    return NextResponse.json({
      success: true,
      data: resultado,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error desconocido'
    console.error('Error en /api/scrape:', message)
    return NextResponse.json(
      { error: `Error al analizar la URL: ${message}` },
      { status: 500 }
    )
  }
}
