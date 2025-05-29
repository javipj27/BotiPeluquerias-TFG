import { useEffect, useState } from "react";

export default function Perfil({ theme }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const telefono = localStorage.getItem("telefono");
    setUsuario({ username, email, telefono });
  }, []);

  if (!usuario) {
    return <div className="flex items-center justify-center min-h-screen"><span className="text-6xl animate-spin-slow">💈</span></div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        className={`p-8 rounded-2xl shadow-2xl max-w-md w-full animate-fade-in flex flex-col items-center
          ${theme === "dark"
            ? "bg-white/95 text-gray-900"
            : "bg-gray-900 text-white"
          }`}
      >
        <img
          src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
          alt="avatar"
          className="w-24 h-24 rounded-full mb-4 border-4 border-blue-400"
        />
        <h2 className="text-3xl font-extrabold mb-2 text-blue-700">Perfil de Usuario</h2>
        <div className="text-lg mb-2"><b>Usuario:</b> {usuario.username}</div>
        <div className="text-lg mb-2"><b>Email:</b> {usuario.email}</div>
        <div className="text-lg mb-2"><b>Teléfono:</b> {usuario.telefono}</div>
      </div>
    </div>
  );
}