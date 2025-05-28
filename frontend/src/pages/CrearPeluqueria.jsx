import { useState } from "react";

export default function CrearPeluqueria() {
  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    descripcion: "",
    imagen: "",
    logo: "",
    peluqueros: [""],
    productos: [{ nombre: "", imagen: "", descripcion: "" }],
    galeria: [""],
  });
  const [mensaje, setMensaje] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (e, index, arrayName, field) => {
    const newArray = [...form[arrayName]];
    if (field) {
      newArray[index][field] = e.target.value;
    } else {
      newArray[index] = e.target.value;
    }
    setForm({ ...form, [arrayName]: newArray });
  };

  const addArrayItem = (arrayName, item) => {
    setForm({ ...form, [arrayName]: [...form[arrayName], item] });
  };

  const removeArrayItem = (arrayName, index) => {
    const newArray = [...form[arrayName]];
    newArray.splice(index, 1);
    setForm({ ...form, [arrayName]: newArray });
  };

  // Subida de archivos para imagen, logo y galería
  const handleFileUpload = async (e, field, index = null, isArray = false, subfield = null) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8000/upload", {
      method: "POST",
      headers: {
        "X-AUTH-TOKEN": token
      },
      body: formData
    });
    const data = await res.json();
    if (data.url) {
      if (isArray && index !== null) {
        const newArray = [...form[field]];
        if (subfield) {
          newArray[index][subfield] = data.url;
        } else {
          newArray[index] = data.url;
        }
        setForm({ ...form, [field]: newArray });
      } else {
        setForm({ ...form, [field]: data.url });
      }
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8000/api/peluquerias", {
      method: "POST",
      headers: {
        "Content-Type": "application/ld+json",
        "X-AUTH-TOKEN": token
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
        imagen: "",
        logo: "",
        peluqueros: [""],
        productos: [{ nombre: "", imagen: "", descripcion: "" }],
        galeria: [""],
      });
    } else {
      setMensaje("Error al crear la peluquería");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-cyan-400 to-orange-300">
      <div className="bg-white/95 p-8 rounded-2xl shadow-2xl max-w-2xl w-full animate-fade-in mt-5">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">Crear Peluquería</h2>
        {mensaje && <p className="mb-4 text-center font-bold text-green-600">{mensaje}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          <input name="direccion" value={form.direccion} onChange={handleChange} placeholder="Dirección" className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />

          {/* Imagen principal */}
          <div>
            <label className="font-bold">Imagen principal</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => handleFileUpload(e, "imagen")}
              className="w-full border p-2 rounded"
            />
            {form.imagen && form.imagen !== "" && (
              <img src={form.imagen} alt="Imagen subida" className="mt-2 w-32 h-32 object-cover rounded" />
            )}
          </div>

          {/* Logo */}
          <div>
            <label className="font-bold">Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => handleFileUpload(e, "logo")}
              className="w-full border p-2 rounded"
            />
            {form.logo && form.logo !== "" && (
              <img src={form.logo} alt="Logo subido" className="mt-2 w-24 h-24 object-cover rounded" />
            )}
          </div>

          <div>
            <label className="font-bold">Peluqueros</label>
            {form.peluqueros.map((peluquero, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={peluquero}
                  onChange={e => handleArrayChange(e, i, "peluqueros")}
                  placeholder={`Peluquero ${i + 1}`}
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button type="button" onClick={() => removeArrayItem("peluqueros", i)} className="px-3 py-1 rounded-full bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white font-bold shadow hover:scale-110 transition focus:outline-none focus:ring-2 focus:ring-red-400">X</button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem("peluqueros", "")} className="mt-2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 text-white font-bold shadow hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-blue-400">+ Añadir peluquero</button>
          </div>

          <div>
            <label className="font-bold">Productos</label>
            {form.productos.map((producto, i) => (
              <div key={i} className="mb-2 border p-2 rounded bg-gray-50">
                <input
                  value={producto.nombre}
                  onChange={e => handleArrayChange(e, i, "productos", "nombre")}
                  placeholder="Nombre del producto"
                  className="w-full border p-2 rounded mb-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleFileUpload(e, "productos", i, true, "imagen")}
                  className="w-full border p-2 rounded mb-1"
                />
                {producto.imagen && producto.imagen !== "" && (
                  <img src={producto.imagen} alt="Imagen producto" className="mt-2 w-20 h-20 object-cover rounded" />
                )}
                <input
                  value={producto.descripcion}
                  onChange={e => handleArrayChange(e, i, "productos", "descripcion")}
                  placeholder="Descripción"
                  className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button type="button" onClick={() => removeArrayItem("productos", i)} className="mt-2 px-3 py-1 rounded-full bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white font-bold shadow hover:scale-110 transition focus:outline-none focus:ring-2 focus:ring-red-400">X</button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem("productos", { nombre: "", imagen: "", descripcion: "" })} className="mt-2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 text-white font-bold shadow hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-blue-400">+ Añadir producto</button>
          </div>

          <div>
            <label className="font-bold">Galería de fotos</label>
            {form.galeria.map((foto, i) => (
              <div key={i} className="flex gap-2 mb-2 items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleFileUpload(e, "galeria", i, true)}
                  className="w-full border p-2 rounded"
                />
                {foto && foto !== "" && (
                  <img src={foto} alt={`Foto galería ${i + 1}`} className="w-16 h-16 object-cover rounded" />
                )}
                <button type="button" onClick={() => removeArrayItem("galeria", i)} className="px-3 py-1 rounded-full bg-gradient-to-r from-red-500 via-pink-500 to-orange-400 text-white font-bold shadow hover:scale-110 transition focus:outline-none focus:ring-2 focus:ring-red-400">X</button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem("galeria", "")} className="mt-2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 text-white font-bold shadow hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-blue-400">+ Añadir foto</button>
          </div>

          <button type="submit" className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-orange-400 via-green-400 to-blue-500 text-white font-bold shadow-lg hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-blue-400">Crear Peluquería</button>
        </form>
      </div>
    </div>
  );
}