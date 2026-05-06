# Café Sostenible AI

**Sistema de trazabilidad inteligente y predicción de calidad del café sostenible basado en Inteligencia Artificial y Machine Learning.**

## Descripción
Aplicación web full-stack para gestionar el ciclo productivo del café sostenible con trazabilidad operativa, control de calidad y predicción técnica. El sistema integra frontend y backend desacoplados mediante API REST y persistencia local en SQLite.

## Objetivo
Centralizar la información productiva en una plataforma única, reduciendo errores operativos y pérdida de trazabilidad.  
El sistema resuelve la fragmentación de datos permitiendo registrar productores y lotes, evaluar calidad, generar predicciones y consultar reportes en tiempo real.

## Tecnologías utilizadas

### Frontend
- React
- Vite
- JavaScript JSX
- TailwindCSS / CSS

### Backend
- Node.js
- Express

### Base de datos
- SQLite

### IA / Machine Learning
- Sistema predictivo basado en reglas
- No entrenado con dataset histórico real
- Preparado para futura integración con Python y Scikit-learn
- Variables:
  - humedad
  - temperatura
  - altitud
  - variedad
  - tipo de secado
- Generación de:
  - calidad predicha
  - confianza
  - recomendación técnica

## Arquitectura del Proyecto

```text
cafe-cursor/
├── frontend/
│   ├── src/
│   │   ├── application/
│   │   ├── components/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── index.html
├── backend/
│   ├── routes/
│   ├── database.js
│   ├── database.sqlite
│   ├── server.js
│   └── package.json
├── README.md
└── TODO.md
```

- **`frontend/`** contiene toda la interfaz web basada en React + Vite: componentes visuales, lógica de presentación, servicios de consumo API y configuración de build/estilos.
- **`backend/`** contiene la API REST con Node.js + Express, reglas de negocio, rutas y persistencia de datos en SQLite.
- Frontend y backend funcionan desacoplados: cada capa puede ejecutarse, evolucionar y desplegarse de forma independiente.
- La comunicación entre capas se realiza mediante endpoints REST (`/api/*`), manteniendo una arquitectura modular y organizada.

## Módulos del Sistema
- Dashboard
- Productores
- Registro Producción
- Trazabilidad
- Control Calidad
- Módulo IA
- Base de Datos
- Reportes
- Evidencias PMV
- Arquitectura
- Historias Usuario

## Instalación

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## URLs
- Backend: `http://localhost:3001`
- Frontend: `http://localhost:5174`

## Endpoints REST principales
- `/api/productores`
- `/api/lotes`
- `/api/control-calidad`
- `/api/prediccion-ia`
- `/api/predicciones`
- `/api/reportes`

## Funcionalidades implementadas
- Registro de productores
- Registro de lotes
- Generación automática de código de lote
- Trazabilidad
- Evaluación de calidad
- Predicción IA/ML
- Reportes
- Validaciones anti-duplicado

## Módulo IA (PMV1)
El módulo IA del PMV1 funciona como un sistema predictivo basado en reglas de Machine Learning. No es un modelo entrenado con dataset histórico real, pero permite validar el flujo de predicción usando variables del proceso productivo.

### Variables usadas
- humedad
- temperatura
- altitud
- variedad de café
- tipo de secado

### Resultados generados
- calidad predicha
- confianza
- recomendación técnica

## Reglas de negocio
- Un lote solo puede tener una evaluación de calidad.
- Un lote solo puede tener una predicción IA.
- No se permiten lotes duplicados.
- Los datos se guardan en SQLite.

## Mejoras futuras
- Entrenar modelo real con Python y Scikit-learn.
- Integrar chatbot como mejora futura (no implementado actualmente).
- Exportar reportes PDF/Excel.
- Despliegue cloud.
- Autenticación real.
- Métricas de precisión y exactitud.

## Estado del proyecto
PMV1 funcional y operativo.