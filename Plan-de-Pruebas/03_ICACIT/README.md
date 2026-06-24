# Módulo ICACIT — CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Ubicación:** `Plan-de-Pruebas/03_ICACIT/`  
**Estado:** Evaluación documental completada — 8 fases ICACIT · Veredicto APTO CON RESERVAS (82 %)

---

## Objetivo del módulo ICACIT

Este módulo consolida la documentación, evidencias y resultados necesarios para la evaluación y acreditación del proyecto CAFE-IA conforme a los estándares de calidad de software exigidos por **ICACIT** (Instituto de Calidad y Acreditación de Programas de Computación, Informática y Sistemas).

Su propósito es integrar de forma trazable los hallazgos de las evaluaciones previas (FURPS+, OWASP e Ingeniería Inversa) en un ciclo documental completo: planificación, ejecución, recolección de evidencias, análisis de resultados, métricas, mejora continua, auditoría final y conclusión general.

---

## Organización

```text
03_ICACIT/
├── 01_Planificacion/       Plan y alcance de la evaluación ICACIT
├── 02_Ejecucion/           Registro de actividades ejecutadas
├── 03_Evidencias/          Consolidación y gestión de evidencias
├── 04_Resultados/          Resultados obtenidos por fase
├── 05_Metricas/            Indicadores y mediciones de calidad
├── 06_Mejora_Continua/     Plan de mejoras y seguimiento
├── 07_Auditoria_Final/     Auditoría integral de cierre
├── 08_Conclusion_General/  Conclusión, autovaloración y dashboard final
├── README.md               Presente documento
├── CRONOGRAMA.md           Cronograma de actividades
├── PLAN_GENERAL.md         Plan maestro de evaluación
├── METODOLOGIA.md          Metodología y marcos de referencia
└── CHECKLIST_GLOBAL.md     Lista de verificación global
```

Cada fase (01–07) contiene:

| Archivo | Propósito |
|---------|-----------|
| `01_Prompt.md` | Instrucciones del prompt a ejecutar |
| `02_Resultado_IA.md` | Resultado generado por la evaluación |
| `03_Mejoras.md` | Mejoras propuestas |
| `04_Conclusiones.md` | Conclusiones de la fase |
| `05_Trazabilidad.md` | Trazabilidad de evidencias y pasos |
| `Evidencias/` | Artefactos de soporte (README, índice, checklist, resumen) |

---

## Cómo ejecutar cada prompt

1. Abrir el archivo `01_Prompt.md` de la fase correspondiente.
2. Copiar el contenido completo del prompt.
3. Ejecutarlo en el entorno de IA (Cursor) sin modificar el código fuente de `cafe-cursor/`.
4. Verificar que los resultados se generen únicamente dentro de la carpeta de la fase activa.
5. Revisar `02_Resultado_IA.md`, `03_Mejoras.md`, `04_Conclusiones.md` y `05_Trazabilidad.md`.
6. Incorporar evidencias en `Evidencias/` según corresponda.
7. Marcar el ítem correspondiente en `CHECKLIST_GLOBAL.md`.

---

## Orden recomendado

| Orden | Fase | Descripción |
|-------|------|-------------|
| 1 | `01_Planificacion` | Definir alcance, criterios y cronograma ICACIT |
| 2 | `02_Ejecucion` | Registrar ejecución de pruebas y actividades |
| 3 | `03_Evidencias` | Consolidar y organizar evidencias |
| 4 | `04_Resultados` | Documentar resultados por área |
| 5 | `05_Metricas` | Calcular indicadores y métricas |
| 6 | `06_Mejora_Continua` | Definir y priorizar mejoras |
| 7 | `07_Auditoria_Final` | Auditoría integral de cierre |
| 8 | `08_Conclusion_General` | Conclusión, autovaloración y dashboard |

---

## Relación con Ingeniería Inversa

El módulo `02_Ingenieria_Inversa/` proporciona el conocimiento reconstruido del sistema: arquitectura, dependencias, dominio, entorno y hallazgos técnicos. El módulo ICACIT utiliza esos resultados como insumo para la evaluación de calidad y la preparación del informe de acreditación.

---

## Relación con FURPS

El módulo `01_FURPS_OWASP/` (fases 01–03) documenta la evaluación de calidad según el modelo **FURPS+** (Functionality, Usability, Reliability, Performance, Supportability). Los indicadores FURPS alimentan las métricas y la autovaloración del módulo ICACIT.

---

## Relación con OWASP

El módulo `01_FURPS_OWASP/` (fases 04–08) documenta la evaluación de seguridad según **OWASP Top 10**. Los hallazgos de seguridad se integran en las evidencias, métricas y conclusiones del módulo ICACIT.

---

## Relación con el Informe Final

El módulo ICACIT es el contenedor documental que consolida todos los entregables para el **Informe Final** del proyecto CAFE-IA. La fase `08_Conclusion_General/` produce los documentos de cierre (`Conclusion_Final.md`, `Dashboard_Final.md`, `Indicadores_Finales.md`, `AUTOEVALUACION.md`) listos para anexarse al informe académico y a la sustentación ante ICACIT.

---

*Módulo ICACIT — evaluación documental completada — 24 de junio de 2026.*
