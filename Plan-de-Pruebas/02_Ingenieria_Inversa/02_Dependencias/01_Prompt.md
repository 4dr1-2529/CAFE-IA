# Ingeniería Inversa – Paso 2: Análisis de Dependencias

Actúa como un **Arquitecto de Software Senior**, **Ingeniero DevOps**, **Especialista en Ingeniería Inversa**, **Ingeniero de Calidad de Software** y **Auditor Técnico de ICACIT**.

## Restricciones

* No modificar ningún archivo del sistema CAFE-IA.
* No eliminar archivos.
* No corregir el código.
* No inventar información.
* Analizar únicamente la información existente en el proyecto.
* Si alguna evidencia no existe, indicar "Evidencia pendiente de incorporar".
* No escribir instrucciones internas de la IA dentro de los documentos finales (por ejemplo: "Actúa como...", "No modificar código...", "Resultado esperado...", etc.).

Toda la documentación deberá generarse automáticamente dentro de la carpeta:

```
Plan-de-Pruebas/
└── 02_Ingenieria_Inversa/
    └── 02_Dependencias/
```

---

# Archivos que debes generar

## 01_Prompt.md

Guardar exactamente el prompt utilizado para realizar este análisis.

---

## 02_Resultado_IA.md

Realizar un análisis técnico completo de todas las dependencias del proyecto.

Analizar como mínimo:

### Backend

* package.json
* package-lock.json
* Express
* mysql2
* JWT
* bcrypt
* cors
* helmet
* dotenv
* express-rate-limit
* multer
* node-cron
* cualquier otra dependencia instalada

### Frontend

* React
* Vite
* TailwindCSS
* React Router
* Axios
* Recharts
* SweetAlert2
* React Icons
* cualquier otra dependencia instalada

### Herramientas

* Cypress
* JMeter
* SonarQube
* Railway
* Vercel
* MySQL

Para cada dependencia indicar:

* Nombre
* Versión instalada
* Función dentro del proyecto
* Módulos donde se utiliza
* Riesgos
* Dependencias relacionadas
* Compatibilidad
* Estado (Actualizada / Desactualizada)
* Nivel de criticidad

---

## 03_Mejoras.md

Generar un plan de mejoras indicando:

* ID
* Dependencia
* Problema encontrado
* Riesgo
* Impacto
* Prioridad
* Recomendación
* Esfuerzo estimado
* Responsable

Al finalizar elaborar un plan de actualización priorizado.

---

## 04_Conclusiones.md

Redactar una conclusión profesional indicando:

* Estado general de las dependencias.
* Fortalezas del proyecto.
* Riesgos detectados.
* Dependencias críticas.
* Recomendaciones para mantenimiento.
* Nivel de madurez tecnológica.

No incluir instrucciones para IA.

---

## 05_Trazabilidad.md

Documentar:

* Objetivo del análisis.
* Archivos revisados.
* package.json analizados.
* package-lock.json analizados.
* Configuraciones inspeccionadas.
* Herramientas utilizadas.
* Evidencias recopiladas.
* Documentos generados.
* Fecha del análisis.

---

# Carpeta Evidencias

Dentro de:

```
Evidencias/
```

Generar automáticamente:

* Matriz_Dependencias.xlsx
* Matriz_Dependencias.md
* Resumen_Ejecutivo.md
* Inventario_Dependencias.md
* Dependencias_Backend.md
* Dependencias_Frontend.md
* Dependencias_Herramientas.md
* INDICE_EVIDENCIAS.md

Si existen, copiar automáticamente:

* package.json
* package-lock.json
* package.json del frontend
* package-lock.json del frontend
* package.json del backend
* package-lock.json del backend
* archivos relacionados con npm
* auditorías npm audit
* reportes Sonar
* reportes JMeter
* reportes Cypress

Si no existen, registrar únicamente:

"Evidencia pendiente de incorporar."

---

# Matriz de Dependencias

Generar una matriz con las columnas:

* ID
* Dependencia
* Versión
* Tipo (Backend, Frontend, Herramienta)
* Función
* Estado
* Riesgo
* Criticidad
* Recomendación

Generarla en formato:

* Markdown
* Excel

---

# Resumen Ejecutivo

Generar un resumen indicando:

* Número total de dependencias.
* Dependencias Backend.
* Dependencias Frontend.
* Dependencias de desarrollo.
* Dependencias críticas.
* Dependencias desactualizadas.
* Dependencias con vulnerabilidades.
* Estado general del proyecto.

---

# Resultado esperado

Al finalizar deberán existir automáticamente todos estos archivos:

```
02_Dependencias/

├── 01_Prompt.md
├── 02_Resultado_IA.md
├── 03_Mejoras.md
├── 04_Conclusiones.md
├── 05_Trazabilidad.md
│
└── Evidencias/
      ├── Matriz_Dependencias.xlsx
      ├── Matriz_Dependencias.md
      ├── Inventario_Dependencias.md
      ├── Dependencias_Backend.md
      ├── Dependencias_Frontend.md
      ├── Dependencias_Herramientas.md
      ├── Resumen_Ejecutivo.md
      ├── INDICE_EVIDENCIAS.md
      └── (copias de evidencias reales encontradas)
```

Todo el contenido generado debe tener un formato técnico, profesional y listo para anexarse directamente al informe final del proyecto y cumplir con la evaluación de evidencias ICACIT.
