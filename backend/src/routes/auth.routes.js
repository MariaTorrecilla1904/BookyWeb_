// src/routes/auth.routes.js
const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post("/register", authController.register);

// Ruta para validar el login
router.post("/login", authController.login);

module.exports = router;
