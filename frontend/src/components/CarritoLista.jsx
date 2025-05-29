import { Link } from "react-router-dom";

export default function CarritoLista({ carrito, theme, onEliminar }) {
  if (carrito.length === 0) {
    return (
      <p className={`text-center ${theme === "dark" ? "text-gray-700" : "text-gray-300"}`}>
        Tu carrito está vacío. <Link to="/peluquerias" className="text-blue-700 underline">Explorar productos</Link>.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {carrito.map((producto, index) => {
        // Si el producto no tiene precio, asígnale uno aleatorio entre 8 y 15 (con 2 decimales)
        if (producto.precio === undefined || producto.precio === 0) {
          producto.precio = (Math.random() * (15 - 8) + 8).toFixed(2);
        }
        return (
          <div
            key={index}
            className={`flex flex-col sm:flex-row justify-between items-center p-4 rounded-xl shadow-md animate-fade-in
              ${theme === "dark"
                ? "bg-gradient-to-r from-blue-100 via-cyan-100 to-orange-100"
                : "bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800"
              }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-4">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-16 h-16 object-contain rounded-lg border-2 border-cyan-400"
              />
              <div>
                <span className={`font-bold ${theme === "dark" ? "text-white-700" : "text-white-300"}`}>{producto.nombre}</span>
                <p className={`text-sm ${theme === "dark" ? "text-gray-700" : "text-gray-300"}`}>
                  {producto.descripcion || "Descripción: Producto de alta calidad"}
                </p>
                <p className="text-base font-semibold mt-1 text-gray-900">{producto.precio} €</p>
              </div>
            </div>
            <button
              onClick={() => onEliminar(index)}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white font-bold shadow hover:scale-110 transition focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Eliminar
            </button>
          </div>
        );
      })}
    </div>
  );
}