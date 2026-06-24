# Ingeniería Inversa – Paso 5: Detección Arquitectónica

Actúa como **Arquitecto de Software Senior**, **Especialista en Arquitectura Empresarial**, **Ingeniero de Software**, **Especialista en Ingeniería Inversa** y **Evaluador ICACIT**.

## Restricciones

* No modificar ningún archivo del proyecto CAFE-IA.
* No eliminar archivos.
* No corregir código.
* No inventar arquitectura.
* Analizar únicamente la arquitectura realmente implementada.
* Si un componente no existe, indicarlo claramente.
* No escribir instrucciones de IA dentro de los documentos generados.
* Toda la documentación debe tener formato profesional listo para anexarse al informe.

Toda la documentación deberá generarse automáticamente dentro de:

```text
Plan-de-Pruebas/
└──02_Ingenieria_Inversa/
    └──05_Deteccion_Arquitectonica/
```

---

# Archivos a generar

## 01_Prompt.md

Guardar exactamente el prompt utilizado.

---

## 02_Resultado_IA.md

Realizar un análisis completo de la arquitectura del proyecto.

Analizar como mínimo:

### Arquitectura General

* Tipo de arquitectura implementada.
* Arquitectura Hexagonal.
* Arquitectura por Capas.
* Arquitectura Cliente-Servidor.
* Arquitectura Modular.
* Arquitectura REST.

### Componentes Backend

* Controllers
* Services
* Repositories
* Routes
* Middleware
* Models
* SQL
* Configuración
* Utilidades

### Componentes Frontend

* Pages
* Components
* Layouts
* Hooks
* Context
* Services
* Assets
* Routing

### Base de Datos

* Modelo relacional.
* Tablas.
* Relaciones.
* Integridad referencial.

### Integraciones

* Frontend ↔ Backend
* Backend ↔ MySQL
* Backend ↔ IA
* Backend ↔ Railway
* Frontend ↔ Vercel

Para cada componente indicar:

* Función.
* Responsabilidad.
* Dependencias.
* Nivel de acoplamiento.
* Cohesión.
* Estado de implementación.

---

## 03_Mejoras.md

Generar un plan de mejoras indicando:

* ID
* Componente
* Problema arquitectónico
* Riesgo
* Impacto
* Prioridad
* Recomendación
* Responsable
* Esfuerzo

Identificar además:

* Componentes duplicados.
* Componentes innecesarios.
* Componentes acoplados.
* Violaciones arquitectónicas.
* Oportunidades de refactorización.

---

## 04_Conclusiones.md

Redactar una conclusión profesional indicando:

* Estado de la arquitectura.
* Fortalezas.
* Debilidades.
* Nivel de modularidad.
* Nivel de mantenibilidad.
* Nivel de escalabilidad.
* Nivel de madurez arquitectónica.

No incluir instrucciones para IA.

---

## 05_Trazabilidad.md

Documentar:

* Objetivo.
* Carpetas analizadas.
* Archivos inspeccionados.
* Componentes identificados.
* Patrones detectados.
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

* Inventario_Componentes.xlsx
* Inventario_Componentes.md
* Matriz_Componentes.xlsx
* Matriz_Componentes.md
* Matriz_Dependencias_Componentes.md
* Patrones_Arquitectonicos.md
* Resumen_Ejecutivo.md
* INDICE_EVIDENCIAS.md

Si existen copiar automáticamente:

* Diagramas Mermaid.
* Diagramas UML.
* Diagramas de Arquitectura.
* README técnicos.
* Render.yaml.
* vercel.json.
* schema.sql.
* Scripts SQL.
* Configuración backend.
* Configuración frontend.
* Evidencias Sonar.
* Evidencias Railway.
* Evidencias Vercel.

Si no existen registrar:

"Evidencia pendiente de incorporar."

---

# Matriz de Componentes

Generar una matriz con:

* ID
* Componente
* Tipo
* Responsabilidad
* Dependencias
* Acoplamiento
* Cohesión
* Estado
* Riesgo

Generarla en:

* Markdown
* Excel

---

# Patrones Arquitectónicos

Detectar automáticamente:

* Arquitectura Hexagonal.
* MVC.
* Repository Pattern.
* Dependency Injection.
* Middleware Pattern.
* REST API.
* Modularización.
* Otros patrones encontrados.

Indicar para cada patrón:

* Evidencia.
* Estado.
* Calidad de implementación.

---

# Arquitectura Reconstruida

Reconstruir automáticamente:

* Arquitectura lógica.
* Arquitectura física.
* Arquitectura de despliegue.
* Arquitectura de componentes.
* Flujo entre capas.
* Flujo de datos.
* Comunicación entre módulos.

---

# Resumen Ejecutivo

Generar un resumen indicando:

* Número total de componentes.
* Componentes Backend.
* Componentes Frontend.
* Patrones detectados.
* Nivel de acoplamiento.
* Nivel de cohesión.
* Calidad arquitectónica.
* Estado general de la arquitectura.

---

# Resultado esperado

Al finalizar deberán existir automáticamente:

```text
05_Deteccion_Arquitectonica/

├──01_Prompt.md
├──02_Resultado_IA.md
├──03_Mejoras.md
├──04_Conclusiones.md
├──05_Trazabilidad.md
│
└──Evidencias/
      ├──Inventario_Componentes.xlsx
      ├──Inventario_Componentes.md
      ├──Matriz_Componentes.xlsx
      ├──Matriz_Componentes.md
      ├──Matriz_Dependencias_Componentes.md
      ├──Patrones_Arquitectonicos.md
      ├──Resumen_Ejecutivo.md
      ├──INDICE_EVIDENCIAS.md
      └──(copias de evidencias reales encontradas)
```

Toda la documentación deberá quedar lista para anexarse directamente al informe de evaluación de evidencias ICACIT y reflejar únicamente la arquitectura realmente implementada en el proyecto CAFE-IA.
