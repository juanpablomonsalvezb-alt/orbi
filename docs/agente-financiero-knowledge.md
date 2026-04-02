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
