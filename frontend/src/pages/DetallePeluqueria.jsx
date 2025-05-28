import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPeluqueriaById } from "../api/peluquerias";

export default function DetallePeluqueria({ setCarrito }) {
  const { id } = useParams();
  const [peluqueria, setPeluqueria] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState("");
  const [peluqueroSeleccionado, setPeluqueroSeleccionado] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [weather, setWeather] = useState(null); // Estado para el clima

  useEffect(() => {
  getPeluqueriaById(id).then(data => {
    setPeluqueria({
      ...data,
      galeria: data.galeria || [data.imagen].filter(Boolean),
      peluqueros: data.peluqueros || [],
      productos: data.productos || [],
    });
    // Llama al endpoint de clima después de cargar la peluquería
    const token = localStorage.getItem("token");
    fetch("http://localhost:8000/api/weather", {
      headers: { "X-AUTH-TOKEN": token }
    })
      .then(res => res.json())
      .then(setWeather);
  });
}, [id]);

if (!peluqueria) return (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 via-cyan-400 to-orange-300">
    <span className="w-20 h-20 border-8 border-white border-t-blue-600 border-b-orange-400 rounded-full animate-spin"></span>
  </div>
);
  const handleProductoClick = (producto) => {
    setProductoSeleccionado(producto);
  };

  const cerrarModal = () => {
    setProductoSeleccionado(null);
  };

  const handleAddToCart = () => {
    if (productoSeleccionado) {
      setCarrito((prevCarrito) => [
        ...prevCarrito,
        {
          nombre: productoSeleccionado.nombre,
          imagen: productoSeleccionado.imagen,
          descripcion: productoSeleccionado.descripcion,
          precio: productoSeleccionado.precio || 0
        },
      ]);
      alert("Producto añadido al carrito");
      cerrarModal();
    }
  };

  const nextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % peluqueria.galeria.length);
  };

  const prevSlide = () => {
    setSlideIndex((prev) =>
      prev === 0 ? peluqueria.galeria.length - 1 : prev - 1
    );
  };

  const generarHorarios = () => {
    const horarios = [];
    for (let h = 8; h <= 13; h++) horarios.push(`${h.toString().padStart(2, "0")}:00`);
    for (let h = 16; h <= 19; h++) horarios.push(`${h.toString().padStart(2, "0")}:00`);
    return horarios;
  };

  const handleReserva = (e) => {
    e.preventDefault();
        const token = localStorage.getItem("token"); 
    // Generar PDF de cita
    fetch("http://localhost:8000/api/pdf/cita", {
      method: "POST",
      headers: { "Content-Type": "application/json", 
                "X-AUTH-TOKEN": token // <-- Añadido
      },
      body: JSON.stringify({
        nombre: nombreCliente,
        peluqueria: peluqueria.nombre,
        peluquero: peluqueroSeleccionado,
        hora: horarioSeleccionado
      })
    })
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "cita.pdf";
        a.click();
        window.URL.revokeObjectURL(url);
      });
    setMostrarFormulario(false);
    setNombreCliente("");
    setPeluqueroSeleccionado("");
    setHorarioSeleccionado("");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <h2 className="text-4xl font-bold">{peluqueria.nombre}</h2>
          <p className="mt-2">📍 {peluqueria.direccion}</p>
          {weather && (
            <div className="mt-2">
              <span>🌡️ {weather.temperature}°C | 💨 {weather.windspeed} km/h</span>
            </div>
          )}
        </div>

        {/* Carrusel */}
        <div className="relative w-full h-96 overflow-hidden">
          {peluqueria.galeria.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`Foto ${idx + 1}`}
              className={`absolute w-full h-full object-cover transition-transform duration-700 ${
                idx === slideIndex ? "translate-x-0" : "translate-x-full"
              }`}
              style={{ transform: `translateX(${(idx - slideIndex) * 100}%)` }}
            />
          ))}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
          >
            ❮
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
          >
            ❯
          </button>
        </div>

        {/* Información */}
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-4">👨‍🔧 Peluqueros disponibles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {peluqueria.peluqueros.map((p, i) => (
              <div key={i} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h4 className="font-bold">{p}</h4>
                <p className="text-sm text-gray-600">Experto en cortes modernos y clásicos</p>
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-semibold mb-4">🧴 Productos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {peluqueria.productos.map((producto, i) => (
              <div
                key={i}
                className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center gap-4 cursor-pointer hover:bg-gray-200 transition"
                onClick={() => handleProductoClick(producto)}
              >
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <span className="font-bold text-gray-800">{producto.nombre}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-green-400 text-white font-bold shadow-md transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
          > 
            {mostrarFormulario ? "Cerrar formulario" : "Agendar cita"}
          </button>

          {/* Formulario */}
          {mostrarFormulario && (
            <form className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md space-y-4" onSubmit={handleReserva}>
              <div>
                <label className="block font-bold mb-1">Nombre del cliente</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Tu nombre"
                  value={nombreCliente}
                  onChange={e => setNombreCliente(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Selecciona peluquero</label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={peluqueroSeleccionado}
                  onChange={e => setPeluqueroSeleccionado(e.target.value)}
                  required
                >
                  <option value="">Selecciona...</option>
                  {peluqueria.peluqueros.map((pel, i) => (
                    <option key={i} value={pel}>
                      {pel}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1">Selecciona horario</label>
                <div className="grid grid-cols-2 gap-2">
                  {generarHorarios().map((hora, i) => (
                    <label key={i} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="horario"
                        value={hora}
                        checked={horarioSeleccionado === hora}
                        onChange={() => setHorarioSeleccionado(hora)}
                        className="form-radio"
                        required
                      />
                      <span>{hora}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md transition"
              >
                Reservar
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Modal */}
      {productoSeleccionado && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <img
              src={productoSeleccionado.imagen}
              alt={productoSeleccionado.nombre}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold mb-2">{productoSeleccionado.nombre}</h3>
            <p className="text-gray-600 mb-4">
              {productoSeleccionado.descripcion || "Descripción del producto: Este es un producto de alta calidad."}
            </p>
            <button
              className="px-4 py-2 rounded-full bg-gradient-to-r from-green-500 via-blue-500 to-cyan-400 text-white font-bold shadow hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-green-400"
              onClick={handleAddToCart}
            >
              Añadir al carrito
            </button>
            <button
              className="mt-4 px-4 py-2 rounded-full bg-gray-300 text-gray-800 font-bold shadow hover:bg-gray-400 transition focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={cerrarModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}