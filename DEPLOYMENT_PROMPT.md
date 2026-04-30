# DEPLOYMENT PROMPT — Marketing Integral LMS
> **LEER COMPLETO al inicio de cada sesión. Actualizar antes de cada push.**
> Roles activos: Desarrollador Web Expert · Diseñador Gráfico Senior · Coach de Marketing Digital

---

## IDENTIDAD DEL PROYECTO

| Campo | Valor |
|---|---|
| Proyecto | Marketing Integral LMS — UNIR |
| Repo GitHub | `mbolivar1976-pixel/marcos` |
| URL producción | https://mbolivar1976-pixel.github.io/marcos/ |
| Branch deploy (GitHub Pages) | `Marketing-Integral` |
| Branch trabajo activo | `claude/update-prompt-next-bot-DWuWA` |
| Archivo principal | `index.html` (~292 KB, single-file LMS) |
| PDF fuente Marketing | `marketingintegral.pdf` (en branch `Marketing-Integral`) |
| PDF fuente Control Gestión | `IC_Control_de_gestion_y_presupuestario.pdf` (en repo local) |
| Issue principal de tracking | Issue #8 — "LMS Development Log: 9 lecciones por tema" |
| Última actualización | 2026-04-30 |
| Versión del prompt | v2.0 |

---

## CÓMO LEER EL ESTADO ACTUAL (primer paso siempre)

```bash
# 1. Verificar branches disponibles
git branch -a

# 2. Obtener el trabajo más reciente
git fetch origin
git checkout claude/update-prompt-next-bot-DWuWA

# 3. Extraer el PDF para el tema a trabajar
git show origin/Marketing-Integral:marketingintegral.pdf > /tmp/marketingintegral.pdf

# 4. Leer páginas del tema activo (Tema 4 = pp. 88-116)
pdftotext -f 88 -l 116 /tmp/marketingintegral.pdf -

# 5. Ver el issue de tracking en GitHub (Issue #8) para el estado exacto
# Usar: mcp__github__issue_read method=get_comments owner=mbolivar1976-pixel repo=marcos issue_number=8
```

---

## ARQUITECTURA DEL SISTEMA

### Stack Técnico
- **Single-file SPA**: todo en `index.html` (HTML + CSS + JS embebidos)
- **Sin frameworks**: vanilla JS, zero dependencias externas (solo Google Fonts)
- **Estado global**: objeto `S{}` con view, tid, lid, prog, cache, tmsgs, fcTopic, fcIdx
- **Persistencia**: `localStorage` — claves `lms_prog_{courseId}`, `mi_cache3`
- **IA integrada**: Anthropic API (`claude-sonnet-4-20250514`) con header `anthropic-dangerous-direct-browser-access: true`

### Estructura Multi-Curso
```javascript
COURSE_DATA.mkt = { meta, content, fc, glos, topics }  // Marketing Integral ✅
COURSE_DATA.cgp = { meta, content, fc, glos, topics }  // Control de Gestión 🔄 skeleton
```

### Clases CSS disponibles
| Clase | Uso |
|---|---|
| `.l-body` | Wrapper de cada lección |
| `.cbox` + `.cbox-lbl` | Caja de definición/concepto |
| `.ebox` | Caja de ejemplo |
| `.rbox` | Caja de recurso/referencia |
| `.src` | Párrafo de fuentes bibliográficas |
| `<table>` | Tablas comparativas (CSS ya definido) |

### Estructura HTML estándar de cada lección
```html
<div class="l-body">
  <h2>📌 Concepto Central</h2>
  <p>Introducción y contexto...</p>
  <div class="cbox"><div class="cbox-lbl">Definición</div><p>...</p></div>

  <h2>🔍 Desarrollo del Tema</h2>
  <p>Cuerpo principal...</p>
  <table><tr><th>...</th></tr><tr><td>...</td></tr></table>

  <div class="ebox"><div class="cbox-lbl">Caso Real</div><p>...</p></div>

  <h2>💡 Ideas para Recordar</h2>
  <ul><li>...</li></ul>

  <p class="src">Fuentes: Kotler & Armstrong (2018) · PDF UNIR pp.XX-XX · [fuente externa]</p>
</div>
```

### Dónde insertar contenido en index.html
- **Lecciones**: en el objeto `LESSON_CONTENT` usando template literals (backticks)
- **Tema X lecciones X-6 a X-9**: insertar ANTES del bloque `"(X+1)-1":` en LESSON_CONTENT
- **Títulos**: actualizar array `lessons[]` dentro de `TOPICS[X-1]` en el array TOPICS

---

## ESTADO ACTUAL DEL CONTENIDO

### Progreso Global
```
[███░░░░░░░] 3/9 temas con 9 lecciones (33%)
```

### Registro por Tema
| Tema | Título | Estado | Commit | Lecciones |
|---|---|---|---|---|
| T1 | Fundamentos del Marketing | ✅ COMPLETO | `d0d626f` | 9/9 |
| T2 | Creación de Valor para el Cliente | ✅ COMPLETO | `76d1a20` | 9/9 |
| T3 | Gestión de Relaciones con Clientes | ✅ COMPLETO | `0d2e5a7` | 9/9 |
| **T4** | **Inteligencia Competitiva en Marketing** | **🔄 EN PROGRESO** | — | **5/9** |
| T5 | Investigación Comercial | ⏳ PENDIENTE | — | 5/9 |
| T6 | Segmentación y Posicionamiento | ⏳ PENDIENTE | — | 5/9 |
| T7 | Marketing Digital | ⏳ PENDIENTE | — | 5/9 |
| T8 | Marketing de Contenidos y Canales | ⏳ PENDIENTE | — | 5/9 |
| T9 | Plan de Marketing | ⏳ PENDIENTE | — | 7/9 |

---

## TÓPICO ACTIVO: TEMA 4 — Inteligencia Competitiva en Marketing

### Estado actual de TOPICS[3] (5 lecciones — ampliar a 9)
```javascript
{id:4, title:"Inteligencia Competitiva en Marketing", sub:"Tema 4", icon:"🧠", col:"#e85d5d",
 lessons:[
   {id:"4-1", t:"Introducción y Objetivos"},
   {id:"4-2", t:"Sistemas de Información en Marketing y Big Data"},
   {id:"4-3", t:"Fuentes de Información en Marketing"},
   {id:"4-4", t:"Nuevas Tecnologías de Información en Marketing"},
   {id:"4-5", t:"Data Warehousing y Data Mining"}
]}
```

### 9 lecciones objetivo para T4
| ID | Título | Páginas PDF | Estado |
|---|---|---|---|
| 4-1 | Introducción: La Inteligencia de Marketing en la Era Digital | §4.1 p.88 | ✅ existe |
| 4-2 | El Sistema de Información de Marketing (SIM) | §4.2 p.89-90 | ✅ existe |
| 4-3 | Big Data: Definición, 5Vs y Aplicaciones en Marketing | §4.2 p.90-94 | ✅ existe |
| 4-4 | Fuentes Internas: Datos Propios y CRM | §4.3 p.95-97 | ✅ existe |
| 4-5 | Fuentes Externas: Datos Secundarios y Research de Mercado | §4.3 p.97-101 | ✅ existe |
| **4-6** | **Nuevas Tecnologías: IoT, AI y Neuromarketing** | §4.4 p.102-104 | **⬅ ESCRIBIR** |
| **4-7** | **Data Warehousing: Repositorios Centralizados para BI** | §4.5 p.105-107 | **⬅ ESCRIBIR** |
| **4-8** | **Data Mining: Algoritmos, Patrones y Decisiones de Marketing** | §4.5 p.108-113 | **⬅ ESCRIBIR** |
| **4-9** | **Ética del Dato, GDPR y el Futuro del Marketing Basado en Datos** | PDF + fuentes ext. | **⬅ ESCRIBIR** |

### Fuentes externas para T4
- Gartner — Magic Quadrant for CRM Analytics
- McKinsey — "The Age of Analytics: Competing in a Data-Driven World" (2016)
- HBR — "Data Scientist: The Sexiest Job of the 21st Century" (Davenport & Patil, 2012)
- IBM Think — "What is Big Data?"
- GDPR.eu — guía oficial protección de datos

---

## PROTOCOLO DE DEPLOYMENT (9 pasos — ejecutar en orden)

```
1. Leer este archivo completo
2. Verificar issue #8 para estado exacto actual
3. Hacer checkout del branch de trabajo activo
4. Extraer PDF con el comando de la sección CÓMO LEER EL ESTADO ACTUAL
5. Desarrollar las lecciones faltantes siguiendo la estructura HTML estándar
6. Actualizar TOPICS[x-1].lessons[] con los 9 títulos
7. Hacer commit: "Tema X completo: 9 lecciones profundas — [Título del Tema]"
8. Push al branch de trabajo
9. Deploy a Marketing-Integral (merge o cherry-pick) para GitHub Pages
10. Actualizar issue #8 con tabla de progreso y próximas instrucciones
11. Actualizar este DEPLOYMENT_PROMPT.md (marcar tema como COMPLETO, definir próximo)
12. Commit y push de este archivo actualizado
```

### Comando de deploy a GitHub Pages
```bash
git checkout Marketing-Integral
git merge claude/[branch-de-trabajo] --no-ff -m "deploy: Tema X completo"
git push origin Marketing-Integral
git checkout claude/[branch-de-trabajo]
```

---

## MAPA DE PÁGINAS PDF POR TEMA

| Tema | Páginas PDF | Estado |
|---|---|---|
| T1 | 4–26 | ✅ Completo |
| T2 | 29–58 | ✅ Completo |
| T3 | 60–87 | ✅ Completo |
| **T4** | **88–116** | **🔄 Activo** |
| T5 | ~117–145 | ⏳ Pendiente |
| T6 | ~146–174 | ⏳ Pendiente |
| T7 | ~175–203 | ⏳ Pendiente |
| T8 | ~204–232 | ⏳ Pendiente |
| T9 | ~233–260 | ⏳ Pendiente |

---

## ESTÁNDARES DE CALIDAD

### Cada lección debe tener
- Mínimo 800 palabras de contenido sustantivo
- Al menos 1 definición en `.cbox`
- Al menos 1 caso real o ejemplo en `.ebox`
- 1 tabla comparativa o resumen
- Sección "💡 Ideas para Recordar" con 4-6 bullets
- Cita de fuentes en `.src` (PDF UNIR + mínimo 1 fuente externa académica)

### Commits
- Formato: `"Tema X completo: 9 lecciones profundas — [Título]"`
- Para lecciones parciales: `"add lecciones X-6 a X-9: [Tema]"`
- Para este prompt: `"update deployment prompt: Tema X completado"`

### Issue #8 — actualizar con cada tema completado
Incluir en el comentario: tabla de lecciones, progreso global `[███░░░░░░░]`, instrucciones para el próximo tema.

---

## HERRAMIENTAS DISPONIBLES

| Herramienta | Uso |
|---|---|
| `pdftotext` | Extraer texto del PDF (poppler-utils instalado) |
| `mcp__github__*` | Leer/escribir issues, branches, archivos en GitHub |
| `WebSearch` / `WebFetch` | Buscar fuentes académicas externas (cargar con ToolSearch primero) |
| `git show origin/Marketing-Integral:marketingintegral.pdf` | Acceder al PDF desde el repo |

---

*Versión del prompt: v2.0 — Actualizar número de versión con cada modificación estructural.*
