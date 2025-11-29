// backend/test-connection.js
// Este archivo verifica que la conexión a MySQL funciona correctamente

const mysql = require("mysql2/promise");
const config = require("./src/config");

async function testConnection() {
  console.log("🔍 Probando conexión a MySQL...");
  console.log(`   Host: ${config.DB_HOST}`);
  console.log(`   Usuario: ${config.DB_USER}`);
  console.log(`   Base de datos: ${config.DB_NAME}`);
  console.log("");

  try {
    // Intentar conectar
    const connection = await mysql.createConnection({
      host: config.DB_HOST,
      user: config.DB_USER,
      password: config.DB_PASSWORD || "",
      database: config.DB_NAME,
    });

    console.log("✅ Conexión exitosa!");
    
    // Probar que la tabla usuarios existe
    const [tables] = await connection.query("SHOW TABLES");
    console.log("\n📋 Tablas en la base de datos:");
    tables.forEach((table) => {
      const tableName = Object.values(table)[0];
      console.log(`   - ${tableName}`);
    });

    // Verificar estructura de usuarios
    const [columns] = await connection.query("DESCRIBE usuarios");
    console.log("\n🔐 Estructura de tabla 'usuarios':");
    columns.forEach((col) => {
      console.log(`   - ${col.Field} (${col.Type})`);
    });

    // Contar usuarios
    const [[{ count }]] = await connection.query("SELECT COUNT(*) as count FROM usuarios");
    console.log(`\n📊 Usuarios registrados: ${count}`);

    await connection.end();
    console.log("\n✨ Todo funciona correctamente!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.log("\n💡 Soluciones:");
    console.log("   1. Verifica que XAMPP esté iniciado");
    console.log("   2. Verifica que MySQL esté corriendo en XAMPP");
    console.log("   3. Verifica que la BD 'bookydb' existe");
    console.log("   4. Verifica que las credenciales sean correctas");
    process.exit(1);
  }
}

testConnection();
