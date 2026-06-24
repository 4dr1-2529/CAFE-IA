# Matriz de Trazabilidad — Mejora Continua — ICACIT Paso 6 — CAFE-IA

**Actividad:** Paso 6 — Mejora Continua  
**Fecha:** 24 de junio de 2026  
**Cadena:** Problema → Hallazgo → Indicador → Acción Correctiva → Resultado Esperado

---

## Leyenda de fuentes

| Código | Fuente |
|--------|--------|
| II | Ingeniería Inversa (Pasos 01–13) |
| FUR | FURPS+ (Pasos 01–08) |
| OW | OWASP Top 10 API (A01–A10) |
| RC | Reporte Calidad (89.2 %) |
| IC | ICACIT (Pasos 01–05) |
| SQ | SonarQube |
| CY | Cypress |
| JM | JMeter |
| RW | Railway |
| VC | Vercel |

---

## Trazabilidad P1 — Crítico y Alto

| Problema | Hallazgo origen | Indicador afectado | Acción correctiva | Resultado esperado |
|----------|-----------------|-------------------|-------------------|-------------------|
| CON-001 | II/09 SQL; FUR/06 Reliability; OW/A08 | Integridad datos; Calidad 77 % | BEGIN/COMMIT/ROLLBACK en `LoteService.create` | 0 hallazgos críticos; R ≥ 85 % |
| CON-002 | II/08 Seguridad; OW/A05 | Seguridad 76 %; A05 exposición | Sanitizar `/api/health` | Sin metadatos infra en respuesta |
| CON-003 | II/08; OW/A05; RW deploy | Seguridad 76 %; CORS | Whitelist `CORS_ORIGINS` | Cross-origin controlado |
| CON-004 | II/04 RBAC; OW/A01 | A01 70 %; Funcionalidad auth | Middleware permisos o limpieza tablas | RBAC coherente ≥ 85 % |
| CON-005 | OW/A06; npm audit backend | A06 55 %; Seguridad 76 % | `npm audit fix` form-data | 0 CVE HIGH backend |
| CON-006 | CY 13/13; IC/02 CT-04 | Pruebas 75 %; Automatización 72 % | Job Cypress en GitHub Actions | E2E en cada merge |
| CON-007 | RW MySQL; FUR/06 R | Reliability; CE-02 83 % | Política backup/restore Railway | DR documentado y verificado |

---

## Trazabilidad P2 — Medio (seguridad y rendimiento)

| Problema | Hallazgo origen | Indicador afectado | Acción correctiva | Resultado esperado |
|----------|-----------------|-------------------|-------------------|-------------------|
| CON-008 | OW/A06; npm audit frontend | A06 55 % | Actualizar react-router y deps | 0 CVE frontend |
| CON-009 | II/08; OW/A02 | A02 almacenamiento | Cookies httpOnly + SameSite | Mitigación XSS sesión |
| CON-010 | II/04 auth; OW/A07 | A07 72 % | Forzar rol `cliente` en registro | Sin escalación privilegios |
| CON-011 | II/08 JWT; OW/A07 | A07 ciclo sesión | POST `/auth/refresh` | Sesiones renovables |
| CON-012 | IC/02 DevOps; OW/A08 | Automatización 72 % | Quitar `continue-on-error` audit | Gate CVE en CI |
| CON-013 | OW/A07; II/08 | A07 autenticación | Política ≥12 chars + complejidad | Autenticación robusta |
| CON-014 | JM 500/500 health; MM-01 | Performance 70 % | Escenarios JMeter API + JWT | Performance ≥ 75 % |

---

## Trazabilidad P3 — Deuda técnica

| Problema | Hallazgo origen | Indicador afectado | Acción correctiva | Resultado esperado |
|----------|-----------------|-------------------|-------------------|-------------------|
| CON-015 | FUR/04 Performance | Performance 70 %; LCP | Lazy load Recharts | Bundle reducido |
| CON-016 | II/05 API lotes | Funcionalidad 83 % | PUT/DELETE soft-delete lotes | API CRUD completa |
| CON-017 | II/12 ML offline | ML 70 % | Integrar o documentar heurístico | Expectativas IA claras |
| CON-018 | FUR/03 Usability | Usability parcial | axe-core en CI | WCAG verificable |
| CON-019 | SQ cobertura 0 %; MM-04 | Calidad código 75 %; CE-03 74 % | c8 + lcov SonarCloud | Cobertura > 0 % visible |
| CON-020 | IC/02 integración 65 %; MM-03 | Integración CI 65 % | MySQL service en Actions | Tests integración activos |

---

## Trazabilidad P4 — Incremental y documental

| Problema | Hallazgo origen | Indicador afectado | Acción correctiva | Resultado esperado |
|----------|-----------------|-------------------|-------------------|-------------------|
| CON-021 | OW/A07; II/04 | A07 auto-servicio | Flujo forgot-password | Recovery operativo |
| CON-022 | OW/A09; RW logs | A09 monitoreo | Alertas Railway | Detección incidentes |
| CON-023 | II/05 fincas | Funcionalidad 83 % | CRUD fincas API/UI | Trazabilidad geográfica |
| CON-024 | IC/03 EV pendientes; MM-09 | Documentación 88 %; 0 capturas UI | Re-ejecutar CY/SQ; exportar | Evidencias ICACIT actuales |

---

## Trazabilidad métricas ICACIT (MM)

| Problema | Hallazgo | Indicador | Acción | Resultado |
|----------|----------|-----------|--------|-----------|
| MM-01 | JM solo health | Performance 70 % | Plan JMeter APIs auth | ≥ 75 % |
| MM-02 | OW A06 55 % | Seguridad 76 % | Sprint P1–P2 remediación | ≥ 85 % |
| MM-03 | CI parcial | Integración 65 % | Plan CI completo | ≥ 80 % |
| MM-04 | SQ 0 % | Calidad código 75 % | c8 + lcov | Visibilidad deuda |
| MM-05 | CE-03 74 % | ICACIT parcial | Sonar + CI evidencias | CE-03 ≥ 80 % |
| MM-06 | Sonar sin dashboard | Código 75 % | Export Sonar | ≥ 80 % |
| MM-07 | 11 caps parciales | Funcional 81 % | Matriz capacidades | Trazabilidad |
| MM-08 | CI incompleto | Automatización 72 % | Checklist CI | ≥ 80 % |
| MM-09 | 0 capturas UI | Docs 88 % | E-01–E-24 | Sustentación visual |
| MM-10 | Global 82 % | Meta 85 % | Cerrar P1 + evidencias | ICACIT ≥ 85 % |

---

## Diagrama de flujo consolidado

```
Hallazgos evaluación (II, FURPS, OWASP, RC, IC)
        │
        ▼
CON-001..024 (24 problemas clasificados)
        │
        ├──► Indicadores ICACIT/05 (32 indicadores)
        │         │
        │         ▼
        │    MM-01..10 (recomendaciones métricas)
        │
        ▼
Acciones P1–P4 (34 acciones totales)
        │
        ▼
Sprints PDCA (Plan → Do → Check → Act)
        │
        ▼
Resultados esperados:
  • Calidad ≥ 85 %
  • OWASP ≥ 85 %
  • ICACIT ≥ 85 %
  • 0 hallazgos C/A
  • Madurez Nivel 4
```

---

## Cobertura de trazabilidad

| Elemento | Cantidad | Cobertura |
|----------|----------|-----------|
| Problemas CON | 24/24 | 100 % |
| Acciones derivadas | 24/24 | 100 % |
| Indicadores MM vinculados | 10/10 | 100 % |
| Sprints PDCA | 4/4 | 100 % |

---

*Matriz de trazabilidad — ICACIT Paso 6 — CAFE-IA — lista para anexo al informe final.*
