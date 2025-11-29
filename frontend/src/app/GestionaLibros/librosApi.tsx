const API = "http://localhost:4000/api/libros"; // Asegúrate de que la URL sea correcta

// Obtener todos los libros
export async function obtenerLibros() {
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error("Error al obtener los libros");
    return res.json();
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error; // Lanza el error para que sea manejado en el componente
  }
}

// Obtener un libro por su ID
export async function obtenerLibroPorId(id: number) {
  try {
    const res = await fetch(`${API}/${id}`);
    if (!res.ok) throw new Error("No se pudo obtener el libro");
    return res.json();
  } catch (error) {
    console.error("Error al obtener el libro:", error);
    throw error;
  }
}

// Crear un nuevo libro
export async function crearLibro(data: any) {
  try {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Error al crear el libro");
    return res.json();
  } catch (error) {
    console.error("Error al crear el libro:", error);
    throw error;
  }
}

// Actualizar los datos de un libro existente
// Función para actualizar un libro
export async function actualizarLibro(id: number, data: any) {
  try {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al actualizar el libro");
    return res.json();
  } catch (error) {
    console.error("Error al actualizar el libro:", error);
    throw error;
  }
}


// Eliminar un libro
export async function eliminarLibro(id: number) {
  try {
    const res = await fetch(`${API}/${id}`, {
      method: "DELETE"
    });
    if (!res.ok) throw new Error("Error al eliminar el libro");
    return res.json();
  } catch (error) {
    console.error("Error al eliminar el libro:", error);
    throw error;
  }
}
