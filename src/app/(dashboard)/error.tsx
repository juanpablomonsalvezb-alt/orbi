'use client'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex h-screen items-center justify-center bg-obsidian">
      <div className="max-w-md mx-auto text-center px-6">
        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" /><path d="M12 8v4" /><path d="M12 16h.01" />
          </svg>
        </div>
        <h2 className="text-lg text-white font-medium mb-2" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
          Algo salió mal
        </h2>
        <p className="text-sm text-ceniza/60 mb-6 leading-relaxed">
          {error.message || 'Hubo un error inesperado. Por favor intenta de nuevo.'}
        </p>
        <div className="space-y-3">
          <button
            onClick={reset}
            className="block w-full bg-white/[0.08] text-white rounded-md py-2.5 text-sm font-medium hover:bg-white/[0.12] transition-colors"
          >
            Intentar de nuevo
          </button>
          <a
            href="/chat"
            className="block w-full text-sm text-ceniza/40 hover:text-white transition-colors py-2"
          >
            Volver al chat
          </a>
        </div>
      </div>
    </div>
  )
}
