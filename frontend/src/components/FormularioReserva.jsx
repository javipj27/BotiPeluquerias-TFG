export default function FormularioReserva({
  theme,
  nombreCliente,
  setNombreCliente,
  peluqueroSeleccionado,
  setPeluqueroSeleccionado,
  horarioSeleccionado,
  setHorarioSeleccionado,
  peluqueros,
  generarHorarios,
  onSubmit,
  horariosOcupados = []
}) {
  return (
    <form className={`mt-6 p-6 rounded-lg shadow-md space-y-4 ${theme === "dark" ? "bg-gray-100 text-gray-900" : "bg-gray-800 text-white"}`} onSubmit={onSubmit}>
      <div>
        <label className="block font-bold mb-1">Nombre del cliente</label>
        <input
          type="text"
          className={`w-full p-2 border rounded-lg ${theme === "dark" ? "bg-white text-gray-900" : "bg-gray-900 text-white"}`}
          placeholder="Tu nombre"
          value={nombreCliente}
          onChange={e => setNombreCliente(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block font-bold mb-1">Selecciona peluquero</label>
        <select
          className={`w-full p-2 border rounded-lg ${theme === "dark" ? "bg-white text-gray-900" : "bg-gray-900 text-white"}`}
          value={peluqueroSeleccionado}
          onChange={e => setPeluqueroSeleccionado(e.target.value)}
          required
        >
          <option value="">Selecciona...</option>
          {peluqueros.map((pel, i) => (
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
                disabled={horariosOcupados.includes(hora)}
              />
              <span>
                {hora} {horariosOcupados.includes(hora) && "(Ocupado)"}
              </span>
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
  );
}