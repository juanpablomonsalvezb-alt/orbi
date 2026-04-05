import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Orbbi — Porque nadie debería decidir solo.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const agents = ['Gerente', 'Financiero', 'Ventas', 'Marketing', 'RRHH', 'Inventario', 'Cumplimiento']

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
        {/* Subtle grain texture overlay via radial gradient */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse at 20% 50%, rgba(217,119,87,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(250,249,245,0.04) 0%, transparent 50%)',
            display: 'flex',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '64px 80px',
            flex: 1,
            position: 'relative',
          }}
        >
          {/* Top label */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 40,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#d97757',
                display: 'flex',
              }}
            />
            <span
              style={{
                fontSize: 14,
                color: '#d97757',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontFamily: 'Georgia, serif',
              }}
            >
              Plataforma de IA para PYMEs · LATAM
            </span>
          </div>

          {/* Wordmark */}
          <h1
            style={{
              fontSize: 120,
              fontWeight: 400,
              color: '#faf9f5',
              letterSpacing: '-4px',
              margin: 0,
              lineHeight: 0.9,
              fontFamily: 'Georgia, serif',
            }}
          >
            orbbi
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontSize: 26,
              color: 'rgba(250,249,245,0.55)',
              marginTop: 24,
              marginBottom: 0,
              fontStyle: 'italic',
              fontFamily: 'Georgia, serif',
              letterSpacing: '-0.3px',
            }}
          >
            Porque nadie debería decidir solo.
          </p>

          {/* Agent pills */}
          <div
            style={{
              display: 'flex',
              gap: 10,
              marginTop: 48,
              flexWrap: 'wrap',
            }}
          >
            {agents.map((agent, i) => (
              <span
                key={agent}
                style={{
                  fontSize: 13,
                  color: i === 0 ? '#d97757' : 'rgba(250,249,245,0.5)',
                  border: `1px solid ${i === 0 ? 'rgba(217,119,87,0.6)' : 'rgba(250,249,245,0.15)'}`,
                  borderRadius: 100,
                  padding: '7px 18px',
                  background: i === 0 ? 'rgba(217,119,87,0.12)' : 'rgba(250,249,245,0.04)',
                  fontFamily: 'Georgia, serif',
                  letterSpacing: '0.02em',
                }}
              >
                {agent}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 80px',
            borderTop: '1px solid rgba(250,249,245,0.08)',
          }}
        >
          <span
            style={{
              fontSize: 15,
              color: 'rgba(250,249,245,0.35)',
              fontFamily: 'Georgia, serif',
              letterSpacing: '0.02em',
            }}
          >
            orbbilatam.com
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 13,
                color: 'rgba(250,249,245,0.3)',
                fontFamily: 'Georgia, serif',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Desde
            </span>
            <span
              style={{
                fontSize: 22,
                fontWeight: 400,
                color: '#d97757',
                fontFamily: 'Georgia, serif',
                letterSpacing: '-0.5px',
              }}
            >
              $29/mes
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
