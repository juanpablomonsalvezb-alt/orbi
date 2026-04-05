'use client'

import { useEffect, useRef } from 'react'

const SVG_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <!-- Background -->
  <rect width="200" height="200" fill="#141413" rx="40"/>

  <!-- Outer orbit ring -->
  <ellipse cx="100" cy="100" rx="78" ry="78" stroke="#faf9f5" stroke-width="1" opacity="0.10" fill="none"/>

  <!-- Mid orbit tilted -->
  <ellipse cx="100" cy="100" rx="74" ry="29" stroke="#faf9f5" stroke-width="1.2" opacity="0.22" fill="none"
    transform="rotate(-28 100 100)"/>

  <!-- Inner orbit tilted other way -->
  <ellipse cx="100" cy="100" rx="56" ry="22" stroke="#faf9f5" stroke-width="1" opacity="0.18" fill="none"
    transform="rotate(38 100 100)"/>

  <!-- Central core glow -->
  <circle cx="100" cy="100" r="22" fill="#faf9f5" opacity="0.08"/>
  <circle cx="100" cy="100" r="18" fill="#faf9f5" opacity="0.12"/>
  <circle cx="100" cy="100" r="14" fill="#faf9f5"/>

  <!-- Accent inner highlight -->
  <circle cx="107" cy="93" r="5" fill="#d97757" opacity="0.95"/>

  <!-- Orbiting accent dot 1 (right) -->
  <circle cx="174" cy="100" r="8" fill="#d97757"/>

  <!-- Orbiting dot 2 (top-left) -->
  <circle cx="44" cy="44" r="6" fill="#faf9f5" opacity="0.45"/>

  <!-- Orbiting dot 3 (bottom-left) -->
  <circle cx="34" cy="138" r="5" fill="#d97757" opacity="0.55"/>

  <!-- Pulse ring -->
  <circle cx="100" cy="100" r="22" stroke="#d97757" stroke-width="1.5" fill="none" opacity="0.3"/>
</svg>
`

const SVG_LIGHT = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <!-- Background -->
  <rect width="200" height="200" fill="#faf9f5" rx="40"/>

  <!-- Outer orbit ring -->
  <ellipse cx="100" cy="100" rx="78" ry="78" stroke="#141413" stroke-width="1" opacity="0.10" fill="none"/>

  <!-- Mid orbit tilted -->
  <ellipse cx="100" cy="100" rx="74" ry="29" stroke="#141413" stroke-width="1.2" opacity="0.22" fill="none"
    transform="rotate(-28 100 100)"/>

  <!-- Inner orbit tilted other way -->
  <ellipse cx="100" cy="100" rx="56" ry="22" stroke="#141413" stroke-width="1" opacity="0.18" fill="none"
    transform="rotate(38 100 100)"/>

  <!-- Central core -->
  <circle cx="100" cy="100" r="14" fill="#141413"/>

  <!-- Accent inner highlight -->
  <circle cx="107" cy="93" r="5" fill="#d97757" opacity="0.95"/>

  <!-- Orbiting accent dot 1 (right) -->
  <circle cx="174" cy="100" r="8" fill="#d97757"/>

  <!-- Orbiting dot 2 (top-left) -->
  <circle cx="44" cy="44" r="6" fill="#141413" opacity="0.45"/>

  <!-- Orbiting dot 3 (bottom-left) -->
  <circle cx="34" cy="138" r="5" fill="#d97757" opacity="0.55"/>

  <!-- Pulse ring -->
  <circle cx="100" cy="100" r="22" stroke="#d97757" stroke-width="1.5" fill="none" opacity="0.25"/>
</svg>
`

function downloadPng(svgString: string, size: number, filename: string) {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const img = new Image()
  const blob = new Blob([svgString.replace('width="200" height="200"', `width="${size}" height="${size}"`)], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  img.onload = () => {
    ctx.drawImage(img, 0, 0, size, size)
    URL.revokeObjectURL(url)
    const a = document.createElement('a')
    a.download = filename
    a.href = canvas.toDataURL('image/png')
    a.click()
  }
  img.src = url
}

function LogoPreview({ svg, label }: { svg: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current) ref.current.innerHTML = svg
  }, [svg])
  return (
    <div ref={ref} className="w-[120px] h-[120px] [&>svg]:w-full [&>svg]:h-full rounded-xl overflow-hidden shadow-lg" aria-label={label} />
  )
}

export default function LogoPage() {
  const downloads = [
    { label: 'Instagram / TikTok', size: 1080, file: 'orbbi-logo-instagram.png', note: '1080×1080px' },
    { label: 'Google Business', size: 720, file: 'orbbi-logo-google.png', note: '720×720px' },
    { label: 'Favicon / App', size: 512, file: 'orbbi-logo-512.png', note: '512×512px' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#1a1917', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
      <div style={{ maxWidth: '680px', width: '100%' }}>
        <h1 style={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: '28px', fontWeight: 400, color: '#faf9f5', marginBottom: '8px', textAlign: 'center' }}>
          Orbbi — Logo
        </h1>
        <p style={{ fontSize: '13px', color: '#87867f', textAlign: 'center', marginBottom: '48px' }}>
          Descarga el ícono en el tamaño exacto para cada plataforma
        </p>

        {/* Dark version */}
        <div style={{ background: '#141413', borderRadius: '16px', padding: '32px', marginBottom: '16px' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#87867f', marginBottom: '20px' }}>
            Versión oscura — para Instagram y Google
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
            <LogoPreview svg={SVG_ICON} label="Logo oscuro" />
            <div style={{ flex: 1, minWidth: '220px' }}>
              {downloads.map(d => (
                <button
                  key={d.file}
                  onClick={() => downloadPng(SVG_ICON, d.size, d.file)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '100%', background: '#1e1d1b', border: '1px solid #2e2d2a',
                    borderRadius: '8px', padding: '10px 14px', marginBottom: '8px',
                    cursor: 'pointer', color: '#faf9f5',
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 500 }}>{d.label}</span>
                  <span style={{ fontSize: '11px', color: '#87867f' }}>↓ {d.note}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Light version */}
        <div style={{ background: '#f5f4f0', borderRadius: '16px', padding: '32px' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#87867f', marginBottom: '20px' }}>
            Versión clara — alternativa
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
            <LogoPreview svg={SVG_LIGHT} label="Logo claro" />
            <div style={{ flex: 1, minWidth: '220px' }}>
              {downloads.map(d => (
                <button
                  key={d.file + '-light'}
                  onClick={() => downloadPng(SVG_LIGHT, d.size, d.file.replace('.png', '-light.png'))}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '100%', background: '#ffffff', border: '1px solid #e8e6dc',
                    borderRadius: '8px', padding: '10px 14px', marginBottom: '8px',
                    cursor: 'pointer', color: '#141413',
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 500 }}>{d.label}</span>
                  <span style={{ fontSize: '11px', color: '#87867f' }}>↓ {d.note}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
