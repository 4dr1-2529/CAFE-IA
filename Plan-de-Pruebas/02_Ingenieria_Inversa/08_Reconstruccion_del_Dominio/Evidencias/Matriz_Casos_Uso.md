# Matriz de Casos de Uso — CAFE-IA

**Fecha:** 2026-06-24

| ID | Caso de uso | Actor | Objetivo | Flujo principal | Resultado esperado |
|----|-------------|-------|----------|-----------------|-------------------|
| CU-01 | Iniciar sesión como administrador | Administrador | Acceder al sistema con rol global | 1. Abrir `/login` 2. Ingresar admin@cafeai.com 3. Enviar formulario 4. API valida bcrypt 5. Guardar JWT | Dashboard admin con badge ADMIN (PF-01) |
| CU-02 | Iniciar sesión como cliente | Cliente | Acceder con datos propios | 1. Login cliente1@cafeai.com 2. JWT con rol cliente | Dashboard personal scope user_id (PF-02) |
| CU-03 | Cerrar sesión | Usuario autenticado | Finalizar sesión segura | 1. Clic logout 2. POST /auth/logout 3. Limpiar localStorage | Redirección a /login |
| CU-04 | Consultar dashboard admin | Administrador | Ver KPIs globales | 1. Navegar `/` 2. GET /dashboard/metrics | KPIs y menú sistema visible (PF-03) |
| CU-05 | Consultar dashboard cliente | Cliente | Ver KPIs propios | 1. Navegar `/` 2. API filtra por user_id | Sin enlaces admin (PF-04) |
| CU-06 | Registrar productor | Admin/Cliente | Alta productor en catálogo | 1. `/productores` 2. Formulario 3. POST /productores | Productor en listado con código P00x (PF-05) |
| CU-07 | Registrar lote de producción | Admin/Cliente | Crear lote con catálogos | 1. `/registro` 2. Seleccionar productor 3. POST /lotes | Lote creado + 5 etapas trazabilidad (PF-06) |
| CU-08 | Consultar trazabilidad | Admin/Cliente | Ver timeline del lote | 1. `/trazabilidad` 2. Seleccionar lote 3. GET /trazabilidad | Panel detalle + QR (PF-07) |
| CU-09 | Evaluar calidad sensorial | Admin/Cliente | Registrar cata y puntaje | 1. `/calidad` 2. Notas 1–10 3. POST /control-calidad | Puntaje y clasificación Alta/Media/Baja |
| CU-10 | Ejecutar predicción IA | Admin/Cliente | Predecir calidad del lote | 1. `/ia` 2. Seleccionar lote pendiente 3. POST /predicciones/ejecutar | Factores, riesgo %, alertas (PF-08) |
| CU-11 | Generar reportes | Admin/Cliente | Ver y exportar reportes | 1. `/reportes` 2. Pestañas 3. GET /reportes/* 4. Export PDF/Excel | Datos filtrados por rol (PF-09) |
| CU-12 | Consultar chatbot | Admin/Cliente | Preguntar al asistente IA | 1. `/chatbot-ia` 2. Enviar mensaje 3. POST /chatbot | Respuesta intent (PF-10) |
| CU-13 | Verificar permisos RBAC | Admin/Cliente | Validar alcance por rol | 1. Login cada rol 2. Navegar menú 3. Intentar /usuarios | Admin accede; cliente bloqueado (PF-11) |
| CU-14 | Gestionar usuarios | Administrador | CRUD usuarios del sistema | 1. `/usuarios` 2. Crear/editar 3. API adminGuard | Usuario creado o actualizado |
| CU-15 | Consultar auditoría | Administrador | Revisar historial acciones | 1. `/auditoria` 2. GET /auditoria | Lista logs auditoria_logs |
| CU-16 | Consultar base de datos | Admin/Cliente | Inspeccionar tablas MySQL | 1. `/basedatos` 2. GET /base-datos/:tabla | Filas según alcance GLOBAL/PERSONAL |
| CU-17 | Acceso sin token | Anónimo | Intentar operación protegida | 1. POST /lotes sin Authorization | HTTP 401 (integration.test) |
| CU-18 | Registrar usuario público | Anónimo | Auto-registro | 1. POST /auth/register en producción | HTTP 403 si ALLOW_PUBLIC_REGISTER=false |
