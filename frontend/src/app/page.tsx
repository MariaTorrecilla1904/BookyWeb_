"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="landing-page">
      {/* Logo centrado */}
      <img
        src="/logo.png"  // Asegúrate de que el logo esté en la carpeta public
        alt="Booky Logo"
        className="logo"
      />

      {/* Título */}
      <h1 className="title">📚 Booky</h1>

      {/* Descripción */}
      <p className="description">
        Tu biblioteca digital. Gestiona tus libros, autores y lecturas fácilmente.
      </p>

      {/* Botón "Comenzar" */}
      <div className="button-container">
        <button
          onClick={() => router.push("/login")}
          className="start-button"
        >
          Comenzar
        </button>
      </div>

      {/* Estilos internos */}
      <style jsx>{`
        .landing-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #00aaff, #1e88e5); /* Gradiente de fondo */
          color: white;
          font-family: 'Poppins', sans-serif;
          padding: 20px;
        }

        .logo {
          width: 100px;
          height: 100px;
          margin-bottom: 20px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .description {
          font-size: 1.2rem;
          color: #e0e0e0;
          margin-bottom: 30px;
          text-align: center;
          max-width: 500px;
        }

        .button-container {
          display: flex;
          justify-content: center;
        }

        .start-button {
          padding: 15px 30px;
          background-color: #1e88e5;
          color: white;
          font-size: 1.2rem;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .start-button:hover {
          background-color: #1565c0;
          transform: scale(1.05);
        }

        .start-button:focus {
          outline: none;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .title {
            font-size: 2.5rem;
          }

          .description {
            font-size: 1rem;
          }

          .start-button {
            padding: 12px 25px;
          }
        }
      `}</style>
    </main>
  );
}
