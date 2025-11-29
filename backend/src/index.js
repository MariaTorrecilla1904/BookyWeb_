// src/index.js
const express = require("express");
const cors = require("cors");  // Importa CORS para permitir solicitudes entre diferentes orígenes
const app = express();

// Habilitar CORS para todas las rutas
app.use(cors());

// Importar configuración y rutas
const config = require("./config");
const librosRoutes = require("./routes/libros.routes");  // Asegúrate de que las rutas estén correctamente importadas

app.use(express.json());


app.use("/api/libros", librosRoutes);  // Las rutas se añaden bajo el prefijo "/api/libros"


app.listen(config.PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${config.PORT}`);
});
