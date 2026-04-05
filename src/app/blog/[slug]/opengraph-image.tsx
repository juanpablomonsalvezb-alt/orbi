import { ImageResponse } from 'next/og'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function Image({ params }: Props) {
  const { slug } = await params

  let titulo = 'Blog — Orbbi'
  let categoria = 'Recursos para PYMEs'

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data } = await supabase
      .from('blog_articulos')
      .select('titulo, categoria')
      .eq('slug', slug)
      .eq('publicado', true)
      .single()

    if (data) {
      titulo = data.titulo
      const catLabels: Record<string, string> = {
        gestion: 'Gestión Empresarial',
        finanzas: 'Finanzas',
        ventas: 'Ventas',
        marketing: 'Marketing',
        rrhh: 'Recursos Humanos',
        tecnologia: 'Tecnología',
      }
      categoria = catLabels[data.categoria] || data.categoria
    }
  } catch {
    // fallback to defaults
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#141413',
          fontFamily: 'Georgia, "Times New Roman", serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse at 15% 60%, rgba(217,119,87,0.1) 0%, transparent 55%)',
            display: 'flex',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '60px 80px',
            flex: 1,
            position: 'relative',
          }}
        >
          {/* Top: Orbbi Blog label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#d97757',
                display: 'flex',
              }}
            />
            <span
              style={{
                fontSize: 13,
                color: '#d97757',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontFamily: 'Georgia, serif',
              }}
            >
              Orbbi Blog · {categoria}
            </span>
          </div>

          {/* Article title — center */}
          <div style={{ display: 'flex', flex: 1, alignItems: 'center', paddingTop: '40px', paddingBottom: '40px' }}>
            <h1
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: titulo.length > 60 ? 44 : 54,
                fontWeight: 400,
                color: '#faf9f5',
                lineHeight: 1.2,
                letterSpacing: '-1.5px',
                margin: 0,
                maxWidth: '900px',
              }}
            >
              {titulo}
            </h1>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(250,249,245,0.1)',
              paddingTop: '24px',
            }}
          >
            <span
              style={{
                fontSize: 16,
                color: 'rgba(250,249,245,0.4)',
                fontFamily: 'Georgia, serif',
                letterSpacing: '0.02em',
              }}
            >
              orbbilatam.com
            </span>
            <span
              style={{
                fontSize: 14,
                color: 'rgba(250,249,245,0.3)',
                fontFamily: 'Georgia, serif',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Agentes de IA para PYMEs
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
