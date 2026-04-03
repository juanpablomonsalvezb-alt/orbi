---
name: landing-page-builder
description: Design and build high-converting landing pages, hero sections, feature showcases, and marketing pages. Use when the user wants to create, redesign, or optimize any public-facing page.
allowed-tools: [Read, Write, Edit, Bash, Agent, Glob, Grep, WebSearch, WebFetch, mcp__fal-ai__generate, mcp__pencil__get_screenshot, mcp__pencil__read_design_nodes, mcp__pencil__insert_design_nodes]
---

# Landing Page Builder — High-Converting Pages

## Cuándo usar

- Usuario quiere crear una landing page nueva
- Usuario quiere rediseñar el hero, pricing, features, o cualquier sección
- Usuario pide "hazlo como [referencia]" para una página web
- Usuario quiere optimizar conversión de una página existente
- Usuario dice "landing", "hero section", "above the fold", "CTA"

---

## Framework de secciones

Toda landing page efectiva sigue esta estructura:

### 1. Hero (above the fold)
```
Componentes obligatorios:
├── Headline — Beneficio principal (5-10 palabras)
├── Subheadline — Cómo lo logra (1-2 frases)
├── CTA primario — Botón de acción principal
├── CTA secundario — Alternativa de menor compromiso (opcional)
├── Visual — Screenshot, video, animación, o ilustración
└── Social proof — Logo bar, # de usuarios, rating
```

**Reglas del hero:**
- El headline debe comunicar el BENEFICIO, no la feature
- "Gestiona tu negocio con IA" ❌ → "Tu equipo directivo 24/7 por $19/mes" ✅
- CTA debe ser verbo + beneficio: "Empieza gratis" > "Registrarse"
- Visual debe mostrar el PRODUCTO, no stock photos genéricas
- Todo debe caber en la pantalla sin scroll (1440x900 desktop, 390x844 mobile)

### 2. Problem (el dolor)
```
Componentes:
├── Headline — "¿Te suena familiar?"
├── 3-4 pain points — Problemas que el usuario reconoce
└── Transición — "Existe una mejor forma"
```

### 3. Solution (la propuesta)
```
Componentes:
├── Headline — Cómo tu producto resuelve el problema
├── 3-5 features — Con ícono + título + descripción corta
├── Visual — Screenshot o demo animada
└── Beneficio implícito — Qué gana el usuario
```

### 4. How it works (3 pasos)
```
Componentes:
├── Step 1 — Registrarse / Setup (5 min)
├── Step 2 — Personalizar / Configurar
├── Step 3 — Resultados / Valor
```
**Regla**: Máximo 3 pasos. Si son más, simplificar.

### 5. Features showcase
```
Componentes:
├── Feature grid (3-6 features con ícono)
├── O Feature sections alternadas (imagen izq/der)
└── Cada feature = Título + 1 párrafo + visual
```

### 6. Social proof
```
Componentes (usar 2-3):
├── Testimonials — Foto + nombre + cargo + quote
├── Logo bar — Empresas que usan el producto
├── Numbers — "500+ empresas", "98% satisfacción"
├── Case studies — Antes/después con datos
└── Reviews — Estrellas + plataforma (G2, Capterra)
```

### 7. Pricing
```
Componentes:
├── 2-3 planes (no más)
├── Plan destacado (most popular)
├── Feature comparison table
├── FAQ bajo pricing
└── CTA en cada plan
```

### 8. FAQ
```
Componentes:
├── 5-8 preguntas frecuentes
├── Accordion expandible
└── Incluir objeciones comunes disfrazadas de pregunta
```

### 9. Final CTA
```
Componentes:
├── Headline de urgencia / resumen de valor
├── CTA grande y prominente
└── Garantía / reducción de riesgo
```

---

## Patrones de conversión probados

### Above the fold
| Patrón | Cuándo usar | Conversión esperada |
|--------|-------------|---------------------|
| **Hero + demo video** | Producto visual/complejo | 3-5% |
| **Hero + form inline** | Lead gen, B2B | 5-8% |
| **Hero + animated product** | SaaS, tech-forward | 2-4% |
| **Hero minimalista** | Brand premium | 1-3% |

### CTAs
| Texto | Contexto | Efectividad |
|-------|----------|-------------|
| "Empieza gratis" | Freemium | 5/5 |
| "Prueba 14 días gratis" | Trial | 4/5 |
| "Ver demo" | Enterprise/B2B | 4/5 |
| "Registrarse" | Genérico | 2/5 ❌ |
| "Enviar" | Formulario | 1/5 ❌ |

### Colores de CTA
- **Verde**: Seguridad, "adelante" → Mejor para registros
- **Azul**: Confianza, profesional → B2B, finanzas
- **Naranja/Amarillo**: Urgencia, energía → E-commerce, ofertas
- **Negro**: Premium, elegante → Luxury, design

---

## Implementación técnica (Next.js + Tailwind + Framer Motion)

### Estructura de componentes

```
src/components/landing/
├── Hero.tsx
├── ProblemSection.tsx
├── SolutionSection.tsx
├── HowItWorks.tsx
├── Features.tsx
├── SocialProof.tsx
├── Pricing.tsx
├── FAQ.tsx
├── FinalCTA.tsx
└── shared/
    ├── SectionWrapper.tsx    — max-width, padding, spacing
    ├── AnimatedSection.tsx   — Framer Motion fade-in on scroll
    └── CTAButton.tsx         — Variantes de botón CTA
```

### Animaciones recomendadas

```tsx
// Fade in on scroll (usar en cada sección)
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>

// Stagger children (para feature grids)
<motion.div
  variants={{
    visible: { transition: { staggerChildren: 0.1 } }
  }}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
```

### Responsive breakpoints

```
Mobile first:
├── Default (0-639px) — 1 columna, texto centrado
├── sm (640px) — Ajustes menores
├── md (768px) — 2 columnas en features
├── lg (1024px) — Layout completo desktop
├── xl (1280px) — Max-width containers
```

---

## Proceso de uso

### Crear landing nueva
1. **Definir objetivo** — ¿Qué acción quieres que tome el usuario?
2. **Mapear secciones** — Elegir de las 9 secciones cuáles usar
3. **Escribir copy** — Headline → Subheadline → CTAs → Features
4. **Diseñar layout** — Mobile first, responsive
5. **Implementar** — Next.js + Tailwind + Framer Motion
6. **Revisar** — Lighthouse, mobile, copy, CTAs

### Optimizar landing existente
1. **Auditar** — ¿Qué secciones faltan? ¿El hero es efectivo?
2. **Medir** — ¿Cuál es la tasa de conversión actual?
3. **Identificar** — ¿Dónde pierde el usuario? (heatmaps, scroll depth)
4. **Proponer** — Cambios específicos con impacto esperado
5. **Implementar** — A/B test si es posible

### Copiar referencia
1. **Capturar** — Screenshot o URL de la referencia
2. **Analizar** — ¿Qué hace bien? Layout, copy, animaciones
3. **Adaptar** — Aplicar al contexto de ORBBI (marca, producto, audiencia)
4. **Implementar** — Sin copiar literalmente, capturar la esencia

---

## Checklist pre-publicación

```
□ Hero comunica beneficio en <3 segundos
□ CTA visible sin scroll (desktop Y mobile)
□ Página carga en <3 segundos (Lighthouse >90)
□ Responsive en mobile (390px), tablet (768px), desktop (1440px)
□ Imágenes optimizadas (WebP, lazy loading)
□ Meta tags completos (title, description, OG image)
□ Analytics tracking configurado
□ Formularios funcionan (envían datos correctamente)
□ Links externos abren en nueva pestaña
□ Textos sin typos (revisar español)
```

---

## Referencias de diseño para ORBBI

- **Anthropic.com** — Minimalismo, tipografía serif, animaciones sutiles
- **Linear.app** — Dark mode elegante, micro-interacciones
- **Vercel.com** — Gradientes, code-focused, velocidad
- **Stripe.com** — Animaciones fluidas, diagrams, confianza

El estilo de ORBBI debe ser: profesional, cálido (ivory), serif (Source Serif 4), inspirado en Anthropic pero adaptado para PYMEs LATAM.
