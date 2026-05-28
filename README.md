# Café Sostenible AI

**Sistema de Trazabilidad Inteligente para Café Sostenible** — plataforma full-stack con arquitectura hexagonal, MySQL empresarial, JWT, IA predictiva y trazabilidad con QR.

[![Node](https://img.shields.io/badge/Node-18+-green)]()
[![React](https://img.shields.io/badge/React-18-blue)]()
[![MySQL](https://img.shields.io/badge/MySQL-8-orange)]()
[![Arquitectura](https://img.shields.io/badge/Arquitectura-Hexagonal-purple)]()

---

## Características

- Trazabilidad completa de lotes (5 etapas + línea de tiempo + QR)
- Control de calidad sensorial
- Predicción IA v2 (confianza, riesgo %, alertas, recomendaciones)
- Dashboard analítico con KPIs y gráficos
- Reportes PDF y Excel
- Autenticación JWT (Admin, Supervisor, Productor)
- MySQL 35+ tablas · Dark mode · PMV1/2/3

---

## Estructura del proyecto

Ver [docs/ESTRUCTURA_PROYECTO.md](docs/ESTRUCTURA_PROYECTO.md)

```text
cafe-cursor/
├── .github/workflows/ci.yml
├── backend/
│   ├── sql/              # schema.sql (39 tablas), views.sql, seeds.sql
│   ├── src/              # hexagonal: domain · application · infrastructure · interfaces
│   └── tests/            # Jest + Supertest (~18 casos)
├── frontend/src/
│   ├── pages/            # dashboard, productores, ia, sistema (evidencias, arquitectura…)
│   ├── layouts/ · routes/ · context/ · components/ui
│   └── services/api/     # Cliente REST + JWT
├── ml/                   # train_model.py + dataset (Scikit-learn)
├── docs/                 # ESTRUCTURA_PROYECTO.md, PMV2.md, matriz HU…
└── INICIAR.bat
```

Árbol detallado: [docs/ESTRUCTURA_PROYECTO.md](docs/ESTRUCTURA_PROYECTO.md) o pantalla **Arquitectura** en la app.

---

## Requisitos

| Herramienta | Versión |
|-------------|---------|
| Node.js | 18+ |
| MySQL | 8+ (XAMPP recomendado) |
| npm | 9+ |

---

## PMV2 — datos de demostración (25 lotes)

```bash
# Primera vez o regenerar dataset completo
cd backend
set SEED_PMV2_FORCE=1
npm run db:seed:pmv2
```

Incluye 5 productores, 25 lotes, trazabilidad, calidad y predicciones IA. Ver [docs/PMV2.md](docs/PMV2.md).

---

## Instalación rápida

### 1. Clonar e instalar

```bash
cd cafe-cursor
npm run install:all
```

### 2. Configurar MySQL

```bash
cd backend
copy .env.example .env
# Editar DB_PASSWORD si aplica
```

Iniciar MySQL en XAMPP (botón **Start** en MySQL).

### 3. Iniciar servicios

**Opción A — Windows**

Doble clic en `INICIAR.bat`

**Opción B — Manual**

```bash
# Terminal 1
cd backend && npm start

# Terminal 2
cd frontend && npm run dev
```

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:5174 |
| Backend API | http://localhost:3029/api |
| Health | http://localhost:3029/api/health |

### Credenciales demo

```
Email:    admin@cafeai.com
Password: admin123
```

---

## Variables de entorno

### Backend (`backend/.env`)

```env
PORT=3029
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
DB_NAME=cafe_sostenible
JWT_SECRET=tu_secreto_minimo_32_caracteres
CORS_ORIGINS=http://localhost:5174
```

### Frontend (`frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:3029
```

---

## API REST

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login JWT |
| GET | `/api/dashboard/metrics` | KPIs dashboard |
| GET/POST | `/api/productores` | Productores |
| GET/POST | `/api/lotes` | Lotes |
| GET | `/api/lotes/:id` | Detalle + trazabilidad |
| POST | `/api/prediccion-ia` | Ejecutar predicción |
| GET | `/api/reportes/export/:tipo/pdf` | Exportar PDF |

Documentación ampliada: [docs/DOCUMENTACION_TECNICA.md](docs/DOCUMENTACION_TECNICA.md)

---

## Arquitectura

**Hexagonal (backend)**

```text
Routes → Controllers → Services → Domain / Repositories → MySQL
```

Controllers: Productores, Lotes, Calidad, Trazabilidad, Predicciones, Dashboard.

**Frontend**

```text
Pages → Services (API) → Backend
Context: Auth + Theme
```

---

## Base de datos

- Motor: **MySQL 8**
- Base: `cafe_sostenible`
- Tablas: **35+** (seguridad, productores, lotes, calidad, IA, reportes, auditoría)
- Script: `backend/sql/schema.sql`
- Migración automática al iniciar el backend

---

## Tests (13 casos)

```bash
cd backend
npm test
```

| Suite | Cobertura |
|-------|-----------|
| Health + API errors | Endpoints y validación HTTP |
| Validators | DTOs lote, calidad, productor, trazabilidad |
| CalidadService | Puntaje sensorial 0–100 |
| PredictionEngine | IA v2, riesgo y alertas |

---

## ML (evidencia universitaria)

```bash
cd ml
pip install -r requirements.txt
python train_model.py
```

---

## Deploy

| Plataforma | Componente |
|------------|--------------|
| Render / Railway | Backend + MySQL |
| Vercel | Frontend — Root Directory: `frontend`, `frontend/vercel.json` |

---

## PMV

| PMV | Alcance |
|-----|---------|
| PMV1 | CRUD, trazabilidad, calidad, IA reglas |
| PMV2 | MySQL, JWT, reportes, hexagonal |
| PMV3 | IA v2, QR, dashboard, ML Python, dark mode |

---

## Licencia

MIT — Proyecto académico Café Sostenible AI.
