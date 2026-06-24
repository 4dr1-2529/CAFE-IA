# OWASP Top 10 – Paso 6: Auditor de Implementación OWASP

Actúa como **Arquitecto de Software Senior**, **Especialista en Ciberseguridad**, **Auditor OWASP Top 10**, **Ingeniero DevSecOps**, **Especialista en Seguridad Web**, **Ingeniero QA** y **Evaluador ICACIT**.

## Restricciones

* No modificar ningún archivo del proyecto CAFE-IA.
* No eliminar archivos.
* No corregir código.
* No inventar vulnerabilidades.
* Basar todas las conclusiones únicamente en evidencia real obtenida del código fuente, configuración, infraestructura y documentación.
* Toda la documentación debe quedar lista para anexarse al informe final.

Generar automáticamente toda la documentación dentro de:

```text
Plan-de-Pruebas/
└──01_FURPS_OWASP/
    └──06_Auditor_Implementacion_OWASP/
```

---

# Objetivo

Verificar si la implementación real del proyecto **CAFE-IA** cumple con las buenas prácticas de seguridad establecidas por **OWASP Top 10 (2021)**, evaluando el código fuente, la arquitectura, las configuraciones, el despliegue y las herramientas utilizadas.

---

# Analizar completamente

## Frontend

Verificar:

* Validaciones del cliente
* Manejo de sesiones
* Protección de rutas
* Manejo de errores
* Sanitización de datos
* Navegación segura

---

## Backend

Evaluar:

* Express
* Middleware
* JWT
* Roles
* Autorización
* Validaciones
* APIs REST
* Manejo de errores
* Logging

---

## Base de Datos

Verificar:

* Consultas parametrizadas
* Integridad
* Restricciones
* Relaciones
* Protección contra inyección SQL

---

## Infraestructura

Evaluar:

* Railway
* Vercel
* Variables de entorno
* Configuración del servidor
* CORS
* Helmet
* Rate Limiter

---

## Dependencias

Revisar:

* package.json
* package-lock.json
* npm audit
* Versiones
* Librerías vulnerables

---

# Evaluar implementación OWASP

## A01 – Broken Access Control

Verificar si la implementación protege correctamente:

* Roles
* Permisos
* Middleware
* Endpoints
* APIs

---

## A02 – Cryptographic Failures

Comprobar:

* bcrypt
* JWT
* Secretos
* Variables sensibles
* Tokens

---

## A03 – Injection

Verificar:

* SQL Injection
* XSS
* Command Injection
* Sanitización
* Validaciones

---

## A04 – Insecure Design

Evaluar:

* Arquitectura
* Diseño seguro
* Separación de responsabilidades
* Flujo de autenticación

---

## A05 – Security Misconfiguration

Verificar:

* Helmet
* CORS
* Variables de entorno
* Configuración Railway
* Configuración Vercel

---

## A06 – Vulnerable Components

Evaluar:

* Dependencias
* npm audit
* Librerías
* Versiones

---

## A07 – Authentication Failures

Verificar:

* Login
* JWT
* Roles
* Expiración
* Recuperación

---

## A08 – Software Integrity

Analizar:

* Integridad del proyecto
* Build
* Configuración
* Dependencias

---

## A09 – Logging & Monitoring

Verificar:

* Auditoría
* Logs
* Historial
* Monitoreo

---

## A10 – SSRF

Evaluar:

* APIs externas
* Requests remotos
* Configuración

---

# Comparación

Comparar para cada categoría:

Seguridad planificada

vs

Seguridad implementada

Clasificar:

* Cumple
* Cumple parcialmente
* No cumple

---

# Hallazgos

Para cada incumplimiento generar:

* ID
* Vulnerabilidad
* Evidencia
* Ubicación
* Riesgo
* Impacto
* Causa
* Recomendación

Clasificar:

* Crítico
* Alto
* Medio
* Bajo

---

# Generar

## 01_Prompt.md

Guardar exactamente este prompt.

---

## 02_Resultado_IA.md

Generar un informe completo indicando:

* Objetivo.
* Metodología.
* Componentes revisados.
* Evidencias utilizadas.
* Comparación entre seguridad planificada e implementada.
* Cumplimiento OWASP.
* Vulnerabilidades encontradas.
* Estado actual del proyecto.

---

## 03_Mejoras.md

Generar un plan de mejoras indicando:

* ID
* Área
* Vulnerabilidad
* Prioridad
* Impacto
* Solución propuesta
* Beneficio esperado
* Responsable

Ordenar de mayor a menor prioridad.

---

## 04_Conclusiones.md

Redactar una conclusión profesional (2 páginas aproximadamente) indicando:

* Nivel de implementación de las medidas de seguridad.
* Cumplimiento del estándar OWASP Top 10.
* Calidad de la implementación.
* Fortalezas.
* Debilidades.
* Riesgos pendientes.
* Recomendaciones para fortalecer la seguridad.
* Estado general del proyecto desde el punto de vista de la implementación de controles de seguridad.

Esta conclusión debe quedar lista para incorporarse directamente al informe final.

---

# Evidencias

Dentro de:

```text
Evidencias/
```

Generar automáticamente:

* Matriz_Implementacion_OWASP.md
* Matriz_Implementacion_OWASP.xlsx
* Matriz_Vulnerabilidades.md
* Matriz_Vulnerabilidades.xlsx
* Comparativo_Plan_vs_Implementacion.md
* Checklist_Implementacion.md
* Dashboard_Implementacion.md
* Resumen_Ejecutivo.md
* INDICE_EVIDENCIAS.md

Copiar automáticamente las evidencias reales disponibles:

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
* Reportes
* Evidencias de autenticación
* Evidencias de auditoría

Si alguna evidencia no existe registrar:

"Evidencia pendiente de incorporar."

---

# Dashboard Final

Generar una tabla resumen:

| Categoría | Cumplimiento | Estado |
| --------- | ------------ | ------ |
| A01       | XX %         | Cumple |
| A02       | XX %         | Cumple |
| A03       | XX %         | Cumple |
| A04       | XX %         | Cumple |
| A05       | XX %         | Cumple |
| A06       | XX %         | Cumple |
| A07       | XX %         | Cumple |
| A08       | XX %         | Cumple |
| A09       | XX %         | Cumple |
| A10       | XX %         | Cumple |

Calcular además:

* Nivel general de implementación de seguridad.
* Nivel de madurez de seguridad.
* Riesgo residual.
* Porcentaje de cumplimiento OWASP.

---

# Resultado esperado

Debe generarse automáticamente:

```text
06_Auditor_Implementacion_OWASP/

├──01_Prompt.md
├──02_Resultado_IA.md
├──03_Mejoras.md
├──04_Conclusiones.md
│
└──Evidencias/
      ├──Matriz_Implementacion_OWASP.md
      ├──Matriz_Implementacion_OWASP.xlsx
      ├──Matriz_Vulnerabilidades.md
      ├──Matriz_Vulnerabilidades.xlsx
      ├──Comparativo_Plan_vs_Implementacion.md
      ├──Checklist_Implementacion.md
      ├──Dashboard_Implementacion.md
      ├──Resumen_Ejecutivo.md
      └──INDICE_EVIDENCIAS.md
```

La documentación debe tener calidad profesional, utilizar únicamente información real del proyecto CAFE-IA, estar sustentada en evidencias verificables y quedar lista para anexarse al informe final y a la evaluación de evidencias ICACIT.
