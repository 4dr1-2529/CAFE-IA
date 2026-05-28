-- Roles definitivos: ADMIN y CLIENTE
INSERT IGNORE INTO roles (codigo, nombre, descripcion) VALUES
  ('admin', 'Administrador', 'Control total del sistema'),
  ('cliente', 'Cliente', 'Gestiona sus productores y lotes');

-- Migrar usuarios con roles legacy a CLIENTE
UPDATE usuarios u
INNER JOIN roles r ON u.rol_id = r.id
SET u.rol_id = (SELECT id FROM (SELECT id FROM roles WHERE codigo = 'cliente' LIMIT 1) t)
WHERE r.codigo IN ('supervisor', 'productor', 'usuario');
