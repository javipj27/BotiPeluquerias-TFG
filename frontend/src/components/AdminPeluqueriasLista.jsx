export default function AdminPeluqueriasLista({ peluquerias, theme, onDelete }) {
  return (
    <ul>
      {peluquerias.map(p => (
        <li key={p.id} className="flex justify-between items-center border-b py-2">
          <h3 className={`card-title text-2xl font-bold ${
            theme === "dark" ? "text-gray-900" : "text-white-900"
          }`}>{p.nombre}</h3>
          <button
            onClick={() => onDelete(p.id)}
            className="px-3 py-1 rounded-full bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white font-bold shadow hover:scale-110 transition focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Borrar
          </button>
        </li>
      ))}
    </ul>
  );
}