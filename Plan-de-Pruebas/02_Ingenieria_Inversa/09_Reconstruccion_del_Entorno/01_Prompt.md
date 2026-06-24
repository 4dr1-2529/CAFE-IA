# Ingeniería Inversa – Paso 9: Reconstrucción del Entorno

Actúa como **Arquitecto de Software Senior**, **Ingeniero DevOps**, **Administrador de Infraestructura**, **Especialista en Ingeniería Inversa** y **Evaluador ICACIT**.

## Restricciones

* No modificar ningún archivo del proyecto CAFE-IA.
* No eliminar archivos.
* No corregir código.
* No inventar configuraciones.
* Reconstruir únicamente el entorno realmente implementado.
* Si alguna configuración no existe, indicarlo explícitamente.
* No escribir instrucciones internas de IA dentro de los documentos finales.
* Toda la documentación debe tener formato profesional listo para anexarse al informe.

Toda la documentación deberá generarse automáticamente dentro de:

```text
Plan-de-Pruebas/
└──02_Ingenieria_Inversa/
    └──09_Reconstruccion_del_Entorno/
```

---

# Archivos a generar

## 01_Prompt.md

Guardar exactamente el prompt utilizado.

---

## 02_Resultado_IA.md

Reconstruir completamente el entorno donde opera el proyecto CAFE-IA.

Analizar como mínimo:

### Entorno de Desarrollo

* Sistema Operativo utilizado.
* Node.js.
* npm.
* Git.
* VS Code / Cursor.
* MySQL.
* XAMPP.
* Variables de entorno.

### Frontend

* React.
* Vite.
* TailwindCSS.
* Dependencias.
* Configuración.

### Backend

* Express.
* JWT.
* mysql2.
* Middleware.
* Configuración.
* Variables.

### Base de Datos

* MySQL.
* Scripts SQL.
* Conexión.
* Relaciones.
* Inicialización.

### Infraestructura

* Railway.
* Vercel.
* GitHub.
* SonarCloud.
* Cypress.
* JMeter.

### Servicios externos

* APIs.
* Variables.
* Autenticación.
* Comunicación.

Para cada componente indicar:

* Función.
* Configuración.
* Dependencias.
* Estado.
* Riesgos.

---

## 03_Mejoras.md

Generar un plan de mejora indicando:

* ID
* Componente
* Problema
* Riesgo
* Impacto
* Prioridad
* Recomendación
* Responsable
* Esfuerzo

Incluir mejoras para:

* Desarrollo.
* Producción.
* Seguridad.
* Despliegue.
* Infraestructura.

---

## 04_Conclusiones.md

Redactar una conclusión profesional indicando:

* Estado del entorno.
* Calidad de configuración.
* Fortalezas.
* Debilidades.
* Riesgos.
* Recomendaciones.
* Nivel de madurez del entorno.

No incluir instrucciones para IA.

---

## 05_Trazabilidad.md

Documentar:

* Objetivo.
* Configuraciones revisadas.
* Archivos analizados.
* Herramientas utilizadas.
* Infraestructura identificada.
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

* Inventario_Entorno.xlsx
* Inventario_Entorno.md
* Matriz_Infraestructura.xlsx
* Matriz_Infraestructura.md
* Matriz_Herramientas.md
* Configuracion_Entorno.md
* Resumen_Ejecutivo.md
* INDICE_EVIDENCIAS.md

---

# Diagramas

Reconstruir automáticamente utilizando Mermaid:

* Diagrama del Entorno.
* Diagrama de Infraestructura.
* Diagrama de Despliegue.
* Diagrama Cliente-Servidor.
* Diagrama de Comunicación.

Guardar cada diagrama en:

* .md
* .mmd

---

# Inventario del Entorno

Clasificar automáticamente:

* Herramientas de desarrollo.
* Herramientas de despliegue.
* Herramientas de calidad.
* Infraestructura.
* Servicios externos.
* Variables de entorno.
* Servidores.
* Bases de datos.

---

# Matriz de Infraestructura

Generar una matriz con:

* ID
* Componente
* Tipo
* Función
* Estado
* Riesgo
* Recomendación

En formato:

* Markdown
* Excel

---

# Resumen Ejecutivo

Generar un resumen indicando:

* Herramientas utilizadas.
* Infraestructura encontrada.
* Servicios externos.
* Bases de datos.
* Plataformas de despliegue.
* Estado general del entorno.

---

# Copiar evidencias reales

Si existen, copiar automáticamente:

* .env.example
* backend_env.example
* package.json
* package-lock.json
* vercel.json
* Railway.json
* README.md
* Scripts SQL
* Reportes SonarCloud
* Reportes Cypress
* Reportes JMeter
* Configuraciones GitHub Actions
* Evidencias de Railway
* Evidencias de Vercel

Si alguna evidencia no existe registrar:

"Evidencia pendiente de incorporar."

---

# Resultado esperado

Al finalizar deberán existir automáticamente:

```text
09_Reconstruccion_del_Entorno/

├──01_Prompt.md
├──02_Resultado_IA.md
├──03_Mejoras.md
├──04_Conclusiones.md
├──05_Trazabilidad.md
│
└──Evidencias/
      ├──Inventario_Entorno.xlsx
      ├──Inventario_Entorno.md
      ├──Matriz_Infraestructura.xlsx
      ├──Matriz_Infraestructura.md
      ├──Matriz_Herramientas.md
      ├──Configuracion_Entorno.md
      ├──Resumen_Ejecutivo.md
      ├──INDICE_EVIDENCIAS.md
      ├──Diagrama_Entorno.mmd
      ├──Diagrama_Infraestructura.mmd
      ├──Diagrama_Despliegue.mmd
      └──(copias de evidencias reales encontradas)
```

Toda la documentación deberá quedar lista para anexarse directamente al informe de evaluación de evidencias ICACIT y representar fielmente el entorno de desarrollo, pruebas y producción del proyecto CAFE-IA.
