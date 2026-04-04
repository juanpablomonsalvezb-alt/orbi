'use client'

import { useEffect, useState } from 'react'
import posthog from 'posthog-js'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('orbbi_cookies')
    if (!consent) {
      setVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('orbbi_cookies', 'accepted')
    posthog.opt_in_capturing()
    setVisible(false)
  }

  const handleReject = () => {
    localStorage.setItem('orbbi_cookies', 'rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 bg-white border border-[#37352f]/10 rounded-lg shadow-lg p-4">
      <p className="text-sm text-[#37352f] mb-3">
        Usamos cookies de analytics para mejorar el producto.
      </p>
      <div className="flex gap-2">
        <button
          onClick={handleAccept}
          className="flex-1 bg-[#37352f] text-white text-sm rounded-md py-1.5 px-3 hover:opacity-90 transition-opacity"
        >
          Aceptar
        </button>
        <button
          onClick={handleReject}
          className="flex-1 border border-[#37352f]/20 text-[#37352f] text-sm rounded-md py-1.5 px-3 hover:bg-[#37352f]/5 transition-colors"
        >
          Rechazar
        </button>
      </div>
    </div>
  )
}
