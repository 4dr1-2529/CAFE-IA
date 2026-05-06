# TODO - Mejoras Futuras | Café Sostenible AI

Roadmap técnico posterior a PMV1 para evolución funcional, calidad de software y preparación productiva.

## Backend
- [ ] Versionar endpoints (`/api/v1`) para mantener compatibilidad en futuras iteraciones.
- [ ] Separar capa de controladores, servicios y repositorios.
- [ ] Fortalecer validación avanzada de payloads en endpoints críticos.
- [ ] Incorporar pruebas unitarias e integración para rutas de productores, lotes, calidad e IA.
- [ ] Mejorar manejo centralizado de errores y logging estructurado.

## Frontend
- [ ] Mejorar dashboard con gráficos avanzados y filtros dinámicos por fecha/productor/lote.
- [ ] Optimizar rendimiento de tablas y componentes con alta carga de datos.
- [ ] Añadir estados de carga, error y vacío más robustos en todos los módulos.
- [ ] Mejorar navegación y experiencia de usuario para flujos largos de registro.
- [ ] Reforzar documentación técnica de componentes y arquitectura de frontend.

## IA / Machine Learning
- [ ] Entrenar modelo real con dataset histórico de producción y calidad.
- [ ] Implementar pipeline de entrenamiento y evaluación reproducible.
- [ ] Integrar servicio Python + Scikit-learn para inferencia y entrenamiento.
- [ ] Medir y reportar métricas de precisión y exactitud del modelo.
- [ ] Comparar desempeño entre motor por reglas y modelo entrenado.

## Base de Datos
- [ ] Diseñar plan de migraciones para evolución de esquema SQLite.
- [ ] Añadir índices para consultas de reportes y trazabilidad.
- [ ] Fortalecer reglas anti-duplicado y validación de consistencia referencial.
- [ ] Definir estrategia de respaldo y recuperación de base de datos.

## Reportes
- [ ] Exportar reportes en PDF.
- [ ] Exportar reportes en Excel.
- [ ] Incluir métricas de calidad por periodo, productor y lote.
- [ ] Incorporar panel de KPIs comparativos para seguimiento de desempeño.

## Seguridad
- [ ] Implementar autenticación real.
- [ ] Incorporar autorización por roles (administrador, evaluador, operador).
- [ ] Endurecer configuración de seguridad en API (CORS, límites, validación).
- [ ] Registrar auditoría básica de operaciones sensibles.

## Despliegue
- [ ] Preparar despliegue cloud para frontend y backend.
- [ ] Definir configuración por entorno (desarrollo, pruebas, producción).
- [ ] Configurar pipeline CI/CD para build, test y despliegue automatizado.
- [ ] Documentar estrategia de observabilidad y monitoreo.

## Futuras Integraciones
- [ ] Integrar chatbot inteligente como funcionalidad futura.
- [ ] Integrar fuentes externas (por ejemplo clima) para enriquecer predicciones.
- [ ] Evaluar integración con servicios de mensajería/notificaciones operativas.

---

**Estado actual:** PMV1 funcional y operativo.  
**Propósito de este TODO:** priorizar mejoras sin afectar estabilidad del sistema actual.

