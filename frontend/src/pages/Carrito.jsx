import { useState } from "react";
import CarritoLista from "../components/CarritoLista";

export default function Carrito({ carrito, setCarrito, theme }) {
  const [mensajeCompra, setMensajeCompra] = useState("");

  const handleEliminarProducto = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
  };

  const handleComprar = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8000/api/pdf/compra", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": token
      },
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
    <div className="p-8 min-h-screen">
      <div className={`max-w-2xl mx-auto mt-8 rounded-2xl shadow-2xl p-8 animate-fade-in
        ${theme === "dark" ? "bg-white/95 text-gray-900" : "bg-gray-900 text-white"}`}>
        <h2 className={`text-3xl font-extrabold text-center mb-8 drop-shadow
          ${theme === "dark" ? "text-blue-700" : "text-blue-300"}`}>
          Carrito de Compras
        </h2>
        {mensajeCompra && (
          <p className={`text-center font-bold mb-4
            ${theme === "dark" ? "text-green-600" : "text-green-400"}`}>{mensajeCompra}</p>
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