import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPeluquerias } from "../api/peluquerias";
import PeluqueriaCard from "../components/PeluqueriaCard";

export default function Peluquerias({theme}) {
  const [peluquerias, setPeluquerias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPeluquerias().then(data => {
      if (Array.isArray(data)) {
        setPeluquerias(data);
      } else if (Array.isArray(data.member)) {
        setPeluquerias(data.member);
      } else {
        setPeluquerias([]);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-9xl animate-spin-slow">💈</span>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen">
      <h2 className={`text-4xl font-extrabold text-center mb-10 mt-7 drop-shadow animate-fade-in ${theme === "dark" ? "text-white" : "text-black"}`}>
        Nuestras Peluquerías
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {peluquerias.map((p, idx) => (
          <PeluqueriaCard key={p.id} peluqueria={p} theme={theme} idx={idx} />
        ))}
      </div>
    </div>
  );
}