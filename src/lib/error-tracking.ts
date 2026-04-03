/**
 * Simple error tracking — logs errors with context to console and optionally to an API
 * Can be replaced with Sentry later
 */
export function trackError(error: unknown, context?: Record<string, unknown>) {
  const err = error instanceof Error ? error : new Error(String(error))
  const payload = {
    message: err.message,
    stack: err.stack,
    context,
    timestamp: new Date().toISOString(),
    url: typeof window !== 'undefined' ? window.location.href : 'server',
  }
  console.error('[ORBBI Error]', JSON.stringify(payload))

  // In production, send to an error tracking endpoint
  if (process.env.NODE_ENV === 'production' && typeof fetch !== 'undefined') {
    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {}) // fire and forget
  }
}
