# Mejoras al Proceso de Evaluación ICACIT — Paso 01 Planificación

**Proyecto:** CAFE-IA  
**Ámbito:** Proceso documental únicamente (sin mejoras de código)

---

| ID | Área | Problema documental | Prioridad | Mejora propuesta | Beneficio |
|----|------|---------------------|-----------|------------------|-----------|
| MP-01 | Trazabilidad | Tres módulos (`01_FURPS_OWASP`, `02_Ingenieria_Inversa`, `Reporte-Calidad-Software`) con índices independientes | Alta | Crear índice maestro único en `03_ICACIT/03_Evidencias/` que referencie todos los módulos | Evita duplicidad y facilita auditoría ICACIT |
| MP-02 | Evidencias Sonar | Métricas numéricas no exportadas al repositorio | Alta | Incorporar captura dashboard SonarCloud en fase 03 Evidencias | Cierra gap documentado en Reporte-Calidad-Software §4.6 |
| MP-03 | Postman | No existe colección versionada; inventario disperso | Media | Consolidar inventario API en `03_ICACIT/03_Evidencias/` desde `09_Pruebas_Postman.md` | Evidencia API formal para CE-03 |
| MP-04 | Cronograma | Cronogramas en FURPS, II y Reporte sin unificación | Media | Mantener `CRONOGRAMA.md` raíz `03_ICACIT/` como fuente única | Coherencia temporal para CT-04 |
| MP-05 | Checklist | `CHECKLIST_GLOBAL.md` sin fechas ni responsables | Media | Añadir columnas fecha/responsable al ejecutar cada fase | Gestión de proyecto trazable |
| MP-06 | Autovaloración | Plantillas AUTOEVALUACION en 08 y 01 sin criterios de escala | Baja | Definir escala 0–100 % con umbrales en fase 05 Métricas | Autovaloración cuantificable |
| MP-07 | Capturas visuales | Reporte-Calidad indica capturas E-03–E-06 pendientes | Alta | Planificar capturas Railway/Vercel/Sonar en fase 03 | Sustentación oral ICACIT |
| MP-08 | Matrices Excel | Matrices en FURPS/II/Reporte no vinculadas a competencias ICACIT | Media | Usar `Matriz_Trazabilidad.xlsx` como puente competencia ↔ evidencia | Trazabilidad ICACIT directa |
| MP-09 | Nomenclatura | Convenciones de nombres distintas entre módulos | Baja | Estandarizar prefijos `IC-` para hallazgos del módulo ICACIT en fase 02 | Identificación unívoca |
| MP-10 | Informe Final | Contenido distribuido en 13 capítulos Reporte + 8 pasos FURPS | Media | Definir mapa de anexos en `08_Conclusion_General/` hacia informe académico | Entrega final estructurada |

---

*Mejoras exclusivas del proceso documental ICACIT — sin modificación de código.*
