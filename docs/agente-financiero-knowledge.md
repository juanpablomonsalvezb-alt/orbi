# Base de Conocimiento — Agente Financiero (CFO Virtual) para PYMEs LATAM

> **Alcance**: Empresas de 5 a 50 empleados en América Latina.
> **Objetivo**: Proveer análisis, diagnóstico y recomendaciones financieras accionables con datos y ejemplos reales de la región.

---

## 1. Análisis Financiero para PYMEs

### 1.1 Cómo leer un Estado de Resultados (P&L) línea por línea

El Estado de Resultados muestra si la empresa **gana o pierde dinero** en un período. Cada línea se lee de arriba hacia abajo, como un embudo que filtra los ingresos hasta llegar a la utilidad neta.

**Ejemplo: Panadería "El Trigal" — Marzo 2026 (CLP)**

| Línea | Concepto | Monto (CLP) | % de Ventas | Qué revisar |
|-------|---------|-------------|-------------|-------------|
| 1 | **Ingresos por ventas** | 18.000.000 | 100% | ¿Crecen MoM? ¿Estacionalidad? |
| 2 | (-) Devoluciones y descuentos | (540.000) | 3,0% | Si > 5%, hay problema de calidad o política de descuentos agresiva |
| 3 | **= Ingresos netos** | 17.460.000 | 97,0% | Base real de facturación |
| 4 | (-) Costo de ventas (COGS) | (8.190.000) | 45,5% | Materia prima + mano de obra directa + CIF directos |
| 5 | **= Utilidad bruta** | 9.270.000 | 51,5% | Margen bruto saludable en alimentos: 45-60% |
| 6 | (-) Gastos de administración | (2.700.000) | 15,0% | Sueldos admin, arriendo oficina, contabilidad |
| 7 | (-) Gastos de venta | (1.800.000) | 10,0% | Comisiones, publicidad, despacho |
| 8 | **= Utilidad operacional (EBIT)** | 4.770.000 | 26,5% | Si < 10%, revisar estructura de costos |
| 9 | (-) Gastos financieros | (360.000) | 2,0% | Intereses de créditos, comisiones bancarias |
| 10 | (+) Otros ingresos | 90.000 | 0,5% | Arriendos de espacio, venta de activos |
| 11 | **= Utilidad antes de impuestos** | 4.500.000 | 25,0% | Base para calcular impuesto a la renta |
| 12 | (-) Impuesto a la renta (27%) | (1.215.000) | 6,8% | Tasa depende del régimen y país |
| 13 | **= Utilidad neta** | 3.285.000 | 18,3% | Lo que realmente queda para el dueño |

**Reglas de lectura rápida:**
- **Margen bruto cayó**: el problema está en costos de producción o precios de venta.
- **Margen bruto estable pero utilidad neta cae**: los gastos operacionales están creciendo más rápido que las ventas.
- **Gastos financieros > 5% de ventas**: la empresa está sobreendeudada.
- **Utilidad neta negativa por 3+ meses consecutivos**: activar plan de contingencia inmediato.

---

### 1.2 Balance General simplificado para PYMEs

El Balance muestra **qué tiene la empresa (activos), qué debe (pasivos) y cuánto le pertenece al dueño (patrimonio)** en un momento dado.

**Ejemplo: Distribuidora "Logística Sur" — 31 de marzo 2026 (MXN)**

| **ACTIVOS** | MXN | **PASIVOS + PATRIMONIO** | MXN |
|---|---|---|---|
| **Activo Corriente** | | **Pasivo Corriente** | |
| Caja y bancos | 280.000 | Proveedores por pagar | 620.000 |
| Cuentas por cobrar | 850.000 | Crédito bancario CP | 300.000 |
| Inventario | 1.200.000 | Impuestos por pagar | 180.000 |
| Anticipos a proveedores | 150.000 | Sueldos por pagar | 220.000 |
| **Total corriente** | **2.480.000** | **Total corriente** | **1.320.000** |
| **Activo No Corriente** | | **Pasivo No Corriente** | |
| Maquinaria y equipo | 1.800.000 | Crédito bancario LP | 900.000 |
| (-) Depreciación acumulada | (540.000) | | |
| Vehículos | 650.000 | **Total no corriente** | **900.000** |
| **Total no corriente** | **1.910.000** | | |
| | | **PATRIMONIO** | |
| | | Capital social | 800.000 |
| | | Utilidades retenidas | 1.370.000 |
| | | **Total patrimonio** | **2.170.000** |
| **TOTAL ACTIVOS** | **4.390.000** | **TOTAL P + P** | **4.390.000** |

**Qué revisar primero:**
1. **¿Activo corriente > Pasivo corriente?** Sí (2.480.000 > 1.320.000) → puede pagar deudas de corto plazo.
2. **¿Las cuentas por cobrar están creciendo más rápido que las ventas?** → Posible problema de cobranza.
3. **¿El inventario está rotando?** → Si crece sin que crezcan las ventas, hay mercancía estancada.
4. **¿La deuda total es mayor que el patrimonio?** Total pasivo = 2.220.000 vs patrimonio = 2.170.000 → ratio de 1,02 → aceptable pero al límite.

---

### 1.3 Los 10 Ratios Financieros Clave

Cada ratio incluye fórmula, ejemplo numérico, y semáforos por industria.

#### 1. Razón Corriente (Liquidez)

```
Razón Corriente = Activo Corriente / Pasivo Corriente
```

**Ejemplo**: 2.480.000 / 1.320.000 = **1,88**

| Semáforo | Valor | Interpretación |
|----------|-------|---------------|
| ROJO | < 1,0 | No puede pagar deudas de corto plazo |
| AMARILLO | 1,0 - 1,3 | Ajustado, cualquier imprevisto genera crisis |
| VERDE | 1,3 - 2,0 | Saludable |
| AZUL | > 2,5 | Tiene demasiado capital inmovilizado en activo corriente |

#### 2. Prueba Ácida

```
Prueba Ácida = (Activo Corriente - Inventario) / Pasivo Corriente
```

**Ejemplo**: (2.480.000 - 1.200.000) / 1.320.000 = **0,97**

| Semáforo | Valor | Interpretación |
|----------|-------|---------------|
| ROJO | < 0,5 | Muy dependiente del inventario para pagar |
| AMARILLO | 0,5 - 0,8 | Vigilar de cerca |
| VERDE | 0,8 - 1,5 | Adecuada |

#### 3. Capital de Trabajo Neto

```
Capital de Trabajo = Activo Corriente - Pasivo Corriente
```

**Ejemplo**: 2.480.000 - 1.320.000 = **1.160.000 MXN** → hay colchón.

**Regla PYME**: el capital de trabajo debe cubrir al menos 1 mes de gastos operacionales.

#### 4. Margen Bruto

```
Margen Bruto = (Ventas - Costo de Ventas) / Ventas × 100
```

**Ejemplo**: (18.000.000 - 8.190.000) / 18.000.000 = **54,5%**

| Industria (LATAM) | Margen bruto típico |
|---|---|
| Comercio / retail | 25 - 40% |
| Alimentos / restaurantes | 55 - 70% |
| Servicios profesionales | 60 - 80% |
| Manufactura ligera | 30 - 45% |
| Construcción | 20 - 35% |
| Software / SaaS | 70 - 90% |
| Distribución | 15 - 25% |

#### 5. Margen Neto

```
Margen Neto = Utilidad Neta / Ventas × 100
```

**Ejemplo**: 3.285.000 / 18.000.000 = **18,3%**

| Semáforo | Valor | Interpretación |
|----------|-------|---------------|
| ROJO | < 2% | Apenas sobrevive |
| AMARILLO | 2 - 5% | Funciona pero sin colchón |
| VERDE | 5 - 15% | Saludable para PYME |
| AZUL | > 15% | Excelente — reinvertir o acumular reservas |

#### 6. EBITDA

```
EBITDA = Utilidad Operacional + Depreciación + Amortización
```

**Ejemplo**: 4.770.000 + 450.000 = **5.220.000 CLP**

El EBITDA es la capacidad real de generar caja operativa. Los bancos lo usan para evaluar créditos.

**Regla bancaria**: Deuda total / EBITDA < 3x para aprobar crédito.

#### 7. Rotación de Inventario

```
Rotación = Costo de Ventas Anual / Inventario Promedio
```

**Ejemplo**: 98.280.000 / 1.200.000 = **81,9 veces al año** (cada 4,5 días rota para panadería)

| Industria | Rotación típica (veces/año) |
|---|---|
| Alimentos perecederos | 52 - 104 |
| Retail ropa | 4 - 8 |
| Ferretería | 6 - 12 |
| Farmacia | 8 - 15 |
| Electrónica | 6 - 10 |

#### 8. Días de Cobro (DSO)

```
DSO = (Cuentas por Cobrar / Ventas) × 365
```

**Ejemplo**: (850.000 / 12.000.000 ventas anuales) × 365 = **25,8 días** (usando cifras proporcionales mensuales: 850.000 / (1.000.000 ventas mensuales) × 30 = **25,5 días**)

| Semáforo | DSO | Interpretación |
|----------|-----|---------------|
| VERDE | < 30 días | Excelente cobranza |
| AMARILLO | 30 - 60 días | Normal en LATAM B2B |
| ROJO | > 60 días | Problema serio de cobranza |
| NEGRO | > 90 días | Riesgo de incobrabilidad |

#### 9. Endeudamiento Total

```
Endeudamiento = Pasivo Total / Activo Total × 100
```

**Ejemplo**: 2.220.000 / 4.390.000 = **50,6%**

| Semáforo | Valor | Interpretación |
|----------|-------|---------------|
| VERDE | < 50% | Bajo riesgo |
| AMARILLO | 50 - 70% | Moderado — monitorear |
| ROJO | > 70% | Alto riesgo — difícil acceder a más crédito |

#### 10. ROE (Retorno sobre Patrimonio)

```
ROE = Utilidad Neta / Patrimonio × 100
```

**Ejemplo**: 3.285.000 × 12 meses / 2.170.000 = **18,2% anualizado** (nota: dato mensual × 12 es aproximación)

| Semáforo | ROE anual | Interpretación |
|----------|-----------|---------------|
| ROJO | < 5% | Mejor poner la plata en depósito a plazo |
| AMARILLO | 5 - 15% | Rentable pero no espectacular |
| VERDE | 15 - 30% | Muy buen retorno para PYME |
| AZUL | > 30% | Excepcional — verificar sostenibilidad |

---

### 1.4 Análisis de Tendencia (MoM y YoY)

**Fórmulas:**

```
Variación MoM = (Valor mes actual - Valor mes anterior) / Valor mes anterior × 100
Variación YoY = (Valor mes actual - Mismo mes año anterior) / Mismo mes año anterior × 100
```

**Ejemplo: Ventas de consultora "Pragma" (COP millones)**

| Mes | 2025 | 2026 | Var YoY | Var MoM (2026) |
|-----|------|------|---------|----------------|
| Ene | 42 | 51 | +21,4% | — |
| Feb | 38 | 48 | +26,3% | -5,9% |
| Mar | 45 | 55 | +22,2% | +14,6% |
| Abr | 40 | — | — | — |

**Cómo interpretar:**
- **YoY > 0% consistente**: la empresa crece de año en año. Si supera la inflación del país, hay crecimiento real.
- **MoM volátil pero YoY estable**: probablemente hay estacionalidad (normal en muchas industrias).
- **YoY negativo 3+ meses**: tendencia bajista — investigar causas.

**Ajuste por inflación** (crítico en Argentina y otros países con alta inflación):
```
Crecimiento real = ((1 + Crecimiento nominal) / (1 + Inflación del período)) - 1
```
Si las ventas subieron 40% en Argentina pero la inflación fue 50%:
```
Crecimiento real = (1,40 / 1,50) - 1 = -6,7% → la empresa está decreciendo en términos reales.
```

---

## 2. Gestión de Flujo de Caja

### 2.1 Modelo de Flujo de Caja Semanal

**Template para PYME — Control semanal (CLP)**

| Concepto | Sem 1 | Sem 2 | Sem 3 | Sem 4 | Total Mes |
|----------|-------|-------|-------|-------|-----------|
| **SALDO INICIAL** | 2.800.000 | 3.100.000 | 1.900.000 | 2.600.000 | 2.800.000 |
| **INGRESOS** | | | | | |
| Ventas contado | 1.500.000 | 1.200.000 | 1.800.000 | 1.400.000 | 5.900.000 |
| Cobranza a clientes | 800.000 | 600.000 | 1.100.000 | 900.000 | 3.400.000 |
| Otros ingresos | 0 | 50.000 | 0 | 0 | 50.000 |
| **Total ingresos** | **2.300.000** | **1.850.000** | **2.900.000** | **2.300.000** | **9.350.000** |
| **EGRESOS** | | | | | |
| Proveedores | (800.000) | (1.500.000) | (600.000) | (800.000) | (3.700.000) |
| Sueldos y honorarios | 0 | 0 | 0 | (3.500.000) | (3.500.000) |
| Arriendo | (500.000) | 0 | 0 | 0 | (500.000) |
| Servicios básicos | 0 | (150.000) | 0 | 0 | (150.000) |
| Impuestos (IVA, PPM) | 0 | 0 | (600.000) | 0 | (600.000) |
| Cuota crédito | 0 | (400.000) | 0 | 0 | (400.000) |
| Gastos operacionales | (200.000) | (200.000) | (200.000) | (200.000) | (800.000) |
| Imprevistos | (0) | (0) | (0) | (100.000) | (100.000) |
| **Total egresos** | **(1.500.000)** | **(2.250.000)** | **(1.400.000)** | **(4.600.000)** | **(9.750.000)** |
| **FLUJO NETO** | +800.000 | -400.000 | +1.500.000 | -2.300.000 | -400.000 |
| **SALDO FINAL** | **3.600.000** | **3.200.000** | **4.700.000** | **2.400.000** | **2.400.000** |

**Reglas de uso:**
1. Actualizar **todos los lunes** con datos reales de la semana anterior.
2. Proyectar las próximas 4 semanas con datos esperados.
3. Si el saldo final proyectado cae por debajo de **1 mes de gastos fijos**, activar alerta.
4. Los sueldos van casi siempre en la última semana — esa semana suele ser la más apretada.

---

### 2.2 Proyección a 13 Semanas

La proyección a 13 semanas (3 meses) es el estándar de oro para PYMEs. Suficientemente corta para ser precisa, suficientemente larga para anticipar problemas.

**Paso a paso:**

**Paso 1 — Listar fuentes de ingreso con probabilidad:**
| Fuente | Monto | Probabilidad | Monto ponderado |
|--------|-------|-------------|-----------------|
| Contratos confirmados | 4.500.000 | 95% | 4.275.000 |
| Cotizaciones enviadas | 2.000.000 | 40% | 800.000 |
| Ventas recurrentes históricas | 3.000.000/mes | 85% | 2.550.000/mes |

**Paso 2 — Listar egresos fijos y variables:**
- Fijos: sueldos, arriendo, cuotas crédito, servicios básicos.
- Variables: materia prima (% de ventas), comisiones, despacho.
- Estacionales: aguinaldos (dic), impuesto renta (abr), vacaciones.

**Paso 3 — Armar la grilla semana por semana:**
- Semanas 1-4: datos bastante confiables (precisión ~90%).
- Semanas 5-8: proyección moderada (precisión ~70%).
- Semanas 9-13: estimación conservadora (precisión ~50%).

**Paso 4 — Identificar el punto mínimo de caja:**
Buscar la semana donde el saldo es más bajo. Si ese saldo < 2 semanas de gastos fijos → tomar acción preventiva ahora.

**Paso 5 — Crear escenarios:**
- **Optimista**: cobranza al día + ventas esperadas al 100%.
- **Base**: cobranza con 1 semana de retraso + ventas al 80%.
- **Pesimista**: cobranza con 3 semanas de retraso + ventas al 60%.

---

### 2.3 Ciclo de Conversión de Efectivo (CCE)

El CCE mide cuántos días pasan desde que **pagas** por la materia prima hasta que **cobras** al cliente.

```
CCE = Días de Inventario + Días de Cobro - Días de Pago a Proveedores
```

**Ejemplo: Fábrica de muebles "Madera Viva" (Perú)**

| Componente | Cálculo | Resultado |
|-----------|---------|-----------|
| Días de inventario | (Inventario / Costo ventas) × 365 = (120.000 / 720.000) × 365 | 61 días |
| Días de cobro (DSO) | (CxC / Ventas) × 365 = (200.000 / 1.200.000) × 365 | 61 días |
| Días de pago (DPO) | (CxP / Costo ventas) × 365 = (90.000 / 720.000) × 365 | 46 días |
| **CCE** | 61 + 61 - 46 | **76 días** |

**Interpretación**: desde que Madera Viva paga por la madera, pasan **76 días** hasta que el dinero vuelve como cobro del cliente. Durante esos 76 días, la empresa necesita financiar la operación con capital propio o deuda.

**Impacto en pesos**: si los costos mensuales son 60.000 PEN, necesita tener disponible: 60.000 × (76/30) = **152.000 PEN** como mínimo en capital de trabajo.

**Cómo mejorar el CCE:**

| Palanca | Acción concreta | Impacto esperado |
|---------|----------------|-----------------|
| Reducir días de inventario | Producir bajo pedido, no stockear | -10 a -20 días |
| Reducir días de cobro | Cobrar anticipo del 50%, facturar el mismo día | -15 a -30 días |
| Aumentar días de pago | Negociar con proveedores de 30 a 60 días | +15 a +30 días |

---

### 2.4 Estrategias de Cobro en LATAM

La cobranza en LATAM tiene particularidades culturales. El "mañana te pago" es una realidad que hay que manejar con sistema.

**Framework de cobro escalonado:**

| Día respecto a vencimiento | Acción | Canal | Script |
|---|---|---|---|
| -7 días | Recordatorio amigable | WhatsApp | "Hola [nombre], te recuerdo que tu factura #[X] vence el [fecha] por $[monto]. ¿Necesitas los datos bancarios para la transferencia?" |
| Día 0 | Aviso de vencimiento | WhatsApp + email | "Hola [nombre], hoy vence tu factura #[X]. Te agradecería confirmarme cuando realices el pago." |
| +3 días | Primer seguimiento | Llamada | "Hola [nombre], ¿pudiste procesar el pago de la factura que venció el [fecha]? ¿Hay algo que pueda facilitar?" |
| +7 días | Segundo seguimiento | Llamada + email formal | "Estimado [nombre], la factura #[X] tiene 7 días de mora. Necesito que definamos una fecha concreta de pago." |
| +15 días | Aviso firme | Email formal con copia a gerencia | "La factura tiene 15 días de mora. De no recibir el pago antes del [fecha], deberemos suspender entregas/servicios." |
| +30 días | Suspensión + aviso final | Carta formal | Suspender despachos. "De no regularizar en 10 días, el saldo será derivado a cobranza." |
| +45 días | Cobranza externa o negociación de pago | Presencial o abogado | Ofrecer plan de pago. Evaluar provisión de incobrabilidad. |

**Tácticas que funcionan en LATAM:**
1. **Cobrar anticipo**: 30-50% al confirmar pedido, resto contra entrega.
2. **Descuento por pronto pago**: "2/10 neto 30" = 2% de descuento si paga en 10 días, si no, paga 100% en 30.
3. **Facturar inmediatamente**: cada día que demoras en facturar es un día extra que demoras en cobrar.
4. **WhatsApp > email**: en LATAM, la tasa de respuesta por WhatsApp es 5x mayor que por email.
5. **Automatizar recordatorios**: usar herramientas como Treinta (Colombia), Bsale (Chile), Alegra (multi-país).
6. **No mezclar la relación comercial con la cobranza**: tener una persona dedicada a cobrar.

---

### 2.5 Gestión de Cuentas por Pagar

**Principio**: pagar lo más tarde posible sin dañar la relación ni incurrir en recargos, pero nunca atrasarse con sueldos ni impuestos.

**Orden de prioridad de pagos cuando la caja es apretada:**

| Prioridad | Pago | Razón |
|-----------|------|-------|
| 1 | Sueldos y cotizaciones | Legal + moral (deuda laboral no se negocia) |
| 2 | Impuestos con multa automática | SII/SAT/DIAN cobran recargos + pueden bloquear operación |
| 3 | Arriendo del local | Perder el local = perder la operación |
| 4 | Servicios básicos (luz, internet) | Sin estos no operas |
| 5 | Proveedores críticos | El que te provee lo esencial para producir |
| 6 | Cuotas de crédito | Negociar con el banco antes de atrasarte |
| 7 | Proveedores secundarios | Negociar extensión de plazo |
| 8 | Gastos no esenciales | Suspender hasta normalizar |

**Negociación con proveedores — Guión:**
> "Don Carlos, necesito conversar algo con usted. Hemos sido clientes confiables por [X años]. Este mes/trimestre tenemos un desfase temporal de caja por [razón honesta]. ¿Podríamos extender el plazo de pago de 30 a 60 días por los próximos 2 meses? Le garantizo el pago completo y en cuanto normalicemos volvemos a los plazos habituales."

---

## 3. Costeo y Pricing

### 3.1 Costeo Completo de un Producto

**Ejemplo: Caja de 12 empanadas — "Sabor Casero" (Chile, CLP)**

| Componente | Detalle | Costo unitario |
|-----------|---------|---------------|
| **Materia prima directa** | | |
| Harina (200g por empanada) | $1.200/kg × 0,2kg × 12 | $2.880 |
| Carne molida (50g por empanada) | $6.500/kg × 0,05kg × 12 | $3.900 |
| Cebolla, huevo, especias | Estimado por receta | $960 |
| Envase y etiqueta | $250 por caja | $250 |
| **Subtotal materia prima** | | **$7.990** |
| **Mano de obra directa (MOD)** | | |
| Tiempo de preparación | 15 min por caja × $4.000/hora | $1.000 |
| **Costos indirectos de fabricación (CIF)** | | |
| Gas / electricidad (prorrateado) | $800.000 mes / 2.000 cajas | $400 |
| Depreciación equipo cocina | $200.000 mes / 2.000 cajas | $100 |
| Arriendo cocina (prorrateado) | $600.000 mes / 2.000 cajas | $300 |
| **Subtotal CIF** | | **$800** |
| **Distribución** | | |
| Flete/delivery por caja | Promedio zona | $500 |
| **Merma** | | |
| 5% de materia prima estimada | $7.990 × 5% | $400 |
| **COSTO TOTAL POR CAJA** | | **$10.690** |

**Precio de venta sugerido** (con margen del 55%):
```
Precio = Costo / (1 - Margen deseado) = $10.690 / (1 - 0,55) = $23.756 → redondeado: $23.990
```

**Margen de contribución**: $23.990 - $10.690 = **$13.300 por caja** (55,4%)

---

### 3.2 Costeo de Servicios (hora-hombre)

**Ejemplo: Agencia de diseño "Pixel" — 8 empleados (Colombia, COP)**

**Paso 1 — Calcular costo por hora-hombre:**

| Concepto | Monto mensual (COP) |
|---------|---------------------|
| Sueldo promedio diseñador | 4.200.000 |
| Prestaciones sociales (~52%) | 2.184.000 |
| **Costo total empleado/mes** | **6.384.000** |
| Horas laborales al mes | 160 |
| (-) Horas no facturables (admin, reuniones, capacitación: ~30%) | -48 |
| **Horas facturables/mes** | **112** |
| **Costo por hora facturable** | **$57.000** |

**Paso 2 — Agregar overhead:**

| Overhead mensual | COP |
|-----------------|-----|
| Arriendo oficina | 4.500.000 |
| Software y licencias | 1.800.000 |
| Internet, servicios | 600.000 |
| Contabilidad | 800.000 |
| Marketing | 1.200.000 |
| Otros | 600.000 |
| **Total overhead** | **9.500.000** |
| Overhead por persona (8 empleados) | 1.187.500 |
| Overhead por hora facturable | **$10.600** |

**Costo total por hora facturable**: $57.000 + $10.600 = **$67.600 COP**

**Tarifa de venta** (con margen del 40%):
```
Tarifa = $67.600 / (1 - 0,40) = $112.667 → redondeado: $115.000 COP/hora
```

**Para cotizar un proyecto:**
```
Costo proyecto = Horas estimadas × Tarifa × Factor de riesgo (1,15 para proyectos nuevos)
```
Ejemplo: landing page estimada en 40 horas → 40 × $115.000 × 1,15 = **$5.290.000 COP**

---

### 3.3 Punto de Equilibrio

```
Punto de Equilibrio (unidades) = Costos Fijos / (Precio unitario - Costo variable unitario)
Punto de Equilibrio ($) = Costos Fijos / Margen de Contribución %
```

**Ejemplo: Café "Aroma" — Santiago, Chile (CLP)**

| Dato | Valor |
|------|-------|
| Costos fijos mensuales | $4.800.000 (arriendo, sueldos, servicios, etc.) |
| Precio promedio por café vendido | $2.800 |
| Costo variable por café | $950 (grano, leche, vaso, servilleta) |
| Margen de contribución | $2.800 - $950 = $1.850 (66%) |

```
PE unidades = $4.800.000 / $1.850 = 2.595 cafés/mes → ~87 cafés/día (30 días)
PE pesos = $4.800.000 / 0,66 = $7.272.727/mes
```

**Interpretación**: si el café vende menos de 87 cafés al día, pierde plata. Cada café vendido por encima de 87 genera $1.850 de utilidad.

---

### 3.4 Margen de Contribución por Línea

**Ejemplo: Ferretería "El Constructor" — Lima, Perú (PEN)**

| Línea | Ventas/mes | Costo variable | Margen contribución | MC % | % del total MC |
|-------|-----------|---------------|-------------------|------|---------------|
| Herramientas | 28.000 | 18.200 | 9.800 | 35% | 22% |
| Pinturas | 22.000 | 11.000 | 11.000 | 50% | 25% |
| Eléctrico | 15.000 | 6.750 | 8.250 | 55% | 19% |
| Plomería | 12.000 | 7.200 | 4.800 | 40% | 11% |
| Fijaciones | 18.000 | 7.200 | 10.800 | 60% | 24% |
| **Total** | **95.000** | **50.350** | **44.650** | **47%** | **100%** |

**Decisiones basadas en el margen de contribución:**
- **Fijaciones** tiene el mayor MC% (60%) → promover más, darle mejor ubicación en tienda.
- **Plomería** tiene el menor MC% (40%) y menor contribución absoluta → evaluar si vale la pena mantenerla o reducir espacio.
- **Herramientas** vende mucho pero el margen es bajo (35%) → intentar renegociar con proveedores o subir precio 5%.

---

### 3.5 Estrategias de Pricing

| Estrategia | Qué es | Cuándo usarla | Ejemplo PYME LATAM |
|-----------|--------|--------------|-------------------|
| **Anclaje** | Mostrar un precio alto primero para que el real parezca razonable | Cuando tienes versiones premium/básica | Gimnasio muestra plan anual $480.000 primero, luego mensual $49.990 "parece barato" |
| **Bundling** | Agrupar productos/servicios a un precio conjunto menor que por separado | Para aumentar ticket promedio y mover inventario lento | "Combo Constructor": taladro + brocas + nivel = $89.990 (por separado: $110.000) |
| **Penetración** | Precio bajo inicial para ganar mercado | Lanzamiento en mercado con competencia fuerte | App de delivery entra con envío gratis 3 meses |
| **Descremado** | Precio alto inicial, bajar gradualmente | Producto innovador sin competencia directa | Software especializado para clínicas: lanza a $199.990/mes, baja a $129.990 al año |
| **Psicológico** | Precios terminados en 9 o 90 | Siempre (funciona universalmente) | $9.990 en vez de $10.000; $29.990 en vez de $30.000 |
| **Valor percibido** | Cobrar por el resultado, no por el costo | Servicios donde el impacto es alto | Contador que ahorra $5M en impuestos cobra $500.000 (no por hora) |

---

### 3.6 Cuándo y Cómo Subir Precios

**Cuándo subir:**
- Los costos subieron y el margen se comprimió más de 5 puntos.
- La demanda supera tu capacidad de atención.
- No has subido precios en más de 12 meses (en LATAM, con inflación de 4-8% anual, es obligatorio).
- Los competidores ya subieron.

**Cómo hacerlo sin perder clientes:**

1. **Avisar con anticipación** (30 días mínimo): "A partir del 1 de mayo, nuestras tarifas se ajustarán un 8% para reflejar el aumento en costos de materiales."
2. **Agregar valor al mismo tiempo**: "Estamos subiendo el precio pero ahora incluimos envío gratis / soporte extendido / garantía de 2 años."
3. **Grandfather pricing**: mantener el precio viejo para clientes actuales por 3-6 meses.
4. **Subir el precio del producto base y crear una versión económica nueva**: así el cliente que no puede pagar tiene una opción, pero el estándar ahora cuesta más.
5. **Subir precios en clientes nuevos primero**: validar la aceptación antes de aplicar a todos.

**Regla de oro**: una subida del 10% en precios con pérdida del 5% de clientes sigue siendo más rentable en la mayoría de los casos.

---

## 4. Presupuesto y Control

### 4.1 Template de Presupuesto Anual para PYME

**Ejemplo: Empresa de servicios de limpieza "Limpia Total" — México (MXN)**

| Categoría | Ene | Feb | Mar | ... | Dic | Total Anual | % |
|-----------|-----|-----|-----|-----|-----|-------------|---|
| **INGRESOS** | | | | | | | |
| Contratos fijos | 180.000 | 180.000 | 180.000 | | 180.000 | 2.160.000 | 72% |
| Servicios eventuales | 60.000 | 45.000 | 70.000 | | 80.000 | 840.000 | 28% |
| **Total ingresos** | **240.000** | **225.000** | **250.000** | | **260.000** | **3.000.000** | **100%** |
| **COSTOS VARIABLES** | | | | | | | |
| Insumos de limpieza | 24.000 | 22.500 | 25.000 | | 26.000 | 300.000 | 10% |
| Transporte | 14.400 | 13.500 | 15.000 | | 15.600 | 180.000 | 6% |
| **Total variables** | **38.400** | **36.000** | **40.000** | | **41.600** | **480.000** | **16%** |
| **COSTOS FIJOS** | | | | | | | |
| Nómina (12 empleados) | 144.000 | 144.000 | 144.000 | | 144.000 | 1.728.000 | 58% |
| Arriendo bodega | 12.000 | 12.000 | 12.000 | | 12.000 | 144.000 | 5% |
| Seguros | 3.000 | 3.000 | 3.000 | | 3.000 | 36.000 | 1% |
| Contabilidad | 5.000 | 5.000 | 5.000 | | 5.000 | 60.000 | 2% |
| Marketing | 8.000 | 8.000 | 8.000 | | 8.000 | 96.000 | 3% |
| Software / herramientas | 3.500 | 3.500 | 3.500 | | 3.500 | 42.000 | 1% |
| **Total fijos** | **175.500** | **175.500** | **175.500** | | **175.500** | **2.106.000** | **70%** |
| **UTILIDAD OPERACIONAL** | **26.100** | **13.500** | **34.500** | | **42.900** | **414.000** | **14%** |

**Cómo construir el presupuesto:**
1. **Empezar por los ingresos**: ser conservador — usar 80% del mejor escenario.
2. **Costos variables como % de ventas**: si históricamente los insumos son el 10%, presupuestar 10% de las ventas proyectadas.
3. **Costos fijos mes a mes**: son iguales cada mes salvo excepciones (aguinaldos en dic, vacaciones).
4. **Dejar un 5% de contingencia**: siempre pasa algo no previsto.
5. **Revisar vs real cada mes**: el presupuesto es inútil si no se compara con la realidad.

---

### 4.2 Presupuesto Base Cero vs Incremental

| Aspecto | Base Cero | Incremental |
|---------|-----------|------------|
| **Qué es** | Justificar cada gasto desde cero cada año | Tomar el presupuesto anterior y ajustar +/- % |
| **Ventaja** | Elimina gastos innecesarios | Rápido y simple |
| **Desventaja** | Requiere mucho tiempo y análisis | Arrastra ineficiencias año tras año |
| **Cuándo usar** | Cuando la empresa necesita recortar costos o cambiar dirección | Cuando la operación es estable y predecible |
| **Ejemplo** | "¿Realmente necesitamos gastar $96.000 en marketing? ¿Qué retorno genera cada canal?" | "El año pasado gastamos $96.000, este año ajustamos un 5% por inflación = $100.800" |

**Recomendación para PYMEs LATAM**: usar incremental como base, pero hacer base cero en **una categoría diferente cada trimestre**. Q1: revisar marketing. Q2: revisar proveedores. Q3: revisar nómina/roles. Q4: revisar tecnología y suscripciones.

---

### 4.3 Control de Desviaciones

**Qué revisar mensualmente (comparando presupuesto vs real):**

| Indicador | Alerta si desviación > | Acción |
|-----------|----------------------|--------|
| Ingresos totales | -10% del presupuesto | Analizar por línea de producto / cliente. ¿Es tendencia o evento puntual? |
| Costo de ventas (%) | +3 puntos porcentuales | Revisar precios de insumos, merma, eficiencia de producción |
| Nómina | +5% | ¿Se contrató alguien no presupuestado? ¿Horas extra excesivas? |
| Gastos de venta | +15% | ¿El gasto extra está generando ventas proporcionales? |
| Gastos administrativos | +10% | Buscar el gasto específico que creció |
| Utilidad neta | -20% del presupuesto | Reunión de emergencia — revisar todas las líneas |

**Template de reporte mensual de desviaciones:**
```
REPORTE DE DESVIACIONES — [MES] [AÑO]

Resumen:
- Ingresos: $X real vs $Y presupuesto → desviación: +/-Z%
- Utilidad operacional: $X real vs $Y presupuesto → desviación: +/-Z%
- Caja al cierre: $X

Top 3 desviaciones positivas:
1. [Categoría]: +$X (+Y%) — Causa: [explicación]
2. ...

Top 3 desviaciones negativas:
1. [Categoría]: -$X (-Y%) — Causa: [explicación]
2. ...

Acciones correctivas:
1. [Acción] — Responsable: [nombre] — Plazo: [fecha]
2. ...
```

---

### 4.4 Gastos Zombi

Los gastos zombi son **gastos recurrentes que la empresa sigue pagando pero que ya no generan valor**.

**Los 10 gastos zombi más comunes en PYMEs LATAM:**

| # | Gasto zombi | Costo típico mensual | Cómo detectarlo |
|---|------------|---------------------|-----------------|
| 1 | Software/SaaS que nadie usa | $20-100 USD | Revisar cargos recurrentes en tarjeta corporativa |
| 2 | Líneas telefónicas de ex-empleados | $15-40 USD | Comparar lista de líneas vs nómina actual |
| 3 | Seguros duplicados o excesivos | Variable | Auditar pólizas vigentes 1 vez al año |
| 4 | Suscripciones de prueba que no se cancelaron | $10-50 USD | Revisar emails de "tu período de prueba terminó" |
| 5 | Publicidad en canales sin retorno | $100-500 USD | Medir conversiones por canal |
| 6 | Arriendo de bodega con inventario obsoleto | $200-800 USD | Visitar físicamente — ¿Cuándo fue la última vez que sacaste algo de ahí? |
| 7 | Servicios de limpieza/mantenimiento sobredimensionados | Variable | ¿Realmente necesitas limpieza diaria o basta con 3 veces por semana? |
| 8 | Membresías gremiales o de cámara sin uso | $50-200 USD | ¿Fuiste a algún evento o usaste algún beneficio en los últimos 6 meses? |
| 9 | Hosting de sitio web antiguo | $5-30 USD | ¿Aún tienes el sitio viejo pagando hosting aparte? |
| 10 | Pagos a proveedores por servicios reducidos | Variable | Comparar lo que pagas vs lo que realmente recibes |

**Ejercicio trimestral anti-zombi:**
1. Imprimir los últimos 3 estados de cuenta bancarios / tarjeta.
2. Resaltar cada cargo recurrente.
3. Para cada uno preguntar: "Si hoy empezara la empresa de cero, ¿contrataría este servicio?"
4. Si la respuesta es no → cancelar o renegociar.

---

## 5. Financiamiento para PYMEs LATAM

### 5.1 Tipos de Crédito Disponibles

| Tipo | Qué es | Plazo típico | Garantía | Para qué sirve |
|------|--------|-------------|----------|----------------|
| **Crédito bancario tradicional** | Préstamo de banco con cuotas fijas | 12-60 meses | Generalmente con garantía (inmueble, aval) | Capital de trabajo, expansión |
| **Línea de crédito rotativa** | Monto aprobado que usas y pagas como tarjeta | Renovable anual | Historial crediticio | Cubrir desfases de caja temporales |
| **Factoring** | Vender tus facturas por cobrar a un descuento | Inmediato (anticipo 80-95%) | La factura misma | Necesidad de liquidez inmediata |
| **Confirming** | El comprador grande facilita pago anticipado a sus proveedores | Inmediato | La orden de compra | Cuando vendes a empresas grandes |
| **Leasing** | Arriendo con opción de compra de un activo | 24-60 meses | El activo mismo | Comprar maquinaria, vehículos, equipos |
| **Microcrédito** | Préstamos pequeños, menor burocracia | 6-24 meses | Aval solidario o personal | Emprendimientos < 10 empleados |
| **Crédito fintech** | Préstamos digitales, aprobación rápida | 3-36 meses | Análisis de datos (ventas, cuentas) | Cuando el banco dice que no, o necesitas rapidez |
| **Capital de riesgo / inversión ángel** | Inversión a cambio de participación | Largo plazo | Participación accionaria | Startups en crecimiento acelerado |

---

### 5.2 Tasas Típicas por País y Tipo (2025-2026, referencia)

**Importante**: estas tasas son aproximadas y varían según el perfil de riesgo, monto y plazo.

| País | Crédito bancario PYME (anual) | Fintech (anual) | Factoring (costo por factura) | Microcrédito (anual) | Tasa de referencia banco central |
|------|------------------------------|-----------------|------------------------------|---------------------|-------------------------------|
| Chile | 8 - 16% | 18 - 36% | 1 - 3% mensual | 15 - 25% | ~5% (TPM) |
| México | 12 - 22% | 24 - 48% | 1,5 - 4% mensual | 25 - 45% | ~10% (TIIE) |
| Colombia | 14 - 24% | 24 - 42% | 1,5 - 3,5% mensual | 20 - 40% | ~10% |
| Perú | 10 - 20% | 20 - 40% | 1 - 3% mensual | 18 - 35% | ~6% |
| Argentina | 40 - 80%+ (nominal) | 50 - 100%+ | 3 - 8% mensual | Variable | ~40%+ |

**Nota Argentina**: siempre evaluar en tasas reales (descontando inflación). Un crédito al 70% con inflación de 60% tiene tasa real de ~6%.

---

### 5.3 Cuándo Endeudarse vs Cuándo No

**Sí endeudarse cuando:**
- El retorno esperado de la inversión es **mayor que el costo del crédito** (ej: comprar una máquina que genera 30% de retorno con crédito al 15%).
- Hay una oportunidad de negocio con ventana de tiempo limitada (pedido grande, temporada alta).
- Es para capital de trabajo productivo (inventario que se vende rápido).
- La empresa tiene flujo de caja predecible para pagar las cuotas.

**No endeudarse cuando:**
- Es para cubrir pérdidas operativas recurrentes (la deuda no soluciona un modelo de negocio roto).
- No tienes claro cómo vas a pagar.
- La cuota del crédito superaría el 25% de tu flujo de caja libre mensual.
- Ya tienes deuda cuyo servicio supera el 30% de tus ingresos.
- Es para gastos que no generan retorno (remodelación de oficina cuando las ventas caen).

**Test rápido antes de pedir un crédito:**
```
1. ¿Puedo explicar en una frase para qué es el dinero? → Sí / No
2. ¿Genera retorno medible? → Sí / No
3. ¿Puedo pagar la cuota sin sacrificar operación? → Sí / No
4. ¿Mi ratio deuda/EBITDA quedaría < 3x? → Sí / No
5. ¿Tengo un plan B si el retorno esperado no se da? → Sí / No

→ 5 Sí = adelante. 4 Sí = proceder con cautela. 3 o menos = no endeudarse.
```

---

### 5.4 Cómo Preparar un Caso para Pedir Crédito

**Lo que el banco / fintech va a pedir:**

| Documento | Qué es | Tip |
|-----------|--------|-----|
| Estados financieros (2-3 años) | P&L y Balance | Idealmente auditados, o al menos firmados por contador |
| Flujo de caja proyectado | 12 meses mínimo | Mostrar que la cuota cabe en el flujo |
| Declaraciones de impuestos | Últimos 2 años | Deben coincidir con los estados financieros |
| Plan de uso de fondos | Detalle de en qué se gastará el dinero | Ser específico: "Comprar horno industrial modelo X por $Y" |
| Garantías | Bienes, avales, facturas | Tener claro qué puedes ofrecer |
| Antigüedad del negocio | Registro mercantil, patentes | Mínimo 2 años para bancos, 6 meses para fintechs |
| Historial crediticio limpio | Reporte de buró/scoring | Revisar antes de ir al banco — corregir errores |

**Estructura del pitch al banco:**
1. "Mi empresa factura $X mensuales desde hace Y años."
2. "Necesito $Z para [propósito específico]."
3. "Esto me va a generar $W adicionales en [plazo]."
4. "Puedo pagar cuotas de $C mensuales porque mi flujo libre es $F."
5. "Como garantía ofrezco [X]."

---

### 5.5 Fintechs Relevantes por País

| País | Fintechs para PYMEs | Tipo |
|------|---------------------|------|
| **Chile** | Cumplo, Bemmbo, Fintual Business, RedCapital, PorCobrar | Factoring, crédito, inversión |
| **México** | Konfio, Clip Capital, Credijusto, Fairplay, Drip Capital | Crédito, factoring, revenue-based |
| **Colombia** | Sempli, Addi, Bold Capital, a]Clip, Mesfix | Crédito digital, factoring |
| **Perú** | Caja Piura (digital), Prestamype, Innova Factoring, FacTurando | Microcrédito, factoring |
| **Argentina** | Ualá Business, Mercado Crédito, Pomelo, Increase | Crédito, gestión de cobros |
| **Multi-país** | Tribal, Clara, Jeeves, Paystand | Tarjetas corporativas, crédito B2B |

---

## 6. Tributación Básica por País

### 6.1 Chile — SII

| Concepto | Detalle |
|---------|---------|
| **Autoridad** | Servicio de Impuestos Internos (SII) — sii.cl |
| **IVA** | 19% — se declara y paga mensualmente (F29) |
| **Impuesto de primera categoría (renta empresas)** | 27% (régimen general) o 25% (régimen Pro PYME) |
| **PPM (Pagos Provisionales Mensuales)** | Anticipo mensual del impuesto a la renta. Se calcula como % de los ingresos brutos. |
| **Régimen Pro PYME** | Para empresas con ventas < 75.000 UF (~$2.500M CLP). Tasa 25%, tributación en base a flujo de caja (no devengado), depreciación instantánea. |
| **Boleta electrónica** | Obligatoria para ventas a consumidor final. Se emite vía SII o software autorizado. |
| **Factura electrónica** | Obligatoria para ventas entre empresas (B2B). |
| **Declaración de renta anual** | Abril (F22). |
| **Cotizaciones previsionales** | AFP (~10% + comisión), salud (7%), seguro cesantía (3% empleador). |

**Calendario fiscal Chile:**
| Mes | Obligación |
|-----|-----------|
| Cada mes (día 12-20) | Declaración y pago IVA + PPM (F29) |
| Cada mes | Pago cotizaciones previsionales |
| Marzo | Declaración jurada anual (varias) |
| Abril | Declaración de renta anual (F22) |
| Septiembre | Ajuste PPM si corresponde |

---

### 6.2 México — SAT

| Concepto | Detalle |
|---------|---------|
| **Autoridad** | Servicio de Administración Tributaria (SAT) — sat.gob.mx |
| **IVA** | 16% (0% en alimentos básicos y medicinas) |
| **ISR (personas morales)** | 30% sobre utilidad fiscal |
| **RESICO (Régimen Simplificado de Confianza)** | Para personas físicas con ingresos < 3,5M MXN/año. Tasa escalonada de 1% a 2,5% sobre ingresos. |
| **Régimen general de ley** | Para empresas que superan los límites de RESICO. ISR sobre utilidad, IVA, pagos provisionales. |
| **CFDI** | Comprobante Fiscal Digital por Internet — factura electrónica obligatoria para toda operación. |
| **Pagos provisionales** | ISR: mensuales (día 17). IVA: mensuales (día 17). |
| **Declaración anual** | Marzo (personas morales), abril (personas físicas). |
| **PTU** | Reparto de utilidades a trabajadores: 10% de la utilidad fiscal, se paga en mayo. |
| **IMSS / INFONAVIT** | Cuotas patronales: ~25-30% del salario del trabajador. |

**Calendario fiscal México:**
| Mes | Obligación |
|-----|-----------|
| Día 17 de cada mes | Pago provisional ISR + IVA + retenciones |
| Bimestral | DIOT (Declaración Informativa de Operaciones con Terceros) |
| Marzo | Declaración anual personas morales |
| Abril | Declaración anual personas físicas |
| Mayo | Reparto PTU |

---

### 6.3 Colombia — DIAN

| Concepto | Detalle |
|---------|---------|
| **Autoridad** | Dirección de Impuestos y Aduanas Nacionales (DIAN) — dian.gov.co |
| **IVA** | 19% (tarifa general), 5% (bienes gravados especiales), 0% (excluidos y exentos) |
| **Impuesto de renta** | 35% (tarifa general para sociedades) |
| **Renta personas naturales** | Progresivo: 0% a 39% según tabla |
| **ICA** | Impuesto de Industria y Comercio — municipal, varía por ciudad (Bogotá: 0,414% - 1,38% según actividad) |
| **Facturación electrónica** | Obligatoria. Se debe usar proveedor tecnológico habilitado. |
| **Retención en la fuente** | Anticipo del impuesto de renta. Se retiene al pagar a proveedores (varía 1% - 11% según concepto). |
| **Autorretención** | Grandes contribuyentes deben autorretener. |
| **Declaración de renta** | Abril-mayo según último dígito de NIT. |
| **GMF** | Gravamen a los Movimientos Financieros (4 x mil = 0,4% por transacción bancaria). |

---

### 6.4 Perú — SUNAT

| Concepto | Detalle |
|---------|---------|
| **Autoridad** | SUNAT — sunat.gob.pe |
| **IGV** | 18% (16% IGV + 2% IPM) |
| **Impuesto a la renta (3ra categoría)** | 29,5% para régimen general |
| **Régimen MYPE Tributario** | Hasta 1.700 UIT de ingresos: 10% sobre primeras 15 UIT de renta, 29,5% sobre exceso |
| **Régimen Especial de Renta (RER)** | Hasta 525.000 soles/año. Pago mensual: 1,5% de ingresos netos. |
| **Nuevo RUS** | Para personas naturales con ingresos < 96.000 soles/año. Cuota fija mensual de 20-50 soles. Sin obligación de llevar libros contables. |
| **Facturación electrónica** | Obligatoria para contribuyentes del régimen general y MYPE. |
| **Declaración mensual** | PDT 621 (IGV-Renta) según cronograma SUNAT. |
| **Declaración anual** | Marzo-abril. |
| **Essalud** | 9% del sueldo bruto, a cargo del empleador. |

---

### 6.5 Argentina — AFIP

| Concepto | Detalle |
|---------|---------|
| **Autoridad** | AFIP (Administración Federal de Ingresos Públicos) — afip.gob.ar |
| **IVA** | 21% (general), 10,5% (reducida), 27% (servicios a empresas) |
| **Impuesto a las ganancias (sociedades)** | Escalonado: 25% hasta $50M, 30% entre $50M y $200M, 35% sobre $200M (rangos se actualizan) |
| **Monotributo** | Régimen simplificado para pequeños contribuyentes. Cuota fija mensual que incluye impuestos + jubilación + obra social. Categorías A a K según facturación. |
| **Responsable Inscripto** | Régimen general: paga IVA + Ganancias + Ingresos Brutos. Para facturación > tope de monotributo. |
| **Factura electrónica** | Obligatoria para todos (incluso monotributistas). |
| **Ingresos Brutos** | Impuesto provincial, alícuota varía por provincia y actividad (1% - 5% de ventas brutas). |
| **Cargas sociales** | ~43% del salario bruto (aportes patronales a jubilación, obra social, ART, etc.) |

**Nota especial Argentina**: debido a la alta inflación y cambios regulatorios frecuentes, siempre consultar las tablas y topes vigentes en afip.gob.ar y con el contador.

---

## 7. Señales de Alarma y Diagnóstico

### 7.1 Las 15 Señales de Alarma Financiera (ordenadas por urgencia)

| # | Urgencia | Señal | Qué significa | Acción inmediata |
|---|----------|-------|--------------|-----------------|
| 1 | CRITICA | No puedes pagar sueldos este mes | Crisis de liquidez terminal | Buscar crédito puente INMEDIATAMENTE. Cobrar todo lo posible hoy. |
| 2 | CRITICA | Cheques o transferencias rebotando | Pérdida de credibilidad financiera | Inyectar fondos propios si es posible. Negociar con acreedores HOY. |
| 3 | CRITICA | Debes impuestos atrasados de 2+ meses | Riesgo de multas, clausura, responsabilidad personal | Regularizar con plan de pagos ante la autoridad fiscal. |
| 4 | ALTA | Ventas cayeron 20%+ vs mismo mes año anterior | Problema de demanda o competencia | Analizar causas. ¿Perdiste clientes clave? ¿Cambió el mercado? |
| 5 | ALTA | El margen bruto cayó 5+ puntos en 3 meses | Costos subiendo o precios erosionados | Renegociar con proveedores. Revisar precios de venta. |
| 6 | ALTA | DSO (días de cobro) aumentó más de 15 días en un trimestre | Los clientes pagan cada vez más tarde | Activar protocolo de cobranza. Evaluar factoring. |
| 7 | ALTA | Dependes de 1-2 clientes para más del 40% de los ingresos | Riesgo de concentración extremo | Plan urgente de diversificación comercial. |
| 8 | MEDIA | Inventario creció 30%+ sin aumento de ventas | Capital atrapado en stock muerto | Liquidar con descuentos. Frenar compras. |
| 9 | MEDIA | Gastos fijos crecen más rápido que las ventas (3+ meses seguidos) | La estructura se está "inflando" | Congelar contrataciones. Auditar cada gasto fijo. |
| 10 | MEDIA | El dueño saca más dinero del que la empresa genera | Descapitalización | Fijar un sueldo fijo para el dueño. Separar finanzas personales. |
| 11 | MEDIA | Pides crédito para pagar crédito anterior | Espiral de deuda | Consolidar deuda. Buscar asesoría financiera profesional. |
| 12 | MODERADA | No tienes estados financieros al día (más de 60 días de atraso) | Vuelas a ciegas — no puedes tomar decisiones informadas | Priorizar poner al día la contabilidad. |
| 13 | MODERADA | Rotación de personal > 30% anual | Costos ocultos de reclutamiento y productividad | Revisar sueldos, clima laboral, condiciones. |
| 14 | MODERADA | No has subido precios en más de 18 meses | Margen erosionado por inflación | Planificar ajuste de precios. |
| 15 | MODERADA | No tienes reserva de emergencia (< 1 mes de gastos fijos en caja) | Cualquier imprevisto genera crisis | Comenzar a acumular reserva: 5% de ingresos mensuales. |

---

### 7.2 Checklist de Diagnóstico Financiero Rápido

Responde SÍ o NO a cada pregunta. Cada NO suma puntos de riesgo.

| # | Pregunta | Sí | No (pts riesgo) |
|---|---------|----|----|
| 1 | ¿Tienes estados financieros al día (máximo 30 días de antigüedad)? | ✓ | 3 |
| 2 | ¿Conoces tu margen bruto actual? | ✓ | 2 |
| 3 | ¿Sabes exactamente cuánto efectivo hay en caja y bancos HOY? | ✓ | 5 |
| 4 | ¿Puedes pagar los sueldos del próximo mes sin problema? | ✓ | 5 |
| 5 | ¿Tus cuentas por cobrar están a menos de 45 días promedio? | ✓ | 3 |
| 6 | ¿Tus ingresos de este trimestre son mayores que el mismo trimestre del año pasado (ajustado por inflación)? | ✓ | 3 |
| 7 | ¿Tu margen neto es positivo? | ✓ | 4 |
| 8 | ¿Tienes reserva de caja para al menos 1 mes de gastos fijos? | ✓ | 4 |
| 9 | ¿Ningún cliente representa más del 30% de tus ingresos? | ✓ | 2 |
| 10 | ¿Tienes un presupuesto anual y lo revisas mensualmente? | ✓ | 2 |
| 11 | ¿Tus impuestos están al día? | ✓ | 4 |
| 12 | ¿El total de cuotas de deuda es menor al 25% de tu flujo mensual? | ✓ | 3 |
| 13 | ¿Separas completamente las finanzas de la empresa y las personales? | ✓ | 2 |
| 14 | ¿Sabes cuál es tu punto de equilibrio? | ✓ | 2 |
| 15 | ¿Has revisado tus precios en los últimos 12 meses? | ✓ | 1 |
| 16 | ¿Tu inventario rota en menos de 90 días? | ✓ | 2 |
| 17 | ¿Tienes seguro para los riesgos principales del negocio? | ✓ | 1 |
| 18 | ¿Haces conciliación bancaria al menos mensual? | ✓ | 2 |
| 19 | ¿Tienes más de 1 proveedor para tus insumos críticos? | ✓ | 2 |
| 20 | ¿Tu equipo clave (personas sin las cuales la empresa no funciona) tiene más de 1 persona? | ✓ | 2 |

**Resultado:**

| Puntaje de riesgo | Diagnóstico | Acción |
|-------------------|-------------|--------|
| 0 - 8 | VERDE — Salud financiera buena | Mantener disciplina. Optimizar y crecer. |
| 9 - 18 | AMARILLO — Hay vulnerabilidades | Atender los puntos débiles en los próximos 30 días. |
| 19 - 30 | NARANJA — Riesgo significativo | Plan de acción urgente. Considerar asesoría profesional. |
| 31 - 52 | ROJO — Situación crítica | Modo supervivencia. Asesoría financiera inmediata. Priorizar caja. |

---

### 7.3 Qué Hacer en los Primeros 7 Días de una Crisis de Caja

**Día 1 — Diagnóstico express:**
- Sacar saldo real de todas las cuentas bancarias.
- Listar TODOS los pagos comprometidos en los próximos 30 días con fecha y monto.
- Listar TODAS las cobranzas esperadas en los próximos 30 días.
- Calcular: ¿la empresa puede sobrevivir 30 días con lo que tiene + lo que va a cobrar?

**Día 2 — Cobranza de emergencia:**
- Llamar personalmente a CADA cliente que debe dinero. No emails. Llamadas.
- Ofrecer descuento del 5% por pago inmediato si es necesario.
- Explorar factoring de emergencia para facturas grandes.
- Cobrar anticipos de proyectos en curso.

**Día 3 — Priorizar pagos:**
- Clasificar cada pago pendiente en: crítico / importante / postergable.
- Pagar solo los críticos (sueldos, impuestos con multa, servicios esenciales).
- Llamar a cada acreedor no crítico y negociar extensión de plazo.

**Día 4 — Cortar gastos:**
- Congelar toda compra no esencial inmediatamente.
- Cancelar gastos zombi (suscripciones, servicios no críticos).
- Suspender publicidad pagada (evaluar caso por caso).
- No despedir aún — es caro y puede empeorar las cosas.

**Día 5 — Buscar financiamiento de emergencia:**
- Línea de crédito disponible no utilizada → activar.
- Factoring → cotizar con 2-3 empresas.
- Crédito fintech rápido (aprobación en 24-48 horas) → aplicar.
- Inyección del dueño si es posible (como préstamo formal a la empresa).

**Día 6 — Renegociar contratos:**
- Proveedores principales: pedir extensión de plazo de pago.
- Arriendo: pedir diferimiento o descuento temporal.
- Créditos bancarios: solicitar período de gracia o reestructuración.

**Día 7 — Plan de 30-60-90 días:**
- Documentar la situación real con números.
- Definir 3-5 acciones concretas con responsable y fecha.
- Establecer revisión semanal de caja.
- Si el problema es estructural (no solo temporal): evaluar cambios mayores (ajustar modelo de negocio, reducir operación, buscar socio).

---

## 8. Tablas de Referencia

### 8.1 Benchmarks de Margen por Industria en LATAM

| Industria | Margen Bruto | Margen Operacional | Margen Neto |
|-----------|-------------|-------------------|-------------|
| Software / SaaS | 70 - 85% | 15 - 30% | 10 - 25% |
| Consultoría / servicios profesionales | 60 - 75% | 20 - 35% | 12 - 25% |
| Restaurantes / food service | 55 - 70% | 8 - 18% | 3 - 12% |
| Panadería / alimentos preparados | 45 - 60% | 10 - 20% | 5 - 12% |
| Retail / comercio | 25 - 40% | 5 - 12% | 2 - 8% |
| Distribución / mayorista | 12 - 22% | 3 - 8% | 1 - 5% |
| Manufactura ligera | 30 - 45% | 8 - 15% | 4 - 10% |
| Construcción | 20 - 35% | 5 - 12% | 2 - 8% |
| Servicios de limpieza / mantenimiento | 40 - 55% | 10 - 20% | 5 - 12% |
| Transporte / logística | 25 - 35% | 5 - 12% | 2 - 7% |
| Salud / clínicas | 50 - 65% | 15 - 25% | 8 - 18% |
| Educación / capacitación | 60 - 80% | 15 - 30% | 10 - 20% |
| Agricultura / agroindustria | 20 - 40% | 5 - 15% | 3 - 10% |
| E-commerce | 30 - 50% | 3 - 10% | 1 - 6% |
| Servicios contables / legales | 65 - 80% | 25 - 40% | 15 - 30% |
| Peluquería / estética | 60 - 75% | 12 - 22% | 5 - 15% |
| Imprenta / diseño gráfico | 40 - 55% | 10 - 20% | 5 - 12% |
| Ferretería | 28 - 38% | 6 - 12% | 3 - 8% |
| Farmacia | 25 - 35% | 5 - 10% | 2 - 6% |
| Veterinaria | 50 - 65% | 12 - 22% | 6 - 15% |

---

### 8.2 Calendario Fiscal por País (resumen)

| Obligación | Chile | México | Colombia | Perú | Argentina |
|-----------|-------|--------|----------|------|-----------|
| **IVA / IGV mensual** | 12 del mes siguiente | 17 del mes siguiente | Bimestral (ene, mar, may, jul, sep, nov) | Según cronograma SUNAT | Según CUIT |
| **Renta anticipada / PPM** | Con el F29 (mensual) | 17 del mes siguiente | Cuatrimestral (abr, ago, dic) | Con PDT 621 (mensual) | Anticipos en jun, ago, oct, dic, feb |
| **Declaración renta anual** | Abril | Marzo (PJ) / Abril (PF) | Abr-May según NIT | Mar-Abr | Mayo-Junio |
| **Cotizaciones / seguridad social** | Mensual (día 10-13) | Bimestral IMSS + mensual | Mensual PILA | Mensual | Mensual |
| **Facturación electrónica** | Obligatoria (SII) | Obligatoria (CFDI) | Obligatoria (FE DIAN) | Obligatoria (OSE/SOL) | Obligatoria (FCE) |
| **Declaraciones informativas** | DJ marzo | DIOT bimestral | Medios magnéticos (anual) | DAOT (anual) | CITI (mensual) |

---

### 8.3 Glosario Financiero en Lenguaje PYME

| Término técnico | Qué significa en simple | Ejemplo |
|----------------|------------------------|---------|
| **Activo** | Todo lo que la empresa TIENE (dinero, inventario, máquinas, cuentas por cobrar) | "El camión de reparto es un activo" |
| **Pasivo** | Todo lo que la empresa DEBE (deudas, créditos, cuentas por pagar) | "Lo que le debemos al banco es un pasivo" |
| **Patrimonio** | Lo que realmente es del dueño (activos - pasivos) | "Si vendemos todo y pagamos deudas, queda el patrimonio" |
| **Capital de trabajo** | Plata disponible para operar en el día a día | "Necesitamos $5M de capital de trabajo para comprar insumos del mes" |
| **Flujo de caja** | El dinero que ENTRA y SALE de la cuenta | "Vendemos mucho pero el flujo de caja es malo porque nos pagan a 60 días" |
| **EBITDA** | Cuánto genera la operación ANTES de intereses, impuestos y depreciación | "Nuestro EBITDA es $2M mensuales — esa es la capacidad real de generar plata" |
| **Margen bruto** | Cuánto queda después de pagar lo que cuesta producir/comprar | "Vendemos el producto a $10.000 y nos cuesta $4.000 — margen bruto del 60%" |
| **Margen neto** | Cuánto queda después de pagar TODO (costos, gastos, impuestos) | "De cada $100 que vendemos, nos quedan $8 limpios" |
| **Punto de equilibrio** | Cuánto hay que vender para no ganar ni perder | "Necesitamos vender 500 unidades al mes solo para cubrir costos" |
| **Depreciación** | Reconocer que un activo pierde valor con el tiempo | "El camión costó $20M, cada año pierde $4M de valor contable" |
| **Amortización** | Lo mismo que depreciación pero para cosas intangibles (software, patentes) | "El software de gestión se amortiza en 3 años" |
| **Devengado** | Registrar el ingreso/gasto cuando OCURRE, no cuando se paga/cobra | "Vendí en diciembre, me pagan en enero — el ingreso se devenga en diciembre" |
| **Provisión** | Guardar plata (contablemente) para un gasto futuro probable | "Provisionamos 2% de ventas para incobrables" |
| **Apalancamiento** | Usar deuda para financiar el negocio | "Nos apalancamos con un crédito para comprar la máquina nueva" |
| **Liquidez** | Qué tan fácil es convertir lo que tienes en efectivo | "Tenemos activos pero poca liquidez — todo está en inventario" |
| **Factoring** | Vender tus facturas a un tercero para cobrar antes | "Tenemos una factura de $5M a 60 días pero necesitamos plata hoy — factoring" |
| **Leasing** | Arriendo con opción de compra | "El camión es leasing — pagamos cuotas y al final es nuestro" |
| **Costo de oportunidad** | Lo que dejas de ganar por elegir una opción sobre otra | "Si meto $10M en inventario en vez de invertirlo, pierdo el rendimiento que me daría" |
| **Tasa efectiva anual (TEA)** | El costo REAL de un crédito incluyendo todos los cobros | "El banco dice 12% pero con comisiones la TEA es 18%" |
| **ROI** | Retorno sobre la inversión: cuánto ganas por cada peso invertido | "Invertimos $1M en publicidad y generó $3M en ventas — ROI de 200%" |
| **Break-even** | Lo mismo que punto de equilibrio, en inglés | — |
| **Working capital** | Lo mismo que capital de trabajo, en inglés | — |
| **Cash flow** | Lo mismo que flujo de caja, en inglés | — |
| **Overhead** | Gastos generales de la empresa que no van directo al producto | "El arriendo, la contabilidad y el internet son overhead" |
| **Markup vs Margen** | Markup es sobre el costo, margen es sobre el precio de venta | "Costo $100, vendo $150: markup=50%, margen=33%" |
| **Burn rate** | Cuánto dinero gasta la empresa por mes (común en startups) | "Nuestro burn rate es $8M/mes — con la caja actual duramos 4 meses" |

---

### 8.4 Fórmulas Rápidas de Referencia

```
LIQUIDEZ
  Razón corriente           = Activo corriente / Pasivo corriente
  Prueba ácida              = (Activo corriente - Inventario) / Pasivo corriente
  Capital de trabajo        = Activo corriente - Pasivo corriente

RENTABILIDAD
  Margen bruto (%)          = (Ventas - Costo de ventas) / Ventas × 100
  Margen operacional (%)    = EBIT / Ventas × 100
  Margen neto (%)           = Utilidad neta / Ventas × 100
  ROE (%)                   = Utilidad neta / Patrimonio × 100
  ROA (%)                   = Utilidad neta / Activos totales × 100
  EBITDA                    = EBIT + Depreciación + Amortización

EFICIENCIA
  Rotación de inventario    = Costo de ventas / Inventario promedio
  Días de inventario        = 365 / Rotación de inventario
  DSO (días de cobro)       = (Cuentas por cobrar / Ventas) × 365
  DPO (días de pago)        = (Cuentas por pagar / Costo ventas) × 365
  CCE                       = Días inventario + DSO - DPO

ENDEUDAMIENTO
  Endeudamiento total (%)   = Pasivo total / Activo total × 100
  Deuda / Patrimonio        = Pasivo total / Patrimonio
  Deuda / EBITDA            = Deuda financiera / EBITDA anual
  Cobertura de intereses    = EBITDA / Gastos financieros

PRICING
  Precio (dado margen)      = Costo / (1 - Margen deseado)
  Margen (dado precio)      = (Precio - Costo) / Precio × 100
  Markup (%)                = (Precio - Costo) / Costo × 100
  PE unidades               = Costos fijos / (Precio - Costo variable unitario)
  PE en dinero              = Costos fijos / (Margen contribución %)

CRECIMIENTO
  Variación MoM (%)         = (Mes actual - Mes anterior) / Mes anterior × 100
  Variación YoY (%)         = (Mes actual - Mismo mes año anterior) / Mismo mes año anterior × 100
  Crecimiento real (%)      = ((1 + Crecimiento nominal) / (1 + Inflación)) - 1
  CAGR (%)                  = (Valor final / Valor inicial)^(1/años) - 1
```

---

> **Nota para el agente**: Este documento es una referencia viva. Los datos de tasas, topes tributarios y normativas deben validarse con fuentes oficiales vigentes, ya que cambian frecuentemente en la región. Siempre recomendar al usuario consultar con un contador certificado para decisiones tributarias específicas.

---

# SECCIÓN AMPLIADA — Regulaciones Fiscales, Benchmarks, Modelado Financiero, Financiamiento y Alertas

---

## 6. Regulaciones Fiscales por País (2025-2026)

> **Advertencia**: Las tasas y umbrales se actualizan anualmente. Las cifras aquí son las vigentes a inicios de 2026. Siempre verificar en el portal oficial de cada autoridad tributaria.

---

### 6.1 Chile

| Dato | Detalle |
|------|---------|
| **Autoridad tributaria** | Servicio de Impuestos Internos (SII) — [sii.cl](https://www.sii.cl) |
| **IVA** | 19% sobre ventas de bienes y servicios gravados |
| **Exenciones IVA** | Servicios de salud, educación, transporte de pasajeros, seguros de vida, exportaciones (tasa 0%) |
| **Facturación electrónica** | Obligatoria desde 2018 para todos los contribuyentes (DTE vía SII) |

#### Impuesto a la renta — Regímenes para PYMEs

| Régimen | Tope de ingresos | Tasa de primera categoría | Tributación del dueño | Ideal para |
|---------|-------------------|---------------------------|----------------------|------------|
| **Pro PYME General (14D N°3)** | ≤ 75.000 UF/año (~CLP 2.800M) | 25% | Retiros tributan en Global Complementario con crédito 100% | PYME con reinversión moderada |
| **Pro PYME Transparente (14D N°8)** | ≤ 75.000 UF/año | 0% a nivel empresa | Toda la utilidad se asigna al dueño y tributa en Global Complementario (0%-40%) | Microempresas donde dueño retira todo |
| **Régimen General Semi-Integrado (14A)** | Sin tope | 27% | Retiros tributan con crédito parcial (65%) | Empresas grandes o con muchos socios |

#### Obligaciones mensuales y trimestrales

| Obligación | Formulario | Plazo |
|------------|------------|-------|
| Declaración y pago IVA | F29 | Día 12 del mes siguiente (o 20 si es por internet) |
| PPM (Pagos Provisionales Mensuales) | F29 (integrado) | Junto con el IVA |
| Retenciones de honorarios (boletas) | F29 | Junto con el IVA |
| DJ Renta Anual | F22 | Abril de cada año |
| Declaraciones juradas informativas | Varias (DJ 1879, 1887, etc.) | Marzo de cada año |

#### Cargas sociales y previsionales (costo empleador)

| Concepto | Tasa (% sobre remuneración imponible) |
|----------|---------------------------------------|
| AFP (pensiones) — cargo trabajador | 10% + comisión AFP (~11,5% total) |
| Salud (Fonasa/Isapre) — cargo trabajador | 7% |
| Seguro de cesantía — cargo empleador | 2,4% (contrato indefinido) / 3% (plazo fijo) |
| Seguro de cesantía — cargo trabajador | 0,6% (solo contrato indefinido) |
| Seguro de accidentes (mutual) — cargo empleador | 0,93% base + tasa adicional según riesgo (0%-3,4%) |
| SIS (Seguro de Invalidez y Sobrevivencia) — cargo empleador | 1,53% |
| **Costo empleador total aproximado** | **~5-7% sobre la remuneración bruta** |

#### Errores fiscales comunes de PYMEs en Chile

1. **No emitir boletas por ventas menores** — el SII cruza información con pagos electrónicos (Transbank, Flow).
2. **Mezclar gastos personales con gastos de empresa** — retiros no documentados generan "partidas del artículo 21" (tasa 40%).
3. **No recuperar IVA crédito fiscal** — especialmente en compras de activos fijos e importaciones.
4. **Elegir mal el régimen tributario** — una PYME que retira todo debería estar en Transparente, no en General.
5. **Atrasar el pago de PPM** — genera intereses del 1,5% mensual + multas del 10-30%.
6. **No registrar correctamente las notas de crédito electrónicas** — genera diferencias en la DJ de IVA.
7. **Ignorar la depreciación acelerada/instantánea** — Pro PYME permite depreciación instantánea, ahorrando PPM.
8. **No cotizar previsionales de socios que trabajan en la empresa** — obligatorio y fiscalizado.

---

### 6.2 México

| Dato | Detalle |
|------|---------|
| **Autoridad tributaria** | Servicio de Administración Tributaria (SAT) — [sat.gob.mx](https://www.sat.gob.mx) |
| **IVA** | 16% general; 0% en alimentos básicos, medicinas, exportaciones |
| **Exenciones IVA** | Servicios médicos, educación, venta de vivienda, libros, transporte público |
| **Facturación electrónica** | Obligatoria (CFDI) desde 2014; CFDI 4.0 vigente desde 2023 |

#### Impuesto sobre la renta — Regímenes para PYMEs

| Régimen | Tope de ingresos | Tasa/Esquema | Ideal para |
|---------|-------------------|--------------|------------|
| **RESICO Personas Físicas** | ≤ MXN 3.500.000/año | 1% a 2,5% sobre ingresos facturados cobrados | Freelancers, profesionistas, tiendas pequeñas |
| **Régimen General de Personas Físicas** | Sin tope | Tasa progresiva 1,92% a 35% sobre utilidad | Personas con ingresos altos o que no califican RESICO |
| **Régimen General Personas Morales** | Sin tope | 30% sobre utilidad fiscal | Sociedades (SA, SAPI, S de RL) |
| **RESICO Personas Morales** | ≤ MXN 35.000.000/año | 30% pero con facilidades contables | Sociedades pequeñas |

#### Obligaciones mensuales y anuales

| Obligación | Plazo |
|------------|-------|
| Declaración mensual ISR (pago provisional) | Día 17 del mes siguiente |
| Declaración mensual IVA | Día 17 del mes siguiente |
| Retenciones ISR a trabajadores | Día 17 del mes siguiente |
| Declaración anual Personas Morales | 31 de marzo |
| Declaración anual Personas Físicas | 30 de abril |
| DIOT (Declaración Informativa de Operaciones con Terceros) | Día 17 del mes siguiente |
| Envío de contabilidad electrónica al SAT | Mensual (día 25 del mes siguiente) |

#### Cargas sociales y patronales

| Concepto | Tasa empleador |
|----------|----------------|
| IMSS — Cuota fija por enfermedad y maternidad | ~20,4% de 1 UMA diaria |
| IMSS — Excedente sobre 3 UMA | 1,10% |
| IMSS — Prestaciones en dinero | 0,70% |
| IMSS — Riesgos de trabajo | 0,50% a 7,59% (según giro) |
| IMSS — Guarderías | 1,00% |
| IMSS — Invalidez y vida | 1,75% |
| IMSS — Retiro (SAR) | 2,00% |
| IMSS — Cesantía y vejez | 3,15% (incrementando hasta 2030) |
| Infonavit (vivienda) | 5,00% |
| Impuesto sobre nómina (estatal) | 2% a 3% según estado |
| **Total costo patronal aproximado** | **~25-35% sobre salario bruto** |

#### Errores fiscales comunes de PYMEs en México

1. **No timbrar CFDI en tiempo y forma** — la cancelación de CFDI tiene reglas estrictas desde 2022.
2. **Deducir gastos sin CFDI válido** — el SAT rechaza deducciones sin comprobante fiscal digital.
3. **Caer de RESICO a Régimen General por exceder tope** — el cambio es automático y retroactivo al 1° de enero.
4. **No presentar DIOT** — muchas PYMEs la olvidan; genera multas de MXN 10.000-30.000.
5. **Pagar en efectivo montos > MXN 2.000** — no son deducibles (Ley ISR Art. 27 Fracc. III).
6. **No acumular ingresos por depósitos bancarios** — el SAT cruza depósitos vs CFDI emitidos.
7. **Confundir régimen de flujo de efectivo con devengado** — RESICO PF tributa sobre cobros; PM sobre devengado.
8. **Omitir la participación de utilidades (PTU)** — obligatoria, 10% de utilidad fiscal; tope de 3 meses de salario.

---

### 6.3 Colombia

| Dato | Detalle |
|------|---------|
| **Autoridad tributaria** | Dirección de Impuestos y Aduanas Nacionales (DIAN) — [dian.gov.co](https://www.dian.gov.co) |
| **IVA** | 19% general; 5% tarifa reducida (algunos alimentos procesados, seguros) |
| **Exenciones IVA** | Canasta familiar básica, salud, educación, transporte público, exportaciones (0%) |
| **Facturación electrónica** | Obligatoria desde 2020 para todos los contribuyentes (resoluciones DIAN) |

#### Impuesto de renta — Regímenes para PYMEs

| Régimen | Requisitos | Tasa/Esquema | Ideal para |
|---------|------------|--------------|------------|
| **Régimen Simple de Tributación (RST)** | Ingresos ≤ 100.000 UVT/año (~COP 4.700M en 2026); persona natural o jurídica | 1,8% a 14,5% sobre ingresos brutos (según actividad e ingreso) | Comercios, restaurantes, profesionales independientes |
| **Régimen Ordinario** | Sin tope | 35% sobre utilidad fiscal (personas jurídicas) | Empresas medianas y grandes |
| **Persona natural Régimen Ordinario** | Sin tope | Progresivo 0% a 39% sobre renta líquida | Profesionales de altos ingresos |

#### Tarifas del Régimen Simple 2025-2026 (resumen por grupo)

| Grupo | Actividad | Ingresos hasta 6.000 UVT | 6.001-15.000 UVT | 15.001-30.000 UVT | 30.001-100.000 UVT |
|-------|-----------|--------------------------|-------------------|--------------------|---------------------|
| 1 | Tiendas, minimercados, peluquerías | 1,8% | 2,2% | 3,9% | 5,4% |
| 2 | Actividades comerciales, industriales | 3,7% | 4,2% | 5,0% | 5,6% |
| 3 | Servicios profesionales, consultoría | 5,6% | 7,3% | 10,0% | 14,0% |
| 4 | Restaurantes, bares, alimentos | 3,4% | 3,8% | 4,5% | 5,0% |

#### Obligaciones periódicas

| Obligación | Frecuencia | Plazo |
|------------|------------|-------|
| Declaración de IVA | Bimestral (< 92.000 UVT) o cuatrimestral | Según último dígito NIT |
| Retención en la fuente | Mensual | Según último dígito NIT |
| Anticipo de renta (Régimen Simple) | Bimestral | Según calendario tributario |
| Declaración de renta anual | Anual | Abril-mayo según NIT |
| ICA (Impuesto de Industria y Comercio) | Bimestral o anual (según municipio) | Varía por municipio |
| Información exógena | Anual | Según resolución DIAN |

#### Cargas sociales y parafiscales (costo empleador)

| Concepto | Tasa empleador |
|----------|----------------|
| Salud (EPS) | 8,5% (empleador paga 8,5%; trabajador 4%) |
| Pensión (AFP) | 12% (empleador 12%; trabajador 4%) |
| ARL (Riesgos laborales) | 0,522% a 6,96% según nivel de riesgo |
| Caja de compensación | 4% |
| ICBF | 3% (exento si salario < 10 SMMLV) |
| SENA | 2% (exento si salario < 10 SMMLV) |
| **Total costo empleador aproximado** | **~22-30% sobre salario** (con exoneración de salud, ICBF y SENA para salarios < 10 SMMLV: ~16-20%) |

> **Nota**: Las empresas que pagan salarios < 10 SMMLV están exoneradas de aportes a salud (8,5%), ICBF (3%) y SENA (2%) según Ley 1607/2012. Esto aplica a la gran mayoría de PYMEs.

#### Errores fiscales comunes de PYMEs en Colombia

1. **No expedir factura electrónica** — multa del 1% del valor de las operaciones facturadas sin requisitos.
2. **Omitir la retención en la fuente como agente retenedor** — genera sanción penal (peculado por apropiación).
3. **No liquidar correctamente prestaciones sociales** — prima, cesantías, intereses de cesantías, vacaciones.
4. **Desconocer la exoneración de aportes parafiscales** — muchas PYMEs siguen pagando ICBF/SENA innecesariamente.
5. **No presentar información exógena** — multa por extemporaneidad que puede llegar a 1.300 UVT (~COP 61M).
6. **Confundir IVA con ICA** — el ICA es municipal y tiene tarifas distintas; ambos coexisten.
7. **No hacer ajuste por inflación en activos** — afecta la base gravable de renta.
8. **Pasarse de SMMLV al dar auxilios sin soporte** — auxilios de transporte, alimentación, etc. tienen topes legales.

---

### 6.4 Perú

| Dato | Detalle |
|------|---------|
| **Autoridad tributaria** | Superintendencia Nacional de Aduanas y de Administración Tributaria (SUNAT) — [sunat.gob.pe](https://www.sunat.gob.pe) |
| **IGV (equivalente al IVA)** | 18% (16% IGV + 2% IPM) |
| **Exenciones IGV** | Productos agrícolas sin procesar, educación, algunos servicios de salud, exportaciones (0%) |
| **Facturación electrónica** | Obligatoria para todos los contribuyentes desde 2021 (Sistema de Emisión Electrónica — SEE) |

#### Impuesto a la renta — Regímenes para PYMEs

| Régimen | Tope de ingresos | Tasa | Libros contables | Ideal para |
|---------|-------------------|------|-------------------|------------|
| **NRUS (Nuevo RUS)** | ≤ S/ 96.000/año (S/ 8.000/mes) | Cuota fija: S/ 20 (Cat. 1, hasta S/5.000/mes) o S/ 50 (Cat. 2, hasta S/8.000/mes) | Ninguno | Bodegas, ambulantes, microempresas muy pequeñas |
| **RER (Régimen Especial)** | ≤ S/ 525.000/año | 1,5% sobre ingresos netos mensuales | Registro de ventas y compras | Comercio y manufactura pequeña |
| **MYPE Tributario (RMT)** | ≤ 1.700 UIT/año (~S/ 8.670.000) | 1% mensual (hasta 300 UIT) o coeficiente; anual: 10% (primeras 15 UIT de renta) + 29,5% sobre exceso | Según ingresos | La mayoría de PYMEs |
| **Régimen General** | Sin tope | 29,5% sobre renta neta anual | Contabilidad completa | Empresas medianas y grandes |

#### Obligaciones mensuales y anuales

| Obligación | Plazo |
|------------|-------|
| Declaración mensual IGV e IR (PDT 621 o Declara Fácil) | Según último dígito RUC (entre el 10 y 22 del mes siguiente) |
| Pago a cuenta mensual del IR | Junto con la declaración mensual |
| Declaración anual del IR | Marzo-abril |
| Planilla electrónica (PLAME) | Mensual, según cronograma SUNAT |
| Libros electrónicos (PLE/SLE) | Mensual (contribuyentes obligados) |

#### Cargas sociales (costo empleador)

| Concepto | Tasa empleador |
|----------|----------------|
| EsSalud (salud) | 9% |
| SCTR (Seguro Complementario de Trabajo de Riesgo) | 0,5%-1,5% (solo actividades de riesgo) |
| ONP (pensión estatal) — cargo trabajador | 13% |
| AFP (pensión privada) — cargo trabajador | ~13% (aporte + comisión + seguro) |
| CTS (Compensación por Tiempo de Servicios) — empleador | ~8,33% (1 sueldo/año, depositado en mayo y noviembre) |
| Gratificaciones (julio y diciembre) — empleador | ~16,67% (2 sueldos/año) |
| Vacaciones — empleador | ~8,33% (1 sueldo/año) |
| **Costo empleador total aproximado (sobre sueldo bruto)** | **~42-50%** (incluyendo CTS, gratificaciones y vacaciones) |

> **Nota**: El costo laboral peruano es engañosamente alto porque incluye gratificaciones y CTS obligatorias, que no son "impuestos" pero sí costos del empleador.

#### Errores fiscales comunes de PYMEs en Perú

1. **No emitir comprobantes por ventas menores** — SUNAT cruza con información de POS y bancos.
2. **Elegir NRUS cuando se supera el tope** — genera multas y reclasificación automática al RER o RMT.
3. **No depositar CTS a tiempo** — genera intereses y multas laborales ante SUNAFIL.
4. **Usar facturas de "empresas fantasma"** — SUNAT publicó listas de proveedores no habidos; las facturas no dan derecho a crédito fiscal.
5. **No llevar libros electrónicos** — desde 2023 es obligatorio para ingresos > 75 UIT.
6. **Confundir el pago a cuenta con el impuesto definitivo** — el 1% mensual (RMT) es adelanto; la regularización anual puede salir más.
7. **No bancarizar pagos > S/ 2.000** — la norma de bancarización exige usar medios de pago para deducir gastos y crédito fiscal.
8. **Omitir la detracción/retención/percepción del IGV** — el sistema de detracciones es complejo y las multas son automáticas.

---

### 6.5 Argentina

| Dato | Detalle |
|------|---------|
| **Autoridad tributaria** | Administración Federal de Ingresos Públicos (AFIP) / Agencia de Recaudación y Control Aduanero (ARCA) — [afip.gob.ar](https://www.afip.gob.ar) |
| **IVA** | 21% general; 10,5% reducida (construcción, ciertos alimentos, transporte); 27% para servicios a Responsables Inscriptos |
| **Exenciones IVA** | Educación, salud, libros, exportaciones (0%), pan, leche, seguros de vida |
| **Facturación electrónica** | Obligatoria para todos los contribuyentes desde 2019 (Comprobantes en Línea / WebServices AFIP) |

#### Impuesto a las ganancias — Regímenes para PYMEs

| Régimen | Tope de ingresos | Tasa | Ideal para |
|---------|-------------------|------|------------|
| **Monotributo** | Varía según categoría (max ~ARS 68M/año en 2025, se actualiza semestralmente) | Cuota fija mensual que incluye impuesto, jubilación y obra social | Trabajadores independientes y microempresas |
| **Régimen General — Sociedades** | Sin tope | 25% (utilidad ≤ ARS 50M) / 30% (utilidad > ARS 50M) — *tramos actualizables* | SRL, SA, SAS |
| **Régimen General — Personas humanas** | Sin tope | Progresivo 5% a 35% sobre ganancia neta sujeta a impuesto | Profesionales y empresas unipersonales |

> **Nota**: Argentina actualiza topes y escalas frecuentemente por inflación. Los montos aquí son referenciales; siempre consultar la tabla vigente en AFIP/ARCA.

#### Categorías del Monotributo (resumen simplificado — 2025)

| Categoría | Ingresos brutos anuales máx. | Cuota mensual aprox. (impuesto + SIPA + obra social) |
|-----------|------------------------------|-------------------------------------------------------|
| A | Hasta ~ARS 7,8M | ~ARS 26.600 |
| B | Hasta ~ARS 11,6M | ~ARS 30.300 |
| C | Hasta ~ARS 16,3M | ~ARS 35.500 |
| D | Hasta ~ARS 20,2M | ~ARS 45.000 |
| E | Hasta ~ARS 23,8M | ~ARS 64.000 |
| F | Hasta ~ARS 29,7M | ~ARS 80.000 |
| G | Hasta ~ARS 35,6M | ~ARS 110.000 |
| H | Hasta ~ARS 44,5M | ~ARS 210.000 |
| I-K (solo servicios/venta bienes) | Hasta ~ARS 68M | ~ARS 250.000-500.000 |

> **Importante**: Estos montos se actualizan semestralmente. La tabla vigente se consulta en el sitio de AFIP.

#### Obligaciones periódicas

| Obligación | Frecuencia | Plazo |
|------------|------------|-------|
| DDJJ IVA | Mensual | Según terminación CUIT |
| Pago a cuenta de Ganancias (anticipos) | Mensual (5 anticipos en sociedades, 10 en personas humanas) | Según calendario AFIP |
| Ingresos Brutos (IIBB, impuesto provincial) | Mensual | Según jurisdicción (SIRCREB para Convenio Multilateral) |
| Monotributo — cuota mensual | Mensual | Día 20 de cada mes |
| DDJJ anual Ganancias sociedades | Anual | Mayo (cierre diciembre) |
| DDJJ anual Ganancias personas humanas | Anual | Junio |
| SIPER / Régimen de información | Periódico | Según resolución |

#### Cargas sociales (costo empleador)

| Concepto | Tasa empleador |
|----------|----------------|
| Jubilación (SIPA) | 10,17% |
| PAMI (INSSJP) | 1,50% |
| Asignaciones familiares | 4,44% |
| Fondo Nacional de Empleo | 0,89% |
| Obra social | 6% |
| ART (Aseguradora de Riesgos del Trabajo) | 2%-8% según actividad |
| **Total contribuciones patronales** | **~23-31%** (PYMEs tienen reducción de contribuciones) |

> Las PYMEs registradas en el Registro PYME acceden a reducción de contribuciones patronales y otros beneficios.

#### Errores fiscales comunes de PYMEs en Argentina

1. **Excluirse o ser excluido del Monotributo sin plan de transición** — el salto a Responsable Inscripto implica IVA + Ganancias + aumento de costos del 30-50%.
2. **No recategorizarse en Monotributo cada semestre** — AFIP recategoriza de oficio y cobra diferencias con intereses.
3. **Ignorar Ingresos Brutos (IIBB)** — es el impuesto que más PYMEs omiten; alícuotas varían de 1,5% a 5% según provincia y actividad.
4. **No inscribirse en Convenio Multilateral cuando operan en varias provincias** — genera retenciones acumulativas en SIRCREB.
5. **Mezclar cuentas bancarias personales y de la empresa** — AFIP cruza movimientos bancarios con facturación.
6. **No aprovechar beneficios del Registro PYME** — reducción de contribuciones, IVA a 90 días, etc.
7. **Emitir facturas tipo B cuando corresponde tipo A** — genera contingencias de IVA.
8. **No ajustar por inflación los estados contables** — obligatorio desde 2019; omitirlo distorsiona la base imponible.

---

### 6.6 Bolivia

| Dato | Detalle |
|------|---------|
| **Autoridad tributaria** | Servicio de Impuestos Nacionales (SIN) — [impuestos.gob.bo](https://impuestos.gob.bo) |
| **IVA** | 13% (Impuesto al Valor Agregado, contenido en el precio — efectivo ~14,94%) |
| **Exenciones IVA** | Importaciones diplomáticas, donaciones, servicios financieros específicos |
| **Facturación electrónica** | En implementación progresiva desde 2021 (Sistema de Facturación Electrónica — SFE); obligatoria para la mayoría de contribuyentes desde 2024 |

#### Impuestos principales para PYMEs

| Impuesto | Base | Tasa | Frecuencia |
|----------|------|------|------------|
| IVA (Impuesto al Valor Agregado) | Ventas de bienes y servicios | 13% (contenido en precio) | Mensual |
| IT (Impuesto a las Transacciones) | Ingresos brutos | 3% | Mensual |
| IUE (Impuesto sobre las Utilidades de las Empresas) | Utilidad neta | 25% | Anual |
| RC-IVA (Régimen Complementario al IVA) | Ingresos de personas | 13% | Mensual (empleador retiene) |
| **Régimen Simplificado** | Para artesanos, comerciantes minoristas, vivanderos | Cuota fija bimestral (BOB 47-2.400 según categoría) | Bimestral |
| **Régimen Integrado (transporte)** | Transporte público | Cuota fija anual según valor del vehículo | Anual |

#### Obligaciones periódicas

| Obligación | Formulario | Plazo |
|------------|------------|-------|
| IVA mensual | Form. 200 | Según último dígito NIT (entre 13-22 del mes siguiente) |
| IT mensual | Form. 400 | Mismo plazo que IVA |
| Retenciones RC-IVA | Form. 608 | Mensual |
| IUE anual | Form. 500 | 120 días después del cierre fiscal |
| Planillas salariales | Varios | Trimestral ante Ministerio de Trabajo |

#### Cargas sociales (costo empleador)

| Concepto | Tasa empleador |
|----------|----------------|
| CNS (Caja Nacional de Salud) | 10% |
| AFP (pensión — aporte patronal pro-vivienda) | 2% |
| AFP (riesgo profesional) | 1,71% |
| AFP (aporte solidario) — cargo empleador | 3% (sobre salarios > 13.000 BOB) |
| Aguinaldo (un sueldo/año) | ~8,33% |
| **Total costo empleador aproximado** | **~22-25%** (más aguinaldo y segundo aguinaldo si hay crecimiento del PIB) |

> **Nota**: Si el PIB crece > 4,5%, el gobierno decreta "doble aguinaldo", que añade otro ~8,33%.

#### Errores fiscales comunes de PYMEs en Bolivia

1. **No emitir factura por ventas al detalle** — el SIN realiza operativos de control frecuentes.
2. **No acreditar IT contra IUE** — el IT pagado se puede descontar del IUE; muchas PYMEs pierden este beneficio.
3. **Incumplir el Sistema de Facturación Electrónica (SFE)** — la migración es obligatoria; usar dosificaciones vencidas genera clausura.
4. **No registrar dependientes para RC-IVA** — los empleados no presentan facturas de descargo y el empleador retiene de más o de menos.
5. **No pagar el segundo aguinaldo cuando corresponde** — genera multas laborales y acciones legales.
6. **Omitir IT en actividades que no generan IVA** — el IT grava todas las transacciones, incluyendo las no gravadas por IVA.
7. **No inscribir la empresa en el Registro de Comercio de Bolivia (FUNDEMPRESA)** — requisito para operar formalmente.

---

### 6.7 Ecuador

| Dato | Detalle |
|------|---------|
| **Autoridad tributaria** | Servicio de Rentas Internas (SRI) — [sri.gob.ec](https://www.sri.gob.ec) |
| **IVA** | 15% (incrementado desde 12% en abril 2024 por 2 años; puede retornar a 12% en 2026) |
| **Exenciones IVA** | Canasta básica, salud, educación, exportaciones (0%), arriendos de vivienda |
| **Facturación electrónica** | Obligatoria para todos los contribuyentes desde 2022 |

#### Impuesto a la renta — Regímenes para PYMEs

| Régimen | Requisitos | Tasa | Ideal para |
|---------|------------|------|------------|
| **RIMPE Emprendedores** | Ingresos ≤ USD 300.000/año | 1% a 2% sobre ingresos brutos (escala progresiva) | Negocios nuevos o pequeños |
| **RIMPE Negocios Populares** | Ingresos ≤ USD 20.000/año | Cuota fija anual USD 60 (incluye IVA) | Tiendas de barrio, ambulantes |
| **Régimen General Sociedades** | Sin tope | 25% sobre utilidad (22% si reinvierte + 3% si tiene accionistas en paraísos fiscales) | Empresas medianas y grandes |
| **Régimen General Personas Naturales** | Sin tope | Progresivo 0% a 37% | Profesionales de altos ingresos |

#### Escala del RIMPE Emprendedores

| Tramo de ingresos (USD) | Tarifa |
|--------------------------|--------|
| 0 — 20.000 | 0% (si califica como negocio popular: cuota fija USD 60) |
| 20.001 — 50.000 | 1,0% |
| 50.001 — 75.000 | 1,25% |
| 75.001 — 100.000 | 1,5% |
| 100.001 — 200.000 | 1,75% |
| 200.001 — 300.000 | 2,0% |

#### Obligaciones periódicas

| Obligación | Frecuencia | Plazo |
|------------|------------|-------|
| Declaración IVA | Mensual (si vende bienes/servicios gravados) o semestral (si solo vende con tarifa 0%) | Según noveno dígito RUC (mes siguiente) |
| Retenciones en la fuente del IR | Mensual | Según noveno dígito RUC |
| Declaración IR anual (personas naturales) | Anual | Marzo |
| Declaración IR anual (sociedades) | Anual | Abril |
| Anexo Transaccional Simplificado (ATS) | Mensual | Mes siguiente |
| RIMPE — declaración | Semestral (emprendedores) o anual (negocios populares) | Según calendario SRI |

#### Cargas sociales (costo empleador)

| Concepto | Tasa empleador |
|----------|----------------|
| IESS (aporte patronal) | 11,15% |
| IESS (aporte personal) — cargo trabajador | 9,45% |
| IECE (Capacitación) + SECAP | 1,0% (incluido en patronal) |
| Décimo tercer sueldo (aguinaldo) | ~8,33% |
| Décimo cuarto sueldo (bono escolar) | 1 SBU/año (~USD 460) |
| Fondos de reserva (a partir del 2° año) | 8,33% |
| **Total costo empleador aproximado** | **~28-35%** sobre sueldo (incluyendo décimos y fondos de reserva) |

#### Errores fiscales comunes de PYMEs en Ecuador

1. **No emitir comprobantes electrónicos** — el SRI clausura establecimientos por reincidencia (hasta 7 días).
2. **No retener en la fuente cuando corresponde** — las sociedades son agentes de retención obligatorios.
3. **Confundir RIMPE con régimen general** — entrar y salir del RIMPE tiene implicaciones de IVA y contabilidad.
4. **No declarar IVA cuando solo se tiene tarifa 0%** — la declaración semestral sigue siendo obligatoria.
5. **Olvidar el Anexo Transaccional Simplificado (ATS)** — multas de USD 30-1.500 por omisión.
6. **No pagar décimo tercer y cuarto sueldo en plazo** — genera intereses y demandas laborales.
7. **Confundir dolarización con simplicidad fiscal** — Ecuador no tiene riesgo cambiario pero tiene complejidad tributaria similar a otros países.
8. **No considerar el anticipo de IR** — calculado sobre patrimonio, costos, gastos e ingresos; no es optativo.

---

## 7. Benchmarks Financieros por Industria — LATAM

> **Fuentes**: Combinación de datos de CEPAL, BID, cámaras de comercio, estudios sectoriales de Deloitte LATAM, KPMG, reportes de bancos centrales, y encuestas a PYMEs de la región. Los rangos reflejan medianas para PYMEs con 5-50 empleados.

---

### 7.1 Restaurantes / Food Service

| Indicador | Rango saludable | Alerta |
|-----------|----------------|--------|
| **Margen bruto** | 60-70% | < 55% |
| **Margen operativo (EBIT)** | 8-15% | < 5% |
| **Margen neto** | 5-10% | < 3% |
| **Costo de alimentos / Ingresos** | 28-35% | > 38% |
| **Costo de personal / Ingresos** | 25-32% | > 35% |
| **Arriendo / Ingresos** | 6-10% | > 12% |
| **Días de inventario** | 5-10 días | > 14 días (riesgo de merma) |
| **Días de cuentas por cobrar** | 0-5 días (mayoría venta al contado) | > 15 días |
| **Días de cuentas por pagar** | 15-30 días | > 45 días (tensión con proveedores) |
| **Ticket promedio** | Varía por concepto (USD 5-25 LATAM) | Decreciente por 3+ meses |
| **Punto de equilibrio típico** | 60-70% de capacidad del local | Si necesita >85% para breakeven: modelo inviable |
| **CAC (costo adquisición cliente)** | USD 2-8 (redes sociales/delivery) | > USD 15 |
| **LTV (valor del cliente)** | USD 80-300/año (cliente frecuente) | Si LTV < 5× CAC |
| **Rotación de mesas/día** | 2-4 turnos | < 1,5 turnos |

**KPIs críticos del sector:**
- **Food cost %** = Costo de materia prima / Ventas netas
- **RevPASH** (Revenue per Available Seat Hour) = Ventas / (Asientos × Horas de operación)
- **Merma (%)** = Desperdicio / Compras de materia prima → objetivo < 3%

---

### 7.2 Retail / Tiendas

| Indicador | Rango saludable | Alerta |
|-----------|----------------|--------|
| **Margen bruto** | 35-50% (ropa/accesorios: 50-65%; abarrotes: 20-30%) | < 25% en abarrotes; < 40% en ropa |
| **Margen operativo** | 5-12% | < 3% |
| **Margen neto** | 3-8% | < 2% |
| **Días de inventario** | 30-60 días (ropa: 60-90; abarrotes: 15-25) | > 90 días = inventario muerto |
| **Días de cuentas por cobrar** | 0-7 días (mayoría contado/tarjeta) | > 15 días |
| **Días de cuentas por pagar** | 30-60 días | > 90 días |
| **Rotación de inventario anual** | 4-8 veces (ropa: 3-5; abarrotes: 15-25) | < 3 veces/año |
| **Venta por m²/mes** | USD 100-400 según país y ubicación | Decreciente por 3+ meses |
| **Punto de equilibrio** | 55-70% del inventario vendido al precio regular | Si necesita >80% de venta a precio completo |
| **CAC** | USD 5-15 | > USD 25 |
| **LTV** | USD 100-500/año | < 3× CAC |
| **Shrinkage (merma/robo)** | 1-2% de ventas | > 3% |

**KPIs críticos del sector:**
- **GMROI** (Gross Margin Return on Inventory Investment) = Margen bruto / Inventario promedio al costo → objetivo > 2,0
- **Sell-through rate** = Unidades vendidas / Unidades recibidas → objetivo > 70%
- **Ticket promedio** y **artículos por ticket** — medir tendencia mensual

---

### 7.3 E-commerce

| Indicador | Rango saludable | Alerta |
|-----------|----------------|--------|
| **Margen bruto** | 40-65% (depende si es marketplace o inventario propio) | < 30% |
| **Margen operativo** | 5-15% (en etapa de crecimiento puede ser negativo) | < -20% por > 18 meses sin mejorar |
| **Margen neto** | 3-10% | Negativo por > 24 meses |
| **Días de inventario** | 20-45 días (si maneja inventario) | > 60 días |
| **Días de cuentas por cobrar** | 3-15 días (pasarelas de pago retienen 3-7 días) | > 30 días |
| **Días de cuentas por pagar** | 30-45 días | > 60 días |
| **CAC** | USD 5-30 (varía enormemente por canal) | > USD 50 sin LTV que lo justifique |
| **LTV** | USD 50-500 | < 3× CAC |
| **Tasa de conversión** | 1-3% (LATAM) | < 0,5% |
| **Tasa de abandono de carrito** | 65-80% | > 85% |
| **Costo de envío / Ticket promedio** | 5-12% | > 20% |
| **Tasa de devoluciones** | 3-10% (ropa: 15-25%) | > 15% (excepto moda) |
| **Breakeven** | 12-24 meses desde lanzamiento | > 36 meses sin camino claro |

**KPIs críticos del sector:**
- **AOV** (Average Order Value) → medir tendencia mensual
- **Repeat purchase rate** = Clientes recurrentes / Clientes totales → objetivo > 25%
- **Contribución por pedido** = AOV − COGS − envío − comisión pasarela − CAC prorrateado → debe ser positiva
- **Blended CAC** = Gasto total marketing / Nuevos clientes → separar por canal

---

### 7.4 Servicios Profesionales (Contabilidad, Legal, Consultoría)

| Indicador | Rango saludable | Alerta |
|-----------|----------------|--------|
| **Margen bruto** | 60-80% | < 50% |
| **Margen operativo** | 15-30% | < 10% |
| **Margen neto** | 10-25% | < 7% |
| **Días de cuentas por cobrar** | 30-60 días | > 90 días |
| **Días de cuentas por pagar** | 15-30 días | > 45 días |
| **Utilización (horas facturables / horas disponibles)** | 65-80% | < 55% |
| **Ingreso por profesional/mes** | USD 2.000-8.000 según país y especialidad | Decreciente por 3+ meses |
| **Costo de personal / Ingresos** | 45-60% | > 65% |
| **Punto de equilibrio** | 3-6 meses de operación | > 12 meses |
| **CAC** | USD 50-300 (B2B) | > USD 500 sin contratos recurrentes |
| **LTV** | USD 2.000-20.000 | < 5× CAC |
| **Churn mensual** | 2-5% | > 8% |

**KPIs críticos del sector:**
- **Revenue per employee** = Ingresos totales / N° empleados → benchmark LATAM: USD 3.000-7.000/mes
- **Realization rate** = Ingresos cobrados / Ingresos facturados → objetivo > 90%
- **Pipeline coverage** = Oportunidades en pipeline / Meta de ventas → objetivo > 3×

---

### 7.5 Manufactura Pequeña

| Indicador | Rango saludable | Alerta |
|-----------|----------------|--------|
| **Margen bruto** | 30-45% | < 25% |
| **Margen operativo** | 8-15% | < 5% |
| **Margen neto** | 4-10% | < 3% |
| **Días de inventario (materia prima)** | 15-30 días | > 45 días (capital inmovilizado) |
| **Días de inventario (producto terminado)** | 10-25 días | > 40 días |
| **Días de cuentas por cobrar** | 30-60 días | > 90 días |
| **Días de cuentas por pagar** | 30-60 días | < 15 días (no aprovechan crédito de proveedores) |
| **OEE (Overall Equipment Effectiveness)** | 60-75% (PYMEs) | < 50% |
| **Defectos / Unidades producidas** | 1-3% | > 5% |
| **Costo de mano de obra / Costo total** | 20-35% | > 40% |
| **Punto de equilibrio** | 55-70% de capacidad instalada | > 85% |
| **CAPEX / Ingresos anuales** | 5-10% | > 20% sin financiamiento estructurado |

**KPIs críticos del sector:**
- **Costo unitario de producción** → descomponer en MP, MOD y CIF
- **Ciclo de conversión de efectivo** = Días inventario + Días CxC − Días CxP → objetivo < 45 días
- **Scrap rate** = Material desperdiciado / Material ingresado → objetivo < 3%

---

### 7.6 Construcción

| Indicador | Rango saludable | Alerta |
|-----------|----------------|--------|
| **Margen bruto** | 20-35% | < 15% |
| **Margen operativo** | 5-12% | < 3% |
| **Margen neto** | 3-8% | < 2% |
| **Días de cuentas por cobrar** | 45-90 días | > 120 días |
| **Días de cuentas por pagar** | 30-60 días | > 90 días |
| **Retención de garantía (%)** | 5-10% del contrato (liberada en 6-12 meses) | > 15% |
| **Sobrecosto vs presupuesto** | < 5% | > 10% |
| **Plazo real vs plazo presupuestado** | < 110% | > 130% |
| **Costo de materiales / Costo total del proyecto** | 40-55% | > 65% (posible desperdicio o robo) |
| **Costo de mano de obra / Costo total** | 25-35% | > 40% |
| **Punto de equilibrio** | 3-5 proyectos/año (PYME típica) | Depender de 1 solo proyecto |
| **Backlog / Ingresos anuales** | 1-2× | < 0,5× (sin pipeline) |

**KPIs críticos del sector:**
- **Avance físico vs avance financiero** — si el avance financiero supera al físico: alerta de sobrecosto
- **Costo real por m²** vs estimado → variación > 8% requiere análisis
- **Cash flow del proyecto** — la construcción tiene ciclos de caja largos; modelar por hitos

---

### 7.7 Salud / Clínicas

| Indicador | Rango saludable | Alerta |
|-----------|----------------|--------|
| **Margen bruto** | 55-70% | < 45% |
| **Margen operativo** | 10-20% | < 7% |
| **Margen neto** | 7-15% | < 4% |
| **Días de cuentas por cobrar** | 15-45 días (particular: 0-7; aseguradoras: 30-90) | > 90 días (aseguradoras morosas) |
| **Días de cuentas por pagar** | 30-45 días | > 60 días |
| **Ocupación de agenda** | 70-85% | < 60% |
| **Costo de personal médico / Ingresos** | 35-50% | > 55% |
| **Costo de insumos médicos / Ingresos** | 10-20% | > 25% |
| **Ingreso por consultorio/mes** | USD 3.000-10.000 según especialidad y país | Decreciente por 3+ meses |
| **No-show rate** | 10-20% | > 30% |
| **Punto de equilibrio** | 55-65% de ocupación | > 80% |
| **CAC** | USD 20-60 | > USD 100 |
| **LTV** | USD 200-2.000 | < 5× CAC |

**KPIs críticos del sector:**
- **Revenue per provider hour** = Ingresos / Horas clínicas disponibles
- **Collection rate** = Cobros / Facturación → objetivo > 95%
- **Proporción consultas nuevas vs control** → equilibrio ideal: 30% nuevas / 70% control

---

### 7.8 Educación / Capacitación

| Indicador | Rango saludable | Alerta |
|-----------|----------------|--------|
| **Margen bruto** | 55-75% | < 45% |
| **Margen operativo** | 10-25% | < 7% |
| **Margen neto** | 7-18% | < 4% |
| **Días de cuentas por cobrar** | 0-15 días (cobro anticipado o mensual) | > 30 días |
| **Días de cuentas por pagar** | 15-30 días | > 45 días |
| **Tasa de ocupación (alumnos inscritos / capacidad)** | 75-90% | < 60% |
| **Costo de docentes / Ingresos** | 30-45% | > 50% |
| **Deserción semestral** | 5-15% | > 20% |
| **Costo de adquisición por alumno** | USD 20-100 (presencial) / USD 5-40 (online) | > USD 150 |
| **LTV por alumno** | USD 200-3.000 | < 4× CAC |
| **Punto de equilibrio** | 50-65% de matrícula | > 80% |
| **NPS (Net Promoter Score)** | > 40 | < 20 |

**KPIs críticos del sector:**
- **Ingreso por alumno** = Ingresos / N° alumnos activos
- **Costo por alumno** = Costos totales / N° alumnos → debe ser < 70% del ingreso por alumno
- **Completion rate** (cursos online) = Alumnos que terminan / Alumnos inscritos → objetivo > 40%

---

### 7.9 Transporte / Logística

| Indicador | Rango saludable | Alerta |
|-----------|----------------|--------|
| **Margen bruto** | 25-40% | < 20% |
| **Margen operativo** | 6-12% | < 4% |
| **Margen neto** | 3-8% | < 2% |
| **Costo de combustible / Ingresos** | 25-35% | > 40% |
| **Costo de mantenimiento / Ingresos** | 8-15% | > 20% |
| **Días de cuentas por cobrar** | 30-60 días | > 90 días |
| **Días de cuentas por pagar** | 15-30 días | > 45 días |
| **Utilización de flota** | 75-85% del tiempo operativo | < 60% |
| **Km vacíos / Km totales** | 15-25% | > 35% |
| **Costo por km** | Varía por país (USD 0,80-1,50/km camión mediano) | Creciente sin ajuste de tarifas |
| **Punto de equilibrio** | 65-75% de capacidad de carga | > 85% |
| **Antigüedad promedio de flota** | 5-10 años | > 15 años (costos de mantenimiento crecen exponencialmente) |

**KPIs críticos del sector:**
- **Ingreso por km** vs **Costo por km** → margen por km debe ser positivo
- **Entregas a tiempo (%)** = Entregas on-time / Total entregas → objetivo > 92%
- **Costo por tonelada-km** → benchmark para fijar precios competitivos

---

### 7.10 Agricultura / Agroindustria

| Indicador | Rango saludable | Alerta |
|-----------|----------------|--------|
| **Margen bruto** | 25-45% (alta variabilidad estacional) | < 20% |
| **Margen operativo** | 8-18% | < 5% |
| **Margen neto** | 4-12% | < 2% |
| **Días de inventario** | 30-90 días (dependiendo del ciclo del cultivo/producto) | > 120 días (salvo productos no perecederos) |
| **Días de cuentas por cobrar** | 30-60 días | > 90 días |
| **Días de cuentas por pagar** | 30-45 días (insumos agrícolas) | > 60 días |
| **Costo de insumos / Ingresos** | 30-45% | > 50% |
| **Costo de mano de obra / Ingresos** | 15-30% | > 35% |
| **Rendimiento por hectárea** | Varía por cultivo; comparar con promedio regional | < 70% del promedio regional |
| **Costo por hectárea** | Varía; referencia USD 500-3.000/ha en LATAM según cultivo | Creciente sin mejora en rendimiento |
| **Punto de equilibrio** | 50-65% de la producción esperada | > 80% (vulnerable a clima) |
| **Ciclo de caja** | 90-180 días (siembra a cobro) | > 240 días sin financiamiento puente |

**KPIs críticos del sector:**
- **Ingreso por hectárea** vs **Costo por hectárea** → margen por hectárea
- **Precio de venta real vs precio de mercado** → si < 85% del precio de mercado, problema de comercialización
- **Porcentaje de merma post-cosecha** → LATAM promedio 20-30%; objetivo < 15% con buenas prácticas

---

### 7.11 Tabla resumen comparativa — Márgenes por industria (medianas LATAM)

| Industria | Margen bruto | Margen operativo | Margen neto | CCC (días) |
|-----------|-------------|-----------------|-------------|------------|
| Restaurantes | 65% | 12% | 7% | -10 a 5 |
| Retail | 40% | 8% | 5% | 15-40 |
| E-commerce | 50% | 8% | 5% | 10-30 |
| Servicios profesionales | 70% | 22% | 15% | 20-50 |
| Manufactura pequeña | 35% | 10% | 6% | 30-60 |
| Construcción | 25% | 8% | 4% | 50-120 |
| Salud / Clínicas | 62% | 15% | 10% | 5-30 |
| Educación | 65% | 18% | 12% | -15 a 10 |
| Transporte / Logística | 30% | 8% | 5% | 20-50 |
| Agricultura | 35% | 12% | 7% | 60-150 |

> **CCC** = Ciclo de Conversión de Efectivo = Días inventario + Días CxC − Días CxP. Un CCC negativo significa que la empresa cobra antes de pagar (ideal).

---

## 8. Plantillas de Modelado Financiero

---

### 8.1 Cómo construir un Forecast de Flujo de Caja a 13 Semanas — Paso a Paso

El forecast de 13 semanas (un trimestre) es la herramienta de supervivencia más importante para una PYME. Permite anticipar si la empresa podrá pagar sus obligaciones en las próximas semanas.

#### Paso 1: Definir la estructura

```
| Concepto | Sem 1 | Sem 2 | Sem 3 | ... | Sem 13 | TOTAL |
|----------|-------|-------|-------|-----|--------|-------|
| SALDO INICIAL | X | | | | | |
| (+) ENTRADAS DE EFECTIVO | | | | | | |
|   Cobro de ventas al contado | | | | | | |
|   Cobro de cuentas por cobrar | | | | | | |
|   Otros ingresos | | | | | | |
| = TOTAL ENTRADAS | | | | | | |
| (-) SALIDAS DE EFECTIVO | | | | | | |
|   Proveedores | | | | | | |
|   Nómina y cargas sociales | | | | | | |
|   Arriendo | | | | | | |
|   Servicios (luz, agua, internet) | | | | | | |
|   Cuotas de créditos | | | | | | |
|   Impuestos (IVA, renta, etc.) | | | | | | |
|   Otros gastos operativos | | | | | | |
| = TOTAL SALIDAS | | | | | | |
| FLUJO NETO SEMANAL | | | | | | |
| SALDO FINAL (= Saldo inicial + Flujo neto) | | | | | | |
```

#### Paso 2: Completar las entradas de efectivo

**Reglas para estimar cobros:**

| Tipo de venta | Cómo proyectar |
|---------------|----------------|
| Ventas al contado/tarjeta débito | Se registran en la semana de la venta (o +1-2 días para POS) |
| Ventas con tarjeta de crédito | +7-15 días según procesador de pagos |
| Ventas a crédito 30 días | Aplicar tasa de cobro histórica: si históricamente cobras el 85% a 30 días, usar eso |
| Ventas a crédito 60 días | Ídem con tasa histórica de cobro a 60 días |
| Anticipos de clientes | Registrar cuando se espera recibir, no cuando se firma contrato |

**Ejemplo práctico — Distribuidora con ventas mensuales de COP 120M:**
- 30% ventas contado: COP 36M → COP 9M/semana
- 50% ventas a 30 días: COP 60M → cobro en semanas 5-6
- 20% ventas a 60 días: COP 24M → cobro en semanas 9-10
- Tasa de incobrabilidad histórica: 3% → descontar del cobro proyectado

#### Paso 3: Completar las salidas de efectivo

**Clasificar por certeza:**

| Categoría | Ejemplos | Cómo manejar |
|-----------|----------|--------------|
| **Fijas confirmadas** | Nómina, arriendo, cuotas crédito, seguros | Montos exactos en semanas exactas |
| **Variables predecibles** | Proveedores (con OC emitida), servicios básicos | Estimar con base en historial ± 10% |
| **Variables inciertas** | Reparaciones, gastos legales, emergencias | Buffer del 5-10% sobre total de salidas |
| **Estacionales** | Impuestos (IVA mensual, renta anual), aguinaldos, bonificaciones | Ubicar en la semana exacta del vencimiento |

#### Paso 4: Calcular y analizar

1. **Flujo neto semanal** = Total entradas − Total salidas
2. **Saldo final** = Saldo inicial + Flujo neto
3. **Identificar semanas rojas** = Cualquier semana donde el saldo final sea < 0 o < colchón mínimo

**Colchón mínimo recomendado:**
- **Mínimo absoluto**: 2 semanas de gastos fijos
- **Recomendado**: 4 semanas de gastos fijos
- **Ideal**: 8 semanas de gastos fijos

#### Paso 5: Acciones según escenario

| Escenario | Acción inmediata |
|-----------|------------------|
| Saldo proyectado negativo en semana 1-2 | **EMERGENCIA**: Negociar extensión con proveedores, adelantar cobros, línea de crédito revolvente |
| Saldo negativo en semana 3-6 | **URGENTE**: Activar cobranza agresiva, postergar gastos no esenciales, evaluar factoring |
| Saldo negativo en semana 7-13 | **PLANIFICABLE**: Ajustar política de crédito, renegociar plazos de pago, buscar financiamiento a 90 días |
| Saldo positivo todo el período pero < colchón | **PRECAUCIÓN**: Construir reserva gradualmente; no comprometer gastos nuevos |
| Saldo holgado todo el período | **OPORTUNIDAD**: Evaluar inversiones, pagar deuda cara anticipadamente, negociar descuentos pronto pago |

#### Paso 6: Actualizar semanalmente

- Cada lunes: actualizar saldo real de apertura, ajustar proyecciones de cobros y pagos.
- Comparar "proyectado semana pasada" vs "real" → medir precisión del forecast.
- Si la variación real vs proyectado supera ±15% de forma consistente, revisar supuestos.

---

### 8.2 Cómo Calcular Unit Economics — Con Ejemplos Reales

Los unit economics responden la pregunta fundamental: **¿Ganamos o perdemos dinero con cada unidad vendida / cliente atendido?**

#### Framework general

```
INGRESO POR UNIDAD
  (-) Costo variable por unidad (COGS directo)
  (-) Costo de adquisición prorrateado (CAC / compras esperadas)
  (-) Costo de servicio/entrega por unidad
  ─────────────────────────────
  = CONTRIBUCIÓN POR UNIDAD

  Margen de contribución (%) = Contribución / Ingreso × 100
```

#### Ejemplo 1: Tienda de café en Bogotá

| Componente | Valor (COP) |
|------------|-------------|
| Precio promedio de un café | 8.500 |
| (-) Costo de insumos (café, leche, vaso, tapa) | 2.200 |
| (-) Costo de mano de obra directa (barista, prorrateado por café) | 1.100 |
| (-) Costo de delivery (si aplica, promedio) | 800 |
| **= Contribución por café** | **4.400** |
| **Margen de contribución** | **51,8%** |

Costos fijos mensuales: COP 12.000.000 (arriendo, admin, servicios)
Punto de equilibrio = 12.000.000 / 4.400 = **2.727 cafés/mes** = ~91 cafés/día

Si vende 120 cafés/día: Utilidad mensual = (120 × 30 × 4.400) − 12.000.000 = **COP 3.840.000**

#### Ejemplo 2: SaaS B2B en Chile

| Componente | Valor (USD) |
|------------|-------------|
| Suscripción mensual promedio (ARPU) | 89 |
| (-) Costo de hosting/infraestructura por cliente | 8 |
| (-) Costo de soporte por cliente | 12 |
| **= Contribución mensual por cliente** | **69** |
| **Margen de contribución** | **77,5%** |

| Métrica | Cálculo | Valor |
|---------|---------|-------|
| CAC (costo de adquisición) | Gasto marketing+ventas mensual / Nuevos clientes | USD 450 |
| Churn mensual | 4% | |
| Vida promedio del cliente | 1 / Churn = 1/0,04 | 25 meses |
| LTV (Lifetime Value) | Contribución mensual × Vida promedio = 69 × 25 | USD 1.725 |
| **Ratio LTV/CAC** | 1.725 / 450 | **3,8×** ✓ |
| **Meses para recuperar CAC** | 450 / 69 | **6,5 meses** ✓ |

**Reglas de oro para unit economics:**
- **LTV/CAC > 3×** → modelo saludable
- **LTV/CAC entre 1× y 3×** → viable pero ajustado; optimizar CAC o mejorar retención
- **LTV/CAC < 1×** → el negocio pierde dinero con cada cliente; modelo insostenible
- **Payback < 12 meses** → ideal para PYMEs sin mucho capital
- **Payback > 18 meses** → necesita capital externo para financiar crecimiento

#### Ejemplo 3: Empresa de manufactura — camisetas en Lima

| Componente | Valor (PEN) |
|------------|-------------|
| Precio de venta (mayoreo) | 35 |
| (-) Tela + insumos | 9 |
| (-) Mano de obra directa por unidad | 5 |
| (-) Estampado/acabado | 3 |
| (-) Empaque + etiqueta | 1,50 |
| **= Contribución por camiseta** | **16,50** |
| **Margen de contribución** | **47,1%** |

Costos fijos mensuales: PEN 28.000
Punto de equilibrio = 28.000 / 16,50 = **1.697 camisetas/mes**

---

### 8.3 Análisis de Punto de Equilibrio — Servicio vs Producto

#### Para un negocio de PRODUCTO

```
Punto de Equilibrio (unidades) = Costos Fijos Totales / (Precio − Costo Variable Unitario)
Punto de Equilibrio ($) = Costos Fijos Totales / Margen de Contribución (%)
```

**Ejemplo — Panadería en Santiago:**

| Dato | Valor (CLP) |
|------|-------------|
| Costos fijos mensuales (arriendo, sueldos fijos, servicios, admin) | 6.500.000 |
| Precio promedio por kilo de pan | 3.200 |
| Costo variable por kilo (harina, levadura, energía, empaque) | 1.600 |
| Margen de contribución por kilo | 1.600 |
| Margen de contribución (%) | 50% |
| **Punto de equilibrio** | **4.063 kilos/mes = ~135 kilos/día** |
| **Punto de equilibrio en CLP** | **CLP 13.000.000/mes** |

#### Para un negocio de SERVICIO

En servicios, la "unidad" es la **hora facturable** o el **proyecto/contrato**.

```
PE (horas) = Costos Fijos / (Tarifa por hora − Costo variable por hora)
PE (proyectos) = Costos Fijos / (Precio promedio proyecto − Costo variable proyecto)
```

**Ejemplo — Agencia de marketing digital en CDMX (3 empleados):**

| Dato | Valor (MXN) |
|------|-------------|
| Costos fijos mensuales (sueldos, oficina, software, servicios) | 180.000 |
| Horas disponibles por mes (3 personas × 160 hrs) | 480 |
| Horas facturables estimadas (utilización 70%) | 336 |
| Tarifa promedio por hora | 850 |
| Costo variable por hora (freelancers, herramientas adicionales, comisiones) | 150 |
| Margen de contribución por hora | 700 |
| **Punto de equilibrio** | **257 horas/mes** |
| **Utilización mínima requerida** | **257 / 480 = 53,5%** |

Si cobran por proyecto promedio MXN 35.000 con costo variable de MXN 8.000:
PE = 180.000 / (35.000 − 8.000) = **6,7 proyectos/mes**

**Diferencias clave entre ambos análisis:**

| Aspecto | Producto | Servicio |
|---------|----------|----------|
| Unidad de medida | Unidad producida/vendida | Hora facturable o proyecto |
| Variable limitante | Capacidad de producción / inventario | Tiempo disponible del equipo |
| Escalabilidad | Más lineal (más unidades = más ingreso) | Limitada por horas humanas |
| Riesgo principal | Inventario no vendido | Horas no facturadas |
| Cómo mejorar PE | Reducir costo variable (negociar MP) o subir precio | Aumentar utilización o tarifa |

---

### 8.4 Análisis: ¿Arrendar o Comprar Equipo?

**Framework de decisión en 5 pasos:**

#### Paso 1: Estimar costos totales de cada opción

**Opción A — Compra:**
```
Costo total de compra = Precio + Instalación + Mantenimiento anual × años + Seguro anual × años − Valor residual al final
```

**Opción B — Arriendo/Leasing:**
```
Costo total de arriendo = Cuota mensual × meses + Depósito de garantía (si no es reembolsable) + Cargos por uso excesivo (si aplica)
```

#### Paso 2: Calcular el Valor Presente Neto (VPN) de cada opción

**Ejemplo — Máquina CNC para taller metalmecánico en Medellín:**

| Concepto | Compra | Leasing operativo |
|----------|--------|-------------------|
| Precio/costo inicial | COP 85.000.000 | COP 0 |
| Cuota mensual | N/A | COP 2.800.000 × 48 meses |
| Mantenimiento anual | COP 4.500.000 | Incluido |
| Seguro anual | COP 2.100.000 | Incluido |
| Valor residual (año 4) | COP 25.000.000 | COP 0 |
| **Costo nominal total (4 años)** | **COP 85M + 26,4M − 25M = COP 86,4M** | **COP 134,4M** |
| Beneficio tributario (depreciación/deducción) | Depreciación lineal 10 años; en Pro PYME Chile o régimen acelerado: instantánea | Cuota 100% deducible como gasto |

#### Paso 3: Evaluar factores cualitativos

| Factor | Favorece compra | Favorece arriendo |
|--------|----------------|-------------------|
| La empresa tiene liquidez | ✓ | |
| La tecnología cambia rápido | | ✓ |
| Se necesita flexibilidad | | ✓ |
| Uso > 5 años | ✓ | |
| Valor residual alto | ✓ | |
| La empresa necesita mejorar balance (menos deuda) | | ✓ (leasing operativo no entra en balance) |
| Beneficio tributario inmediato es prioritario | | ✓ (cuota 100% gasto) |

#### Paso 4: Regla rápida de decisión

```
Si costo total compra (VPN) < 80% del costo total arriendo (VPN) → COMPRAR
Si costo total compra (VPN) > 95% del costo total arriendo (VPN) → ARRENDAR (por flexibilidad)
Si está entre 80-95% → Decidir según factores cualitativos
```

#### Paso 5: Considerar el costo de oportunidad del capital

Si la empresa tiene COP 85M para comprar la máquina, pero invertir ese capital en el negocio genera un retorno del 25% anual:
- Costo de oportunidad de compra: 85M × 25% = COP 21,25M/año
- En 4 años: ~COP 85M de retorno perdido
- En ese caso, arrendar y destinar el capital al negocio puede ser superior

---

### 8.5 Cómo Calcular el Costo Real de un Crédito Bancario vs Crédito de Proveedor

#### Crédito bancario — Costo Financiero Total (CFT)

La tasa de interés anunciada NO es el costo real. Hay que calcular el **Costo Financiero Total (CFT)** o **Tasa Efectiva Anual (TEA)**.

```
CFT = Tasa de interés nominal + Comisión de apertura (prorrateada) + Seguro de desgravamen + Gastos notariales + ITF (si aplica) + Otros cargos
```

**Ejemplo — Crédito PYME en Perú:**

| Concepto | Monto |
|----------|-------|
| Monto del crédito | S/ 100.000 |
| Tasa de interés anual (TNA) | 18% |
| Comisión de desembolso (cobrada al inicio) | 1,5% = S/ 1.500 |
| Seguro de desgravamen anual | 0,5% sobre saldo |
| ITF (Impuesto a las Transacciones Financieras) | 0,005% por operación |
| Plazo | 24 meses |
| Cuota mensual (solo capital + interés) | S/ 4.992 |
| **Costo total en 24 meses** | S/ 119.808 + S/ 1.500 + seguros (~S/ 500) = **S/ 121.808** |
| **Costo financiero real** | **~21,8% anual** (vs 18% anunciado) |

**Monto neto recibido** = S/ 100.000 − S/ 1.500 (comisión) = S/ 98.500
**TEA real** = Se calcula con TIR sobre flujos reales → **~22,5%**

#### Crédito de proveedor — Costo implícito

Cuando un proveedor ofrece "2/10 neto 30" significa: 2% de descuento si pagas en 10 días; si no, pagas el total a 30 días.

```
Costo anualizado del crédito de proveedor = (Descuento / (100% − Descuento)) × (365 / (Días crédito − Días descuento))
```

**Ejemplo — Proveedor con condiciones "2/10 neto 30":**

```
Costo anualizado = (2% / 98%) × (365 / 20) = 2,04% × 18,25 = 37,2% anual
```

**¡El crédito del proveedor a "30 días" cuesta implícitamente 37,2% anual!**

#### Comparación directa

| Fuente de financiamiento | Costo efectivo anual típico (LATAM) | Garantías | Plazo |
|--------------------------|-------------------------------------|-----------|-------|
| Crédito bancario PYME (con garantía) | 12-25% | Hipoteca, prenda, aval personal | 12-60 meses |
| Crédito bancario PYME (sin garantía) | 20-45% | Firma, historial crediticio | 6-24 meses |
| Línea revolvente / sobregiro | 25-50% | Según banco | Renovable |
| Crédito de proveedor (30 días, con 2% dcto PP) | ~37% implícito | Relación comercial | 30 días |
| Crédito de proveedor (60 días, sin descuento) | 0% (costo de oportunidad solamente) | Relación comercial | 60 días |
| Factoring | 18-36% (tasa de descuento sobre facturas) | Facturas por cobrar | 30-120 días |
| Microcrédito | 30-60% | Grupal o personal | 6-18 meses |
| Tarjeta de crédito empresarial | 35-65% | Sin garantía real | Revolvente |
| Prestamista informal / "gota a gota" | 100-300%+ | N/A | Días-semanas |

**Regla práctica para PYMEs:**
1. **Primero** usar crédito de proveedor sin costo (si ofrecen 60 días sin descuento).
2. **Segundo** usar línea de crédito bancaria pre-aprobada.
3. **Tercero** evaluar factoring si el problema es cobranza lenta.
4. **Nunca** usar tarjeta de crédito o prestamistas informales para capital de trabajo.

**Fórmula para comparar cualquier financiamiento:**
```
Costo Efectivo Anual (CEA) = ((Monto total pagado / Monto neto recibido) ^ (365/días)) − 1
```

---

## 9. Opciones de Financiamiento para PYMEs en LATAM

---

### 9.1 Chile

#### Financiamiento público / estatal

| Institución | Producto | Monto máximo | Tasa referencial | Plazo | Requisitos clave |
|-------------|----------|-------------|-------------------|-------|------------------|
| **Corfo** (vía bancos intermediarios) | Crédito PYME Corfo | Hasta UF 100.000 (~CLP 3.700M) | UF + 4-8% anual | 3-10 años | Ventas ≤ UF 100.000/año; sin deudas morosas |
| **Corfo** | Fogape (Fondo de Garantía para Pequeños Empresarios) | Garantía estatal 60-80% del crédito | La del banco intermediario | Variable | Ventas ≤ UF 25.000/año para micro/pequeña |
| **Sercotec** | Capital Semilla / Capital Abeja | CLP 3M-6M (subsidio no reembolsable) | 0% (subsidio) | N/A | Microempresas, mujeres emprendedoras |
| **BancoEstado** | Crédito PYME BancoEstado | Hasta CLP 200M | 0,8-1,5% mensual | 12-60 meses | Antigüedad > 1 año, ventas formales |

#### Factoring y financiamiento alternativo

| Opción | Costo típico | Plazo | Requisitos |
|--------|-------------|-------|------------|
| Factoring bancario (BCI, Santander, etc.) | 0,8-2% mensual sobre factura | 30-120 días | Facturas DTE válidas, deudor solvente |
| Factoring no bancario (Progreso, AccesoFinanciero) | 1,5-3,5% mensual | 30-90 días | Facturas electrónicas |
| Confirming (pago a proveedores) | 0,7-1,5% mensual | 30-90 días | Relación con empresa ancla |
| Bolsa de Productos (facturas en bolsa) | Tasa de descuento en subasta | 30-180 días | Facturas > CLP 1M |

#### ¿Qué buscan los bancos chilenos para prestar a PYMEs?

1. **Ventas formales** — al menos 12 meses de facturación electrónica (DTE).
2. **Sin protestos ni morosidad** — Dicom/Equifax limpio del dueño y la empresa.
3. **Flujo de caja demostrable** — que los ingresos cubran la cuota con holgura (ratio cobertura > 1,3×).
4. **Garantías** — hipoteca, prenda sobre maquinaria, aval personal del socio.
5. **Antigüedad mínima** — generalmente 2 años (1 año en BancoEstado para productos PYME).
6. **Declaraciones tributarias al día** — F22, F29 sin observaciones.

---

### 9.2 México

#### Financiamiento público / estatal

| Institución | Producto | Monto máximo | Tasa referencial | Plazo | Requisitos clave |
|-------------|----------|-------------|-------------------|-------|------------------|
| **Nacional Financiera (Nafin)** | Crédito PYME (vía intermediarios) | Hasta MXN 50M | TIIE + 4-10% (aprox. 15-22% anual) | 12-60 meses | RFC activo, sin adeudos fiscales, 2+ años operación |
| **Nafin** | Cadenas Productivas (factoraje electrónico) | Según factura | TIIE + 2-5% | 30-120 días | Ser proveedor de una empresa grande registrada en Nafin |
| **Nafin** | Crédito Joven (emprendedores) | Hasta MXN 2,5M | Preferencial | 12-36 meses | Emprendedores 18-35 años |
| **Fondo PYME / INADEM** | Subsidios y apoyos | Variable (hasta MXN 3M) | 0% (subsidio) | N/A | Según convocatoria vigente |
| **Financiera para el Bienestar** | Microcréditos | Hasta MXN 300.000 | 10-15% anual | 6-36 meses | Microempresas rurales/semirurales |

#### Factoring y alternativas

| Opción | Costo típico | Plazo | Requisitos |
|--------|-------------|-------|------------|
| Cadenas Productivas Nafin | TIIE + 2-5% (anualizado ~14-18%) | 30-120 días | CFDI timbrados, deudor en cadena |
| Factoring privado (Konfío, Credijusto) | 2-4% mensual | 30-90 días | CFDI, historial de ventas |
| Fintech lending (Credijusto, Konfío, Fairplay) | 18-36% anual | 6-24 meses | Conexión a SAT (CFDI), estados bancarios |
| Arrendamiento financiero (Unifin, etc.) | 12-20% anual | 12-48 meses | Para equipo y maquinaria |

#### ¿Qué buscan los bancos mexicanos?

1. **Historial en Buró de Crédito** — score > 600 del dueño y de la empresa.
2. **Declaraciones fiscales al SAT** — mínimo 2 años completos.
3. **CFDI de ingresos** — demostrar ventas reales.
4. **Estados de cuenta bancarios** — mínimo 12 meses, con flujo consistente.
5. **Plan de negocio** — para montos > MXN 5M.
6. **Garantías** — inmueble, equipo, aval personal, depósito en garantía.

---

### 9.3 Colombia

#### Financiamiento público / estatal

| Institución | Producto | Monto máximo | Tasa referencial | Plazo | Requisitos clave |
|-------------|----------|-------------|-------------------|-------|------------------|
| **Bancóldex** (banca de segundo piso, opera vía intermediarios) | Crédito PYME | Hasta COP 5.000M | DTF/IBR + 4-8% (aprox. 16-22% EA) | 12-84 meses | Empresa registrada, estados financieros |
| **Fondo Nacional de Garantías (FNG)** | Garantía parcial (50-80%) | Según crédito bancario | Comisión 1,5-3,5% anual sobre garantía | Variable | Sin embargo, no es crédito directo; respalda crédito de banco comercial |
| **iNNpulsa Colombia** | Capital semilla, cofinanciación | COP 50M-500M | 0% (subsidio/convocatoria) | N/A | Emprendimientos innovadores |
| **Finagro** | Crédito agropecuario | Hasta COP 2.000M | DTF + 1-6% (tasas subsidiadas) | 12-120 meses | Actividad agropecuaria certificada |

#### Factoring y alternativas

| Opción | Costo típico | Plazo | Requisitos |
|--------|-------------|-------|------------|
| Factoring bancario (Bancolombia, Davivienda) | 1-2,5% mensual | 30-90 días | Facturas electrónicas, deudor solvente |
| Factoring fintech (Mesfix, Exponencial Confirming) | 1,5-3% mensual | 30-120 días | Facturas electrónicas DIAN |
| Microcrédito (Bancamía, Mundo Mujer, Contactar) | 30-50% EA | 6-24 meses | Visita al negocio, sin historial mínimo |
| Crowdlending (A2censo de BVC) | 12-20% EA | 6-36 meses | Empresa formalizada, curaduría de plataforma |

#### ¿Qué buscan los bancos colombianos?

1. **Centrales de riesgo limpias** — DataCrédito/TransUnion sin reportes negativos vigentes.
2. **Antigüedad mínima** — 2 años de operación (1 año para microcrédito).
3. **Declaraciones de renta y IVA al día** — mínimo 2 años.
4. **Registro en Cámara de Comercio** — vigente y renovado.
5. **Estados financieros** — mínimo 2 años, idealmente auditados para montos > COP 500M.
6. **Garantías** — FNG para quienes no tienen bienes; finca raíz o maquinaria para créditos grandes.

---

### 9.4 Perú

#### Financiamiento público / estatal

| Institución | Producto | Monto máximo | Tasa referencial | Plazo | Requisitos clave |
|-------------|----------|-------------|-------------------|-------|------------------|
| **Cofide** (banca de segundo piso) | Crédito PYME (vía intermediarios) | Hasta S/ 10M | Según banco intermediario (generalmente < tasa de mercado) | 12-84 meses | Empresa con RUC activo, sin deuda tributaria |
| **FOGAPI** | Garantía para PYMES (cartas fianza) | Garantía hasta 80% | Comisión sobre garantía | Variable | MYPE registrada en REMYPE |
| **Programa PAME (PRODUCE)** | Subsidios y asistencia técnica | Variable | 0% (subsidio) | N/A | Según convocatoria |
| **AgroBanco** | Crédito agrícola | Hasta S/ 300.000 | 15-20% anual | 12-60 meses | Actividad agropecuaria |

#### Factoring y alternativas

| Opción | Costo típico | Plazo | Requisitos |
|--------|-------------|-------|------------|
| Factoring bancario (BCP, BBVA, Interbank) | 1-2% mensual | 30-90 días | Facturas electrónicas SUNAT |
| Factoring Cavali (electrónico) | 0,8-1,8% mensual | 30-120 días | Inscripción en Cavali, facturas negociables |
| Fintech (Facturedo, Prestamype) | 2-4% mensual | 30-90 días | RUC activo, facturación electrónica |
| Microcrédito (Mibanco, Caja Arequipa, CrediScotia) | 30-55% TEA | 6-24 meses | Negocio operando > 6 meses |
| Cajas municipales / rurales | 25-45% TEA | 6-36 meses | Visita al negocio, evaluación simplificada |

#### ¿Qué buscan las entidades financieras peruanas?

1. **RUC activo y habido** — SUNAT verifica que la empresa esté activa y con domicilio fiscal verificado.
2. **Central de riesgos SBS limpia** — sin clasificación deficiente, dudoso o pérdida.
3. **Facturación electrónica** — como prueba de ingresos reales.
4. **Antigüedad del negocio** — mínimo 6 meses (microcrédito) a 2 años (crédito bancario).
5. **Garantías** — inmueble registrado en SUNARP; para montos menores, aval personal.
6. **Flujo de caja positivo** — las entidades de microfinanzas evalúan in situ con visita al negocio.

---

### 9.5 Argentina

#### Financiamiento público / estatal

| Institución | Producto | Monto máximo | Tasa referencial | Plazo | Requisitos clave |
|-------------|----------|-------------|-------------------|-------|------------------|
| **BICE (Banco de Inversión y Comercio Exterior)** | Crédito inversión productiva | Varía (hasta ARS 500M+) | Tasa subsidiada (menor a la comercial) | 12-84 meses | Registro PYME, proyecto de inversión |
| **FONDEP / Ministerio de Desarrollo Productivo** | Créditos a tasa subsidiada | Variable | Tasa fija subsidiada | 12-48 meses | Inscripción en Registro PYME |
| **SGR (Sociedades de Garantía Recíproca)** | Garantía para acceder a crédito bancario | Según avales disponibles | Comisión ~2-4% anual | Variable | Ser PYME socia partícipe de una SGR |
| **Banco Nación / Banco Provincia** | Líneas PYME | Hasta ARS 200M+ | Tasa regulada por BCRA | 12-60 meses | Cuenta en el banco, Registro PYME |

#### Instrumentos del mercado de capitales

| Instrumento | Tasa referencial | Plazo | Requisitos |
|------------|------------------|-------|------------|
| Cheques de pago diferido (CPD) en bolsa | Variable (descuento) | 30-360 días | Tener cheques de clientes solventes |
| Pagarés bursátiles | Variable | 30-360 días | Cotización en bolsa vía ALyC |
| Obligaciones negociables PYME (ON) | Variable | 12-36 meses | Calificación, balance auditado, inscripción CNV |
| Factoring (Facturar.com, QuePago) | 3-6% mensual | 30-90 días | Facturas electrónicas válidas |

#### ¿Qué buscan los bancos argentinos?

1. **Inscripción en Registro PYME** (MiPyME) — obligatorio para acceder a beneficios.
2. **Central de deudores BCRA limpia** — sin situación 3, 4 o 5.
3. **3 últimos balances** — firmados por contador público.
4. **Declaraciones juradas de Ganancias e IVA** — al día.
5. **Flujo de fondos proyectado** — que demuestre capacidad de repago.
6. **Garantías** — SGR es la opción más usada por PYMEs sin activos propios.

> **Nota**: En Argentina, la inflación hace que las tasas nominales sean engañosamente altas. Lo relevante es la **tasa real** (tasa nominal − inflación). Un crédito al 80% anual nominal con inflación del 70% tiene tasa real de ~6%.

---

### 9.6 Bolivia

#### Financiamiento público / estatal

| Institución | Producto | Monto máximo | Tasa referencial | Plazo | Requisitos clave |
|-------------|----------|-------------|-------------------|-------|------------------|
| **BDP (Banco de Desarrollo Productivo)** | Crédito productivo | Hasta USD 1M | 6-11,5% anual (tasas reguladas para sector productivo) | 12-96 meses | Actividad productiva, manufactura, agro |
| **BDP** | Juana Azurduy (crédito para mujeres) | Hasta BOB 150.000 | 6% anual | 12-60 meses | Mujer emprendedora, actividad productiva |
| **Pro Bolivia / PAR** | Subsidios productivos | Variable | 0% (subsidio) | N/A | Según convocatoria |

#### Banca comercial y microfinanzas

| Opción | Tasa típica | Plazo | Requisitos |
|--------|------------|-------|------------|
| Bancos comerciales (BNB, Mercantil, Bisa) — crédito PYME | 6-13% (tasas reguladas por ASFI) | 12-60 meses | NIT, estados financieros, garantía |
| Microfinanzas (BancoSol, Fassil, Ecofuturo, Prodem) | 10-18% | 6-36 meses | Visita al negocio, garantía personal/grupal |
| Cooperativas de ahorro y crédito | 8-15% | 6-48 meses | Ser socio, ahorro previo |

> **Nota**: Bolivia tiene regulación de tasas de interés máximas. La ASFI establece topes de tasas para créditos productivos y de vivienda social, lo que hace que las tasas sean más bajas que en otros países de la región.

#### ¿Qué buscan los bancos bolivianos?

1. **NIT activo** y matrícula de FUNDEMPRESA vigente.
2. **Sin deudas morosas** en la Central de Información Crediticia (CIC) de ASFI.
3. **Flujo de caja demostrable** — estados financieros o registros contables.
4. **Garantías** — hipotecaria, prendaria o fondo de garantía.
5. **Plan de inversión** — especialmente para créditos del BDP.
6. **Antigüedad mínima** — generalmente 1 año.

---

### 9.7 Ecuador

#### Financiamiento público / estatal

| Institución | Producto | Monto máximo | Tasa referencial | Plazo | Requisitos clave |
|-------------|----------|-------------|-------------------|-------|------------------|
| **CFN (Corporación Financiera Nacional)** | Crédito PYME | Hasta USD 500.000 | 8-11% anual | 12-120 meses | RUC activo, declaraciones SRI al día, garantía |
| **BanEcuador** | Microcrédito productivo | Hasta USD 150.000 | 9-15% | 6-60 meses | Actividad productiva, comercial o de servicios |
| **BanEcuador** | Crédito para emprendimiento | Hasta USD 50.000 | 9,75% | 12-60 meses | Plan de negocio |
| **CONAFIPS (Corporación Nacional de Finanzas Populares)** | A través de cooperativas | Variable | 12-18% | 6-48 meses | Ser socio de cooperativa acreditada |

#### Factoring y alternativas

| Opción | Costo típico | Plazo | Requisitos |
|--------|-------------|-------|------------|
| Factoring bancario (Pichincha, Produbanco, Pacífico) | 1-2% mensual | 30-90 días | Facturas electrónicas SRI |
| Cooperativas de ahorro y crédito (JEP, Policía Nacional, Alianza del Valle) | 12-18% anual | 6-36 meses | Ser socio, ahorros previos |
| Fintech (Equinoccial, emergentes) | 15-25% anual | 6-24 meses | RUC, facturación electrónica |

#### ¿Qué buscan los bancos ecuatorianos?

1. **Buró de crédito limpio** — Equifax Ecuador, sin calificaciones C, D o E.
2. **RUC activo y al día con SRI** — sin deudas tributarias.
3. **Declaraciones de IVA e IR** — mínimo 2 años.
4. **Antigüedad del negocio** — mínimo 1-2 años.
5. **Garantías** — inmueble registrado en Registro de la Propiedad; o garante personal.
6. **Flujo de caja** — que la cuota no supere el 30-35% del flujo neto mensual.

> **Nota**: Ecuador, al ser dolarizado, tiene tasas de interés más estables que otros países de la región. Las tasas máximas están reguladas por el Banco Central del Ecuador (BCE) por segmento de crédito.

---

## 10. Checklist de Alertas Financieras — 20 Red Flags por Severidad

> **Cómo usar esta lista**: El agente financiero debe monitorear estos indicadores y alertar al usuario según la severidad. Los umbrales son para PYMEs de 5-50 empleados en LATAM.

---

### 10.1 CRÍTICOS (Requieren acción inmediata — riesgo de cierre en 30-90 días)

| # | Red Flag | Umbral específico | Acción recomendada |
|---|---------|-------------------|-------------------|
| 1 | **Saldo de caja negativo o en cero** | Caja + bancos < 1 semana de gastos fijos | Suspender todo gasto no esencial; activar línea de crédito; cobrar facturas vencidas hoy mismo |
| 2 | **Incapacidad de pagar nómina** | No hay fondos para nómina del mes en curso a 5 días del vencimiento | Priorizar nómina sobre cualquier otro pago (excepto impuestos con sanción penal); buscar financiamiento de emergencia |
| 3 | **Ingresos cayendo > 20% MoM por 2+ meses consecutivos** | Caída acumulada > 35% en 2 meses | Investigar causa raíz (pérdida de cliente clave, problema de producto, competencia); activar plan de contingencia |
| 4 | **Deuda vencida > 90 días con entidades financieras** | Cualquier monto en mora > 90 días en central de riesgos | Contactar al banco para reestructurar antes de que clasifiquen en cartera castigada; el costo de reputación crediticia es enorme |
| 5 | **Ratio corriente < 0,5** | Activo corriente / Pasivo corriente < 0,5 | La empresa no puede cubrir ni la mitad de sus deudas de corto plazo; reestructuración urgente |
| 6 | **Impuestos no pagados > 2 períodos** | IVA/ICA/retenciones de 2+ meses sin declarar ni pagar | Riesgo de sanción penal en varios países (Colombia: peculado; México: defraudación); pagar antes que cualquier deuda comercial |
| 7 | **Pérdida neta > 15% de ingresos por 3+ meses consecutivos** | Utilidad neta / Ingresos < -15% durante un trimestre | Evaluar viabilidad del modelo de negocio; si no hay camino a rentabilidad en 6 meses, considerar cierre ordenado |

---

### 10.2 DE ADVERTENCIA (Requieren plan de acción en 30 días — deterioro progresivo)

| # | Red Flag | Umbral específico | Acción recomendada |
|---|---------|-------------------|-------------------|
| 8 | **Ingresos cayendo > 10% MoM por 3+ meses consecutivos** | Tendencia negativa sostenida | Revisar estrategia comercial; analizar si es estacionalidad o problema estructural; diversificar canales |
| 9 | **Margen bruto deteriorándose > 5 puntos porcentuales en 3 meses** | Ej: de 45% a 39% en un trimestre | Auditar costos de insumos y proveedores; revisar política de precios; verificar mermas y desperdicios |
| 10 | **Días de cuentas por cobrar creciendo > 15 días en un trimestre** | Ej: de 35 a 52 días | Endurecer política de crédito; activar cobranza; evaluar factoring para facturas más viejas |
| 11 | **Concentración de ingresos > 40% en un solo cliente** | Un cliente representa > 40% de la facturación | Diversificar cartera de clientes activamente; el riesgo de perder ese cliente es existencial |
| 12 | **Gastos fijos creciendo más rápido que ingresos por 3+ meses** | Crecimiento gastos fijos > crecimiento ingresos en % por un trimestre | Revisar cada línea de gasto fijo; congelar contrataciones; renegociar contratos |
| 13 | **Ciclo de conversión de efectivo aumentando > 20 días en un trimestre** | CCC sube de 40 a 62 días, por ejemplo | Atacar el componente que más creció: inventario, CxC o CxP; el capital de trabajo se está comiendo la caja |
| 14 | **Deuda financiera / EBITDA > 3,5×** | Tomaría más de 3,5 años de EBITDA pagar toda la deuda | No tomar más deuda; destinar flujo libre a reducir pasivos; renegociar plazos |
| 15 | **Cobertura de intereses < 1,5×** | EBITDA / Gastos financieros < 1,5 | El negocio apenas genera para pagar intereses; en < 1×, no alcanza — reestructurar deuda es urgente |

---

### 10.3 INFORMATIVOS (Monitorear — pueden convertirse en advertencia si persisten)

| # | Red Flag | Umbral específico | Acción recomendada |
|---|---------|-------------------|-------------------|
| 16 | **Margen neto < promedio de la industria por 2+ trimestres** | Consultar benchmarks de la sección 7 | Benchmarkear cada línea del P&L contra la industria; identificar dónde está la desviación |
| 17 | **Rotación de personal > 30% anual** | Más de 30 de cada 100 empleados se van en un año | Costo oculto alto (reclutamiento + capacitación = 3-6 meses de sueldo por posición); revisar clima laboral y compensaciones |
| 18 | **Inventario de lento movimiento > 20% del inventario total** | Productos sin rotación en 90+ días representan > 20% del valor | Liquidar con descuentos antes de que pierda más valor; ajustar política de compras |
| 19 | **Crecimiento de ventas < inflación del país por 2+ trimestres** | Las ventas nominales crecen pero en términos reales están cayendo | El negocio se está encogiendo en términos reales aunque los números nominales parezcan estables |
| 20 | **Gastos financieros > 5% de los ingresos** | Intereses + comisiones bancarias / Ventas > 5% | La empresa está sobreendeudada o tiene deuda cara; evaluar refinanciamiento a mejor tasa |

---

### 10.4 Matriz de escalamiento

```
┌─────────────────────────────────────────────────────────────────┐
│                    MATRIZ DE ESCALAMIENTO                       │
├─────────────┬───────────────────────────────────────────────────┤
│ SEVERIDAD   │ ACCIÓN                                           │
├─────────────┼───────────────────────────────────────────────────┤
│ CRÍTICO     │ • Notificar al dueño/gerente HOY                 │
│ (Red flags  │ • Convocar reunión de emergencia en 24-48 hrs    │
│  1-7)       │ • Implementar plan de contingencia inmediato      │
│             │ • Contactar contador/abogado si hay riesgo legal  │
│             │ • Revisar diariamente hasta que se resuelva       │
├─────────────┼───────────────────────────────────────────────────┤
│ ADVERTENCIA │ • Incluir en reporte semanal al dueño/gerente    │
│ (Red flags  │ • Definir plan de acción con responsable y fecha │
│  8-15)      │ • Monitorear semanalmente                        │
│             │ • Escalar a CRÍTICO si empeora en 30 días        │
├─────────────┼───────────────────────────────────────────────────┤
│ INFORMATIVO │ • Incluir en reporte mensual                     │
│ (Red flags  │ • Analizar tendencia trimestral                  │
│  16-20)     │ • Escalar a ADVERTENCIA si persiste 2+ trimestres│
│             │ • Usar como input para planificación estratégica  │
└─────────────┴───────────────────────────────────────────────────┘
```

---

### 10.5 Protocolo de respuesta según combinación de alertas

| Combinación | Diagnóstico probable | Respuesta |
|-------------|---------------------|-----------|
| #1 + #3 + #11 | Crisis de liquidez por pérdida de cliente clave | Cobrar todo lo posible; negociar con proveedores; buscar nuevos clientes de forma urgente; línea de crédito puente |
| #9 + #12 + #14 | Erosión de rentabilidad + sobreendeudamiento | Recortar gastos fijos; renegociar condiciones de deuda; revisar precios; no tomar más deuda |
| #2 + #6 | Insolvencia inminente | Priorizar: 1° nómina, 2° impuestos con riesgo penal, 3° deuda con garantía real; consultar abogado para evaluar opciones legales |
| #10 + #13 + #18 | Problema de capital de trabajo y gestión de activos | Limpiar inventario; cobrar agresivamente; alargar plazo con proveedores; factoring |
| #8 + #16 + #19 | Pérdida de competitividad | Análisis estratégico profundo: producto, precio, plaza, promoción; benchmarking con competidores; posible pivoteo |

---

> **Nota para el agente**: Las secciones 6-10 complementan las secciones 1-5 originales. Al analizar la situación financiera de una PYME, cruzar siempre: (1) los estados financieros con los benchmarks de la sección 7, (2) las obligaciones tributarias del país correspondiente en la sección 6, (3) las alertas de la sección 10 para identificar riesgos, y (4) las opciones de financiamiento de la sección 9 cuando se requiera capital. Siempre recomendar consultar con un contador certificado del país para decisiones tributarias y legales específicas.
