import { NextRequest, NextResponse } from 'next/server'
import { readGoogleSheet } from '@/lib/google-sheets'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

/**
 * POST /api/sheets — Read a Google Sheet and save as empresa data source
 */
export async function POST(request: NextRequest) {
  try {
    const { url, empresa_id } = await request.json()

    if (!url || !empresa_id) {
      return NextResponse.json({ error: 'URL y empresa_id requeridos' }, { status: 400 })
    }

    // Read the sheet
    const summary = await readGoogleSheet(url)

    // Save as a memory so agents can access it
    const supabase = getSupabase()
    await supabase.from('memorias').upsert({
      empresa_id,
      agente_tipo: 'general',
      categoria: 'dato',
      contenido: `[DATOS GOOGLE SHEETS]\nFuente: ${url}\n\n${summary}`,
      activa: true,
    }, {
      onConflict: 'empresa_id',
    })

    return NextResponse.json({ summary, chars: summary.length })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Error leyendo la hoja'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
