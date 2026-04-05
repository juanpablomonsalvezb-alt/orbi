import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import OrbiLogo from '@/components/ui/OrbiLogo'
import { markdownToHtml } from '@/lib/markdown'

interface BlogArticulo {
  id: string
  slug: string
  titulo: string
  descripcion: string
  contenido_md: string
  categoria: string
  pais_target: string
  keywords: string[]
  tiempo_lectura: number
  created_at: string
}

interface BlogArticuloCard {
  id: string
  slug: string
  titulo: string
  descripcion: string
  categoria: string
  pais_target: string
  keywords: string[]
  tiempo_lectura: number
  created_at: string
}

interface PageProps {
  params: Promise<{ slug: string }>
}

const CATEGORIA_LABELS: Record<string, string> = {
  gestion: 'Gestión',
  finanzas: 'Finanzas',
  ventas: 'Ventas',
  marketing: 'Marketing',
  rrhh: 'RRHH',
  tecnologia: 'Tecnología',
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

async function getArticulo(slug: string): Promise<BlogArticulo | null> {
  try {
    const supabase = getSupabase()
    const { data } = await supabase
      .from('blog_articulos')
      .select('id, slug, titulo, descripcion, contenido_md, categoria, pais_target, keywords, tiempo_lectura, created_at')
      .eq('slug', slug)
      .eq('publicado', true)
      .single()
    return data || null
  } catch {
    return null
  }
}

async function getRelatedArticulos(currentSlug: string, categoria: string): Promise<BlogArticuloCard[]> {
  try {
    const supabase = getSupabase()
    const { data } = await supabase
      .from('blog_articulos')
      .select('id, slug, titulo, descripcion, categoria, pais_target, keywords, tiempo_lectura, created_at')
      .eq('publicado', true)
      .eq('categoria', categoria)
      .neq('slug', currentSlug)
      .order('created_at', { ascending: false })
      .limit(3)

    const sameCategory: BlogArticuloCard[] = data || []
    if (sameCategory.length >= 3) return sameCategory

    // Fill with other articles if not enough in same category
    const needed = 3 - sameCategory.length
    const { data: others } = await supabase
      .from('blog_articulos')
      .select('id, slug, titulo, descripcion, categoria, pais_target, keywords, tiempo_lectura, created_at')
      .eq('publicado', true)
      .neq('slug', currentSlug)
      .neq('categoria', categoria)
      .order('created_at', { ascending: false })
      .limit(needed)

    const otherArticles: BlogArticuloCard[] = others || []
    return [...sameCategory, ...otherArticles]
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const articulo = await getArticulo(slug)

  if (!articulo) {
    return { title: 'Artículo no encontrado — Orbbi Blog' }
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.orbbilatam.com'

  return {
    title: `${articulo.titulo} — Orbbi Blog`,
    description: articulo.descripcion,
    keywords: articulo.keywords,
    openGraph: {
      title: articulo.titulo,
      description: articulo.descripcion,
      url: `/blog/${articulo.slug}`,
      type: 'article',
      images: [
        {
          url: `/blog/${articulo.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: articulo.titulo,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: articulo.titulo,
      description: articulo.descripcion,
      images: [`${baseUrl}/blog/${articulo.slug}/opengraph-image`],
    },
  }
}

function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-ivory-mid/90 backdrop-blur-sm border-b border-border-light">
      <div className="max-w-[1200px] mx-auto" style={{ padding: '0 clamp(1.5rem, 4vw, 5rem)' }}>
        <div className="h-[68px] flex items-center justify-between">
          <Link href="/"><OrbiLogo size={26} color="dark" /></Link>
          <div className="hidden md:flex items-center space-x-10">
            <Link href="/#producto" className="text-sm text-muted hover:text-ink transition-colors duration-200">Producto</Link>
            <Link href="/#agentes" className="text-sm text-muted hover:text-ink transition-colors duration-200">Agentes</Link>
            <Link href="/precios" className="text-sm text-muted hover:text-ink transition-colors duration-200">Precios</Link>
            <Link href="/blog" className="text-sm text-muted hover:text-ink transition-colors duration-200">Blog</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-sm text-muted hover:text-ink transition-colors duration-200">Entrar</Link>
            <Link href="/demo" className="rounded-[4px] bg-ink text-ivory px-4 py-2 text-[13px] font-medium hover:bg-ink-mid transition-colors duration-200">
              Ver demo gratis
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="bg-ivory-mid border-t border-border-light" style={{ padding: 'clamp(2.5rem, 4vw, 4rem) 0' }}>
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4" style={{ padding: '0 clamp(1.5rem, 4vw, 5rem)' }}>
        <OrbiLogo size={22} color="dark" />
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-[12px] text-muted hover:text-ink transition-colors duration-200">Inicio</Link>
          <Link href="/blog" className="text-[12px] text-muted hover:text-ink transition-colors duration-200">Blog</Link>
          <Link href="/precios" className="text-[12px] text-muted hover:text-ink transition-colors duration-200">Precios</Link>
          <Link href="/login" className="text-[12px] text-muted hover:text-ink transition-colors duration-200">Entrar</Link>
        </div>
        <p className="text-[11px] text-muted">© 2026 Orbbi</p>
      </div>
    </footer>
  )
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogArticuloPage({ params }: PageProps) {
  const { slug } = await params
  const articulo = await getArticulo(slug)

  if (!articulo) {
    notFound()
  }

  const related: BlogArticuloCard[] = await getRelatedArticulos(slug, articulo.categoria)
  const contentHtml = markdownToHtml(articulo.contenido_md)

  // Insert CTA roughly in the middle of the article
  const halfPoint = Math.floor(contentHtml.length / 2)
  const insertAfter = contentHtml.indexOf('</p>', halfPoint)
  const ctaHtml = `
    <div style="background:rgba(217,119,87,0.06);border:1px solid rgba(217,119,87,0.2);border-radius:8px;padding:24px 28px;margin:36px 0;">
      <p style="font-family:var(--font-serif);font-size:17px;color:#141413;margin:0 0 8px 0;font-weight:400;">
        ¿Quieres que Orbbi te ayude con esto?
      </p>
      <p style="font-size:13px;color:#87867f;margin:0 0 16px 0;line-height:1.6;">
        Orbbi tiene agentes especializados que conocen tu negocio y te asisten 24/7 — sin prompt engineering.
      </p>
      <a href="/demo" style="display:inline-block;background:#141413;color:#faf9f5;font-size:13px;font-weight:500;padding:10px 20px;border-radius:4px;text-decoration:none;">
        Ver demo gratis →
      </a>
    </div>
  `

  const finalHtml =
    insertAfter > 0
      ? contentHtml.slice(0, insertAfter + 4) + ctaHtml + contentHtml.slice(insertAfter + 4)
      : contentHtml + ctaHtml

  return (
    <>
      <Nav />
      <main style={{ background: '#faf9f5', minHeight: '80vh' }}>
        <div
          style={{
            maxWidth: '740px',
            margin: '0 auto',
            padding: 'clamp(2rem, 4vw, 4rem) clamp(1.5rem, 4vw, 3rem)',
          }}
        >
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" style={{ marginBottom: '32px' }}>
            <ol
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                listStyle: 'none',
                margin: 0,
                padding: 0,
                fontSize: '12px',
                color: '#b0ada4',
              }}
            >
              <li><Link href="/" style={{ color: '#b0ada4', textDecoration: 'none' }}>Inicio</Link></li>
              <li>›</li>
              <li><Link href="/blog" style={{ color: '#b0ada4', textDecoration: 'none' }}>Blog</Link></li>
              <li>›</li>
              <li style={{ color: '#87867f', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {articulo.titulo}
              </li>
            </ol>
          </nav>

          {/* Category badge */}
          <div style={{ marginBottom: '16px' }}>
            <span
              style={{
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#d97757',
                background: 'rgba(217,119,87,0.08)',
                padding: '4px 10px',
                borderRadius: '100px',
                border: '1px solid rgba(217,119,87,0.2)',
              }}
            >
              {CATEGORIA_LABELS[articulo.categoria] || articulo.categoria}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 400,
              color: '#141413',
              lineHeight: 1.2,
              letterSpacing: '-0.03em',
              margin: '0 0 16px 0',
            }}
          >
            {articulo.titulo}
          </h1>

          {/* Meta */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              fontSize: '12px',
              color: '#b0ada4',
              marginBottom: '40px',
              paddingBottom: '32px',
              borderBottom: '1px solid rgba(20,20,19,0.08)',
            }}
          >
            <span>{formatDate(articulo.created_at)}</span>
            <span>·</span>
            <span>{articulo.tiempo_lectura} min de lectura</span>
          </div>

          {/* Article content */}
          <div
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: finalHtml }}
            style={{
              fontSize: '16px',
              lineHeight: 1.75,
              color: '#3a3936',
            }}
          />
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div
            style={{
              borderTop: '1px solid rgba(20,20,19,0.08)',
              padding: 'clamp(2rem, 4vw, 4rem) clamp(1.5rem, 4vw, 5rem)',
              maxWidth: '1200px',
              margin: '0 auto',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '20px',
                fontWeight: 400,
                color: '#141413',
                marginBottom: '24px',
                letterSpacing: '-0.02em',
              }}
            >
              Más recursos para tu negocio
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '20px',
              }}
            >
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <article
                    style={{
                      background: '#fff',
                      border: '1px solid rgba(20,20,19,0.08)',
                      borderRadius: '8px',
                      padding: '20px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '11px',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#d97757',
                        display: 'block',
                        marginBottom: '8px',
                      }}
                    >
                      {CATEGORIA_LABELS[rel.categoria] || rel.categoria}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '15px',
                        fontWeight: 400,
                        color: '#141413',
                        lineHeight: 1.4,
                        margin: '0 0 8px 0',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {rel.titulo}
                    </h3>
                    <p style={{ fontSize: '12px', color: '#b0ada4' }}>
                      {rel.tiempo_lectura} min de lectura
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
