# Ingeniería Inversa – Paso 10: Variables de Entorno

Actúa como **Arquitecto de Software Senior**, **Ingeniero DevOps**, **Especialista en Seguridad**, **Especialista en Ingeniería Inversa** y **Evaluador ICACIT**.

## Restricciones

* No modificar ningún archivo del proyecto CAFE-IA.
* No eliminar archivos.
* No corregir código.
* No inventar variables de entorno.
* Analizar únicamente las variables realmente implementadas.
* Si alguna variable requerida no existe, indicarlo explícitamente.
* No mostrar valores sensibles (contraseñas, tokens o claves).
* No escribir instrucciones internas de IA dentro de los documentos finales.
* Toda la documentación debe tener formato profesional listo para anexarse al informe.

Toda la documentación deberá generarse automáticamente dentro de:

```text
Plan-de-Pruebas/
└──02_Ingenieria_Inversa/
    └──10_Variables_de_Entorno/
```

---

# Archivos a generar

## 01_Prompt.md

Guardar exactamente el prompt utilizado.

---

## 02_Resultado_IA.md

Realizar un análisis completo de todas las variables de entorno utilizadas en el proyecto.

Analizar como mínimo:

### Backend

* .env
* .env.example
* dotenv
* Configuración de Express
* Variables JWT
* Variables MySQL
* Variables CORS
* Variables Railway

### Frontend

* Variables VITE_
* Variables Vercel
* Configuración API
* Configuración Build

### Producción

* Railway
* Vercel
* GitHub Actions
* SonarCloud

Para cada variable indicar:

* Nombre
* Descripción
* Componente donde se utiliza
* Obligatoria (Sí/No)
* Ambiente (Desarrollo / Pruebas / Producción)
* Estado (Configurada / No configurada)
* Riesgo asociado
* Impacto

**Nunca mostrar el valor real de la variable.**

---

## 03_Mejoras.md

Generar un plan de mejora indicando:

* ID
* Variable
* Problema encontrado
* Riesgo
* Impacto
* Prioridad
* Recomendación
* Responsable
* Esfuerzo

Incluir recomendaciones para:

* Seguridad
* Configuración
* Portabilidad
* Despliegue
* Mantenimiento

---

## 04_Conclusiones.md

Redactar una conclusión profesional indicando:

* Estado general de la configuración.
* Variables correctamente implementadas.
* Variables faltantes.
* Riesgos de configuración.
* Recomendaciones.
* Nivel de madurez del entorno de configuración.

No incluir instrucciones para IA.

---

## 05_Trazabilidad.md

Documentar:

* Objetivo.
* Archivos revisados.
* Variables identificadas.
* Configuraciones inspeccionadas.
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

* Inventario_Variables.xlsx
* Inventario_Variables.md
* Matriz_Variables.xlsx
* Matriz_Variables.md
* Configuracion_Backend.md
* Configuracion_Frontend.md
* Resumen_Ejecutivo.md
* INDICE_EVIDENCIAS.md

---

# Matriz de Variables

Generar una matriz con:

* ID
* Variable
* Componente
* Ambiente
* Obligatoria
* Estado
* Riesgo
* Recomendación

Generarla en:

* Markdown
* Excel

---

# Inventario de Variables

Clasificar automáticamente:

### Backend

* Base de datos
* JWT
* Seguridad
* CORS
* Servidor

### Frontend

* API
* Build
* Configuración

### Infraestructura

* Railway
* Vercel
* GitHub
* SonarCloud

---

# Resumen Ejecutivo

Generar un resumen indicando:

* Número total de variables.
* Variables Backend.
* Variables Frontend.
* Variables críticas.
* Variables faltantes.
* Estado general de configuración.

---

# Copiar evidencias reales

Si existen, copiar automáticamente:

* .env.example
* backend_env.example
* frontend_env.example
* railway variables documentadas
* vercel.json
* package.json
* README relacionados
* Configuraciones GitHub Actions

Si alguna evidencia no existe registrar:

> "Evidencia pendiente de incorporar."

---

# Resultado esperado

Al finalizar deberán existir automáticamente:

```text
10_Variables_de_Entorno/

├──01_Prompt.md
├──02_Resultado_IA.md
├──03_Mejoras.md
├──04_Conclusiones.md
├──05_Trazabilidad.md
│
└──Evidencias/
      ├──Inventario_Variables.xlsx
      ├──Inventario_Variables.md
      ├──Matriz_Variables.xlsx
      ├──Matriz_Variables.md
      ├──Configuracion_Backend.md
      ├──Configuracion_Frontend.md
      ├──Resumen_Ejecutivo.md
      ├──INDICE_EVIDENCIAS.md
      └──(copias de evidencias reales encontradas)
```

Toda la documentación deberá quedar lista para anexarse directamente al informe de evaluación de evidencias ICACIT, documentando de forma segura y profesional todas las variables de entorno realmente implementadas en el proyecto CAFE-IA, sin exponer información sensible.
