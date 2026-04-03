---
name: flow-trace
description: Trace a user flow end-to-end across frontend and backend to find bugs. Use when auditing critical paths like onboarding, chat, auth, payment.
allowed-tools: [Read, Grep, Glob, Agent, Bash]
---

# Flow Trace — Auditoría end-to-end de flujos

## Cuándo usar
- Antes de lanzar a producción
- Cuando un flujo "no funciona" sin error claro
- Al auditar flujos críticos: registro, login, onboarding, chat, pagos
- Después de cambios que tocan frontend Y backend (API routes)

## Uso
```
/flow-trace <nombre-del-flujo>
```

Ejemplos:
- `/flow-trace registro`
- `/flow-trace onboarding`
- `/flow-trace chat`
- `/flow-trace pago`

## Proceso

### Paso 1: Identificar TODOS los archivos del flujo

Para el flujo dado, encontrar:
- **Página frontend** (src/app/**/*.tsx) — el componente que el usuario ve
- **Llamadas API** — qué URLs llama, con qué método y qué body
- **API Routes** (src/app/api/**/*.ts) — los endpoints de Next.js
- **Supabase queries** — qué tablas consulta, con qué filtros
- **Middleware** (middleware.ts) — auth, redirects
- **Lib/utils** (src/lib/*.ts) — funciones auxiliares (gemini.ts, supabase.ts, prompts.ts)
- **Componentes** (src/components/**/*.tsx) — componentes reutilizados en el flujo
- **Types** (src/types/*.ts) — tipos compartidos

**LEER TODOS LOS ARCHIVOS COMPLETAMENTE. No asumir nada.**

### Paso 2: Trazar el dato paso a paso

Para CADA acción del usuario en el flujo (click botón, submit form, etc.):

```
1. FRONTEND: ¿Qué datos recoge el formulario/componente? ¿Qué nombres de campos?
2. FRONTEND: ¿Qué URL llama? ¿POST/GET? ¿Qué body envía? ¿Qué headers?
3. API ROUTE: ¿El endpoint existe en src/app/api/? ¿Recibe los mismos campos?
4. SUPABASE: ¿La query usa los campos correctos? ¿Las tablas/columnas existen en schema.sql?
5. GEMINI: Si el flujo usa IA, ¿el prompt se construye correctamente? ¿El contexto se inyecta?
6. RESPONSE: ¿Qué JSON devuelve en éxito? ¿Y en cada tipo de error?
7. FRONTEND CATCH: ¿Maneja cada código de error? ¿Muestra mensaje útil al usuario?
8. FRONTEND SUCCESS: ¿Redirige? ¿A qué URL? ¿Esa ruta existe?
```

### Paso 3: Cross-checks obligatorios

#### Nombres de campos
```
□ Los nombres de campos en el frontend COINCIDEN EXACTAMENTE con los de Supabase
□ Los tipos de datos coinciden (string vs number, etc.)
□ No hay typos (empresa_id vs empresaId, agente_tipo vs agenteTipo)
```

#### URLs y rutas
```
□ La URL que llama el frontend existe como API route en src/app/api/
□ Si el flujo genera redirects, esas rutas existen en src/app/
□ Si hay links <a href="..."> o router.push("..."), la ruta destino existe
```

#### Supabase RLS
```
□ Las políticas RLS permiten la operación (SELECT, INSERT, UPDATE, DELETE)
□ El user_id se filtra correctamente
□ No hay bypass de RLS accidental
```

#### Manejo de errores
```
□ Cada status code del API route tiene un handler en el frontend
□ Errores de red (timeout, servidor caído) muestran mensaje útil
□ Si Supabase falla, hay error handling apropiado
□ Si Gemini falla, hay fallback o mensaje claro
```

#### Auth y permisos
```
□ Si el endpoint requiere auth, se verifica el token de Supabase
□ Si la página es protegida, el middleware redirige si no hay sesión
□ No hay rutas admin sin protección
```

#### Flujo completo
```
□ El happy path funciona de principio a fin
□ Cada error path muestra feedback al usuario
□ No hay estados donde el usuario queda "colgado" sin saber qué pasó
□ Si un servicio externo falla (Gemini, Supabase), hay fallback o mensaje claro
```

### Paso 4: Reporte

```markdown
## Resultado del Flow Trace: [nombre del flujo]

### Archivos analizados
- [lista de todos los archivos leídos]

### Bugs encontrados
| # | Severidad | Archivo:línea | Problema | Solución |
|---|-----------|---------------|----------|----------|
| 1 | CRÍTICA   | file.ts:42    | ...      | ...      |

### Verificaciones pasadas
| Check | Estado |
|-------|--------|
| Campos coinciden frontend↔Supabase | ✅/❌ |
| URLs existen como rutas | ✅/❌ |
| RLS correcta | ✅/❌ |
| Errores manejados | ✅/❌ |
| Auth correcto | ✅/❌ |
| Flujo completo funciona | ✅/❌ |
```

## Catálogo de flujos de ORBBI

### Críticos (bloquean uso)
- `registro` — Registro de usuario nuevo (Supabase Auth)
- `login` — Inicio de sesión
- `onboarding` — 14 preguntas de contexto empresarial (4 bloques)
- `chat` — Enviar mensaje → API route → Gemini → guardar en Supabase → mostrar respuesta
- `nueva-conversacion` — Crear conversación con agente específico

### Importantes (afectan experiencia)
- `seleccion-agente` — Elegir entre los 7 agentes especializados
- `historial` — Cargar conversaciones previas del sidebar
- `contexto-empresa` — Inyección del contexto de negocio en cada prompt

### Usar `/flow-trace all` para auditar TODOS los flujos críticos en paralelo.

## Principio fundamental

**No confiar en nada. Leer todo. Cruzar todo.**

Un archivo solo no dice si el flujo funciona. La auditoría de flujo es CRUZAR lo que dice un archivo contra lo que dice otro. Si el frontend envía `empresa_id` y Supabase espera `company_id`, eso solo se detecta leyendo AMBOS archivos y comparando campo por campo.
