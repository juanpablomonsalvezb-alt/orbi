import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  if (slug) {
    // Return single article with full content
    const { data, error } = await supabase
      .from('blog_articulos')
      .select('id, slug, titulo, descripcion, contenido_md, contenido_html, categoria, pais_target, keywords, tiempo_lectura, created_at, updated_at')
      .eq('slug', slug)
      .eq('publicado', true)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    return NextResponse.json({ articulo: data })
  }

  // Return list without heavy content fields
  const { data, error } = await supabase
    .from('blog_articulos')
    .select('id, slug, titulo, descripcion, categoria, pais_target, keywords, tiempo_lectura, created_at')
    .eq('publicado', true)
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
  }

  return NextResponse.json({ articulos: data || [] })
}
