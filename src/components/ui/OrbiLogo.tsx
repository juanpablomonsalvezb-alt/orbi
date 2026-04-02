interface OrbiLogoProps {
  size?: number
  showText?: boolean
  className?: string
  color?: 'dark' | 'light'
}

export default function OrbiLogo({ size = 32, showText = true, className = '', color = 'dark' }: OrbiLogoProps) {
  const c = color === 'light' ? '#faf9f5' : '#141413'
  const c2 = color === 'light' ? 'rgba(250,249,245,0.25)' : 'rgba(20,20,19,0.18)'
  const accent = '#d97757'

  // ── Icon-only version ──
  if (!showText) {
    return (
      <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none">
        {/* Outer orbit ring */}
        <ellipse cx="24" cy="24" rx="20" ry="20" stroke={c} strokeWidth="1.2" opacity="0.15" />
        {/* Mid orbit — tilted */}
        <ellipse cx="24" cy="24" rx="20" ry="8" stroke={c} strokeWidth="0.8" opacity="0.25"
          transform="rotate(-25 24 24)" />
        {/* Inner orbit — tilted other way */}
        <ellipse cx="24" cy="24" rx="16" ry="6" stroke={c} strokeWidth="0.8" opacity="0.2"
          transform="rotate(35 24 24)" />
        {/* Central core */}
        <circle cx="24" cy="24" r="5" fill={c} />
        {/* Accent dot — inner highlight */}
        <circle cx="26" cy="22" r="1.5" fill={accent} opacity="0.9" />
        {/* Orbiting agent dots */}
        <circle cx="44" cy="24" r="2.5" fill={accent} />
        <circle cx="12" cy="10" r="2" fill={c} opacity="0.5" />
        <circle cx="36" cy="38" r="1.8" fill={c} opacity="0.4" />
        <circle cx="7" cy="30" r="1.5" fill={accent} opacity="0.5" />
      </svg>
    )
  }

  // ── Full logo with text ──
  return (
    <svg viewBox="0 0 150 40" height={size} className={className} fill="none">
      {/* Icon at left */}
      <g transform="translate(2, 2)">
        {/* Outer orbit */}
        <ellipse cx="16" cy="18" rx="15" ry="15" stroke={c} strokeWidth="0.8" opacity="0.12" />
        {/* Mid orbit tilted */}
        <ellipse cx="16" cy="18" rx="15" ry="6" stroke={c} strokeWidth="0.7" opacity="0.22"
          transform="rotate(-25 16 18)" />
        {/* Inner orbit tilted */}
        <ellipse cx="16" cy="18" rx="12" ry="4.5" stroke={c} strokeWidth="0.7" opacity="0.18"
          transform="rotate(35 16 18)" />
        {/* Core */}
        <circle cx="16" cy="18" r="4" fill={c} />
        {/* Accent inner dot */}
        <circle cx="17.5" cy="16.5" r="1.2" fill={accent} opacity="0.9" />
        {/* Orbiting dots */}
        <circle cx="31" cy="18" r="2" fill={accent} />
        <circle cx="8" cy="7" r="1.5" fill={c} opacity="0.45" />
        <circle cx="26" cy="30" r="1.3" fill={c} opacity="0.35" />
        <circle cx="3" cy="23" r="1.2" fill={accent} opacity="0.45" />
      </g>
      {/* Wordmark */}
      <text x="42" y="27" fontFamily="'Source Serif 4', Georgia, serif" fontSize="21" fontWeight="400" fill={c} letterSpacing="-0.5">
        orbbi
      </text>
    </svg>
  )
}
