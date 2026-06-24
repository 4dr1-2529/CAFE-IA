# OWASP Top 10 – Paso 4: Planificador OWASP

Actúa como **Arquitecto de Software Senior**, **Especialista en Ciberseguridad**, **Auditor OWASP Top 10**, **Ingeniero DevSecOps**, **Ingeniero QA** y **Evaluador ICACIT**.

## Restricciones

* No modificar ningún archivo del proyecto CAFE-IA.
* No eliminar archivos.
* No corregir código.
* No inventar vulnerabilidades.
* Analizar únicamente el proyecto existente.
* Basar toda la planificación en información real del sistema.
* Toda la documentación deberá quedar lista para anexarse al informe final.

Generar automáticamente toda la documentación dentro de:

```text
Plan-de-Pruebas/
└──01_FURPS_OWASP/
    └──04_Planificador_OWASP/
```

---

# Objetivo

Planificar completamente la auditoría de seguridad del proyecto **CAFE-IA** utilizando la metodología **OWASP Top 10 (2021)**, definiendo el alcance, los componentes a evaluar, las evidencias requeridas y los criterios de aceptación.

---

# Analizar el proyecto

Identificar los componentes que serán evaluados:

* Frontend React + Vite
* Backend Express
* API REST
* MySQL
* JWT
* Middleware
* Roles y permisos
* Railway
* Vercel
* Variables de entorno
* Configuración
* Login
* Chatbot IA
* Reportes
* Dashboard
* Auditoría
* Trazabilidad

---

# Planificar la evaluación de OWASP Top 10

Evaluar los siguientes riesgos:

## A01 – Broken Access Control

* Roles
* Permisos
* JWT
* Middleware
* Acceso a módulos

---

## A02 – Cryptographic Failures

* Contraseñas
* JWT
* Hash
* Variables sensibles
* HTTPS

---

## A03 – Injection

* SQL Injection
* NoSQL Injection
* XSS
* Command Injection

---

## A04 – Insecure Design

* Arquitectura
* Validaciones
* Diseño seguro
* Flujo de autenticación

---

## A05 – Security Misconfiguration

* Railway
* Vercel
* Variables de entorno
* CORS
* Helmet
* Rate Limit

---

## A06 – Vulnerable Components

* npm
* Dependencias
* Librerías
* Versiones

---

## A07 – Identification and Authentication Failures

* Login
* JWT
* Expiración
* Roles
* Recuperación

---

## A08 – Software and Data Integrity Failures

* Integridad
* Build
* CI/CD
* Dependencias
* Configuración

---

## A09 – Security Logging and Monitoring Failures

* Logs
* Auditoría
* Monitoreo
* Eventos

---

## A10 – Server-Side Request Forgery (SSRF)

* APIs
* Requests externos
* Configuración
* Servicios remotos

---

# Definir

Para cada categoría indicar:

* Objetivo.
* Componentes involucrados.
* Evidencias necesarias.
* Herramientas de validación.
* Riesgo esperado.
* Nivel de criticidad.

---

# Herramientas a utilizar

Planificar el uso de:

* SonarQube
* npm audit
* OWASP Top 10
* Logs
* Railway
* Vercel
* Cypress
* Postman
* JMeter
* Revisión manual del código

---

# Generar

## 01_Prompt.md

Guardar exactamente este prompt.

---

## 02_Resultado_IA.md

Generar un documento indicando:

* Objetivo.
* Alcance.
* Metodología.
* Componentes.
* Riesgos.
* Herramientas.
* Evidencias.
* Plan de auditoría.

---

## 03_Mejoras.md

Generar recomendaciones para fortalecer el proceso de auditoría OWASP.

---

## 04_Conclusiones.md

Redactar una conclusión profesional explicando:

* Importancia de OWASP.
* Beneficios para el proyecto.
* Riesgos que serán evaluados.
* Cobertura de seguridad esperada.
* Aporte para la calidad del software.

No incluir instrucciones internas de IA.

---

# Evidencias

Dentro de:

```text
Evidencias/
```

Generar automáticamente:

* Plan_Auditoria_OWASP.md
* Checklist_OWASP.md
* Matriz_OWASP.md
* Matriz_OWASP.xlsx
* Cronograma_Auditoria.md
* Resumen_Ejecutivo.md
* INDICE_EVIDENCIAS.md

Copiar automáticamente las evidencias reales disponibles:

* package.json
* package-lock.json
* npm audit
* SonarQube
* README
* Configuración
* Variables de entorno
* Railway
* Vercel
* Logs
* Arquitectura
* Reportes

Si alguna evidencia no existe registrar:

"Evidencia pendiente de incorporar."

---

# Dashboard

Generar una tabla resumen indicando:

| Categoría OWASP | Estado    | Riesgo |
| --------------- | --------- | ------ |
| A01             | Pendiente | Alto   |
| A02             | Pendiente | Medio  |
| A03             | Pendiente | Alto   |
| A04             | Pendiente | Medio  |
| A05             | Pendiente | Alto   |
| A06             | Pendiente | Medio  |
| A07             | Pendiente | Alto   |
| A08             | Pendiente | Medio  |
| A09             | Pendiente | Medio  |
| A10             | Pendiente | Bajo   |

---

# Resultado esperado

Debe generarse automáticamente:

```text
04_Planificador_OWASP/

├──01_Prompt.md
├──02_Resultado_IA.md
├──03_Mejoras.md
├──04_Conclusiones.md
│
└──Evidencias/
      ├──Plan_Auditoria_OWASP.md
      ├──Checklist_OWASP.md
      ├──Cronograma_Auditoria.md
      ├──Matriz_OWASP.md
      ├──Matriz_OWASP.xlsx
      ├──Resumen_Ejecutivo.md
      └──INDICE_EVIDENCIAS.md
```

La documentación debe quedar con calidad profesional, basada únicamente en información real del proyecto CAFE-IA y preparada para continuar con la auditoría de seguridad en los siguientes pasos (Auditor OWASP y Auditor de Implementación OWASP).
