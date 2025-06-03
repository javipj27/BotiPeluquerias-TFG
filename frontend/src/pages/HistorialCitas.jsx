import { useEffect, useState } from "react";

export default function HistorialCitas({ theme }) {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/citas", {
      headers: { "X-AUTH-TOKEN": token }
    })
      .then(res => res.json())
      .then(data => {
        setCitas(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><span className="text-6xl animate-spin-slow">📅</span></div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-2 sm:px-0">
      <div className={`p-4 sm:p-8 rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-lg animate-fade-in flex flex-col items-center
        ${theme === "dark" ? "bg-white/95 text-gray-900" : "bg-gray-900 text-white"}`}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-blue-700">
          Historial de Citas
        </h2>
        {citas.length === 0 ? (
          <p className="text-center">No tienes citas registradas.</p>
        ) : (
          <ul className="w-full space-y-4">
            {citas.map(cita => (
              <li key={cita.id} className="border-b pb-2">
                <div className="font-bold">Fecha y hora: {cita.fechaHora}</div>
                <div><span className="font-semibold">Peluquería:</span> {cita.peluqueria}</div>
                <div><span className="font-semibold">Peluquero:</span> {cita.peluquero}</div>
                <div><span className="font-semibold">Cliente:</span> {cita.nombreCliente}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}