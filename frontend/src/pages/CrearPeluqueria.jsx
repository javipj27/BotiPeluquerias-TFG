import CrearPeluqueriaForm from "../components/CrearPeluqueriaForm";

export default function CrearPeluqueria({ theme }) {
  return (
    <div className="min-h-screen flex items-center justify-center mb-10 mt-8 px-2 sm:px-0">
  <div className={`p-4 sm:p-8 mb-4 rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-lg lg:max-w-2xl animate-fade-in mt-5 flex flex-col
    ${theme === "dark"
      ? "bg-white/95 text-gray-900"
      : "bg-gray-900 text-white"
    }`}>
        <h2 className={`
          text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-center
          ${theme === "dark" ? "text-gray-900" : "bg-gray-900 text-white"}
        `}>
          Crear Peluquería
        </h2>
        <CrearPeluqueriaForm theme={theme} />
      </div>
    </div>
  );
}