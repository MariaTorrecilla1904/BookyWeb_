import { useState } from "react";
import { useRouter } from "next/navigation";
import API_ENDPOINTS from "@/config/api";

interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: number;
    nombre: string;
    correo: string;
  };
}

export const useLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (correo: string, pass: string): Promise<boolean> => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_ENDPOINTS.auth.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, pass }),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        setError(data.message || "Error en el login");
        return false;
      }

      // Guardar token y datos del usuario en localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      router.push("/GestionaLibros");
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Error desconocido";
      setError(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
