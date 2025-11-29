// src/db/connection.js
const mysql = require("mysql2/promise");
const config = require("../config");

const pool = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD || "",
  database: config.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 0,
});

// Probar la conexión al iniciar
pool.getConnection()
  .then((conn) => {
    console.log("✅ Conexión a MySQL (XAMPP) exitosa");
    console.log(`   Host: ${config.DB_HOST}`);
    console.log(`   Usuario: ${config.DB_USER}`);
    console.log(`   Base de datos: ${config.DB_NAME}`);
    conn.release();
  })
  .catch((err) => {
    console.error("❌ Error de conexión a MySQL:", err.message);
    console.error("   Verifica que XAMPP esté corriendo y PHPMyAdmin accesible");
  });

module.exports = pool;
