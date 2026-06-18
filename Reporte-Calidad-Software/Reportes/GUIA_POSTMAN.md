# Guía paso a paso — Postman / Newman

**Estado en repositorio CAFE-IA:** no existe colección Postman (`.json`). Esta guía permite obtener la evidencia **sin inventar resultados**.

**Base URL producción:** `https://cafe-sostenible-api-production-03ad.up.railway.app`  
**Base URL local:** `http://localhost:3029`

---

## Paso 1 — Crear environment

1. Abrir Postman → Environments → Create.
2. Variables:

| Variable | Valor inicial | Descripción |
|----------|---------------|-------------|
| `baseUrl` | URL arriba | Raíz API sin `/api` |
| `token` | *(vacío)* | Se llena tras login |
| `email_admin` | `admin@cafeai.com` | Credencial demo README |
| `password_admin` | `admin123` | Credencial demo |

3. Guardar como `CAFE-IA-Environment.json` → exportar a `Reportes/postman_environment.json`.

---

## Paso 2 — Crear colección (mínimo académico)

Carpeta sugerida: `Auth`

### Request 1 — Login Admin

```
POST {{baseUrl}}/api/auth/login
Content-Type: application/json

{
  "email": "{{email_admin}}",
  "password": "{{password_admin}}"
}
```

**Tests tab (Postman):**

```javascript
pm.test("Status 200", () => pm.response.to.have.status(200));
pm.test("Tiene accessToken", () => {
  const j = pm.response.json();
  pm.expect(j.accessToken).to.be.a("string");
  pm.environment.set("token", j.accessToken);
});
```

### Request 2 — GET /api/auth/me

```
GET {{baseUrl}}/api/auth/me
Authorization: Bearer {{token}}
```

### Request 3 — GET /api/productores

```
GET {{baseUrl}}/api/productores
Authorization: Bearer {{token}}
```

### Request 4 — POST /api/lotes sin token (negativo)

```
POST {{baseUrl}}/api/lotes
Content-Type: application/json

{}
```

**Test esperado:** status **401**.

### Request 5 — GET /api/dashboard/metrics

```
GET {{baseUrl}}/api/dashboard/metrics
Authorization: Bearer {{token}}
```

---

## Paso 3 — Ejecutar Collection Runner

1. Colección → Run.
2. Seleccionar environment CAFE-IA.
3. Run → verificar 5/5 passed (o 4/5 si login falla por BD).
4. **Export Results** → JSON.

Guardar en: `Reportes/postman_results.json`

---

## Paso 4 — Newman (CLI, opcional)

```bash
npm install -g newman
newman run CAFE-IA.postman_collection.json \
  -e CAFE-IA-Environment.json \
  --reporters cli,json \
  --reporter-json-export Reportes/postman_results.json
```

---

## Paso 5 — Captura evidencia visual

| Captura | Contenido | Destino |
|---------|-----------|---------|
| E-33 | Colección con 5 requests | `Evidencias/postman/` |
| E-34 | Collection Runner resultados | `Evidencias/postman/` |

---

## Trazabilidad

| Eslabón | Referencia |
|---------|------------|
| Inventario API completo | [09_Pruebas_Postman.md](../09_Pruebas_Postman.md) |
| Matriz | Matriz_Casos_Prueba PM-01 |
| Trazabilidad | 13_Trazabilidad_Documental.md TR-19 |
| Checklist | CHECKLIST_EVIDENCIAS C-07, C-08 |

---

## Nota sobre tests backend equivalentes

Los casos HU01–HU06 en `docs/MATRIZ_PRUEBAS_HU.md` están en `backend/tests/integration.test.js`, actualmente **bloqueados** por error en `migrate.js:153-164`. Postman valida la API en runtime sin depender de esa suite.
