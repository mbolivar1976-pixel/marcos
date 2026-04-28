# 🎓 Marketing Integral LMS

**Interactive Learning Management System · UNIR Alta Gerencia**

Un LMS interactivo de página única para la asignatura Marketing Integral, construido con HTML + CSS + Vanilla JS + Anthropic API. Combina el contenido real del libro oficial de UNIR con fuentes académicas externas y generación de contenido por IA.

---

## ✨ Características

| Feature | Descripción |
|---------|-------------|
| 📚 9 Temas | Temario completo con lecciones estructuradas |
| 📄 Contenido PDF | Texto real extraído del libro UNIR (Kotler & Armstrong 2018) |
| 🤖 Lecciones IA | Generación automática con contexto del libro vía Anthropic API |
| 🃏 45 Flashcards | 5 por tema, con animación 3D flip |
| 📝 9 Tests | 5 preguntas por tema con feedback inmediato y revisión |
| 📖 Glosario | 38 términos con búsqueda y filtros por tema |
| 🎓 Tutor IA | Chat multi-turn con contexto completo UNIR |
| 🔗 27 Recursos | Fuentes externas por tema (AMA, HBR, HubSpot, Google, McKinsey) |
| 💾 Progreso | Persiste entre sesiones vía localStorage |

## 🚀 Uso rápido

```bash
# Clonar
git clone https://github.com/TU_USUARIO/marketing-integral-lms.git
cd marketing-integral-lms

# Abrir directamente en el navegador
open index.html
```

> **Nota:** Para activar las funciones de IA (lecciones generadas + tutor), necesitas configurar tu API key de Anthropic. Ver sección de configuración.

## ⚙️ Configuración API

Editar `index.html` y agregar el header en las funciones `fetchLesson()` y `sendMsg()`:

```javascript
headers: {
  'Content-Type': 'application/json',
  'x-api-key': 'TU_ANTHROPIC_API_KEY',
  'anthropic-version': '2023-06-01',
  'anthropic-dangerous-direct-browser-access': 'true'
}
```

> ⚠️ Para producción, usar un proxy serverless. Ver `CLAUDE_CODE_PROMPT.md`.

## 📁 Estructura

```
marketing-integral-lms/
├── index.html              ← Aplicación completa (single-file)
├── README.md               ← Este archivo
└── CLAUDE_CODE_PROMPT.md   ← Documentación técnica para agentes IA
```

## 🗺️ Roadmap

- [x] v1.0 — LMS single-file con todos los módulos
- [ ] v1.1 — Refactor modular + localStorage + PWA
- [ ] v1.2 — Backend + autenticación + caché en DB
- [ ] v2.0 — React/Next.js + multi-asignatura + panel admin

## 📚 Fuentes de Contenido

- **Kotler, P. & Armstrong, G. (2018).** *Principles of Marketing* (17ª ed.). Pearson.
- **Esteban-Talaya, Á. & Mondéjar, J. (2017).** *Fundamentos de Marketing*. ESIC.
- **Chaffey, D. & Ellis-Chadwick, F. (2019).** *Digital Marketing* (7ª ed.). Pearson.
- **AMA (2023).** Definition of Marketing. American Marketing Association.
- Material oficial de la asignatura UNIR — Alta Gerencia.

## 📄 Licencia

MIT — Libre para uso educativo.
