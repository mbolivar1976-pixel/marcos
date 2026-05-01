# marcos — instrucciones para Claude Code

## Regla crítica: evitar Stream idle timeout

**NUNCA escribas más de una lección completa en una sola respuesta.**

El error `API Error: Stream idle timeout - partial response received` ocurre cuando
la respuesta generada es demasiado larga. Para evitarlo:

1. **Escribe cada lección por separado**, en pasos distintos:
   - Paso 1: escribe lección 1, actualiza TOPICS → commit
   - Paso 2: escribe lección 2, actualiza TOPICS → commit
   - Paso 3: escribe lección 3, actualiza TOPICS → commit
   - Paso 4: escribe lección 4, actualiza TOPICS → commit

2. **Nunca escribas las 4 lecciones en una sola llamada a herramienta Write/Edit.**

3. **Usa el script `write_lesson.py`** para agregar lecciones de forma incremental.

## Estructura del proyecto

```
marcos/
├── IC_Control_de_gestion_y_presupuestario.pdf   # fuente
├── topics.py          # TOPICS array (verdad única)
├── lessons/           # una lección por archivo
│   └── tema_N_leccion_M.py
└── write_lesson.py    # script incremental
```
