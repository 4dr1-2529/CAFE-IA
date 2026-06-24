# Dependencias y herramientas externas — CAFE-IA

**Fecha:** 2026-06-24

---

## Monorepo raíz (`cafe-cursor/package.json`)

| Paquete | Versión | Tipo | Función | Criticidad |
|---------|---------|------|---------|------------|
| cross-env | 7.0.3 | dev | Variables entorno en scripts Windows/Unix | Baja |
| cypress | 13.17.0 | dev | Pruebas E2E (`testing/`) | Alta |

**Overrides:** `uuid` ^11.1.1, `tmp` ^0.2.6 (igual que backend)

---

## Cypress 13.17.0

| Atributo | Detalle |
|----------|---------|
| **Función** | 11 specs E2E (PF-01 … PF-11), 13 tests |
| **Config** | `testing/cypress.config.js` |
| **Último resultado** | 13/13 OK — `cypress_last-run.json` (2026-05-28) |
| **Estado** | Actualizada (rama 13.x) |
| **Riesgo** | No integrado en CI GitHub Actions |
| **Criticidad** | **Alta** (calidad funcional) |

---

## JMeter

| Atributo | Detalle |
|----------|---------|
| **Función** | Prueba de carga HTTP |
| **Evidencia** | `jmeter_resumen.json`, `resultado_jmeter.csv` |
| **Resultado** | 500/500 OK, 0 % error, avg 443 ms |
| **Alcance** | Solo `GET /api/health` Railway |
| **Instalación npm** | No — herramienta externa / scripts en `testing/metricas/jmeter/` |
| **Criticidad** | **Media** |

---

## SonarCloud (SonarQube SaaS)

| Atributo | Detalle |
|----------|---------|
| **Función** | Análisis estático código |
| **Config** | `sonar-project.properties` |
| **Project Key** | `4dr1-2529_CAFE-IA` |
| **Fuentes** | `frontend/src`, `backend/src` |
| **Tests incluidos** | `backend/tests`, `testing/cypress/e2e` |
| **CI** | Job `sonarcloud` en `.github/workflows/ci.yml` |
| **Evidencia** | `hallazgos_sonar.md`, `CORRECCIONES_SONARQUBE.md` (copiados si existen) |
| **Métricas live** | Evidencia pendiente de incorporar (captura dashboard) |
| **Criticidad** | **Alta** |

---

## Railway

| Atributo | Detalle |
|----------|---------|
| **Función** | Hosting API Node.js + MySQL |
| **Runtime** | Node.js (logs históricos: v22.22.3) |
| **Dependencias desplegadas** | `backend/package.json` production deps |
| **Variables** | MYSQL*, JWT_SECRET, CORS_ORIGINS, PORT |
| **Paquete npm** | No aplica — plataforma PaaS |
| **Criticidad** | **Crítica** |

---

## Vercel

| Atributo | Detalle |
|----------|---------|
| **Función** | Hosting SPA React (build Vite) |
| **Config** | `frontend/vercel.json` |
| **Build** | `npm run build` → `dist/` |
| **Env build** | `VITE_API_URL` |
| **Paquete npm** | No aplica — plataforma PaaS |
| **Criticidad** | **Crítica** |

---

## MySQL 8

| Atributo | Detalle |
|----------|---------|
| **Función** | Base de datos relacional (39 tablas) |
| **Cliente Node** | mysql2 3.22.3 |
| **Producción** | Railway MySQL |
| **Paquete npm** | No — servicio externo |
| **Criticidad** | **Crítica** |

---

## Python / ML (`ml/requirements.txt`)

| Paquete | Versión mínima | Función |
|---------|----------------|---------|
| pandas | ≥2.0.0 | Dataset café |
| scikit-learn | ≥1.3.0 | RandomForest entrenamiento |
| joblib | ≥1.5.3 | Serialización modelo |

**Nota:** Módulo académico; producción usa `PredictionEngine.js` en Node.

---

## Prisma

**No utilizado** en CAFE-IA. Sin entrada en ningún `package.json`.

---

## GitHub Actions (CI)

| Herramienta | Versión / acción | Función |
|-------------|------------------|---------|
| actions/checkout | v4.2.2 (SHA fijado) | Checkout código |
| actions/setup-node | v4.1.0, Node 20 | Runtime CI |
| SonarCloud action | v2.3.0 | Análisis calidad |
| npm test / npm run build | Scripts proyecto | Validación dependencias |
