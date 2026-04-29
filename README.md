# Café Sostenible AI

**Sistema de trazabilidad inteligente y predicción de calidad del café sostenible basado en Machine Learning e Inteligencia Artificial**

Plataforma full-stack para trazabilidad del café, control de calidad y predicción IA con persistencia real en SQLite.

## Problema que resuelve

Permite registrar productores y lotes, seguir etapas de trazabilidad, evaluar calidad y ejecutar predicciones IA bajo demanda, evitando hojas de cálculo dispersas y pérdida de historial operativo.

## Tecnologías

- Frontend: React + Vite + TailwindCSS
- Backend: Node.js + Express
- Base de datos: SQLite (`backend/database.sqlite`)
- Gráficos/UI: Recharts + Lucide React

## Descripción de la aplicación

Aplicación full-stack para registrar productores y lotes, visualizar trazabilidad por etapas, ejecutar control de calidad y ejecutar predicción IA/ML bajo demanda; todo con persistencia real en SQLite.

## Instalación backend

```bash
cd backend
npm install
npm run start
```

Backend: `http://localhost:3001` (API: `http://localhost:3001/api`).

## Instalación frontend

```bash
npm install
npm run dev
```

Frontend: `http://localhost:5174`.

## SQLite

- Archivo: `backend/database.sqlite`
- Tablas principales:
  - `productores`
  - `lotes`
  - `produccion`
  - `trazabilidad`
  - `control_calidad`
  - `predicciones_ia`

## Endpoints REST principales

- `GET/POST/PUT/DELETE /api/productores`
- `GET /api/lotes`
- `GET /api/lotes/next-code`
- `POST /api/lotes`
- `GET/POST /api/produccion`
- `GET/POST /api/trazabilidad`
- `GET/POST /api/control-calidad`
- `GET/POST /api/predicciones`
- `POST /api/prediccion-ia`
- `GET /api/reportes/produccion`
- `GET /api/reportes/calidad`
- `GET /api/reportes/trazabilidad`
- `GET /api/reportes/predicciones`

## Módulos

- Productores
- Registro de producción/lotes
- Trazabilidad
- Control de calidad
- Módulo IA
- Base de datos (visualización)
- Reportes
- Evidencias PMV
- Arquitectura
- Historias de usuario

## Módulo IA

- Carga lotes reales desde backend.
- Ejecuta predicción solo con acción del usuario.
- Guarda predicción real con `lote_id` válido (1 predicción por lote).
- Muestra: `calidad_predicha`, `confianza`, `factores_influyentes`, `recomendacion`, `fecha_prediccion`, `variedad_cafe`.

**Modelo usado:** “Modelo predictivo basado en reglas de Machine Learning”.

**Variables de entrada:** humedad, temperatura, altitud, tipo de secado, variedad de café y puntaje de calidad (si existe).

**Salida:** calidad predicha, confianza y recomendación técnica.

## Reglas de negocio

- Un lote solo puede tener **una evaluación** de control de calidad.
- Un lote solo puede tener **una predicción IA**.
- Los datos se guardan en **SQLite** (`backend/database.sqlite`) y se consumen mediante la API REST.

## Reportes

Incluye reportes de:

- Producción
- Trazabilidad (etapas por tipo reales)
- Control de calidad
- Predicción IA (solo predicciones reales)

Resumen mostrado:

- Total lotes
- Producción total
- Promedio de calidad
- Total predicciones reales
- Lotes por estado
- Etapas por tipo

## Evidencias PMV

Los módulos de evidencias, arquitectura e historias de usuario están alineados al estado funcional actual del proyecto y flujo real:

`React/Vite -> src/services/api.js -> Express routes -> SQLite`.

## Historias de usuario

- HU01 Registrar productor
- HU02 Registrar lote/producción
- HU03 Consultar trazabilidad
- HU04 Evaluar calidad
- HU05 Ejecutar predicción IA
- HU06 Generar reportes


## Estructura real del proyecto

```text
cafe-cursor/
├── backend/
│   ├── routes/
│   ├── database.js
│   ├── server.js
│   ├── package.json
│   └── database.sqlite
├── src/
│   ├── application/
│   ├── components/
│   ├── domain/
│   ├── infrastructure/
│   ├── services/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```