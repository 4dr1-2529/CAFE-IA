# Resumen Ejecutivo — Análisis de Dependencias CAFE-IA

**Fecha:** 2026-06-24  
**Actividad:** Ingeniería Inversa — Paso 2

---

## Totales

| Métrica | Valor |
|---------|-------|
| **Dependencias directas Node/npm** | **34** |
| Producción (backend + frontend) | 17 |
| Desarrollo (backend + frontend + monorepo) | 17 |
| Dependencias Python ML | 3 |
| Overrides npm | 2 (`tmp`, `uuid`) |

---

## Desglose por capa

| Capa | Directas | Críticas |
|------|----------|----------|
| Backend producción | 10 | express, mysql2, jsonwebtoken |
| Backend desarrollo | 2 | — |
| Frontend producción | 7 | react, react-dom, react-router-dom |
| Frontend desarrollo | 13 | vite, tailwindcss |
| Monorepo | 2 | cypress |
| Herramientas externas | 6 | MySQL, Railway, Vercel, SonarCloud, JMeter, GitHub Actions |

---

## Dependencias críticas (runtime producción)

1. **express** 4.22.2 — API REST  
2. **mysql2** 3.22.3 — Persistencia  
3. **jsonwebtoken** 9.0.3 — Autenticación  
4. **react** 18.3.1 + **react-dom** — Interfaz usuario  
5. **react-router-dom** 6.30.3 — Navegación SPA  
6. **MySQL 8** (servicio Railway)  
7. **Vite build** → artefacto estático en Vercel  

---

## Dependencias desactualizadas o con deuda

| Paquete | Motivo |
|---------|--------|
| react-router-dom 6.30.3 | CVE open redirect; parche en ≥6.30.4 |
| lucide-react 0.294.0 | Semver 0.x; versiones posteriores disponibles |
| eslint 8.57.1 | Rama 8 en mantenimiento; ESLint 9 disponible |

---

## Dependencias con vulnerabilidades (npm audit 2026-06-24)

| Ámbito | Cantidad | Severidad máxima |
|--------|----------|------------------|
| Backend | 2 paquetes | **High** (form-data) |
| Frontend | 6 hallazgos / 5 paquetes | Moderate (react-router, esbuild, js-yaml) |

**Paquetes afectados:** form-data, dompurify, react-router, esbuild, js-yaml, @babel/core

---

## Paquetes del alcance NO instalados

multer · node-cron · axios · sweetalert2 · react-icons · prisma

El proyecto utiliza alternativas documentadas: `fetch` nativo, `ToastContext`, `lucide-react`, SQL directo con mysql2.

---

## Estado general

El stack de dependencias de CAFE-IA es **coherente, moderno y acotado** (34 directas npm), con versiones resueltas mayormente actualizadas gracias a lockfiles. Las principales brechas son:

- **2 vulnerabilidades backend** (1 high) en dependencias transitivas de testing/docs  
- **6 vulnerabilidades frontend** (mayoría dev/build)  
- **react-router-dom** en rango CVE sin parche aplicado  
- **Cypress** sin integración CI  

**Calificación dependencias: 7.8 / 10** — apto para producción con plan de actualización de seguridad.

---

*Ver `Matriz_Dependencias.md` y archivos `Dependencias_*.md` para detalle completo.*
