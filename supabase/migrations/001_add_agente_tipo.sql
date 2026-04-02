-- Migración: agregar campo agente_tipo a conversaciones
-- Ejecutar si la tabla ya existe sin este campo

ALTER TABLE conversaciones
ADD COLUMN IF NOT EXISTS agente_tipo TEXT NOT NULL DEFAULT 'general'
CHECK (agente_tipo IN ('general', 'financiero', 'ventas', 'marketing', 'rrhh', 'inventario', 'legal'));

-- Actualizar conversaciones existentes al tipo general
UPDATE conversaciones SET agente_tipo = 'general' WHERE agente_tipo IS NULL;
