# FURPS+ – Paso 2: Auditor FURPS+

Actúa como **Arquitecto de Software Senior**, **Auditor de Calidad de Software**, **Especialista en FURPS+**, **Ingeniero QA**, **Evaluador ICACIT** y **Consultor de Arquitectura de Software**.

## Restricciones

* No modificar ningún archivo del proyecto CAFE-IA.
* No eliminar archivos.
* No corregir código.
* No inventar funcionalidades.
* Analizar únicamente el proyecto existente.
* Utilizar información real obtenida del código fuente, documentación y artefactos generados.
* Toda la documentación deberá quedar lista para anexarse al informe final.

Generar automáticamente toda la documentación dentro de:

```text
Plan-de-Pruebas/
└──01_FURPS_OWASP/
    └──02_Auditor_FURPS/
```

---

# Objetivo

Realizar una auditoría completa del proyecto **CAFE-IA** utilizando el modelo **FURPS+**, evaluando el estado actual del software e identificando fortalezas, debilidades, riesgos y oportunidades de mejora.

---

# Evaluar completamente

## Functionality (F)

Analizar:

* Funcionalidades implementadas.
* Casos de uso.
* Login.
* Roles.
* Gestión de usuarios.
* Productores.
* Producción.
* Lotes.
* Trazabilidad.
* Control de calidad.
* Dashboard.
* Reportes.
* IA.
* Chatbot.
* Auditoría.
* APIs REST.
* Seguridad JWT.

Para cada módulo indicar:

* Estado.
* Nivel de cumplimiento.
* Riesgos.
* Observaciones.

---

## Usability (U)

Evaluar:

* Interfaz.
* Navegación.
* Organización.
* Diseño.
* Accesibilidad.
* Experiencia del usuario.
* Facilidad de aprendizaje.
* Consistencia visual.
* Validaciones.
* Mensajes del sistema.

---

## Reliability (R)

Evaluar:

* Disponibilidad.
* Recuperación.
* Estabilidad.
* Tolerancia a fallos.
* Consistencia de datos.
* Manejo de errores.
* Robustez.
* Integridad.

---

## Performance (P)

Analizar:

* Tiempo de respuesta.
* APIs.
* Consultas MySQL.
* Rendimiento Frontend.
* Rendimiento Backend.
* Railway.
* Vercel.
* Uso de memoria.
* Uso de CPU.

Utilizar evidencias reales disponibles:

* JMeter.
* Cypress.
* SonarQube.
* Logs.

---

## Supportability (S)

Evaluar:

* Arquitectura.
* Modularidad.
* Escalabilidad.
* Reutilización.
* Mantenibilidad.
* Documentación.
* Facilidad para pruebas.
* Organización del código.
* Facilidad de despliegue.

---

## (+)

Evaluar además:

* Seguridad.
* Compatibilidad.
* Portabilidad.
* Configuración.
* Instalación.
* Despliegue.
* Monitoreo.
* Auditoría.

---

# Clasificación

Para cada atributo indicar:

* Excelente
* Bueno
* Regular
* Deficiente

Asignar un porcentaje de cumplimiento.

---

# Hallazgos

Clasificar cada hallazgo como:

* Crítico
* Alto
* Medio
* Bajo

Indicar:

* Descripción.
* Evidencia.
* Riesgo.
* Impacto.
* Recomendación.

---

# Generar

## 01_Prompt.md

Guardar exactamente el prompt utilizado.

---

## 02_Resultado_IA.md

Generar un informe técnico completo que incluya:

* Metodología utilizada.
* Evaluación FURPS+.
* Análisis de cada atributo.
* Resultados.
* Riesgos.
* Hallazgos.
* Nivel de calidad alcanzado.
* Estado general del proyecto.

---

## 03_Mejoras.md

Generar un plan de mejora indicando:

* ID.
* Área.
* Problema.
* Prioridad.
* Riesgo.
* Solución propuesta.
* Beneficio esperado.
* Responsable sugerido.

Ordenar por prioridad.

---

## 04_Conclusiones.md

Redactar una conclusión profesional (1 a 2 páginas) integrando:

* Calidad funcional.
* Calidad arquitectónica.
* Calidad técnica.
* Calidad documental.
* Nivel de madurez del software.
* Fortalezas principales.
* Debilidades encontradas.
* Recomendaciones para la siguiente fase.

Esta conclusión debe poder incorporarse directamente al informe académico.

---

# Evidencias

Dentro de:

```text
Evidencias/
```

Generar automáticamente:

* Matriz_FURPS.md
* Matriz_FURPS.xlsx
* Matriz_Hallazgos.md
* Matriz_Hallazgos.xlsx
* Checklist_Auditoria.md
* Dashboard_FURPS.md
* Resumen_Ejecutivo.md
* INDICE_EVIDENCIAS.md

Copiar automáticamente las evidencias reales del proyecto:

* README.
* Diagramas.
* SonarQube.
* Cypress.
* JMeter.
* Reportes.
* Configuración.
* Arquitectura.
* Métricas.

Si alguna evidencia no existe registrar:

"Evidencia pendiente de incorporar."

---

# Dashboard Final

Generar una tabla resumen indicando:

| Atributo        | Cumplimiento | Estado                  |
| --------------- | ------------ | ----------------------- |
| Functionality   | XX %         | Excelente/Bueno/Regular |
| Usability       | XX %         | ...                     |
| Reliability     | XX %         | ...                     |
| Performance     | XX %         | ...                     |
| Supportability  | XX %         | ...                     |
| Seguridad       | XX %         | ...                     |
| Arquitectura    | XX %         | ...                     |
| Calidad General | XX %         | ...                     |

---

# Resultado esperado

Debe generarse automáticamente:

```text
02_Auditor_FURPS/

├──01_Prompt.md
├──02_Resultado_IA.md
├──03_Mejoras.md
├──04_Conclusiones.md
│
└──Evidencias/
      ├──Matriz_FURPS.md
      ├──Matriz_FURPS.xlsx
      ├──Matriz_Hallazgos.md
      ├──Matriz_Hallazgos.xlsx
      ├──Checklist_Auditoria.md
      ├──Dashboard_FURPS.md
      ├──Resumen_Ejecutivo.md
      └──INDICE_EVIDENCIAS.md
```

La documentación debe tener calidad profesional, utilizar información real del proyecto CAFE-IA y quedar lista para anexarse al informe final y a la evaluación de evidencias ICACIT.
