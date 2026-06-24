# Comparativo Diseño vs Implementación — CAFE-IA

**Fecha:** 24 de junio de 2026  
**Alcance:** PMV + atributos FURPS+

---

## 1. Funcionalidad planificada vs implementada

| Módulo | Plan / Diseño | Implementado en código | Estado |
|--------|---------------|------------------------|--------|
| Login / JWT | Auth stateless | `auth.routes.js`, LoginPage, tests 401 | **Cumple** |
| Roles admin/cliente | RBAC scope | `rbac.js`, PF-11 | **Cumple** |
| Usuarios CRUD | Solo admin | `usuarios.routes.js`, UsuariosPage | **Cumple** |
| Productores | CRUD completo | `productores.routes.js`, PF-05 | **Cumple** |
| Producción | Registro cosecha | `produccion.routes.js`, PF-06 | **Cumple** |
| Lotes | Alta + consulta + TX | Alta/consulta OK; **sin TX**; sin PUT/DELETE | **Parcial** |
| Trazabilidad | Timeline + QR | `trazabilidad.routes.js`, PF-07 | **Cumple** |
| Calidad | Evaluación ponderada | `calidad.routes.js`, CalidadService | **Cumple** |
| Dashboard | KPIs Recharts | DashboardPage, PF-03/04 | **Cumple** |
| Reportes | JSON + PDF/Excel | `reportes.routes.js`, PF-09 | **Cumple** |
| IA | Predicción calidad | `PredictionEngine` heurístico; ml/ separado | **Parcial** |
| Chatbot | Intents | `chatbot.routes.js`, PF-10 | **Cumple** |
| Auditoría | Solo admin | `auditoria.routes.js` | **Cumple** |
| Fincas | Entidad dominio | Tabla + FK; **sin API/UI** | **No cumple** |
| Permisos granulares | Tablas BD | Seeds; **sin middleware** | **No cumple** |

**Cobertura funcional implementada:** 48/59 features (81 %) — alineado con IR Paso 03.

---

## 2. Arquitectura diseño vs código

| Elemento diseño | Implementación | Estado |
|-----------------|----------------|--------|
| Hexagonal 4 capas | `interfaces/`, `application/`, `domain/`, `infrastructure/` | Cumple |
| 13 módulos API | Routers en `routes/` | Cumple |
| Repositories MySQL | `infrastructure/database/repositories/` | Cumple |
| Validators por agregado | `application/validators/` | Cumple |
| SQL solo en repos | Excepción `PredictionService` | Parcial |
| Transacciones servicios | Ausente en LoteService | No cumple |

---

## 3. Infraestructura diseño vs despliegue

| Elemento | Diseño | Implementación | Estado |
|----------|--------|----------------|--------|
| API Railway | Producción | HTTP 200 verificado | Cumple |
| SPA Vercel | Producción | HTTP 200 | Cumple |
| MySQL Railway | Persistencia | `railway: true` en health | Cumple |
| CI tests + build | GitHub Actions | Sí; sin integración/E2E | Parcial |
| CD automático | Recomendado | No evidenciado | No cumple |
| Docker dev | Recomendado | Ausente | No cumple |
| Backups BD | Requerido ops | No documentado | No cumple |

---

## 4. Mejoras Paso 02 vs código actual

| Hallazgo P02 | ¿Implementado? | Evidencia verificación |
|--------------|----------------|------------------------|
| FUR-001 Transacción | **No** | LoteService.js |
| FUR-002 JMeter negocio | **No** | Solo health JSON |
| FUR-003 Cypress CI | **No** | ci.yml |
| FUR-004 CVE router | **No** | package.json |
| FUR-005 CVE form-data | **No** | npm audit |
| FUR-006 lcov | **No** | Sin artefacto |
| FUR-007–018 | **No** | Ver Matriz_Hallazgos |

**Tasa remediación post-auditoría:** 0 % (0/18). Correcciones Sonar preexistentes no contabilizadas como remediación P02.

---

## 5. Síntesis

| Dimensión | Diseño alcanzado |
|-----------|------------------|
| PMV funcional | ~88 % |
| Arquitectura | ~90 % |
| Despliegue operativo | ~92 % |
| Calidad automatizada | ~55 % |
| Remediación hallazgos | 0 % |
| **Implementación global** | **77 %** |

---

*Comparativo Paso 03 — base para Paso 04 OWASP.*
