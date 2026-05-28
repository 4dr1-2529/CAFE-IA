-- Café Sostenible AI - Esquema MySQL Profesional (30+ tablas)
-- Charset UTF8MB4 para soporte completo de caracteres

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE DATABASE IF NOT EXISTS cafe_sostenible
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cafe_sostenible;

-- ═══════════════════════════════════════
-- MÓDULO GEOGRAFÍA
-- ═══════════════════════════════════════
CREATE TABLE IF NOT EXISTS regiones (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(10) NOT NULL UNIQUE,
  nombre VARCHAR(120) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  INDEX idx_regiones_nombre (nombre)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS provincias (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  region_id INT UNSIGNED NOT NULL,
  codigo VARCHAR(10) NOT NULL,
  nombre VARCHAR(120) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  UNIQUE KEY uk_provincia_region (region_id, codigo),
  CONSTRAINT fk_provincias_region FOREIGN KEY (region_id) REFERENCES regiones(id),
  INDEX idx_provincias_region (region_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS distritos (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  provincia_id INT UNSIGNED NOT NULL,
  codigo VARCHAR(10) NOT NULL,
  nombre VARCHAR(120) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  UNIQUE KEY uk_distrito_provincia (provincia_id, codigo),
  CONSTRAINT fk_distritos_provincia FOREIGN KEY (provincia_id) REFERENCES provincias(id),
  INDEX idx_distritos_provincia (provincia_id)
) ENGINE=InnoDB;

-- ═══════════════════════════════════════
-- MÓDULO SEGURIDAD
-- ═══════════════════════════════════════
CREATE TABLE IF NOT EXISTS roles (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(30) NOT NULL UNIQUE,
  nombre VARCHAR(80) NOT NULL,
  descripcion TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS permisos (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(60) NOT NULL UNIQUE,
  modulo VARCHAR(60) NOT NULL,
  accion VARCHAR(40) NOT NULL,
  descripcion VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS rol_permisos (
  rol_id INT UNSIGNED NOT NULL,
  permiso_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (rol_id, permiso_id),
  CONSTRAINT fk_rp_rol FOREIGN KEY (rol_id) REFERENCES roles(id) ON DELETE CASCADE,
  CONSTRAINT fk_rp_permiso FOREIGN KEY (permiso_id) REFERENCES permisos(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  rol_id INT UNSIGNED NOT NULL,
  productor_id INT UNSIGNED NULL,
  email VARCHAR(180) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  telefono VARCHAR(20),
  activo TINYINT(1) DEFAULT 1,
  ultimo_login TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  CONSTRAINT fk_usuarios_rol FOREIGN KEY (rol_id) REFERENCES roles(id),
  INDEX idx_usuarios_email (email),
  INDEX idx_usuarios_rol (rol_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS sesiones (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT UNSIGNED NOT NULL,
  refresh_token_hash VARCHAR(255) NOT NULL,
  ip_address VARCHAR(45),
  user_agent VARCHAR(500),
  expira_en TIMESTAMP NOT NULL,
  revocado TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_sesiones_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  INDEX idx_sesiones_usuario (usuario_id),
  INDEX idx_sesiones_expira (expira_en)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS auditoria_logs (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT UNSIGNED NULL,
  accion VARCHAR(80) NOT NULL,
  entidad VARCHAR(60),
  entidad_id INT UNSIGNED NULL,
  detalle JSON,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_auditoria_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
  INDEX idx_auditoria_usuario (usuario_id),
  INDEX idx_auditoria_entidad (entidad, entidad_id),
  INDEX idx_auditoria_fecha (created_at)
) ENGINE=InnoDB;

-- ═══════════════════════════════════════
-- MÓDULO PRODUCTORES
-- ═══════════════════════════════════════
CREATE TABLE IF NOT EXISTS productores (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NULL,
  distrito_id INT UNSIGNED NULL,
  codigo_productor VARCHAR(20) NOT NULL UNIQUE,
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  dni VARCHAR(15) NOT NULL,
  telefono VARCHAR(20),
  correo VARCHAR(180),
  parcela VARCHAR(120),
  ubicacion VARCHAR(255),
  altitud DECIMAL(8,2) DEFAULT 0,
  estado ENUM('Activo','Inactivo','Suspendido') DEFAULT 'Activo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  CONSTRAINT fk_productores_distrito FOREIGN KEY (distrito_id) REFERENCES distritos(id),
  CONSTRAINT fk_productores_usuario FOREIGN KEY (user_id) REFERENCES usuarios(id) ON DELETE SET NULL,
  INDEX idx_productores_codigo (codigo_productor),
  INDEX idx_productores_user (user_id),
  INDEX idx_productores_estado (estado)
) ENGINE=InnoDB;

ALTER TABLE usuarios ADD CONSTRAINT fk_usuarios_productor
  FOREIGN KEY (productor_id) REFERENCES productores(id) ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS fincas (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  productor_id INT UNSIGNED NOT NULL,
  distrito_id INT UNSIGNED NULL,
  codigo_finca VARCHAR(20) NOT NULL UNIQUE,
  nombre VARCHAR(150) NOT NULL,
  hectareas DECIMAL(8,2) DEFAULT 0,
  altitud DECIMAL(8,2),
  coordenadas VARCHAR(100),
  certificacion VARCHAR(80),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  CONSTRAINT fk_fincas_productor FOREIGN KEY (productor_id) REFERENCES productores(id),
  CONSTRAINT fk_fincas_distrito FOREIGN KEY (distrito_id) REFERENCES distritos(id),
  INDEX idx_fincas_productor (productor_id)
) ENGINE=InnoDB;

-- ═══════════════════════════════════════
-- MÓDULO CAFÉ
-- ═══════════════════════════════════════
CREATE TABLE IF NOT EXISTS variedades_cafe (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(20) NOT NULL UNIQUE,
  nombre VARCHAR(80) NOT NULL,
  descripcion TEXT,
  puntaje_base DECIMAL(5,2) DEFAULT 70,
  activo TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS tipos_cultivo (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(20) NOT NULL UNIQUE,
  nombre VARCHAR(80) NOT NULL,
  descripcion TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS procesos_secado (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(20) NOT NULL UNIQUE,
  nombre VARCHAR(80) NOT NULL,
  dias_estimados INT DEFAULT 7,
  descripcion TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS estados_lote (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(30) NOT NULL UNIQUE,
  nombre VARCHAR(80) NOT NULL,
  orden INT DEFAULT 0,
  color VARCHAR(20) DEFAULT '#6B7280',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS lotes (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  codigo_lote VARCHAR(30) NOT NULL UNIQUE,
  productor_id INT UNSIGNED NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  finca_id INT UNSIGNED NULL,
  variedad_id INT UNSIGNED NULL,
  tipo_cultivo_id INT UNSIGNED NULL,
  proceso_secado_id INT UNSIGNED NULL,
  estado_lote_id INT UNSIGNED NULL,
  variedad_cafe VARCHAR(80) NOT NULL,
  fecha_cosecha DATE NOT NULL,
  cantidad_kg DECIMAL(10,2) NOT NULL,
  estado VARCHAR(40) DEFAULT 'Produccion',
  humedad DECIMAL(5,2),
  temperatura DECIMAL(5,2),
  altitud DECIMAL(8,2),
  tipo_secado VARCHAR(60),
  tiempo_almacenamiento_dias INT DEFAULT 0,
  calidad_grano ENUM('Excelente','Buena','Regular','Deficiente') DEFAULT 'Buena',
  qr_codigo VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  CONSTRAINT fk_lotes_productor FOREIGN KEY (productor_id) REFERENCES productores(id),
  CONSTRAINT fk_lotes_usuario FOREIGN KEY (user_id) REFERENCES usuarios(id),
  CONSTRAINT fk_lotes_finca FOREIGN KEY (finca_id) REFERENCES fincas(id),
  CONSTRAINT fk_lotes_variedad FOREIGN KEY (variedad_id) REFERENCES variedades_cafe(id),
  CONSTRAINT fk_lotes_tipo_cultivo FOREIGN KEY (tipo_cultivo_id) REFERENCES tipos_cultivo(id),
  CONSTRAINT fk_lotes_proceso_secado FOREIGN KEY (proceso_secado_id) REFERENCES procesos_secado(id),
  CONSTRAINT fk_lotes_estado FOREIGN KEY (estado_lote_id) REFERENCES estados_lote(id),
  INDEX idx_lotes_productor (productor_id),
  INDEX idx_lotes_user_id (user_id),
  INDEX idx_lotes_codigo (codigo_lote),
  INDEX idx_lotes_created_at (created_at),
  INDEX idx_lotes_estado (estado)
) ENGINE=InnoDB;

-- ═══════════════════════════════════════
-- MÓDULO PRODUCCIÓN
-- ═══════════════════════════════════════
CREATE TABLE IF NOT EXISTS cosechas (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  lote_id INT UNSIGNED NOT NULL,
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE,
  cantidad_kg DECIMAL(10,2) NOT NULL,
  metodo VARCHAR(80),
  observaciones TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_cosechas_lote FOREIGN KEY (lote_id) REFERENCES lotes(id),
  INDEX idx_cosechas_lote (lote_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS produccion (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  lote_id INT UNSIGNED NOT NULL,
  fecha_registro DATE NOT NULL,
  cantidad_kg DECIMAL(10,2),
  humedad DECIMAL(5,2),
  temperatura DECIMAL(5,2),
  tipo_proceso VARCHAR(80),
  observaciones TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_produccion_lote FOREIGN KEY (lote_id) REFERENCES lotes(id),
  INDEX idx_produccion_lote (lote_id),
  INDEX idx_produccion_fecha (fecha_registro)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS produccion_diaria (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  lote_id INT UNSIGNED NOT NULL,
  fecha DATE NOT NULL,
  kg_procesados DECIMAL(10,2) NOT NULL,
  humedad DECIMAL(5,2),
  temperatura DECIMAL(5,2),
  turno ENUM('Mañana','Tarde','Noche') DEFAULT 'Mañana',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_produccion_diaria_lote_fecha (lote_id, fecha, turno),
  CONSTRAINT fk_prod_diaria_lote FOREIGN KEY (lote_id) REFERENCES lotes(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS inventario (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  lote_id INT UNSIGNED NOT NULL,
  cantidad_disponible_kg DECIMAL(10,2) NOT NULL DEFAULT 0,
  ubicacion_almacen VARCHAR(120),
  fecha_actualizacion DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_inventario_lote FOREIGN KEY (lote_id) REFERENCES lotes(id),
  INDEX idx_inventario_lote (lote_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS movimientos_stock (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  inventario_id INT UNSIGNED NOT NULL,
  tipo ENUM('Entrada','Salida','Ajuste') NOT NULL,
  cantidad_kg DECIMAL(10,2) NOT NULL,
  motivo VARCHAR(255),
  usuario_id INT UNSIGNED NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_mov_stock_inventario FOREIGN KEY (inventario_id) REFERENCES inventario(id),
  CONSTRAINT fk_mov_stock_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  INDEX idx_movimientos_inventario (inventario_id)
) ENGINE=InnoDB;

-- ═══════════════════════════════════════
-- MÓDULO TRAZABILIDAD
-- ═══════════════════════════════════════
CREATE TABLE IF NOT EXISTS trazabilidad (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  lote_id INT UNSIGNED NOT NULL,
  etapa VARCHAR(80) NOT NULL,
  descripcion TEXT,
  fecha DATE,
  ubicacion VARCHAR(255),
  estado VARCHAR(40) DEFAULT 'Pendiente',
  orden INT DEFAULT 0,
  usuario_registro_id INT UNSIGNED NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_trazabilidad_lote FOREIGN KEY (lote_id) REFERENCES lotes(id) ON DELETE CASCADE,
  CONSTRAINT fk_trazabilidad_usuario FOREIGN KEY (usuario_registro_id) REFERENCES usuarios(id),
  INDEX idx_trazabilidad_lote (lote_id),
  INDEX idx_trazabilidad_etapa (etapa)
) ENGINE=InnoDB;

-- ═══════════════════════════════════════
-- MÓDULO CALIDAD
-- ═══════════════════════════════════════
CREATE TABLE IF NOT EXISTS criterios_calidad (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(30) NOT NULL UNIQUE,
  nombre VARCHAR(100) NOT NULL,
  peso DECIMAL(5,2) DEFAULT 1,
  descripcion TEXT,
  activo TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS control_calidad (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  lote_id INT UNSIGNED NOT NULL,
  evaluador_id INT UNSIGNED NULL,
  aroma DECIMAL(4,2),
  sabor DECIMAL(4,2),
  cuerpo DECIMAL(4,2),
  acidez DECIMAL(4,2),
  dulzor DECIMAL(4,2),
  balance DECIMAL(4,2),
  puntaje_taza DECIMAL(5,2),
  calidad_final VARCHAR(40),
  estado VARCHAR(40) DEFAULT 'Evaluado',
  observaciones TEXT,
  fecha_evaluacion DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_control_calidad_lote (lote_id),
  CONSTRAINT fk_calidad_lote FOREIGN KEY (lote_id) REFERENCES lotes(id),
  CONSTRAINT fk_calidad_evaluador FOREIGN KEY (evaluador_id) REFERENCES usuarios(id),
  INDEX idx_calidad_lote (lote_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS evaluaciones_calidad (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  control_calidad_id INT UNSIGNED NOT NULL,
  criterio_id INT UNSIGNED NOT NULL,
  puntaje DECIMAL(4,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_eval_calidad_control FOREIGN KEY (control_calidad_id) REFERENCES control_calidad(id) ON DELETE CASCADE,
  CONSTRAINT fk_eval_calidad_criterio FOREIGN KEY (criterio_id) REFERENCES criterios_calidad(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS defectos_grano (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(20) NOT NULL UNIQUE,
  nombre VARCHAR(80) NOT NULL,
  severidad ENUM('Leve','Moderado','Grave') DEFAULT 'Leve',
  descripcion TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS evaluacion_defectos (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  control_calidad_id INT UNSIGNED NOT NULL,
  defecto_id INT UNSIGNED NOT NULL,
  cantidad INT DEFAULT 0,
  porcentaje DECIMAL(5,2),
  CONSTRAINT fk_eval_def_control FOREIGN KEY (control_calidad_id) REFERENCES control_calidad(id) ON DELETE CASCADE,
  CONSTRAINT fk_eval_def_defecto FOREIGN KEY (defecto_id) REFERENCES defectos_grano(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS resultados_cata (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  control_calidad_id INT UNSIGNED NOT NULL,
  catador VARCHAR(100),
  fecha_cata DATE,
  perfil_sensorial JSON,
  nota_final DECIMAL(5,2),
  certificado TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_cata_control FOREIGN KEY (control_calidad_id) REFERENCES control_calidad(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ═══════════════════════════════════════
-- MÓDULO IA
-- ═══════════════════════════════════════
CREATE TABLE IF NOT EXISTS predicciones_ia (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  lote_id INT UNSIGNED NOT NULL,
  humedad DECIMAL(5,2),
  temperatura DECIMAL(5,2),
  altitud DECIMAL(8,2),
  tipo_secado VARCHAR(60),
  variedad_cafe VARCHAR(80),
  tiempo_almacenamiento_dias INT DEFAULT 0,
  calidad_grano VARCHAR(40),
  calidad_predicha VARCHAR(40) NOT NULL,
  confianza INT NOT NULL,
  porcentaje_riesgo DECIMAL(5,2) DEFAULT 0,
  recomendacion TEXT,
  factores_influyentes JSON,
  fecha_prediccion DATE,
  modelo VARCHAR(150),
  origen ENUM('usuario','demo','sistema') DEFAULT 'usuario',
  version_modelo VARCHAR(20) DEFAULT 'v2.0',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_predicciones_lote (lote_id),
  INDEX idx_predicciones_origen (origen)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS variables_prediccion (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  prediccion_id INT UNSIGNED NOT NULL,
  nombre_variable VARCHAR(60) NOT NULL,
  valor DECIMAL(10,4),
  peso DECIMAL(5,4),
  impacto ENUM('Positivo','Neutral','Negativo'),
  CONSTRAINT fk_var_pred FOREIGN KEY (prediccion_id) REFERENCES predicciones_ia(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS alertas_ia (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  lote_id INT UNSIGNED NOT NULL,
  prediccion_id INT UNSIGNED NULL,
  tipo_alerta VARCHAR(60) NOT NULL,
  severidad ENUM('Baja','Media','Alta','Crítica') DEFAULT 'Media',
  mensaje TEXT NOT NULL,
  leida TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_alertas_lote FOREIGN KEY (lote_id) REFERENCES lotes(id),
  CONSTRAINT fk_alertas_pred FOREIGN KEY (prediccion_id) REFERENCES predicciones_ia(id) ON DELETE SET NULL,
  INDEX idx_alertas_lote (lote_id),
  INDEX idx_alertas_leida (leida)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS recomendaciones_ia (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  prediccion_id INT UNSIGNED NOT NULL,
  categoria VARCHAR(60),
  prioridad ENUM('Baja','Media','Alta') DEFAULT 'Media',
  texto TEXT NOT NULL,
  aplicada TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_recom_pred FOREIGN KEY (prediccion_id) REFERENCES predicciones_ia(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ═══════════════════════════════════════
-- MÓDULO REPORTES
-- ═══════════════════════════════════════
CREATE TABLE IF NOT EXISTS reportes (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT UNSIGNED NULL,
  tipo VARCHAR(60) NOT NULL,
  titulo VARCHAR(200) NOT NULL,
  parametros JSON,
  estado ENUM('pendiente','generado','error') DEFAULT 'pendiente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_reportes_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS exportaciones (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  reporte_id INT UNSIGNED NOT NULL,
  formato ENUM('PDF','Excel','CSV') NOT NULL,
  ruta_archivo VARCHAR(500),
  tamano_bytes INT UNSIGNED,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_export_reporte FOREIGN KEY (reporte_id) REFERENCES reportes(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS historial_reportes (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  reporte_id INT UNSIGNED NOT NULL,
  accion VARCHAR(40) NOT NULL,
  detalle TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_hist_reporte FOREIGN KEY (reporte_id) REFERENCES reportes(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ═══════════════════════════════════════
-- MÓDULO SISTEMA
-- ═══════════════════════════════════════
CREATE TABLE IF NOT EXISTS notificaciones (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT UNSIGNED NOT NULL,
  titulo VARCHAR(150) NOT NULL,
  mensaje TEXT,
  tipo VARCHAR(40) DEFAULT 'info',
  leida TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_notif_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  INDEX idx_notif_usuario (usuario_id, leida)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS configuraciones (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  clave VARCHAR(80) NOT NULL UNIQUE,
  valor TEXT,
  tipo VARCHAR(20) DEFAULT 'string',
  descripcion VARCHAR(255),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS actividades_usuario (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT UNSIGNED NOT NULL,
  modulo VARCHAR(60),
  accion VARCHAR(80),
  descripcion TEXT,
  metadata JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_actividades_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  INDEX idx_actividades_usuario (usuario_id),
  INDEX idx_actividades_fecha (created_at)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS dashboard_metricas (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  clave VARCHAR(80) NOT NULL,
  valor DECIMAL(15,4) NOT NULL,
  unidad VARCHAR(30),
  periodo DATE,
  metadata JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_dashboard_clave_periodo (clave, periodo)
) ENGINE=InnoDB;

SET FOREIGN_KEY_CHECKS = 1;
