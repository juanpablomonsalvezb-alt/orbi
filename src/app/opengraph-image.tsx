import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Orbbi — El agente que orbita tu negocio 24/7'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #f0eee6 0%, #e8e6dc 50%, #e3dacc 100%)',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Logo circle */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: '#d97757',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 32,
          }}
        >
          <span style={{ color: '#fff', fontSize: 36, fontWeight: 700 }}>O</span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 64,
            fontWeight: 400,
            color: '#141413',
            letterSpacing: '-2px',
            margin: 0,
            textAlign: 'center',
            lineHeight: 1.1,
          }}
        >
          Orbbi
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 28,
            color: '#5e5d59',
            marginTop: 16,
            textAlign: 'center',
            maxWidth: 700,
            lineHeight: 1.4,
          }}
        >
          El agente que orbita tu negocio 24/7
        </p>

        {/* Agent tags */}
        <div
          style={{
            display: 'flex',
            gap: 12,
            marginTop: 40,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {['Finanzas', 'Ventas', 'Marketing', 'RRHH', 'Inventario', 'Cumplimiento'].map((agent) => (
            <span
              key={agent}
              style={{
                fontSize: 16,
                color: '#5e5d59',
                border: '1px solid #d1cfc5',
                borderRadius: 20,
                padding: '8px 20px',
                background: 'rgba(255,255,255,0.5)',
              }}
            >
              {agent}
            </span>
          ))}
        </div>

        {/* Bottom tagline */}
        <p
          style={{
            position: 'absolute',
            bottom: 32,
            fontSize: 16,
            color: '#87867f',
          }}
        >
          Agentes de IA especializados para PYMEs en Latinoamérica
        </p>
      </div>
    ),
    { ...size }
  )
}
