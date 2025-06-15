import { useState } from "react";
import CarritoLista from "../components/CarritoLista";

export default function Carrito({ carrito, setCarrito, theme }) {
  const [mensajeCompra, setMensajeCompra] = useState("");

  // Maneja la eliminación de un producto del carrito
  const handleEliminarProducto = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
  };

  // Maneja la compra de los productos en el carrito
  const handleComprar = async () => {
    const token = localStorage.getItem("token");
    const total = carrito.reduce((acc, prod) => acc + (parseFloat(prod.precio) || 0), 0);

    // 1. Guardar la compra en el backend
    await fetch("/api/compras", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": token
      },
      body: JSON.stringify({
        productos: carrito,
        total
      })
    });

    // 2. Descargar el PDF como antes
    fetch("/api/pdf/compra", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": token
      },
      body: JSON.stringify({
        productos: carrito,
        total
      })
    })
    // Convertir la respuesta a blob y crear un enlace para descargar
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
    <div className="p-2 sm:p-8 min-h-screen">
      <div className={`w-full max-w-xs sm:max-w-lg lg:max-w-2xl mx-auto mt-8 rounded-2xl shadow-2xl p-4 sm:p-8 animate-fade-in
        ${theme === "dark" ? "bg-white/95 text-gray-900" : "bg-gray-900 text-white"}`}>
        <h2 className={`
          text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-8 drop-shadow
          ${theme === "dark" ? "text-gray-900" : "text-blue-300"}
        `}>
          Carrito de Compras
        </h2>
        {mensajeCompra && (
          <p className={`
            text-center font-bold mb-4 text-sm sm:text-base md:text-lg
            ${theme === "dark" ? "text-green-600" : "text-green-400"}
          `}>
            {mensajeCompra}
          </p>
        )}
        <CarritoLista carrito={carrito} theme={theme} onEliminar={handleEliminarProducto} />
        {carrito.length > 0 && (
          <button
            onClick={handleComprar}
            className="w-full mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-green-500 via-blue-500 to-cyan-400 text-white font-bold shadow-lg hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Comprar
          </button>
        )}
      </div>
    </div>
  );
}