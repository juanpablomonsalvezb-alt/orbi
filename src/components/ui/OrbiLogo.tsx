interface OrbiLogoProps {
  size?: number
  showText?: boolean
  className?: string
}

// Logo de ORBBI: órbita con punto central y agente orbitante
export default function OrbiLogo({ size = 32, showText = true, className = '' }: OrbiLogoProps) {
  if (!showText) {
    return (
      <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
        <circle cx="24" cy="24" r="13" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="5" fill="currentColor" />
        <ellipse cx="24" cy="24" rx="22" ry="10" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
        <circle cx="46" cy="24" r="3" fill="#378ADD" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 160 48" height={size} className={className}>
      <circle cx="18" cy="24" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="24" r="4" fill="currentColor" />
      <ellipse cx="18" cy="24" rx="18" ry="8" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.35" />
      <circle cx="36" cy="24" r="2" fill="#378ADD" />
      <text x="44" y="31" fontFamily="Inter, sans-serif" fontSize="22" fontWeight="500" fill="currentColor" letterSpacing="-0.5">
        orbbi
      </text>
    </svg>
  )
}
