# Prompt para próxima sesión — Marketing Integral LMS

## ROL
Actúa como **desarrollador web senior + diseñador gráfico senior + coach académico de Marketing Integral**. El objetivo es continuar desarrollando y profundizando el contenido de un LMS universitario de nivel maestría.

---

## PROYECTO

**LMS de Marketing Integral** — asignatura de la Especialidad en Alta Gerencia de UNIR (Universidad Internacional de La Rioja).

- **Archivo principal:** `/home/user/marcos/marketing_integral_lms_v3.html` (~245KB, ~985 líneas)
- **Rama git:** `Marketing-Integral`
- **PDF fuente:** `/home/user/marcos/marketingintegral.pdf` (libro oficial UNIR, ~285 páginas)
- **Spec técnica completa:** `/home/user/marcos/CLAUDE_CODE_PROMPT.md`
- **Regla crítica anti-timeout:** `/home/user/marcos/CLAUDE.md` — **NUNCA escribir más de una lección por llamada a Edit/Write**

---

## STACK

- HTML5 + CSS3 (variables custom) + Vanilla JS (ES2020) — sin framework, sin npm
- Lecciones almacenadas como JS template literals en `const LESSON_CONTENT = { "tema-leccion": \`<div class="l-body">...</div>\` }`
- Design system: dark academic luxury (fondo `#050811`, acento gold `#e6b84a`, teal `#22c4b4`)

---

## ESTRUCTURA DE LECCIÓN (seguir siempre este formato)

```html
<div class="l-body">
  <h2>📌 Concepto Central</h2>
  <p>Introducción académica profunda...</p>
  <div class="cbox"><div class="cbox-lbl">Definición clave</div><p>...</p></div>

  <h2>🎯 Desarrollo del Contenido</h2>
  <h3>Aspecto 1</h3><p>...</p><ul>...</ul>
  <h3>Aspecto 2</h3><p>...</p>
  <div class="ebox"><div class="ebox-lbl">Ejemplo empresa real</div><p>...</p></div>
  <h3>Aspecto 3</h3><p>...</p>

  <h2>💡 Ideas para Recordar</h2>
  <ul><li><strong>Concepto</strong>: explicación...</li>...</ul>

  <div class="rbox"><div class="rbox-lbl">📚 Referencias</div><p>Kotler, P. ... · AMA ... · McKinsey ...</p></div>
</div>
```

**Estándar de calidad:** nivel de maestría, 3000-5000 caracteres por lección, fuentes académicas reales, ejemplos de empresas reales con datos concretos, acentos en español correctos.

---

## ESTADO ACTUAL — LO QUE ESTÁ HECHO

### Tema 1 — Fundamentos del Marketing ✅ COMPLETADO
Todas las 5 lecciones han sido reescritas desde el PDF con profundidad académica:

| ID | Título | Estado |
|----|--------|--------|
| 1-1 | Introducción y Objetivos | ✅ Extenso (AMA 1985→2013, Levitt, miopía, Kotler) |
| 1-2 | El Marketing y la Creación de Valor | ✅ Extenso (intercambio, cocreación, lógica dominante) |
| 1-3 | El Marketing en la Planificación Estratégica | ✅ Extenso (UEN, BCG, Porter, misión) |
| 1-4 | El Proceso de Marketing: El Marketing Mix | ✅ Extenso (5 pasos, CLV, share of customer, customer equity) |
| 1-5 | La Nueva Realidad del Marketing | ✅ Extenso (Tecnología, Globalización, Responsabilidad Social) |

### Temas 2-9 — Contenido existente pero CORTO
Los temas 2-9 tienen lecciones escritas pero son versiones cortas (~300-800 chars). **Necesitan ser reescritas con la misma profundidad académica que el Tema 1.**

| Tema | Título | Lecciones |
|------|--------|-----------|
| 2 | Creación de Valor para el Cliente | 2-1 a 2-5 |
| 3 | Gestión de Relaciones con Clientes | 3-1 a 3-5 |
| 4 | Sistemas de Información en Marketing | 4-1 a 4-5 |
| 5 | Investigación Comercial | 5-1 a 5-5 |
| 6 | Segmentación y Posicionamiento | 6-1 a 6-5 |
| 7 | Marketing Digital | 7-1 a 7-5 |
| 8 | Herramientas de Marketing Digital | 8-1 a 8-6 |
| 9 | El Plan de Marketing | 9-1 a 9-7 |

---

## TAREA PARA ESTA SESIÓN

**Continuar reescribiendo lecciones comenzando por Tema 2, lección 2-1.**

### Proceso para cada lección:
1. `pdftotext -f <página_inicio> -l <página_fin> /home/user/marcos/marketingintegral.pdf -` para extraer el contenido del PDF correspondiente
2. Leer el contenido actual de la lección en el archivo HTML con `grep -n '"tema-leccion"' marketing_integral_lms_v3.html`
3. Reescribir con nivel maestría usando el formato de estructura definido arriba
4. Usar `Edit` para reemplazar el contenido — **UNA SOLA LECCIÓN POR LLAMADA** (regla anti-timeout)
5. Avanzar a la siguiente lección solo después de confirmar que la edición fue exitosa
6. Commit y push al final de cada 2-3 lecciones

### Páginas del PDF por tema (aproximadas):
- Tema 2 (Creación de valor): páginas 28-50
- Tema 3 (Relaciones con clientes): páginas 51-72
- Tema 4 (Sistemas de información): páginas 73-95
- Tema 5 (Investigación comercial): páginas 96-118
- Tema 6 (Segmentación): páginas 119-142
- Tema 7 (Marketing digital): páginas 143-165
- Tema 8 (Herramientas digitales): páginas 166-195
- Tema 9 (Plan de marketing): páginas 196-220

---

## REGLAS OBLIGATORIAS

1. **UNA lección por Edit call** — jamás dos lecciones en la misma llamada (causa stream idle timeout)
2. **Siempre leer el PDF** antes de escribir cada lección — usar `pdftotext`
3. **Siempre usar acentos** en español: é, á, ó, ú, ñ, ü
4. **No añadir comentarios** al código
5. **Commit y push** cada 2-3 lecciones a la rama `Marketing-Integral`
6. El contenido va en el objeto `LESSON_CONTENT` como template literal en una sola línea (no saltos de línea dentro del backtick)

---

## COMANDO PARA VERIFICAR ESTADO

```bash
# Ver todas las lecciones existentes
grep -o '"[0-9]-[0-9]": `' marketing_integral_lms_v3.html | sort

# Ver contenido actual de una lección específica
grep -o '"2-1": `[^`]*`' marketing_integral_lms_v3.html | head -c 500

# Extraer PDF para un rango de páginas
pdftotext -f 28 -l 35 marketingintegral.pdf -
```
