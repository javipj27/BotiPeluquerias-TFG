import { useState } from "react";
import { Link } from "react-router-dom";

export default function Carrito({ carrito, setCarrito }) {
  const [mensajeCompra, setMensajeCompra] = useState("");

  const handleEliminarProducto = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
  };

  const handleComprar = () => {
    fetch("http://localhost:8000/api/pdf/compra", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productos: carrito,
        total: carrito.reduce((acc, prod) => acc + (prod.precio || 0), 0)
      })
    })
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "compra.pdf";
        a.click();
        window.URL.revokeObjectURL(url);
      });

    setCarrito([]);
    setMensajeCompra("¡Compra realizada con éxito!");
  };

  return (
    <div className="p-8 bg-gradient-to-br from-blue-700 via-cyan-400 to-orange-300 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white/95 rounded-2xl shadow-2xl p-8 animate-fade-in">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-blue-700 drop-shadow">Carrito de Compras</h2>
        {mensajeCompra && (
          <p className="text-green-600 text-center font-bold mb-4">{mensajeCompra}</p>
        )}
        {carrito.length > 0 ? (
          <div className="space-y-4">
            {carrito.map((producto, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gradient-to-r from-blue-100 via-cyan-100 to-orange-100 p-4 rounded-xl shadow-md animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-16 h-16 object-cover rounded-lg border-2 border-cyan-400"
                  />
                  <div>
                    <span className="font-bold text-blue-700">{producto.nombre}</span>
                    <p className="text-gray-700 text-sm">
                      {producto.descripcion || "Descripción: Producto de alta calidad"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleEliminarProducto(index)}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white font-bold shadow hover:scale-110 transition focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Eliminar
                </button>
              </div>
            ))}
            <button
              onClick={handleComprar}
              className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-green-500 via-blue-500 to-cyan-400 text-white font-bold shadow-lg hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Comprar
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-700">
            Tu carrito está vacío. <Link to="/peluquerias" className="text-blue-700 underline">Explorar productos</Link>.
          </p>
        )}
      </div>
    </div>
  );
}