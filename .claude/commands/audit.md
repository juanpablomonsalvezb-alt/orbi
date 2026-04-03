Ejecuta una auditoría completa de la plataforma ORBBI. No preguntes, ejecuta directamente cada paso y reporta hallazgos organizados por severidad (CRITICAL, WARNING, INFO). Corrige automáticamente todo lo que puedas.

---

## 1. BUILD Y TYPESCRIPT

- Ejecuta `npm run build` — si falla, arregla los errores y vuelve a intentar
- Ejecuta `npx tsc --noEmit` — lista errores de tipos, arregla los críticos
- Reporta: X errores build, X errores TS

## 2. CONSISTENCIA DE DATOS

**Agentes (7 especializados):**
- Gerente General (incluido en todos los planes)
- Financiero, Ventas, Marketing, RRHH, Inventario, Legal ($19/mes c/u)
- Verifica que prompts.ts tiene los 7 agentes con sus system prompts completos

**Onboarding (14 preguntas en 4 bloques):**
- Verifica que constants.ts tiene las 14 preguntas organizadas en 4 bloques
- Verifica que el formulario de onboarding las renderiza todas

**URLs:**
- Dominio: orbi-ochre.vercel.app (producción)
- NO debe existir localhost en código de producción

**Base de datos (4 tablas core):**
- empresas, contexto, conversaciones, mensajes
- Verifica que schema.sql coincide con las queries en el código

## 3. SUPABASE

- Verificar que todas las tablas del schema existen como referencias en el código
- Verificar que las políticas RLS están definidas y son correctas
- Verificar que no hay queries sin filtro de user_id/empresa_id
- Verificar que el cliente tipado de Supabase se usa correctamente

## 4. API ROUTES

Para cada archivo en src/app/api/:
- Verificar que importa y usa Supabase correctamente
- Verificar que tiene manejo de errores (try/catch)
- Verificar que valida los datos de entrada
- Verificar que la ruta de chat construye el prompt correctamente con contexto

## 5. GEMINI INTEGRATION

- Verificar que gemini.ts usa la API key desde env vars (no hardcodeada)
- Verificar que el modelo es correcto (gemini-2.0-flash)
- Verificar que hay error handling si Gemini falla
- Verificar que el streaming funciona correctamente (si aplica)

## 6. AUTH

- Verificar que login/signup usan Supabase Auth
- Verificar que las rutas protegidas verifican sesión
- Verificar que el middleware redirige correctamente
- Verificar que no hay API keys expuestas en código cliente

## 7. COMPONENTES

- Verificar que todos los imports resuelven (no hay archivos faltantes)
- Verificar que no hay componentes huérfanos (no importados por nadie)
- Verificar que los componentes de chat manejan estados de loading/error
- Verificar que el onboarding valida las respuestas antes de enviar

## 8. RUTAS Y NAVEGACIÓN

- Leer el router (App Router de Next.js) y extraer todas las rutas
- Verificar que cada page.tsx existe y renderiza correctamente
- Verificar que no hay links internos apuntando a rutas inexistentes
- Verificar que la navegación entre auth → onboarding → dashboard es correcta

## 9. SEGURIDAD

- Buscar API keys expuestas (GEMINI_API_KEY, SUPABASE keys en cliente)
- Verificar que NEXT_PUBLIC_ solo se usa para variables seguras
- Verificar que no hay tokens o credenciales hardcodeadas
- Verificar headers de seguridad en next.config

## 10. ARREGLAR

- TODO lo que encuentres roto: arréglalo
- Commit y push automáticamente
- Reporta un resumen al final con formato:

```
## AUDITORÍA ORBBI — {fecha}

### BUILD STATUS
- npm run build: PASS/FAIL
- TypeScript: PASS/FAIL

### CRITICAL
- [ ] Descripción — archivo:línea

### WARNING
- [ ] Descripción — archivo:línea

### INFO
- [ ] Descripción — archivo:línea

### Score: X/10
```
