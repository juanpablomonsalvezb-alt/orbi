import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyEmpresaAccess } from '@/lib/api-auth'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

const TIPOS_PERMITIDOS = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // xlsx
  'application/vnd.ms-excel', // xls
  'text/csv',
  'image/png',
  'image/jpeg',
  'application/msword', // doc
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
]

const EXTENSIONES_PERMITIDAS = [
  'pdf', 'xlsx', 'xls', 'csv', 'png', 'jpg', 'jpeg', 'doc', 'docx'
]

const MAX_SIZE = 10 * 1024 * 1024 // 10MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('archivo') as File | null
    const empresaId = formData.get('empresa_id') as string | null

    if (!file || !empresaId) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: archivo, empresa_id' },
        { status: 400 }
      )
    }

    // Verify the authenticated user owns this empresa
    const hasAccess = await verifyEmpresaAccess(request, empresaId)
    if (!hasAccess) {
      return NextResponse.json({ error: 'Tu sesión expiró. Recarga la página.' }, { status: 401 })
    }

    // Validate file size
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'El archivo es demasiado grande. Máximo 10MB.' },
        { status: 400 }
      )
    }

    // Validate file type by extension
    const extension = file.name.split('.').pop()?.toLowerCase() || ''
    if (!EXTENSIONES_PERMITIDAS.includes(extension)) {
      return NextResponse.json(
        { error: 'Tipo de archivo no soportado. Usa PDF, Excel, CSV, Word o imágenes.' },
        { status: 400 }
      )
    }

    // Validate MIME type (allow empty MIME for csv sometimes)
    if (file.type && !TIPOS_PERMITIDOS.includes(file.type) && extension !== 'csv') {
      return NextResponse.json(
        { error: 'Tipo de archivo no soportado. Usa PDF, Excel, CSV, Word o imágenes.' },
        { status: 400 }
      )
    }

    const supabase = getSupabase()

    // Generate unique file path
    const timestamp = Date.now()
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const storagePath = `${empresaId}/${timestamp}_${safeName}`

    // Read file as buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('archivos')
      .upload(storagePath, buffer, {
        contentType: file.type || 'application/octet-stream',
        upsert: false,
      })

    if (uploadError) {
      console.error('Error subiendo archivo:', uploadError)
      return NextResponse.json(
        { error: 'Error al subir el archivo al almacenamiento' },
        { status: 500 }
      )
    }

    // Determine simple type category
    let tipoSimple = 'otro'
    if (['png', 'jpg', 'jpeg'].includes(extension)) tipoSimple = 'imagen'
    else if (extension === 'pdf') tipoSimple = 'pdf'
    else if (['xlsx', 'xls', 'csv'].includes(extension)) tipoSimple = 'hoja_calculo'
    else if (['doc', 'docx'].includes(extension)) tipoSimple = 'documento'

    // Save metadata to archivos table
    const { data: archivo, error: dbError } = await supabase
      .from('archivos')
      .insert({
        empresa_id: empresaId,
        nombre: file.name,
        tipo: tipoSimple,
        tamano: file.size,
        storage_path: storagePath,
      })
      .select()
      .single()

    if (dbError) {
      console.error('Error guardando metadata:', dbError)
      // Try to clean up the uploaded file
      await supabase.storage.from('archivos').remove([storagePath])
      return NextResponse.json(
        { error: 'Error al guardar la información del archivo' },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('archivos')
      .getPublicUrl(storagePath)

    return NextResponse.json({
      id: archivo.id,
      nombre: archivo.nombre,
      tipo: archivo.tipo,
      tamano: archivo.tamano,
      url: urlData.publicUrl,
      storage_path: archivo.storage_path,
    })
  } catch (error) {
    console.error('Error en /api/upload:', error)
    return NextResponse.json(
      { error: 'Nuestros servidores están ocupados. Intenta en unos segundos.' },
      { status: 500 }
    )
  }
}
