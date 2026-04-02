interface OrbiLogoProps {
  size?: number
  showText?: boolean
  className?: string
  color?: 'light' | 'dark'
}

export default function OrbiLogo({ size = 32, showText = true, className = '', color = 'dark' }: OrbiLogoProps) {
  const c = color === 'light' ? '#ffffff' : '#0f0f0f'

  if (!showText) {
    return (
      <svg viewBox="0 0 48 48" width={size} height={size} className={className}>
        <circle cx="24" cy="24" r="13" fill="none" stroke={c} strokeWidth="1" />
        <circle cx="24" cy="24" r="4" fill={c} />
        <ellipse cx="24" cy="24" rx="22" ry="9" fill="none" stroke={c} strokeWidth="0.5" opacity="0.3" />
        <circle cx="46" cy="24" r="2.5" fill="#378ADD" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 140 40" height={size} className={className}>
      <circle cx="16" cy="20" r="9" fill="none" stroke={c} strokeWidth="1" />
      <circle cx="16" cy="20" r="3.5" fill={c} />
      <ellipse cx="16" cy="20" rx="15" ry="7" fill="none" stroke={c} strokeWidth="0.5" opacity="0.25" />
      <circle cx="31" cy="20" r="2" fill="#378ADD" />
      <text x="40" y="26" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="400" fill={c} letterSpacing="-0.5">
        orbbi
      </text>
    </svg>
  )
}
