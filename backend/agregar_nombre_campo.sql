- Agregar columna 'nombre' a la tabla usuarios
-- Este script agrega el campo nombre que falta en la tabla

ALTER TABLE usuarios 
ADD COLUMN nombre VARCHAR(255) NOT NULL DEFAULT '' 
AFTER id;

-- Verificar la estructura
DESCRIBE usuarios;

-- Ver usuarios actuales
SELECT * FROM usuarios;
