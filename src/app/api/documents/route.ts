import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generateDocument, DocType } from '@/lib/document-generator'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

const VALID_DOC_TYPES: DocType[] = ['reporte', 'contrato', 'cotizacion', 'analisis']

export async function POST(request: NextRequest) {
  try {
    const { type, title, content, empresa_id, agente } = await request.json()

    // Validaciones
    if (!type || !title || !content || !empresa_id) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: type, title, content, empresa_id' },
        { status: 400 }
      )
    }

    if (!VALID_DOC_TYPES.includes(type)) {
      return NextResponse.json(
        { error: `Tipo de documento inválido. Opciones: ${VALID_DOC_TYPES.join(', ')}` },
        { status: 400 }
      )
    }

    const supabase = getSupabase()

    // Obtener nombre de la empresa
    const { data: empresa, error: errorEmpresa } = await supabase
      .from('empresas')
      .select('nombre')
      .eq('id', empresa_id)
      .single()

    if (errorEmpresa || !empresa) {
      return NextResponse.json({ error: 'Empresa no encontrada' }, { status: 404 })
    }

    const fecha = new Date().toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    const html = generateDocument({
      type: type as DocType,
      title,
      empresa: empresa.nombre,
      content,
      agente: agente || 'Gerente General',
      fecha,
    })

    // Generar nombre de archivo seguro
    const safeTitle = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 60)

    const filename = `orbbi-${type}-${safeTitle}.html`

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('Error en /api/documents:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
