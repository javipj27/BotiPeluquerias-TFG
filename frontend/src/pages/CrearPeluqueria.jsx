import CrearPeluqueriaForm from "../components/CrearPeluqueriaForm";

export default function CrearPeluqueria({ theme }) {
  return (
    <div className="min-h-screen flex items-center justify-center mt-8">
      <div className={`p-8 rounded-2xl shadow-2xl max-w-2xl w-full animate-fade-in mt-5 flex flex-col
        ${theme === "dark"
          ? "bg-white/95 text-gray-900"
          : "bg-gray-900 text-white"
        }`}>
        <h2 className={`text-3xl font-extrabold mb-6 text-center
          ${theme === "dark" ? " text-gray-900" : "bg-gray-900 text-white"}`}>
          Crear Peluquería
        </h2>
        <CrearPeluqueriaForm theme={theme} />
      </div>
    </div>
  );
}