// src/index.js
const express = require("express");
const cors = require("cors");
const config = require("./config");
const app = express();

// Habilitar CORS para todas las rutas
app.use(cors());
app.use(express.json());

// Importar rutas
const authRoutes = require("./routes/auth.routes");
const librosRoutes = require("./routes/libros.routes");

// Usar rutas
app.use("/api/auth", authRoutes);
app.use("/api/libros", librosRoutes);

// Ruta de verificación
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", server: "Booky API" });
});

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error("Error no controlado:", err);
  res.status(500).json({ 
    success: false, 
    message: "Error en el servidor",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Manejador 404
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: "Ruta no encontrada" 
  });
});

// Iniciar servidor
app.listen(config.PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${config.PORT}`);
  console.log(`Endpoint de salud: http://localhost:${config.PORT}/api/health`);
});


