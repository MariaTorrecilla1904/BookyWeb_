// frontend/src/config/api.ts
// Configuración centralizada de API URLs

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/api/auth/login`,
    register: `${API_BASE_URL}/api/auth/register`,
  },
  libros: {
    list: `${API_BASE_URL}/api/libros`,
    get: (id: number) => `${API_BASE_URL}/api/libros/${id}`,
    create: `${API_BASE_URL}/api/libros`,
    update: (id: number) => `${API_BASE_URL}/api/libros/${id}`,
    delete: (id: number) => `${API_BASE_URL}/api/libros/${id}`,
  },
  health: `${API_BASE_URL}/api/health`,
};

export default API_ENDPOINTS;
