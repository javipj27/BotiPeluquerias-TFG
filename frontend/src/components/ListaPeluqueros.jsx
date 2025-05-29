export default function ListaPeluqueros({ peluqueros, theme }) {
  return (
    <>
      <h3 className="text-2xl font-semibold mb-4">👨‍🔧 Peluqueros disponibles</h3>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6`}>
        {peluqueros.map((p, i) => (
          <div key={i} className={`p-4 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-100 text-gray-900" : "bg-gray-800 text-white"}`}>
            <h4 className="font-bold">{p}</h4>
            <p className={`text-sm ${theme === "dark" ? "text-gray-600" : "text-gray-300"}`}>Experto en cortes modernos y clásicos</p>
          </div>
        ))}
      </div>
    </>
  );
}