// src/controllers/libros.controller.js
const db = require("../db/connection");

exports.obtenerLibros = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM libros");
  res.json(rows);
};

exports.crearLibro = async (req, res) => {
  const { nombre, descripcion, paginas, estado } = req.body;

  await db.query(
    "INSERT INTO libros (nombre, descripcion, paginas, estado) VALUES (?, ?, ?, ?)",
    [nombre, descripcion, paginas, estado]
  );

  res.json({ message: "Libro registrado correctamente" });
};

exports.actualizarLibro = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, paginas, estado } = req.body;

  await db.query(
    "UPDATE libros SET nombre=?, descripcion=?, paginas=?, estado=? WHERE id=?",
    [nombre, descripcion, paginas, estado, id]
  );

  res.json({ message: "Libro actualizado" });
};

exports.eliminarLibro = async (req, res) => {
  const { id } = req.params;

  await db.query("DELETE FROM libros WHERE id=?", [id]);

  res.json({ message: "Libro eliminado" });
};
