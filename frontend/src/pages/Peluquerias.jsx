import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPeluquerias } from "../api/peluquerias";

export default function Peluquerias() {
  const [peluquerias, setPeluquerias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPeluquerias().then(data => {
      if (Array.isArray(data)) {
        setPeluquerias(data);
      } else if (Array.isArray(data.member)) {
        setPeluquerias(data.member);
      } else {
        setPeluquerias([]);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 via-cyan-400 to-orange-300">
        <span className="w-20 h-20 border-8 border-white border-t-blue-600 border-b-orange-400 rounded-full animate-spin"></span>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-br from-blue-700 via-cyan-400 to-orange-300 min-h-screen">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-white drop-shadow animate-fade-in">
        Nuestras Peluquerías
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {peluquerias.map((p, idx) => (
          <div
            key={p.id}
            className="card bg-white/95 shadow-xl rounded-2xl overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <figure className="bg-blue-100 p-6 mb-5 ">
              <img
                src={p.logo || p.imagen}
                alt={`Logo de ${p.nombre}`}
                className="w-24 h-24 object-cover rounded-full border-4 border-cyan-400 shadow-lg transition-transform duration-300 hover:scale-110"
              />
            </figure>
            <div className="card-body items-center text-center mb-4">
              <h3 className="card-title text-2xl font-bold text-blue-700">{p.nombre}</h3>
              <p className="text-gray-700 mb-4">{p.direccion}</p>
              <Link
                to={`/peluqueria/${p.id}`}
                className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-orange-400 via-green-400 to-blue-500 text-white font-semibold shadow-lg hover:from-green-400 hover:to-orange-400 hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Ver más
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}