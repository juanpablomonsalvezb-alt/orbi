import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  try {
    const supabase = getSupabase()

    const { data, error } = await supabase
      .from('marketing_links')
      .select('id, url_destino, utm_source, utm_medium, utm_campaign, clics')
      .eq('slug', slug)
      .single()

    if (error || !data) {
      return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_APP_URL || 'https://www.orbbilatam.com'))
    }

    // Increment click count (fire and forget)
    supabase
      .from('marketing_links')
      .update({ clics: data.clics + 1 })
      .eq('id', data.id)
      .then(() => {})

    // Build the destination URL with UTM params
    let destUrl = data.url_destino
    try {
      const url = new URL(destUrl)
      if (data.utm_source) url.searchParams.set('utm_source', data.utm_source)
      if (data.utm_medium) url.searchParams.set('utm_medium', data.utm_medium)
      if (data.utm_campaign) url.searchParams.set('utm_campaign', data.utm_campaign)
      destUrl = url.toString()
    } catch {
      // If URL parsing fails, use as-is
    }

    return NextResponse.redirect(destUrl)
  } catch (err) {
    console.error('[/r/slug]', err)
    return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_APP_URL || 'https://www.orbbilatam.com'))
  }
}
