'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase-client'

interface PushNotificationsProps {
  empresaId: string
}

export default function PushNotifications({ empresaId }: PushNotificationsProps) {
  const [mostrar, setMostrar] = useState(false)
  const [registrando, setRegistrando] = useState(false)

  useEffect(() => {
    // Only show if push is supported and tour is done
    if (typeof window === 'undefined') return
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return
    if (!localStorage.getItem('orbbi_tour_completed')) return
    if (localStorage.getItem('orbbi_push_asked')) return

    // Check current permission
    if (Notification.permission === 'default') {
      // Show prompt after a short delay
      const timer = setTimeout(() => setMostrar(true), 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  const activar = async () => {
    setRegistrando(true)
    try {
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') {
        localStorage.setItem('orbbi_push_asked', 'true')
        setMostrar(false)
        return
      }

      // Register service worker
      const registration = await navigator.serviceWorker.register('/sw.js')
      await navigator.serviceWorker.ready

      // Get push subscription
      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        ...(vapidKey ? { applicationServerKey: vapidKey } : {}),
      })

      // Save to Supabase
      const { error } = await supabase
        .from('push_subscriptions')
        .insert({
          empresa_id: empresaId,
          subscription: subscription.toJSON(),
        })

      if (error) {
        console.error('Error guardando suscripcion push:', error)
      }

      localStorage.setItem('orbbi_push_asked', 'true')
      setMostrar(false)
    } catch (err) {
      console.error('Error activando notificaciones:', err)
      localStorage.setItem('orbbi_push_asked', 'true')
      setMostrar(false)
    } finally {
      setRegistrando(false)
    }
  }

  const descartar = () => {
    localStorage.setItem('orbbi_push_asked', 'true')
    setMostrar(false)
  }

  if (!mostrar) return null

  return (
    <div className="fixed bottom-24 right-6 z-50 max-w-[300px] bg-white border border-[#e9e9e7] rounded-xl shadow-lg p-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-[#f7f6f3] flex items-center justify-center shrink-0 mt-0.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#37352f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-[#37352f] mb-1">Activar notificaciones</p>
          <p className="text-[12px] text-[#9b9a97] mb-3">
            Recibe alertas cuando tus agentes tengan actualizaciones importantes.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={activar}
              disabled={registrando}
              className="bg-[#37352f] text-white text-[12px] px-3 py-1.5 rounded-md hover:bg-[#2f3437] transition-colors disabled:opacity-50"
            >
              {registrando ? 'Activando...' : 'Activar'}
            </button>
            <button
              onClick={descartar}
              className="text-[12px] text-[#9b9a97] hover:text-[#37352f] transition-colors"
            >
              Ahora no
            </button>
          </div>
        </div>
        <button onClick={descartar} className="text-[#c4c4c0] hover:text-[#37352f] transition-colors shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  )
}
