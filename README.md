# Orbbi

**El agente que orbita tu negocio 24/7**

Orbbi es un SaaS que ofrece agentes de IA especializados como gerentes de operaciones virtuales para PYMEs en Latinoamérica.

## Stack

- **Frontend**: Next.js 16 (App Router) + Tailwind v4
- **Backend**: API Routes (serverless)
- **Base de datos**: Supabase (PostgreSQL + Auth + RLS)
- **IA**: Gemini 2.0 Flash
- **Deploy**: Vercel

## Agentes disponibles

| Agente | Área | Incluido en |
|--------|------|-------------|
| Gerente General | Estrategia y operaciones | Todos los planes |
| Financiero | Flujo de caja, márgenes, costos | Equipo, Empresa |
| Ventas | Pipeline, conversión, clientes | Equipo, Empresa |
| Marketing | Campañas, posicionamiento, ROI | À la carte |
| RRHH | Personas, cultura, desempeño | À la carte |
| Inventario | Stock, logística, proveedores | À la carte |
| Legal | Contratos, cumplimiento, riesgos | À la carte |

## Setup local

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus keys de Supabase y Gemini

# Ejecutar schema en Supabase
# Copiar supabase/schema.sql en el SQL Editor de tu proyecto Supabase

# Iniciar dev server
npm run dev
```

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de tu proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key de Supabase |
| `GEMINI_API_KEY` | API key de Google AI Studio |

## Estructura

```
src/
├── app/
│   ├── (auth)/          # Login, registro
│   ├── (dashboard)/     # Chat, onboarding (protegido)
│   ├── api/             # Chat, conversaciones, onboarding
│   └── precios/         # Página de pricing
├── components/
│   ├── chat/            # ChatInput, Messages, Sidebar, Bubble
│   ├── onboarding/      # Form, QuestionBlock
│   └── ui/              # Button, Card, Input, Loading, Logo
├── lib/
│   ├── prompts.ts       # System prompts de los 7 agentes
│   ├── gemini.ts        # Wrapper de Gemini 2.0 Flash
│   ├── constants.ts     # 14 preguntas del onboarding
│   └── supabase-*.ts    # Clientes Supabase
├── types/               # TypeScript types
docs/                    # Knowledge base por agente
supabase/
├── schema.sql           # DDL completo con RLS
├── migrations/          # Migraciones incrementales
└── seed.sql             # Datos de prueba
```
