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
    <div className="p-8 bg-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Administración de Peluquerías</h2>
      <div className="flex gap-4 mb-4">
        <button
          onClick={handleExport}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Exportar Peluquerías
        </button>
        <label className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
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
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Crear Peluquería
        </Link>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Listado de Peluquerías</h3>
        <ul>
          {peluquerias.map(p => (
            <li key={p.id} className="flex justify-between items-center border-b py-2">
              <span>{p.nombre}</span>
              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Borrar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}