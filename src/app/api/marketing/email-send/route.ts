import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { verifyEmpresaAccess } from '@/lib/api-auth'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

const FROM_OUTREACH = 'Orbbi <hola@orbbilatam.com>'

// Build personalized email HTML from template variables
function buildEmailHtml(cuerpo_html: string, vars: Record<string, string>): string {
  let html = cuerpo_html
  for (const [key, value] of Object.entries(vars)) {
    html = html.replaceAll(`{{${key}}}`, value)
  }
  return html
}

function buildEmailSubject(asunto: string, vars: Record<string, string>): string {
  let subject = asunto
  for (const [key, value] of Object.entries(vars)) {
    subject = subject.replaceAll(`{{${key}}}`, value)
  }
  return subject
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { empresa_id, campana_id, destinatarios } = body as {
    empresa_id: string
    campana_id: string
    destinatarios: Array<{
      prospecto_id?: string
      nombre: string
      cargo: string
      org: string
      email: string
      pais: string
      tipo_org: string
    }>
  }

  if (!empresa_id || !campana_id || !destinatarios?.length) {
    return NextResponse.json({ error: 'empresa_id, campana_id y destinatarios son requeridos' }, { status: 400 })
  }

  const hasAccess = await verifyEmpresaAccess(request, empresa_id)
  if (!hasAccess) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const supabase = getSupabase()
  const resend = getResend()

  // Get campaign
  const { data: campana, error: campanaError } = await supabase
    .from('marketing_campanas_email')
    .select('*')
    .eq('id', campana_id)
    .eq('empresa_id', empresa_id)
    .single()

  if (campanaError || !campana) {
    return NextResponse.json({ error: 'Campaña no encontrada' }, { status: 404 })
  }

  const resultados = { enviados: 0, fallidos: 0, detalles: [] as string[] }

  // Send in small batches to respect Resend rate limits (2/sec on free)
  for (const dest of destinatarios) {
    const vars = {
      nombre: dest.nombre,
      cargo: dest.cargo,
      org: dest.org,
      pais: dest.pais,
    }

    const html = buildEmailHtml(campana.cuerpo_html, vars)
    const asunto = buildEmailSubject(campana.asunto, vars)

    try {
      const res = await resend.emails.send({
        from: FROM_OUTREACH,
        to: dest.email,
        subject: asunto,
        html,
      })

      const messageId = res.data?.id || ''

      // Record the send
      await supabase.from('marketing_emails_enviados').insert({
        campana_id,
        empresa_id,
        destinatario_nombre: dest.nombre,
        destinatario_cargo: dest.cargo,
        destinatario_org: dest.org,
        destinatario_email: dest.email,
        pais: dest.pais,
        tipo_org: dest.tipo_org,
        estado: 'enviado',
        resend_message_id: messageId,
        enviado_at: new Date().toISOString(),
      })

      resultados.enviados++
      resultados.detalles.push(`✓ ${dest.email}`)

      // Small delay to respect rate limits
      await new Promise(r => setTimeout(r, 600))
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error desconocido'
      resultados.fallidos++
      resultados.detalles.push(`✗ ${dest.email}: ${msg}`)

      await supabase.from('marketing_emails_enviados').insert({
        campana_id,
        empresa_id,
        destinatario_nombre: dest.nombre,
        destinatario_cargo: dest.cargo,
        destinatario_org: dest.org,
        destinatario_email: dest.email,
        pais: dest.pais,
        tipo_org: dest.tipo_org,
        estado: 'rebotado',
        notas: msg,
      })
    }
  }

  // Update campaign totals
  await supabase
    .from('marketing_campanas_email')
    .update({
      total_enviados: campana.total_enviados + resultados.enviados,
      total_rebotes: campana.total_rebotes + resultados.fallidos,
      estado: 'activa',
      updated_at: new Date().toISOString(),
    })
    .eq('id', campana_id)

  return NextResponse.json(resultados)
}
