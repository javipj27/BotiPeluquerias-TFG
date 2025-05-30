import { useEffect, useState } from "react";

export default function HistorialCompras({ theme }) {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8000/api/compras", {
      headers: { "X-AUTH-TOKEN": token }
    })
      .then(res => res.json())
      .then(data => {
        setCompras(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><span className="text-6xl animate-spin-slow">🛒</span></div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-2 sm:px-0">
      <div className={`p-4 sm:p-8 rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-lg animate-fade-in flex flex-col items-center
        ${theme === "dark" ? "bg-white/95 text-gray-900" : "bg-gray-900 text-white"}`}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-blue-700">
          Historial de Compras
        </h2>
        {compras.length === 0 ? (
          <p className="text-center">No tienes compras registradas.</p>
        ) : (
          <ul className="w-full space-y-4">
            {compras.map(compra => (
              <li key={compra.id} className="border-b pb-2">
                <div className="font-bold">Fecha: {compra.fecha}</div>
                <div>Total: <span className="font-semibold">{compra.total} €</span></div>
                <div className="mt-2">
                  <span className="font-semibold">Productos:</span>
                  <ul className="ml-4 list-disc">
                    {compra.productos.map((prod, idx) => (
                      <li key={idx}>{prod.nombre} ({prod.precio} €)</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}