import { useState } from "react";

export default function CrearPeluqueria() {
  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    descripcion: "",
    imagen: ""
  });
  const [mensaje, setMensaje] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/api/peluquerias", {
  method: "POST",
  headers: {
    "Content-Type": "application/ld+json"
  },
  body: JSON.stringify(form)
});
    if (res.ok) {
      setMensaje("¡Peluquería creada con éxito!");
      setForm({
        nombre: "",
        direccion: "",
        telefono: "",
        descripcion: "",
        imagen: ""
      });
    } else {
      setMensaje("Error al crear la peluquería");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Crear Peluquería</h2>
      {mensaje && <p className="mb-4 text-center">{mensaje}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" className="w-full border p-2 rounded" required />
        <input name="direccion" value={form.direccion} onChange={handleChange} placeholder="Dirección" className="w-full border p-2 rounded" required />
        <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" className="w-full border p-2 rounded" required />
        <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" className="w-full border p-2 rounded" required />
        <input name="imagen" value={form.imagen} onChange={handleChange} placeholder="URL de imagen" className="w-full border p-2 rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Crear</button>
      </form>
    </div>
  );
}