# 04 — Conclusiones — Descubrimiento Tecnológico

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Fecha:** 2026-06-24  
**Actividad:** Ingeniería Inversa — Paso 4

---

## Estado del stack tecnológico

CAFE-IA implementa un **stack full-stack JavaScript moderno** desplegado en la nube: **React 18 + Vite 5 + Tailwind 3** en Vercel, **Node.js 20 + Express 4** en Railway, y **MySQL 8** como motor relacional. El monorepo npm centraliza scripts de prueba (Cypress) y calidad (SonarCloud vía GitHub Actions).

El análisis confirma **37 tecnologías operativas** de las 45 evaluadas en la matriz TEC, con sustitutos verificables para tecnologías del checklist no instaladas.

---

## Tecnologías correctamente implementadas

### Frontend
React 18.3.1, Vite 5.4.21, Tailwind CSS 3.4.19, React Router 6.30.3, Recharts 2.15.4, lucide-react, react-qr-code, Fetch API, ToastContext.

### Backend
Node.js 20, Express 4.22.2, jsonwebtoken 9.0.3, bcryptjs 2.4.3, mysql2 3.22.3, dotenv, cors, helmet, express-rate-limit, exceljs, pdfkit.

### Datos
MySQL 8 con 39 tablas, `schema.sql`, `migrate.js`, pool conexiones SSL en Railway.

### Infraestructura
Railway (API + BD), Vercel (SPA), GitHub Actions (CI), variables MYSQL* unificadas.

### Calidad
Cypress 13.17.0 (11 specs), node:test (18 tests), JMeter (carga health), SonarCloud en CI.

### IA producción
PredictionEngine.js heurístico v2 integrado en API REST.

---

## Tecnologías críticas

| Tecnología | Criticidad | Justificación |
|------------|------------|---------------|
| **mysql2 + MySQL** | Crítica | Toda la persistencia del sistema |
| **Express + Node.js** | Crítica | API REST en producción Railway |
| **jsonwebtoken + bcryptjs** | Crítica | Seguridad y acceso |
| **React + Vite** | Crítica | Interfaz usuario Vercel |
| **helmet + cors + rate-limit** | Alta | Superficie de ataque HTTP |
| **migrate.js** | Alta | Arranque y consistencia BD |

---

## Tecnologías pendientes de actualización

| Tecnología | Motivo |
|------------|--------|
| react-router-dom | CVE open redirect moderate |
| Vite / esbuild | CVE en dev server (desarrollo) |
| form-data (transitiva backend) | CVE high en cadena supertest |
| lucide-react | Versión 0.294.0 — actualizable |
| Cypress last-run.json | Evidencia de mayo 2026 |

---

## Tecnologías no implementadas (explícito)

| Tecnología checklist | Estado | Sustituto / Nota |
|---------------------|--------|------------------|
| Axios | No implementado | Fetch API nativo |
| SweetAlert2 | No implementado | ToastContext |
| React Icons | No implementado | lucide-react |
| multer | No implementado | Sin upload archivos |
| node-cron | No implementado | Sin tareas programadas |
| Docker | No implementado | Deploy directo PaaS |
| SonarQube on-prem | No implementado | SonarCloud SaaS |
| ML Python en API | No integrado | PredictionEngine.js en prod |

---

## Riesgos tecnológicos

| Riesgo | Nivel | Mitigación actual |
|--------|-------|-------------------|
| CVE dependencias npm | Medio | npm audit en CI (no bloquea) |
| Cypress fuera CI | Alto | Ejecución manual documentada |
| Tests integración omitidos CI | Medio | SKIP_INTEGRATION=1 |
| ML Python vs heurístico Node | Bajo | Documentación académica separada |
| Sin contenedores | Medio | PaaS gestionado Railway/Vercel |
| JMeter solo health | Medio | 100 % disponibilidad verificada |

---

## Nivel de madurez tecnológica

| Dimensión | Valoración | Justificación |
|-----------|------------|---------------|
| **Stack core** | 9.0 / 10 | Tecnologías actuales y estables |
| **Seguridad HTTP** | 8.5 / 10 | helmet, cors, JWT, rate-limit |
| **CI/CD** | 7.0 / 10 | CI básico; sin E2E ni integración BD |
| **Calidad estática** | 7.5 / 10 | SonarCloud; cobertura 0 % |
| **Reproducibilidad** | 6.5 / 10 | Sin Docker; deps lockfile OK |
| **IA / ML** | 7.0 / 10 | Heurístico prod; Python offline |
| **Madurez global** | **8.0 / 10** | Stack productivo con gaps acotados |

---

## Recomendaciones

1. **Priorizar parches CVE** en react-router-dom y cadena form-data (TEC-M01, TEC-M05).
2. **Integrar Cypress en CI** para cerrar el gap más significativo de calidad (TEC-M03).
3. **Habilitar tests de integración** con MySQL en GitHub Actions (TEC-M04).
4. **Documentar explícitamente** que Axios/SweetAlert2/React Icons no forman parte del stack real.
5. **Ampliar JMeter** a flujos autenticados representativos del negocio (TEC-M06).
6. **Evaluar Dockerfile** para entornos de desarrollo reproducibles (TEC-M11).

---

## Veredicto

El stack tecnológico de CAFE-IA es **coherente, desplegado y verificable**, apto para evaluación ICACIT. Las tecnologías ausentes del checklist académico están **justificadas por alternativas implementadas o por ausencia de requisito funcional**. Los riesgos identificados son **gestionables** con el plan de mejoras TEC-M01 a TEC-M16.

---

*Conclusión del Paso 4 — Descubrimiento Tecnológico. Ver `02_Resultado_IA.md`, `03_Mejoras.md` y carpeta `Evidencias/`.*
