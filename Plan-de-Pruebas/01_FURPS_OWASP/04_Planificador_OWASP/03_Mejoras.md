# Mejoras al Proceso de Auditoría OWASP — CAFE-IA

**Proyecto:** CAFE-IA  
**Actividad:** Paso 4 — Planificador OWASP  
**Fecha:** 24 de junio de 2026

---

## 1. Fortalecimiento metodológico

| # | Mejora | Justificación | Prioridad |
|---|--------|---------------|-----------|
| M1 | Adoptar **OWASP ASVS 4.0** como checklist complementario al Top 10 | Mayor granularidad en controles de autenticación (V2) y acceso (V4) | Alta |
| M2 | Integrar **OWASP ZAP baseline scan** en CI contra staging | Detección DAST automatizada de XSS, headers, cookies | Alta |
| M3 | Documentar **modelo de amenazas STRIDE** por módulo (auth, reportes, chatbot) | A04 requiere evidencia de diseño seguro explícito | Media |
| M4 | Definir **matriz de roles vs endpoints** antes del Paso 05 | Facilita A01 y evita omisiones en IDOR | Alta |
| M5 | Establecer **criterio de bloqueo CI**: `npm audit --audit-level=high` sin `continue-on-error` | Alinea A06/A08 con política de cero HIGH | Alta |

---

## 2. Herramientas y automatización

| # | Mejora | Herramienta sugerida | Categoría |
|---|--------|---------------------|-----------|
| M6 | Exportar informe SonarCloud en cada PR | SonarCloud API / webhook | A03, A06 |
| M7 | Ejecutar **Semgrep** con reglas `p/owasp-top-ten` en CI | Semgrep OSS | A01–A03 |
| M8 | Añadir pruebas Cypress de **escalación de privilegios** (cliente→admin) | Cypress | A01 |
| M9 | Colección Postman con tests de **401/403/404** por ruta | Newman en CI | A01, A07 |
| M10 | Escaneo de secretos con **gitleaks** o `trufflehog` | gitleaks | A02, A05 |

---

## 3. Evidencias y trazabilidad

| # | Mejora | Descripción |
|---|--------|-------------|
| M11 | Crear plantilla única de hallazgo OW-xxx (ID, categoría, CVSS, evidencia, remediación) | Consistencia entre Pasos 05 y 06 |
| M12 | Vincular cada hallazgo OWASP con hallazgo FUR/IMP existente | Evita duplicación y refuerza trazabilidad ICACIT |
| M13 | Incorporar capturas de headers HTTP (helmet, CORS, HSTS) de Railway y Vercel | Evidencia tangible A05 |
| M14 | Registrar hash SHA-256 de `package-lock.json` en cada release | A08 integridad cadena suministro |
| M15 | Mantener registro de versiones desplegadas (Railway revision, Vercel deployment ID) | Correlación incidentes |

---

## 4. Alcance y profundidad

| # | Mejora | Área |
|---|--------|------|
| M16 | Evaluar **JWT en localStorage** vs httpOnly cookies (análisis de riesgo XSS→robo token) | A02, A07 |
| M17 | Auditar endpoint `/api/base-datos` (solo admin, exposición esquema) | A01, A05 |
| M18 | Revisar `ALLOW_PUBLIC_REGISTER` y `ADMIN_SEED_PASSWORD` en escenarios producción | A04, A07 |
| M19 | Validar rate-limit bajo JMeter (500 req/15min) frente a fuerza bruta login | A05, A07 |
| M20 | Confirmar ausencia de SSRF en evoluciones futuras (integraciones ML externas) | A10 |

---

## 5. Gobernanza y continuidad

| # | Mejora | Beneficio |
|---|--------|-----------|
| M21 | Calendario de re-auditoría OWASP semestral | Mantener cobertura ante nuevas dependencias |
| M22 | Responsable de seguridad designado por sprint | Revisión de PRs con impacto en auth/config |
| M23 | Tablero de seguimiento CVE (Dependabot + npm audit) | Respuesta rápida A06 |
| M24 | Capacitación equipo en OWASP Top 10 y secure coding Node/React | Reduce regresiones A03/A07 |
| M25 | Incluir escenarios de auditoría en documentación de onboarding | Sostenibilidad del proceso |

---

## 6. Mejoras derivadas de hallazgos FUR/IMP conocidos

| Hallazgo previo | Acción en auditoría OWASP |
|-----------------|---------------------------|
| Permisos BD sin enforcement (IMP-H004) | Caso de prueba A01: verificar que API ignora tabla `permisos` y documentar brecha de diseño |
| Health expone dbHost (IMP-H013) | Caso A05: comparar respuesta health prod vs recomendación OWASP |
| CVE form-data HIGH | Caso A06: verificar si dependencia es directa o transitiva y plan upgrade |
| CI audit no bloqueante (IMP-H003) | Caso A08: evaluar riesgo de despliegue con CVE conocidos |
| SQL reportes corregido (Sonar) | Caso A03: regresión — confirmar parametrización permanece |

---

## 7. Próximos pasos recomendados

1. Ejecutar Paso 05 (Auditor OWASP) con checklist y matriz de este planificador.
2. Incorporar evidencias pendientes (ZAP, Sonar export, Postman) antes de Fase 3.
3. Priorizar remediación de CVE HIGH (form-data) y controles A01/A05 en Paso 06.
4. Actualizar dashboard de categorías de «Pendiente» a «Evaluado» con porcentaje de cumplimiento.

---

*Recomendaciones orientadas a fortalecer el proceso de auditoría; no implican cambios al código en esta fase.*
