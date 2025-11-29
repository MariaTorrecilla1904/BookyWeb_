// src/routes/auth.routes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connection = require("../db");  // Ajusta la ruta según tu estructura

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post("/register", (req, res) => {
  const { correo, pass } = req.body;

  if (!correo || !pass) {
    return res.status(400).json({ message: "Correo y contraseña son obligatorios" });
  }

  // Cifrar la contraseña
  bcrypt.hash(pass, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: "Error al cifrar la contraseña" });
    }

    // Insertar el usuario en la base de datos
    const query = "INSERT INTO usuarios (correo, pass) VALUES (?, ?)";
    connection.query(query, [correo, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error al registrar el usuario" });
      }
      res.status(201).json({ message: "Usuario registrado exitosamente" });
    });
  });
});

// Ruta para validar el login
router.post("/login", (req, res) => {
  const { correo, pass } = req.body;

  if (!correo || !pass) {
    return res.status(400).json({ message: "Correo y contraseña son obligatorios" });
  }

  // Buscar el usuario por correo
  const query = "SELECT * FROM usuarios WHERE correo = ?";
  connection.query(query, [correo], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error al verificar el correo" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Correo no encontrado" });
    }

    const user = result[0];

    // Verificar si la contraseña coincide
    bcrypt.compare(pass, user.pass, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: "Error al comparar las contraseñas" });
      }

      if (!isMatch) {
        return res.status(400).json({ message: "Contraseña incorrecta" });
      }

      // Generar un token JWT
      const token = jwt.sign({ id: user.id, correo: user.correo }, "secretkey", { expiresIn: "1h" });
      
      res.status(200).json({ message: "Login exitoso", token });
    });
  });
});

module.exports = router;
