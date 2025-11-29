// src/config.js
module.exports = {
  PORT: process.env.PORT || 4000,  // Puerto en el que va a correr tu servidor
  DB_HOST: "localhost",            // Host de la base de datos
  DB_USER: "root",                 // Usuario de MySQL
  DB_PASSWORD: "",                 // Contraseña de MySQL
  DB_NAME: "bookydb"               // Nombre de la base de datos
};
