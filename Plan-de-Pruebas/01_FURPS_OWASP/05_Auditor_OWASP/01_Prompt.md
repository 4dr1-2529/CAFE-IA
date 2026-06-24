# OWASP Top 10 – Paso 5: Auditor OWASP

Actúa como **Arquitecto de Software Senior**, **Especialista en Ciberseguridad**, **Auditor OWASP Top 10**, **Ingeniero DevSecOps**, **Especialista en Seguridad Web** y **Evaluador ICACIT**.

## Restricciones

* No modificar ningún archivo del proyecto CAFE-IA.
* No eliminar archivos.
* No corregir código.
* No inventar vulnerabilidades.
* Analizar únicamente información real del proyecto.
* Utilizar únicamente evidencias obtenidas del código fuente, configuración, documentación y despliegue.
* Toda la documentación deberá quedar lista para anexarse al informe final.

Toda la documentación deberá generarse automáticamente dentro de:

```text id="s7q8ow"
Plan-de-Pruebas/
└──01_FURPS_OWASP/
    └──05_Auditor_OWASP/
```

---

# Objetivo

Realizar una auditoría completa de seguridad del proyecto **CAFE-IA** utilizando el estándar **OWASP Top 10 (2021)** para identificar vulnerabilidades, riesgos, fortalezas y oportunidades de mejora.

---

# Evaluar completamente

## A01 – Broken Access Control

Verificar:

* Roles
* Permisos
* JWT
* Middleware
* Protección de rutas
* Autorización
* Acceso a APIs
* Acceso por módulos

Determinar:

* Cumple
* Cumple parcialmente
* No cumple

---

## A02 – Cryptographic Failures

Analizar:

* Hash de contraseñas
* bcrypt
* JWT
* Variables sensibles
* HTTPS
* Secretos
* Tokens

---

## A03 – Injection

Buscar:

* SQL Injection
* XSS
* Command Injection
* Inyección en consultas
* Parámetros inseguros

---

## A04 – Insecure Design

Evaluar:

* Arquitectura
* Flujo de autenticación
* Validaciones
* Diseño seguro
* Separación de responsabilidades

---

## A05 – Security Misconfiguration

Verificar:

* Helmet
* CORS
* Variables de entorno
* Railway
* Vercel
* Configuración Express
* Rate Limit

---

## A06 – Vulnerable and Outdated Components

Revisar:

* npm audit
* package.json
* package-lock.json
* Librerías
* Dependencias
* Versiones

---

## A07 – Identification and Authentication Failures

Evaluar:

* Login
* JWT
* Roles
* Expiración
* Recuperación
* Autenticación

---

## A08 – Software and Data Integrity Failures

Analizar:

* Build
* Integridad
* Dependencias
* Configuración
* Pipeline
* Despliegue

---

## A09 – Security Logging and Monitoring Failures

Verificar:

* Logs
* Auditoría
* Historial
* Eventos
* Monitoreo

---

## A10 – SSRF

Verificar:

* Consumo de APIs
* Requests externos
* Servicios remotos
* Configuración

---

# Clasificar

Cada hallazgo deberá clasificarse como:

* Crítico
* Alto
* Medio
* Bajo

Indicando:

* ID
* Vulnerabilidad
* Evidencia
* Riesgo
* Impacto
* Recomendación

---

# Calcular

Asignar porcentaje de cumplimiento para:

* Seguridad Backend
* Seguridad Frontend
* Seguridad API
* Seguridad Infraestructura
* Seguridad Base de Datos
* Seguridad General

---

# Generar

## 01_Prompt.md

Guardar exactamente este prompt.

---

## 02_Resultado_IA.md

Generar un informe completo indicando:

* Metodología.
* Evaluación OWASP.
* Resultado por categoría.
* Vulnerabilidades encontradas.
* Riesgos.
* Evidencias.
* Nivel de seguridad alcanzado.
* Estado general del proyecto.

---

## 03_Mejoras.md

Generar un plan de mejora indicando:

* ID
* Vulnerabilidad
* Prioridad
* Riesgo
* Impacto
* Solución propuesta
* Beneficio esperado
* Responsable

Ordenar por criticidad.

---

## 04_Conclusiones.md

Redactar una conclusión profesional (1–2 páginas) indicando:

* Nivel de seguridad alcanzado.
* Fortalezas del proyecto.
* Vulnerabilidades detectadas.
* Riesgos principales.
* Nivel de cumplimiento OWASP.
* Recomendaciones para fortalecer la seguridad.
* Estado general del software desde el punto de vista de la ciberseguridad.

Esta conclusión debe quedar lista para incorporarse directamente al informe final.

---

# Evidencias

Dentro de:

```text id="b7m2ow"
Evidencias/
```

Generar automáticamente:

* Matriz_OWASP.md
* Matriz_OWASP.xlsx
* Matriz_Vulnerabilidades.md
* Matriz_Vulnerabilidades.xlsx
* Checklist_OWASP.md
* Dashboard_Seguridad.md
* Resumen_Ejecutivo.md
* INDICE_EVIDENCIAS.md

Copiar automáticamente todas las evidencias reales disponibles:

* package.json
* package-lock.json
* npm audit
* SonarQube
* Logs
* Configuración Railway
* Configuración Vercel
* Variables de entorno
* README
* Diagramas
* Reportes técnicos

Si alguna evidencia no existe registrar:

"Evidencia pendiente de incorporar."

---

# Dashboard Final

Generar una tabla resumen:

| Categoría OWASP | Cumplimiento | Riesgo |
| --------------- | ------------ | ------ |
| A01             | XX %         | Alto   |
| A02             | XX %         | Bajo   |
| A03             | XX %         | Medio  |
| A04             | XX %         | Bajo   |
| A05             | XX %         | Medio  |
| A06             | XX %         | Bajo   |
| A07             | XX %         | Medio  |
| A08             | XX %         | Bajo   |
| A09             | XX %         | Bajo   |
| A10             | XX %         | Bajo   |

Calcular además:

* Nivel general de seguridad.
* Riesgo global.
* Madurez de seguridad.

---

# Resultado esperado

Debe generarse automáticamente:

```text id="g3p4ow"
05_Auditor_OWASP/

├──01_Prompt.md
├──02_Resultado_IA.md
├──03_Mejoras.md
├──04_Conclusiones.md
│
└──Evidencias/
      ├──Matriz_OWASP.md
      ├──Matriz_OWASP.xlsx
      ├──Matriz_Vulnerabilidades.md
      ├──Matriz_Vulnerabilidades.xlsx
      ├──Checklist_OWASP.md
      ├──Dashboard_Seguridad.md
      ├──Resumen_Ejecutivo.md
      └──INDICE_EVIDENCIAS.md
```

La documentación debe tener calidad profesional, utilizar únicamente información real del proyecto CAFE-IA, basarse en evidencias verificables y quedar lista para anexarse al informe final y a la evaluación de evidencias ICACIT.
