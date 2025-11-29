const mysql = require("mysql2/promise");
const config = require("./src/config");

async function check() {
  try {
    const conn = await mysql.createConnection({
      host: config.DB_HOST,
      user: config.DB_USER,
      password: config.DB_PASSWORD || "",
      database: config.DB_NAME,
    });

    const [columns] = await conn.query("DESCRIBE usuarios");
    console.log("Estructura actual de tabla usuarios:");
    columns.forEach(col => {
      console.log(`  ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : 'NULL'}`);
    });

    // Mostrar usuarios
    const [users] = await conn.query("SELECT id, correo, pass FROM usuarios");
    console.log("\nUsuarios en BD:");
    users.forEach(user => {
      console.log(`  ID: ${user.id}, Correo: ${user.correo}`);
    });

    await conn.end();
  } catch (err) {
    console.error("Error:", err.message);
  }
}

check();
