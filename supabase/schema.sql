-- ============================================
-- ORBBI — Schema de base de datos
-- "El agente que orbita tu negocio 24/7"
-- ============================================

-- Habilitar extensión para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLA: empresas
-- Cada usuario registrado = una empresa
-- ============================================
CREATE TABLE empresas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  onboarding_completado BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- TABLA: contexto
-- Respuestas del onboarding (14 preguntas)
-- Cada fila = una pregunta respondida
-- ============================================
CREATE TABLE contexto (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  pregunta TEXT NOT NULL,
  respuesta TEXT NOT NULL,
  bloque INTEGER NOT NULL CHECK (bloque BETWEEN 1 AND 4),
  orden INTEGER NOT NULL CHECK (orden BETWEEN 1 AND 14),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(empresa_id, orden)
);

-- ============================================
-- TABLA: conversaciones
-- Cada empresa puede tener múltiples chats
-- ============================================
CREATE TABLE conversaciones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL DEFAULT 'Nueva conversación',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- TABLA: mensajes
-- Historial de cada conversación
-- rol: 'user' | 'assistant'
-- ============================================
CREATE TABLE mensajes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversacion_id UUID NOT NULL REFERENCES conversaciones(id) ON DELETE CASCADE,
  rol TEXT NOT NULL CHECK (rol IN ('user', 'assistant')),
  contenido TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- ÍNDICES para performance
-- ============================================
CREATE INDEX idx_contexto_empresa ON contexto(empresa_id);
CREATE INDEX idx_conversaciones_empresa ON conversaciones(empresa_id);
CREATE INDEX idx_mensajes_conversacion ON mensajes(conversacion_id);
CREATE INDEX idx_mensajes_created ON mensajes(conversacion_id, created_at);
CREATE INDEX idx_empresas_user ON empresas(user_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- Cada empresa solo ve sus propios datos
-- ============================================

-- Activar RLS en todas las tablas
ALTER TABLE empresas ENABLE ROW LEVEL SECURITY;
ALTER TABLE contexto ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE mensajes ENABLE ROW LEVEL SECURITY;

-- Políticas para empresas: solo el dueño ve/modifica su empresa
CREATE POLICY "empresas_select" ON empresas
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "empresas_insert" ON empresas
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "empresas_update" ON empresas
  FOR UPDATE USING (user_id = auth.uid());

-- Políticas para contexto: solo la empresa dueña
CREATE POLICY "contexto_select" ON contexto
  FOR SELECT USING (
    empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid())
  );

CREATE POLICY "contexto_insert" ON contexto
  FOR INSERT WITH CHECK (
    empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid())
  );

CREATE POLICY "contexto_update" ON contexto
  FOR UPDATE USING (
    empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid())
  );

-- Políticas para conversaciones: solo la empresa dueña
CREATE POLICY "conversaciones_select" ON conversaciones
  FOR SELECT USING (
    empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid())
  );

CREATE POLICY "conversaciones_insert" ON conversaciones
  FOR INSERT WITH CHECK (
    empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid())
  );

CREATE POLICY "conversaciones_update" ON conversaciones
  FOR UPDATE USING (
    empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid())
  );

CREATE POLICY "conversaciones_delete" ON conversaciones
  FOR DELETE USING (
    empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid())
  );

-- Políticas para mensajes: acceso via conversación de la empresa
CREATE POLICY "mensajes_select" ON mensajes
  FOR SELECT USING (
    conversacion_id IN (
      SELECT c.id FROM conversaciones c
      JOIN empresas e ON e.id = c.empresa_id
      WHERE e.user_id = auth.uid()
    )
  );

CREATE POLICY "mensajes_insert" ON mensajes
  FOR INSERT WITH CHECK (
    conversacion_id IN (
      SELECT c.id FROM conversaciones c
      JOIN empresas e ON e.id = c.empresa_id
      WHERE e.user_id = auth.uid()
    )
  );

-- ============================================
-- FUNCIÓN: actualizar updated_at automáticamente
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER trigger_empresas_updated
  BEFORE UPDATE ON empresas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_contexto_updated
  BEFORE UPDATE ON contexto
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_conversaciones_updated
  BEFORE UPDATE ON conversaciones
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
