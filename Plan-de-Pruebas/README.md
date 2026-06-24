# Plan de Pruebas — CAFE-IA

**Proyecto:** Café Sostenible AI (CAFE-IA)  
**Repositorio:** [github.com/4dr1-2529/CAFE-IA](https://github.com/4dr1-2529/CAFE-IA)  
**Propósito:** Registro documental del proceso completo de evaluación de calidad, seguridad e ingeniería inversa del sistema.

---

## Objetivo

Esta carpeta centraliza toda la evidencia y el rastro documental del trabajo realizado durante el desarrollo y la evaluación del proyecto **CAFE-IA**, sin modificar el código fuente del sistema. Su finalidad es facilitar la revisión del docente y demostrar de forma ordenada:

- Evaluación **FURPS+** (Funcionalidad, Usabilidad, Fiabilidad, Rendimiento, Soporte)
- Evaluación **OWASP Top 10** (seguridad de aplicaciones web)
- **Ingeniería inversa** del sistema desplegado
- **Evidencias** obtenidas mediante IA
- **Resultados**, **mejoras aplicadas** y **conclusiones** de cada fase

---

## Estructura general

```text
Plan-de-Pruebas/
├── README.md                    ← Este archivo
├── 01_FURPS_OWASP/              ← Evaluación FURPS+ y OWASP (roles de IA)
└── 02_Ingenieria_Inversa/       ← Análisis y reconstrucción del sistema
```

---

## Convención de documentación por actividad

En cada subcarpeta de trabajo (excepto las de conclusión final) se utiliza el mismo esquema:

| Archivo / carpeta | Contenido a registrar |
|-------------------|----------------------|
| `01_Prompt.md` | Prompt o instrucción enviada a la IA para esa actividad |
| `02_Resultado_IA.md` | Respuesta, análisis o informe generado por la IA |
| `03_Mejoras.md` | Acciones correctivas o mejoras derivadas del análisis |
| `04_Conclusiones.md` | Conclusiones parciales de la actividad |
| `Evidencias/` | Capturas, logs, exports, JSON, reportes y archivos de soporte |

Las carpetas `08_Conclusion_General` (FURPS/OWASP) y `13_Conclusion_General` (Ingeniería Inversa) contienen únicamente `Conclusion_Final.md` con la síntesis integral de cada bloque.

---

## Referencia metodológica

Para las actividades de **FURPS+** y **OWASP**, utilizar como guía de prompts y criterios el documento:

> **Guia_FURPS_OWASP.docx**

Ese documento define los roles (Planificador, Auditor, Auditor de Implementación, Auditor Final) y las preguntas que deben formularse en cada fase.

---

## Relación con el proyecto CAFE-IA

El sistema evaluado es un monorepo full-stack:

| Componente | Ubicación en el repositorio |
|------------|----------------------------|
| Backend API | `cafe-cursor/backend/` — Node.js, Express, MySQL, arquitectura hexagonal |
| Frontend SPA | `cafe-cursor/frontend/` — React 18, Vite, Tailwind |
| Base de datos | `cafe-cursor/backend/sql/` — 39 tablas MySQL |
| Pruebas | `cafe-cursor/backend/tests/`, `cafe-cursor/testing/cypress/` |
| Reporte previo | `cafe-cursor/Reporte-Calidad-Software/` |

Este plan de pruebas **no sustituye** el reporte existente; lo complementa con el registro detallado por actividad, prompt y evidencia.

---

## Cómo usar este plan durante la evaluación

1. **Seleccionar** la subcarpeta correspondiente a la actividad en curso.
2. **Registrar** en `01_Prompt.md` el prompt exacto utilizado (basado en `Guia_FURPS_OWASP.docx` cuando aplique).
3. **Pegar o resumir** en `02_Resultado_IA.md` la salida de la IA.
4. **Documentar** en `03_Mejoras.md` las mejoras implementadas o propuestas en el proyecto.
5. **Redactar** en `04_Conclusiones.md` las conclusiones de esa actividad.
6. **Guardar** capturas, logs y archivos de soporte en `Evidencias/`.
7. Al cerrar cada bloque mayor, completar el `Conclusion_Final.md` de la carpeta de conclusión correspondiente.

---

## Secciones

| Sección | Descripción |
|---------|-------------|
| [01_FURPS_OWASP/](01_FURPS_OWASP/README.md) | Evaluación de calidad (FURPS+) y seguridad (OWASP Top 10) mediante roles de IA |
| [02_Ingenieria_Inversa/](02_Ingenieria_Inversa/README.md) | Análisis, descubrimiento y reconstrucción del sistema CAFE-IA |

---

*Estructura preparada para llenado progresivo. Los archivos de trabajo se encuentran vacíos a la espera del contenido de cada fase.*
