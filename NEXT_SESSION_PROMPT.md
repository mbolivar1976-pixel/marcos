# PROMPT PARA LA PRÓXIMA SESIÓN — Marketing Integral LMS

## TAREA PRINCIPAL

Reescribir las lecciones pendientes del archivo `/home/user/marcos/marketing_integral_lms_v3.html` con contenido de profundidad académica (6.000–9.500 chars cada una), basado en el libro de texto UNIR ubicado en `/home/user/marcos/marketingintegral.pdf`.

---

## ESTADO ACTUAL — LO QUE ESTÁ HECHO ✅

| Tema | Lecciones | Chars aprox | Estado |
|------|-----------|------------|--------|
| Tema 2 | 2-1 a 2-5 | 6.771–8.235 | ✅ Completado |
| Tema 3 | 3-1 a 3-5 | 5.972–6.979 | ✅ Completado |
| Tema 4 | 4-1 a 4-5 | 6.385–7.493 | ✅ Completado |
| Tema 5 | 5-1 a 5-5 | 7.104–9.450 | ✅ Completado |
| Tema 6 | 6-1 a 6-5 | 6.645–8.863 | ✅ Completado |
| Tema 7 | **7-1 únicamente** | 6.570 | ✅ Solo la primera |

---

## LECCIONES PENDIENTES — EMPEZAR AQUÍ ⚠️

| Lección | Título | Chars actuales | Línea HTML aprox |
|---------|--------|---------------|-----------------|
| **7-2** | Del Offline al Online Marketing | ~3.099 | 330 |
| **7-3** | Comercio Electrónico | ~3.487 | 344 |
| **7-4** | Omnicanalidad | ~3.394 | 358 |
| **7-5** | Inbound Marketing | ~3.524 | 372 |
| **8-1** | Introducción y Objetivos (Herr. Digitales) | ~2.779 | 373 |
| **8-2** | Marketing de Contenidos | ~3.082 | 387 |
| **8-3** | E-mail Marketing | ~3.735 | 401 |
| **8-4** | Posicionamiento Web: SEO y SEM | ~3.849 | 417 |
| **8-5** | Redes Sociales | ~3.499 | 433 |
| **8-6** | Medición y Analítica | ~3.439 | 447 |
| **9-1** | Introducción y Objetivos (Plan Marketing) | ~2.899 | 461 |
| **9-2** | El Plan de Marketing en la Planificación | ~3.291 | 475 |
| **9-3** | Análisis y Diagnóstico de la Situación | ~3.805 | 489 |
| **9-4** | Fijación de Objetivos | ~3.473 | 505 |
| **9-5** | Elección de Estrategias de Marketing | ~3.514 | 521 |
| **9-6** | Definición de Planes de Acción | ~3.375 | 537 |
| **9-7** | Elementos para el Éxito del Plan | ~3.828 | 551 |

**EMPEZAR POR 7-2** (línea ~330 del HTML).

---

## VERIFICACIÓN RÁPIDA DEL ESTADO

```bash
python3 -c "
import re
with open('/home/user/marcos/marketing_integral_lms_v3.html', 'r') as f:
    content = f.read()
for tema in [7, 8, 9]:
    max_l = 7 if tema == 9 else (6 if tema == 8 else 5)
    for i in range(1, max_l + 1):
        key = f'{tema}-{i}'
        pattern = rf'\"{key}\": \`(.*?)\`'
        m = re.findall(pattern, content, re.DOTALL)
        status = f'{len(m[0])} chars' if m else 'NOT FOUND'
        flag = '✅' if m and len(m[0]) >= 6000 else '⚠️ PENDIENTE'
        print(f'{key}: {status} {flag}')
"
```

---

## ESTRUCTURA TÉCNICA OBLIGATORIA

### Formato de las lecciones — UNA SOLA LÍNEA dentro del backtick
```javascript
"7-2": `<div class="l-body"><h2>📌 Concepto Central</h2><p>...</p>...<div class="rbox">...</div></div>`,
```

**CRÍTICO**: El contenido va en UNA SOLA LÍNEA. No usar `\n` ni saltos de línea reales.

### Estructura HTML requerida
```
<div class="l-body">
  <h2>📌 Concepto Central</h2>
  <p>Intro académica con definición de libro...</p>
  <div class="cbox"><div class="cbox-lbl">Título (Autor, año)</div><p>Definición exacta del PDF</p></div>

  <h2>🎯 Desarrollo del Contenido</h2>
  <p>Párrafo expansivo...</p>
  <h3>Subtema 1</h3><p>...</p><ul><li><strong>Item:</strong> desc</li>...</ul>
  <h3>Subtema 2</h3>...
  <div class="ebox"><div class="ebox-lbl">Empresa: subtítulo del caso</div><p>Caso real con datos (cifras, años, %)</p></div>

  <h2>💡 Ideas para Recordar</h2>
  <ul><li>Idea 1 con explicación.</li>...(5 ideas mínimo)</ul>

  <div class="rbox"><div class="rbox-lbl">📚 Referencias</div><p>Ref1 — Ref2 — Ref3</p></div>
</div>
```

---

## CÓMO EXTRAER CONTENIDO DEL PDF

`pdftotext` no está disponible. Usar PyPDF2:

```bash
python3 -c "
import PyPDF2
with open('marketingintegral.pdf', 'rb') as f:
    reader = PyPDF2.PdfReader(f)
    for pg in range(PAGE_START-1, PAGE_END):  # índice 0-based
        print(f'=== PAGE {pg+1} ===')
        print(reader.pages[pg].extract_text()[:2500])
        print()
"
```

---

## PÁGINAS DEL PDF POR LECCIÓN

### Tema 7 — Marketing en Internet
- **7-2** Del offline al online — PDF páginas 177–184
  - CRM → e-CRM, ventajas e-CRM (Chaffey y Ellis-Chadwick, 2016)
  - Gamificación: proceso de aplicar mecánicas de juego para motivar comportamiento
  - Marketing online: asequible, efectivo, auténtico (Reed, 2013)
  - Implicaciones en las 4P: producto (nuevas oportunidades), precio (transparencia, precios dinámicos), distribución (Lastminute.com), comunicación (cupones, fases decisión)
  - Distribución online: alcance, riqueza, afiliación
  - Tabla comparativa comercio tradicional vs. electrónico (Chang, Hsu, Yang 2018; Laudon y Guercio 2018)
- **7-3** Comercio electrónico — PDF páginas 185–193
  - Definición (Laudon y Guercio, 2018): compra y venta de productos a través de Internet usando medios electrónicos como forma de pago
  - Características: ubicuidad, alcance global, estándares universales, riqueza, densidad de información, personalización, tecnología social
  - Canal: mayoristas electrónicos, minoristas electrónicos, ciberintermediarios (infomediarios)
  - Desintermediación vs. reintermediación (PayPal, TripAdvisor)
  - Modelos: B2C, B2B, C2C, G2B, B2G, C2G, G2G (tabla 3 PDF)
  - Ventas globales: 695.000M $ en 2013 → 1.400.000M $ en 2016
  - Satisfacción e-commerce (García, Gil, Merino, Somalo, 2010): conocimiento web, navegación fácil, catálogo accesible, proceso intuitivo, entrega en tiempo, atención multicanal, gestión devoluciones
  - M-commerce: movilidad, disponibilidad, comodidad, conectividad instantánea, personalización, localización
- **7-4** Omnicanalidad — PDF páginas 194–198
  - Definición: estrategia de gestión de cliente que aborda el ciclo de vida en la relación con el consumidor y coordina los distintos canales empleados para interactuar con la empresa
  - Multicanalidad (canales independientes que compiten entre sí) vs. Omnicanalidad (integración total)
  - Conflictos más habituales: canibalización canal offline vs. online
  - El centro de la estrategia omnicanal es el cliente
  - Puntos clave Hansen y Sia (2015): incluir a socios en la estrategia, reconocer que requiere un cambio profundo, aprovechar el papel estratégico del responsable digital
  - Diferencias regionales de precios online dentro de una misma cadena
- **7-5** Inbound marketing — PDF páginas 199–202
  - Definición: metodología para convertir desconocidos en clientes y promotores; atraer a clientes potenciales con contenido relevante agregando valor en cada etapa de compra
  - 4 fases: Atraer (tráfico con contenidos, redes, buscadores) → Convertir (leads de ventas, excelencia de servicio) → Concluir (CRM integrado) → Fidelizar (promotores de la marca)
  - 3 elementos (Miller, 2015): Contenido (blogs, vídeos, eBooks) → Motores de búsqueda (SEO, palabras clave) → Medios sociales (Twitter, LinkedIn, Facebook, Instagram)
  - Mide conexiones: empresa-consumidor, ventas-marketing, inversión-ROI
  - Tabla comparativa marketing tradicional vs. inbound (Miller, 2015): producto vs. cliente, push vs. pull, interrumpir vs. consentido, transaccional vs. relacional
  - Referencias: Miller, S.A. (2015). *Inbound Marketing For Dummies*. Wiley.

### Tema 8 — Herramientas de Marketing Digital (páginas 208–243)
Extraer páginas con PyPDF2 range(207, 243) para leer el contenido completo:
- **8-1** Introducción — páginas 208–209
- **8-2** Marketing de contenidos — páginas 209–215
- **8-3** E-mail marketing — páginas 216–223
- **8-4** SEO y SEM — páginas 224–229
- **8-5** Redes sociales — páginas 230–237
- **8-6** Medición y analítica — páginas 238–243

### Tema 9 — El Plan de Marketing (páginas ~248–284)
Extraer páginas con PyPDF2 range(247, 284) para leer el contenido completo:
- **9-1** Introducción y objetivos
- **9-2** El plan de marketing en la planificación estratégica
- **9-3** Análisis y diagnóstico de la situación (DAFO)
- **9-4** Fijación de objetivos
- **9-5** Elección de estrategias de marketing
- **9-6** Definición de planes de acción
- **9-7** Elementos para el éxito del plan

---

## FLUJO DE TRABAJO POR LECCIÓN

1. Extraer PDF con PyPDF2 para las páginas de la lección
2. Localizar línea exacta: `grep -n '"X-Y"' /home/user/marcos/marketing_integral_lms_v3.html`
3. Leer lección actual con `Read` (offset=línea-1, limit=20) para obtener el `old_string` exacto
4. Escribir nueva lección en una sola línea con 6.000+ chars
5. Reemplazar con `Edit` usando el `old_string` exacto leído
6. Verificar longitud:
   ```bash
   python3 -c "
   import re
   with open('/home/user/marcos/marketing_integral_lms_v3.html') as f: c=f.read()
   m=re.findall(r'\"7-2\": \`(.*?)\`', c, re.DOTALL)
   print(len(m[0]) if m else 'NOT FOUND')
   "
   ```
7. Commit cada 2-3 lecciones y push a `origin Marketing-Integral`

---

## GIT

- Archivo: `/home/user/marcos/marketing_integral_lms_v3.html`
- Rama: `Marketing-Integral`
- Push: `git push -u origin Marketing-Integral`
- Commit cada 2-3 lecciones

---

## REGLAS DE CALIDAD

- Longitud mínima: **6.000 chars** por lección
- Incluir siempre: `cbox` (definición exacta del PDF), `ebox` (caso empresa real con datos), `rbox` (referencias reales)
- Mínimo 5 bullets en "Ideas para Recordar"
- El contenido proviene del PDF — no inventar definiciones
- Usar acentos españoles correctos: é, á, ó, ú, ñ, ü
- **NUNCA** saltos de línea reales dentro del template literal
