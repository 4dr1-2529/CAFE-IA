# 11 — Plan de Mejoras

Matriz Excel: [Matrices/Matriz_Plan_Mejoras.xlsx](Matrices/Matriz_Plan_Mejoras.xlsx)  
Riesgos: [Matrices/Matriz_Riesgos.xlsx](Matrices/Matriz_Riesgos.xlsx)

---

## 11.1 Problemas críticos

| # | Problema | Evidencia | Acción correctiva | Prioridad | Impacto | Tiempo est. |
|---|----------|-----------|-------------------|-----------|---------|-------------|
| C1 | **SyntaxError en migrate.js:156** bloquea tests HTTP | `npm test`: api.errors, health, integration fallan | Corregir SQL seed `variedades_cafe` línea 156 | **Crítica** | CI/local tests incompletos | 2–4 h |
| C2 | Tests integración no confiables | 3/6 suites fallan al importar migrate | Validar migrate + re-ejecutar suite completa | **Crítica** | Regresiones no detectadas | 4 h |

---

## 11.2 Problemas medios

| # | Problema | Evidencia | Acción correctiva | Prioridad | Impacto | Tiempo est. |
|---|----------|-----------|-------------------|-----------|---------|-------------|
| M1 | Arquitectura hexagonal incompleta | AUDITORIA_TECNICA §1.2 | Migrar Reportes/Producción a repositories | **Alta** | Mantenibilidad | 2–3 días |
| M2 | Sin colección Postman versionada | Grep sin matches | Crear `testing/postman/` + Newman en CI | **Media** | Trazabilidad API | 1 día |
| M3 | JMeter solo /api/health | prueba_500_requests.jmx | Plan multi-endpoint autenticado | **Media** | Confianza rendimiento | 1–2 días |
| M4 | Cypress no en CI | ci.yml sin job E2E | Job GitHub Actions + MySQL service | **Media** | Regresión UI | 2 días |
| M5 | Cobertura Sonar no configurada | sin lcov en sonar-project | Añadir c8/nyc o documentar excepción | **Media** | Quality Gate | 1 día |
| M6 | Duplicidad lotes/produccion | AUDITORIA_TECNICA | Refactor modelo dominio + schema | **Media** | Integridad datos | 3–5 días |
| M7 | npm audit continue-on-error | ci.yml | Fallar job en high/critical | **Media** | Seguridad supply chain | 2 h |
| M8 | Módulos sin E2E: calidad, auditoría, usuarios | Gap analysis Cypress | PF-12 a PF-15 | **Media** | Cobertura funcional | 2 días |

---

## 11.3 Problemas bajos

| # | Problema | Evidencia | Acción correctiva | Prioridad | Impacto | Tiempo est. |
|---|----------|-----------|-------------------|-----------|---------|-------------|
| B1 | Tablas schema sin uso (fincas, cosechas…) | AUDITORIA_TECNICA | Deprecar o conectar | **Baja** | Claridad modelo | 1–2 días |
| B2 | Archivos frontend no usados | entities.js, Card.jsx | Eliminar o integrar | **Baja** | Code smell | 2 h |
| B3 | Toasts no en todos formularios | AUDITORIA_TECNICA | UX feedback uniforme | **Baja** | Usabilidad | 1 día |
| B4 | ML Python no en runtime | ml/ separado | Documentar o integrar API | **Baja** | Expectativas IA | Variable |
| B5 | Evidencias visuales dispersas | Sin capturas centralizadas | Completar carpeta Evidencias/ | **Baja** | Informe académico | 4 h |
| B6 | Documentación externa menciona Angular | Stack real React | Actualizar docs externas | **Baja** | Confusión stakeholders | 1 h |
| B7 | Auth opcional en desarrollo | REQUIRE_AUTH=false default | Documentar política entornos | **Baja** | Seguridad dev | 1 h |

---

## 11.4 Roadmap sugerido (sin modificar arquitectura)

### Sprint 1 — Estabilización (1 semana)
- C1, C2: Corregir migrate.js
- M7: Endurecer npm audit CI
- B5: Capturas evidencias

### Sprint 2 — QA (2 semanas)
- M2: Postman + Newman
- M4: Cypress en CI
- M8: PF-12 a PF-15

### Sprint 3 — Calidad y rendimiento (2 semanas)
- M3: JMeter ampliado
- M5: Cobertura Sonar o waiver documentado
- Captura dashboard SonarCloud

### Sprint 4 — Deuda técnica (3 semanas)
- M1, M6: Hexagonal + modelo lotes
- B1, B2: Limpieza schema/código

---

## 11.5 Métricas de seguimiento

| KPI | Baseline actual | Meta |
|-----|-----------------|------|
| Tests backend pass rate | 10/13 (77 %) | 13/13 (100 %) |
| Cypress pass rate | 13/13 (100 %) | Mantener + ampliar specs |
| JMeter error rate | 0 % | 0 % en escenarios ampliados |
| Sonar Quality Gate | Pendiente captura | Passed |
| Endpoints documentados Postman | 0 colección | 100 % rutas en colección |

---

## 11.6 Responsables sugeridos

| Rol | Responsabilidad |
|-----|-----------------|
| Backend Lead | C1, M1, M6 |
| QA Engineer | M2, M3, M4, M8, B5 |
| DevOps | M5, M7, Sonar capturas |
| Frontend Lead | B3, B2 |
| Arquitecto | M6, M1, roadmap |

*Nota: Responsables son sugerencias organizativas; el repositorio no define equipo formal.*

---

## 11.7 Deuda técnica detectada en re-auditoría de código (18-jun-2026)

Análisis directo de `cafe-cursor/` — sin modificar el sistema.

### 11.7.1 Arquitectura

| Hallazgo | Ubicación | Impacto |
|----------|-----------|---------|
| Hexagonal **parcial** | `ReportesService.js`, `ProduccionController` vs núcleo con repositories | Mantenibilidad heterogénea |
| Ruta dashboard duplicada | `routes/index.js` L26-27 + `dashboard.routes.js` | Confusión routing (funcional OK) |
| Alias `/api/evaluaciones` = `/api/control-calidad` | `routes/index.js` L33-34 | Duplicación API surface |
| `devOrAuth` exportado pero **no usado** en rutas | `auth.js` — rutas usan `authenticate` vía guards | Doc desactualizada vs implementación real |
| Endpoint `POST /api/prediccion-ia` **no existe** en rutas actuales | Solo `POST /api/predicciones/ejecutar` | AUDITORIA_TECNICA referencia legacy |

### 11.7.2 Base de datos y migración

| Hallazgo | Ubicación | Impacto |
|----------|-----------|---------|
| **SQL seed corrupto** | `migrate.js:153-164` — INSERT `variedades_cafe` concatenado con `procesos_secado`, `estados_lote`, `criterios_calidad`, `configuraciones` | **SyntaxError** — bloquea import en tests |
| 39 tablas / 43 FK en schema | `schema.sql` | ~40 % tablas sin uso en app (fincas, cosechas, evaluaciones_calidad) |
| `estado_lote_id` FK no usada en app | Schema vs `LoteService` campo `estado` VARCHAR | Inconsistencia modelo |

### 11.7.3 Seguridad

| Hallazgo | Ubicación | Impacto |
|----------|-----------|---------|
| JWT + refresh en **localStorage** | `frontend/src/services/api/client.js`, `AuthContext.jsx` | Riesgo robo token vía XSS |
| `REQUIRE_AUTH=false` por defecto dev | `backend/.env.example` | Endpoints accesibles sin JWT en dev |
| Rate limit desactivado en tests | `app.js` skipRateLimit si NODE_ENV=test | Correcto para tests |
| Controles positivos | Helmet, CORS whitelist, bcrypt, RoleHelper.assertLoteAccess | Mitigación access control |

### 11.7.4 Código duplicado / muerto

| Archivo | Evidencia |
|---------|-----------|
| `frontend/src/domain/entities.js` | Sin imports en páginas (AUDITORIA_TECNICA) |
| `frontend/src/components/ui/Card.jsx` | No usado — existe KpiCard |
| `supertest` en devDependencies | Instalado, 0 tests HTTP |
| Rutas calidad montadas dos veces | `index.js` evaluaciones + control-calidad |

### 11.7.5 Rendimiento

| Hallazgo | Evidencia | Recomendación |
|----------|-----------|---------------|
| JMeter solo `/api/health` | `resultados_resumen.json`: 443 ms avg, 6320 rpm | Ampliar a dashboard/metrics |
| Cold start ~2.6 s primer batch | p95 2614 ms en CSV | Warm-up en pruebas perf |
| Pool max 10 conexiones | `.env.example` DB_POOL_MAX | Adecuado para PMV; monitor Railway |
| Lazy routes + manualChunks Vite | `vite.config.js` | Buena práctica frontend |

### 11.7.6 Mantenibilidad

| Hallazgo | Evidencia |
|----------|-----------|
| ESLint/Prettier no en CI | `frontend/package.json` scripts lint — manual |
| Sin OpenAPI/Swagger | DOCUMENTACION_TECNICA markdown only |
| Sin TypeScript | JS puro frontend/backend |
| 17 services / 11 repositories / 13 controllers | Buena separación en núcleo |
| PrediccionService → PredictionService | Capas IA orquestadas; naming similar | Claridad documental |
| Correcciones Sonar documentadas | 16 ítems en CORRECCIONES_SONARQUBE.md |

### 11.7.7 Evidencias / documentación

| Hallazgo | Evidencia |
|----------|-----------|
| PNG diagramas referenciados pero **ausentes** en repo | `docs/Arquitectura.../README.md` referencia .png; solo .mmd presentes |
| 0 imágenes PNG/JPG en `cafe-cursor/` | Búsqueda glob — generar con `npm run db:docs:png` |
| Cypress JSON, JMeter CSV, Sonar MD **sí existen** | Copiados a `Reporte-Calidad-Software/Evidencias/` y `Reportes/` |

### 11.7.8 Escalabilidad

| Hallazgo | Evidencia | Impacto |
|----------|-----------|---------|
| API stateless JWT | Sin sesión servidor excepto refresh en BD | Escala horizontal API posible |
| MySQL single instance Railway | README — mysql.railway.internal | Cuello de botella BD |
| Sin cache Redis/memoria | No hay capa cache en código | Dashboard/reportes recalculan SQL |
| Sin colas async | Chatbot y predicción síncronos | Limita picos concurrentes |
| Rate limit 500/15min global | `app.js` | Protección básica; no por usuario |
| Vercel SPA estática + Railway API | Separación frontend/backend | Patrón escalable estándar |
| Pool BD max 10 | `DB_POOL_MAX=10` | Ajustar según carga Railway |

### 11.7.9 Auditoría final (18-jun-2026 — segunda pasada)

| Acción | Resultado |
|--------|-----------|
| Trazabilidad documental | Creado `13_Trazabilidad_Documental.md` (20 ítems TR) |
| Checklist evidencias | Creado `CHECKLIST_EVIDENCIAS.md` |
| Artefactos adicionales copiados | +10 archivos (métricas, docs proyecto, ml) |
| Controllers corregidos 12→13 | SystemController incluido |
| Guías Postman/SonarCloud | `Reportes/GUIA_*.md` |
