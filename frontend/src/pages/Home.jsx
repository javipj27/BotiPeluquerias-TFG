import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-cyan-400 to-orange-300">
      <div className="bg-white/95 p-10 rounded-3xl shadow-2xl max-w-2xl w-full animate-fade-in text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 drop-shadow mb-4">
          Bienvenido a BotiPeluquerías
        </h1>
        <p className="mt-2 text-gray-700 text-lg mb-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-blue-100 rounded-xl p-6 shadow flex flex-col items-center animate-fade-in">
            <span className="text-4xl mb-2">💇‍♂️</span>
            <h3 className="font-bold text-blue-700 mb-1">Reserva fácil</h3>
            <p className="text-gray-600 text-sm">Elige tu peluquería, peluquero y horario en segundos.</p>
          </div>
          <div className="bg-orange-100 rounded-xl p-6 shadow flex flex-col items-center animate-fade-in">
            <span className="text-4xl mb-2">🛒</span>
            <h3 className="font-bold text-orange-600 mb-1">Compra productos</h3>
            <p className="text-gray-600 text-sm">Añade productos exclusivos a tu carrito y recíbelos en tu cita.</p>
          </div>
        </div>
      </div>
    </div>
  );
}