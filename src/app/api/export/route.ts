import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyEmpresaAccess } from '@/lib/api-auth'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function GET(request: NextRequest) {
  const empresaId = request.nextUrl.searchParams.get('empresa_id')

  if (!empresaId) {
    return NextResponse.json({ error: 'empresa_id requerido' }, { status: 400 })
  }

  // Verify the authenticated user owns this empresa
  const hasAccess = await verifyEmpresaAccess(request, empresaId)
  if (!hasAccess) {
    return NextResponse.json({ error: 'Tu sesión expiró. Recarga la página.' }, { status: 401 })
  }

  const supabase = getSupabase()

  try {
    // Fetch all user data in parallel
    const [
      { data: empresa },
      { data: contexto },
      { data: conversaciones },
      { data: memorias },
      { data: tareas },
      { data: feedback },
    ] = await Promise.all([
      supabase.from('empresas').select('*').eq('id', empresaId).single(),
      supabase.from('contexto').select('*').eq('empresa_id', empresaId).order('orden'),
      supabase.from('conversaciones').select('*').eq('empresa_id', empresaId).order('created_at', { ascending: false }),
      supabase.from('memorias').select('*').eq('empresa_id', empresaId).order('created_at', { ascending: false }),
      supabase.from('tareas').select('*').eq('empresa_id', empresaId).order('created_at', { ascending: false }),
      supabase.from('feedback').select('*').eq('empresa_id', empresaId).order('created_at', { ascending: false }),
    ])

    if (!empresa) {
      return NextResponse.json({ error: 'No encontramos tu empresa. Intenta cerrar sesión y volver a entrar.' }, { status: 404 })
    }

    // Fetch messages for all conversations
    const conversacionIds = (conversaciones || []).map(c => c.id)
    let mensajes: Record<string, unknown[]> = {}

    if (conversacionIds.length > 0) {
      const { data: allMensajes } = await supabase
        .from('mensajes')
        .select('*')
        .in('conversacion_id', conversacionIds)
        .order('created_at', { ascending: true })

      // Group messages by conversation
      for (const msg of allMensajes || []) {
        if (!mensajes[msg.conversacion_id]) {
          mensajes[msg.conversacion_id] = []
        }
        mensajes[msg.conversacion_id].push(msg)
      }
    }

    // Build conversaciones with their messages
    const conversacionesConMensajes = (conversaciones || []).map(conv => ({
      ...conv,
      mensajes: mensajes[conv.id] || [],
    }))

    const exportData = {
      exportado_en: new Date().toISOString(),
      empresa,
      onboarding: contexto || [],
      conversaciones: conversacionesConMensajes,
      memorias: memorias || [],
      tareas: tareas || [],
      feedback: feedback || [],
    }

    const json = JSON.stringify(exportData, null, 2)

    return new NextResponse(json, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="orbbi-export-${new Date().toISOString().slice(0, 10)}.json"`,
      },
    })
  } catch {
    return NextResponse.json({ error: 'Error exportando datos' }, { status: 500 })
  }
}
