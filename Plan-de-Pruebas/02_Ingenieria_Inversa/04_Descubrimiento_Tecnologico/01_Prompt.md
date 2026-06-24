# Ingeniería Inversa – Paso 4: Descubrimiento Tecnológico

Actúa como **Arquitecto de Software Senior**, **Ingeniero DevOps**, **Especialista en Ingeniería Inversa**, **Especialista en Infraestructura Tecnológica** y **Evaluador ICACIT**.

## Restricciones

* No modificar ningún archivo del proyecto CAFE-IA.
* No eliminar archivos.
* No corregir código.
* No inventar tecnologías.
* Analizar únicamente tecnologías realmente implementadas.
* Si una tecnología no existe, indicarlo explícitamente.
* No escribir instrucciones internas de IA dentro de los documentos generados.
* Toda la documentación debe tener formato profesional listo para anexarse al informe.

Toda la documentación deberá generarse automáticamente dentro de:

```text
Plan-de-Pruebas/
└──02_Ingenieria_Inversa/
    └──04_Descubrimiento_Tecnologico/
```

---

# Archivos a generar

## 01_Prompt.md

Guardar exactamente el prompt utilizado.

---

## 02_Resultado_IA.md

Realizar un análisis completo del stack tecnológico del proyecto.

Analizar como mínimo:

### Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios
* Recharts
* SweetAlert2
* React Icons

### Backend

* Node.js
* Express
* JWT
* bcrypt
* mysql2
* dotenv
* cors
* helmet
* express-rate-limit
* multer
* node-cron

### Base de Datos

* MySQL
* Estructura
* Scripts SQL
* Relaciones
* Integridad

### Infraestructura

* Railway
* Vercel
* GitHub
* Variables de entorno
* Configuración de despliegue

### Calidad

* Cypress
* JMeter
* SonarQube

### Machine Learning

* Modelo implementado
* Librerías utilizadas
* Flujo del modelo
* Integración con el sistema

Para cada tecnología indicar:

* Nombre
* Versión
* Propósito
* Ubicación dentro del proyecto
* Componentes que la utilizan
* Ventajas
* Desventajas
* Riesgos
* Estado de implementación

---

## 03_Mejoras.md

Generar un plan de mejoras indicando:

* ID
* Tecnología
* Problema
* Riesgo
* Impacto
* Prioridad
* Recomendación
* Responsable
* Esfuerzo

Incluir recomendaciones de actualización tecnológica.

---

## 04_Conclusiones.md

Redactar una conclusión profesional indicando:

* Estado del stack tecnológico.
* Tecnologías correctamente implementadas.
* Tecnologías críticas.
* Tecnologías pendientes de actualización.
* Riesgos tecnológicos.
* Nivel de madurez tecnológica.

No incluir instrucciones para IA.

---

## 05_Trazabilidad.md

Documentar:

* Objetivo.
* Archivos revisados.
* package.json inspeccionados.
* Configuraciones analizadas.
* Herramientas utilizadas.
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

* Inventario_Tecnologico.xlsx
* Inventario_Tecnologico.md
* Matriz_Tecnologias.xlsx
* Matriz_Tecnologias.md
* Arquitectura_Tecnologica.md
* Stack_Tecnologico.md
* Resumen_Ejecutivo.md
* INDICE_EVIDENCIAS.md

Copiar automáticamente si existen:

* package.json
* package-lock.json
* render.yaml
* vercel.json
* README.md
* dockerfiles
* scripts SQL
* reportes Sonar
* reportes Cypress
* reportes JMeter
* diagramas Mermaid
* documentación técnica

Si alguna evidencia no existe registrar:

"Evidencia pendiente de incorporar."

---

# Matriz Tecnológica

Generar una matriz con:

* ID
* Tecnología
* Categoría
* Versión
* Función
* Estado
* Riesgo
* Recomendación

Generarla en:

* Markdown
* Excel

---

# Inventario Tecnológico

Clasificar todas las tecnologías encontradas en:

* Frontend
* Backend
* Base de Datos
* Infraestructura
* DevOps
* Calidad
* Machine Learning
* Seguridad

---

# Arquitectura Tecnológica

Reconstruir automáticamente:

* Stack completo.
* Flujo tecnológico.
* Integración Frontend-Backend.
* Integración con Base de Datos.
* Integración con IA.
* Integración con Railway y Vercel.

---

# Resumen Ejecutivo

Generar un resumen indicando:

* Número total de tecnologías.
* Tecnologías Backend.
* Tecnologías Frontend.
* Herramientas de calidad.
* Herramientas DevOps.
* Tecnologías de IA.
* Estado general del stack.

---

# Resultado esperado

Al finalizar deberán existir automáticamente:

```text
04_Descubrimiento_Tecnologico/

├──01_Prompt.md
├──02_Resultado_IA.md
├──03_Mejoras.md
├──04_Conclusiones.md
├──05_Trazabilidad.md
│
└──Evidencias/
      ├──Inventario_Tecnologico.xlsx
      ├──Inventario_Tecnologico.md
      ├──Matriz_Tecnologias.xlsx
      ├──Matriz_Tecnologias.md
      ├──Arquitectura_Tecnologica.md
      ├──Stack_Tecnologico.md
      ├──Resumen_Ejecutivo.md
      ├──INDICE_EVIDENCIAS.md
      └──(copias de evidencias reales encontradas)
```

Toda la documentación deberá quedar lista para anexarse directamente al informe de evaluación de evidencias ICACIT, reflejando únicamente las tecnologías realmente implementadas en el proyecto CAFE-IA.
