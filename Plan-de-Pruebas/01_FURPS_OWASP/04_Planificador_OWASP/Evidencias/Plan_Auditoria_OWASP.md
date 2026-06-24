# Plan de Auditoría OWASP Top 10 (2021) — CAFE-IA

**Versión:** 1.0  
**Fecha:** 24 de junio de 2026  
**Estado:** Planificación (Paso 04)

---

## 1. Propósito

Ejecutar una auditoría de seguridad estructurada del proyecto CAFE-IA conforme al OWASP Top 10 (2021), documentando hallazgos, evidencias y recomendaciones para los Pasos 05 y 06.

---

## 2. Alcance técnico

| Capa | Tecnología | Ubicación |
|------|------------|-----------|
| Frontend | React 18, Vite, Tailwind | `cafe-cursor/frontend/` |
| Backend | Node.js, Express, arquitectura hexagonal | `cafe-cursor/backend/` |
| Base de datos | MySQL (Railway) | `database/schema.sql` |
| Auth | JWT + bcrypt | `AuthService.js`, `auth.js` |
| Despliegue | Railway (API), Vercel (SPA) | Health, vercel.json |

---

## 3. Equipo y roles

| Rol | Responsabilidades |
|-----|-------------------|
| Arquitecto de Software | Alcance, A04, revisión arquitectura |
| Especialista Ciberseguridad | A01–A03, A07, threat modeling |
| DevSecOps | A05, A06, A08, CI/CD, despliegue |
| Ingeniero QA | Cypress, JMeter, evidencias |
| Evaluador ICACIT | Trazabilidad, informe final |

---

## 4. Fases de ejecución

### Fase 1 — Preparación (Día 1)

- [ ] Validar acceso a repositorio y entornos (dev, staging/prod)
- [ ] Completar inventario de evidencias (`INDICE_EVIDENCIAS.md`)
- [ ] Revisar checklist OWASP (`Checklist_OWASP.md`)
- [ ] Confirmar credenciales de prueba (admin/cliente)

### Fase 2 — Análisis estático (Días 2–3)

- [ ] Revisión `auth.js`, `rbac.js`, `env.js`, `app.js`
- [ ] Análisis repositorios SQL (parametrización)
- [ ] SonarCloud / `CORRECCIONES_SONARQUBE.md`
- [ ] `npm audit` backend y frontend
- [ ] Revisión `ci.yml`, `vercel.json`, variables `.env.example`

### Fase 3 — Pruebas dinámicas (Días 4–5)

- [ ] Cypress: login, rutas protegidas, logout
- [ ] Postman: 401 sin token, 403 rol incorrecto, IDOR cliente
- [ ] Verificación headers: helmet, CORS, rate-limit
- [ ] Health endpoint: datos expuestos

### Fase 4 — Configuración y despliegue (Día 6)

- [ ] Railway: HTTPS, variables entorno, health response
- [ ] Vercel: SPA routing, headers seguridad
- [ ] JMeter: comportamiento bajo carga (complementario)

### Fase 5 — Consolidación (Día 7)

- [ ] Registrar hallazgos OW-001 en adelante
- [ ] Actualizar matriz y dashboard
- [ ] Redactar informe Paso 05
- [ ] Definir plan remediación Paso 06

---

## 5. Categorías OWASP y actividades

| ID | Categoría | Actividades clave | Evidencia esperada |
|----|-----------|-------------------|-------------------|
| A01 | Broken Access Control | Matriz rol×endpoint; pruebas IDOR; revisión `readGuard` | Tests 401/403, Cypress |
| A02 | Cryptographic Failures | bcrypt, JWT config, TLS prod | env.js, AuthService |
| A03 | Injection | SQL grep; validators; Sonar SQLi | CORRECCIONES_SONAR, repos |
| A04 | Insecure Design | Flujo auth; permisos BD vs API | arquitectura.mmd, schema |
| A05 | Security Misconfiguration | CORS, helmet, health, env | app.js, health JSON |
| A06 | Vulnerable Components | npm audit; versiones locks | npm_audit_*.txt |
| A07 | Auth Failures | Login, refresh, expiración, seed | npm_test, Cypress |
| A08 | Integrity Failures | CI SHA, locks, audit CI | ci.yml, package-lock |
| A09 | Logging Failures | auditMiddleware, auditoria_logs | Código + consulta BD |
| A10 | SSRF | Grep requests salientes | Revisión chatbot/reportes |

---

## 6. Criterios de aceptación por fase

| Fase | Criterio de cierre |
|------|-------------------|
| F1 | 100 % checklist pre-auditoría completado |
| F2 | Matriz A01–A10 con columna «Evidencia» poblada |
| F3 | ≥ 90 % rutas API probadas con auth negativa/positiva |
| F4 | Informe headers prod documentado |
| F5 | Informe Paso 05 con hallazgos clasificados |

---

## 7. Entregables

| Entregable | Ubicación |
|------------|-----------|
| Matriz OWASP | `Matriz_OWASP.md`, `Matriz_OWASP.xlsx` |
| Checklist | `Checklist_OWASP.md` |
| Cronograma | `Cronograma_Auditoria.md` |
| Resumen ejecutivo | `Resumen_Ejecutivo.md` |
| Índice evidencias | `INDICE_EVIDENCIAS.md` |
| Informe auditoría | `05_Auditor_OWASP/` (siguiente paso) |

---

## 8. Riesgos del proceso de auditoría

| Riesgo | Mitigación |
|--------|------------|
| Entorno prod no disponible | Usar dev local + health Railway documentado |
| Evidencias Sonar/ZAP pendientes | Marcar en índice; no bloquear otras categorías |
| Credenciales seed en prod | Probar solo en entorno controlado |
| Falsos positivos SQLi Sonar | Verificar parametrización manual en repos |

---

*Plan de auditoría — listo para ejecución en Paso 05.*
