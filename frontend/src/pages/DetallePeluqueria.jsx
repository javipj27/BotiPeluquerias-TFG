import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPeluqueriaById } from "../api/peluquerias";
import GaleriaPeluqueria from "../components/GaleriaPeluqueria";
import ListaPeluqueros from "../components/ListaPeluqueros";
import ListaProductos from "../components/ListaProductos";
import ModalProducto from "../components/ModalProducto";
import FormularioReserva from "../components/FormularioReserva";

export default function DetallePeluqueria({ setCarrito, theme }) {
  const { id } = useParams();
  const [peluqueria, setPeluqueria] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState("");
  const [peluqueroSeleccionado, setPeluqueroSeleccionado] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    getPeluqueriaById(id).then(data => {
      setPeluqueria({
        ...data,
        galeria: data.galeria || [data.imagen].filter(Boolean),
        peluqueros: data.peluqueros || [],
        productos: data.productos || [],
      });
      const token = localStorage.getItem("token");
      fetch("/api/weather", {
        headers: { "X-AUTH-TOKEN": token }
      })
        .then(res => res.json())
        .then(setWeather);
    });
  }, [id]);

  if (!peluqueria) return (
    <div className="flex items-center justify-center min-h-screen ">
      <span className="text-6xl animate-spin-slow">💈</span>
    </div>
  );

  const handleProductoClick = (producto) => setProductoSeleccionado(producto);
  const cerrarModal = () => setProductoSeleccionado(null);

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

  const nextSlide = () => setSlideIndex((prev) => (prev + 1) % peluqueria.galeria.length);
  const prevSlide = () => setSlideIndex((prev) => prev === 0 ? peluqueria.galeria.length - 1 : prev - 1);

  const generarHorarios = () => {
    const horarios = [];
    for (let h = 8; h <= 13; h++) horarios.push(`${h.toString().padStart(2, "0")}:00`);
    for (let h = 16; h <= 19; h++) horarios.push(`${h.toString().padStart(2, "0")}:00`);
    return horarios;
  };

  const handleReserva = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const fechaHora = `${new Date().toISOString().split("T")[0]} ${horarioSeleccionado}:00`;

    // 1. Guardar la cita en el backend
    await fetch("/api/citas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": token
      },
      body: JSON.stringify({
        peluqueria: peluqueria.nombre,
        peluquero: peluqueroSeleccionado,
        fechaHora,
        nombreCliente
      })
    });

    // 2. Descargar el PDF como antes
    fetch("/api/pdf/cita", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": token
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
    <div className={`p-2 sm:p-8 min-h-screen ${theme === "dark"}`}>
      <div className={`w-full max-w-xs sm:mt-5 mt-10 sm:max-w-2xl lg:max-w-5xl mx-auto rounded-lg shadow-2xl overflow-hidden
        ${theme === "dark" ? "bg-white text-gray-900" : "bg-gray-900 text-white"}`}>

        <div className={`p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{peluqueria.nombre}</h2>
          <p className="mt-2 text-base sm:text-lg">📍 {peluqueria.direccion}</p>
          {weather && (
            <div className="mt-2 text-sm sm:text-base">
              <span>🌡️ {weather.temperature}°C | 💨 {weather.windspeed} km/h</span>
            </div>
          )}
        </div>

        {/* Carrusel */}
        <div className="hidden sm:block">
          <GaleriaPeluqueria
            galeria={peluqueria.galeria}
            slideIndex={slideIndex}
            nextSlide={nextSlide}
            prevSlide={prevSlide}
          />
        </div>

        {/* Información */}
        <div className={`p-6 ${theme === "dark" ? "bg-white/90 text-gray-900" : "bg-gray-900/90 text-white"}`}>
          <ListaPeluqueros peluqueros={peluqueria.peluqueros} theme={theme} />
          <ListaProductos productos={peluqueria.productos} theme={theme} onProductoClick={handleProductoClick} />
          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-green-400 text-white font-bold shadow-md transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {mostrarFormulario ? "Cerrar formulario" : "Agendar cita"}
          </button>
          {mostrarFormulario && (
            <FormularioReserva
              theme={theme}
              nombreCliente={nombreCliente}
              setNombreCliente={setNombreCliente}
              peluqueroSeleccionado={peluqueroSeleccionado}
              setPeluqueroSeleccionado={setPeluqueroSeleccionado}
              horarioSeleccionado={horarioSeleccionado}
              setHorarioSeleccionado={setHorarioSeleccionado}
              peluqueros={peluqueria.peluqueros}
              generarHorarios={generarHorarios}
              onSubmit={handleReserva}
            />
          )}
        </div>
      </div>
      <ModalProducto
        producto={productoSeleccionado}
        theme={theme}
        onAddToCart={handleAddToCart}
        onClose={cerrarModal}
      />
    </div>
  );
}