"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface RegisterResponse {
  success: boolean;
  message: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    pass: "",
    confirmPass: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): string => {
    if (!formData.nombre.trim()) {
      return "El nombre es obligatorio";
    }
    if (!formData.correo.trim()) {
      return "El correo es obligatorio";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correo)) {
      return "El correo no es válido";
    }
    if (!formData.pass) {
      return "La contraseña es obligatoria";
    }
    if (formData.pass.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres";
    }
    if (formData.pass !== formData.confirmPass) {
      return "Las contraseñas no coinciden";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validar formulario
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          correo: formData.correo,
          pass: formData.pass,
          confirmPass: formData.confirmPass,
        }),
      });

      const data: RegisterResponse = await response.json();

      if (!response.ok) {
        setError(data.message || "Error al registrar");
        return;
      }

      setSuccess(true);
      setFormData({
        nombre: "",
        correo: "",
        pass: "",
        confirmPass: "",
      });

      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Error desconocido";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      {/* Encabezado */}
      <div className="header">
        <div className="logo">📚</div>
        <h2 className="title">Crear Cuenta</h2>
        <p className="subtitle">Únete a Booky hoy</p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="form">
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            ✓ Registro exitoso. Redirigiendo al login...
          </div>
        )}

        <div className="input-container">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={formData.nombre}
            onChange={handleChange}
            className="input-field"
            disabled={loading}
            required
          />
        </div>

        <div className="input-container">
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={formData.correo}
            onChange={handleChange}
            className="input-field"
            disabled={loading}
            required
          />
        </div>

        <div className="input-container">
          <input
            type="password"
            name="pass"
            placeholder="Contraseña (mínimo 6 caracteres)"
            value={formData.pass}
            onChange={handleChange}
            className="input-field"
            disabled={loading}
            required
          />
        </div>

        <div className="input-container">
          <input
            type="password"
            name="confirmPass"
            placeholder="Confirmar contraseña"
            value={formData.confirmPass}
            onChange={handleChange}
            className="input-field"
            disabled={loading}
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>

        <div className="login-link">
          ¿Ya tienes cuenta?{" "}
          <span 
            className="text-link"
            onClick={() => router.push("/login")}
          >
            Inicia sesión aquí
          </span>
        </div>
      </form>

      {/* Botón volver al inicio */}
      <button
        onClick={() => router.push("/")}
        className="back-button"
        disabled={loading}
      >
        ← Volver al inicio
      </button>

      {/* Estilos internos */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&family=Roboto:wght@300;400;500&display=swap');

        .register-page {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          font-family: 'Poppins', sans-serif;
          padding: 20px;
        }

        .header {
          text-align: center;
          margin-bottom: 50px;
        }

        .logo {
          font-size: 50px;
          margin-bottom: 10px;
        }

        .title {
          font-size: 2.8rem;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .subtitle {
          font-size: 1.2rem;
          color: #e0e0e0;
        }

        .form {
          width: 100%;
          max-width: 420px;
          background-color: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          margin-bottom: 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .error-message {
          width: 100%;
          padding: 12px;
          margin-bottom: 20px;
          background-color: #ffebee;
          color: #c62828;
          border-left: 4px solid #c62828;
          border-radius: 4px;
          font-size: 0.9rem;
          text-align: center;
        }

        .success-message {
          width: 100%;
          padding: 12px;
          margin-bottom: 20px;
          background-color: #e8f5e9;
          color: #2e7d32;
          border-left: 4px solid #2e7d32;
          border-radius: 4px;
          font-size: 0.9rem;
          text-align: center;
        }

        .input-container {
          width: 100%;
          margin-bottom: 20px;
          display: flex;
          justify-content: center;
        }

        .input-field {
          width: 100%;
          max-width: 350px;
          padding: 18px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1rem;
          transition: border 0.3s ease;
          color: #333;
        }

        .input-field:focus {
          border-color: #667eea;
          outline: none;
        }

        .input-field:disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
        }

        .submit-btn {
          width: 100%;
          padding: 18px;
          background-color: #667eea;
          color: white;
          font-size: 1.2rem;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          margin-bottom: 20px;
        }

        .submit-btn:hover:not(:disabled) {
          background-color: #5568d3;
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .login-link {
          width: 100%;
          text-align: center;
          color: #666;
          font-size: 0.95rem;
        }

        .text-link {
          color: #667eea;
          cursor: pointer;
          font-weight: 600;
          text-decoration: none;
        }

        .text-link:hover {
          text-decoration: underline;
        }

        .back-button {
          padding: 14px 25px;
          background-color: #764ba2;
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          margin-top: 30px;
        }

        .back-button:hover:not(:disabled) {
          background-color: #663399;
        }

        .back-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .register-page {
            padding: 20px;
          }

          .title {
            font-size: 2.2rem;
          }

          .form {
            padding: 25px;
          }

          .input-field {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
