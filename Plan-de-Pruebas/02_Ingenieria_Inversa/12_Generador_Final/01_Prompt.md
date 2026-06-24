# Ingeniería Inversa – Paso 12: Generador Final

Actúa como **Arquitecto de Software Senior**, **Auditor de Calidad de Software**, **Especialista en Ingeniería Inversa**, **Consultor de Documentación Técnica** y **Evaluador ICACIT**.

## Restricciones

* No modificar ningún archivo del proyecto CAFE-IA.
* No eliminar archivos.
* No corregir código.
* No inventar información.
* Consolidar únicamente la documentación generada durante los pasos 1 al 11.
* No duplicar archivos existentes.
* Si falta alguna evidencia, registrarla como "Pendiente de incorporar".
* No escribir instrucciones internas de IA dentro de los documentos finales.
* Toda la documentación debe quedar lista para anexarse directamente al informe final.

Toda la documentación deberá generarse automáticamente dentro de:

```text
Plan-de-Pruebas/
└──02_Ingenieria_Inversa/
    └──12_Generador_Final/
```

---

# Archivos a generar

## 01_Prompt.md

Guardar exactamente el prompt utilizado.

---

## 02_Resultado_IA.md

Generar un informe técnico consolidado de toda la Ingeniería Inversa realizada.

El informe debe resumir:

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
* Paso 11 – Hallazgos

Indicar para cada paso:

* Objetivo.
* Resultado obtenido.
* Documentos generados.
* Evidencias recopiladas.
* Estado (Completo / Parcial / Pendiente).

---

## 03_Mejoras.md

Generar un plan consolidado de mejoras indicando:

* ID
* Área
* Problema
* Prioridad
* Riesgo
* Impacto
* Acción recomendada
* Responsable
* Estado

Ordenar las mejoras por prioridad:

* Crítica
* Alta
* Media
* Baja

---

## 04_Conclusiones.md

Redactar una conclusión profesional indicando:

* Estado general de la Ingeniería Inversa.
* Calidad de la documentación.
* Calidad de las evidencias.
* Nivel de cobertura alcanzado.
* Riesgos pendientes.
* Recomendaciones finales.
* Nivel de madurez documental.

No incluir instrucciones para IA.

---

## 05_Trazabilidad.md

Documentar:

* Objetivo.
* Pasos consolidados.
* Carpetas revisadas.
* Documentos generados.
* Evidencias utilizadas.
* Fecha.
* Resultado final.

---

# Carpeta Evidencias

Dentro de:

```text
Evidencias/
```

Generar automáticamente:

* Checklist_Final.xlsx
* Checklist_Final.md
* Inventario_Documentos.xlsx
* Inventario_Documentos.md
* Inventario_Evidencias.xlsx
* Inventario_Evidencias.md
* Dashboard_Final.md
* Resumen_Ejecutivo.md
* AUDITORIA_FINAL.md
* INDICE_EVIDENCIAS.md

---

# Checklist Final

Verificar automáticamente:

* Todos los Prompt.md existen.
* Todos los Resultado_IA.md existen.
* Todos los Mejoras.md existen.
* Todos los Conclusiones.md existen.
* Todos los Trazabilidad.md existen.
* Todas las matrices fueron generadas.
* Todos los archivos Excel existen.
* Todas las evidencias fueron copiadas.
* Todos los índices fueron creados.

Marcar:

* ✅ Completo
* ⚠ Parcial
* ❌ Pendiente

---

# Inventario Documental

Generar una matriz indicando:

* Carpeta
* Archivo
* Tipo
* Estado
* Observaciones

En formato:

* Markdown
* Excel

---

# Inventario de Evidencias

Clasificar automáticamente:

* Logs
* Reportes
* Matrices
* Diagramas
* Configuraciones
* Capturas
* JSON
* CSV
* Markdown
* Excel

Generar en:

* Markdown
* Excel

---

# Dashboard Final

Generar un resumen con:

* Total de documentos generados.
* Total de matrices.
* Total de archivos Excel.
* Total de evidencias.
* Total de diagramas.
* Total de reportes.
* Total de pasos completados.
* Porcentaje de avance documental.

---

# Auditoría Final

Generar automáticamente un documento llamado:

```text
AUDITORIA_FINAL.md
```

Indicando:

* Estado general.
* Calidad de la documentación.
* Cobertura de Ingeniería Inversa.
* Hallazgos pendientes.
* Riesgos pendientes.
* Recomendaciones.
* Veredicto final.

---

# Copiar evidencias reales

Si existen, copiar automáticamente:

* Todas las matrices generadas.
* Todos los Excel.
* Todos los diagramas Mermaid.
* Reportes SonarCloud.
* Reportes Cypress.
* Reportes JMeter.
* Logs.
* Configuraciones.
* README.
* Evidencias Railway.
* Evidencias Vercel.
* Evidencias MySQL.

Si alguna evidencia no existe registrar:

"Evidencia pendiente de incorporar."

---

# Resultado esperado

Al finalizar deberán existir automáticamente:

```text
12_Generador_Final/

├──01_Prompt.md
├──02_Resultado_IA.md
├──03_Mejoras.md
├──04_Conclusiones.md
├──05_Trazabilidad.md
│
└──Evidencias/
      ├──Checklist_Final.xlsx
      ├──Checklist_Final.md
      ├──Inventario_Documentos.xlsx
      ├──Inventario_Documentos.md
      ├──Inventario_Evidencias.xlsx
      ├──Inventario_Evidencias.md
      ├──Dashboard_Final.md
      ├──Resumen_Ejecutivo.md
      ├──AUDITORIA_FINAL.md
      ├──INDICE_EVIDENCIAS.md
      └──(copias de evidencias reales encontradas)
```

El resultado debe consolidar toda la Ingeniería Inversa realizada sobre el proyecto CAFE-IA, verificando que la documentación sea consistente, completa y apta para anexarse directamente al informe final y a la evaluación de evidencias ICACIT.
