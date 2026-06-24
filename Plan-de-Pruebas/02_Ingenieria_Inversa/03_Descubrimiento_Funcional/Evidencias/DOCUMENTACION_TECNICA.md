# Documentación Técnica — Café Sostenible AI v2.0

## 1. Arquitectura del sistema (Hexagonal)

```text
┌─────────────────────────────────────────────────────────────┐
│  INTERFACES (Adaptadores de entrada)                        │
│  Express Routes · Middleware JWT · CORS                     │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│  APPLICATION (Casos de uso / Servicios)                     │
│  AuthService · PredictionService · DashboardService         │
│  ReportExportService                                        │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│  DOMAIN (Lógica de negocio pura)                            │
│  PredictionEngine (heurística ML v2.0)                      │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│  INFRASTRUCTURE (Adaptadores de salida)                     │
│  MySQL Pool · Migraciones · Repositorios SQL                │
└─────────────────────────────────────────────────────────────┘
```

### Frontend (hexagonal parcial)
- **Presentación:** `components/`
- **Application:** `application/useCases.js`
- **Domain:** `domain/entities.js`
- **Infrastructure:** `infrastructure/mlService.js`, `services/api.js`

## 2. Base de datos MySQL (35 tablas)

| Módulo | Tablas |
|--------|--------|
| Geografía | regiones, provincias, distritos |
| Seguridad | roles, permisos, rol_permisos, usuarios, sesiones, auditoria_logs |
| Productores | productores, fincas |
| Café | variedades_cafe, tipos_cultivo, procesos_secado, estados_lote, lotes |
| Producción | cosechas, produccion, produccion_diaria, inventario, movimientos_stock |
| Trazabilidad | trazabilidad |
| Calidad | criterios_calidad, control_calidad, evaluaciones_calidad, defectos_grano, evaluacion_defectos, resultados_cata |
| IA | predicciones_ia, variables_prediccion, alertas_ia, recomendaciones_ia |
| Reportes | reportes, exportaciones, historial_reportes |
| Sistema | notificaciones, configuraciones, actividades_usuario, dashboard_metricas |

## 3. MySQL vs SQLite

| Criterio | SQLite (v1) | MySQL (v2) |
|----------|-------------|------------|
| Concurrencia | Baja | Alta (pool) |
| Escalabilidad | Local | Empresarial |
| Integridad FK | Limitada | Completa |
| Roles/Auth | No | JWT + RBAC |
| Tablas | 6 | 35+ |
| Deploy cloud | Difícil | Render/Railway |

## 4. JWT y roles

- **Admin:** acceso total
- **Supervisor:** operaciones y reportes
- **Productor:** consulta de lotes propios

Endpoints: `POST /api/auth/login`, `POST /api/auth/register`, `POST /api/auth/logout`, `GET /api/auth/me`

## 5. PMV y Scrum

| PMV | Alcance | Estado |
|-----|---------|--------|
| PMV1 | CRUD productores, lotes, trazabilidad, calidad, IA básica | ✅ |
| PMV2 | MySQL, JWT, dashboard analítico, reportes PDF/Excel | ✅ |
| PMV3 | IA avanzada, alertas, arquitectura hexagonal, QA | ✅ |

### Historias de usuario (Scrum)
- HU01 Registro productores
- HU02 Registro lotes + trazabilidad automática
- HU03 Seguimiento trazabilidad + QR
- HU04 Control de calidad
- HU05 Predicción IA
- HU06 Reportes exportables

## 6. Evidencias ML

- Motor: `PredictionEngine` v2.0-heuristic
- Variables: humedad, temperatura, altitud, secado, variedad, puntaje taza, almacenamiento, calidad grano
- Salidas: calidad predicha, confianza %, riesgo %, factores, alertas, recomendaciones
- Tests: `backend/tests/prediction.test.js`

## 7. Gantt / Avance (referencia académica)

| Fase | Planificado | Real | % |
|------|-------------|------|---|
| Análisis | Sem 1-2 | Sem 1-2 | 100% |
| BD MySQL | Sem 3-4 | Sem 3-5 | 100% |
| Backend hexagonal | Sem 5-7 | Sem 5-8 | 100% |
| Frontend SaaS | Sem 8-10 | Sem 8-10 | 95% |
| QA + Docs | Sem 11-12 | Sem 11-12 | 90% |

## 8. Deploy

### Backend (Render)
- Build: `cd backend && npm install`
- Start: `npm start`
- Env: `DB_*`, `JWT_SECRET`, `CORS_ORIGINS`

### Frontend (Vercel)
- Build: `cd frontend && npm run build`
- Env: `VITE_API_BASE_URL=https://tu-api.onrender.com`

## 9. Instalación local

```bash
# MySQL: crear usuario y copiar .env
cp backend/.env.example backend/.env

cd backend && npm install && npm start
cd frontend && npm run dev
```

Credenciales: `admin@cafeai.com` / `admin123`
