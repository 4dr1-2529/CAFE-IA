# Ingeniería Inversa – Paso 8: Reconstrucción del Dominio

Actúa como **Arquitecto de Software Senior**, **Analista de Negocio**, **Ingeniero de Requisitos**, **Especialista en Ingeniería Inversa**, **Experto en Modelado de Dominio (DDD)** y **Evaluador ICACIT**.

## Restricciones

* No modificar ningún archivo del proyecto CAFE-IA.
* No eliminar archivos.
* No corregir código.
* No inventar entidades ni reglas de negocio.
* Reconstruir únicamente el dominio realmente implementado.
* Si alguna entidad o regla no existe, indicarlo explícitamente.
* No escribir instrucciones internas de IA dentro de los documentos finales.
* Toda la documentación debe tener formato profesional listo para anexarse al informe.

Toda la documentación deberá generarse automáticamente dentro de:

```text
Plan-de-Pruebas/
└──02_Ingenieria_Inversa/
    └──08_Reconstruccion_del_Dominio/
```

---

# Archivos a generar

## 01_Prompt.md

Guardar exactamente el prompt utilizado.

---

## 02_Resultado_IA.md

Reconstruir completamente el dominio del negocio implementado en CAFE-IA.

Analizar como mínimo:

### Actores

* Administrador
* Productor
* Cliente
* Usuario
* Chatbot IA
* Sistema

### Entidades

Identificar todas las entidades implementadas, por ejemplo:

* Usuario
* Rol
* Productor
* Finca
* Lote
* Producción
* Calidad
* Trazabilidad
* Reporte
* Auditoría
* Historial
* Predicción
* Modelo IA
* y cualquier otra entidad encontrada.

### Reglas de negocio

Identificar:

* Validaciones.
* Restricciones.
* Relaciones.
* Procesos.
* Estados.
* Flujo de información.

### Procesos de negocio

Reconstruir procesos como:

* Login.
* Registro.
* Producción.
* Gestión de productores.
* Gestión de fincas.
* Gestión de lotes.
* Control de calidad.
* Trazabilidad.
* Reportes.
* Auditoría.
* IA.

Para cada proceso indicar:

* Objetivo.
* Entradas.
* Salidas.
* Actores.
* Reglas.
* Dependencias.

---

## 03_Mejoras.md

Generar un plan de mejora del dominio indicando:

* ID
* Entidad
* Problema
* Riesgo
* Impacto
* Prioridad
* Recomendación
* Responsable
* Esfuerzo

Incluir oportunidades para mejorar las reglas de negocio.

---

## 04_Conclusiones.md

Redactar una conclusión profesional indicando:

* Estado del dominio.
* Calidad del modelo de negocio.
* Cobertura funcional.
* Fortalezas.
* Debilidades.
* Riesgos.
* Nivel de madurez del dominio.

No incluir instrucciones para IA.

---

## 05_Trazabilidad.md

Documentar:

* Objetivo.
* Entidades analizadas.
* Procesos reconstruidos.
* Archivos revisados.
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

* Inventario_Entidades.xlsx
* Inventario_Entidades.md
* Matriz_Reglas_Negocio.xlsx
* Matriz_Reglas_Negocio.md
* Matriz_Procesos.xlsx
* Matriz_Procesos.md
* Diccionario_Dominio.md
* Resumen_Ejecutivo.md
* INDICE_EVIDENCIAS.md

---

# Diagramas

Reconstruir automáticamente utilizando Mermaid:

* Modelo de Dominio.
* Relaciones entre entidades.
* Flujo de procesos.
* Casos de uso.
* Modelo conceptual.

Guardar en:

* .md
* .mmd

---

# Diccionario del Dominio

Generar automáticamente un diccionario indicando para cada entidad:

* Nombre.
* Descripción.
* Atributos.
* Relaciones.
* Reglas.
* Estado.

---

# Matriz de Procesos

Generar una matriz con:

* ID
* Proceso
* Actor
* Entrada
* Salida
* Regla de negocio
* Estado

En formato:

* Markdown
* Excel

---

# Resumen Ejecutivo

Generar un resumen indicando:

* Número total de entidades.
* Número de procesos.
* Número de actores.
* Número de reglas de negocio.
* Cobertura del dominio.
* Calidad del modelo de negocio.

---

# Copiar evidencias reales

Si existen, copiar automáticamente:

* schema.sql
* Diagramas ER.
* README funcionales.
* Historias de Usuario.
* Casos de Uso.
* Evidencias PMV1.
* Evidencias PMV2.
* Diagramas Mermaid.
* Manuales.

Si alguna evidencia no existe registrar:

"Evidencia pendiente de incorporar."

---

# Resultado esperado

Al finalizar deberán existir automáticamente:

```text
08_Reconstruccion_del_Dominio/

├──01_Prompt.md
├──02_Resultado_IA.md
├──03_Mejoras.md
├──04_Conclusiones.md
├──05_Trazabilidad.md
│
└──Evidencias/
      ├──Inventario_Entidades.xlsx
      ├──Inventario_Entidades.md
      ├──Matriz_Reglas_Negocio.xlsx
      ├──Matriz_Reglas_Negocio.md
      ├──Matriz_Procesos.xlsx
      ├──Matriz_Procesos.md
      ├──Diccionario_Dominio.md
      ├──Resumen_Ejecutivo.md
      ├──INDICE_EVIDENCIAS.md
      ├──Modelo_Dominio.mmd
      ├──Casos_Uso.mmd
      ├──Relaciones_Entidades.mmd
      └──(copias de evidencias reales encontradas)
```

Toda la documentación deberá quedar lista para anexarse directamente al informe de evaluación de evidencias ICACIT y representar fielmente el dominio del negocio implementado en el proyecto CAFE-IA.
