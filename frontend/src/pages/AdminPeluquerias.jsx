import React, { useRef, useEffect, useState } from "react";
import { getPeluquerias } from "../api/peluquerias";
import { Link } from "react-router-dom";
import AdminPeluqueriasLista from "../components/AdminPeluqueriasLista";

export default function AdminPeluquerias({theme}) {
  const fileInputRef = useRef();
  const [peluquerias, setPeluquerias] = useState([]);

  useEffect(() => {
    getPeluquerias().then(data => {
      if (Array.isArray(data)) setPeluquerias(data);
      else if (Array.isArray(data.member)) setPeluquerias(data.member);
      else setPeluquerias([]);
    });
  }, []);

  const handleExport = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("/api/peluquerias/export", {
    headers: {
      "X-AUTH-TOKEN": token
    }
  });
  if (!response.ok) {
    alert("Error al exportar: " + response.statusText);
    return;
  }
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "peluquerias_export.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};

  const handleImport = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async (evt) => {
    const token = localStorage.getItem("token");
    await fetch("/api/peluquerias/import", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": token
      },
      body: evt.target.result,
    });
    window.location.reload();
  };
  reader.readAsText(file);
};

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("¿Seguro que quieres borrar esta peluquería?")) return;
    await fetch(`/api/peluquerias/${id}`, {
      method: "DELETE",
      headers: { "X-AUTH-TOKEN": token }
    });
    setPeluquerias(peluquerias.filter(p => p.id !== id));
  };

  return (
     <div className="p-8 min-h-screen">
      <div className={`max-w-3xl mx-auto rounded-2xl shadow-2xl p-8 animate-fade-in
        ${theme === "dark" ? "bg-white/90 text-gray-900" : "bg-gray-900 text-white"}`}>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-blue-700">
            Administración de Peluquerías
          </h2>        
          <div className="flex flex-wrap gap-4 mb-4">
          <button
            onClick={handleExport}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-green-500 via-blue-500 to-cyan-400 text-white font-bold shadow hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Exportar Peluquerías
          </button>
          <label className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-green-400 text-white font-bold shadow cursor-pointer hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-blue-400">
            Importar Peluquerías
            <input
              type="file"
              accept="application/json"
              onChange={handleImport}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
          </label>
          <Link
            to="/crear-peluqueria"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 text-white font-bold shadow hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            Crear Peluquería
          </Link>
        </div>
        <div className="mt-8">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-blue-700">
            Listado de Peluquerías
          </h3>          
          <AdminPeluqueriasLista peluquerias={peluquerias} theme={theme} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}