# Flujo de Datos — CAFE-IA

**Fecha:** 2026-06-24

---

## 1. Flujo autenticación

```
LoginPage → auth.service → POST /api/auth/login
    → AuthService → UsuarioRepository → SELECT usuarios
    → bcrypt.compare → jsonwebtoken.sign
    → Response { token, refreshToken, user }
    → AuthContext → localStorage
```

---

## 2. Flujo crear lote (representativo)

```
RegistroProduccionPage → client.js POST /api/lotes + JWT
    → auth middleware → writeGuard → LoteController.create
    → lote.validator → LoteService.create
    → ProductorRepository (validar productor scope)
    → LoteRepository.insert → tabla lotes
    → TrazabilidadRepository.insert x5 → trazabilidad_etapas
    → inventario insert automático
    → ActionLogService → auditoria_logs
    → 201 JSON lote
```

**Nota arquitectónica:** operación multi-tabla sin transacción SQL explícita verificada.

---

## 3. Flujo predicción IA

```
ModuloIAPage → POST /api/predicciones/ejecutar { lote_id }
    → PrediccionController → PrediccionService.execute
    → RoleHelper.assertLoteAccess
    → PredictionService.executeForLote
    → SELECT lote + calidad (pool directo)
    → PredictionEngine.compute (dominio)
    → INSERT predicciones_ia
    → JSON { calidad, confianza, riesgo, alertas, recomendaciones }
```

---

## 4. Flujo reportes export

```
ReportesPage → GET /api/reportes/export/:tipo/:formato
    → ReportesController → ReportesService + ReportExportService
    → ReportesRepository (queries agregadas scope rol)
    → pdfkit o exceljs → stream archivo
```

---

## 5. Flujo RBAC datos

```
JWT payload { sub, rol }
    → RoleHelper.isAdmin / scopeUserId
    → Repository SQL: WHERE user_id = ? (cliente) | sin filtro (admin)
```

---

## 6. Flujo persistencia general

```
Service → Repository → pool.query/execute → MySQL InnoDB
migrate.js (arranque) → schema.sql + seeds → tablas pobladas
```

---

## 7. Tablas principales en flujos

| Flujo | Tablas |
|-------|--------|
| Auth | usuarios, sesiones, roles |
| Productores | productores |
| Lotes | lotes, trazabilidad_etapas, inventario |
| Calidad | evaluaciones_calidad, criterios_calidad |
| IA | predicciones_ia, lotes |
| Auditoría | auditoria_logs |

---

## 8. Diagrama

Ver `Diagrama_Flujo_Datos.md` / `.mmd`, `Diagrama_Cliente_Servidor.md`.

---

*Flujos reconstruidos desde código fuente — sin inventar pipelines.*
