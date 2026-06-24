# FURPS+ – Paso 3: Auditor de Implementación FURPS+

Actúa como **Arquitecto de Software Senior**, **Auditor de Calidad de Software**, **Especialista en Implementación FURPS+**, **Ingeniero QA**, **Especialista DevOps** y **Evaluador ICACIT**.

## Restricciones

* No modificar ningún archivo del proyecto CAFE-IA.
* No eliminar archivos.
* No corregir código.
* No inventar funcionalidades.
* Analizar únicamente el código y documentación existente.
* Basar todas las conclusiones en evidencia real.
* No escribir instrucciones internas de IA dentro de los documentos.

Toda la documentación deberá generarse automáticamente dentro de:

```text
Plan-de-Pruebas/
└──01_FURPS_OWASP/
    └──03_Auditor_Implementacion_FURPS/
```

---

# Objetivo

Verificar si la implementación real del proyecto **CAFE-IA** cumple con los atributos definidos por el modelo **FURPS+**, evaluando el código fuente, la arquitectura, la base de datos, la infraestructura, las pruebas realizadas y el despliegue.

---

# Analizar completamente

## Frontend

Evaluar:

* React + Vite
* Componentes
* Hooks
* Navegación
* Interfaces
* Formularios
* Validaciones
* Manejo de errores
* Organización del código

---

## Backend

Evaluar:

* Express
* Controladores
* Servicios
* Middleware
* JWT
* Roles
* Seguridad
* API REST
* Modularidad
* Manejo de errores

---

## Base de datos

Analizar:

* Modelo relacional
* Integridad
* Relaciones
* Claves foráneas
* Índices
* Consultas
* Normalización
* Consistencia

---

## Infraestructura

Evaluar:

* Railway
* Vercel
* Variables de entorno
* Build
* Deploy
* Configuración

---

## Calidad

Verificar:

* Cypress
* SonarQube
* JMeter
* Logs
* Reportes
* Evidencias

---

# Verificar implementación FURPS+

## Functionality

Comparar:

Funcionalidad planificada

vs

Funcionalidad implementada

Indicar:

* Cumple
* Cumple parcialmente
* No cumple

---

## Usability

Verificar:

* Interfaz
* Flujo
* Diseño
* Accesibilidad
* Validaciones
* Navegación

---

## Reliability

Verificar:

* Manejo de errores
* Disponibilidad
* Recuperación
* Robustez
* Integridad

---

## Performance

Verificar:

* Tiempo de respuesta
* Rendimiento
* Optimización
* Consultas
* API
* Build

---

## Supportability

Verificar:

* Arquitectura
* Modularidad
* Documentación
* Escalabilidad
* Reutilización
* Mantenimiento

---

## +

Evaluar además:

* Seguridad
* Compatibilidad
* Configuración
* Instalación
* Portabilidad
* Monitoreo

---

# Hallazgos

Para cada incumplimiento indicar:

* ID
* Descripción
* Evidencia
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

* Objetivo
* Metodología
* Componentes revisados
* Evidencias utilizadas
* Comparación entre diseño e implementación
* Cumplimiento FURPS+
* Hallazgos encontrados
* Estado del proyecto
* Nivel de implementación alcanzado

---

## 03_Mejoras.md

Generar un plan de mejoras indicando:

* ID
* Área
* Problema
* Prioridad
* Impacto
* Solución
* Beneficio esperado
* Responsable

Ordenar de mayor a menor prioridad.

---

## 04_Conclusiones.md

Redactar una conclusión profesional de aproximadamente dos páginas indicando:

* Nivel de implementación alcanzado.
* Grado de cumplimiento de FURPS+.
* Calidad del desarrollo.
* Calidad de la arquitectura.
* Calidad del despliegue.
* Calidad de las pruebas.
* Calidad de la documentación.
* Fortalezas del proyecto.
* Debilidades encontradas.
* Recomendaciones para mejorar la implementación.

Esta conclusión debe estar lista para incorporarse directamente al informe final.

---

# Evidencias

Dentro de:

```text
Evidencias/
```

Generar automáticamente:

* Matriz_Implementacion_FURPS.md
* Matriz_Implementacion_FURPS.xlsx
* Matriz_Hallazgos.md
* Matriz_Hallazgos.xlsx
* Checklist_Implementacion.md
* Dashboard_Implementacion.md
* Resumen_Ejecutivo.md
* Comparativo_Diseno_vs_Implementacion.md
* INDICE_EVIDENCIAS.md

Copiar automáticamente todas las evidencias reales disponibles:

* README
* Diagramas
* SonarQube
* Cypress
* Railway
* Vercel
* JMeter
* Logs
* Reportes
* Configuración
* Arquitectura
* Base de datos

Si alguna evidencia no existe registrar:

"Evidencia pendiente de incorporar."

---

# Dashboard Final

Generar una tabla resumen:

| Área                   | Cumplimiento | Estado |
| ---------------------- | ------------ | ------ |
| Frontend               | XX %         | Cumple |
| Backend                | XX %         | Cumple |
| Base de Datos          | XX %         | Cumple |
| Seguridad              | XX %         | Cumple |
| Arquitectura           | XX %         | Cumple |
| Infraestructura        | XX %         | Cumple |
| Despliegue             | XX %         | Cumple |
| Calidad                | XX %         | Cumple |
| Implementación General | XX %         | Cumple |

---

# Resultado esperado

Debe generarse automáticamente:

```text
03_Auditor_Implementacion_FURPS/

├──01_Prompt.md
├──02_Resultado_IA.md
├──03_Mejoras.md
├──04_Conclusiones.md
│
└──Evidencias/
      ├──Matriz_Implementacion_FURPS.md
      ├──Matriz_Implementacion_FURPS.xlsx
      ├──Matriz_Hallazgos.md
      ├──Matriz_Hallazgos.xlsx
      ├──Checklist_Implementacion.md
      ├──Dashboard_Implementacion.md
      ├──Comparativo_Diseno_vs_Implementacion.md
      ├──Resumen_Ejecutivo.md
      └──INDICE_EVIDENCIAS.md
```

La documentación debe quedar con calidad profesional, basarse únicamente en evidencias reales del proyecto CAFE-IA y estar lista para anexarse al informe final y a la evaluación de evidencias ICACIT.
