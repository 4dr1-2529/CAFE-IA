-- Multiusuario: rol USUARIO y user_id en tablas operativas
-- Ejecutar una vez; la app también aplica vía apply-migrations.js

INSERT IGNORE INTO roles (codigo, nombre, descripcion) VALUES
  ('usuario', 'Usuario', 'Acceso personal a sus datos');

-- produccion.user_id
ALTER TABLE produccion ADD COLUMN user_id INT UNSIGNED NULL AFTER lote_id;
UPDATE produccion pr INNER JOIN lotes l ON l.id = pr.lote_id SET pr.user_id = l.user_id WHERE pr.user_id IS NULL;
CREATE INDEX idx_produccion_user ON produccion(user_id);

-- predicciones_ia.user_id
ALTER TABLE predicciones_ia ADD COLUMN user_id INT UNSIGNED NULL AFTER lote_id;
UPDATE predicciones_ia p INNER JOIN lotes l ON l.id = p.lote_id SET p.user_id = l.user_id WHERE p.user_id IS NULL;
CREATE INDEX idx_predicciones_user ON predicciones_ia(user_id);

-- control_calidad.user_id (registro responsable)
ALTER TABLE control_calidad ADD COLUMN user_id INT UNSIGNED NULL AFTER lote_id;
UPDATE control_calidad cc
INNER JOIN lotes l ON l.id = cc.lote_id
SET cc.user_id = COALESCE(cc.evaluador_id, l.user_id)
WHERE cc.user_id IS NULL;
CREATE INDEX idx_calidad_user ON control_calidad(user_id);

-- trazabilidad: rellenar usuario_registro_id desde lote
UPDATE trazabilidad t
INNER JOIN lotes l ON l.id = t.lote_id
SET t.usuario_registro_id = l.user_id
WHERE t.usuario_registro_id IS NULL AND l.user_id IS NOT NULL;
