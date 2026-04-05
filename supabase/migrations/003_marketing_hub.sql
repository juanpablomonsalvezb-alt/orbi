-- Content pieces
CREATE TABLE IF NOT EXISTS marketing_contenido (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE,
  tema TEXT NOT NULL,
  versiones JSONB DEFAULT '{}',
  canales_publicados TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Outreach CRM contacts
CREATE TABLE IF NOT EXISTS marketing_contactos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  cargo TEXT DEFAULT '',
  empresa_nombre TEXT DEFAULT '',
  canal TEXT DEFAULT 'whatsapp',
  telefono TEXT DEFAULT '',
  email TEXT DEFAULT '',
  linkedin_url TEXT DEFAULT '',
  estado TEXT DEFAULT 'prospecto',
  notas TEXT DEFAULT '',
  proximo_contacto DATE,
  clientes_potenciales INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- UTM trackable links
CREATE TABLE IF NOT EXISTS marketing_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  url_destino TEXT NOT NULL,
  utm_source TEXT DEFAULT '',
  utm_medium TEXT DEFAULT '',
  utm_campaign TEXT DEFAULT '',
  slug TEXT UNIQUE NOT NULL,
  clics INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- WhatsApp broadcast campaigns
CREATE TABLE IF NOT EXISTS marketing_broadcasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  mensaje TEXT NOT NULL,
  destinatarios JSONB DEFAULT '[]',
  estado TEXT DEFAULT 'borrador',
  enviados INTEGER DEFAULT 0,
  fallidos INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE marketing_contenido ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_contactos ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_broadcasts ENABLE ROW LEVEL SECURITY;

-- RLS policies (users can only see their own company's data)
CREATE POLICY "empresa_own_contenido" ON marketing_contenido FOR ALL USING (
  empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid())
);
CREATE POLICY "empresa_own_contactos" ON marketing_contactos FOR ALL USING (
  empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid())
);
CREATE POLICY "empresa_own_links" ON marketing_links FOR ALL USING (
  empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid())
);
CREATE POLICY "empresa_own_broadcasts" ON marketing_broadcasts FOR ALL USING (
  empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid())
);
