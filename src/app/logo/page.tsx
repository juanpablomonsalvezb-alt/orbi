'use client'

import { useEffect, useRef } from 'react'

const SVG_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1e1c1a"/>
      <stop offset="100%" stop-color="#0e0d0c"/>
    </radialGradient>
    <radialGradient id="coreGrad" cx="40%" cy="38%" r="60%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#e8e4dc"/>
    </radialGradient>
    <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#d97757" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#d97757" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="200" height="200" fill="url(#bgGrad)" rx="40"/>

  <!-- Warm glow behind core -->
  <circle cx="100" cy="100" r="52" fill="url(#glowGrad)"/>

  <!-- Outer orbit ring -->
  <ellipse cx="100" cy="100" rx="82" ry="82" stroke="#d97757" stroke-width="0.8" opacity="0.15" fill="none"/>

  <!-- Mid orbit tilted -->
  <ellipse cx="100" cy="100" rx="78" ry="30" stroke="#faf9f5" stroke-width="1.5" opacity="0.35" fill="none"
    transform="rotate(-28 100 100)"/>

  <!-- Inner orbit tilted other way -->
  <ellipse cx="100" cy="100" rx="58" ry="22" stroke="#d97757" stroke-width="1.2" opacity="0.45" fill="none"
    transform="rotate(38 100 100)"/>

  <!-- Core glow layers -->
  <circle cx="100" cy="100" r="30" fill="#faf9f5" opacity="0.06"/>
  <circle cx="100" cy="100" r="24" fill="#faf9f5" opacity="0.10"/>
  <circle cx="100" cy="100" r="19" fill="url(#coreGrad)"/>

  <!-- Accent inner highlight -->
  <circle cx="109" cy="91" r="6.5" fill="#d97757"/>

  <!-- Orbiting dot 1 — right, big -->
  <circle cx="178" cy="100" r="10" fill="#d97757"/>
  <circle cx="178" cy="100" r="10" fill="#d97757" opacity="0.3" transform="scale(1.6) translate(-44.5 -37.5)"/>

  <!-- Orbiting dot 2 — top-left -->
  <circle cx="38" cy="40" r="7" fill="#faf9f5" opacity="0.6"/>

  <!-- Orbiting dot 3 — bottom-left -->
  <circle cx="28" cy="142" r="6" fill="#d97757" opacity="0.8"/>

  <!-- Orbiting dot 4 — top-right small -->
  <circle cx="155" cy="42" r="4" fill="#faf9f5" opacity="0.35"/>

  <!-- Pulse ring -->
  <circle cx="100" cy="100" r="26" stroke="#d97757" stroke-width="1.5" fill="none" opacity="0.5"/>
  <circle cx="100" cy="100" r="38" stroke="#d97757" stroke-width="0.8" fill="none" opacity="0.2"/>
</svg>
`

const SVG_VIBRANT = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="bgV" cx="35%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#c45e3a"/>
      <stop offset="60%" stop-color="#a8401f"/>
      <stop offset="100%" stop-color="#1a0e08"/>
    </radialGradient>
    <radialGradient id="coreV" cx="38%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#ffe4d6"/>
    </radialGradient>
  </defs>

  <!-- Background gradient -->
  <rect width="200" height="200" fill="url(#bgV)" rx="40"/>

  <!-- Outer orbit ring -->
  <ellipse cx="100" cy="100" rx="82" ry="82" stroke="#faf9f5" stroke-width="0.8" opacity="0.2" fill="none"/>

  <!-- Mid orbit tilted -->
  <ellipse cx="100" cy="100" rx="78" ry="30" stroke="#faf9f5" stroke-width="1.8" opacity="0.55" fill="none"
    transform="rotate(-28 100 100)"/>

  <!-- Inner orbit -->
  <ellipse cx="100" cy="100" rx="58" ry="22" stroke="#faf9f5" stroke-width="1.3" opacity="0.4" fill="none"
    transform="rotate(38 100 100)"/>

  <!-- Core glow -->
  <circle cx="100" cy="100" r="30" fill="#ffffff" opacity="0.12"/>
  <circle cx="100" cy="100" r="22" fill="#ffffff" opacity="0.18"/>
  <circle cx="100" cy="100" r="18" fill="url(#coreV)"/>

  <!-- Accent dot -->
  <circle cx="110" cy="90" r="6" fill="#141413" opacity="0.85"/>

  <!-- Orbiting dots -->
  <circle cx="178" cy="100" r="11" fill="#faf9f5"/>
  <circle cx="36" cy="38" r="7.5" fill="#faf9f5" opacity="0.7"/>
  <circle cx="26" cy="144" r="6.5" fill="#faf9f5" opacity="0.55"/>
  <circle cx="157" cy="40" r="4.5" fill="#faf9f5" opacity="0.4"/>

  <!-- Pulse rings -->
  <circle cx="100" cy="100" r="25" stroke="#faf9f5" stroke-width="1.5" fill="none" opacity="0.45"/>
  <circle cx="100" cy="100" r="37" stroke="#faf9f5" stroke-width="0.8" fill="none" opacity="0.18"/>
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

        {/* Vibrant version */}
        <div style={{ background: '#2a1208', borderRadius: '16px', padding: '32px', marginBottom: '16px', border: '1px solid #5a2810' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#d97757', marginBottom: '20px' }}>
            ★ Versión vibrante — recomendada para redes sociales
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
            <LogoPreview svg={SVG_VIBRANT} label="Logo vibrante" />
            <div style={{ flex: 1, minWidth: '220px' }}>
              {downloads.map(d => (
                <button
                  key={d.file + '-v'}
                  onClick={() => downloadPng(SVG_VIBRANT, d.size, d.file.replace('.png', '-vibrant.png'))}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '100%', background: '#1a0e08', border: '1px solid #5a2810',
                    borderRadius: '8px', padding: '10px 14px', marginBottom: '8px',
                    cursor: 'pointer', color: '#faf9f5',
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 500 }}>{d.label}</span>
                  <span style={{ fontSize: '11px', color: '#d97757' }}>↓ {d.note}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dark version */}
        <div style={{ background: '#141413', borderRadius: '16px', padding: '32px', marginBottom: '16px' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#87867f', marginBottom: '20px' }}>
            Versión oscura — minimalista
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
