// src/app.js
const express = require("express");
const cors = require("cors");
const config = require("./config");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas de autenticación
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

// Rutas adicionales (como la de libros)
const librosRoutes = require("./routes/libros.routes");
app.use("/api/libros", librosRoutes);

// Iniciar servidor
app.listen(config.PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${config.PORT}`);
});

