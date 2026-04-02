# Base de Conocimiento — Agente de Inventario y Operaciones

> Director Virtual de Operaciones e Inventario para PYMEs en Latinoamérica (5-50 empleados)

---

## 1. Control de Inventario para PYMEs

### 1.1 Clasificacion ABC — Paso a Paso

La clasificacion ABC segmenta productos segun su contribucion al valor total del inventario, para enfocar atencion donde mas importa.

**Principio de Pareto aplicado:**
- **A (70-80% del valor):** ~20% de los productos
- **B (15-20% del valor):** ~30% de los productos
- **C (5-10% del valor):** ~50% de los productos

**Ejemplo numerico — Ferreteria "El Tornillo" (Bogota):**

| Producto | Unidades/mes | Costo unitario (COP) | Valor mensual (COP) | % del total | % acumulado | Clase |
|---|---|---|---|---|---|---|
| Cemento (bulto) | 200 | $32.000 | $6.400.000 | 35,6% | 35,6% | A |
| Varilla 1/2" | 150 | $28.000 | $4.200.000 | 23,3% | 58,9% | A |
| Pintura (galon) | 80 | $45.000 | $3.600.000 | 20,0% | 78,9% | A |
| Tuberia PVC | 120 | $8.500 | $1.020.000 | 5,7% | 84,6% | B |
| Alambre (rollo) | 90 | $9.000 | $810.000 | 4,5% | 89,1% | B |
| Clavos (kg) | 300 | $2.500 | $750.000 | 4,2% | 93,3% | B |
| Tornillos (caja) | 250 | $1.800 | $450.000 | 2,5% | 95,8% | C |
| Cinta aislante | 180 | $1.500 | $270.000 | 1,5% | 97,3% | C |
| Lija (pliego) | 400 | $800 | $320.000 | 1,8% | 99,1% | C |
| Otros menores | — | — | $180.000 | 0,9% | 100% | C |
| **Total** | | | **$18.000.000** | **100%** | | |

**Paso a paso:**
1. Listar todos los productos con su consumo mensual y costo unitario
2. Calcular el valor mensual (unidades x costo)
3. Ordenar de mayor a menor valor
4. Calcular el porcentaje que cada producto representa del total
5. Calcular el porcentaje acumulado
6. Asignar clase: A hasta ~80%, B hasta ~95%, C el resto

**Frecuencia de revision sugerida:**
- Productos A: revision semanal de stock
- Productos B: revision quincenal
- Productos C: revision mensual

---

### 1.2 Rotacion de Inventario

La rotacion indica cuantas veces se renueva el inventario en un periodo.

**Formula:**

```
Rotacion de inventario = Costo de ventas del periodo / Inventario promedio

Inventario promedio = (Inventario inicial + Inventario final) / 2
```

**Ejemplo — Tienda de ropa (Santiago, Chile):**
- Costo de ventas anual: $48.000.000 CLP
- Inventario inicial: $8.000.000 CLP
- Inventario final: $12.000.000 CLP
- Inventario promedio: ($8.000.000 + $12.000.000) / 2 = $10.000.000 CLP
- Rotacion = $48.000.000 / $10.000.000 = **4,8 veces al ano**

**Benchmarks por industria en LATAM:**

| Industria | Rotacion saludable | Alerta si es menor a |
|---|---|---|
| Alimentos / Restaurantes | 12-24 veces/ano | 8 |
| Ropa y moda | 4-8 veces/ano | 3 |
| Ferreteria / Construccion | 4-6 veces/ano | 3 |
| Farmacia | 8-12 veces/ano | 6 |
| Tecnologia / Electronica | 6-10 veces/ano | 4 |
| Repuestos automotrices | 3-5 veces/ano | 2 |
| Abarrotes / Minimarket | 15-25 veces/ano | 10 |
| Papeleria | 4-6 veces/ano | 3 |

**Interpretacion:**
- Rotacion alta = venta rapida, menos capital inmovilizado, pero riesgo de quiebres de stock
- Rotacion baja = capital atrapado, riesgo de obsolescencia, costos de almacenamiento altos
- Lo ideal: mantenerla en el rango de la industria y mejorarla gradualmente

---

### 1.3 Dias de Inventario

Indica cuantos dias, en promedio, tarda en venderse el inventario.

**Formula:**

```
Dias de inventario = 365 / Rotacion de inventario

Alternativa: Dias de inventario = (Inventario promedio / Costo de ventas) x 365
```

**Ejemplo (continuando tienda de ropa):**
- Dias de inventario = 365 / 4,8 = **76 dias**
- Significado: en promedio, la mercaderia permanece 76 dias en la tienda antes de venderse

**Referencia por industria:**

| Industria | Dias objetivo | Maximo aceptable |
|---|---|---|
| Alimentos perecederos | 7-15 | 20 |
| Alimentos no perecederos | 15-30 | 45 |
| Ropa temporada | 45-90 | 120 |
| Ferreteria | 60-90 | 120 |
| Farmacia | 30-45 | 60 |
| Electronica | 30-60 | 90 |

---

### 1.4 Conteo Ciclico vs Inventario Completo

| Aspecto | Conteo ciclico | Inventario completo |
|---|---|---|
| Frecuencia | Continuo (diario/semanal) | 1-2 veces al ano |
| Productos contados | Grupo rotativo (ABC) | Todos |
| Operacion | No se detiene | Generalmente se detiene |
| Precision | Alta y constante | Puntual, se degrada con el tiempo |
| Costo | Bajo (1-2 personas) | Alto (equipo completo) |
| Recomendado para | PYMEs con +200 SKUs | PYMEs con <100 SKUs o cierre fiscal |

**Calendario de conteo ciclico sugerido:**

```
Productos A → Contar 1 vez por semana
Productos B → Contar 1 vez por mes
Productos C → Contar 1 vez por trimestre
```

**Ejemplo de calendario mensual para una bodega con 500 SKUs:**
- 100 SKUs clase A: 25 por semana (5 por dia laboral)
- 150 SKUs clase B: 38 por semana durante 1 mes al trimestre
- 250 SKUs clase C: todos en 1 semana cada trimestre

**Tolerancia de precision sugerida:**
- Productos A: 99,5% de precision (maximo 0,5% de diferencia)
- Productos B: 98% de precision
- Productos C: 95% de precision

---

### 1.5 Merma: Causas, Medicion y Reduccion

**Formula:**

```
Tasa de merma (%) = (Valor de merma / Valor total de inventario) x 100

Meta: mantener por debajo del 2%
```

**Causas principales en PYMEs LATAM:**

| Causa | % tipico | Medida de control |
|---|---|---|
| Robo interno | 30-35% | Camaras, control de acceso, arqueos sorpresa |
| Robo externo | 20-25% | Camaras, vigilancia, etiquetas de seguridad |
| Dano/vencimiento | 15-20% | FIFO estricto, almacenamiento adecuado |
| Error administrativo | 15-20% | Doble verificacion, sistema digital |
| Proveedor (faltantes) | 5-10% | Recepcion con conteo y pesaje |

**Plan de reduccion de merma en 90 dias:**

- [ ] Semana 1-2: Medir la merma actual con inventario completo
- [ ] Semana 3-4: Instalar camaras en puntos criticos (entrada, bodega, caja)
- [ ] Semana 5-6: Implementar control de acceso a bodega (solo personal autorizado)
- [ ] Semana 7-8: Capacitar personal en recepcion de mercaderia (contar, pesar, verificar)
- [ ] Semana 9-10: Implementar conteo ciclico de productos A
- [ ] Semana 11-12: Evaluar resultados, ajustar controles
- [ ] Mes 4 en adelante: Conteo ciclico continuo + revision mensual de merma

**Benchmark de merma por industria LATAM:**
- Supermercados: 1,5-3%
- Retail ropa: 1-2%
- Farmacias: 0,5-1%
- Ferreteria: 1-2%
- Restaurantes: 3-5% (incluye desperdicio de alimentos)

---

### 1.6 Inventario Perpetuo vs Periodico

| Criterio | Perpetuo | Periodico |
|---|---|---|
| Registro | Cada transaccion | Al final del periodo |
| Precision | Alta (tiempo real) | Baja (solo al contar) |
| Costo de implementar | Medio-alto (requiere software) | Bajo (cuaderno/Excel) |
| Ideal para | +100 SKUs, ventas diarias altas | <50 SKUs, bajo volumen |
| Detecta robos | Si (diferencias al instante) | No (solo al contar) |
| Software tipico | Bind, Alegra, Odoo, Bsale | Excel, cuaderno |

**Recomendacion por tamano de PYME:**

| Empleados | SKUs | Recomendacion |
|---|---|---|
| 1-5 | <50 | Periodico con Excel (conteo semanal) |
| 5-15 | 50-300 | Perpetuo con software basico (Bind, Alegra) |
| 15-30 | 300-1000 | Perpetuo con software integrado (Odoo, Bsale) |
| 30-50 | 1000+ | Perpetuo con ERP completo + lector de codigos |

---

### 1.7 Herramientas de Control

**Progresion recomendada:**

| Etapa | Herramienta | Costo mensual (USD) | Para cuando |
|---|---|---|---|
| 1 | Cuaderno + conteo manual | $0 | Inicio, <20 productos |
| 2 | Excel / Google Sheets | $0 | <100 productos, 1-3 personas |
| 3 | Bind ERP | $30-80 | PYMEs Mexico, +100 productos |
| 3 | Alegra | $15-50 | Colombia, Peru, varias LATAM |
| 3 | Bsale | $30-70 | Chile, Peru, Mexico |
| 4 | Odoo Community | $0 (hosting) | PYMEs con equipo tecnico |
| 4 | Odoo Enterprise | $25-60/usuario | PYMEs que necesitan soporte |
| 5 | SAP Business One | $150+ | PYME grande, en crecimiento |

**Criterios para cambiar de herramienta:**
- Mas de 2 errores de stock por semana → subir de nivel
- Mas de 30 minutos diarios en registro manual → subir de nivel
- Imposible saber stock en tiempo real → subir de nivel
- Se necesitan reportes automaticos → subir de nivel

---

## 2. Gestion de Stock

### 2.1 Stock de Seguridad

El stock de seguridad protege contra variaciones en demanda y tiempos de entrega del proveedor.

**Formula simplificada:**

```
Stock de seguridad = (Demanda maxima diaria - Demanda promedio diaria) x Lead time promedio

Formula estadistica (mas precisa):
Stock de seguridad = Z x sigma_d x sqrt(Lead time)

Donde:
Z = factor de servicio (1,65 para 95% de servicio, 2,33 para 99%)
sigma_d = desviacion estandar de la demanda diaria
```

**Ejemplo — Distribuidora de bebidas (Lima, Peru):**

| Dato | Valor |
|---|---|
| Demanda promedio diaria | 50 cajas |
| Demanda maxima diaria (pico) | 70 cajas |
| Lead time del proveedor | 3 dias |
| Lead time maximo | 5 dias |

Formula simplificada:
```
Stock de seguridad = (70 - 50) x 3 = 60 cajas
```

Formula con lead time variable:
```
Stock de seguridad = (Demanda max x Lead time max) - (Demanda promedio x Lead time promedio)
Stock de seguridad = (70 x 5) - (50 x 3) = 350 - 150 = 200 cajas
```

**Nota:** La formula simplificada es adecuada cuando el lead time es estable. Usar la formula extendida cuando el proveedor es impredecible.

---

### 2.2 Punto de Reorden

El punto de reorden indica en que nivel de stock hay que hacer un nuevo pedido.

**Formula:**

```
Punto de reorden = (Demanda promedio diaria x Lead time en dias) + Stock de seguridad
```

**Ejemplo (continuando distribuidora de bebidas):**
```
Punto de reorden = (50 x 3) + 60 = 150 + 60 = 210 cajas
```

Cuando el stock baja a 210 cajas, se genera una orden de compra.

**Tabla de puntos de reorden tipicos:**

| Producto | Demanda diaria | Lead time | Stock seguridad | Punto de reorden |
|---|---|---|---|---|
| Bebidas (cajas) | 50 | 3 dias | 60 | 210 |
| Cerveza (cajas) | 30 | 2 dias | 20 | 80 |
| Snacks (cajas) | 25 | 4 dias | 30 | 130 |
| Agua (paquetes) | 80 | 1 dia | 40 | 120 |

---

### 2.3 EOQ (Cantidad Economica de Pedido)

El EOQ minimiza el costo total de ordenar y almacenar inventario.

**Formula:**

```
EOQ = sqrt((2 x D x S) / H)

Donde:
D = Demanda anual (unidades)
S = Costo de hacer un pedido (COP/MXN/CLP)
H = Costo de mantener una unidad por ano
```

**Ejemplo — Panaderia "La Espiga" (Ciudad de Mexico):**
- Demanda anual de harina: 2.400 sacos (200/mes)
- Costo por pedido (transporte + administrativo): $500 MXN
- Costo de mantener un saco por ano (almacenamiento + deterioro): $60 MXN

```
EOQ = sqrt((2 x 2.400 x 500) / 60)
EOQ = sqrt(2.400.000 / 60)
EOQ = sqrt(40.000)
EOQ = 200 sacos por pedido
```

**Numero de pedidos al ano:** 2.400 / 200 = 12 pedidos (1 por mes)

**Cuando aplicar EOQ:**
- Demanda relativamente estable
- Costos de pedido y almacenamiento conocidos
- Producto no perecedero o con larga vida util
- No aplicar para productos con demanda muy variable o estacionales

**Cuando NO usar EOQ:**
- Productos perecederos con vida util corta
- Demanda altamente estacional (ajustar por temporada)
- Proveedores con descuentos por volumen (evaluar contra EOQ)

---

### 2.4 Metodos de Valuacion: FIFO / LIFO / Promedio Ponderado

| Metodo | Como funciona | Mejor para | Efecto en impuestos |
|---|---|---|---|
| **FIFO** (Primero en entrar, primero en salir) | Se vende primero lo mas antiguo | Perecederos, moda, tecnologia | Utilidad mas alta en inflacion → mas impuesto |
| **LIFO** (Ultimo en entrar, primero en salir) | Se vende primero lo mas reciente | Materiales no perecederos | Utilidad mas baja → menos impuesto (no permitido en varios paises LATAM) |
| **Promedio ponderado** | Costo promedio de todas las existencias | Productos homogeneos, commodities | Efecto intermedio |

**Ejemplo comparativo — Compras de arroz (50 kg):**

| Compra | Cantidad | Costo unitario (COP) | Total |
|---|---|---|---|
| Enero | 100 sacos | $85.000 | $8.500.000 |
| Marzo | 100 sacos | $90.000 | $9.000.000 |
| Mayo | 100 sacos | $95.000 | $9.500.000 |

Se venden 150 sacos:

| Metodo | Costo de los 150 vendidos | Valor de los 150 que quedan |
|---|---|---|
| FIFO | (100 x $85.000) + (50 x $90.000) = $13.000.000 | (50 x $90.000) + (100 x $95.000) = $14.000.000 |
| LIFO | (100 x $95.000) + (50 x $90.000) = $14.000.000 | (100 x $85.000) + (50 x $90.000) = $13.000.000 |
| Promedio | 150 x $90.000 = $13.500.000 | 150 x $90.000 = $13.500.000 |

**Recomendacion para PYMEs LATAM:**
- **Alimentos, cosmeticos, farmacia:** FIFO obligatorio (vencimiento)
- **Ferreteria, materiales:** Promedio ponderado (simple y aceptado fiscalmente)
- **Tecnologia:** FIFO (obsolescencia rapida)
- **Nota legal:** LIFO NO esta permitido bajo NIIF/IFRS, que rige en la mayoria de paises LATAM

---

### 2.5 Productos de Baja Rotacion

**Como identificarlos:**

```
Criterio: Rotacion < 2 veces al ano
         O: Dias de inventario > 180 dias
         O: Sin movimiento en los ultimos 90 dias
```

**Plan de accion para productos de baja rotacion:**

| Tiempo sin venta | Accion | Descuento sugerido |
|---|---|---|
| 60-90 dias | Reubicacion a zona visible, promocion | 10-15% |
| 90-120 dias | Combo con producto de alta rotacion | 20-30% |
| 120-180 dias | Liquidacion agresiva | 30-50% |
| 180+ dias | Venta de remate, donacion o descarte | 50-70% |

**Estrategias de liquidacion en LATAM:**
- Ferias de descuento / "remate" de temporada
- Combos: producto lento + producto estrella
- Venta a empleados con descuento
- Marketplaces de liquidacion (Mercado Libre, Linio)
- Trueque con otros comerciantes
- Donacion con beneficio tributario (verificar normativa local)

**Prevencion:**
- No comprar productos nuevos sin datos de demanda (empezar con lote minimo)
- Revisar rotacion mensualmente
- Negociar devolucion con proveedor antes de comprar

---

### 2.6 Estacionalidad en LATAM

**Temporadas altas tipicas:**

| Temporada | Meses | Paises | Sectores mas afectados |
|---|---|---|---|
| Vuelta a clases | Febrero-Marzo | Chile, Colombia, Peru, Mexico | Papeleria, uniformes, tecnologia |
| Dia de la Madre | Mayo (varia por pais) | Todos LATAM | Flores, ropa, cosmeticos, restaurantes |
| Dia del Padre | Junio (varia) | Todos LATAM | Tecnologia, ropa, licores |
| Fiestas patrias | Sep (Chile, Mexico), Jul (Colombia, Peru) | Varia | Alimentos, bebidas, decoracion |
| Black Friday / Cyber Monday | Noviembre | Todos LATAM | Electronica, ropa, todo retail |
| Navidad / Fin de ano | Diciembre | Todos LATAM | Todo retail, alimentos, juguetes |
| Verano | Dic-Feb (sur), Jun-Ago (norte) | Varia | Bebidas, helados, ropa de verano |

**Como preparar stock para temporada alta:**

```
Stock temporada = Demanda promedio mensual x Factor de estacionalidad x Meses de temporada

Factor de estacionalidad = Ventas del mes pico historico / Ventas promedio mensual
```

**Ejemplo — Jugueteria (Bogota), preparacion Navidad:**
- Venta promedio mensual: $15.000.000 COP
- Venta diciembre historico: $52.500.000 COP
- Factor estacionalidad diciembre: 52.500.000 / 15.000.000 = 3,5x
- Preparar stock por valor de $52.500.000 COP para diciembre

**Calendario de preparacion:**
- 90 dias antes: revisar historico de ventas, definir productos estrella
- 60 dias antes: hacer pedidos a proveedores (anticipar lead times largos)
- 45 dias antes: confirmar entregas, buscar alternativas si hay riesgo
- 30 dias antes: recibir y acomodar mercaderia, preparar promociones
- 15 dias antes: ultimo pedido de refuerzo basado en pre-ventas

---

## 3. Gestion de Proveedores

### 3.1 Regla 2+1

Nunca depender de un solo proveedor para productos criticos (clase A).

```
Para cada producto clase A:
- 2 proveedores activos (comprar regularmente a ambos)
  - Proveedor principal: 60-70% del volumen
  - Proveedor secundario: 30-40% del volumen
- 1 proveedor de reserva (cotizado, evaluado, listo para activar)
```

**Beneficios:**
- Poder de negociacion (los proveedores saben que hay competencia)
- Continuidad ante fallas de un proveedor
- Benchmark de precios permanente
- Reduccion de riesgo de desabastecimiento

**Excepcion:** Para productos clase C de bajo valor, un solo proveedor puede ser suficiente.

---

### 3.2 Evaluacion de Proveedores — Scorecard

**Scorecard trimestral (100 puntos):**

| Criterio | Peso | Escala | Como medir |
|---|---|---|---|
| Precio competitivo | 25% | 1-10 | Comparar con al menos 2 cotizaciones |
| Calidad del producto | 25% | 1-10 | % de productos rechazados o devueltos |
| Puntualidad de entrega | 25% | 1-10 | % de entregas a tiempo (meta: >95%) |
| Servicio post-venta | 15% | 1-10 | Tiempo de respuesta a reclamos |
| Flexibilidad | 10% | 1-10 | Capacidad de pedidos urgentes, devoluciones |

**Ejemplo de evaluacion:**

| Proveedor | Precio (x0,25) | Calidad (x0,25) | Puntualidad (x0,25) | Servicio (x0,15) | Flexibilidad (x0,10) | Total |
|---|---|---|---|---|---|---|
| Proveedor A | 8 (2,0) | 9 (2,25) | 7 (1,75) | 8 (1,2) | 7 (0,7) | **7,9** |
| Proveedor B | 9 (2,25) | 7 (1,75) | 9 (2,25) | 6 (0,9) | 8 (0,8) | **7,95** |
| Proveedor C | 7 (1,75) | 8 (2,0) | 5 (1,25) | 7 (1,05) | 6 (0,6) | **6,65** |

**Acciones segun puntaje:**
- 8-10: Proveedor estrella, considerar aumentar volumen
- 6-7,9: Proveedor aceptable, plan de mejora en areas debiles
- 4-5,9: Proveedor en riesgo, buscar reemplazo activamente
- <4: Descontinuar relacion

---

### 3.3 Negociacion con Proveedores

**Palancas de negociacion para PYMEs:**

| Palanca | Como usarla | Ahorro tipico |
|---|---|---|
| Descuento por volumen | Consolidar pedidos mensuales en uno solo | 3-8% |
| Pronto pago | Pagar en <15 dias a cambio de descuento | 2-5% (ej: 2/10 neto 30) |
| Contrato anual | Comprometer volumen anual por mejor precio | 5-10% |
| Pago anticipado parcial | 50% adelantado, 50% contra entrega | 3-5% |
| Compra en grupo | Aliarse con otros negocios para comprar juntos | 5-15% |
| Temporada baja | Comprar cuando el proveedor tiene menor demanda | 5-10% |

**Terminos de pago comunes en LATAM:**

| Termino | Significado | Para quien |
|---|---|---|
| Contado | Pago al recibir | Mejores precios, PYMEs con liquidez |
| 2/10 neto 30 | 2% descuento si paga en 10 dias, sino paga completo en 30 | Estandar |
| 30 dias | Pago a 30 dias de la factura | Comun en LATAM |
| 60 dias | Pago a 60 dias | Negocios establecidos |
| 90 dias | Pago a 90 dias | Retail grande, dificil para PYMEs |
| Consignacion | Pago al vender, devolucion de no vendido | Ideal para probar productos nuevos |

**Tip para la negociacion:** Siempre llevar 3 cotizaciones. Nunca negociar sin alternativas.

---

### 3.4 Contratos con Proveedores — Que Incluir

**Clausulas esenciales:**

- [ ] Descripcion exacta del producto (especificaciones, calidad, presentacion)
- [ ] Precio y condiciones de ajuste (frecuencia, indice de referencia)
- [ ] Cantidades minimas y maximas por pedido
- [ ] Plazos de entrega y penalidades por retraso
- [ ] Condiciones de pago y descuentos
- [ ] Politica de devoluciones y productos defectuosos
- [ ] Garantia de calidad y certificaciones requeridas
- [ ] Exclusividad territorial (si aplica)
- [ ] Duracion del contrato y condiciones de renovacion
- [ ] Clausula de salida (preaviso de 30-60 dias)
- [ ] Confidencialidad de precios
- [ ] Resolucion de conflictos (mediacion antes de litigio)
- [ ] Seguro de mercaderia en transito (quien asume el riesgo)

---

### 3.5 Importacion Basica

**Cuando conviene importar directo:**

| Factor | Importar directo si... | Comprar local si... |
|---|---|---|
| Volumen | >$5.000 USD por envio | <$5.000 USD |
| Diferencia de precio | >30% mas barato importado | <20% de diferencia |
| Frecuencia | Producto recurrente y estable | Producto puntual o variable |
| Experiencia | Tiene o puede contratar agente aduanal | Primera vez importando |
| Lead time | Puede esperar 30-90 dias | Necesita rapido (<7 dias) |

**Incoterms simplificados (los mas usados por PYMEs):**

| Incoterm | Significado practico | Riesgo para el comprador | Recomendado para |
|---|---|---|---|
| **EXW** | Recoges en la fabrica del proveedor | Maximo (tu pagas todo el transporte) | Solo si tienes agente en origen |
| **FOB** | Proveedor pone la mercaderia en el barco | Medio (tu pagas flete y seguro maritimo) | Importadores con experiencia |
| **CIF** | Proveedor paga flete y seguro hasta tu puerto | Bajo-medio (tu pagas aduana y transporte local) | PYMEs que empiezan a importar |
| **DDP** | Proveedor entrega en tu puerta, todo pagado | Minimo | Ideal para PYMEs, precio mas alto |

**Costos ocultos de la importacion:**
- Arancel aduanero (5-20% segun producto y pais)
- IVA de importacion (16-19% segun pais)
- Agente aduanal (0,5-1% del valor + honorarios fijos)
- Almacenaje en aduana (si se demora el despacho)
- Transporte interno (puerto a bodega)
- Seguro de carga (0,3-0,5% del valor)
- Inspecciones sanitarias/tecnicas (segun producto)

---

### 3.6 Proveedores: Matriz de Decision

| Criterio | Local (misma ciudad) | Nacional | Internacional |
|---|---|---|---|
| Lead time | 1-3 dias | 3-7 dias | 15-90 dias |
| Precio | Mayor | Intermedio | Potencialmente menor |
| MOQ (pedido minimo) | Bajo | Medio | Alto |
| Flexibilidad | Alta | Media | Baja |
| Riesgo de supply chain | Bajo | Medio | Alto |
| Servicio post-venta | Excelente | Bueno | Limitado |
| Cuando usar | Productos frescos, urgencias, volumen bajo | Volumen medio, productos estandar | Volumen alto, productos unicos |

---

### 3.7 Senales de Alarma con Proveedores

Actuar inmediatamente si se detecta cualquiera de estas senales:

- Retrasos frecuentes en entregas (>2 veces en un trimestre)
- Baja de calidad gradual sin comunicacion
- Cambio de precios sin aviso previo
- No responde llamadas/mensajes en mas de 48 horas
- Pide cambiar condiciones de pago abruptamente (de 30 dias a contado)
- Cambia de representante de ventas constantemente
- Noticias de problemas financieros o legales
- No cumple cantidades pactadas (envia menos de lo pedido)
- Rechaza devoluciones que antes aceptaba
- Exige exclusividad sin dar beneficios a cambio

**Protocolo ante senal de alarma:**
1. Documentar el incidente con fecha y evidencia
2. Comunicar formalmente al proveedor (correo, no solo WhatsApp)
3. Activar proveedor secundario si es producto clase A
4. Si hay 3+ incidentes en 6 meses, iniciar reemplazo

---

## 4. Logistica y Distribucion

### 4.1 Ultima Milla para PYMEs en LATAM

| Opcion | Costo | Control | Ideal para |
|---|---|---|---|
| Entrega propia (moto/vehiculo) | Medio (costo fijo) | Total | Radio <15 km, volumen diario >20 pedidos |
| Motorizado freelance | Bajo-medio | Medio | Volumen variable, radio <10 km |
| Apps de delivery (Rappi, PedidosYa, iFood) | Alto (comision 15-30%) | Bajo | Restaurantes, comida, farmacia |
| Courier nacional (Servientrega, Chilexpress, FedEx) | Medio | Bajo | Envios nacionales, e-commerce |
| Uber Flash / InDrive Envios | Bajo-medio | Bajo | Envios urbanos urgentes |
| Punto de retiro (tienda aliada) | Bajo | Medio | E-commerce, clientes recurrentes |

**Comparativa de costos (pedido promedio urbano ~5 kg):**

| Metodo | Costo promedio (USD) | Tiempo |
|---|---|---|
| Moto propia | $1,50-3,00 | 1-3 horas |
| Rappi / PedidosYa | $2,00-5,00 + comision | 30-90 min |
| Courier estandar | $3,00-8,00 | 1-3 dias |
| Courier express | $5,00-15,00 | Mismo dia o dia siguiente |

---

### 4.2 Costo de Envio — Como Calcularlo

**Formula basica:**

```
Costo de envio = Costo de transporte + Costo de empaque + Costo de mano de obra de preparacion

Costo por envio (con vehiculo propio):
= (Combustible mensual + Mantenimiento + Seguro + Salario repartidor) / Envios mensuales
```

**Ejemplo — Tienda de cosmeticos (Medellin):**
- Combustible mensual: $400.000 COP
- Mantenimiento moto: $150.000 COP
- Salario repartidor: $1.400.000 COP
- Envios mensuales: 300

```
Costo por envio = ($400.000 + $150.000 + $1.400.000) / 300 = $6.500 COP (~$1,60 USD)
```

**Estrategias para el costo de envio:**
- **Gratis sobre X:** "Envio gratis en compras sobre $50.000 COP" (incluir costo en el margen)
- **Costo fijo:** Cobrar tarifa plana facil de comunicar
- **Costo real:** Cobrar segun peso/distancia (transparente pero complejo)
- **Retiro en tienda gratis:** Incentivar visita fisica

---

### 4.3 Zonas de Entrega

**Como definir cobertura:**

1. Mapear el 80% de los clientes actuales (donde estan)
2. Calcular el costo de llegar a cada zona
3. Definir zonas concentricas desde el punto de operacion:
   - Zona 1 (0-5 km): entrega rapida, costo bajo
   - Zona 2 (5-15 km): entrega estandar
   - Zona 3 (15-30 km): entrega programada o costo extra
   - Zona 4 (30+ km): solo courier o no cubierto

**Matriz de decision:**

| Si el pedido promedio es... | Y la zona esta a... | Entonces... |
|---|---|---|
| >$100.000 COP | <15 km | Entrega propia, gratis |
| >$100.000 COP | 15-30 km | Entrega propia con cargo |
| <$100.000 COP | <5 km | Entrega propia, cargo minimo |
| <$100.000 COP | 5-30 km | Courier tercerizado |
| Cualquier valor | 30+ km | Solo courier nacional |

---

### 4.4 Empaque

| Factor | Basico | Estandar | Premium |
|---|---|---|---|
| Material | Bolsa plastica / papel kraft | Caja carton corrugado | Caja rigida con diseno |
| Proteccion | Baja | Media (burbuja, papel) | Alta (foam, molde) |
| Costo unitario | $500-1.500 COP | $1.500-4.000 COP | $4.000-15.000 COP |
| Impacto en marca | Bajo | Medio | Alto (unboxing experience) |
| Usar para | Productos resistentes, bajo valor | Electronica, cosmeticos | Joyeria, regalos, premium |

**Regla del 3%:** El costo del empaque no deberia superar el 3% del precio de venta del producto.

---

### 4.5 Devoluciones — Proceso y Politicas

**Politica de devoluciones sugerida para PYMEs:**

```
Plazo: 15-30 dias desde la compra
Condicion: Producto sin usar, con etiquetas, en empaque original
Excluidos: Productos personalizados, perecederos, ropa interior, cosmeticos abiertos
Opciones: Cambio por otro producto, nota de credito, o devolucion de dinero
Costo de devolucion: A cargo del cliente (excepto si el producto es defectuoso)
```

**Proceso de devolucion en 5 pasos:**

1. Cliente contacta (WhatsApp, telefono, tienda)
2. Verificar que cumple politica (plazo, condicion)
3. Coordinar recepcion del producto (retiro o envio por cliente)
4. Inspeccion del producto al recibirlo
5. Procesar cambio, nota de credito o reembolso en max 5 dias habiles

**Metricas:**
- Tasa de devolucion saludable: <5% en retail fisico, <10% en e-commerce
- Si supera estos numeros, investigar causa raiz (calidad, fotos enganosas, tallas)

---

### 4.6 Logistica Inversa Simplificada

La logistica inversa cubre: devoluciones, productos defectuosos, reciclaje, y sobrantes.

**Flujo para PYMEs:**

```
Producto devuelto/defectuoso
    |
    +--> Inspeccion
            |
            +--> En condiciones de venta? --> Reintegrar al inventario
            |
            +--> Reparable? --> Reparar y vender como "segunda" con descuento
            |
            +--> No reparable? --> Reciclar, donar o desechar
```

**Costos a considerar:**
- Transporte de retorno
- Mano de obra de inspeccion
- Reacondicionamiento
- Destruccion o reciclaje
- Impacto en satisfaccion del cliente (invertir aqui paga)

---

## 5. Operaciones y Procesos

### 5.1 Teoria de Restricciones (TOC) Aplicada

**Los 5 pasos de Goldratt para PYMEs:**

1. **Identificar** el cuello de botella (el recurso mas lento/limitado)
2. **Explotar** el cuello de botella (sacarle el maximo sin invertir mas)
3. **Subordinar** todo lo demas al cuello de botella (no producir mas de lo que puede procesar)
4. **Elevar** la restriccion (invertir para aumentar su capacidad)
5. **Repetir** (buscar el nuevo cuello de botella)

**Ejemplo — Taller de muebles (Quito, Ecuador):**

| Estacion | Capacidad diaria | Uso actual |
|---|---|---|
| Corte de madera | 30 piezas | 25 piezas |
| Ensamblaje | 15 piezas | 15 piezas ← CUELLO DE BOTELLA |
| Lijado | 25 piezas | 15 piezas |
| Pintura | 20 piezas | 15 piezas |

El taller produce 15 piezas/dia porque ensamblaje no puede con mas. Acciones:
1. Explotar: eliminar tiempos muertos en ensamblaje, pre-preparar piezas
2. Subordinar: corte solo produce 15 piezas (no acumular inventario en proceso)
3. Elevar: contratar otro ensamblador o comprar mejor herramienta

---

### 5.2 Lean para PYMEs — Los 8 Desperdicios (TIMWOODS)

| Desperdicio | Que es | Ejemplo en PYME LATAM | Como reducirlo |
|---|---|---|---|
| **T**ransporte | Mover material innecesariamente | Bodega lejos de la tienda, proveedores lejanos | Reubicar bodega, proveedores locales |
| **I**nventario | Stock excesivo | Comprar de mas por "descuento", bodega llena de cosas sin vender | Usar EOQ, revisar rotacion mensual |
| **M**ovimiento | Desplazamientos innecesarios de personas | Empleado caminando por herramientas todo el dia | 5S, organizar puesto de trabajo |
| **W**aiting (espera) | Tiempo sin producir valor | Esperar al proveedor, al jefe, a que se arregle la maquina | Lead times claros, mantenimiento preventivo |
| **O**verproduction | Producir mas de lo necesario | Hacer 200 panes cuando se venden 120 | Producir segun demanda real, no "por si acaso" |
| **O**verprocessing | Procesos innecesarios | Empacar 3 veces, documentar todo en papel y despues en computador | Simplificar, digitalizar una sola vez |
| **D**efectos | Productos o servicios defectuosos | Productos devueltos, trabajo rehecho | Control de calidad en proceso, no al final |
| **S**kills (talento) | No usar las habilidades del equipo | Gerente haciendo tareas de bodeguero | Delegar, capacitar, empoderar |

---

### 5.3 Metodologia 5S Aplicada

| S | Japones | Espanol | Accion en bodega/tienda |
|---|---|---|---|
| 1 | Seiri | **Clasificar** | Separar lo necesario de lo innecesario. Sacar todo lo que no se usa en 30 dias |
| 2 | Seiton | **Ordenar** | Un lugar para cada cosa. Etiquetar estantes, zonas, contenedores |
| 3 | Seiso | **Limpiar** | Limpiar todo. Pisos, estantes, equipos. La limpieza es inspeccion |
| 4 | Seiketsu | **Estandarizar** | Crear reglas: "Cada viernes se limpia", "El producto X va en el estante 3" |
| 5 | Shitsuke | **Disciplina** | Mantener el habito. Checklist semanal, auditorias mensuales |

**Implementacion 5S en 30 dias:**

- [ ] Semana 1: Clasificar — sacar todo lo innecesario, marcar con etiqueta roja lo dudoso
- [ ] Semana 2: Ordenar — definir ubicacion para cada producto/herramienta, etiquetar
- [ ] Semana 3: Limpiar — limpieza profunda, identificar fuentes de suciedad
- [ ] Semana 4: Estandarizar — escribir reglas simples, pegar en pared, asignar responsables
- [ ] En adelante: Disciplina — auditoria 5S cada 2 semanas (5 minutos, checklist de 10 puntos)

---

### 5.4 Documentacion de Procesos — Template Simple

Para cada proceso critico, documentar en una sola pagina:

```
PROCESO: [Nombre del proceso]
RESPONSABLE: [Cargo, no nombre de persona]
FRECUENCIA: [Diario / Semanal / Cuando se necesite]
OBJETIVO: [Que se logra con este proceso]

PASOS:
1. [Accion] — [Quien lo hace] — [Herramienta/sistema]
2. [Accion] — [Quien lo hace] — [Herramienta/sistema]
3. ...

REGISTROS: [Que se documenta y donde]
QUE HACER SI FALLA: [Accion correctiva inmediata]
REVISION: [Cada cuantos meses se revisa este documento]
```

**Ejemplo — Recepcion de mercaderia:**

```
PROCESO: Recepcion de mercaderia
RESPONSABLE: Bodeguero
FRECUENCIA: Cada vez que llega un proveedor
OBJETIVO: Recibir mercaderia correcta en cantidad y calidad

PASOS:
1. Verificar orden de compra vs guia de despacho — Bodeguero — Sistema/Excel
2. Contar unidades recibidas — Bodeguero — Manual
3. Inspeccionar calidad (visual, vencimientos, dano) — Bodeguero — Manual
4. Si hay diferencias: anotar en guia, fotografiar, notificar a compras — Bodeguero — WhatsApp + foto
5. Ingresar al sistema/Excel — Bodeguero — Sistema de inventario
6. Ubicar en bodega segun zona asignada — Bodeguero — Manual
7. Archivar guia firmada — Bodeguero — Carpeta fisica

REGISTROS: Guia firmada, ingreso en sistema, fotos de diferencias
QUE HACER SI FALLA: Rechazar mercaderia danada, notificar a gerente y proveedor
REVISION: Cada 6 meses
```

---

### 5.5 Mantenimiento Preventivo

**Checklist por tipo de equipo:**

**Vehiculo de reparto:**
- [ ] Diario: nivel de combustible, presion de llantas, luces
- [ ] Semanal: nivel de aceite, agua, frenos
- [ ] Mensual: revision general mecanica
- [ ] Cada 5.000 km: cambio de aceite y filtros
- [ ] Anual: revision tecnica obligatoria

**Refrigerador/congelador comercial:**
- [ ] Diario: verificar temperatura (registro), revisar sello de puerta
- [ ] Semanal: limpiar interior y exterior
- [ ] Mensual: limpiar condensador (rejilla trasera)
- [ ] Trimestral: revision de gas refrigerante y compresor
- [ ] Anual: mantenimiento completo por tecnico

**Maquina de produccion (costura, impresion, CNC, etc.):**
- [ ] Diario: limpieza, lubricacion de partes moviles, revision visual
- [ ] Semanal: calibracion, ajuste de tension, limpieza profunda
- [ ] Mensual: revision de desgaste de piezas, cambio de consumibles
- [ ] Trimestral: mantenimiento preventivo por tecnico especializado
- [ ] Anual: overhaul completo

**Costo del mantenimiento preventivo vs correctivo:**

```
Regla general: $1 en prevencion ahorra $4-8 en reparacion de emergencia
```

---

### 5.6 Capacidad — Calculo y Expansion

**Formula basica:**

```
Capacidad teorica = Horas disponibles x Unidades por hora

Capacidad real = Capacidad teorica x Factor de eficiencia (tipicamente 0,75-0,85)

Utilizacion = Produccion real / Capacidad real x 100%
```

**Ejemplo — Panaderia artesanal (Guadalajara):**
- Horno: capacidad 60 panes por hora
- Horas de operacion: 10 horas/dia
- Capacidad teorica: 600 panes/dia
- Factor de eficiencia (tiempos de carga, limpieza, calentamiento): 0,80
- Capacidad real: 600 x 0,80 = 480 panes/dia
- Produccion actual: 420 panes/dia
- Utilizacion: 420 / 480 = 87,5%

**Cuando expandir capacidad:**

| Utilizacion | Estado | Accion |
|---|---|---|
| <60% | Subutilizado | Buscar mas demanda, reducir turnos |
| 60-80% | Optimo | Mantener, mejorar eficiencia |
| 80-90% | Zona de precaucion | Planificar expansion |
| >90% | Critico | Expandir: mas equipos, turnos, o tercerizar |

**Opciones de expansion (menor a mayor inversion):**
1. Agregar turno nocturno o fin de semana
2. Tercerizar la produccion excedente (maquila)
3. Optimizar procesos para aumentar eficiencia
4. Comprar equipo adicional
5. Ampliar instalaciones

---

## 6. Almacenamiento

### 6.1 Layout de Bodega — Principios Basicos

**Reglas de oro:**

1. **Productos A cerca de la salida:** Los 20% de productos que mas se mueven deben estar en la zona mas accesible
2. **FIFO fisico:** Producto nuevo atras, producto viejo adelante. Estantes con acceso por ambos lados son ideales
3. **Pasillos libres:** Minimo 1,2 m para personas, 2,5 m si hay montacargas/transpaleta
4. **Productos pesados abajo:** En los niveles inferiores del estante
5. **Productos peligrosos separados:** Quimicos, inflamables en zona ventilada y senalizada
6. **Zona de recepcion y despacho separadas:** Evitar que se crucen flujos

**Layout recomendado para bodega PYME (100-500 m2):**

```
[Puerta de entrada de mercaderia]
        |
[ZONA DE RECEPCION] ← Mesa de verificacion, bascula
        |
[PASILLO PRINCIPAL]
   |         |         |
[Zona A]  [Zona B]  [Zona C]
(alta     (media    (baja
rotacion) rotacion) rotacion)
   |         |         |
[PASILLO PRINCIPAL]
        |
[ZONA DE DESPACHO / PREPARACION DE PEDIDOS]
        |
[Puerta de salida / despacho]
```

---

### 6.2 Etiquetado y Codificacion

**Niveles de codificacion:**

| Nivel | Metodo | Costo | Para quien |
|---|---|---|---|
| Basico | Codigo manual (ej: FER-001, ALI-023) | $0 | <100 SKUs, sin sistema digital |
| Intermedio | Codigo de barras (EAN-13) | $50-200 USD (impresora basica) | 100-1000 SKUs, con POS/sistema |
| Avanzado | Codigo QR con info adicional | $100-300 USD | E-commerce, trazabilidad |
| Profesional | RFID | $500+ USD | Alta seguridad, gran volumen |

**Nomenclatura sugerida para codigo interno:**

```
[CATEGORIA]-[SUBCATEGORIA]-[CONSECUTIVO]

Ejemplos:
ALI-LAC-001 → Alimentos - Lacteos - Producto 1
FER-TOR-015 → Ferreteria - Tornillos - Producto 15
ROPa-CAM-008 → Ropa - Camisas - Producto 8
```

**Que debe decir la etiqueta de ubicacion:**

```
Pasillo - Estante - Nivel - Posicion
Ejemplo: A-03-2-B = Pasillo A, Estante 3, Nivel 2, Posicion B
```

---

### 6.3 Condiciones de Almacenamiento por Tipo de Producto

| Tipo de producto | Temperatura | Humedad | Luz | Especial |
|---|---|---|---|---|
| Alimentos secos | 15-25 C | <60% | Evitar luz directa | Lejos de quimicos |
| Alimentos refrigerados | 0-5 C | 80-90% | N/A | Cadena de frio, termometro |
| Congelados | -18 C o menos | N/A | N/A | No recongelar |
| Medicamentos | 15-25 C (ambiente controlado) | <60% | Proteger de luz | Normativa sanitaria |
| Cosmeticos | 15-25 C | <70% | Evitar luz solar | Separar de alimentos |
| Quimicos / Limpieza | Ambiente | Variable | Variable | Ventilacion, separados, ficha de seguridad |
| Electronica | 15-30 C | <70% | Indiferente | Antiestatico, proteger de polvo |
| Papel / Carton | 18-24 C | 40-60% | Evitar humedad | Lejos de agua y humedad |
| Textiles | Ambiente | <65% | Evitar sol directo | Proteger de polillas, humedad |

---

### 6.4 Seguridad — Prevencion de Robos

**Medidas por nivel de inversion:**

| Nivel | Medida | Costo estimado (USD) |
|---|---|---|
| Bajo | Candados de calidad, control de llaves, registro de acceso | $50-200 |
| Bajo | Iluminacion adecuada (LED en toda la bodega) | $100-500 |
| Medio | Camaras de seguridad (4-8 camaras IP con grabacion) | $300-800 |
| Medio | Acceso restringido: solo personal autorizado en bodega | $0 (politica) |
| Medio | Inventario ciclico (detecta faltantes rapido) | $0 (proceso) |
| Alto | Alarma perimetral con monitoreo 24/7 | $50-100/mes |
| Alto | Control biometrico de acceso | $500-1.500 |

**Politicas anti-robo internas:**
- Bolsos y mochilas no entran a bodega
- Salidas de mercaderia solo con guia firmada por supervisor
- Rotacion de personal en areas sensibles
- Conteo sorpresa aleatorio (minimo 1 por semana)
- Camaras visibles (efecto disuasorio)
- Cero tolerancia: politica clara comunicada desde la contratacion

---

### 6.5 Costos de Almacenamiento

**Formula:**

```
Costo de almacenamiento = Costo de espacio + Costo de manejo + Costo de riesgo + Costo de capital

Desglose:
- Espacio: arriendo o costo de oportunidad del espacio propio + servicios basicos
- Manejo: sueldos de bodegueros, equipos (estantes, transpaleta)
- Riesgo: seguros, merma, obsolescencia, deterioro
- Capital: costo de oportunidad del dinero invertido en inventario (tipicamente 8-15% anual)
```

**Regla practica:**

```
Costo anual de mantener inventario ≈ 20-30% del valor del inventario

Ejemplo: Si tienes $50.000.000 COP en inventario
Costo anual de mantenerlo ≈ $10.000.000 - $15.000.000 COP
```

**Desglose tipico:**
- Capital inmovilizado: 8-12%
- Espacio y servicios: 3-5%
- Seguros: 1-2%
- Merma y obsolescencia: 2-5%
- Manejo y personal: 3-5%

---

## 7. Cadena de Suministro para PYMEs

### 7.1 Mapeo de Cadena de Suministro Simplificado

**Template de mapeo en 5 eslabones:**

```
[PROVEEDOR de materia prima]
    ↓ Lead time: __ dias
[PROVEEDOR / FABRICANTE]
    ↓ Lead time: __ dias
[TU NEGOCIO - Almacen/Produccion]
    ↓ Lead time: __ dias
[DISTRIBUCION / ENTREGA]
    ↓ Lead time: __ dias
[CLIENTE FINAL]
```

**Ejemplo — Cafeteria (Buenos Aires):**

```
[Finca cafetalera Colombia] → 15 dias maritimo
    ↓
[Tostador local Buenos Aires] → 3 dias
    ↓
[Mi cafeteria - Stock en tienda] → 0 dias (inmediato)
    ↓
[Cliente - Bebida preparada] → 5 minutos
    ↓
Total lead time de reposicion: 18 dias

Riesgos identificados:
- Tostador es unico proveedor (activar regla 2+1)
- Transporte maritimo puede retrasarse (stock seguridad de 7 dias)
```

**Ejercicio de mapeo rapido (30 minutos):**
1. Listar los 5 productos mas importantes (clase A)
2. Para cada uno, mapear: de donde viene, cuantos intermediarios, cuanto tarda
3. Identificar: punto mas lento, punto con un solo proveedor, punto sin alternativa
4. Priorizar acciones: empezar por el riesgo mas critico

---

### 7.2 Lead Time — Medicion y Reduccion

**Como medir:**

```
Lead time total = Tiempo de pedido + Tiempo de produccion/preparacion del proveedor + Tiempo de transporte + Tiempo de recepcion e ingreso

Registrar para cada proveedor:
- Fecha de pedido
- Fecha de despacho (confirmada por proveedor)
- Fecha de recepcion
- Fecha de ingreso al sistema/bodega
```

**Estrategias para reducir lead time:**

| Estrategia | Reduccion tipica | Facilidad |
|---|---|---|
| Proveedores locales en vez de lejanos | 50-80% | Media |
| Pedidos programados (automaticos) | 20-30% (elimina tiempo de decision) | Facil |
| Comunicacion directa (WhatsApp, no email) | 10-20% | Facil |
| Stock en consignacion del proveedor | 80-100% (stock ya esta ahi) | Dificil de negociar |
| Pedidos mas frecuentes y mas pequenos | Variable | Media |
| Envio express en vez de estandar | 30-60% | Costoso |

---

### 7.3 Riesgos en la Cadena de Suministro

**Matriz de riesgos comunes en LATAM:**

| Riesgo | Probabilidad | Impacto | Mitigacion |
|---|---|---|---|
| Proveedor unico quiebra | Baja | Critico | Regla 2+1 |
| Desastre natural (terremoto, inundacion) | Baja | Alto | Stock seguridad, proveedores en distintas zonas |
| Paro de transporte / bloqueo de carreteras | Media (LATAM) | Alto | Stock para 2-4 semanas de productos criticos |
| Devaluacion de moneda | Media | Medio | Proveedores locales, contratos en moneda local |
| Escasez de materia prima | Media | Alto | Diversificar proveedores, productos sustitutos |
| Aumento de aranceles / impuestos | Media | Medio | Monitorear normativa, proveedores nacionales |
| Robo en transito | Media (segun zona) | Medio | Seguro de carga, transportistas confiables |
| Huelga de puerto / aduana | Baja-media | Alto | No depender solo de importacion |

---

### 7.4 Compras en Grupo — Cooperativas y Alianzas

**Como funciona:**
Varios negocios pequenos se unen para comprar como uno grande, obteniendo mejores precios.

**Estructura simple:**

```
PYME 1 (necesita 100 unidades)
PYME 2 (necesita 150 unidades)  →  Pedido conjunto: 500 unidades  →  Descuento del 12%
PYME 3 (necesita 120 unidades)      (vs 3-5% individual)
PYME 4 (necesita 130 unidades)
```

**Pasos para organizar una compra en grupo:**
1. Identificar 3-5 negocios del mismo rubro (no competidores directos)
2. Acordar producto, cantidad y proveedor
3. Designar un coordinador (rota cada trimestre)
4. Negociar en bloque con el proveedor
5. El coordinador recibe y distribuye (o el proveedor entrega por separado)
6. Cada negocio paga su parte antes del pedido

**Donde encontrar aliados:**
- Camaras de comercio locales
- Gremios / asociaciones del rubro
- Grupos de WhatsApp de emprendedores
- Ferias y eventos empresariales
- Programas gubernamentales de apoyo PYME (CORFO, iNNpulsa, INADEM)

---

## 8. Metricas Operativas — Dashboard del Director de Inventario

### 8.1 Resumen de Metricas Clave

| Metrica | Formula | Meta | Frecuencia |
|---|---|---|---|
| **Fill rate** (tasa de cumplimiento) | Pedidos entregados completos / Total de pedidos x 100 | >95% | Semanal |
| **Dias de inventario** | (Inventario promedio / Costo de ventas) x 365 | Segun industria | Mensual |
| **Rotacion de inventario** | Costo de ventas / Inventario promedio | Segun industria | Mensual |
| **Costo de mantener inventario** | (Costo almac. + Capital + Riesgo) / Valor inventario x 100 | <25% anual | Trimestral |
| **Tasa de merma** | Valor de merma / Valor inventario x 100 | <2% | Mensual |
| **Puntualidad de entregas** | Entregas a tiempo / Total de entregas x 100 | >90% | Semanal |
| **Utilizacion de capacidad** | Produccion real / Capacidad real x 100 | 70-85% | Mensual |
| **Quiebre de stock** | Dias sin stock / Dias del periodo x 100 | <3% | Semanal |
| **Precision de inventario** | Items correctos en conteo / Items contados x 100 | >97% | Por conteo ciclico |
| **Costo de ultima milla** | Gasto total de envios / Numero de envios | Reducir 5%/trimestre | Mensual |

---

### 8.2 Fill Rate (Tasa de Cumplimiento)

```
Fill rate por pedido = Pedidos entregados completos y a tiempo / Total de pedidos x 100

Fill rate por linea = Lineas de pedido cumplidas / Total de lineas de pedido x 100
```

**Ejemplo:**
- Se recibieron 200 pedidos en el mes
- 185 se entregaron completos y a tiempo
- Fill rate = 185 / 200 = 92,5%

**Interpretacion:**
- >98%: Excelente (nivel de clase mundial)
- 95-98%: Bueno (meta para PYMEs bien gestionadas)
- 90-95%: Aceptable (pero hay dinero dejado en la mesa)
- <90%: Critico (clientes se estan perdiendo)

---

### 8.3 Dias de Inventario por Categoria

Calcular dias de inventario por categoria permite identificar donde esta el exceso.

**Ejemplo — Minimarket (San Jose, Costa Rica):**

| Categoria | Inventario (USD) | Venta mensual (USD) | Dias de inventario | Estado |
|---|---|---|---|---|
| Bebidas | $2.000 | $4.000 | 15 dias | OK |
| Lacteos | $800 | $3.000 | 8 dias | OK |
| Snacks | $1.500 | $2.500 | 18 dias | OK |
| Limpieza | $3.000 | $1.200 | 75 dias | EXCESO |
| Enlatados | $2.500 | $800 | 94 dias | EXCESO |

Accion: Reducir compra de limpieza y enlatados. Liquidar sobrante con descuento.

---

### 8.4 Rotacion por Producto

Analizar rotacion a nivel de producto individual para identificar los "muertos" y las "estrellas":

```
Rotacion del producto = Unidades vendidas en el periodo / Stock promedio del producto
```

**Clasificacion rapida:**

| Rotacion | Clasificacion | Accion |
|---|---|---|
| >12 veces/ano | Estrella | Nunca quedarse sin stock |
| 6-12 veces/ano | Buen movimiento | Mantener |
| 2-6 veces/ano | Lento | Reducir stock, evaluar precio |
| <2 veces/ano | Muerto | Liquidar o descontinuar |

---

### 8.5 Costo de Mantener Inventario — Formula Detallada

```
Costo anual de mantener inventario = CC + CA + CS + CO

Donde:
CC (Costo de Capital) = Valor del inventario x Tasa de interes anual
CA (Costo de Almacenamiento) = Arriendo/m2 x m2 usados + Servicios basicos
CS (Costo de Servicio) = Seguros + Impuestos sobre inventario
CO (Costo de Obsolescencia/Riesgo) = Valor de merma + Obsolescencia + Dano

Tasa porcentual = (CC + CA + CS + CO) / Valor promedio del inventario x 100
```

**Ejemplo — Distribuidora de repuestos (Barranquilla, Colombia):**

| Componente | Valor anual (COP) |
|---|---|
| Inventario promedio | $120.000.000 |
| Costo de capital (12% anual) | $14.400.000 |
| Arriendo bodega + servicios | $6.000.000 |
| Seguros | $1.200.000 |
| Merma y obsolescencia (3%) | $3.600.000 |
| **Total costo de mantener** | **$25.200.000** |
| **Tasa porcentual** | **21%** |

Por cada $100 de inventario, cuesta $21 al ano mantenerlo. Cada peso en inventario innecesario es dinero perdido.

---

### 8.6 Tasa de Merma — Seguimiento

**Dashboard mensual:**

```
Mes: __________
Inventario teorico (segun sistema): $__________
Inventario real (segun conteo):     $__________
Diferencia (merma):                 $__________
Tasa de merma:                      ___%

Detalle de merma:
- Productos vencidos:    $__________ (__%)
- Productos danados:     $__________ (__%)
- Faltantes sin explicar:$__________ (__%)
- Error administrativo:  $__________ (__%)
```

**Tendencia (ultimos 6 meses):**

| Mes | Valor inventario | Merma | Tasa | Tendencia |
|---|---|---|---|---|
| Enero | | | | |
| Febrero | | | | |
| Marzo | | | | |
| Abril | | | | |
| Mayo | | | | |
| Junio | | | | |

Meta: tendencia descendente, tasa por debajo del 2%.

---

### 8.7 Puntualidad de Entregas

```
Puntualidad = Entregas realizadas en fecha prometida / Total entregas x 100
```

Medir tanto entregas de proveedores como entregas a clientes:

**Proveedores:**

| Proveedor | Entregas totales | A tiempo | Puntualidad |
|---|---|---|---|
| Proveedor A | 12 | 11 | 92% |
| Proveedor B | 8 | 8 | 100% |
| Proveedor C | 10 | 6 | 60% ← ALERTA |

**Propias (a clientes):**

| Canal | Entregas totales | A tiempo | Puntualidad | Meta |
|---|---|---|---|---|
| Entrega propia | 180 | 165 | 92% | >95% |
| Courier | 80 | 70 | 87,5% | >90% |
| Retiro en tienda | 50 | 49 | 98% | >98% |

---

### 8.8 Utilizacion de Capacidad

```
Utilizacion = (Produccion real / Capacidad disponible) x 100
```

Monitorear semanalmente y graficar tendencia:

| Semana | Capacidad disponible | Produccion real | Utilizacion | Observacion |
|---|---|---|---|---|
| 1 | 500 unidades | 400 | 80% | Normal |
| 2 | 500 unidades | 475 | 95% | Sobre demanda — evaluar turno extra |
| 3 | 500 unidades | 350 | 70% | Falla de equipo martes |
| 4 | 500 unidades | 420 | 84% | Normal |
| **Promedio** | | | **82%** | **En rango optimo** |

---

## Apendice: Checklist de Implementacion para el Agente de Inventario

### Fase 1 — Diagnostico (Semana 1-2)
- [ ] Contar todo el inventario fisico actual
- [ ] Registrar en Excel/sistema con codigo, descripcion, cantidad, costo
- [ ] Clasificar ABC por valor de consumo
- [ ] Calcular rotacion actual y dias de inventario
- [ ] Medir merma actual
- [ ] Identificar productos muertos (sin movimiento en 90+ dias)
- [ ] Mapear proveedores actuales y lead times

### Fase 2 — Orden Basico (Semana 3-4)
- [ ] Implementar 5S en bodega/almacen
- [ ] Definir ubicaciones fijas para cada producto
- [ ] Etiquetar estantes y zonas
- [ ] Establecer punto de reorden para productos A
- [ ] Calcular stock de seguridad para productos A
- [ ] Implementar FIFO fisico (producto viejo adelante)

### Fase 3 — Procesos (Semana 5-8)
- [ ] Documentar proceso de recepcion de mercaderia
- [ ] Documentar proceso de despacho/venta
- [ ] Implementar conteo ciclico (empezar con productos A)
- [ ] Establecer politica de devoluciones
- [ ] Evaluar proveedores con scorecard
- [ ] Activar regla 2+1 para productos criticos

### Fase 4 — Metricas y Mejora (Semana 9-12)
- [ ] Dashboard mensual con metricas clave (seccion 8)
- [ ] Reunion mensual de revision de inventario (30 min)
- [ ] Plan de reduccion de merma
- [ ] Negociacion con proveedores principales
- [ ] Evaluacion de software de inventario (si aplica)
- [ ] Plan de estacionalidad para proxima temporada alta

### Fase 5 — Optimizacion Continua (Trimestral)
- [ ] Recalcular ABC (la clasificacion cambia)
- [ ] Revisar puntos de reorden y stock de seguridad
- [ ] Evaluar proveedores (scorecard trimestral)
- [ ] Liquidar productos de baja rotacion
- [ ] Ajustar EOQ segun datos reales
- [ ] Capacitar personal en novedades de proceso

---

> **Nota:** Este documento es una guia practica orientada a PYMEs de Latinoamerica con 5-50 empleados. Las formulas, benchmarks y ejemplos estan calibrados para la realidad regional. Los valores en moneda son referenciales y deben ajustarse al pais y momento especifico.
