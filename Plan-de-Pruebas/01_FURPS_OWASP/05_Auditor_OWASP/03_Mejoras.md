# Plan de Mejora de Seguridad OWASP — CAFE-IA

**Proyecto:** CAFE-IA  
**Actividad:** Paso 5 — Auditor OWASP  
**Fecha:** 24 de junio de 2026  
**Orden:** Por criticidad descendente (Crítico → Alto → Medio → Bajo)

---

## Plan de remediación

| ID | Vulnerabilidad | Prioridad | Riesgo | Impacto | Solución propuesta | Beneficio esperado | Responsable |
|----|----------------|-----------|--------|---------|-------------------|-------------------|-------------|
| **OW-001** | Health expone `dbHost`, `database`, `pid` | **P1 — Inmediata** | Alto | Reconocimiento de infraestructura Railway/MySQL | Reducir respuesta `/api/health` a `{ ok: true }` o restringir por IP interna | Reduce superficie de información en producción | DevSecOps + Backend |
| **OW-002** | CORS permite cualquier `*.vercel.app` | **P1 — Inmediata** | Alto | Abuso cross-origin desde previews no controlados | Reemplazar regex amplia por lista `CORS_ORIGINS` explícita | Control estricto de orígenes autorizados | DevSecOps |
| **OW-003** | Tablas `permisos`/`rol_permisos` sin uso en API | **P1 — Inmediata** | Alto | Brecha entre diseño BD y enforcement real | Implementar middleware de permisos o eliminar tablas del esquema | Coherencia RBAC; evita falsa confianza | Arquitecto + Backend |
| **OW-004** | CVE HIGH `form-data` (backend) | **P1 — Inmediata** | Alto | CRLF injection en multipart | Ejecutar `npm audit fix`; verificar lockfile; re-ejecutar audit | Elimina CVE HIGH documentado | DevSecOps |
| **OW-005** | CVE frontend (react-router, esbuild, js-yaml) | **P2 — Corto plazo** | Medio | Open redirect; exposición dev server | Actualizar `react-router-dom`; evaluar upgrade Vite; `npm audit fix` | Reduce superficie en SPA y toolchain | Frontend + DevSecOps |
| **OW-006** | JWT y refresh en `localStorage` | **P2 — Corto plazo** | Medio | Robo de sesión ante XSS | Migrar a cookies `httpOnly`, `Secure`, `SameSite=Strict` + CSRF | Mitiga impacto de XSS en tokens | Frontend + Backend |
| **OW-007** | Registro público acepta `rol` en body | **P2 — Corto plazo** | Medio | Escalación a admin si `ALLOW_PUBLIC_REGISTER=true` | Ignorar `rol` en `AuthService.register`; asignar siempre `cliente` | Previene auto-promoción de privilegios | Backend |
| **OW-008** | Sin endpoint `POST /auth/refresh` | **P2 — Corto plazo** | Medio | Access token 8h sin rotación segura | Implementar refresh con validación hash en `sesiones` y revocación | Ciclo de vida de sesión completo | Backend |
| **OW-009** | `npm audit` CI con `continue-on-error` | **P2 — Corto plazo** | Medio | Despliegue con dependencias vulnerables | Eliminar `continue-on-error`; fallar en `--audit-level=high` | Gate de seguridad en pipeline | DevSecOps |
| **OW-010** | Política contraseña mínima 6 caracteres | **P3 — Medio plazo** | Medio | Credenciales débiles; fuerza bruta | Mínimo 12 caracteres; mayúscula, número, símbolo | Fortalece autenticación | Backend + QA |
| **OW-011** | `LoteService.create` sin transacción SQL | **P3 — Medio plazo** | Medio | Inconsistencia de datos multi-tabla | Envolver inserciones en `BEGIN`/`COMMIT`/`ROLLBACK` | Integridad operativa (A08) | Backend |
| **OW-012** | Sin recuperación de contraseña | **P4 — Largo plazo** | Bajo | Usuarios bloqueados sin auto-servicio | Flujo forgot-password con token temporal y email | Continuidad operativa | Backend + Frontend |
| **OW-013** | Sin monitoreo centralizado (APM/SIEM) | **P4 — Largo plazo** | Bajo | Detección tardía de incidentes | Integrar alertas Railway; agregar agregador de logs | Visibilidad A09 | DevSecOps |
| **OW-014** | `ADMIN_SEED_PASSWORD=admin123` en ejemplo | **P4 — Largo plazo** | Bajo | Riesgo si se replica en producción | Documentar password fuerte obligatorio; validar en migrate | Reduce riesgo de credenciales seed | DevSecOps |
| **OW-015** | `SKIP_INTEGRATION=1` en CI | **P4 — Largo plazo** | Bajo | Menor cobertura tests auth integración | Job CI con servicio MySQL y tests integración | Regresiones detectadas temprano | QA + DevSecOps |

---

## Resumen por prioridad

| Prioridad | Cantidad | IDs | Plazo sugerido |
|-----------|----------|-----|----------------|
| P1 — Inmediata | 4 | OW-001 a OW-004 | 1–2 semanas |
| P2 — Corto plazo | 5 | OW-005 a OW-009 | 2–4 semanas |
| P3 — Medio plazo | 2 | OW-010, OW-011 | 1–2 meses |
| P4 — Largo plazo | 4 | OW-012 a OW-015 | Backlog |

---

## Impacto esperado post-remediación

| Métrica actual | Objetivo Paso 06 |
|----------------|------------------|
| Cumplimiento OWASP global 76 % | ≥ 85 % |
| Hallazgos Altos abiertos: 4 | 0 |
| A05 Security Misconfiguration 68 % | ≥ 85 % |
| A06 Vulnerable Components 55 % | ≥ 80 % |
| A07 Auth Failures 72 % | ≥ 85 % |

---

## Verificación en Paso 06

Cada mejora deberá verificarse en el **Auditor de Implementación OWASP** con:

1. Evidencia de código o configuración actualizada.
2. Re-ejecución de `npm audit` sin CVE HIGH.
3. Captura de health endpoint sin campos sensibles.
4. Test de regresión auth (401/403) en CI.

---

*Plan de mejora derivado de auditoría OWASP Paso 05 — sin modificación de código en esta fase.*
