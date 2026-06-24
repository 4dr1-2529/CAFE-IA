# Resumen Ejecutivo — Auditoría OWASP — CAFE-IA

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Actividad:** Paso 5 — Auditor OWASP  
**Fecha:** 24 de junio de 2026

---

## Síntesis

Se ejecutó la **auditoría de seguridad OWASP Top 10 (2021)** sobre CAFE-IA, analizando código fuente, configuración, dependencias y evidencias de despliegue **sin modificar el proyecto**. El resultado global es **76 % de cumplimiento (Bueno)**, con **15 hallazgos documentados** (4 Altos, 7 Medios, 4 Bajos, 0 Críticos).

---

## Dashboard final

| Categoría | Cumplimiento | Riesgo |
|-----------|--------------|--------|
| A01 Broken Access Control | 78 % | Alto |
| A02 Cryptographic Failures | 85 % | Medio |
| A03 Injection | 88 % | Medio |
| A04 Insecure Design | 80 % | Medio |
| A05 Security Misconfiguration | 68 % | Alto |
| A06 Vulnerable Components | 55 % | Medio |
| A07 Auth Failures | 72 % | Alto |
| A08 Data Integrity | 62 % | Medio |
| A09 Logging | 75 % | Medio |
| A10 SSRF | 95 % | Bajo |

| Indicador global | Valor |
|------------------|-------|
| Seguridad general | **76 %** |
| Riesgo global | **Medio-Alto** |
| Madurez | **Nivel 3 — Definido** |

---

## Hallazgos prioritarios (Altos)

1. **OW-001** — Health Railway expone `dbHost` y metadatos BD  
2. **OW-002** — CORS autoriza `*.vercel.app`  
3. **OW-003** — Permisos granulares en BD sin enforcement  
4. **OW-004** — CVE HIGH `form-data` en backend  

---

## Fortalezas

- JWT + bcrypt + RBAC admin/cliente operativo  
- Protección IDOR en servicios (lotes)  
- SQL parametrizado; corrección Sonar en reportes  
- Helmet, rate-limit, auditoría HTTP  
- Sin SSRF detectado en backend  
- CI con SHA pins en GitHub Actions  

---

## Dominios de seguridad

| Dominio | % |
|---------|---|
| Backend | 82 % |
| Frontend | 70 % |
| API | 77 % |
| Infraestructura | 65 % |
| Base de datos | 80 % |

---

## Próximo paso

**Paso 06 — Auditor de Implementación OWASP:** verificar remediación de OW-001 a OW-004 y elevar cumplimiento objetivo ≥ 85 %.

---

*Resumen ejecutivo — listo para informe ICACIT.*
