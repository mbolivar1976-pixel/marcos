# 🎓 Marketing Integral LMS — Prompt para Claude Code
## Contexto completo · Continuación · GitHub · Escalamiento futuro

---

## ¿QUÉ ES ESTE PROYECTO?

Un **LMS (Learning Management System) interactivo** de una sola página HTML para la asignatura **Marketing Integral** de la Especialidad en Alta Gerencia de UNIR (Universidad Internacional de La Rioja).

Fue construido como un único archivo `marketing-lms.html` (~120KB, ~970 líneas) que combina:
- Contenido extraído del **PDF oficial del curso** (libro UNIR, ~285 páginas)
- **Fuentes externas académicas** (AMA, HBR, HubSpot, McKinsey, MOZ, ESOMAR)
- **IA generativa** (API de Anthropic) para lecciones y tutor

---

## STACK TÉCNICO

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML5 + CSS3 (variables custom, grid, flexbox) + Vanilla JS (ES2020+) |
| Fuentes | Google Fonts: Playfair Display, DM Sans |
| IA | Anthropic API `/v1/messages` · modelo `claude-sonnet-4-20250514` |
| Almacenamiento | `window.storage` (API propia del entorno Claude.ai Artifacts) |
| Deploy | Single-file HTML · sin bundler · sin dependencias npm |

**Importante:** `window.storage` es una API específica del entorno Claude.ai Artifacts.  
Para despliegue externo (GitHub Pages, Vercel, etc.) hay que reemplazarla por `localStorage` o una solución backend.

---

## ARQUITECTURA DEL ARCHIVO ÚNICO

```
marketing-lms.html
├── <head>
│   ├── Google Fonts (Playfair Display, DM Sans)
│   └── <style> — ~400 líneas CSS (design system completo)
├── <body>
│   ├── #app
│   │   ├── .sb (sidebar fijo 275px)
│   │   │   ├── Logo + badge UNIR
│   │   │   ├── Barra de progreso global
│   │   │   └── Navegación: dash + 9 temas + flash + glosario + tutor
│   │   └── .main (área de contenido scrollable)
│   │       ├── .topbar (breadcrumbs + botones rápidos)
│   │       └── 7 vistas (.view)
│   │           ├── #v-dash       → Dashboard con grid 3x3 de temas
│   │           ├── #v-topic      → Vista de tema: lecciones + sidebar recursos
│   │           ├── #v-lesson     → Lección individual (PDF o IA)
│   │           ├── #v-quiz       → Test de 5 preguntas por tema
│   │           ├── #v-flash      → 45 flashcards con flip 3D
│   │           ├── #v-glosario   → 38 términos con búsqueda y filtros
│   │           └── #v-tutor      → Chat IA con contexto UNIR
│   └── .toast (notificaciones)
└── <script> — ~550 líneas JS
    ├── DATA: TOPICS[]         → 9 temas con lecciones y quizzes
    ├── DATA: PDF_INTROS{}     → 9 textos reales del PDF (intro de cada tema)
    ├── DATA: PDF_CTX{}        → Contexto comprimido del PDF para prompts IA
    ├── DATA: RESOURCES{}      → 27 enlaces externos (3 por tema)
    ├── DATA: FC{}             → 45 flashcards (5 por tema)
    ├── DATA: GLOS[]           → 38 términos del glosario
    ├── STATE: S{}             → Estado global de la app (vista, progreso, caché)
    ├── STORAGE               → saveProg/loadProg/saveCache/loadCache
    ├── NAV                   → nav() + bc() (breadcrumbs)
    ├── SIDEBAR               → renderSb() + updateProg()
    ├── DASHBOARD             → renderDash()
    ├── TOPIC                 → renderTopic()
    ├── LESSON                → renderLesson() + fetchLesson() [API call]
    ├── QUIZ                  → startQuiz() + renderQ() + renderRes()
    ├── FLASHCARDS            → renderFlash() + showCard() + flipCard()
    ├── GLOSARIO              → renderGlosario() + filterGlos()
    ├── TUTOR IA              → sendMsg() [API call] + appendMsg()
    └── INIT                  → init() → loadProg() + loadCache() + renderDash()
```

---

## DESIGN SYSTEM (CSS Variables)

```css
--bg: #050811          /* fondo principal */
--surface: #09102a     /* sidebar */
--card: #0d1530        /* tarjetas */
--card-h: #121c3c      /* tarjetas hover */
--border: #192244      /* bordes */
--border-l: #1f2f55    /* bordes iluminados */
--gold: #e6b84a        /* color primario / acento */
--teal: #22c4b4        /* color secundario / tutor */
--violet: #9d7ef8      /* color terciario / flashcards */
--coral: #e85d5d       /* error / incorrecto */
--ok: #4dba74          /* éxito / correcto */
--text: #dce4f8        /* texto principal */
--text-2: #7e92bc      /* texto secundario */
--text-m: #2e4070      /* texto muted */
```

Paleta **dark academic luxury** — colores por tema para las 9 tarjetas del grid.

---

## DATOS EMBEBIDOS (estructura)

### TOPICS[] — Array de 9 objetos
```javascript
{
  id: 1,
  title: "Fundamentos del Marketing",
  sub: "Tema 1",
  icon: "🎯",
  col: "#e6b84a",          // color de la tarjeta en el grid
  desc: "Descripción corta...",
  book: "Kotler & Armstrong (2018) — Cap.1",
  lessons: [
    { id: "1-1", t: "Introducción y Objetivos", pdf: true },
    { id: "1-2", t: "El Marketing y la Creación de Valor" },
    // ... 3-7 lecciones por tema
  ],
  quiz: [
    { q: "Pregunta...", o: ["A","B","C","D"], c: 1, e: "Explicación..." },
    // ... 5 preguntas por tema
  ]
}
```

### PDF_INTROS{} — Claves `"1-1"` a `"9-1"`
HTML real extraído del libro UNIR para las lecciones `-1` de cada tema.  
Estructura fija: `<div class="l-body">` con secciones `h2`, `cbox`, `ebox`, `rbox`.

### PDF_CTX{} — Claves `1` a `9`
Texto comprimido (~100-200 chars) con conceptos clave del libro por tema.  
Se inyecta en el `system prompt` de cada llamada a la API para contextualizar la generación.

### FC{} — Claves `1` a `9`
Arrays de 5 flashcards `{q: "Pregunta", a: "Respuesta HTML"}`.

### GLOS[] — 38 objetos
```javascript
{ t: "Término", d: "Definición", s: "Fuente", c: "T1", col: "#e6b84a" }
```

---

## FLUJO DE GENERACIÓN IA (LECCIONES)

```
Usuario abre lección (no-PDF, no-cache)
    ↓
renderLesson(lid) → muestra spinner
    ↓
fetchLesson(topic, lesson)
    ↓
Construye prompt con:
  - Contexto del libro (PDF_CTX[topic.id])
  - Tema, subtema, fuente bibliográfica
  - Instrucciones HTML de estructura fija
    ↓
POST /v1/messages → claude-sonnet-4-20250514
    ↓
Respuesta HTML → S.cache[lid] → saveCache()
    ↓
body.innerHTML = html generado
```

**Estructura de salida esperada de la IA:**
```html
<div class="l-body">
  <h2>📌 Título</h2>
  <p>Introducción...</p>
  <div class="cbox"><div class="cbox-lbl">Definición</div><p>...</p></div>
  <h2>🎯 Desarrollo</h2>
  <h3>Aspecto 1</h3><p>...</p><ul>...</ul>
  <h3>Aspecto 2</h3><p>...</p>
  <div class="ebox"><div class="ebox-lbl">Ejemplo empresa</div><p>...</p></div>
  <h2>💡 Ideas Clave</h2>
  <ul><li><strong>K1</strong>: ...</li>...</ul>
  <div class="rbox"><div class="rbox-lbl">📚 Referencia</div><p>...</p></div>
</div>
```

---

## FLUJO TUTOR IA

```
Usuario escribe mensaje
    ↓
sendMsg() → S.tmsgs.push({r:'user', c:txt})
    ↓
POST /v1/messages con:
  - system: contexto 9 temas UNIR (texto completo)
  - messages: historial completo S.tmsgs (multi-turn)
    ↓
Respuesta → fmtM() (convierte **bold** → <strong>)
    ↓
appendMsg('ai', html)
```

---

## GESTIÓN DE ESTADO

```javascript
S = {
  view: 'dash',        // vista activa
  tid: null,           // tema activo
  lid: null,           // lección activa
  prog: {},            // { "1": { done: ["1-1","1-2"], qs: 80 }, ... }
  cache: {},           // { "1-2": "<div class='l-body'>...</div>", ... }
  tmsgs: [...],        // historial tutor [{r:'ai',c:'...'}, ...]
  tloading: false,     // estado loading tutor
  fcTopic: 1,          // tema activo flashcards
  fcIdx: 0,            // índice flashcard actual
  fcFlipped: false     // estado de la tarjeta
}
```

`prog` y `cache` se persisten via `window.storage` (claves `mi_prog3`, `mi_cache3`).

---

## PARA DESPLIEGUE EN GITHUB PAGES

### Paso 1 — Preparar el repositorio

```bash
git init marketing-integral-lms
cd marketing-integral-lms
mkdir -p src assets docs
cp marketing-lms.html index.html
```

### Paso 2 — Reemplazar `window.storage` por `localStorage`

Buscar y reemplazar en el archivo:

```javascript
// ANTES (window.storage — solo funciona en Claude.ai)
async function saveProg() {
  try { await window.storage.set('mi_prog3', JSON.stringify(S.prog)) } catch(e) {}
}
async function loadProg() {
  try { const r = await window.storage.get('mi_prog3'); if(r&&r.value) S.prog=JSON.parse(r.value) } catch(e) {}
}

// DESPUÉS (localStorage — funciona en cualquier navegador)
function saveProg() {
  try { localStorage.setItem('mi_prog3', JSON.stringify(S.prog)) } catch(e) {}
}
function loadProg() {
  try { const d = localStorage.getItem('mi_prog3'); if(d) S.prog = JSON.parse(d) } catch(e) {}
}
// Hacer lo mismo para saveCache/loadCache
// Quitar todos los `async/await` de estas funciones
// Actualizar las llamadas en init()
```

### Paso 3 — API Key (proxy recomendado para producción)

⚠️ **Nunca exponer la API Key en el frontend en producción.**

**Opción A — Para desarrollo/demo** (API key hardcodeada, solo pruebas):
```javascript
// En fetchLesson() y sendMsg(), agregar header:
headers: {
  'Content-Type': 'application/json',
  'x-api-key': 'TU_API_KEY_AQUI',
  'anthropic-version': '2023-06-01',
  'anthropic-dangerous-direct-browser-access': 'true'
}
```

**Opción B — Para producción** (recomendado):
```
Frontend → POST /api/chat → Proxy (Netlify/Vercel Function) → Anthropic API
```

Crear `/api/chat.js` (Vercel serverless):
```javascript
export default async function handler(req, res) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify(req.body)
  });
  const data = await response.json();
  res.json(data);
}
```

### Paso 4 — Estructura del repositorio

```
marketing-integral-lms/
├── index.html              ← archivo principal (el LMS completo)
├── README.md               ← documentación del proyecto
├── CLAUDE_CODE_PROMPT.md   ← este archivo
├── .gitignore
├── package.json            ← opcional, si se agrega build pipeline
├── vercel.json             ← si se usa Vercel para el proxy
├── api/
│   └── chat.js             ← proxy serverless para Anthropic API
└── assets/
    └── favicon.ico
```

### Paso 5 — Comandos Git

```bash
git add .
git commit -m "feat: initial commit — Marketing Integral LMS v1.0"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/marketing-integral-lms.git
git push -u origin main
```

### Paso 6 — Activar GitHub Pages

En el repositorio → Settings → Pages → Source: `main` / `/(root)`  
URL resultante: `https://TU_USUARIO.github.io/marketing-integral-lms/`

---

## ROADMAP DE ESCALAMIENTO FUTURO

### 🔴 Prioridad Alta — v1.1 (1-2 semanas)
```
[ ] Separar en múltiples archivos (refactor modular)
    ├── index.html
    ├── css/styles.css
    ├── js/app.js
    ├── js/data.js
    └── js/api.js

[ ] Reemplazar window.storage → localStorage (ver arriba)

[ ] Añadir proxy serverless para la API key

[ ] README.md completo con capturas de pantalla

[ ] Progressive Web App (PWA)
    ├── manifest.json
    └── service-worker.js (cache offline de lecciones generadas)
```

### 🟡 Prioridad Media — v1.2 (1 mes)
```
[ ] Backend ligero (Node.js/Express o FastAPI)
    ├── GET  /api/progress/:userId     → leer progreso
    ├── POST /api/progress/:userId     → guardar progreso
    ├── POST /api/lesson/generate      → proxy IA + caché en DB
    └── POST /api/tutor/chat           → proxy tutor IA

[ ] Autenticación básica (Auth0 / Supabase)
    → Progreso sincronizado entre dispositivos

[ ] Base de datos (Supabase / PlanetScale)
    → Tabla lessons_cache (lid, content, created_at)
    → Tabla user_progress (user_id, topic_id, lessons_done, quiz_score)

[ ] Añadir nuevos temas/materias
    → Refactorizar TOPICS[] en JSON externo
    → Añadir soporte multi-asignatura
```

### 🟢 Prioridad Baja — v2.0 (3-6 meses)
```
[ ] Migrar a React/Next.js
    ├── Componentes reutilizables
    ├── Server-side generation de lecciones
    └── API Routes para proxy seguro

[ ] Panel de administración
    ├── Cargar nuevos PDFs de materias
    ├── Editar contenido de temas/lecciones
    └── Ver estadísticas de uso

[ ] Sistema multi-tenant
    ├── Varios cursos/asignaturas
    ├── Múltiples universidades/instituciones
    └── Roles: admin / profesor / alumno

[ ] Modo Exam
    ├── Examen simulado con tiempo límite
    ├── Aleatorización de preguntas
    └── Historial de intentos con análisis

[ ] Generación de PDF de apuntes
    ├── "Exportar resumen del tema" → PDF
    └── Basado en contenido generado por IA

[ ] Analytics de aprendizaje
    ├── Tiempo por lección
    ├── Temas con más revisitas
    └── Predicción de áreas débiles
```

---

## INSTRUCCIONES PARA CLAUDE CODE

Si eres **Claude Code** (o cualquier agente de IA en terminal), sigue estos pasos:

### Para leer y entender el proyecto:
```bash
# 1. Ver la estructura del archivo
wc -l index.html
grep -n "^// ──" index.html     # ver secciones principales del JS
grep -n "^function\|^async function" index.html  # ver todas las funciones

# 2. Extraer datos embebidos
node -e "const fs=require('fs');const html=fs.readFileSync('index.html','utf8');const match=html.match(/const TOPICS=\[([\s\S]+?)\];/);console.log(match?'TOPICS encontrado':'no encontrado')"

# 3. Verificar llamadas a la API
grep -n "anthropic.com" index.html
grep -n "window.storage" index.html
```

### Para hacer el refactor localStorage:
```bash
# Reemplazar window.storage.set por localStorage.setItem
sed -i 's/await window.storage.set(\([^,]*\), \(.*\))/localStorage.setItem(\1, \2)/g' index.html
# (Ajustar manualmente las funciones async → sync)
```

### Para subir a GitHub:
```bash
# Asegurarse de tener git instalado
git --version

# Configurar identidad si es necesario
git config --global user.email "tu@email.com"
git config --global user.name "Tu Nombre"

# Inicializar y subir
git init
git add index.html CLAUDE_CODE_PROMPT.md README.md
git commit -m "feat: Marketing Integral LMS — Single-file interactive learning app"
git remote add origin https://github.com/TU_USUARIO/marketing-integral-lms.git
git push -u origin main
```

### Para agregar un nuevo tema:
1. Abrir `index.html`
2. Encontrar `const TOPICS=[`
3. Copiar el objeto del Tema 9 como plantilla
4. Actualizar: `id`, `title`, `sub`, `icon`, `col`, `desc`, `book`, `lessons[]`, `quiz[]`
5. Agregar entrada en `PDF_INTROS{}` con key `"10-1"`
6. Agregar entrada en `PDF_CTX{}` con key `10`
7. Agregar entrada en `RESOURCES{}` con key `10`
8. Agregar entrada en `FC{}` con key `10`
9. Agregar términos en `GLOS[]` con `c: "T10"`

---

## RESUMEN RÁPIDO (TL;DR para el agente)

```
PROYECTO : Marketing Integral LMS
TIPO     : Single-file HTML app (~970 líneas)
STACK    : HTML + CSS + Vanilla JS + Anthropic API
IA       : claude-sonnet-4-20250514, /v1/messages, max_tokens:1000
DATOS    : 9 temas, 46 lecciones, 45 flashcards, 38 glosario, 27 recursos
STORAGE  : window.storage (Claude.ai) → cambiar a localStorage para deploy
VISTAS   : dash, topic, lesson, quiz, flash, glosario, tutor
DEPLOY   : Subir index.html a GitHub → activar GitHub Pages
ESCALAR  : 1) localStorage 2) proxy API 3) Node backend 4) React+Next.js
```

---

*Generado para el proyecto Marketing Integral LMS — UNIR Alta Gerencia*  
*Versión 1.0 · Anthropic Claude · 2025*
