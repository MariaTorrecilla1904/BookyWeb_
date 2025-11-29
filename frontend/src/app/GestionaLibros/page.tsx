"use client";

import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes, FaExchangeAlt, FaCheckCircle, FaClock } from "react-icons/fa";
import { obtenerLibros, crearLibro, actualizarLibro, eliminarLibro as eliminarLibroApi } from './librosApi';  
import jsPDF from "jspdf";  

interface Libro {
  id: number;
  nombre: string;
  descripcion: string;
  paginas: number;
  estado: string;
}

export default function GestionaLibros() {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [edicionData, setEdicionData] = useState({
    nombre: "",
    descripcion: "",
    paginas: "",
    estado: "En proceso",
  });

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    paginas: "",
    estado: "En proceso",
  });

  useEffect(() => {
    cargarLibros();
  }, []);

  const cargarLibros = async () => {
    const datos = await obtenerLibros();
    setLibros(datos);
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const agregarLibro = async () => {
    if (!formData.nombre.trim()) return alert("El nombre es obligatorio");

    await crearLibro(formData);
    cargarLibros();

    setFormData({
      nombre: "",
      descripcion: "",
      paginas: "",
      estado: "En proceso",
    });
  };

  const eliminarLibroHandler = async (id: number) => {
    await eliminarLibroApi(id);
    cargarLibros();
  };

  const comenzarEdicion = (libro: Libro) => {
    setEditandoId(libro.id);
    setEdicionData({
      nombre: libro.nombre,
      descripcion: libro.descripcion,
      paginas: String(libro.paginas),
      estado: libro.estado,
    });
  };

  const guardarEdicion = async (id: number) => {
    if (!edicionData.nombre.trim() || !edicionData.descripcion.trim()) {
      alert("Nombre y descripción son obligatorios");
      return;
    }

    await actualizarLibro(id, edicionData);
    cargarLibros();
    setEditandoId(null);
  };

  const cambiarEstado = async (id: number, estado: string) => {
    if (editandoId === id) {
      // Solo actualizar el estado del libro si está siendo editado
      await actualizarLibro(id, { estado });
      cargarLibros();
    }
  };

  const generarReporte = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Reporte de Libros Leídos", 10, 10);  // Título del reporte
    doc.setFontSize(12);

    const data = libros.filter(libro => libro.estado === "Terminado");  // Filtrar los libros con estado "Terminado"
    let yPosition = 20;
    data.forEach(libro => {
      doc.text(`ID: ${libro.id} | Nombre: ${libro.nombre} | Estado: ${libro.estado}`, 10, yPosition);
      yPosition += 10;  // Aumenta la posición vertical para evitar que se sobrepongan las líneas
    });

    doc.save("reporte_libros.pdf");  // Descargar el archivo PDF
  };

  return (
    <div className="crud-page">
      <div className="header">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1 className="title">Gestión de Libros</h1>
      </div>

      {/* FORMULARIO */}
      <div className="card">
        <h2 className="card-title">Registrar nuevo libro</h2>

        <div className="form-grid">
          <div className="field">
            <label>Nombre</label>
            <input name="nombre" value={formData.nombre || ""} onChange={handleChange} />
          </div>

          <div className="field">
            <label>Descripción</label>
            <textarea
              name="descripcion"
              rows={3}
              value={formData.descripcion || ""}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="field">
            <label>Páginas</label>
            <input
              name="paginas"
              type="number"
              value={formData.paginas || ""}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>Estado</label>
            <select name="estado" value={formData.estado} onChange={handleChange}>
              <option>En proceso</option>
              <option>Terminado</option>
            </select>
          </div>
        </div>

        <button className="btn primary" onClick={agregarLibro}>Guardar libro</button>
      </div>

      {/* TABLA CRUD */}
      <div className="card">
        <h2 className="card-title">Libros registrados</h2>

        {libros.length === 0 ? (
          <p className="no-data">No has registrado libros aún.</p>
        ) : (
          <table className="tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Páginas</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {libros.map((libro) => (
                <tr key={libro.id}>
                  <td>{libro.id}</td>

                  <td>
                    {editandoId === libro.id ? (
                      <input
                        className="edit-input"
                        value={edicionData.nombre}
                        onChange={(e) =>
                          setEdicionData({ ...edicionData, nombre: e.target.value })
                        }
                      />
                    ) : (
                      libro.nombre
                    )}
                  </td>

                  <td>
                    {editandoId === libro.id ? (
                      <input
                        className="edit-input"
                        value={edicionData.descripcion}
                        onChange={(e) =>
                          setEdicionData({ ...edicionData, descripcion: e.target.value })
                        }
                      />
                    ) : (
                      libro.descripcion
                    )}
                  </td>

                  <td>
                    {editandoId === libro.id ? (
                      <input
                        type="number"
                        className="edit-input"
                        value={edicionData.paginas}
                        onChange={(e) =>
                          setEdicionData({ ...edicionData, paginas: e.target.value })
                        }
                      />
                    ) : (
                      libro.paginas
                    )}
                  </td>

                  <td>
                    {editandoId === libro.id ? (
                      <select
                        value={edicionData.estado}
                        onChange={(e) => setEdicionData({ ...edicionData, estado: e.target.value })}
                      >
                        <option>En proceso</option>
                        <option>Terminado</option>
                      </select>
                    ) : (
                      libro.estado === "Terminado" ? (
                        <span className="badge ok">
                          <FaCheckCircle /> Terminado
                        </span>
                      ) : (
                        <span className="badge proc">
                          <FaClock /> En proceso
                        </span>
                      )
                    )}
                  </td>

                  <td className="acciones">
                    {editandoId === libro.id ? (
                      <>
                        <button
                          className="btn save"
                          onClick={() => guardarEdicion(libro.id)}
                        >
                          <FaSave /> Guardar
                        </button>
                        <button
                          className="btn cancel"
                          onClick={() => setEditandoId(null)}
                        >
                          <FaTimes /> Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn action edit"
                          onClick={() => comenzarEdicion(libro)}
                        >
                          <FaEdit /> Editar
                        </button>
                        <button
                          className="btn action delete"
                          onClick={() => eliminarLibroHandler(libro.id)}
                        >
                          <FaTrash /> Eliminar
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <button className="btn primary report" onClick={generarReporte}>
          Generar reporte de libros leídos 📘
        </button>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>Booky Web</p>
      </footer>

      {/* ESTILOS */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
        
        .crud-page {
          min-height: 100vh;
          padding: 0;
          background: linear-gradient(135deg, #00aaff, #1e88e5); 
          color: white;
          font-family: 'Poppins', sans-serif;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .logo {
          width: 50px;
          height: 50px;
          margin-right: 1rem;
          border-radius: 50%;
          object-fit: cover;
        }

        .title {
          font-size: 2rem;
          font-weight: 600;
          color: white;
        }

        .card {
          background: #fff;
          padding: 1.5rem;
          border-radius: 10px;
          max-width: 900px;
          margin: 0 auto 2rem;
          color: #003f7f;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .form-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: 1fr 1fr;
        }

        .field {
          display: flex;
          flex-direction: column;
        }

        .field label {
          font-weight: bold;
          margin-bottom: 0.3rem;
        }

        .field input, .field textarea, .field select {
          padding: 1rem;
          font-size: 1rem;
          border-radius: 8px;
          border: 1px solid #ccc;
          transition: border-color 0.3s ease-in-out;
        }

        .field input:focus, .field textarea:focus, .field select:focus {
          border-color: #1e88e5;
          outline: none;
        }

        .btn {
          display: flex;
          align-items: center;
          gap: .5rem;
          padding: .8rem 1.2rem;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: 600;
          transition: .3s ease;
          margin-top: 1rem;
        }

        .primary { background: #1e88e5; }
        .save { background: #43a047; }
        .cancel { background: #6d6d6d; }
        .edit { background: #ff0080; }
        .delete { background: #e53935; }
        .state { background: #1e88e5; }
        .report { background: #9c27b0; }

        .footer {
          background-color: #1e88e5;
          color: white;
          padding: 1rem;
          text-align: center;
          margin-top: 2rem;
        }

        .footer p {
          font-size: 1.2rem;
          margin: 0;
        }

        .badge {
          padding: .3rem .7rem;
          border-radius: 12px;
          font-size: .8rem;
          display: inline-flex;
          align-items: center;
          gap: .3rem;
        }

        .badge.ok { background: #4caf50; color: white; }
        .badge.proc { background: #facc15; color: #664d00; }

        table {
          width: 100%;
          border-collapse: collapse;
          font-family: 'Poppins', sans-serif;
        }

        thead {
          background: #1e88e5;
          color: white;
        }

        th, td {
          padding: .8rem;
          border-bottom: 1px solid #e1e5ee;
          text-align: left;
        }

        .acciones {
          display: flex;
          gap: .5rem;
        }

        .action {
          padding: .5rem 1rem; /* Botones de acciones más pequeños */
          font-size: .9rem; /* Ajuste de fuente para más compactos */
          background-color: #00aaff; /* Fondo azul brillante */
          transition: background-color 0.3s ease; /* Transición suave para el hover */
        }

        .action.edit {
          background-color: #00aaff; /* Azul brillante */
        }

        .action.delete {
          background-color: #ff4081; /* Fondo rojo brillante para eliminar */
        }

        .action:hover {
          background-color: #0099cc; /* Efecto hover con un tono más oscuro */
        }

        .btn:hover {
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .crud-page {
            padding: 1rem;
          }

          .card {
            padding: 1rem;
            max-width: 100%;
          }

          .title {
            font-size: 1.5rem;
          }

          .btn {
            padding: .6rem 1rem;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
