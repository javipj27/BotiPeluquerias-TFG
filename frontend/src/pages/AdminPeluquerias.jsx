import React, { useRef, useEffect, useState } from "react";
import { getPeluquerias } from "../api/peluquerias";
import { Link } from "react-router-dom";

export default function AdminPeluquerias() {
  const fileInputRef = useRef();
  const [peluquerias, setPeluquerias] = useState([]);

  useEffect(() => {
    getPeluquerias().then(data => {
      if (Array.isArray(data)) setPeluquerias(data);
      else if (Array.isArray(data.member)) setPeluquerias(data.member);
      else setPeluquerias([]);
    });
  }, []);

  const handleExport = () => {
    window.open("http://localhost:8000/api/peluquerias/export", "_blank");
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      await fetch("http://localhost:8000/api/peluquerias/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: evt.target.result,
      });
      window.location.reload();
    };
    reader.readAsText(file);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("¿Seguro que quieres borrar esta peluquería?")) return;
    await fetch(`http://localhost:8000/api/peluquerias/${id}`, {
      method: "DELETE",
      headers: { "X-AUTH-TOKEN": token }
    });
    setPeluquerias(peluquerias.filter(p => p.id !== id));
  };

  return (
    <div className="p-8 bg-gradient-to-br from-blue-700 via-cyan-400 to-orange-300 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white/95 rounded-2xl shadow-2xl p-8 animate-fade-in">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">Administración de Peluquerías</h2>
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
          <h3 className="text-xl font-bold mb-4 text-blue-700">Listado de Peluquerías</h3>
          <ul>
            {peluquerias.map(p => (
              <li key={p.id} className="flex justify-between items-center border-b py-2">
                <span className="text-gray-800">{p.nombre}</span>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white font-bold shadow hover:scale-110 transition focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Borrar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}