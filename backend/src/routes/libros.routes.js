
const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/libros.controller");

router.get("/", ctrl.obtenerLibros);
router.post("/", ctrl.crearLibro);
router.put("/:id", ctrl.actualizarLibro);
router.delete("/:id", ctrl.eliminarLibro);

module.exports = router;
