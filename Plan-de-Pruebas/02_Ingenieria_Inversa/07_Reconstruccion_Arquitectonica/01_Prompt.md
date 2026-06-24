# Ingeniería Inversa – Paso 7: Reconstrucción Arquitectónica

Actúa como **Arquitecto de Software Senior**, **Especialista en Ingeniería Inversa**, **Arquitecto Empresarial**, **Consultor de Modernización de Software** y **Evaluador ICACIT**.

## Restricciones

* No modificar ningún archivo del proyecto CAFE-IA.
* No eliminar archivos.
* No corregir código.
* No inventar componentes.
* Reconstruir únicamente la arquitectura realmente implementada.
* Si algún componente no existe, indicarlo claramente.
* No escribir instrucciones internas de IA dentro de los documentos finales.
* Toda la documentación debe tener formato profesional listo para anexarse al informe.

Toda la documentación deberá generarse automáticamente dentro de:

```text
Plan-de-Pruebas/
└──02_Ingenieria_Inversa/
    └──07_Reconstruccion_Arquitectonica/
```

---

# Archivos a generar

## 01_Prompt.md

Guardar exactamente el prompt utilizado.

---

## 02_Resultado_IA.md

Reconstruir completamente la arquitectura del proyecto CAFE-IA.

Documentar como mínimo:

### Arquitectura General

* Arquitectura identificada.
* Patrón arquitectónico.
* Arquitectura física.
* Arquitectura lógica.
* Arquitectura de despliegue.
* Arquitectura de componentes.

### Backend

* Controllers
* Routes
* Services
* Middleware
* Repositories
* Config
* Utilidades
* Seguridad
* API REST

### Frontend

* Pages
* Components
* Layouts
* Context
* Hooks
* Services
* Routing
* Assets

### Base de Datos

* Modelo relacional
* Tablas
* Relaciones
* Integridad
* Flujo de persistencia

### Integraciones

* React → Express
* Express → MySQL
* Backend → IA
* Backend → Railway
* Frontend → Vercel

Para cada componente indicar:

* Responsabilidad.
* Dependencias.
* Comunicación.
* Flujo de información.
* Estado de implementación.

---

## 03_Mejoras.md

Generar un plan de refactorización arquitectónica indicando:

* ID
* Componente
* Hallazgo
* Riesgo
* Impacto
* Prioridad
* Recomendación
* Responsable
* Esfuerzo

Incluir:

* Refactorización.
* Simplificación.
* Desacoplamiento.
* Modularización.
* Escalabilidad.

---

## 04_Conclusiones.md

Redactar una conclusión profesional indicando:

* Estado de la arquitectura reconstruida.
* Nivel de organización.
* Calidad del diseño.
* Principales fortalezas.
* Debilidades.
* Riesgos.
* Nivel de madurez.

No incluir instrucciones para IA.

---

## 05_Trazabilidad.md

Documentar:

* Objetivo.
* Carpetas revisadas.
* Archivos analizados.
* Componentes reconstruidos.
* Diagramas generados.
* Evidencias utilizadas.
* Fecha.

---

# Carpeta Evidencias

Dentro de:

```text
Evidencias/
```

Generar automáticamente:

* Arquitectura_Logica.md
* Arquitectura_Fisica.md
* Arquitectura_Componentes.md
* Arquitectura_Despliegue.md
* Flujo_Datos.md
* Inventario_Componentes.xlsx
* Inventario_Componentes.md
* Matriz_Componentes.xlsx
* Matriz_Componentes.md
* Resumen_Ejecutivo.md
* INDICE_EVIDENCIAS.md

---

# Diagramas

Reconstruir automáticamente utilizando Mermaid:

* Diagrama General del Sistema.
* Diagrama de Componentes.
* Diagrama de Capas.
* Diagrama Cliente-Servidor.
* Diagrama de Despliegue.
* Diagrama de Flujo de Datos.
* Diagrama de Comunicación entre módulos.

Guardar cada diagrama en formato:

* .md
* .mmd

---

# Matriz de Componentes

Generar una matriz con:

* ID
* Componente
* Tipo
* Responsabilidad
* Dependencias
* Comunicación
* Estado
* Riesgo

En formato:

* Markdown
* Excel

---

# Inventario Arquitectónico

Clasificar automáticamente:

* Componentes Backend.
* Componentes Frontend.
* Base de Datos.
* APIs.
* Seguridad.
* IA.
* Infraestructura.
* Servicios externos.

---

# Resumen Ejecutivo

Generar un resumen indicando:

* Número total de componentes.
* Número de capas.
* Número de APIs.
* Número de módulos.
* Patrones arquitectónicos encontrados.
* Calidad de la arquitectura.
* Nivel de madurez.

---

# Copiar evidencias reales

Si existen, copiar automáticamente:

* Diagramas Mermaid.
* Diagramas UML.
* README técnicos.
* schema.sql.
* Configuraciones Railway.
* Configuraciones Vercel.
* Evidencias SonarCloud.
* Evidencias JMeter.
* Evidencias Cypress.
* Documentación técnica.

Si alguna evidencia no existe registrar:

"Evidencia pendiente de incorporar."

---

# Resultado esperado

Al finalizar deberán existir automáticamente:

```text
07_Reconstruccion_Arquitectonica/

├──01_Prompt.md
├──02_Resultado_IA.md
├──03_Mejoras.md
├──04_Conclusiones.md
├──05_Trazabilidad.md
│
└──Evidencias/
      ├──Arquitectura_Logica.md
      ├──Arquitectura_Fisica.md
      ├──Arquitectura_Componentes.md
      ├──Arquitectura_Despliegue.md
      ├──Flujo_Datos.md
      ├──Inventario_Componentes.xlsx
      ├──Inventario_Componentes.md
      ├──Matriz_Componentes.xlsx
      ├──Matriz_Componentes.md
      ├──Resumen_Ejecutivo.md
      ├──INDICE_EVIDENCIAS.md
      ├──Diagrama_General.mmd
      ├──Diagrama_Componentes.mmd
      ├──Diagrama_Capas.mmd
      ├──Diagrama_Despliegue.mmd
      ├──Diagrama_Flujo_Datos.mmd
      └──(copias de evidencias reales encontradas)
```

Toda la documentación deberá quedar lista para anexarse directamente al informe de evaluación de evidencias ICACIT y representar fielmente la arquitectura realmente implementada del proyecto CAFE-IA.
