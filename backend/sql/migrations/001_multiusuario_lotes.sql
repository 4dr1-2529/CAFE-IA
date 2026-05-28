-- Migración segura: multiusuario en lotes y productores
-- Ejecutar una vez en MySQL. La app también aplica esto vía apply-migrations.js al arrancar.

-- lotes.user_id
ALTER TABLE lotes ADD COLUMN user_id INT UNSIGNED NULL AFTER productor_id;
UPDATE lotes SET user_id = 1 WHERE user_id IS NULL;
ALTER TABLE lotes MODIFY COLUMN user_id INT UNSIGNED NOT NULL;
ALTER TABLE lotes ADD CONSTRAINT fk_lotes_usuario FOREIGN KEY (user_id) REFERENCES usuarios(id);
CREATE INDEX idx_lotes_user_id ON lotes(user_id);
CREATE INDEX idx_lotes_created_at ON lotes(created_at);

-- productores.user_id
ALTER TABLE productores ADD COLUMN user_id INT UNSIGNED NULL AFTER id;
UPDATE productores SET user_id = 1 WHERE user_id IS NULL;
ALTER TABLE productores ADD CONSTRAINT fk_productores_usuario FOREIGN KEY (user_id) REFERENCES usuarios(id) ON DELETE SET NULL;
CREATE INDEX idx_productores_user ON productores(user_id);
