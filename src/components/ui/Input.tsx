'use client'

import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div>
      {label && (
        <label className="text-label mb-2 block">{label}</label>
      )}
      <input
        className={`w-full rounded-[8px] border border-humo px-3.5 py-2.5 text-[14px] font-normal
                    placeholder:text-ceniza bg-transparent
                    focus:outline-none focus:border-obsidian transition-colors
                    ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-[12px] text-red-500 mt-1">{error}</p>}
    </div>
  )
}
