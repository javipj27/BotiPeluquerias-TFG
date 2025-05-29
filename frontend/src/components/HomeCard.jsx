export default function HomeCard({ theme }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 ">
      <div className={`rounded-xl sm:p-6 p-2 shadow flex flex-col items-center animate-fade-in
        ${theme === "dark" ? "bg-blue-100" : "bg-blue-900/80 text-white"}`}>
        <span className="text-4xl mb-2">💇‍♂️</span>
        <h3 className={`font-bold mb-1 ${theme === "dark" ? "text-blue-700" : "text-blue-200"}`}>Reserva fácil</h3>
        <p className={`text-sm ${theme === "dark" ? "text-gray-600" : "text-gray-200"}`}>Elige tu peluquería, peluquero y horario en segundos.</p>
      </div>
      <div className={`rounded-xl sm:p-6 p-2 shadow flex flex-col items-center animate-fade-in
        ${theme === "dark" ? "bg-orange-100" : "bg-orange-900/80 text-white"}`}>
        <span className="text-4xl mb-2">🛒</span>
        <h3 className={`font-bold mb-1 ${theme === "dark" ? "text-orange-600" : "text-orange-200"}`}>Compra productos</h3>
        <p className={`text-sm ${theme === "dark" ? "text-gray-600" : "text-gray-200"}`}>Añade productos exclusivos a tu carrito y recíbelos en tu cita.</p>
      </div>
    </div>
  );
}