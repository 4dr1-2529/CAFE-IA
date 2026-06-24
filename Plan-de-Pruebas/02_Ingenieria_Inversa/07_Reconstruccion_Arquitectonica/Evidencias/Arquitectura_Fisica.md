# Arquitectura Física — CAFE-IA

**Fecha:** 2026-06-24

---

## 1. Nodos físicos

| Nodo | Tecnología | Ubicación | Función |
|------|------------|-----------|---------|
| Cliente | Navegador (Chrome, Firefox, Edge) | Dispositivo usuario | Renderizado SPA |
| CDN/Edge | Vercel | Global edge | Hosting estático `dist/` |
| App Server | Node.js 20 + Express | Railway US/EU | API REST |
| Database Server | MySQL 8 | Railway managed | Persistencia 39 tablas |

---

## 2. Topología física producción

```
[Internet]
    │
    ├──► cafe-ia-inky.vercel.app (Vercel)
    │         └── archivos estáticos: index.html, JS, CSS
    │
    └──► cafe-sostenible-api-production-03ad.up.railway.app (Railway)
              └── proceso Node server.js :PORT
                       └── conexión TCP SSL → Railway MySQL
```

**Evidencia:** `vercel.json` (`VITE_API_URL`), health Railway HTTP 200 (Paso 1).

---

## 3. Topología desarrollo local

| Componente | Puerto / Host |
|------------|---------------|
| Vite dev server | localhost:5174 |
| Express backend | localhost:3029 |
| MySQL (XAMPP) | 127.0.0.1:3306 |

**Evidencia:** `backend/.env.example`, scripts npm monorepo.

---

## 4. Repositorio y CI (físico lógico)

| Recurso | Ubicación |
|---------|-----------|
| Código fuente | GitHub `4dr1-2529/CAFE-IA` |
| CI runners | GitHub Actions ubuntu-latest |
| Análisis estático | SonarCloud SaaS |

---

## 5. Recursos no desplegados físicamente

| Recurso | Estado |
|---------|--------|
| Docker containers | **No implementado** |
| Kubernetes | **No implementado** |
| ML Python service | **Offline** — solo script local `ml/` |
| Redis / cache | **No implementado** |

---

## 6. Diagrama físico

Ver `Diagrama_Despliegue.md`, `Diagrama_General.md`.

---

*Arquitectura física reconstruida por ingeniería inversa — sin inventar nodos.*
