import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyEmpresaAccess } from '@/lib/api-auth'
import { sendWhatsAppMessage } from '@/lib/whatsapp'

interface Destinatario {
  nombre: string
  telefono: string
  estado?: string
}

interface Broadcast {
  id: string
  empresa_id: string
  nombre: string
  mensaje: string
  destinatarios: Destinatario[]
  estado: string
  enviados: number
  fallidos: number
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// POST /api/marketing/broadcast — sends a broadcast OR creates one
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { empresa_id, broadcast_id, nombre, mensaje, destinatarios } = body as {
      empresa_id: string
      broadcast_id?: string
      nombre?: string
      mensaje?: string
      destinatarios?: Destinatario[]
    }

    if (!empresa_id) {
      return NextResponse.json({ error: 'empresa_id es requerido' }, { status: 400 })
    }

    const hasAccess = await verifyEmpresaAccess(request, empresa_id)
    if (!hasAccess) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const supabase = getSupabase()

    // If broadcast_id provided → send existing broadcast
    if (broadcast_id) {
      const { data: broadcast, error: fetchError } = await supabase
        .from('marketing_broadcasts')
        .select('*')
        .eq('id', broadcast_id)
        .eq('empresa_id', empresa_id)
        .single()

      if (fetchError || !broadcast) {
        return NextResponse.json({ error: 'Broadcast no encontrado' }, { status: 404 })
      }

      const bc = broadcast as Broadcast
      let enviados = 0
      let fallidos = 0

      const lista: Destinatario[] = Array.isArray(bc.destinatarios) ? bc.destinatarios : []

      for (const dest of lista) {
        if (!dest.telefono) { fallidos++; continue }
        try {
          await sendWhatsAppMessage(dest.telefono, bc.mensaje)
          enviados++
        } catch (err) {
          console.error(`Error enviando a ${dest.telefono}:`, err)
          fallidos++
        }
      }

      await supabase
        .from('marketing_broadcasts')
        .update({ estado: 'completado', enviados, fallidos })
        .eq('id', broadcast_id)

      return NextResponse.json({ ok: true, enviados, fallidos })
    }

    // Otherwise create a new broadcast
    if (!nombre || !mensaje) {
      return NextResponse.json({ error: 'nombre y mensaje son requeridos para crear broadcast' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('marketing_broadcasts')
      .insert({
        empresa_id,
        nombre,
        mensaje,
        destinatarios: destinatarios || [],
        estado: 'borrador',
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ broadcast: data })
  } catch (err) {
    console.error('[marketing/broadcast POST]', err)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

// GET /api/marketing/broadcast?empresa_id=xxx — list broadcasts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const empresa_id = searchParams.get('empresa_id')

    if (!empresa_id) {
      return NextResponse.json({ error: 'empresa_id es requerido' }, { status: 400 })
    }

    const hasAccess = await verifyEmpresaAccess(request, empresa_id)
    if (!hasAccess) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('marketing_broadcasts')
      .select('*')
      .eq('empresa_id', empresa_id)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ broadcasts: data })
  } catch (err) {
    console.error('[marketing/broadcast GET]', err)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

// PATCH /api/marketing/broadcast — update broadcast (nombre, mensaje, destinatarios)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, empresa_id, ...updates } = body as {
      id: string
      empresa_id: string
      nombre?: string
      mensaje?: string
      destinatarios?: Destinatario[]
    }

    if (!id || !empresa_id) {
      return NextResponse.json({ error: 'id y empresa_id son requeridos' }, { status: 400 })
    }

    const hasAccess = await verifyEmpresaAccess(request, empresa_id)
    if (!hasAccess) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('marketing_broadcasts')
      .update(updates)
      .eq('id', id)
      .eq('empresa_id', empresa_id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ broadcast: data })
  } catch (err) {
    console.error('[marketing/broadcast PATCH]', err)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

// DELETE /api/marketing/broadcast?id=xxx&empresa_id=xxx
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const empresa_id = searchParams.get('empresa_id')

    if (!id || !empresa_id) {
      return NextResponse.json({ error: 'id y empresa_id son requeridos' }, { status: 400 })
    }

    const hasAccess = await verifyEmpresaAccess(request, empresa_id)
    if (!hasAccess) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const supabase = getSupabase()
    const { error } = await supabase
      .from('marketing_broadcasts')
      .delete()
      .eq('id', id)
      .eq('empresa_id', empresa_id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[marketing/broadcast DELETE]', err)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
