# Ingeniería Inversa – Paso 11: Hallazgos

Actúa como **Arquitecto de Software Senior**, **Auditor de Calidad de Software**, **Especialista en Ingeniería Inversa**, **Consultor de Arquitectura** y **Evaluador ICACIT**.

## Restricciones

* No modificar ningún archivo del proyecto CAFE-IA.
* No eliminar archivos.
* No corregir código.
* No inventar hallazgos.
* Consolidar únicamente la información obtenida en los pasos 1 al 10.
* No duplicar hallazgos ya registrados.
* No escribir instrucciones internas de IA dentro de los documentos finales.
* Toda la documentación debe tener formato profesional listo para anexarse al informe.

Toda la documentación deberá generarse automáticamente dentro de:

```text
Plan-de-Pruebas/
└──02_Ingenieria_Inversa/
    └──11_Hallazgos/
```

---

# Archivos a generar

## 01_Prompt.md

Guardar exactamente el prompt utilizado.

---

## 02_Resultado_IA.md

Consolidar todos los hallazgos identificados durante los pasos:

* Paso 1 – Análisis de Logs
* Paso 2 – Dependencias
* Paso 3 – Descubrimiento Funcional
* Paso 4 – Descubrimiento Tecnológico
* Paso 5 – Detección Arquitectónica
* Paso 6 – Evaluación Arquitectónica
* Paso 7 – Reconstrucción Arquitectónica
* Paso 8 – Reconstrucción del Dominio
* Paso 9 – Reconstrucción del Entorno
* Paso 10 – Variables de Entorno

Para cada hallazgo indicar:

* Código
* Categoría
* Descripción
* Evidencia
* Causa
* Impacto
* Riesgo
* Prioridad
* Estado
* Recomendación

Clasificar los hallazgos en:

* Arquitectura
* Calidad
* Seguridad
* Rendimiento
* Dependencias
* Infraestructura
* Configuración
* Base de Datos
* Machine Learning
* Frontend
* Backend
* DevOps

---

## 03_Mejoras.md

Generar un plan de mejora consolidado indicando:

* ID
* Hallazgo
* Acción correctiva
* Prioridad
* Impacto esperado
* Responsable
* Tiempo estimado
* Estado

Ordenar las mejoras por prioridad:

* Crítica
* Alta
* Media
* Baja

---

## 04_Conclusiones.md

Redactar una conclusión profesional indicando:

* Estado general del proyecto.
* Número total de hallazgos.
* Principales fortalezas.
* Principales debilidades.
* Riesgos críticos.
* Nivel de calidad alcanzado.
* Recomendaciones generales.
* Nivel de madurez del software.

No incluir instrucciones para IA.

---

## 05_Trazabilidad.md

Documentar:

* Objetivo.
* Pasos utilizados como fuente.
* Documentos revisados.
* Hallazgos consolidados.
* Evidencias utilizadas.
* Documentos generados.
* Fecha.

---

# Carpeta Evidencias

Dentro de:

```text
Evidencias/
```

Generar automáticamente:

* Matriz_Hallazgos.xlsx
* Matriz_Hallazgos.md
* Matriz_Riesgos.xlsx
* Matriz_Riesgos.md
* Plan_Accion.md
* Resumen_Ejecutivo.md
* Dashboard_Hallazgos.md
* INDICE_EVIDENCIAS.md

---

# Matriz de Hallazgos

Generar una matriz con:

* ID
* Categoría
* Hallazgo
* Evidencia
* Riesgo
* Impacto
* Prioridad
* Estado
* Recomendación

Generarla en:

* Markdown
* Excel

---

# Matriz de Riesgos

Generar una matriz indicando:

* Riesgo
* Probabilidad
* Impacto
* Nivel
* Mitigación
* Responsable

Clasificar:

* Crítico
* Alto
* Medio
* Bajo

---

# Dashboard de Hallazgos

Generar un resumen estadístico indicando:

* Total de hallazgos.
* Hallazgos críticos.
* Hallazgos altos.
* Hallazgos medios.
* Hallazgos bajos.
* Hallazgos corregidos.
* Hallazgos pendientes.

Presentarlo en tablas listas para anexar al informe.

---

# Resumen Ejecutivo

Generar un resumen indicando:

* Estado general del proyecto.
* Calidad arquitectónica.
* Calidad funcional.
* Calidad tecnológica.
* Riesgos identificados.
* Recomendaciones prioritarias.

---

# Copiar evidencias reales

Si existen, copiar automáticamente:

* Matrices generadas en los pasos 1–10.
* Reportes SonarCloud.
* Reportes Cypress.
* Reportes JMeter.
* Logs.
* Diagramas Mermaid.
* README técnicos.
* Evidencias de Railway.
* Evidencias de Vercel.
* Capturas disponibles.

Si alguna evidencia no existe registrar:

"Evidencia pendiente de incorporar."

---

# Resultado esperado

Al finalizar deberán existir automáticamente:

```text
11_Hallazgos/

├──01_Prompt.md
├──02_Resultado_IA.md
├──03_Mejoras.md
├──04_Conclusiones.md
├──05_Trazabilidad.md
│
└──Evidencias/
      ├──Matriz_Hallazgos.xlsx
      ├──Matriz_Hallazgos.md
      ├──Matriz_Riesgos.xlsx
      ├──Matriz_Riesgos.md
      ├──Plan_Accion.md
      ├──Dashboard_Hallazgos.md
      ├──Resumen_Ejecutivo.md
      ├──INDICE_EVIDENCIAS.md
      └──(copias de evidencias reales encontradas)
```

Toda la documentación deberá quedar lista para anexarse directamente al informe de evaluación de evidencias ICACIT. El análisis debe consolidar únicamente hallazgos reales obtenidos durante los pasos anteriores, evitando duplicidades y proporcionando una visión integral del estado del proyecto CAFE-IA.
