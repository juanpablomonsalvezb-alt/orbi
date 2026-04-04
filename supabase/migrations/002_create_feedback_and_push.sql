-- ============================================
-- Migration 002: Create missing tables
-- feedback + push_subscriptions
-- Run this in Supabase SQL Editor
-- ============================================

-- TABLA: feedback
-- Thumbs up/down en respuestas de agentes
CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mensaje_id UUID REFERENCES mensajes(id) ON DELETE CASCADE,
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL CHECK (tipo IN ('positivo', 'negativo')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(mensaje_id, empresa_id)
);
CREATE INDEX IF NOT EXISTS idx_feedback_empresa ON feedback(empresa_id);
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "feedback_all" ON feedback FOR ALL USING (empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid()));

-- TABLA: push_subscriptions
-- Suscripciones de notificaciones push
CREATE TABLE IF NOT EXISTS push_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  subscription JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "push_all" ON push_subscriptions FOR ALL USING (empresa_id IN (SELECT id FROM empresas WHERE user_id = auth.uid()));

-- Fix trial_ends_at default to 7 days
ALTER TABLE empresas ALTER COLUMN trial_ends_at SET DEFAULT (NOW() + INTERVAL '7 days');
