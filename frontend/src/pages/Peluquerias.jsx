import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPeluquerias } from "../api/peluquerias";

export default function Peluquerias() {
  const [peluquerias, setPeluquerias] = useState([]);

  useEffect(() => {
    getPeluquerias().then(data => {
      setPeluquerias(data["hydra:member"] || data);
    });
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Nuestras Peluquerías</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {peluquerias.map((p) => (
          <div
            key={p.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <img
              src={p.logo || p.imagen}
              alt={`Logo de ${p.nombre}`}
              className="w-20 h-20 object-cover rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800 text-center">{p.nombre}</h3>
            <p className="text-gray-600 text-center mb-4">{p.direccion}</p>
            <Link
              to={`/peluqueria/${p.id}`}
              className="block text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Ver más
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}