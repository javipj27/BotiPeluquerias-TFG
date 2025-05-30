import { useEffect, useRef, useState } from "react";

export default function Perfil({ theme }) {
  const [usuario, setUsuario] = useState(null);
  const [subiendo, setSubiendo] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const telefono = localStorage.getItem("telefono");
    const fotoPerfil = localStorage.getItem("fotoPerfil") || "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp";
    setUsuario({ username, email, telefono, fotoPerfil });
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSubiendo(true);
    const formData = new FormData();
    formData.append("file", file);
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8000/upload", {
      method: "POST",
      headers: { "X-AUTH-TOKEN": token },
      body: formData,
    });
    const data = await res.json();
    if (data.url) {
      await fetch("http://localhost:8000/api/usuario/avatar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": token,
        },
        body: JSON.stringify({ fotoPerfil: data.url }),
      });
      localStorage.setItem("fotoPerfil", data.url);
      setUsuario((u) => ({ ...u, fotoPerfil: data.url }));
      window.dispatchEvent(new Event("authChanged"));
    }
    setSubiendo(false);
  };

  const handlePencilClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (!usuario) {
    return <div className="flex items-center justify-center min-h-screen"><span className="text-6xl animate-spin-slow">💈</span></div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-2 sm:px-0">
      <div
        className={`p-4 sm:p-8 rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md animate-fade-in flex flex-col items-center
      ${theme === "dark"
        ? "bg-white/95 text-gray-900"
        : "bg-gray-900 text-white"
      }`}
      >
        <div className="relative mb-4">
          <img
            src={usuario.fotoPerfil}
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-blue-400 object-cover"
          />
          <button
            type="button"
            onClick={handlePencilClick}
            className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow transition"
            style={{ width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center" }}
            aria-label="Editar avatar"
            disabled={subiendo}
          >
            {/* Icono lápiz SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H7v-3a2 2 0 01.586-1.414z" />
            </svg>
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            disabled={subiendo}
          />
        </div>
        {subiendo && <p className="mb-2 text-blue-600">Subiendo...</p>}
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