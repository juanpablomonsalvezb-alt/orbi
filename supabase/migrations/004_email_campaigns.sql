-- Email campaigns
CREATE TABLE IF NOT EXISTS marketing_campanas_email (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  tipo TEXT DEFAULT 'gremio', -- gremio | camara | aceleradora | medio | empresa
  asunto TEXT NOT NULL,
  cuerpo_html TEXT NOT NULL,
  cuerpo_texto TEXT DEFAULT '',
  estado TEXT DEFAULT 'borrador', -- borrador | activa | pausada | completada
  total_enviados INTEGER DEFAULT 0,
  total_abiertos INTEGER DEFAULT 0,
  total_clicks INTEGER DEFAULT 0,
  total_rebotes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Individual email sends tracking
CREATE TABLE IF NOT EXISTS marketing_emails_enviados (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campana_id UUID REFERENCES marketing_campanas_email(id) ON DELETE CASCADE,
  empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE,
  destinatario_nombre TEXT NOT NULL,
  destinatario_cargo TEXT DEFAULT '',
  destinatario_org TEXT DEFAULT '',
  destinatario_email TEXT NOT NULL,
  pais TEXT DEFAULT '',
  tipo_org TEXT DEFAULT '',
  estado TEXT DEFAULT 'pendiente', -- pendiente | enviado | abierto | rebotado | respondio
  resend_message_id TEXT DEFAULT '',
  enviado_at TIMESTAMPTZ,
  abierto_at TIMESTAMPTZ,
  notas TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- LATAM prospects (platform-level, not tenant-specific)
CREATE TABLE IF NOT EXISTS marketing_prospectos_latam (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,         -- Org name
  cargo_destinatario TEXT DEFAULT '',
  email TEXT NOT NULL,
  pais TEXT NOT NULL,           -- CL | MX | CO | PE | AR | UY
  tipo TEXT NOT NULL,           -- gremio | camara | aceleradora | medio | gobierno | fondo
  sitio_web TEXT DEFAULT '',
  pymnes_aprox INTEGER DEFAULT 0,
  notas TEXT DEFAULT '',
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE marketing_campanas_email ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_emails_enviados ENABLE ROW LEVEL SECURITY;
-- prospectos_latam is intentionally open (platform data, no PII)

CREATE POLICY "empresa_own_campanas_email" ON marketing_campanas_email FOR ALL USING (
  empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid())
);
CREATE POLICY "empresa_own_emails_enviados" ON marketing_emails_enviados FOR ALL USING (
  empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid())
);

-- Seed: 60 LATAM organizations for cold outreach
INSERT INTO marketing_prospectos_latam (nombre, cargo_destinatario, email, pais, tipo, sitio_web, pymnes_aprox, notas) VALUES

-- ── CHILE ──
('CONAPYME', 'Presidente', 'contacto@conapyme.cl', 'CL', 'gremio', 'conapyme.cl', 15000, 'Confederación Nacional de la Micro, Pequeña y Mediana Empresa. Mayor gremio PYME de Chile.'),
('ASECH', 'Director Ejecutivo', 'contacto@asech.cl', 'CL', 'gremio', 'asech.cl', 3000, 'Asociación de Emprendedores de Chile. Red activa de emprendedores y startups.'),
('Cámara de Comercio de Santiago', 'Gerente General', 'info@ccs.cl', 'CL', 'camara', 'ccs.cl', 8000, 'Principal cámara comercial de Chile. 8K empresas asociadas.'),
('CORFO', 'Director de Transformación Digital', 'info@corfo.cl', 'CL', 'gobierno', 'corfo.cl', 0, 'Agencia de fomento productivo. Activa en digitalización PYME.'),
('Startup Chile', 'Director de Programas', 'startup@corfo.cl', 'CL', 'aceleradora', 'startupchile.cl', 0, 'Principal aceleradora pública de Chile. Red de +2000 startups.'),
('Endeavor Chile', 'Director', 'chile@endeavor.org', 'CL', 'aceleradora', 'endeavor.cl', 0, 'Red de emprendedores de alto impacto. Conexiones clave con medianas empresas.'),
('SERCOTEC', 'Director Regional', 'info@sercotec.cl', 'CL', 'gobierno', 'sercotec.cl', 50000, 'Servicio de Cooperación Técnica. Apoyo directo a microempresas.'),
('Diario Financiero', 'Editor PYMEs', 'redaccion@df.cl', 'CL', 'medio', 'df.cl', 0, 'Principal medio de negocios de Chile. Sección dedicada a PYMEs y emprendimiento.'),
('El Mercurio Negocios', 'Editor', 'economia@elmercurio.com', 'CL', 'medio', 'elmercurio.com', 0, 'Suplemento de negocios del principal diario chileno.'),
('CPC', 'Presidente', 'info@cpc.cl', 'CL', 'gremio', 'cpc.cl', 25000, 'Confederación de la Producción y el Comercio. Paraguas de los grandes gremios empresariales.'),

-- ── MÉXICO ──
('CONCANACO SERVYTUR', 'Presidente Nacional', 'presidencia@concanaco.com.mx', 'MX', 'camara', 'concanaco.com.mx', 600000, 'Confederación de Cámaras Nacionales de Comercio. 600K+ empresas afiliadas.'),
('COPARMEX', 'Director General', 'contacto@coparmex.org.mx', 'MX', 'gremio', 'coparmex.org.mx', 36000, 'Confederación Patronal de México. 36K empresas. Muy activos en digitalización.'),
('CANACINTRA', 'Presidente', 'canacintra@canacintra.org.mx', 'MX', 'gremio', 'canacintra.org.mx', 20000, 'Cámara Nacional de la Industria de la Transformación. Fuerte en pymes industriales.'),
('Instituto Nacional del Emprendedor', 'Director', 'inadem@economia.gob.mx', 'MX', 'gobierno', 'inadem.gob.mx', 0, 'Apoyo federal a emprendedores. Programas de digitalización activos.'),
('Startup México', 'Director', 'hola@startupmx.com', 'MX', 'aceleradora', 'startupmx.com', 0, 'Comunidad y aceleradora de startups. Red de 10K+ emprendedores.'),
('Endeavor México', 'Director', 'mexico@endeavor.org', 'MX', 'aceleradora', 'endeavor.org.mx', 0, 'Red de emprendedores de alto impacto en México.'),
('México Business', 'Editor', 'editorial@mexicobusiness.news', 'MX', 'medio', 'mexicobusiness.news', 0, 'Medio de negocios enfocado en transformación digital de empresas.'),
('Expansión', 'Editor PYMEs', 'redaccion@expansion.mx', 'MX', 'medio', 'expansion.mx', 0, 'Principal revista de negocios de México. Millones de lectores.'),
('ProMéxico Digital', 'Director', 'info@promexico.mx', 'MX', 'gobierno', 'promexico.mx', 0, 'Agencia de promoción comercial. Conexiones con empresas exportadoras.'),
('AMEXCAP', 'Presidente', 'info@amexcap.com', 'MX', 'fondo', 'amexcap.com', 0, 'Asociación Mexicana de Capital Privado. Red de fondos que invierten en PYMEs.'),

-- ── COLOMBIA ──
('ACOPI', 'Presidente Nacional', 'info@acopi.org.co', 'CO', 'gremio', 'acopi.org.co', 25000, 'Asociación Colombiana de las Micro, Pequeñas y Medianas Empresas. +25K miembros.'),
('FENALCO', 'Presidente', 'info@fenalco.com.co', 'CO', 'gremio', 'fenalco.com.co', 100000, 'Federación Nacional de Comerciantes. 100K+ empresas del comercio.'),
('iNNpulsa Colombia', 'Presidente', 'innpulsa@mincit.gov.co', 'CO', 'gobierno', 'innpulsa.com.co', 0, 'Unidad de desarrollo e innovación del Ministerio de Comercio. Programas de digitalización.'),
('Confecámaras', 'Presidente Ejecutivo', 'confecamaras@confecamaras.org.co', 'CO', 'camara', 'confecamaras.org.co', 250000, 'Red Cámaras de Comercio de Colombia. Alcance a toda la base empresarial.'),
('Apps.co MinTIC', 'Director', 'appsco@mintic.gov.co', 'CO', 'gobierno', 'appsco.co', 0, 'Programa del Ministerio TIC para digitalización de emprendedores.'),
('Endeavor Colombia', 'Director', 'colombia@endeavor.org', 'CO', 'aceleradora', 'endeavor.co', 0, 'Red de emprendedores de alto impacto en Colombia.'),
('La República', 'Editor Economía', 'redaccion@larepublica.co', 'CO', 'medio', 'larepublica.co', 0, 'Principal diario económico de Colombia.'),
('Semana Económica', 'Editor', 'digital@semana.com', 'CO', 'medio', 'semana.com', 0, 'Revista Semana, sección económica. Gran alcance en empresarios colombianos.'),
('ProColombia', 'Director TIC', 'info@procolombia.co', 'CO', 'gobierno', 'procolombia.co', 0, 'Agencia de promoción comercial, turismo e inversión de Colombia.'),
('Bancóldex', 'VP Digital', 'contactenos@bancoldex.com', 'CO', 'fondo', 'bancoldex.com', 0, 'Banco de desarrollo empresarial. Financia y apoya digitalización de PYMEs.'),

-- ── PERÚ ──
('ASEP', 'Presidente', 'info@asep.pe', 'PE', 'gremio', 'asep.pe', 15000, 'Asociación de Emprendedores del Perú. 15K+ miembros activos.'),
('CONFIEP', 'Presidente', 'webmaster@confiep.pe', 'PE', 'gremio', 'confiep.pe', 50000, 'Confederación Nacional de Instituciones Empresariales Privadas.'),
('Cámara de Comercio de Lima', 'Gerente General', 'informes@camaralima.org.pe', 'PE', 'camara', 'camaralima.org.pe', 10000, 'Principal cámara comercial del Perú. 10K empresas asociadas.'),
('Startup Perú', 'Director', 'startupperu@produce.gob.pe', 'PE', 'gobierno', 'startupperu.pe', 0, 'Programa del Ministerio de Producción para startups y PYMEs tecnológicas.'),
('Endeavor Perú', 'Director', 'peru@endeavor.org', 'PE', 'aceleradora', 'endeavor.pe', 0, 'Red de emprendedores de alto impacto en Perú.'),
('COFIDE', 'Gerente Digital', 'cofide@cofide.com.pe', 'PE', 'fondo', 'cofide.com.pe', 0, 'Corporación Financiera de Desarrollo. Banca de segundo piso para PYMEs.'),
('Gestión', 'Editor Digital', 'digital@gestion.pe', 'PE', 'medio', 'gestion.pe', 0, 'Principal diario de negocios del Perú.'),
('Semana Económica Perú', 'Editor', 'redaccion@semanaeconomica.com', 'PE', 'medio', 'semanaeconomica.com', 0, 'Revista de negocios líder en Perú. Cobertura PYME activa.'),
('PRODUCE', 'Director MYPE', 'postmaster@produce.gob.pe', 'PE', 'gobierno', 'produce.gob.pe', 0, 'Ministerio de la Producción. Programas de apoyo a micro y pequeña empresa.'),
('PromPerú', 'Director Comercio', 'postmaster@promperu.gob.pe', 'PE', 'gobierno', 'promperu.gob.pe', 0, 'Comisión de Promoción del Perú. Apoyo a exportadores PYMEs.'),

-- ── ARGENTINA ──
('CAME', 'Presidente', 'info@came.org.ar', 'AR', 'gremio', 'came.org.ar', 600000, 'Confederación Argentina de la Mediana Empresa. 600K PYMEs. El mayor gremio PYME de LATAM.'),
('Endeavor Argentina', 'Director', 'argentina@endeavor.org', 'AR', 'aceleradora', 'endeavor.org.ar', 0, 'Red de emprendedores de alto impacto en Argentina.'),
('ASEA', 'Presidente', 'info@asea.org.ar', 'AR', 'gremio', 'asea.org.ar', 5000, 'Asociación de Empresarios Argentinos. Representación empresarial activa.'),
('ACDE Argentina', 'Director', 'info@acde.org.ar', 'AR', 'gremio', 'acde.org.ar', 3000, 'Asociación Cristiana de Dirigentes de Empresa. Red de CEOs y directivos.'),
('NXTP Labs', 'Managing Partner', 'info@nxtplabs.com', 'AR', 'fondo', 'nxtplabs.com', 0, 'Principal fondo de venture capital para startups en LATAM.'),
('Area Tres', 'Director', 'info@areatres.com.ar', 'AR', 'aceleradora', 'areatres.com.ar', 0, 'Hub de innovación empresarial en Argentina.'),
('La Nación Economía', 'Editor PYMEs', 'pymes@lanacion.com.ar', 'AR', 'medio', 'lanacion.com.ar', 0, 'Sección PYMEs del principal diario de Argentina.'),
('Infobae Economía', 'Editor', 'redaccion@infobae.com', 'AR', 'medio', 'infobae.com', 0, 'Medio digital de mayor audiencia en Argentina.'),
('Ministerio PYME Argentina', 'Secretario', 'info@pymes.gob.ar', 'AR', 'gobierno', 'pymes.gob.ar', 0, 'Secretaría de la Pequeña y Mediana Empresa del gobierno argentino.'),
('FONTAR / MINCYT', 'Director Fondos', 'fontar@mincyt.gob.ar', 'AR', 'gobierno', 'mincyt.gob.ar', 0, 'Fondo Tecnológico Argentino. Financiamiento para innovación en empresas.'),

-- ── URUGUAY ──
('CNCS', 'Presidente', 'info@cncs.com.uy', 'UY', 'camara', 'cncs.com.uy', 14000, 'Cámara Nacional de Comercio y Servicios del Uruguay. 14K empresas afiliadas.'),
('ACDE Uruguay', 'Secretario Ejecutivo', 'secretaria@acde.org.uy', 'UY', 'gremio', 'acde.org.uy', 1500, 'Asociación Cristiana de Dirigentes de Empresa Uruguay. Red de empresarios.'),
('CIU', 'Presidente', 'info@ciu.com.uy', 'UY', 'gremio', 'ciu.com.uy', 5000, 'Cámara de Industrias del Uruguay. Representación industrial nacional.'),
('INEFOP', 'Director Ejecutivo', 'inefop@inefop.org.uy', 'UY', 'gobierno', 'inefop.org.uy', 0, 'Instituto Nacional de Empleo y Formación Profesional. Programas de capacitación.'),
('ANII', 'Presidente', 'anni@anii.org.uy', 'UY', 'gobierno', 'anii.org.uy', 0, 'Agencia Nacional de Investigación e Innovación. Financiamiento para innovación empresarial.'),
('Uruguay XXI', 'Director', 'info@uruguayxxi.gub.uy', 'UY', 'gobierno', 'uruguayxxi.gub.uy', 0, 'Instituto de Promoción de Inversiones y Exportaciones. Apoyo a empresas exportadoras.'),
('Endeavor Uruguay', 'Director', 'uruguay@endeavor.org', 'UY', 'aceleradora', 'endeavor.uy', 0, 'Red de emprendedores de alto impacto en Uruguay.'),
('El País Economía', 'Editor', 'economia@elpais.com.uy', 'UY', 'medio', 'elpais.com.uy', 0, 'Sección económica del principal diario de Uruguay.'),
('Búsqueda', 'Editor', 'redaccion@busqueda.com.uy', 'UY', 'medio', 'busqueda.com.uy', 0, 'Semanario de análisis político y económico más influyente de Uruguay.'),
('MIEM Uruguay', 'Director PYMEs', 'miem@miem.gub.uy', 'UY', 'gobierno', 'miem.gub.uy', 0, 'Ministerio de Industria, Energía y Minería. Programa PYMEs y digitalización.');
