# 03 — Plan de Mejoras — Dependencias

**Proyecto:** CAFE-IA  
**Fecha:** 2026-06-24

---

| ID | Dependencia | Problema encontrado | Riesgo | Impacto | Prioridad | Recomendación | Esfuerzo | Responsable |
|----|-------------|---------------------|--------|---------|-----------|---------------|----------|-------------|
| M-DEP-01 | form-data (trans) | CVE HIGH CRLF injection | Explotación en tests HTTP | Medio (dev) | **Alta** | `npm audit fix` en backend | 1 h | Backend Dev |
| M-DEP-02 | react-router-dom | 6.30.3 en rango CVE <6.30.4 | Open redirect | Medio producción | **Alta** | Actualizar a ≥6.30.4 | 1–2 h | Frontend Dev |
| M-DEP-03 | dompurify (trans) | CVE moderate vía mermaid-cli | XSS en scripts docs | Bajo | **Media** | Actualizar mermaid-cli o audit fix | 2 h | Backend Dev |
| M-DEP-04 | esbuild (trans) | CVE moderate vía Vite dev | Dev server leak | Bajo (solo dev) | **Media** | No exponer dev server; plan upgrade Vite 6+ | 4–8 h | Frontend Dev |
| M-DEP-05 | js-yaml (trans) | DoS quadratic merge | Denial of service dev | Bajo | **Media** | `npm audit fix` frontend | 1 h | Frontend Dev |
| M-DEP-06 | cypress | No integrado en CI | Regresión UI | Alto | **Alta** | Job CI con stack dockerizado | 8–16 h | DevOps |
| M-DEP-07 | eslint 8.x | Rama en mantenimiento | Deuda lint | Bajo | **Media** | Migrar a ESLint 9 flat config | 4–8 h | Frontend Dev |
| M-DEP-08 | lucide-react | 0.294.0 semver 0.x | Iconos desactualizados | Bajo | **Baja** | Actualizar minor/patch | 1 h | Frontend Dev |
| M-DEP-09 | recharts | Bundle 411 KB | LCP lento | Bajo UX | **Baja** | Dynamic import en dashboard | 2–4 h | Frontend Dev |
| M-DEP-10 | SonarCloud | Sin SBOM ni métricas archivadas | Evidencia ICACIT incompleta | Medio | **Media** | Capturar dashboard + opcional CycloneDX | 2–4 h | QA |
| M-DEP-11 | npm audit CI | continue-on-error | CVE en merge | Medio | **Media** | Fallar job en high | 30 min | DevOps |
| M-DEP-12 | overrides tmp/uuid | Correctivos manuales | Mantenimiento overrides | Bajo | **Baja** | Revisar si aún necesarios tras updates | 1 h | Backend Dev |
| M-DEP-13 | supertest | Paquete dev con CVE transitiva | Supply chain test | Bajo | **Baja** | Evaluar reemplazo por fetch tests puros | 2 h | Backend Dev |
| M-DEP-14 | @babel/core | CVE low file read | Solo build | Bajo | **Baja** | audit fix | 1 h | Frontend Dev |
| M-DEP-15 | Dependabot | No evidenciado en repo | CVE tardías | Medio | **Media** | Habilitar Dependabot alerts GitHub | 1 h | DevOps |

---

## Plan de actualización priorizado

### Fase 1 — Inmediato (1–3 días)

1. **M-DEP-02** — Parche react-router-dom ≥6.30.4  
2. **M-DEP-01** — npm audit fix backend (form-data)  
3. **M-DEP-05** — npm audit fix frontend (js-yaml, @babel/core)  
4. **M-DEP-11** — Endurecer CI audit  

### Fase 2 — Corto plazo (1–2 semanas)

5. **M-DEP-03** — Cadena dompurify / mermaid-cli  
6. **M-DEP-06** — Cypress en CI  
7. **M-DEP-10** — Evidencias SonarCloud  
8. **M-DEP-15** — Dependabot  

### Fase 3 — Medio plazo (1 mes)

9. **M-DEP-04** — Evaluación upgrade Vite major  
10. **M-DEP-07** — Migración ESLint 9  
11. **M-DEP-09** — Optimización bundle Recharts  

### Fase 4 — Backlog

12. **M-DEP-08**, **M-DEP-12**, **M-DEP-13**, **M-DEP-14**

---

## Dependencias sin acción requerida

| Dependencia | Motivo |
|-------------|--------|
| express, mysql2, jsonwebtoken | Actualizadas y críticas — mantener |
| react 18.3.1 | LTS estable |
| multer, node-cron, axios, prisma | No instaladas — sin acción |
| MySQL, Railway, Vercel | Servicios PaaS — monitoreo operativo |

---

*Plan derivado de npm audit y análisis de manifiestos. No implica cambios aplicados en esta fase.*
