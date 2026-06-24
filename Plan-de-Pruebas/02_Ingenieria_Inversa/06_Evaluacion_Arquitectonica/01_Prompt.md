# Ingeniería Inversa – Paso 6: Evaluación Arquitectónica

Actúa como **Arquitecto de Software Senior**, **Consultor en Arquitectura Empresarial**, **Ingeniero de Calidad de Software**, **Especialista en Ingeniería Inversa** y **Evaluador ICACIT**.

## Restricciones

* No modificar ningún archivo del proyecto CAFE-IA.
* No eliminar archivos.
* No corregir código.
* No inventar componentes ni arquitectura.
* Evaluar únicamente la arquitectura realmente implementada.
* Si algún elemento no existe, indicarlo claramente.
* No escribir instrucciones internas de IA dentro de los documentos finales.
* Toda la documentación debe tener formato profesional listo para anexarse al informe.

Toda la documentación deberá generarse automáticamente dentro de:

```text
Plan-de-Pruebas/
└──02_Ingenieria_Inversa/
    └──06_Evaluacion_Arquitectonica/
```

---

# Archivos a generar

## 01_Prompt.md

Guardar exactamente el prompt utilizado.

---

## 02_Resultado_IA.md

Realizar una evaluación integral de la arquitectura del proyecto considerando los siguientes atributos de calidad:

### Calidad Arquitectónica

* Modularidad
* Cohesión
* Acoplamiento
* Escalabilidad
* Mantenibilidad
* Reutilización
* Flexibilidad
* Disponibilidad
* Seguridad
* Rendimiento
* Robustez
* Extensibilidad
* Testabilidad
* Observabilidad

### Evaluar

* Organización del Backend
* Organización del Frontend
* Organización de la Base de Datos
* Arquitectura Hexagonal
* Arquitectura REST
* Organización de carpetas
* Separación de responsabilidades
* Flujo de dependencias
* Gestión de configuración
* Integración con IA
* Integración Railway
* Integración Vercel

Para cada atributo indicar:

* Descripción
* Evidencia encontrada
* Nivel de cumplimiento
* Riesgos
* Impacto
* Observaciones

---

## 03_Mejoras.md

Generar un plan de mejora arquitectónica indicando:

* ID
* Atributo evaluado
* Hallazgo
* Problema
* Riesgo
* Impacto
* Prioridad
* Recomendación
* Responsable
* Esfuerzo

Incluir además:

* Mejoras de diseño
* Mejoras de rendimiento
* Mejoras de seguridad
* Mejoras de mantenibilidad
* Mejoras de escalabilidad

---

## 04_Conclusiones.md

Redactar una conclusión profesional indicando:

* Estado general de la arquitectura.
* Nivel de calidad arquitectónica.
* Principales fortalezas.
* Principales debilidades.
* Riesgos arquitectónicos.
* Recomendaciones futuras.
* Nivel de madurez arquitectónica.

No incluir instrucciones para IA.

---

## 05_Trazabilidad.md

Documentar:

* Objetivo.
* Componentes evaluados.
* Archivos revisados.
* Criterios utilizados.
* Evidencias recopiladas.
* Documentos generados.
* Fecha.

---

# Carpeta Evidencias

Dentro de:

```text
Evidencias/
```

Generar automáticamente:

* Matriz_Evaluacion_Arquitectonica.xlsx
* Matriz_Evaluacion_Arquitectonica.md
* Matriz_Atributos_Calidad.xlsx
* Matriz_Atributos_Calidad.md
* Checklist_Arquitectura.md
* Resumen_Ejecutivo.md
* INDICE_EVIDENCIAS.md

Si existen, copiar automáticamente:

* Diagramas UML.
* Diagramas Mermaid.
* Diagramas de Arquitectura.
* README técnicos.
* Evidencias SonarCloud.
* Evidencias JMeter.
* Evidencias Cypress.
* Configuraciones Railway.
* Configuraciones Vercel.
* schema.sql.
* Archivos de arquitectura.

Si no existen registrar:

> Evidencia pendiente de incorporar.

---

# Matriz de Evaluación Arquitectónica

Generar una matriz con:

* ID
* Atributo
* Evidencia
* Nivel de cumplimiento
* Riesgo
* Recomendación
* Estado

Generarla en:

* Markdown
* Excel

---

# Matriz de Atributos de Calidad

Evaluar como mínimo:

* Mantenibilidad
* Escalabilidad
* Disponibilidad
* Rendimiento
* Seguridad
* Usabilidad
* Reutilización
* Robustez
* Testabilidad
* Modularidad

Asignar una valoración:

* Excelente
* Buena
* Aceptable
* Deficiente

Justificar cada valoración con evidencia encontrada.

---

# Checklist Arquitectónico

Generar automáticamente un checklist indicando:

* Cumple
* Cumple parcialmente
* No cumple

Para cada criterio arquitectónico evaluado.

---

# Resumen Ejecutivo

Generar un resumen indicando:

* Número de atributos evaluados.
* Atributos que cumplen.
* Atributos con oportunidades de mejora.
* Riesgos arquitectónicos.
* Calidad general del diseño.
* Nivel de madurez del proyecto.

---

# Resultado esperado

Al finalizar deberán existir automáticamente:

```text
06_Evaluacion_Arquitectonica/

├──01_Prompt.md
├──02_Resultado_IA.md
├──03_Mejoras.md
├──04_Conclusiones.md
├──05_Trazabilidad.md
│
└──Evidencias/
      ├──Matriz_Evaluacion_Arquitectonica.xlsx
      ├──Matriz_Evaluacion_Arquitectonica.md
      ├──Matriz_Atributos_Calidad.xlsx
      ├──Matriz_Atributos_Calidad.md
      ├──Checklist_Arquitectura.md
      ├──Resumen_Ejecutivo.md
      ├──INDICE_EVIDENCIAS.md
      └──(copias de evidencias reales encontradas)
```

Toda la documentación deberá quedar lista para anexarse directamente al informe de evaluación de evidencias ICACIT y basarse únicamente en la arquitectura realmente implementada del proyecto CAFE-IA.
