import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import OrbiLogo from '@/components/ui/OrbiLogo'

export const metadata: Metadata = {
  title: 'Blog — Orbbi | Recursos para PYMEs en Latinoamérica',
  description: 'Artículos prácticos sobre gestión empresarial, finanzas, ventas y marketing para PYMEs en Latinoamérica. Aprende a llevar tu negocio al siguiente nivel.',
  openGraph: {
    title: 'Blog — Orbbi | Recursos para PYMEs en Latinoamérica',
    description: 'Artículos prácticos sobre gestión empresarial para PYMEs latinoamericanas.',
    url: '/blog',
  },
  alternates: {
    canonical: 'https://www.orbbilatam.com/blog',
  },
}

interface BlogArticulo {
  id: string
  slug: string
  titulo: string
  descripcion: string
  categoria: string
  pais_target: string
  tiempo_lectura: number
  created_at: string
}

const CATEGORIA_LABELS: Record<string, string> = {
  gestion: 'Gestión',
  finanzas: 'Finanzas',
  ventas: 'Ventas',
  marketing: 'Marketing',
  rrhh: 'RRHH',
  tecnologia: 'Tecnología',
}

async function getArticulos(): Promise<BlogArticulo[]> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data } = await supabase
      .from('blog_articulos')
      .select('id, slug, titulo, descripcion, categoria, pais_target, tiempo_lectura, created_at')
      .eq('publicado', true)
      .order('created_at', { ascending: false })
      .limit(20)

    return data || []
  } catch {
    return []
  }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })
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
            <Link href="/blog" className="text-sm text-ink font-medium">Blog</Link>
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

export default async function BlogPage() {
  const articulos = await getArticulos()

  const schemaItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Blog Orbbi — Recursos para PYMEs',
    description: 'Artículos sobre gestión empresarial para PYMEs en Latinoamérica',
    url: 'https://www.orbbilatam.com/blog',
    numberOfItems: articulos.length,
    itemListElement: articulos.map((art, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: art.titulo,
      url: `https://www.orbbilatam.com/blog/${art.slug}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaItemList) }}
      />
      <Nav />
      <main style={{ background: '#faf9f5', minHeight: '80vh' }}>
        {/* Header */}
        <div
          style={{
            borderBottom: '1px solid rgba(20,20,19,0.08)',
            padding: 'clamp(3rem, 5vw, 6rem) clamp(1.5rem, 4vw, 5rem)',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#d97757',
              marginBottom: '16px',
              fontFamily: 'var(--font-serif)',
            }}
          >
            Blog
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400,
              color: '#141413',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              margin: 0,
              maxWidth: '600px',
            }}
          >
            Recursos para llevar tu PYME al siguiente nivel
          </h1>
          <p
            style={{
              marginTop: '16px',
              fontSize: '15px',
              color: '#87867f',
              maxWidth: '500px',
              lineHeight: 1.6,
            }}
          >
            Artículos prácticos sobre gestión empresarial, finanzas, ventas y más — escritos para emprendedores latinoamericanos.
          </p>
        </div>

        {/* Articles grid */}
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: 'clamp(2rem, 4vw, 4rem) clamp(1.5rem, 4vw, 5rem)',
          }}
        >
          {articulos.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '80px 0',
                borderRadius: '12px',
                background: 'rgba(20,20,19,0.03)',
                border: '1px solid rgba(20,20,19,0.06)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '20px',
                  color: '#141413',
                  marginBottom: '8px',
                }}
              >
                Próximamente
              </p>
              <p style={{ fontSize: '14px', color: '#87867f' }}>
                Recursos prácticos para tu negocio — muy pronto.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '24px',
              }}
            >
              {articulos.map((art) => (
                <Link
                  key={art.id}
                  href={`/blog/${art.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <article
                    style={{
                      background: '#fff',
                      border: '1px solid rgba(20,20,19,0.08)',
                      borderRadius: '8px',
                      padding: '28px',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                      cursor: 'pointer',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Category badge */}
                    <div style={{ marginBottom: '14px' }}>
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
                        {CATEGORIA_LABELS[art.categoria] || art.categoria}
                      </span>
                    </div>

                    {/* Title */}
                    <h2
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '18px',
                        fontWeight: 400,
                        color: '#141413',
                        lineHeight: 1.35,
                        letterSpacing: '-0.02em',
                        marginBottom: '10px',
                        flex: 1,
                      }}
                    >
                      {art.titulo}
                    </h2>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: '13px',
                        color: '#87867f',
                        lineHeight: 1.6,
                        marginBottom: '20px',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {art.descripcion}
                    </p>

                    {/* Meta */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '12px',
                        color: '#b0ada4',
                        borderTop: '1px solid rgba(20,20,19,0.06)',
                        paddingTop: '14px',
                        marginTop: 'auto',
                      }}
                    >
                      <span>{formatDate(art.created_at)}</span>
                      <span>{art.tiempo_lectura} min de lectura</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
