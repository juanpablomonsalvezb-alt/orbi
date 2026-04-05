'use client'

import { motion } from 'framer-motion'

interface OrbiLogoProps {
  size?: number
  showText?: boolean
  className?: string
  color?: 'dark' | 'light'
  animate?: boolean
}

export default function OrbiLogo({ size = 40, showText = true, className = '', color = 'dark', animate = true }: OrbiLogoProps) {
  const c = color === 'light' ? '#faf9f5' : '#141413'
  const accent = '#d97757'

  // ── Icon-only version ──
  if (!showText) {
    return (
      <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none" aria-label="Orbbi" role="img">
        {/* Outer orbit ring */}
        <ellipse cx="24" cy="24" rx="21" ry="21" stroke={c} strokeWidth="1" opacity="0.12" />
        {/* Mid orbit — tilted, animated */}
        {animate ? (
          <motion.ellipse cx="24" cy="24" rx="20" ry="8" stroke={c} strokeWidth="0.8" opacity="0.25"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '24px 24px' }}
          />
        ) : (
          <ellipse cx="24" cy="24" rx="20" ry="8" stroke={c} strokeWidth="0.8" opacity="0.25"
            transform="rotate(-25 24 24)" />
        )}
        {/* Inner orbit — tilted other way, animated */}
        {animate ? (
          <motion.ellipse cx="24" cy="24" rx="16" ry="6" stroke={c} strokeWidth="0.8" opacity="0.2"
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '24px 24px' }}
          />
        ) : (
          <ellipse cx="24" cy="24" rx="16" ry="6" stroke={c} strokeWidth="0.8" opacity="0.2"
            transform="rotate(35 24 24)" />
        )}
        {/* Central core */}
        <circle cx="24" cy="24" r="5.5" fill={c} />
        {/* Accent dot — inner highlight */}
        <circle cx="26.5" cy="22" r="1.8" fill={accent} opacity="0.9" />
        {/* Orbiting agent dots — animated */}
        {animate ? (
          <>
            <motion.circle cx="0" cy="0" r="2.8" fill={accent}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '24px 24px', offsetPath: 'path("M4,24 A20,8 -25 1,1 44,24 A20,8 -25 1,1 4,24")' }}
              transform="translate(44, 24)"
            />
            <motion.circle cx="0" cy="0" r="2" fill={c} opacity="0.5"
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '24px 24px' }}
              transform="translate(12, 10)"
            />
            <motion.circle cx="0" cy="0" r="1.8" fill={accent} opacity="0.5"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '24px 24px' }}
              transform="translate(7, 30)"
            />
          </>
        ) : (
          <>
            <circle cx="44" cy="24" r="2.8" fill={accent} />
            <circle cx="12" cy="10" r="2" fill={c} opacity="0.5" />
            <circle cx="7" cy="30" r="1.8" fill={accent} opacity="0.5" />
          </>
        )}
        {/* Pulse on core */}
        {animate && (
          <motion.circle cx="24" cy="24" r="5.5" fill="none" stroke={accent} strokeWidth="0.8"
            animate={{ r: [5.5, 10, 5.5], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </svg>
    )
  }

  // ── Full logo with text ──
  return (
    <svg viewBox="0 0 155 44" height={size} className={className} fill="none" aria-label="Orbbi" role="img">
      {/* Icon at left */}
      <g transform="translate(2, 2)">
        {/* Outer orbit */}
        <ellipse cx="18" cy="20" rx="17" ry="17" stroke={c} strokeWidth="0.8" opacity="0.1" />
        {/* Mid orbit tilted — animated */}
        {animate ? (
          <motion.ellipse cx="18" cy="20" rx="17" ry="6.5" stroke={c} strokeWidth="0.7" opacity="0.22"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '18px 20px' }}
          />
        ) : (
          <ellipse cx="18" cy="20" rx="17" ry="6.5" stroke={c} strokeWidth="0.7" opacity="0.22"
            transform="rotate(-25 18 20)" />
        )}
        {/* Inner orbit tilted — animated */}
        {animate ? (
          <motion.ellipse cx="18" cy="20" rx="13" ry="5" stroke={c} strokeWidth="0.7" opacity="0.18"
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '18px 20px' }}
          />
        ) : (
          <ellipse cx="18" cy="20" rx="13" ry="5" stroke={c} strokeWidth="0.7" opacity="0.18"
            transform="rotate(35 18 20)" />
        )}
        {/* Core */}
        <circle cx="18" cy="20" r="4.5" fill={c} />
        {/* Accent inner dot */}
        <circle cx="20" cy="18" r="1.4" fill={accent} opacity="0.9" />
        {/* Orbiting dots — animated */}
        {animate ? (
          <>
            <motion.circle r="2.2" fill={accent}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '18px 20px' }}
              cx="35" cy="20"
            />
            <motion.circle r="1.6" fill={c} opacity="0.45"
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '18px 20px' }}
              cx="9" cy="7"
            />
            <motion.circle r="1.3" fill={accent} opacity="0.45"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '18px 20px' }}
              cx="4" cy="26"
            />
          </>
        ) : (
          <>
            <circle cx="35" cy="20" r="2.2" fill={accent} />
            <circle cx="9" cy="7" r="1.6" fill={c} opacity="0.45" />
            <circle cx="4" cy="26" r="1.3" fill={accent} opacity="0.45" />
          </>
        )}
        {/* Pulse */}
        {animate && (
          <motion.circle cx="18" cy="20" r="4.5" fill="none" stroke={accent} strokeWidth="0.6"
            animate={{ r: [4.5, 9, 4.5], opacity: [0.35, 0, 0.35] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </g>
      {/* Wordmark — bigger */}
      <text x="44" y="29" fontFamily="'Source Serif 4', Georgia, serif" fontSize="23" fontWeight="400" fill={c} letterSpacing="-0.5">
        orbbi
      </text>
    </svg>
  )
}
