"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/features/auth/model/useLogin";

export default function LoginPage() {
  const router = useRouter();
  const { login, loading, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    // Validación básica del cliente
    if (!email || !password) {
      setLocalError("Por favor completa todos los campos");
      return;
    }

    const success = await login(email, password);
    if (!success) {
      // El error ya está en el hook
    }
  };

  // Redirigir a la página de registro
  const handleRegister = () => {
    router.push("/register");
  };

  const displayError = localError || error;

  return (
    <div className="login-page">
      {/* Encabezado */}
      <div className="header">
        <div className="logo">📚</div>
        <h2 className="title">Bienvenido a Booky</h2>
        <p className="subtitle">Inicia sesión para continuar</p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="form">
        {displayError && (
          <div className="error-message">
            ⚠️ {displayError}
          </div>
        )}

        <div className="input-container">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            disabled={loading}
          />
        </div>

        <div className="input-container">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            disabled={loading}
          />
        </div>

        <div className="forgot-password">
          <span className="text-link">¿Olvidaste tu contraseña?</span>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Cargando..." : "Entrar"}
        </button>
        <button 
          type="button" 
          onClick={handleRegister} 
          className="submit-btn register-btn"
          disabled={loading}
        >
          Registrar
        </button>
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

        .login-page {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #00aaff, #1e88e5);
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
          font-size: 1.1rem;
          transition: border 0.3s ease;
          color: #333;
        }

        .input-field:focus {
          border-color: #1e88e5;
          outline: none;
        }

        .input-field:disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
        }

        .forgot-password {
          text-align: right;
          margin-bottom: 20px;
          width: 100%;
          max-width: 350px;
        }

        .text-link {
          color: #1e88e5;
          cursor: pointer;
          font-size: 14px;
        }

        .submit-btn {
          width: 100%;
          padding: 18px;
          background-color: #1e88e5;
          color: white;
          font-size: 1.2rem;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .submit-btn:hover:not(:disabled) {
          background-color: #1565c0;
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .register-btn {
          background-color: #e53935;
          margin-top: 15px;
        }

        .register-btn:hover:not(:disabled) {
          background-color: #c62828;
        }

        .back-button {
          padding: 14px 25px;
          background-color: #e53935;
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
          background-color: #c62828;
        }

        .back-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .text-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .login-page {
            padding: 20px;
          }

          .title {
            font-size: 2.2rem;
          }

          .submit-btn {
            font-size: 1rem;
          }

          .register-btn {
            font-size: 1rem;
            padding: 14px;
          }
        }
      `}</style>
    </div>
  );
}
