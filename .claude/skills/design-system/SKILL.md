---
name: design-system
description: Create and maintain visual design systems — color palettes, typography scales, spacing, component tokens, dark/light themes. Use when the user wants to define, audit, or refine the visual identity of a product.
allowed-tools: [Read, Write, Edit, Bash, Agent, Glob, Grep, WebSearch, WebFetch, mcp__fal-ai__generate, mcp__pencil__get_screenshot, mcp__pencil__read_design_nodes]
---

# Design System — Visual Identity & Component Tokens

## Cuándo usar

- Usuario quiere definir o cambiar la paleta de colores
- Usuario pide crear un design system o guía de estilo
- Usuario quiere auditar la consistencia visual del producto
- Usuario pide tokens de diseño (spacing, typography, shadows, radii)
- Usuario dice "colores", "tipografía", "tema oscuro", "design tokens"
- Usuario quiere generar variantes de un componente (hover, active, disabled)

---

## Proceso

### Paso 1: Auditoría visual actual

Antes de proponer cambios, entender qué existe:

```
1. Leer tailwind.config.ts / globals.css — colores y tokens actuales
2. Leer los componentes principales — qué clases de Tailwind usan
3. Buscar inconsistencias — colores hardcodeados, valores mágicos
4. Capturar screenshot actual si hay editor visual disponible
```

### Paso 2: Definir tokens de diseño

#### Colores

```
Estructura recomendada:
├── Brand
│   ├── primary (acción principal, CTAs)
│   ├── secondary (acciones secundarias)
│   └── accent (highlights, badges)
├── Neutral
│   ├── background (bg principal)
│   ├── surface (cards, modals)
│   ├── border (líneas, divisores)
│   └── text (primary, secondary, muted)
├── Semantic
│   ├── success (verde)
│   ├── warning (amarillo)
│   ├── error (rojo)
│   └── info (azul)
```

Para cada color definir:
- **Base** (500)
- **Light** (100-400) para backgrounds y hover
- **Dark** (600-900) para texto y active states
- **Contrast** texto que va sobre ese color

#### Tipografía

```
Scale recomendado (Major Third 1.25):
├── xs: 0.75rem (12px) — captions, labels
├── sm: 0.875rem (14px) — body small, metadata
├── base: 1rem (16px) — body text
├── lg: 1.125rem (18px) — body large
├── xl: 1.25rem (20px) — h4
├── 2xl: 1.5rem (24px) — h3
├── 3xl: 1.875rem (30px) — h2
├── 4xl: 2.25rem (36px) — h1
├── 5xl: 3rem (48px) — hero
├── 6xl: 3.75rem (60px) — display

Weights:
├── normal: 400 — body text
├── medium: 500 — emphasis
├── semibold: 600 — headings
├── bold: 700 — strong emphasis
```

#### Spacing

```
Scale (base 4px):
├── 0: 0px
├── 1: 4px (0.25rem)
├── 2: 8px (0.5rem)
├── 3: 12px (0.75rem)
├── 4: 16px (1rem)
├── 5: 20px (1.25rem)
├── 6: 24px (1.5rem)
├── 8: 32px (2rem)
├── 10: 40px (2.5rem)
├── 12: 48px (3rem)
├── 16: 64px (4rem)
├── 20: 80px (5rem)
├── 24: 96px (6rem)
```

#### Shadows

```
├── sm: sombra sutil (cards elevadas)
├── md: sombra media (dropdowns, popovers)
├── lg: sombra fuerte (modals)
├── xl: sombra dramática (hero elements)
```

#### Border Radius

```
├── sm: 4px — badges, chips
├── md: 8px — buttons, inputs
├── lg: 12px — cards
├── xl: 16px — modals, containers
├── full: 9999px — avatars, pills
```

### Paso 3: Implementar en Tailwind CSS v4

Para ORBBI que usa Tailwind v4:

```css
/* globals.css */
@theme {
  --color-primary: #...;
  --color-primary-light: #...;
  --color-primary-dark: #...;
  /* etc */
  
  --font-serif: 'Source Serif 4', serif;
  --font-sans: system-ui, sans-serif;
  
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
}
```

### Paso 4: Generar componentes base

Para cada componente generar variantes:
- **States**: default, hover, active, focus, disabled
- **Sizes**: sm, md, lg
- **Variants**: primary, secondary, ghost, outline

Componentes fundamentales:
1. Button
2. Input
3. Card
4. Badge
5. Avatar
6. Modal/Dialog
7. Navigation
8. Message Bubble (específico de ORBBI)

### Paso 5: Documentar

Generar un archivo `DESIGN-SYSTEM.md` con:
- Paleta de colores con hex codes
- Scale tipográfico
- Componentes con ejemplos de uso
- Do's and Don'ts

---

## Herramientas de generación

### Generar paleta con IA
Usar fal-ai para generar mockups visuales de la paleta:
```
/design-system generate palette [mood: professional|playful|bold|minimal]
```

### Auditar consistencia
```
/design-system audit
```
Busca:
- Colores hardcodeados fuera del sistema
- Valores de spacing no estándar
- Tipografías no definidas en tokens
- Componentes sin estados hover/focus

### Tema oscuro
```
/design-system dark-mode
```
Genera variantes dark automáticas basadas en la paleta light.

---

## Principios de diseño para ORBBI

1. **Profesional pero accesible** — PYMEs LATAM, no startups Silicon Valley
2. **Tipografía serif** — Source Serif 4 da autoridad y confianza
3. **Colores cálidos** — Ivory/cream backgrounds, no blanco puro
4. **Minimalista** — Menos es más, inspirado en Anthropic
5. **Animaciones sutiles** — Framer Motion para transiciones, no decoración
6. **Jerarquía clara** — El usuario debe saber dónde mirar primero
