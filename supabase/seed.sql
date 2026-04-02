-- ============================================
-- ORBBI — Datos de prueba
-- Ejecutar DESPUÉS de schema.sql
-- ============================================

-- Nota: para pruebas locales, crear un usuario en Supabase Auth primero
-- y reemplazar 'USER_ID_AQUI' con el UUID real del usuario.

-- Ejemplo de empresa de prueba (descomentar y ajustar):
/*
INSERT INTO empresas (user_id, nombre, email, onboarding_completado) VALUES
('USER_ID_AQUI', 'Café Don Pedro', 'pedro@cafedonpedro.cl', true);

-- Contexto de onboarding de ejemplo
INSERT INTO contexto (empresa_id, pregunta, respuesta, bloque, orden) VALUES
((SELECT id FROM empresas WHERE nombre = 'Café Don Pedro'), '¿A qué se dedica exactamente tu empresa?', 'Cafetería y pastelería artesanal. Vendemos café de especialidad, pasteles y sandwiches. Tenemos un local en Providencia y vendemos por Rappi.', 1, 1),
((SELECT id FROM empresas WHERE nombre = 'Café Don Pedro'), '¿Cuántos años lleva operando?', '4 años', 1, 2),
((SELECT id FROM empresas WHERE nombre = 'Café Don Pedro'), '¿Cuántas personas trabajan contigo?', '8 personas: 2 baristas, 2 pasteleros, 1 cajera, 1 repartidor, 1 administradora y yo.', 1, 3),
((SELECT id FROM empresas WHERE nombre = 'Café Don Pedro'), '¿Cuál es tu mayor dolor o problema hoy?', 'No sé realmente cuánto gano al final del mes. Las ventas subieron pero siento que la plata no alcanza igual.', 1, 4),
((SELECT id FROM empresas WHERE nombre = 'Café Don Pedro'), '¿Cuánto vendes aproximadamente al mes?', 'Entre $6M y $8M CLP dependiendo del mes. Diciembre fue de $10M.', 2, 5),
((SELECT id FROM empresas WHERE nombre = 'Café Don Pedro'), '¿Cuáles son tus 3 principales costos fijos?', 'Arriendo $1.2M, sueldos $3.5M, insumos (café, harina, etc) más o menos $1.5M.', 2, 6),
((SELECT id FROM empresas WHERE nombre = 'Café Don Pedro'), '¿Sabes cuál es tu margen de ganancia?', 'No estoy seguro. Creo que anda por el 25-30% pero nunca lo he calculado bien.', 2, 7),
((SELECT id FROM empresas WHERE nombre = 'Café Don Pedro'), '¿Tienes deudas o créditos activos?', 'Sí, un crédito pyme del BancoEstado de $3M que pago en cuotas de $150K/mes. Me quedan 18 meses.', 2, 8),
((SELECT id FROM empresas WHERE nombre = 'Café Don Pedro'), '¿Quién es tu cliente típico?', 'Oficinistas del sector, 25-45 años. Vienen por el café de la mañana y muchos almuerzan con nosotros. Los de Rappi son más jóvenes.', 3, 9),
((SELECT id FROM empresas WHERE nombre = 'Café Don Pedro'), '¿Cómo consigues clientes nuevos hoy?', 'Instagram, boca a boca y la ubicación. También Rappi nos trae gente. Nunca he hecho publicidad pagada.', 3, 10),
((SELECT id FROM empresas WHERE nombre = 'Café Don Pedro'), '¿Tienes competidores directos? ¿Quiénes?', 'Hay 3 cafeterías en las 2 cuadras de alrededor. Starbucks a 3 cuadras. Pero nuestro café es mejor y los clientes lo saben.', 3, 11),
((SELECT id FROM empresas WHERE nombre = 'Café Don Pedro'), '¿Qué quieres lograr en los próximos 6 meses?', 'Quiero entender bien mis números, subir el margen, y evaluar si abro un segundo local en Ñuñoa.', 4, 12),
((SELECT id FROM empresas WHERE nombre = 'Café Don Pedro'), '¿Qué decisiones te quitan más el sueño?', 'Si debo subir los precios o si pierdo clientes. Y si es momento de abrir el segundo local o es muy arriesgado.', 4, 13),
((SELECT id FROM empresas WHERE nombre = 'Café Don Pedro'), '¿Qué información necesitas ver cada semana?', 'Ventas totales, cuánto gasté, cuánto me quedó de ganancia, y cómo van las ventas por Rappi vs local.', 4, 14);

-- Conversación de ejemplo con Gerente General
INSERT INTO conversaciones (empresa_id, titulo, agente_tipo) VALUES
((SELECT id FROM empresas WHERE nombre = 'Café Don Pedro'), 'Chat con Gerente General', 'general');
*/
