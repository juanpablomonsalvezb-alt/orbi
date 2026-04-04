import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

// Lazy Resend singleton
let _resend: Resend | null = null
function getResend(): Resend {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY)
  return _resend
}

// Lazy Supabase singleton (server-side with service role)
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

const FROM_EMAIL = 'Orbbi <noreply@orbbi.com>'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://orbbi.com'

const AGENTE_LABELS: Record<string, string> = {
  general: 'Gerente General',
  financiero: 'Agente Financiero',
  ventas: 'Agente de Ventas',
  marketing: 'Agente de Marketing',
  rrhh: 'Agente de RRHH',
  inventario: 'Agente de Inventario',
  legal: 'Agente de Cumplimiento',
}

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getSupabase()
  const now = new Date()
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const weekStart = oneWeekAgo.toISOString()

  // Get all empresas with active plan or active trial
  const { data: empresas, error: empError } = await supabase
    .from('empresas')
    .select('id, nombre, email, plan, trial_ends_at, subscription_status')

  if (empError || !empresas) {
    return NextResponse.json({ error: 'Failed to fetch empresas', details: empError }, { status: 500 })
  }

  // Filter: active subscription OR trial not yet expired
  const activeEmpresas = empresas.filter((e) => {
    const hasActivePlan = e.plan !== 'free' && e.subscription_status === 'active'
    const trialActive = e.trial_ends_at && new Date(e.trial_ends_at) > now
    return hasActivePlan || trialActive
  })

  let emailsSent = 0
  let errors = 0

  for (const empresa of activeEmpresas) {
    try {
      // Get conversations created this week
      const { data: conversaciones } = await supabase
        .from('conversaciones')
        .select('id, titulo, agente_tipo, created_at')
        .eq('empresa_id', empresa.id)
        .gte('created_at', weekStart)
        .order('created_at', { ascending: false })

      const convs = conversaciones || []
      const convCount = convs.length

      // Get all conversation IDs for this empresa (not just this week) for message counting
      const { data: allConvs } = await supabase
        .from('conversaciones')
        .select('id')
        .eq('empresa_id', empresa.id)

      const allConvIds = (allConvs || []).map(c => c.id)

      let userMessages = 0
      let assistantMessages = 0

      if (allConvIds.length > 0) {
        // Count user messages this week
        const { count: userCount } = await supabase
          .from('mensajes')
          .select('*', { count: 'exact', head: true })
          .in('conversacion_id', allConvIds)
          .eq('rol', 'user')
          .gte('created_at', weekStart)

        userMessages = userCount || 0

        // Count assistant messages this week
        const { count: assistantCount } = await supabase
          .from('mensajes')
          .select('*', { count: 'exact', head: true })
          .in('conversacion_id', allConvIds)
          .eq('rol', 'assistant')
          .gte('created_at', weekStart)

        assistantMessages = assistantCount || 0
      }

      const totalMessages = userMessages + assistantMessages

      // Most used agent this week
      const agentCounts: Record<string, number> = {}
      for (const c of convs) {
        agentCounts[c.agente_tipo] = (agentCounts[c.agente_tipo] || 0) + 1
      }
      const topAgent = Object.entries(agentCounts).sort((a, b) => b[1] - a[1])[0]
      const topAgentLabel = topAgent ? (AGENTE_LABELS[topAgent[0]] || topAgent[0]) : 'Ninguno'

      // Last 3 conversation titles
      const recentTitles = convs.slice(0, 3).map(c => c.titulo)

      // Build & send email
      const html = buildWeeklyEmailHtml({
        nombre: empresa.nombre,
        totalMessages,
        userMessages,
        assistantMessages,
        convCount,
        topAgent: topAgentLabel,
        recentTitles,
      })

      await getResend().emails.send({
        from: FROM_EMAIL,
        to: empresa.email,
        subject: `Tu semana en Orbbi — ${convCount} conversacion${convCount !== 1 ? 'es' : ''}, ${totalMessages} mensaje${totalMessages !== 1 ? 's' : ''}`,
        html,
      })

      emailsSent++
    } catch (err) {
      console.error(`Error processing weekly report for empresa ${empresa.id}:`, err)
      errors++
    }
  }

  return NextResponse.json({
    ok: true,
    emailsSent,
    errors,
    totalActive: activeEmpresas.length,
    timestamp: now.toISOString(),
  })
}

// ── Email HTML builder ─────────────────────────────────────────────

function buildWeeklyEmailHtml(data: {
  nombre: string
  totalMessages: number
  userMessages: number
  assistantMessages: number
  convCount: number
  topAgent: string
  recentTitles: string[]
}): string {
  const topicsHtml = data.recentTitles.length > 0
    ? data.recentTitles
        .map(t => `<li style="margin-bottom: 6px; color: #5e5d59; font-size: 15px;">${escapeHtml(t)}</li>`)
        .join('')
    : '<li style="color: #87867f; font-size: 15px;">Sin conversaciones esta semana</li>'

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin: 0; padding: 0; background-color: #faf9f5;">
  <div style="font-family: 'Georgia', serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #141413;">

    <h1 style="font-size: 28px; font-weight: 400; margin-bottom: 8px; letter-spacing: -0.5px;">
      Tu semana en Orbbi
    </h1>
    <p style="font-size: 14px; color: #87867f; margin-bottom: 32px;">
      Resumen semanal para ${escapeHtml(data.nombre)}
    </p>

    <!-- Stats -->
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 32px;">
      <tr>
        <td style="padding: 16px 20px; background: #f2f0e8; border-radius: 10px; text-align: center; width: 33%;">
          <div style="font-size: 28px; font-weight: 600; color: #141413; letter-spacing: -1px;">${data.convCount}</div>
          <div style="font-size: 12px; color: #87867f; margin-top: 4px;">Conversaciones</div>
        </td>
        <td style="width: 12px;"></td>
        <td style="padding: 16px 20px; background: #f2f0e8; border-radius: 10px; text-align: center; width: 33%;">
          <div style="font-size: 28px; font-weight: 600; color: #141413; letter-spacing: -1px;">${data.userMessages}</div>
          <div style="font-size: 12px; color: #87867f; margin-top: 4px;">Tus mensajes</div>
        </td>
        <td style="width: 12px;"></td>
        <td style="padding: 16px 20px; background: #f2f0e8; border-radius: 10px; text-align: center; width: 33%;">
          <div style="font-size: 28px; font-weight: 600; color: #141413; letter-spacing: -1px;">${data.assistantMessages}</div>
          <div style="font-size: 12px; color: #87867f; margin-top: 4px;">Respuestas Orbbi</div>
        </td>
      </tr>
    </table>

    <!-- Top agent -->
    <div style="margin-bottom: 28px;">
      <h2 style="font-size: 18px; font-weight: 400; margin-bottom: 8px;">Agente mas usado</h2>
      <p style="font-size: 16px; color: #d97757; font-weight: 600; margin: 0;">
        ${escapeHtml(data.topAgent)}
      </p>
    </div>

    <!-- Recent topics -->
    <div style="margin-bottom: 32px;">
      <h2 style="font-size: 18px; font-weight: 400; margin-bottom: 12px;">Temas recientes</h2>
      <ul style="padding-left: 20px; margin: 0;">
        ${topicsHtml}
      </ul>
    </div>

    <!-- CTA -->
    <a href="${APP_URL}/chat"
       style="display: inline-block; background: #141413; color: #faf9f5; padding: 14px 28px;
              border-radius: 8px; text-decoration: none; font-size: 15px; font-weight: 500;">
      Seguir conversando
    </a>

    <hr style="border: none; border-top: 1px solid #e8e6dc; margin: 36px 0 20px;" />
    <p style="font-size: 12px; color: #b0aea5;">
      Orbbi — El agente que orbita tu negocio 24/7
    </p>
  </div>
</body>
</html>
  `.trim()
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
