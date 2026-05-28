-- Código legible por usuario (USU-001, ADM-001)
ALTER TABLE usuarios ADD COLUMN codigo_usuario VARCHAR(20) NULL UNIQUE AFTER id;
