# Plan de Mejora del Entorno — CAFE-IA

**Fecha:** 24 de junio de 2026

---

| ID | Componente | Problema | Riesgo | Impacto | Prioridad | Recomendación | Responsable | Esfuerzo |
|----|------------|----------|--------|---------|-----------|---------------|-------------|----------|
| ENT-M01 | Node.js | Sin `engines` ni `.nvmrc` | Inconsistencia versiones dev/CI | Medio | Media | Fijar Node 20 en `engines` y `.nvmrc` | DevOps | 1 día |
| ENT-M02 | railway.json | No existe IaC Railway | Config solo en panel; no reproducible | Medio | Media | Documentar export Railway o añadir Nixpacks config | DevOps | 2–3 días |
| ENT-M03 | Docker | Sin contenedorización | Entorno local difícil de replicar | Medio | Media | `docker-compose` MySQL + API para dev | DevOps | 1 sprint |
| ENT-M04 | GitHub Actions | Cypress E2E no en CI | Regresiones UI no detectadas en PR | Alto | Alta | Job E2E con services MySQL o mock | QA + DevOps | 1 sprint |
| ENT-M05 | GitHub Actions | Sin CD automático a Railway/Vercel | Despliegues manuales | Medio | Media | Workflow deploy en merge a main | DevOps | 3–5 días |
| ENT-M06 | JWT_SECRET | Gestión manual en Railway | Exposición o rotación deficiente | Alto | Alta | Secret manager + rotación documentada | Seguridad | 2 días |
| ENT-M07 | CORS | Regex amplia `*.vercel.app` | Origen no autorizado en preview | Medio | Media | Lista explícita de previews o validación | Backend | 2 días |
| ENT-M08 | rate-limit | 500 req/15min puede ser alto | Abuso API | Medio | Baja | Ajustar por ruta (auth vs lectura) | Backend | 1 día |
| ENT-M09 | MySQL local | Dependencia XAMPP Windows | Barrera onboarding Linux/Mac | Medio | Media | Docker MySQL o documentar instalación nativa | DevOps | 2 días |
| ENT-M10 | package-lock | No copiado a evidencias; builds `npm ci \|\| install` | Builds no 100% reproducibles | Bajo | Baja | Forzar `npm ci` en CI sin fallback | DevOps | 1 día |
| ENT-M11 | SonarCloud | Solo análisis; sin gate bloqueante visible en README | Deuda técnica acumulada | Medio | Media | Publicar badge quality gate en README | QA | 1 día |
| ENT-M12 | JMeter | Solo health endpoint | Cobertura carga limitada | Medio | Baja | Planes JMeter para login y lotes | QA | 1 sprint |
| ENT-M13 | SSL MySQL | `MYSQL_SSL_REJECT_UNAUTHORIZED` flexible en Railway | MITM teórico en BD | Bajo | Baja | Certificados Railway documentados | DevOps | 1 día |
| ENT-M14 | render.yaml | Alternativa sin uso claro | Confusión infraestructura | Bajo | Baja | Deprecar o documentar como backup | Arquitecto | 1 día |
| ENT-M15 | Variables frontend | `RAILWAY_API_URL` hardcoded en `api.js` | Cambio URL requiere código | Medio | Media | Solo `VITE_API_URL` sin fallback hardcoded | Frontend | 1 día |
| ENT-M16 | Backups BD | No documentados en repo | Pérdida datos Railway | Alto | Alta | Política backup MySQL Railway | DevOps | 2 días |
| ENT-M17 | Monitoreo | Sin APM/logs centralizados | Incidentes tardíos | Medio | Media | Railway metrics + alertas health | DevOps | 3–5 días |
| ENT-M18 | npm audit | `continue-on-error: true` en CI | Vulnerabilidades ignoradas | Medio | Alta | Fallar CI en high/critical o allowlist | Seguridad | 2 días |

---

## Mejoras por área

### Desarrollo
ENT-M01, ENT-M03, ENT-M09 — estandarizar runtime y BD local.

### Producción
ENT-M02, ENT-M05, ENT-M16, ENT-M17 — IaC, CD y backups.

### Seguridad
ENT-M06, ENT-M07, ENT-M08, ENT-M13, ENT-M18 — secretos, CORS, audit.

### Despliegue
ENT-M05, ENT-M15 — automatización y configuración por env.

### Infraestructura
ENT-M02, ENT-M03, ENT-M14, ENT-M17 — reproducibilidad y observabilidad.

---

**Total mejoras:** 18 | **Prioridad Alta:** 4
