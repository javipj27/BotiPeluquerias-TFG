export default function ListaProductos({ productos, theme, onProductoClick }) {
  return (
    <>
      <h3 className="text-2xl font-semibold mb-4">🧴 Productos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {productos.map((producto, i) => (
          <div
            key={i}
            className={`p-4 rounded-lg shadow-md flex items-center gap-4 cursor-pointer hover:scale-105 transition ${theme === "dark" ? "bg-gray-100 text-gray-900 hover:bg-gray-200" : "bg-gray-800 text-white hover:bg-gray-700"}`}
            onClick={() => onProductoClick(producto)}
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <span className="font-bold">{producto.nombre}</span>
          </div>
        ))}
      </div>
    </>
  );
}