# Plan Consolidado de Mejoras — Conclusión General CAFE-IA

**Fecha:** 24 de junio de 2026  
**Origen:** Síntesis Pasos 01–12 (matriz HAL consolidada)  
**Criterio de orden:** Crítica → Alta → Media → Baja

---

## Prioridad Crítica

| ID | Área | Problema | Impacto | Prioridad | Recomendación | Beneficio esperado |
|----|------|----------|---------|-----------|---------------|-------------------|
| HAL-003 | Base de Datos | Operación compuesta de creación de lote sin transacción SQL | Inconsistencia de datos ante fallos parciales | Crítica | Envolver lote, trazabilidad e inventario en BEGIN/COMMIT MySQL | Garantía de integridad referencial y atomicidad |

---

## Prioridad Alta

| ID | Área | Problema | Impacto | Prioridad | Recomendación | Beneficio esperado |
|----|------|----------|---------|-----------|---------------|-------------------|
| HAL-002 | Configuración | Variable `ADMIN_SEED_PASSWORD` ausente en producción | Imposibilidad de acceso administrativo inicial | Alta | Configurar secreto seguro en panel Railway | Operación administrativa desde primer despliegue |
| HAL-004 | Arquitectura | Consultas SQL directas en capa de aplicación (`PredictionService`) | Violación del patrón hexagonal y acoplamiento a BD | Alta | Completar `PrediccionRepository` y retirar SQL inline | Mantenibilidad y testabilidad del módulo IA |
| HAL-005 | Dominio | Entidad `fincas` sin exposición en API ni interfaz | Trazabilidad geográfica incompleta | Alta | Implementar CRUD de fincas y vincular `finca_id` en lotes | Coherencia dominio-datos-interfaz |
| HAL-006 | Dominio / BD | 39 tablas en esquema frente a ~14 entidades operativas | Deuda de modelo y riesgo de inconsistencias silenciosas | Alta | Plan de implementación o deprecación de tablas huérfanas | Reducción de complejidad y errores latentes |
| HAL-008 | Backend | Ausencia de operaciones PUT/DELETE en API de lotes | Corrección de errores operativos solo vía SQL manual | Alta | Edición y baja lógica con registro de auditoría | Flexibilidad operativa sin comprometer trazabilidad |
| HAL-010 | DevOps | Suite Cypress (11 specs) excluida de GitHub Actions | Regresiones de interfaz no detectadas en merge | Alta | Incorporar job E2E con stack dockerizado en CI | Detección temprana de fallos de regresión UI |
| HAL-013 | Seguridad | CVE de open redirect en `react-router-dom` | Vector de phishing mediante redirección | Alta | Actualizar dependencia a versión ≥6.30.4 | Cierre de vulnerabilidad en producción |
| HAL-028 | Seguridad | Gestión manual de `JWT_SECRET` sin rotación | Ventana prolongada de exposición ante compromiso | Alta | Secret manager y política documentada de rotación | Reducción del riesgo de suplantación de sesión |
| HAL-035 | Infraestructura | Política de respaldos MySQL en Railway no documentada | Pérdida potencial de datos sin plan de recuperación | Alta | Configurar, probar y documentar estrategia de backup | Continuidad de negocio ante desastres |
| HAL-037 | Calidad | E2E sin cobertura de módulos admin avanzados | Brechas de regresión en calidad, usuarios y auditoría | Alta | Desarrollar especificaciones PF-12 a PF-15 | Cobertura funcional integral en pruebas automatizadas |
| HAL-048 | Configuración | Riesgo de inclusión accidental de archivos `.env` en control de versiones | Exposición de credenciales y secretos | Alta | Verificar `.gitignore` e implementar pre-commit hook | Prevención de filtración de secretos |

---

## Prioridad Media

| ID | Área | Problema | Impacto | Prioridad | Recomendación | Beneficio esperado |
|----|------|----------|---------|-----------|---------------|-------------------|
| HAL-007 | Seguridad | Tablas de permisos en seeds sin enforcement en runtime | RBAC granular aparente pero inoperante | Media | Activar control por permisos o eliminar tablas | Coherencia del modelo de seguridad |
| HAL-009 | Machine Learning | Script Python de entrenamiento desacoplado del runtime | Expectativa de IA no alineada con heurística activa | Media | Integrar modelo o renombrar módulo como estimación heurística | Transparencia funcional y alineación con PMV2 |
| HAL-011 | DevOps | `SKIP_INTEGRATION=1` en pipeline CI | Regresiones de API no detectadas en integración | Media | Contenedor MySQL en workflow de GitHub Actions | Validación automatizada de capa de persistencia |
| HAL-012 | Dependencias | CVE HIGH en `form-data` transitiva | Riesgo en cadena de suministro | Media | Ejecutar `npm audit fix` en backend | Reducción de superficie de ataque |
| HAL-014 | Dependencias | CVE en `esbuild`/`vite` (servidor de desarrollo) | Exposición en entorno de desarrollo | Media | Planificar actualización de Vite; aislar dev server | Seguridad en ciclo de desarrollo |
| HAL-015 | Dependencias | CVE adicionales en frontend (js-yaml, @babel/core) | Riesgos en build y herramientas dev | Media | Remediar mediante `npm audit fix` | Higiene de dependencias |
| HAL-016 | DevOps | `continue-on-error: true` en job npm audit | Merge de código con CVE de severidad alta | Media | Configurar fallo de CI en audit-level=high | Barrera de calidad en integración |
| HAL-017 | Frontend | ESLint con errores de configuración bloqueantes | Análisis estático no ejecutable limpiamente | Media | Corregir reglas en ErrorBoundary y react-hooks | Lint operativo en pipeline |
| HAL-018 | Calidad | Quality Gate SonarCloud sin captura en repositorio | Evidencia ICACIT incompleta | Media | Exportar dashboard tras ejecución de CI | Trazabilidad de calidad para auditoría |
| HAL-019 | Calidad | Cobertura SonarCloud reportada en 0 % | Deuda de testing invisible | Media | Instrumentar c8 y configurar `lcov.reportPaths` | Visibilidad cuantificada de cobertura |
| HAL-020 | Rendimiento | JMeter limitado a endpoint de salud | Confianza insuficiente en rendimiento de negocio | Media | Diseñar escenarios con login, lotes y dashboard JWT | Baseline de rendimiento representativo |
| HAL-021 | Rendimiento | Percentil 95 de JMeter ≈ 2614 ms | Latencia marginal bajo carga documentada | Media | Warm-up de instancia; revisar plan Railway | Estabilidad de tiempos de respuesta |
| HAL-023 | Backend | Seeds con fallo silencioso (`logSeedWarning`) | Base de datos parcialmente sembrada | Media | Fail-fast en seeds críticos | Consistencia de datos iniciales |
| HAL-025 | Infraestructura | Ausencia de Docker/docker-compose | Entornos de desarrollo no reproducibles | Media | Proporcionar compose para API, MySQL y frontend | Onboarding y paridad dev-prod |
| HAL-026 | Infraestructura | Sin IaC para configuración Railway | Reproducibilidad limitada del entorno productivo | Media | Documentar o exportar configuración (`railway.toml`) | Recuperación y replicación de infraestructura |
| HAL-027 | DevOps | Sin despliegue continuo automatizado | Releases manuales propensos a error humano | Media | Workflow de deploy en merge a rama principal | Agilidad y consistencia en liberaciones |
| HAL-029 | Seguridad | CORS con regex amplia `*.vercel.app` | Acceso desde previews no autorizados | Media | Lista explícita de orígenes permitidos | Reducción de superficie de ataque |
| HAL-030 | Frontend | URL de API hardcodeada como fallback en `api.js` | Cambio de endpoint requiere modificación de código | Media | Exigir `VITE_API_URL`; fallar build sin variable | Portabilidad entre entornos |
| HAL-031 | Dominio | Inventario auto-creado sin módulo de gestión | Stock no visible para el usuario operativo | Media | Vista de inventario con alcance por rol | Visibilidad operativa del stock |
| HAL-033 | Arquitectura | Sin contrato OpenAPI/Swagger | Integración externa y documentación API limitadas | Media | Generar especificación desde rutas Express | Contrato formal para consumidores |
| HAL-034 | Infraestructura | Sin APM ni logs estructurados con request-id | Diagnóstico de incidentes prolongado | Media | Implementar logs JSON y métricas Railway | Reducción del tiempo medio de resolución |
| HAL-036 | Calidad | Evidencia Cypress desactualizada (mayo 2026) | Obsolescencia de prueba de regresión documentada | Media | Re-ejecutar `npm run test:e2e` y archivar resultado | Evidencia vigente para evaluación |
| HAL-038 | Calidad | Capturas de paneles cloud pendientes | Informe visual ICACIT incompleto | Media | Incorporar screenshots Railway, Vercel y Sonar | Completitud de evidencias de evaluación |
| HAL-039 | Dominio | Ambigüedad entre entidad Productor y rol legacy | Interpretación errónea en auditorías de dominio | Media | Publicar glosario y normalizar terminología | Claridad semántica del modelo |
| HAL-045 | Dependencias | Dependabot no evidenciado en repositorio | Detección tardía de vulnerabilidades | Media | Habilitar alertas de Dependabot en GitHub | Notificación proactiva de CVE |

---

## Prioridad Baja

| ID | Área | Problema | Impacto | Prioridad | Recomendación | Beneficio esperado |
|----|------|----------|---------|-----------|---------------|-------------------|
| HAL-022 | Seguridad | Endpoint `/api/health` expone `dbHost` | Facilita reconocimiento de infraestructura | Baja | Reducir campos en respuesta pública | Menor exposición de metadatos |
| HAL-024 | Frontend | Chunk Recharts de ~411 KB (gzip 110 KB) | LCP del dashboard degradado | Baja | Importación dinámica en `DashboardPage` | Mejora de rendimiento percibido |
| HAL-032 | Dominio | Tablas de notificaciones sin servicio asociado | UX de alertas limitada | Baja | Implementar servicio de notificaciones | Experiencia de usuario enriquecida |
| HAL-040 | Dominio | Terminología de calidad divergente entre HU y código | Inconsistencia documental | Baja | Unificar escalas en historias y reglas de negocio | Coherencia en documentación de dominio |
| HAL-041 | Configuración | Sin `engines` Node ni `.nvmrc` | Deriva de versión entre desarrollo y CI | Baja | Fijar Node 20 en `package.json` y `.nvmrc` | Paridad de entornos |
| HAL-042 | Configuración | Variables de scripts no documentadas en `.env.example` | Uso incorrecto de utilidades de desarrollo | Baja | Crear `.env.scripts.example` o ampliar README | Autoservicio para desarrolladores |
| HAL-043 | Arquitectura | Rutas `/api/base-datos` duplicadas | Confusión en mantenimiento | Baja | Centralizar registro en `routes/index` | Código más legible |
| HAL-044 | Arquitectura | Autenticación sin `AuthController` dedicado | Heterogeneidad en capa de interfaces | Baja | Extraer controlador de autenticación | Uniformidad arquitectónica |
| HAL-046 | Calidad | 187 warnings ESLint `no-unused-vars` en JSX | Ruido en análisis estático | Baja | Activar regla `react/jsx-uses-vars` | Señal útil en reportes de lint |
| HAL-047 | Infraestructura | `render.yaml` sin propósito claro frente a Railway | Confusión sobre plataforma de despliegue | Baja | Deprecar o documentar como alternativa | Claridad en documentación de infraestructura |

---

## Mejoras verificadas o corregidas

| ID | Área | Problema | Estado | Beneficio obtenido |
|----|------|----------|--------|-------------------|
| HAL-001 | Infraestructura | Crash Railway por error en `migrate.js` | Corregido | Restauración de disponibilidad API |
| HAL-P06 | Seguridad | Filtración de variables de entorno en Vite | Corregido | Aislamiento de secretos backend |
| HAL-P01–P05, P07 | Varios | Producción, tests, JWT, RBAC | Verificado | Confianza en baseline operativo |

---

## Resumen cuantitativo

| Prioridad | Mejoras pendientes |
|-----------|-------------------|
| Crítica | 1 |
| Alta | 11 |
| Media | 22 |
| Baja | 12 |
| Corregidas/verificadas | 9 |
| **Total registrado** | **55** |

---

*Consolidado en Paso 13. Sin duplicación literal de pasos anteriores.*
