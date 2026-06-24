# Matriz Tecnológica — CAFE-IA

**Fecha:** 2026-06-24  
**Fuente:** `package.json`, `package-lock.json`, código fuente, configuraciones de despliegue

| ID | Tecnología | Categoría | Versión | Función | Estado | Riesgo | Recomendación |
|----|------------|-----------|---------|---------|--------|--------|---------------|
| TEC-001 | React | Frontend | 18.3.1 | UI SPA componentes | Implementado | Bajo | Mantener en rama 18.x |
| TEC-002 | Vite | Frontend | 5.4.21 | Bundler y dev server | Implementado | Medio (CVE dev) | No exponer dev server; evaluar upgrade |
| TEC-003 | Tailwind CSS | Frontend | 3.4.19 | Estilos utility-first | Implementado | Bajo | Mantener actualizado |
| TEC-004 | PostCSS / Autoprefixer | Frontend | 8.5.10 / 10.5.0 | Pipeline CSS | Implementado | Bajo | — |
| TEC-005 | React Router DOM | Frontend | 6.30.3 | Enrutamiento SPA | Implementado | Medio (CVE redirect) | Actualizar a versión parcheada |
| TEC-006 | Recharts | Frontend | 2.15.4 | Gráficos dashboard | Implementado | Bajo | Lazy load charts |
| TEC-007 | lucide-react | Frontend | 0.294.0 | Iconografía UI | Implementado | Bajo | Sustituto real de react-icons |
| TEC-008 | react-qr-code | Frontend | 2.0.21 | QR trazabilidad | Implementado | Bajo | — |
| TEC-009 | Fetch API nativo | Frontend | ES2022+ | Cliente HTTP | Implementado | Bajo | Sustituto real de axios |
| TEC-010 | ToastContext | Frontend | propio | Notificaciones UI | Implementado | Bajo | Sustituto real de SweetAlert2 |
| TEC-011 | Axios | Frontend | — | Cliente HTTP | **No implementado** | — | No requerido; fetch en uso |
| TEC-012 | SweetAlert2 | Frontend | — | Alertas modales | **No implementado** | — | ToastContext cubre necesidad |
| TEC-013 | React Icons | Frontend | — | Iconos | **No implementado** | — | lucide-react en uso |
| TEC-014 | ESLint / Prettier | Frontend | 8.57.1 / 3.8.3 | Calidad código | Implementado | Bajo | Corregir 2 errores lint |
| TEC-015 | @fontsource/inter | Frontend | 5.2.8 | Tipografía | Implementado | Bajo | — |
| TEC-016 | Node.js | Backend | 20 (CI) | Runtime JavaScript | Implementado | Bajo | Alinear Railway con Node 20 |
| TEC-017 | Express | Backend | 4.22.2 | Framework HTTP REST | Implementado | Bajo | Monitorear CVE Express |
| TEC-018 | jsonwebtoken (JWT) | Backend / Seguridad | 9.0.3 | Autenticación stateless | Implementado | Medio | Rotar JWT_SECRET; expiración 8h |
| TEC-019 | bcryptjs | Backend / Seguridad | 2.4.3 | Hash contraseñas | Implementado | Bajo | — |
| TEC-020 | mysql2 | Backend / BD | 3.22.3 | Driver MySQL pool | Implementado | Bajo | SSL en Railway |
| TEC-021 | dotenv | Backend | 16.6.1 | Variables entorno | Implementado | Medio | No commitear .env |
| TEC-022 | cors | Backend / Seguridad | 2.8.6 | CORS multi-origen | Implementado | Medio | Revisar lista CORS_ORIGINS |
| TEC-023 | helmet | Backend / Seguridad | 7.2.0 | Headers HTTP seguridad | Implementado | Bajo | — |
| TEC-024 | express-rate-limit | Backend / Seguridad | 7.5.1 | Rate limiting 500/15min | Implementado | Bajo | Ajustar en picos |
| TEC-025 | exceljs | Backend | 4.4.0 | Export reportes Excel | Implementado | Bajo | Override tmp CVE aplicado |
| TEC-026 | pdfkit | Backend | 0.15.2 | Export reportes PDF | Implementado | Bajo | — |
| TEC-027 | multer | Backend | — | Upload archivos | **No implementado** | — | Sin carga de archivos en API |
| TEC-028 | node-cron | Backend | — | Tareas programadas | **No implementado** | — | Sin jobs cron en backend |
| TEC-029 | node:test + supertest | Calidad | nativo / 6.3.4 | Tests backend | Implementado | Bajo | Habilitar integración en CI |
| TEC-030 | MySQL | Base de Datos | 8.x (Railway) | Persistencia relacional | Implementado | Medio | Backups Railway |
| TEC-031 | schema.sql | Base de Datos | v2.6+ | 39 tablas, FK, índices | Implementado | Bajo | — |
| TEC-032 | migrate.js | Base de Datos | propio | Migración y seeds | Implementado | Medio | Fail-fast en seeds |
| TEC-033 | Railway | Infraestructura | SaaS | API + MySQL prod | Implementado | Medio | Variables MYSQL* unificadas |
| TEC-034 | Vercel | Infraestructura | SaaS | Hosting SPA React | Implementado | Bajo | VITE_API_URL en build |
| TEC-035 | GitHub Actions | DevOps | ci.yml | CI backend/frontend/Sonar | Implementado | Medio | Agregar Cypress a CI |
| TEC-036 | render.yaml | Infraestructura | alt. | Blueprint Render | Referencia | Bajo | No es despliegue activo principal |
| TEC-037 | Docker | DevOps | — | Contenedorización | **No implementado** | Medio | Sin Dockerfile en repo |
| TEC-038 | Cypress | Calidad | 13.17.0 | E2E 11 specs PF-01–11 | Implementado | Medio | No en CI; re-ejecutar |
| TEC-039 | Apache JMeter | Calidad | scripts | Carga /api/health | Implementado | Medio | Ampliar escenarios JWT |
| TEC-040 | SonarCloud | Calidad | SaaS | Análisis estático CI | Implementado | Bajo | Capturar Quality Gate |
| TEC-041 | PredictionEngine.js | Machine Learning | v2.0-heuristic | Predicción prod Node.js | Implementado | Bajo | Documentar vs Python |
| TEC-042 | scikit-learn (Python) | Machine Learning | ≥1.3.0 | RandomForest offline | Académico | Bajo | No integrado en API prod |
| TEC-043 | pandas / joblib | Machine Learning | ≥2.0 / ≥1.5 | Entrenamiento ML offline | Académico | Bajo | Solo `ml/train_model.py` |
| TEC-044 | cross-env | DevOps | 7.0.3 | Scripts Cypress multi-OS | Implementado | Bajo | — |
| TEC-045 | @mermaid-js/mermaid-cli | DevOps | 11.4.0 | Docs diagramas BD | Implementado (dev) | Bajo | — |

---

**Total tecnologías inventariadas:** 45 (37 implementadas, 5 no implementadas, 3 académicas/referencia)
