import { Link } from "react-router-dom";
import HomeCard from "../components/HomeCard";

export default function Home({ theme }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-2 sm:px-0">
  <div className={`p-4 sm:p-10 rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-xl md:max-w-2xl animate-fade-in text-center
    ${theme === "dark" ? "bg-white/90 text-gray-900" : "bg-gray-900 text-white"}`}>
        <h1 className={`
  text-2xl sm:text-3xl md:text-4xl font-extrabold drop-shadow mb-4
  ${theme === "dark" ? "text-gray-900" : "text-white"}
`}>Bienvenido a BotiPeluquerías</h1>
<p className={`
  mt-2 text-base sm:text-lg mb-8
  ${theme === "dark" ? "text-gray-700" : "text-gray-200"}
`}>
  Reserva tu cita online en cualquiera de nuestras peluquerías y descubre nuestros productos exclusivos.
</p>
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
          <Link
            to="/peluquerias"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-orange-400 via-green-400 to-blue-500 text-white font-bold shadow-lg hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Ver Peluquerías
          </Link>
          <Link
            to="/carrito"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 text-white font-bold shadow-lg hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Ir al Carrito
          </Link>
        </div>
        <HomeCard theme={theme} />
      </div>
    </div>
  );
}