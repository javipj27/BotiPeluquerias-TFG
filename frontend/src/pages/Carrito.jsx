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
    // Generar PDF de compra
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
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Carrito de Compras</h2>
      {mensajeCompra && (
        <p className="text-green-600 text-center font-bold mb-4">{mensajeCompra}</p>
      )}
      {carrito.length > 0 ? (
        <div className="space-y-4">
          {carrito.map((producto, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <span className="font-bold text-gray-800">{producto.nombre}</span>
                  <p className="text-gray-600 text-sm">
                    {producto.descripcion || "Descripción: Producto de alta calidad"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleEliminarProducto(index)}
                className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition"
              >
                Eliminar
              </button>
            </div>
          ))}
          <button
            onClick={handleComprar}
            className="w-full px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
          >
            Comprar
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-600">
          Tu carrito está vacío. <Link to="/peluquerias" className="text-blue-600">Explorar productos</Link>.
        </p>
      )}
    </div>
  );
}