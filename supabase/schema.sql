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
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'solo', 'equipo', 'empresa')),
  trial_ends_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '48 hours'),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  subscription_status TEXT DEFAULT 'trialing',
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
  orden INTEGER NOT NULL CHECK (orden BETWEEN 1 AND 7),
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
  agente_tipo TEXT NOT NULL DEFAULT 'general' CHECK (agente_tipo IN ('general', 'financiero', 'ventas', 'marketing', 'rrhh', 'inventario', 'legal')),
  estilo TEXT NOT NULL DEFAULT 'directo' CHECK (estilo IN ('directo', 'didactico', 'estrategico')),
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

-- ============================================
-- TABLA: archivos
-- Archivos subidos por usuarios para compartir con agentes
-- ============================================
CREATE TABLE archivos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  tipo TEXT NOT NULL,
  tamano INTEGER NOT NULL,
  storage_path TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_archivos_empresa ON archivos(empresa_id);
ALTER TABLE archivos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "archivos_select" ON archivos FOR SELECT USING (empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid()));
CREATE POLICY "archivos_insert" ON archivos FOR INSERT WITH CHECK (empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid()));
CREATE POLICY "archivos_delete" ON archivos FOR DELETE USING (empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid()));

-- ============================================
-- TABLA: empresa_usuarios (multi-user support)
-- ============================================
CREATE TABLE empresa_usuarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rol TEXT NOT NULL DEFAULT 'miembro' CHECK (rol IN ('admin', 'miembro')),
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(empresa_id, user_id)
);
CREATE INDEX idx_empresa_usuarios_empresa ON empresa_usuarios(empresa_id);
CREATE INDEX idx_empresa_usuarios_user ON empresa_usuarios(user_id);
ALTER TABLE empresa_usuarios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "empresa_usuarios_select" ON empresa_usuarios FOR SELECT USING (empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid()));
CREATE POLICY "empresa_usuarios_insert" ON empresa_usuarios FOR INSERT WITH CHECK (empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid()));
CREATE POLICY "empresa_usuarios_delete" ON empresa_usuarios FOR DELETE USING (empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid()));

-- ============================================
-- MIGRACIÓN: WhatsApp Integration
-- Columna telefono para vincular empresa con número de WhatsApp
-- ============================================
ALTER TABLE empresas ADD COLUMN IF NOT EXISTS telefono TEXT;
CREATE INDEX IF NOT EXISTS idx_empresas_telefono ON empresas(telefono);

-- ============================================
-- TABLA: memorias
-- Insights extraídos de conversaciones por los agentes
-- ============================================
CREATE TABLE memorias (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  agente_tipo TEXT NOT NULL,
  categoria TEXT NOT NULL CHECK (categoria IN ('dato', 'decision', 'tarea', 'alerta', 'meta')),
  contenido TEXT NOT NULL,
  fuente_conversacion_id UUID REFERENCES conversaciones(id) ON DELETE SET NULL,
  activa BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_memorias_empresa ON memorias(empresa_id);
ALTER TABLE memorias ENABLE ROW LEVEL SECURITY;
CREATE POLICY "memorias_select" ON memorias FOR SELECT USING (empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid()));
CREATE POLICY "memorias_insert" ON memorias FOR INSERT WITH CHECK (empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid()));
CREATE POLICY "memorias_update" ON memorias FOR UPDATE USING (empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid()));

-- ============================================
-- TABLA: tareas
-- Acciones recomendadas por agentes con seguimiento
-- ============================================
CREATE TABLE tareas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  agente_tipo TEXT NOT NULL,
  titulo TEXT NOT NULL,
  descripcion TEXT,
  estado TEXT NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'en_progreso', 'completada', 'descartada')),
  prioridad TEXT NOT NULL DEFAULT 'media' CHECK (prioridad IN ('alta', 'media', 'baja')),
  fecha_limite DATE,
  fuente_conversacion_id UUID REFERENCES conversaciones(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_tareas_empresa ON tareas(empresa_id);
ALTER TABLE tareas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tareas_select" ON tareas FOR SELECT USING (empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid()));
CREATE POLICY "tareas_insert" ON tareas FOR INSERT WITH CHECK (empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid()));
CREATE POLICY "tareas_update" ON tareas FOR UPDATE USING (empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid()));

-- ============================================
-- TABLA: feedback
-- Thumbs up/down en respuestas de agentes
-- ============================================
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mensaje_id UUID REFERENCES mensajes(id) ON DELETE CASCADE,
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL CHECK (tipo IN ('positivo', 'negativo')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(mensaje_id, empresa_id)
);
CREATE INDEX idx_feedback_empresa ON feedback(empresa_id);
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "feedback_all" ON feedback FOR ALL USING (empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid()));

-- ============================================
-- TABLA: push_subscriptions
-- Suscripciones de notificaciones push
-- ============================================
CREATE TABLE push_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  subscription JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "push_all" ON push_subscriptions FOR ALL USING (empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid()));
