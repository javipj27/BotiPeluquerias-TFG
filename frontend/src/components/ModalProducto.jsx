import React from "react";

export default function ModalProducto({ producto, onClose, onAddToCart, theme }) {
  if (!producto) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-3xl mx-4 sm:mx-auto bg-white rounded-xl shadow-xl p-6 flex flex-col md:flex-row gap-6
          ${theme === "dark" ? "text-gray-900" : "text-gray-800"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Imagen del producto */}
        <div className="flex-shrink-0 w-full md:w-1/2 h-64 md:h-auto overflow-hidden rounded-lg">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Detalles del producto */}
        <div className="flex flex-col justify-between w-full md:w-1/2 space-y-4">
          <div>
            <h2 className="text-2xl font-bold">{producto.nombre}</h2>
            <p className="mt-2 text-base">{producto.descripcion}</p>
            {producto.precio && (
              <p className="mt-2 text-lg font-semibold text-green-600">
                Precio: ${producto.precio}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              onClick={onClose}
            >
              Cerrar
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={onAddToCart}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
