import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Safe client creation — uses dummy values during build if env vars missing
export const supabase = url && key
  ? createClient(url, key)
  : createClient(
      'https://jzluszblmunbmvxzipjx.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6bHVzemJsbXVuYm12eHppcGp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxODA0MzksImV4cCI6MjA5MDc1NjQzOX0.tGgf-_83doc830GaVL4rnGMW6WD8ZivdVHb0JTdnTTY'
    )
