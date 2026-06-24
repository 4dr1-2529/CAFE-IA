# Plan de Mejora — Variables de Entorno CAFE-IA

**Fecha:** 24 de junio de 2026

---

| ID | Variable | Problema | Riesgo | Impacto | Prioridad | Recomendación | Responsable | Esfuerzo |
|----|----------|----------|--------|---------|-----------|---------------|-------------|----------|
| ENV-M01 | JWT_SECRET | Gestión manual en Railway | Alto | Compromiso sesiones | Alta | Secret manager + rotación documentada | Seguridad | 2 días |
| ENV-M02 | MYSQLPASSWORD | En panel cloud sin auditoría | Alto | Acceso BD | Alta | Usuario BD dedicado; rotar password | DevOps | 1 día |
| ENV-M03 | ADMIN_SEED_PASSWORD | En .env.example con valor demo | Alto | Uso accidental prod | Alta | Quitar valor ejemplo; solo documentar formato | Backend | 1 hora |
| ENV-M04 | VERIFY_* | Defaults hardcoded en script | Medio | Credenciales en código | Media | Variables en .env.example.scripts | Backend | 2 horas |
| ENV-M05 | SEED_* | No documentadas en example | Bajo | Uso incorrecto seeds | Baja | Sección en README o `.env.scripts.example` | DevOps | 2 horas |
| ENV-M06 | PUPPETEER_EXECUTABLE_PATH | Ausente en example | Bajo | Script PNG falla | Baja | Documentar en guía scripts | DevOps | 1 hora |
| ENV-M07 | CYPRESS_BASE_URL | Solo en package.json | Bajo | Confusión puerto E2E | Baja | Añadir a `testing/.env.example` | QA | 1 hora |
| ENV-M08 | VITE_API_URL | Fallback Railway hardcoded | Medio | Cambio URL requiere código | Media | Eliminar fallback; fallar build sin env | Frontend | 2 horas |
| ENV-M09 | VITE_SHOW_DEMO_CREDENTIALS | Puede activarse en prod | Medio | Filtración credenciales | Media | Forzar false en vercel.json prod | Frontend | 1 hora |
| ENV-M10 | CORS_ORIGINS | Regex amplia *.vercel.app | Medio | Origen no listado permitido | Media | Lista explícita previews | Backend | 1 día |
| ENV-M11 | MYSQL_SSL_REJECT_UNAUTHORIZED | Puede ser false en Railway | Medio | MITM teórico | Baja | Documentar cert Railway | DevOps | 2 horas |
| ENV-M12 | Railway vars | Sin export/IaC en repo | Medio | No reproducible | Media | Documentar panel o railway.toml | DevOps | 1 día |
| ENV-M13 | SONAR_TOKEN | Único secret análisis | Medio | Pérdida acceso CI | Media | Backup token; rotación anual | DevOps | 1 hora |
| ENV-M14 | CI JWT_SECRET | Inline en workflow | Bajo | Confusión con prod | Baja | Usar GitHub secret TEST_JWT_SECRET | DevOps | 1 hora |
| ENV-M15 | .env gitignore | .env existe localmente | Alto | Commit accidental | Alta | Verificar .gitignore; pre-commit hook | Seguridad | 2 horas |
| ENV-M16 | VITE_API_BASE_URL | Legacy duplicado | Bajo | Confusión | Baja | Deprecar y eliminar | Frontend | 1 hora |
| ENV-M17 | REQUIRE_AUTH | false por default | Medio | Rutas públicas en dev | Baja | Documentar cuándo true | Backend | 1 hora |
| ENV-M18 | Logs MySQL | HOST/USER en consola Railway | Bajo | Info reconocimiento | Baja | Reducir logs en prod | Backend | 2 horas |

---

## Por área

### Seguridad
ENV-M01, ENV-M02, ENV-M03, ENV-M09, ENV-M10, ENV-M15

### Configuración
ENV-M05, ENV-M06, ENV-M07, ENV-M17

### Portabilidad
ENV-M12, ENV-M16, documentar todas en example

### Despliegue
ENV-M08, ENV-M12, ENV-M09

### Mantenimiento
ENV-M13, ENV-M14, ENV-M18

---

**Total:** 18 mejoras | **Alta prioridad:** 4
