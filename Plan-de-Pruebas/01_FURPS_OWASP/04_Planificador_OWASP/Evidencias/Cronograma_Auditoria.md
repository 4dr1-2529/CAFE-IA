# Cronograma de Auditoría OWASP — CAFE-IA

**Proyecto:** CAFE-IA  
**Duración total:** 7 días hábiles  
**Inicio planificado:** Post-aprobación Paso 04  
**Fin planificado:** Entrega informe Paso 05

---

## Vista general

```text
Semana 1
├── D1: Preparación
├── D2-D3: Análisis estático (A02, A03, A06, A08)
├── D4-D5: Pruebas dinámicas (A01, A07, A05)
├── D6: Despliegue y logging (A05, A09, A10)
└── D7: Consolidación e informe
```

---

## Cronograma detallado

| Día | Fase | Actividades | Categorías OWASP | Entregable parcial | Responsable |
|-----|------|-------------|------------------|-------------------|-------------|
| **D1** | Preparación | Inventario evidencias; checklist; acceso entornos; credenciales prueba | — | Checklist iniciado | QA + DevSecOps |
| **D2** | Estático I | Revisión auth, RBAC, env, app.js; matriz rol×endpoint | A01, A02, A05 | Notas A01/A02 | Ciberseguridad |
| **D3** | Estático II | Repos SQL, validators, Sonar, npm audit | A03, A06, A08 | Informe estático | DevSecOps |
| **D4** | Dinámico I | Cypress login/rutas; Postman 401/403; IDOR | A01, A07 | Log pruebas API | QA |
| **D5** | Dinámico II | CORS, headers, rate-limit; health endpoint | A05 | Capturas headers | DevSecOps |
| **D6** | Despliegue | Railway/Vercel config; auditMiddleware; grep SSRF | A05, A09, A10 | Evidencia prod | Arquitecto |
| **D7** | Cierre | Hallazgos OW-xxx; dashboard; matriz final; informe | A01–A10 | Informe Paso 05 | ICACIT |

---

## Cronograma por categoría OWASP

| Categoría | D1 | D2 | D3 | D4 | D5 | D6 | D7 |
|-----------|----|----|----|----|----|----|-----|
| A01 | ○ | ● | ○ | ● | ○ | ○ | ● |
| A02 | ○ | ● | ○ | ○ | ○ | ○ | ● |
| A03 | ○ | ○ | ● | ○ | ○ | ○ | ● |
| A04 | ● | ● | ○ | ○ | ○ | ○ | ● |
| A05 | ○ | ● | ○ | ○ | ● | ● | ● |
| A06 | ○ | ○ | ● | ○ | ○ | ○ | ● |
| A07 | ○ | ○ | ○ | ● | ○ | ○ | ● |
| A08 | ○ | ○ | ● | ○ | ○ | ○ | ● |
| A09 | ○ | ○ | ○ | ○ | ○ | ● | ● |
| A10 | ○ | ○ | ○ | ○ | ○ | ● | ● |

**Leyenda:** ● = actividad principal | ○ = sin actividad dedicada

---

## Hitos

| Hito | Fecha relativa | Criterio |
|------|----------------|----------|
| H1 — Kick-off | D1 | Checklist y evidencias validadas |
| H2 — Estático completo | D3 | Matriz con evidencias estáticas |
| H3 — Dinámico completo | D5 | ≥ 90 % rutas API probadas |
| H4 — Prod revisado | D6 | Health y headers documentados |
| H5 — Informe Paso 05 | D7 | Dashboard actualizado |

---

## Dependencias

| Dependencia | Impacto si no disponible |
|-------------|--------------------------|
| Acceso repo `cafe-cursor/` | Bloqueante — usar copia local |
| npm audit / tests ejecutados | Mitigación — usar evidencias existentes en `Evidencias/` |
| Entorno Railway activo | Mitigación — `railway_health_response.json` archivado |
| SonarCloud export | No bloqueante — usar `CORRECCIONES_SONARQUBE.md` |
| OWASP ZAP | No bloqueante — evidencia pendiente |

---

## Recursos

| Recurso | Uso |
|---------|-----|
| SonarQube / SonarCloud | A03, A06 |
| npm audit | A06 |
| Cypress | A01, A07 |
| Postman | A01, A05, A07 |
| JMeter | A05 (complementario) |
| Revisión manual | Todas |

---

*Cronograma sujeto a ajuste en Paso 05 según hallazgos emergentes.*
