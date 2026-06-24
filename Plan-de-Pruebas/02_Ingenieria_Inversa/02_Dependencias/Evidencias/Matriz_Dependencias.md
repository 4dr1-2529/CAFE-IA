# Matriz de Dependencias — CAFE-IA

**Fecha:** 2026-06-24

| ID | Dependencia | Versión | Tipo | Función | Estado | Riesgo | Criticidad | Recomendación |
|----|-------------|---------|------|---------|--------|--------|------------|---------------|
| DEP-001 | express | 4.22.2 | Backend | API REST HTTP | Actualizada | Bajo | Crítica | Mantener en 4.x parcheado |
| DEP-002 | mysql2 | 3.22.3 | Backend | Cliente MySQL pool | Actualizada | Bajo | Crítica | Mantener actualizado |
| DEP-003 | jsonwebtoken | 9.0.3 | Backend | JWT auth | Actualizada | Medio | Crítica | Rotar JWT_SECRET periódicamente |
| DEP-004 | bcryptjs | 2.4.3 | Backend | Hash contraseñas | Actualizada | Bajo | Alta | Mantener cost factor ≥10 |
| DEP-005 | cors | 2.8.6 | Backend | CORS multi-origen | Actualizada | Medio | Alta | Revisar CORS_ORIGINS prod |
| DEP-006 | helmet | 7.2.0 | Backend | Headers seguridad | Actualizada | Bajo | Alta | Actualizar con Express |
| DEP-007 | express-rate-limit | 7.5.1 | Backend | Anti-abuso HTTP | Actualizada | Bajo | Media | Ajustar límites si escala |
| DEP-008 | dotenv | 16.6.1 | Backend | Variables .env local | Actualizada | Medio | Alta | No commitear .env |
| DEP-009 | exceljs | 4.4.0 | Backend | Export Excel | Actualizada | Bajo | Media | — |
| DEP-010 | pdfkit | 0.15.2 | Backend | Export PDF | Actualizada | Bajo | Media | — |
| DEP-011 | supertest | 6.3.4 | Backend dev | Tests HTTP | Actualizada | form-data HIGH | Baja | npm audit fix |
| DEP-012 | @mermaid-js/mermaid-cli | 11.4.0 | Backend dev | Docs BD PNG | Actualizada | dompurify mod | Baja | Solo scripts |
| DEP-013 | react | 18.3.1 | Frontend | UI core | Actualizada | Bajo | Crítica | Plan migración React 19 futuro |
| DEP-014 | react-dom | 18.3.1 | Frontend | Render DOM | Actualizada | Bajo | Crítica | Alinear con react |
| DEP-015 | react-router-dom | 6.30.3 | Frontend | Routing SPA | Desactualizada | CVE moderate | Alta | Actualizar a ≥6.30.4 |
| DEP-016 | vite | 5.4.21 | Frontend dev | Build/HMR | Actualizada | esbuild mod dev | Crítica | No exponer dev server |
| DEP-017 | tailwindcss | 3.4.19 | Frontend dev | Estilos | Actualizada | Bajo | Alta | — |
| DEP-018 | recharts | 2.15.4 | Frontend | Gráficos | Actualizada | Bundle size | Media | Lazy load charts |
| DEP-019 | lucide-react | 0.294.0 | Frontend | Iconos | Desactualizada | Bajo | Baja | Actualizar minor |
| DEP-020 | react-qr-code | 2.0.21 | Frontend | QR lotes | Actualizada | Bajo | Baja | — |
| DEP-021 | prop-types | 15.8.1 | Frontend | Props validation | Actualizada | Bajo | Baja | — |
| DEP-022 | eslint | 8.57.1 | Frontend dev | Lint | Desactualizada | EOL 8.x | Media | Plan ESLint 9 |
| DEP-023 | @vitejs/plugin-react | 4.7.0 | Frontend dev | Plugin Vite | Actualizada | Bajo | Alta | — |
| DEP-024 | cypress | 13.17.0 | Herramienta | E2E tests | Actualizada | Sin CI | Alta | Integrar en pipeline |
| DEP-025 | cross-env | 7.0.3 | Herramienta | Scripts OS | Actualizada | Bajo | Baja | — |
| DEP-026 | MySQL 8 | Servicio | Herramienta | Base datos | Actualizada | Bajo | Crítica | Backups Railway |
| DEP-027 | SonarCloud | SaaS | Herramienta | Calidad código | Activo | Métricas offline | Alta | Capturar dashboard |
| DEP-028 | JMeter | Externa | Herramienta | Carga | Documentada | Alcance limitado | Media | Ampliar escenarios |
| DEP-029 | Railway | PaaS | Herramienta | Deploy API+DB | Operativo | Bajo | Crítica | Monitorear logs |
| DEP-030 | Vercel | PaaS | Herramienta | Deploy SPA | Operativo | Bajo | Crítica | — |
| DEP-031 | form-data | 4.0.x trans | Backend trans | Multipart HTTP | Vulnerable | **HIGH** CVE | Alta | npm audit fix |
| DEP-032 | dompurify | ≤3.4.10 trans | Backend trans | Sanitize HTML | Vulnerable | Moderate | Media | Actualizar cadena mermaid |
| DEP-033 | react-router | 6.30.3 trans | Frontend trans | Routing core | Vulnerable | Moderate CVE | Alta | Parche ≥6.30.4 |
| DEP-034 | esbuild | ≤0.24.2 trans | Frontend trans | Bundler Vite | Vulnerable | Moderate dev | Media | Solo afecta dev |
| DEP-035 | pandas | ≥2.0.0 | ML Python | Datos ML | Declarada | Bajo | Baja | Solo evidencia académica |
| DEP-036 | scikit-learn | ≥1.3.0 | ML Python | Modelo RF | Declarada | Bajo | Baja | — |
| DEP-037 | joblib | ≥1.5.3 | ML Python | Serialización | Parcheada | Bajo | Baja | ≥1.5.3 aplicado |
| DEP-038 | multer | — | — | No instalado | N/A | N/A | — | No requerido actualmente |
| DEP-039 | node-cron | — | — | No instalado | N/A | N/A | — | No requerido |
| DEP-040 | axios | — | — | No instalado | N/A | — | — | Usa fetch nativo |
| DEP-041 | sweetalert2 | — | — | No instalado | N/A | — | — | Usa ToastContext |
| DEP-042 | react-icons | — | — | No instalado | N/A | — | — | Usa lucide-react |
