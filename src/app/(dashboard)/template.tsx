// Force all dashboard pages to be dynamically rendered (not static)
// This prevents build errors from client-side libs (Supabase, PostHog)
export const dynamic = 'force-dynamic'

export default function DashboardTemplate({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
