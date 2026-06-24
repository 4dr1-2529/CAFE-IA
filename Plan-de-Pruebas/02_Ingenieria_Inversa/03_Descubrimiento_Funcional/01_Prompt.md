# Ingeniería Inversa – Paso 3: Descubrimiento Funcional

Actúa como **Arquitecto de Software Senior**, **Analista Funcional**, **Ingeniero de Requisitos**, **Especialista en Ingeniería Inversa** y **Evaluador ICACIT**.

## Restricciones

* No modificar ningún archivo del proyecto CAFE-IA.
* No eliminar archivos.
* No corregir el código.
* No inventar funcionalidades.
* Analizar únicamente funcionalidades implementadas y verificables.
* Si una funcionalidad no existe, indicarlo explícitamente.
* No escribir instrucciones de IA dentro de los documentos finales.
* Todo el contenido debe tener formato profesional listo para anexarse al informe.

Toda la documentación deberá generarse automáticamente dentro de:

```text
Plan-de-Pruebas/
└──02_Ingenieria_Inversa/
    └──03_Descubrimiento_Funcional/
```

---

# Archivos a generar

## 01_Prompt.md

Guardar exactamente el prompt utilizado.

---

## 02_Resultado_IA.md

Realizar un análisis funcional completo del sistema CAFE-IA.

Analizar como mínimo:

### Autenticación

* Login
* Logout
* JWT
* Roles
* Permisos

### Gestión

* Usuarios
* Productores
* Fincas
* Lotes
* Producción

### Procesos

* Trazabilidad
* Control de Calidad
* Reportes
* Dashboard

### Inteligencia Artificial

* Chatbot IA
* Modelo ML
* Predicción
* Recomendaciones

### Administración

* Auditoría
* Historial
* Configuración

Para cada módulo indicar:

* Objetivo
* Descripción funcional
* Entradas
* Salidas
* Usuarios involucrados
* Reglas de negocio
* Dependencias
* Estado (Completo, Parcial o No implementado)

---

## 03_Mejoras.md

Generar un plan de mejoras indicando:

* ID
* Funcionalidad
* Problema encontrado
* Impacto
* Riesgo
* Prioridad
* Recomendación
* Responsable
* Esfuerzo

Además indicar funcionalidades faltantes respecto a la arquitectura propuesta.

---

## 04_Conclusiones.md

Redactar una conclusión profesional indicando:

* Cobertura funcional del sistema.
* Módulos completamente implementados.
* Funcionalidades parciales.
* Funcionalidades pendientes.
* Nivel de madurez funcional.
* Recomendaciones.

No incluir instrucciones para IA.

---

## 05_Trazabilidad.md

Documentar:

* Objetivo del análisis.
* Carpetas revisadas.
* Componentes analizados.
* Archivos inspeccionados.
* Evidencias utilizadas.
* Funcionalidades identificadas.
* Documentos generados.
* Fecha.

---

# Carpeta Evidencias

Dentro de:

```text
Evidencias/
```

Generar automáticamente:

* Inventario_Funcional.xlsx
* Inventario_Funcional.md
* Matriz_Modulos.xlsx
* Matriz_Modulos.md
* Matriz_Casos_Uso.md
* Matriz_Historias_Usuario.md
* Resumen_Ejecutivo.md
* INDICE_EVIDENCIAS.md

Si existen, copiar automáticamente evidencias reales.

Si no existen, registrar:

"Evidencia pendiente de incorporar."

---

# Matriz de Módulos

Generar una matriz con:

* ID
* Módulo
* Descripción
* Usuario
* Entradas
* Salidas
* Estado
* Prioridad

En formato Markdown y Excel.

---

# Matriz de Casos de Uso

Generar automáticamente una matriz indicando:

* Caso de uso
* Actor
* Objetivo
* Flujo principal
* Resultado esperado

---

# Inventario Funcional

Listar todas las funcionalidades descubiertas clasificándolas en:

* Autenticación
* Administración
* Producción
* Trazabilidad
* Calidad
* Inteligencia Artificial
* Reportes
* Configuración

---

# Resumen Ejecutivo

Generar un resumen indicando:

* Número total de módulos.
* Funcionalidades implementadas.
* Funcionalidades parciales.
* Funcionalidades pendientes.
* Estado general del sistema.

---

# Resultado esperado

Al finalizar deberán existir automáticamente todos los archivos en `03_Descubrimiento_Funcional/` con carpeta `Evidencias/` completa.

Toda la documentación debe estar lista para anexarse directamente al informe de evaluación de evidencias ICACIT y reflejar únicamente funcionalidades reales implementadas en el proyecto CAFE-IA.
