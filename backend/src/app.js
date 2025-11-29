// src/app.js
const express = require("express");
const cors = require("cors");
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
