import { useEffect, useState } from "react";

export default function Perfil({ theme }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Cargar datos del usuario desde localStorage
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const telefono = localStorage.getItem("telefono");
    // Siempre usa el avatar por defecto
    const fotoPerfil = "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp";
    setUsuario({ username, email, telefono, fotoPerfil });
  }, []);

  if (!usuario) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-6xl animate-spin-slow">💈</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-2 sm:px-0">
      <div
        className={`p-4 sm:p-8 rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md animate-fade-in flex flex-col items-center
        ${theme === "dark" ? "bg-white/95 text-gray-900" : "bg-gray-900 text-white"}`}
      >
        <div className="relative mb-4">
          <img
            src={usuario.fotoPerfil}
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-blue-400 object-cover"
          />
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 text-blue-700">
          Perfil de Usuario
        </h2>
        <div className="text-base sm:text-lg mb-2"><b>Usuario:</b> {usuario.username}</div>
        <div className="text-base sm:text-lg mb-2"><b>Email:</b> {usuario.email}</div>
        <div className="text-base sm:text-lg mb-2"><b>Teléfono:</b> {usuario.telefono}</div>
      </div>
    </div>
  );
}