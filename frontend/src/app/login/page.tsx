"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Email: ${email}\nPassword: ${password}`);
  };

  // Redirigir a la página de registro
  const handleRegister = () => {
    router.push("/register");
  };

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
        <div className="input-container">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="input-container">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="forgot-password">
          <span className="text-link">¿Olvidaste tu contraseña?</span>
        </div>

        <button type="submit" className="submit-btn">
          Entrar
        </button>
        <button type="button" onClick={handleRegister} className="submit-btn register-btn">
          Registrar
        </button>
      </form>

      {/* Botón volver al inicio */}
      <button
        onClick={() => router.push("/")}
        className="back-button"
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
          background: linear-gradient(135deg, #00aaff, #1e88e5); /* Gradiente de fondo */
          color: white;
          font-family: 'Poppins', sans-serif;
          padding: 20px;
        }

        .header {
          text-align: center;
          margin-bottom: 50px; /* Más espacio para que no se vea apretado */
        }

        .logo {
          font-size: 50px;
          margin-bottom: 10px;
        }

        .title {
          font-size: 2.8rem; /* Tamaño más grande */
          font-weight: 600;
          margin-bottom: 10px;
        }

        .subtitle {
          font-size: 1.2rem; /* Tamaño de subtítulo un poco más grande */
          color: #e0e0e0;
        }

        .form {
          width: 100%;
          max-width: 420px; /* Amplié el contenedor del formulario */
          background-color: white;
          padding: 40px; /* Más espacio en el interior */
          border-radius: 12px; /* Bordes más redondeados */
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1); /* Sombra más prominente */
          margin-bottom: 30px; /* Más espacio debajo del formulario */
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .input-container {
          width: 100%;
          margin-bottom: 20px; /* Más espacio entre los campos */
          display: flex;
          justify-content: center; /* Centra los campos */
        }

        .input-field {
          width: 100%;
          max-width: 350px; /* Limita el ancho de los campos */
          padding: 18px; /* Más espacio en los campos */
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1.1rem; /* Tamaño de fuente mayor */
          transition: border 0.3s ease;
        }

        .input-field:focus {
          border-color: #1e88e5;
          outline: none;
        }

        .forgot-password {
          text-align: right;
          margin-bottom: 20px;
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
          font-size: 1.2rem; /* Mayor tamaño de fuente en los botones */
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .submit-btn:hover {
          background-color: #1565c0;
        }

        .register-btn {
          background-color: #e53935; /* Rojo para registrar */
          margin-top: 15px; /* Más espacio entre los botones */
        }

        .back-button {
          padding: 14px 25px; /* Botón de regreso más grande */
          background-color: #e53935;
          color: white;
          font-size: 1.1rem; /* Tamaño mayor en el botón de regreso */
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          margin-top: 30px;
        }

        .back-button:hover {
          background-color: #c62828;
        }

        .register-link {
          margin-top: 20px;
          text-align: center;
          color: white;
        }

        .text-link:hover {
          text-decoration: underline;
        }

        /* Responsive design */
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
