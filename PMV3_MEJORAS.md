# PMV3 — Mejoras implementadas en Café Sostenible AI

**Proyecto:** CAFE-IA (Café Sostenible AI)  
**Stack:** React + Vite + Node.js + Express + MySQL (sin cambios)  
**Compatibilidad:** Railway · Vercel · MySQL  
**Fecha revisión:** Junio 2026

---

## Objetivo PMV3

Consolidar **PMV1** (operaciones base) y **PMV2** (inteligencia artificial, chatbot y auditoría) en una **versión integrada y visible** que demuestre en la interfaz web:

- KPIs en tiempo real desde MySQL  
- Trazabilidad visual con línea de tiempo y % de avance  
- Control de calidad con indicadores y recomendaciones  
- IA/ML con variables, probabilidad y explicación del modelo  
- Reportes con Resumen PMV3 y tabla de mejoras  
- Auditoría tabular para control y seguimiento  
- Navegación unificada con branding **«PMV3 · Integrado»**

**Sin eliminar** funcionalidades PMV1 ni PMV2.

---

## Mejoras visibles implementadas

| # | Área | Mejora visible |
|---|------|----------------|
| 1 | **Sidebar** | «PMV3 · Integrado», grupos Gestión / Operaciones / Inteligencia / Evidencias / Sistema, enlace **Resumen PMV3** |
| 2 | **Dashboard** | Banner principal PMV3, 5 KPIs clave, sección «Mejoras implementadas en PMV3» |
| 3 | **Trazabilidad** | Línea de tiempo, % avance, etapas completadas, aviso Mejora PMV3 |
| 4 | **Control calidad** | KPIs, indicadores, recomendación automática, validaciones, aviso Mejora PMV3 |
| 5 | **IA / ML** | Variables analizadas, probabilidad riesgo, recomendación, «Explicación del modelo», aviso Mejora PMV3 |
| 6 | **Chatbot** | Pregunta «¿Qué mejoras incluye el PMV3?» con respuesta de integración |
| 7 | **Auditoría** | Tabla Usuario / Acción / Módulo / Fecha / Detalle, contador de acciones |
| 8 | **Reportes** | Pestaña y ruta Resumen PMV3, tarjetas PMV1/PMV2/PMV3, tabla de mejoras |
| 9 | **Evidencias PMV** | Tarjetas PMV1, PMV2, PMV3 con estado **Completado** |
| 10 | **UX global** | Header «PMV3 · Integrado», banners compactos, toasts éxito/error |

---

## Módulos modificados

### Frontend

| Archivo | Cambio |
|---------|--------|
| `frontend/src/layouts/MainLayout.jsx` | Sidebar 5 grupos + Resumen PMV3 + header PMV3 |
| `frontend/src/constants/pmv3Content.js` | **Nuevo** — textos, tabla mejoras, tarjetas versiones |
| `frontend/src/constants/routes.js` | Ruta `RESUMEN_PMV3` |
| `frontend/src/components/common/Pmv3ImprovementNotice.jsx` | **Nuevo** — aviso «Mejora PMV3» por módulo |
| `frontend/src/components/common/Pmv3IntegrationBanner.jsx` | Banner integración PMV1+PMV2 |
| `frontend/src/components/features/TrazabilidadTimeline.jsx` | % avance y etapas completadas |
| `frontend/src/pages/dashboard/DashboardPage.jsx` | Banner, KPIs PMV3, sección mejoras |
| `frontend/src/pages/trazabilidad/TrazabilidadPage.jsx` | Aviso mejora PMV3 |
| `frontend/src/pages/calidad/ControlCalidadPage.jsx` | Aviso mejora PMV3, KPIs, toasts |
| `frontend/src/pages/ia/ModuloIAPage.jsx` | Explicación modelo, variables, aviso PMV3 |
| `frontend/src/pages/ia/ChatbotIAPage.jsx` | Badge PMV3 |
| `frontend/src/pages/reportes/ReportesPage.jsx` | Resumen PMV3, tabla mejoras, modo `pmv3Only` |
| `frontend/src/pages/reportes/ResumenPMV3Page.jsx` | **Nuevo** — vista dedicada Resumen PMV3 |
| `frontend/src/pages/sistema/AuditoriaPage.jsx` | Tabla simplificada PMV3, contador |
| `frontend/src/pages/sistema/EvidenciasPMVPage.jsx` | Tarjetas PMV1/PMV2/PMV3 Completado |
| `frontend/src/constants/chatbotQuestions.js` | Pregunta PMV3 mejoras |
| `frontend/src/utils/dashboard.js` | KPIs evaluaciones y auditoría |
| `frontend/src/routes/AppRoutes.jsx` | Ruta `/resumen-pmv3` |

### Backend

| Archivo | Cambio |
|---------|--------|
| `backend/src/infrastructure/repositories/DashboardRepository.js` | Campo `evaluacionesCalidad` en cards |
| `backend/src/application/services/chatbotIntentScoring.js` | Intent `pmv3_mejoras` |
| `backend/src/application/services/chatbotIntentHandlers.js` | Respuesta PMV3 integración |

---

## Rutas actualizadas

| Ruta | Vista | PMV3 |
|------|-------|------|
| `/` | Dashboard | Banner + KPIs + mejoras |
| `/resumen-pmv3` | **Resumen PMV3** (nueva) | Vista dedicada consolidada |
| `/reportes` | Reportes | Pestaña Resumen PMV3 |
| `/trazabilidad` | Trazabilidad | Timeline + % avance |
| `/calidad` | Control calidad | Indicadores + recomendación |
| `/ia` | Módulo IA | Variables + explicación modelo |
| `/chatbot-ia` | Chatbot | Pregunta PMV3 |
| `/auditoria` | Auditoría (ADMIN) | Tabla detalle |
| `/evidencias` | Evidencias PMV (ADMIN) | Tarjetas PMV1/2/3 |
| Resto | Sin cambio de path | PMV1/PMV2 operativos |

---

## Cómo probar PMV3

```bash
# Backend
cd backend && npm run dev

# Frontend
cd frontend && npm run dev

# Build de validación
npm run build --prefix frontend
```

### Flujo de verificación visual

1. **Login** → sidebar muestra «PMV3 · Integrado» y grupos de navegación  
2. **Dashboard** → banner «PMV3: Integración de gestión…» + 5 KPIs + sección mejoras  
3. **Resumen PMV3** (`/resumen-pmv3`) → tarjetas PMV1/2/3 + tabla de mejoras  
4. **Trazabilidad** → seleccionar lote → timeline con % y etapas completadas  
5. **Calidad** → evaluar lote → indicadores + recomendación + toast  
6. **IA** → ejecutar predicción → variables + riesgo % + explicación modelo  
7. **Chatbot** → «¿Qué mejoras incluye el PMV3?»  
8. **Auditoría** (ADMIN) → tabla y contador de acciones  
9. **Evidencias PMV** (ADMIN) → tarjetas Completado  

---

## Evidencias visuales sugeridas (capturas)

| # | Captura | Elemento clave |
|---|---------|----------------|
| 1 | Sidebar completo | PMV3 · Integrado + 5 grupos + Resumen PMV3 |
| 2 | Dashboard | Banner principal + fila KPIs PMV3 + sección mejoras |
| 3 | `/resumen-pmv3` | Tarjetas PMV1/PMV2/PMV3 + tabla Módulo/Mejora/Evidencia/Estado |
| 4 | Trazabilidad | Timeline + barra % + aviso Mejora PMV3 |
| 5 | Control calidad | KPIs + vista previa recomendación + aviso PMV3 |
| 6 | Módulo IA | Variables + probabilidad + Explicación del modelo |
| 7 | Chatbot | Pregunta y respuesta PMV3 |
| 8 | Auditoría | Tabla 5 columnas + contador acciones |
| 9 | Evidencias PMV | 3 tarjetas con badge Completado |
| 10 | Header app | Texto «PMV3 · Integrado» |

---

## Resultado del build

```bash
npm run build --prefix frontend
```

**Resultado:** ✅ **Compilación exitosa** (exit code 0)

- Vite v5.4.21 · 2242 módulos transformados  
- Tiempo: ~63 s  
- Salida: `frontend/dist/`  
- Sin errores de compilación  

---

## Conclusión PMV3

PMV3 cumple el objetivo de **integrar y hacer visible** las capacidades de PMV1 y PMV2 sin romper el stack ni eliminar módulos. La navegación, los banners, los KPIs, la trazabilidad visual, la calidad asistida, la IA explicable, el Resumen PMV3, la auditoría tabular y las evidencias consolidadas permiten demostrar ante evaluación o despliegue (Railway/Vercel) que CAFE-IA es una plataforma unificada de gestión cafetalera con inteligencia artificial.

---

*Documento técnico PMV3 — Café Sostenible AI / CAFE-IA*
