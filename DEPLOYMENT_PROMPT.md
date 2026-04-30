# DEPLOYMENT PROMPT — Documento Vivo
> **Leer este archivo al inicio de cada sesión. Actualizarlo antes de cada push.**
> Rol activo: Desarrollador Web Expert + Diseñador Gráfico Senior + Coach de Marketing Digital

---

## IDENTIDAD DEL PROYECTO

| Campo | Valor |
|---|---|
| Proyecto | marcos |
| Repo | mbolivar1976-pixel/marcos |
| Branch de desarrollo | `claude/deployment-prompt-template-aQpA2` |
| Branch de producción | `master` |
| Fecha de inicio | 2026-04-30 |
| Última actualización | 2026-04-30 |
| Versión del prompt | v1.0 |

---

## PROTOCOLO DE DEPLOYMENT

Antes de cada deployment, ejecutar en orden:

```
1. Leer este archivo (DEPLOYMENT_PROMPT.md)
2. Identificar el tópico activo en la sección TÓPICO ACTUAL
3. Desarrollar / implementar el tópico
4. Hacer commit con mensaje descriptivo
5. Hacer git push -u origin <branch>
6. Actualizar REGISTRO DE TÓPICOS (marcar como ✅ DEPLOYED)
7. Documentar hallazgos en la sección NOTAS DE DEPLOYMENT
8. Definir el PRÓXIMO TÓPICO
9. Hacer commit final de este archivo actualizado
```

---

## TÓPICO ACTUAL

```
ID:         T-001
Nombre:     Estructura base del proyecto y prompt de deployment
Estado:     ✅ DEPLOYED
Fecha:      2026-04-30
Branch:     claude/deployment-prompt-template-aQpA2
Commit:     [pendiente de registrar]
```

**Descripción del tópico:**
Creación del documento vivo `DEPLOYMENT_PROMPT.md` que establece el flujo de trabajo
para todo el proyecto. Define roles, protocolo de deployment y registro de tópicos.

**Entregables:**
- [x] `DEPLOYMENT_PROMPT.md` creado y versionado

---

## REGISTRO DE TÓPICOS

| ID | Nombre | Área | Estado | Fecha deploy | Commit |
|---|---|---|---|---|---|
| T-001 | Estructura base y prompt de deployment | Arquitectura | ✅ DEPLOYED | 2026-04-30 | — |
| T-002 | _(próximo tópico — ver sección BACKLOG)_ | — | 🔜 PENDING | — | — |

---

## BACKLOG DE TÓPICOS

Ordenados por prioridad. Mover a TÓPICO ACTUAL cuando corresponda.

### ÁREA: Desarrollo Web
- [ ] **T-002** — Configuración del stack tecnológico (framework, bundler, CSS)
- [ ] **T-003** — Arquitectura de carpetas y convenciones de código
- [ ] **T-004** — Sistema de componentes UI base (header, footer, hero)
- [ ] **T-005** — Configuración de rutas y navegación
- [ ] **T-006** — Integración de fuentes y sistema tipográfico
- [ ] **T-007** — Formulario de contacto con validación
- [ ] **T-008** — Optimización de performance (lazy load, minificación)
- [ ] **T-009** — SEO técnico (meta tags, sitemap, robots.txt)
- [ ] **T-010** — Deploy a producción (CI/CD pipeline)

### ÁREA: Diseño Gráfico
- [ ] **T-011** — Definición de identidad visual (paleta, tipografías, logo)
- [ ] **T-012** — Sistema de tokens de diseño (CSS variables / design tokens)
- [ ] **T-013** — Guía de estilos (Style Guide / Design System)
- [ ] **T-014** — Wireframes de páginas principales
- [ ] **T-015** — Diseño responsive (mobile-first breakpoints)
- [ ] **T-016** — Iconografía y sistema de imágenes
- [ ] **T-017** — Animaciones y micro-interacciones

### ÁREA: Marketing Digital
- [ ] **T-018** — Estrategia de contenido y buyer persona
- [ ] **T-019** — Copywriting de páginas clave (home, about, servicios)
- [ ] **T-020** — Integración de Google Analytics / Tag Manager
- [ ] **T-021** — Configuración de conversiones y eventos de tracking
- [ ] **T-022** — Landing page de captación (lead magnet)
- [ ] **T-023** — Integración con email marketing (Mailchimp / Brevo)
- [ ] **T-024** — Estrategia de redes sociales y Open Graph tags

---

## NOTAS DE DEPLOYMENT

### Deploy T-001 — 2026-04-30
- Repositorio inicializado con un PDF de control de gestión (`IC_Control_de_gestion_y_presupuestario.pdf`)
- Branch de trabajo: `claude/deployment-prompt-template-aQpA2`
- Se crea `DEPLOYMENT_PROMPT.md` como documento vivo para gobernar el flujo de trabajo
- El prompt cubre los tres roles activos: dev web, diseño gráfico, marketing digital
- Próximo tópico a trabajar: **T-002** — Stack tecnológico

---

## ESTÁNDARES Y REGLAS DEL PROYECTO

### Desarrollo Web
- Mobile-first, HTML semántico, CSS accesible (WCAG 2.1 AA)
- Sin dependencias innecesarias; preferir vanilla o frameworks livianos
- Performance budget: LCP < 2.5s, CLS < 0.1, FID < 100ms
- Commits en inglés, descriptivos, en tiempo presente ("add hero section")

### Diseño Gráfico
- Diseño basado en grilla de 8px
- Contraste mínimo de texto: 4.5:1 (AA)
- Assets exportados en SVG (íconos) y WebP (fotografías)
- Tipografías: máximo 2 familias por proyecto

### Marketing Digital
- Cada página tiene un único CTA primario
- Copy orientado a beneficios, no características
- A/B testing antes de cualquier cambio de copy en producción
- Siempre medir: tasa de conversión, bounce rate, tiempo en página

---

## GLOSARIO

| Término | Significado |
|---|---|
| Tópico | Unidad de trabajo atómica y deployable |
| Deploy | Push a branch de desarrollo con entregable funcional |
| Documento vivo | Archivo que se actualiza con cada ciclo de trabajo |
| CTA | Call To Action — acción principal que el usuario debe tomar |
| Design Token | Variable de diseño que conecta diseño con código |

---

*Versión del prompt: v1.0 — Actualizar el número de versión con cada modificación estructural.*
