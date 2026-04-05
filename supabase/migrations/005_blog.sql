CREATE TABLE IF NOT EXISTS blog_articulos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  titulo TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  contenido_md TEXT NOT NULL,
  contenido_html TEXT DEFAULT '',
  categoria TEXT DEFAULT 'gestion', -- gestion | finanzas | ventas | marketing | rrhh | tecnologia
  pais_target TEXT DEFAULT 'LATAM', -- CL | MX | CO | PE | AR | UY | LATAM
  keywords TEXT[] DEFAULT '{}',
  publicado BOOLEAN DEFAULT false,
  tiempo_lectura INTEGER DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Public read access (SEO needs public access)
ALTER TABLE blog_articulos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_blog" ON blog_articulos FOR SELECT USING (publicado = true);
CREATE POLICY "service_write_blog" ON blog_articulos FOR ALL USING (true) WITH CHECK (true);
