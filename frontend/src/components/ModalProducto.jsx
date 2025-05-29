export default function ModalProducto({ producto, theme, onAddToCart, onClose }) {
  if (!producto) return null;
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-50">
      <div className={`p-6 rounded-lg shadow-lg max-w-md w-full ${theme === "dark" ? "bg-white text-gray-900" : "bg-gray-900 text-white"}`}>
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h3 className="text-2xl font-bold mb-2">{producto.nombre}</h3>
        <p className={`mb-4 ${theme === "dark" ? "text-gray-600" : "text-gray-300"}`}>
          {producto.descripcion || "Descripción del producto: Este es un producto de alta calidad."}
        </p>
        <button
          className="px-4 py-2 rounded-full bg-gradient-to-r from-green-500 via-blue-500 to-cyan-400 text-white font-bold shadow hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-green-400"
          onClick={onAddToCart}
        >
          Añadir al carrito
        </button>
        <button
          className="mt-4 px-4 py-2 rounded-full bg-gray-300 text-gray-800 font-bold shadow hover:bg-gray-400 transition focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}