# Mejoras — Consolidación de Evidencias ICACIT

**Actividad:** Paso 3 — Evidencias  
**Ámbito:** Gestión documental (sin modificación de código)

---

## Evidencias faltantes

| ID | Evidencia | Prioridad | Beneficio esperado |
|----|-----------|-----------|-------------------|
| EF-01 | Capturas UI E-01 a E-24 (24 módulos) | **Alta** | Sustentación visual ICACIT; cierra 0 % categoría B del Reporte |
| EF-02 | Export SonarCloud dashboard (PDF/HTML) | **Alta** | Métricas live bugs/smells/coverage |
| EF-03 | Colección Postman exportada | Media | Evidencia API formal CE-03 |
| EF-04 | Reporte OWASP ZAP (DAST) | Media | Complemento seguridad dinámica |
| EF-05 | Política backups MySQL Railway | Media | Continuidad operativa documentada |
| EF-06 | Reporte lcov/c8 cobertura | Media | Cierra gap Sonar 0 % |

## Evidencias incompletas

| ID | Evidencia | Gap | Prioridad | Beneficio |
|----|-----------|-----|-----------|-----------|
| EI-01 | `09_Pruebas_Postman.md` | Inventario sin colección JSON | Media | API trazable en Newman |
| EI-02 | SonarCloud config | Sin export numérico dashboard | Alta | Quality Gate verificable |
| EI-03 | Cypress en CI | Resultados locales mayo 2026 | Alta | Evitar drift código-pruebas |

## Evidencias duplicadas

| ID | Artefacto | Ubicaciones | Prioridad | Beneficio |
|----|-----------|-------------|-----------|-----------|
| ED-01 | `arquitectura-solucion-cafe-ia.mmd` | ~10 copias | Baja | Índice único → `docs/` |
| ED-02 | `cypress_last-run.json` | 15+ copias | Media | Fuente canónica `Reporte-Calidad/Evidencias/cypress/` |
| ED-03 | `npm_audit_backend.txt` | 10+ copias | Baja | Fuente canónica FURPS/07 |
| ED-04 | `der-relaciones-completas.mmd` | 4 copias | Baja | Referencia única en inventario |

## Evidencias desactualizadas

| ID | Evidencia | Fecha actual | Prioridad | Acción |
|----|-----------|--------------|-----------|--------|
| EA-01 | Cypress last-run.json | 2026-05-28 | Media | Re-ejecutar y actualizar referencia |
| EA-02 | JMeter resultado | 2026-05-28 | Baja | Documentar fecha en inventario |
| EA-03 | Reporte-Calidad base | 2026-06-18 | Baja | Referenciar cierres FURPS/II posteriores |

---

*Mejoras evidencias — Paso 03 ICACIT — CAFE-IA.*
