-- Normalizar roles legacy → CLIENTE; asegurar admin
INSERT IGNORE INTO roles (codigo, nombre, descripcion) VALUES
  ('admin', 'Administrador', 'Control total del sistema'),
  ('cliente', 'Cliente', 'Gestiona sus productores y lotes');

UPDATE usuarios u
INNER JOIN roles r ON u.rol_id = r.id
SET u.rol_id = (SELECT id FROM (SELECT id FROM roles WHERE codigo = 'cliente' LIMIT 1) t)
WHERE r.codigo IN ('supervisor', 'productor', 'usuario', 'SUPERVISOR', 'PRODUCTOR', 'USUARIO');

UPDATE usuarios u
SET u.rol_id = (SELECT id FROM (SELECT id FROM roles WHERE codigo = 'admin' LIMIT 1) t)
WHERE u.email = 'admin@cafeai.com';
