---
name: cafe-sostenible-fixer
description: Use when: fixing full-stack React/Node.js/SQLite applications for sustainable coffee systems, handling blank screens, data flow, quality control, AI predictions, without committing.
---

Actúa como desarrollador full stack senior. Revisa y corrige TODO el proyecto "Café Sostenible AI" sin hacer commit ni push.

Objetivo:
Dejar el sistema funcionando sin errores, sin pantallas en blanco y con datos reales desde SQLite.

Problemas actuales:
- Al guardar evaluación en Control de Calidad la pantalla queda en blanco.
- Base de Datos aparece en blanco.
- Módulo IA no muestra fecha, tipo de café ni probabilidad/confianza en historial.
- Algunas correcciones dañaron otros módulos.
- Reportes y trazabilidad deben mostrar todos los lotes.
- Control de calidad debe mejorar validaciones y vista.

1. CORREGIR PANTALLA EN BLANCO
Revisar todos los componentes:
- App.jsx
- Layout.jsx
- Dashboard.jsx
- Productores.jsx
- RegistroProduccion.jsx
- ControlCalidad.jsx
- ModuloIA.jsx
- BaseDatos.jsx
- Trazabilidad.jsx
- Reportes.jsx

Agregar manejo de errores con try/catch.
Si algo falla, mostrar mensaje de error visual, NO pantalla en blanco.

2. CONTROL DE CALIDAD
Corregir ControlCalidad.jsx.

Debe cargar lotes reales desde backend.
En el selector "Lotes a evaluar" debe mostrarse así:

LOTE-0001 - Productor: Juan Pérez - Variedad: Arábica

Debe mostrar automáticamente datos del lote seleccionado:
- ID del lote
- código de lote
- productor
- variedad de café
- humedad
- temperatura
- altitud
- tipo de secado
- fecha de cosecha

Validaciones:
- puntaje mínimo: 1
- puntaje máximo: 100
- aroma, acidez y cuerpo también entre 1 y 100
- no permitir guardar si hay campos inválidos

Reglas:
- 85 a 100 = Calidad Alta
- 70 a 84 = Calidad Media
- 1 a 69 = Calidad Baja

Estado:
- Alta = Aprobado
- Media = Observado
- Baja = Rechazado

Al guardar evaluación:
- enviar POST /api/control-calidad
- guardar en SQLite
- mostrar mensaje "Evaluación guardada correctamente"
- actualizar historial
- NO dejar pantalla en blanco

3. BACKEND CONTROL CALIDAD
Revisar endpoint:
POST /api/control-calidad
GET /api/control-calidad

Debe retornar JSON correcto.
Debe guardar:
- lote_id
- aroma
- acidez
- cuerpo
- puntaje_taza
- defectos
- calidad_final
- estado
- observaciones
- fecha_evaluacion

Si la tabla no tiene columna estado, agregarla correctamente sin romper SQLite.
No usar ALTER TABLE UNIQUE.
Manejar errores sin tumbar backend.

4. BASE DE DATOS
Corregir BaseDatos.jsx.

Debe mostrar datos reales desde backend:
- Productores
- Lotes
- Producción
- Trazabilidad
- Control Calidad
- Predicciones IA

Si una tabla está vacía, mostrar:
"No hay registros disponibles".

Agregar botón "Actualizar datos".
Agregar indicador:
- Backend conectado
- SQLite activo

No dejar pantalla en blanco.
No depender de mocks.

5. MÓDULO IA
Corregir ModuloIA.jsx.

Debe cargar lotes reales desde backend.
Selector de lote:
LOTE-0001 - Productor: Juan Pérez - Variedad: Arábica

Al seleccionar lote, mostrar:
- productor
- código de lote
- variedad de café
- humedad
- temperatura
- altitud
- tipo de secado
- fecha de cosecha

Al ejecutar predicción:
- POST /api/prediccion-ia
- guardar resultado en SQLite
- mostrar resultado

Resultado debe incluir:
- calidad predicha
- probabilidad/confianza %
- tipo de café / variedad
- fecha de predicción
- factores influyentes
- recomendación
- modelo usado

Historial de predicciones debe mostrar:
- fecha
- lote
- productor
- tipo de café
- calidad predicha
- probabilidad/confianza
- recomendación

6. BACKEND IA
Corregir:
POST /api/prediccion-ia
GET /api/predicciones

Debe retornar:
- id
- lote_id
- codigo_lote
- productor
- variedad_cafe
- humedad
- temperatura
- altitud
- tipo_secado
- calidad_predicha
- confianza
- factores_influyentes
- recomendacion
- modelo_usado
- fecha_prediccion

7. TRAZABILIDAD
Corregir Trazabilidad.jsx.

Debe mostrar TODOS los lotes registrados.
Por cada lote mostrar:
- código de lote
- productor
- variedad
- fecha cosecha
- estado actual
- línea de tiempo

La línea de tiempo debe incluir:
- Producción
- Secado
- Control de calidad
- Almacenamiento
- Comercialización

Si no existe trazabilidad para un lote, crear visualmente etapas básicas.
Permitir agregar nueva etapa.

8. REPORTES
Corregir Reportes.jsx.

Debe mostrar reportes reales:
- Reporte de Producción
- Reporte de Trazabilidad
- Reporte de Control de Calidad
- Reporte de Predicción IA

Reporte IA debe mostrar:
- lote
- productor
- tipo de café
- calidad predicha
- confianza/probabilidad
- fecha
- recomendación

Reporte trazabilidad debe mostrar todos los lotes y sus etapas.
Agregar botones:
- Generar Reporte
- Generar Reporte IA
- Exportar Reporte (simulado)

9. DASHBOARD
Corregir Dashboard.jsx.

Debe calcular desde backend:
- total productores
- total lotes
- producción total kg
- calidad promedio
- predicciones recientes
- alertas por humedad alta

No debe romperse si una API falla.

10. API SERVICE
Revisar src/services/api.js.
Todas las funciones deben manejar errores:
- getProductores
- getLotes
- getProduccion
- getTrazabilidad
- getControlCalidad
- getPredicciones
- createControlCalidad
- ejecutarPrediccionIA
- reportes

Si backend falla, devolver arrays vacíos o errores controlados, no romper React.

11. CONSISTENCIA DE DATOS
Asegurar que todos los módulos usen los mismos campos:
- codigo_lote
- productor_id
- productor_nombre
- variedad_cafe
- humedad
- temperatura
- altitud
- tipo_secado
- fecha_cosecha
- fecha_prediccion
- confianza

Corregir nombres inconsistentes como probabilidad/confianza para que se muestre correctamente.

12. README
Actualizar README.md con:
- corrección de Control Calidad
- módulo IA
- reportes
- SQLite
- comandos de ejecución
- solución a errores comunes

13. RESULTADO FINAL
Al ejecutar:

Backend:
cd backend
npm run start

Frontend:
npm run dev

Debe funcionar:
- sin pantalla en blanco
- control de calidad guarda correctamente
- base de datos muestra registros
- IA muestra fecha, tipo de café y confianza
- trazabilidad muestra todos los lotes
- reportes muestran datos reales
- frontend y backend conectados
- SQLite activo

No hacer commit.
No hacer push.
No modificar extensiones de VS Code.