import { useState } from "react";
import API_ENDPOINTS from "@/config/api";

interface RegisterResponse {
  success: boolean;
  message: string;
}

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const register = async (
    nombre: string,
    correo: string,
    pass: string,
    confirmPass: string
  ): Promise<boolean> => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_ENDPOINTS.auth.register, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          correo,
          pass,
          confirmPass,
        }),
      });

      const data: RegisterResponse = await response.json();

      if (!response.ok) {
        setError(data.message || "Error en el registro");
        return false;
      }

      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Error desconocido";
      setError(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};
