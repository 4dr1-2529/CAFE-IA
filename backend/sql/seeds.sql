USE cafe_sostenible;

-- Roles y permisos
INSERT IGNORE INTO roles (id, codigo, nombre, descripcion) VALUES
(1, 'admin', 'Administrador', 'Acceso total al sistema'),
(2, 'supervisor', 'Supervisor', 'Gestión operativa y reportes'),
(3, 'productor', 'Productor', 'Consulta de lotes y trazabilidad propia');

INSERT IGNORE INTO permisos (id, codigo, modulo, accion, descripcion) VALUES
(1, 'productores.read', 'productores', 'read', 'Ver productores'),
(2, 'productores.write', 'productores', 'write', 'Crear/editar productores'),
(3, 'lotes.write', 'lotes', 'write', 'Registrar lotes'),
(4, 'calidad.write', 'calidad', 'write', 'Evaluar calidad'),
(5, 'ia.execute', 'ia', 'execute', 'Ejecutar predicciones IA'),
(6, 'reportes.export', 'reportes', 'export', 'Exportar reportes'),
(7, 'usuarios.admin', 'usuarios', 'admin', 'Administrar usuarios');

INSERT IGNORE INTO rol_permisos (rol_id, permiso_id)
SELECT 1, id FROM permisos;

INSERT IGNORE INTO rol_permisos (rol_id, permiso_id)
SELECT 2, id FROM permisos WHERE id IN (1,2,3,4,5,6);

INSERT IGNORE INTO rol_permisos (rol_id, permiso_id)
SELECT 3, id FROM permisos WHERE id IN (1,3);

-- Geografía Junín
INSERT IGNORE INTO regiones (id, codigo, nombre) VALUES (1, 'JUN', 'Junín');
INSERT IGNORE INTO provincias (id, region_id, codigo, nombre) VALUES
(1, 1, 'CHN', 'Chanchamayo'), (2, 1, 'SAT', 'Satipo'), (3, 1, 'JAU', 'Jauja');
INSERT IGNORE INTO distritos (id, provincia_id, codigo, nombre) VALUES
(1, 1, 'SVI', 'San Ramón'), (2, 1, 'PRG', 'Perené'), (3, 2, 'SAT', 'Satipo');

-- Catálogos café
INSERT IGNORE INTO variedades_cafe (codigo, nombre, puntaje_base) VALUES
('ARB', 'Arabica', 85), ('TYP', 'Typica', 88), ('BOU', 'Bourbon', 86),
('CAT', 'Caturra', 82), ('CTM', 'Catimor', 78), ('GEC', 'Geisha', 92);

INSERT IGNORE INTO tipos_cultivo (codigo, nombre) VALUES
('ORG', 'Orgánico'), ('SHD', 'Sombra'), ('CONV', 'Convencional');

INSERT IGNORE INTO procesos_secado (codigo, nombre, dias_estimados) VALUES
('NAT', 'Natural', 14), ('LAV', 'Lavado', 10), ('HON', 'Honey', 12), ('SEM', 'Semilavado', 11);

INSERT IGNORE INTO estados_lote (codigo, nombre, orden, color) VALUES
('PROD', 'Produccion', 1, '#3B82F6'),
('SEC', 'Secado', 2, '#F59E0B'),
('CAL', 'Calidad', 3, '#8B5CF6'),
('ALM', 'Almacenamiento', 4, '#6366F1'),
('COM', 'Comercializacion', 5, '#10B981');

INSERT IGNORE INTO criterios_calidad (codigo, nombre, peso) VALUES
('ARO', 'Aroma', 1.2), ('SAB', 'Sabor', 1.5), ('CUE', 'Cuerpo', 1.0),
('ACI', 'Acidez', 1.0), ('DUL', 'Dulzor', 0.8), ('BAL', 'Balance', 1.0);

INSERT IGNORE INTO defectos_grano (codigo, nombre, severidad) VALUES
('NEG', 'Grano negro', 'Grave'), ('BRK', 'Grano partido', 'Moderado'), ('FER', 'Fermentado', 'Grave');

INSERT IGNORE INTO configuraciones (clave, valor, tipo, descripcion) VALUES
('app.nombre', 'Café Sostenible AI', 'string', 'Nombre del sistema'),
('ia.modelo_version', 'v2.0-heuristic', 'string', 'Versión modelo IA'),
('reportes.logo_url', '/assets/logo.png', 'string', 'Logo reportes');

-- Usuario admin (password: admin123) - bcrypt hash
INSERT IGNORE INTO usuarios (id, rol_id, email, password_hash, nombres, apellidos, activo) VALUES
(1, 1, 'admin@cafeai.com', '$2b$10$rQZ8K8Y5Y5Y5Y5Y5Y5Y5YuGKxGKxGKxGKxGKxGKxGKxGKxGKxGKxG', 'Admin', 'Sistema', 1);

-- Actualizar hash real en migrate.js con bcrypt

-- Productores demo
INSERT IGNORE INTO productores (id, distrito_id, codigo_productor, nombres, apellidos, dni, telefono, correo, parcela, ubicacion, altitud, estado) VALUES
(1, 1, 'P001', 'Juan', 'Pérez', '12345678', '999111222', 'juan@cafe.pe', 'Finca El Roble', 'Chanchamayo', 1650, 'Activo'),
(2, 2, 'P002', 'María', 'Gómez', '87654321', '999333444', 'maria@cafe.pe', 'Parcela La Selva', 'Perené', 1720, 'Activo'),
(3, 3, 'P003', 'Carlos', 'Quispe', '11223344', '999555666', 'carlos@cafe.pe', 'Alto Satipo', 'Satipo', 1580, 'Activo');

INSERT IGNORE INTO fincas (productor_id, distrito_id, codigo_finca, nombre, hectareas, altitud, certificacion) VALUES
(1, 1, 'F001', 'Finca El Roble', 3.5, 1650, 'Orgánico'),
(2, 2, 'F002', 'La Selva Verde', 2.8, 1720, 'Fair Trade'),
(3, 3, 'F003', 'Alto Satipo', 4.2, 1580, NULL);
