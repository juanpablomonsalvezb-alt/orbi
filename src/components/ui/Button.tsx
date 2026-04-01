'use client'

import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: 'primary' | 'secondary'
}

export default function Button({
  variante = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base = 'rounded-[8px] px-5 py-2.5 text-[14px] font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed'

  const estilos = {
    primary: 'bg-obsidian text-white hover:bg-grafito',
    secondary: 'bg-transparent border border-ceniza/50 text-obsidian hover:bg-marfil',
  }

  return (
    <button className={`${base} ${estilos[variante]} ${className}`} {...props}>
      {children}
    </button>
  )
}
