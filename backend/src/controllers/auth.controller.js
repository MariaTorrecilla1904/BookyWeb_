const db = require("../db/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Controlador para registrar un nuevo usuario
exports.register = async (req, res) => {
  try {
    const { correo, nombre, pass, confirmPass } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!correo || !nombre || !pass) {
      return res.status(400).json({ 
        success: false, 
        message: "Todos los campos son obligatorios" 
      });
    }

    // Validar que las contraseñas coincidan
    if (pass !== confirmPass) {
      return res.status(400).json({ 
        success: false, 
        message: "Las contraseñas no coinciden" 
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      return res.status(400).json({ 
        success: false, 
        message: "El correo no es válido" 
      });
    }

    // Validar longitud mínima de contraseña
    if (pass.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: "La contraseña debe tener al menos 6 caracteres" 
      });
    }

    // Verificar si el usuario ya existe
    let existingUser;
    try {
      const [rows] = await db.query(
        "SELECT id FROM usuarios WHERE correo = ?",
        [correo]
      );
      existingUser = rows;
    } catch (dbError) {
      console.error("Error al buscar usuario:", dbError.message);
      return res.status(500).json({ 
        success: false, 
        message: "Error al verificar el usuario en la base de datos. Intenta de nuevo." 
      });
    }

    if (existingUser.length > 0) {
      return res.status(409).json({ 
        success: false, 
        message: "El correo ya está registrado" 
      });
    }

    // Cifrar la contraseña
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(pass, 10);
    } catch (hashError) {
      console.error("Error al cifrar contraseña:", hashError.message);
      return res.status(500).json({ 
        success: false, 
        message: "Error al procesar la contraseña" 
      });
    }

    // Insertar el usuario en la base de datos
    try {
      await db.query(
        "INSERT INTO usuarios (correo, nombre, pass) VALUES (?, ?, ?)",
        [correo, nombre, hashedPassword]
      );
    } catch (insertError) {
      console.error("Error al insertar usuario:", insertError.message);
      return res.status(500).json({ 
        success: false, 
        message: "Error al registrar el usuario. Verifica que la base de datos esté disponible." 
      });
    }

    res.status(201).json({ 
      success: true, 
      message: "Usuario registrado exitosamente. Por favor, inicia sesión." 
    });
  } catch (error) {
    console.error("Error general en registro:", error.message);
    res.status(500).json({ 
      success: false, 
      message: "Error inesperado en el servidor" 
    });
  }
};

// Controlador para login
exports.login = async (req, res) => {
  try {
    const { correo, pass } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!correo || !pass) {
      return res.status(400).json({ 
        success: false, 
        message: "Correo y contraseña son obligatorios" 
      });
    }

    // Buscar el usuario por correo
    let users;
    try {
      const [rows] = await db.query(
        "SELECT * FROM usuarios WHERE correo = ?",
        [correo]
      );
      users = rows;
    } catch (dbError) {
      console.error("Error al buscar usuario:", dbError.message);
      return res.status(500).json({ 
        success: false, 
        message: "Error al consultar la base de datos. Intenta de nuevo." 
      });
    }

    if (users.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: "Correo o contraseña incorrectos" 
      });
    }

    const user = users[0];

    // Verificar si la contraseña coincide
    let isMatch;
    try {
      isMatch = await bcrypt.compare(pass, user.pass);
    } catch (compareError) {
      console.error("Error al comparar contraseña:", compareError.message);
      return res.status(500).json({ 
        success: false, 
        message: "Error al verificar la contraseña" 
      });
    }

    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: "Correo o contraseña incorrectos" 
      });
    }

    // Generar un token JWT
    let token;
    try {
      token = jwt.sign(
        { id: user.id, correo: user.correo, nombre: user.nombre },
        process.env.JWT_SECRET || "secretkey_booky_2025",
        { expiresIn: "7d" }
      );
    } catch (jwtError) {
      console.error("Error al generar token JWT:", jwtError.message);
      return res.status(500).json({ 
        success: false, 
        message: "Error al generar el token de autenticación" 
      });
    }

    res.status(200).json({ 
      success: true,
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo
      }
    });
  } catch (error) {
    console.error("Error general en login:", error.message);
    res.status(500).json({ 
      success: false, 
      message: "Error inesperado en el servidor" 
    });
  }
};
