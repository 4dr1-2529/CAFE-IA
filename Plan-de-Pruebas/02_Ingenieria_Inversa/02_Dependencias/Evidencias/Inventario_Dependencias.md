# Inventario de Dependencias — CAFE-IA

**Fecha:** 2026-06-24  
**Metodología:** Lectura de `package.json`, `package-lock.json`, `npm list --depth=0`, `npm audit --json`

---

## Totales declarados (directos)

| Ámbito | Producción | Desarrollo | Total directo |
|--------|------------|------------|---------------|
| Backend | 10 | 2 | 12 |
| Frontend | 7 | 13 | 20 |
| Monorepo raíz | 0 | 2 | 2 |
| Python ML | 3 | 0 | 3 |
| **Total Node/npm directo** | **17** | **17** | **34** |

> Las dependencias transitivas se resuelven en `package-lock.json` (tres lockfiles: raíz, backend, frontend). Conteo exacto de transitivas: evidencia en lockfiles copiados.

---

## Inventario backend (producción)

| # | Paquete | Declarada | Instalada (lock) |
|---|---------|-----------|------------------|
| 1 | bcryptjs | ^2.4.3 | 2.4.3 |
| 2 | cors | ^2.8.5 | 2.8.6 |
| 3 | dotenv | ^16.4.5 | 16.6.1 |
| 4 | exceljs | ^4.4.0 | 4.4.0 |
| 5 | express | ^4.18.2 | 4.22.2 |
| 6 | express-rate-limit | ^7.5.1 | 7.5.1 |
| 7 | helmet | ^7.2.0 | 7.2.0 |
| 8 | jsonwebtoken | ^9.0.2 | 9.0.3 |
| 9 | mysql2 | ^3.9.2 | 3.22.3 |
| 10 | pdfkit | ^0.15.0 | 0.15.2 |

## Inventario backend (desarrollo)

| # | Paquete | Instalada |
|---|---------|-----------|
| 1 | @mermaid-js/mermaid-cli | 11.4.0 |
| 2 | supertest | 6.3.4 |

---

## Inventario frontend (producción)

| # | Paquete | Declarada | Instalada |
|---|---------|-----------|-----------|
| 1 | lucide-react | ^0.294.0 | 0.294.0 |
| 2 | prop-types | ^15.8.1 | 15.8.1 |
| 3 | react | ^18.2.0 | 18.3.1 |
| 4 | react-dom | ^18.2.0 | 18.3.1 |
| 5 | react-qr-code | ^2.0.21 | 2.0.21 |
| 6 | react-router-dom | ^6.20.0 | 6.30.3 |
| 7 | recharts | ^2.10.3 | 2.15.4 |

## Inventario frontend (desarrollo)

| # | Paquete | Instalada |
|---|---------|-----------|
| 1 | @fontsource/inter | 5.2.8 |
| 2 | @types/react | 18.3.28 |
| 3 | @types/react-dom | 18.3.7 |
| 4 | @vitejs/plugin-react | 4.7.0 |
| 5 | autoprefixer | 10.5.0 |
| 6 | eslint | 8.57.1 |
| 7 | eslint-plugin-react | 7.37.5 |
| 8 | eslint-plugin-react-hooks | 4.6.2 |
| 9 | postcss | 8.5.10 |
| 10 | prettier | 3.8.3 |
| 11 | tailwindcss | 3.4.19 |
| 12 | vite | 5.4.21 |

---

## Inventario monorepo (desarrollo)

| # | Paquete | Instalada |
|---|---------|-----------|
| 1 | cross-env | 7.0.3 |
| 2 | cypress | 13.17.0 |

---

## Inventario Python ML

| # | Paquete | Requisito |
|---|---------|-----------|
| 1 | pandas | ≥2.0.0 |
| 2 | scikit-learn | ≥1.3.0 |
| 3 | joblib | ≥1.5.3 |

---

## Paquetes NO presentes (verificado en package.json)

| Paquete | Estado |
|---------|--------|
| multer | No instalado |
| node-cron | No instalado |
| axios | No instalado |
| sweetalert2 | No instalado |
| react-icons | No instalado |
| prisma | No instalado |

---

## Overrides npm (backend y monorepo)

| Paquete | Versión |
|---------|---------|
| tmp | ^0.2.6 |
| uuid | ^11.1.1 |
