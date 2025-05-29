import { Link } from "react-router-dom";

export default function PeluqueriaCard({ peluqueria, theme, idx }) {
  return (
    <div
      className={`card shadow-xl rounded-2xl overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fade-in flex flex-col
        ${theme === "dark" ? "bg-white/90" : "bg-gray-900/90"}`}
      style={{
        animationDelay: `${idx * 100}ms`,
      }}
    >
      {/* Parte superior con imagen de fondo y logo */}
      <div
        className="relative flex justify-center items-center"
        style={{
          backgroundImage: peluqueria.imagen ? `url(${peluqueria.imagen})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "140px",
        }}
      >
        <div className={`absolute inset-0 rounded-t-2xl ${theme === "dark" ? "bg-white/50" : "bg-black/60"}`}></div>
        <img
          src={peluqueria.logo || peluqueria.imagen}
          alt={`Logo de ${peluqueria.nombre}`}
          className="w-24 h-24 object-cover rounded-full border-4 border-cyan-400 shadow-lg z-10 bg-white"
          style={{ marginTop: "24px", marginBottom: "24px" }}
        />
      </div>
      {/* Parte inferior con datos */}
      <div className={`card-body items-center text-center rounded-b-2xl p-4 flex flex-col flex-1
        ${theme === "dark" ? "bg-white/90 text-gray-900" : "bg-gray-900/90 text-white"}`}>
        <h3 className="card-title text-2xl font-bold text-blue-700">{peluqueria.nombre}</h3>
        <p className="mb-4">{peluqueria.direccion}</p>
        <Link
          to={`/peluqueria/${peluqueria.id}`}
          className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-orange-400 via-green-400 to-blue-500 text-white font-semibold shadow-lg hover:from-green-400 hover:to-orange-400 hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Ver más
        </Link>
      </div>
    </div>
  );
}