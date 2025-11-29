// backend/setup-database.js
// Script para configurar la base de datos con todos los campos necesarios

const mysql = require('mysql2/promise');

async function setupDatabase() {
  let connection;
  
  try {
    // Crear conexión
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'bookydb'
    });

    console.log('✅ Conectado a MySQL');

    // Verificar si la columna 'nombre' existe
    const [columns] = await connection.query(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
       WHERE TABLE_NAME='usuarios' AND COLUMN_NAME='nombre'`
    );

    if (columns.length === 0) {
      console.log('⏳ Agregando columna "nombre" a tabla usuarios...');
      await connection.query(
        `ALTER TABLE usuarios ADD COLUMN nombre VARCHAR(255) NOT NULL DEFAULT '' AFTER id`
      );
      console.log('✅ Columna "nombre" agregada exitosamente');
    } else {
      console.log('✅ Columna "nombre" ya existe en la tabla');
    }

    // Mostrar estructura actual
    console.log('\n📋 Estructura actual de tabla usuarios:');
    const [structure] = await connection.query('DESCRIBE usuarios');
    console.table(structure);

    // Mostrar registros
    console.log('\n👥 Usuarios registrados:');
    const [users] = await connection.query('SELECT id, nombre, correo FROM usuarios');
    if (users.length > 0) {
      console.table(users);
    } else {
      console.log('   (sin registros)');
    }

    console.log('\n✅ Base de datos configurada correctamente');
    console.log('🎯 Ya puedes usar los formularios de registro y login');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Ejecutar setup
setupDatabase();
