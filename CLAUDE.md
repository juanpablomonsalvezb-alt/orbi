# ORBBI — Instrucciones del Proyecto

## Comportamiento del Agente
- **Selección automática de skills**: Cuando el usuario pida cualquier tarea, analiza los 43 skills disponibles en `.claude/skills/` y activa los que sean relevantes sin preguntar. Combina múltiples skills si la tarea lo requiere.
- **Ejecución directa**: No pedir confirmación para tareas de desarrollo, diseño o marketing. Ejecutar y mostrar resultado. Solo confirmar antes de acciones destructivas (borrar archivos, push a producción, etc.).
- **Idioma**: Responder siempre en español a menos que el usuario escriba en inglés.

## Qué es ORBBI
Plataforma SaaS que ofrece agentes virtuales de gestión IA para PYMEs en Latinoamérica. "El agente que orbita tu negocio 24/7".

## Tech Stack
- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- **Backend**: Next.js API Routes (serverless)
- **Database**: Supabase (PostgreSQL + Auth + RLS)
- **AI/LLM**: Google Gemini 2.0 Flash
- **Animation**: Framer Motion
- **Deploy**: Vercel

## Estructura del Proyecto
```
src/
├── app/
│   ├── (auth)/          # Login, signup
│   ├── (dashboard)/     # Chat, onboarding (protegidas)
│   └── api/chat/        # API route para Gemini
├── components/
│   ├── chat/            # ChatMessages, ChatInput, MessageBubble, ChatSidebar
│   ├── onboarding/      # OnboardingForm, QuestionBlock
│   └── landing/         # Hero, Pricing, AgentNetwork
├── lib/
│   ├── prompts.ts       # System prompts de los 7 agentes (ARCHIVO CLAVE)
│   ├── gemini.ts        # Wrapper de Gemini 2.0 Flash
│   ├── constants.ts     # 14 preguntas de onboarding
│   └── supabase.ts      # Cliente de Supabase
└── types/               # Tipos compartidos
```

## Base de Datos (4 tablas)
- `empresas` — datos de la empresa (user_id, nombre, onboarding_completado)
- `contexto` — respuestas del onboarding (empresa_id, pregunta, respuesta, bloque, orden)
- `conversaciones` — chats (empresa_id, titulo, agente_tipo)
- `mensajes` — historial (conversacion_id, rol, contenido)

## Los 7 Agentes
1. **Gerente General** — incluido en todos los planes
2. **Financiero** — $19/mes
3. **Ventas** — $19/mes
4. **Marketing** — $19/mes
5. **RRHH** — $19/mes
6. **Inventario** — $19/mes
7. **Legal** — $19/mes

## Convenciones de Código
- Idioma del código: inglés para variables/funciones, español para contenido de usuario
- Componentes: PascalCase
- Funciones/variables: camelCase
- Archivos: kebab-case
- Usar Tailwind CSS v4 — NO CSS modules
- Usar Framer Motion para animaciones
- Tipografía: Source Serif 4 (serif), system sans-serif
- Colores: ivory (#FFFFF0) / dark ivory backgrounds, diseño minimalista

## Variables de Entorno
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
GEMINI_API_KEY=
NEXT_PUBLIC_APP_URL=
```

## Reglas Importantes
- NUNCA exponer GEMINI_API_KEY en código del cliente (solo server-side en API routes)
- SIEMPRE filtrar por user_id/empresa_id en queries de Supabase
- Las respuestas de los agentes deben ser específicas al negocio (usar contexto del onboarding)
- Cada agente tiene su propio system prompt en prompts.ts con frameworks especializados
- El contexto del onboarding se inyecta en CADA conversación con el agente

## Deploy
- **Producción**: Vercel (auto-deploy desde main)
- **URL**: orbi-ochre.vercel.app

## Skills Disponibles
- `/flow-trace <flujo>` — Auditar un flujo end-to-end
- `/audit` — Auditoría completa de la plataforma
- `/viralidad-organica` — Crear contenido viral para TikTok/Instagram
- `/comprehensive-codebase-audit` — Auditoría multi-dimensional del codebase
