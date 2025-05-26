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

  // Subida de imagen principal
  const handleImagenUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("http://localhost:8000/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.url) {
      setForm(f => ({ ...f, imagen: data.url }));
    }
  };

  // Subida de logo
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("http://localhost:8000/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.url) {
      setForm(f => ({ ...f, logo: data.url }));
    }
  };

  // Subida de imagen de galería
  const handleGaleriaUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("http://localhost:8000/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.url) {
      const newGaleria = [...form.galeria];
      newGaleria[index] = data.url;
      setForm(f => ({ ...f, galeria: newGaleria }));
    }
  };

  // Subida de imagen de producto
  const handleProductoImagenUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("http://localhost:8000/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.url) {
      const newProductos = [...form.productos];
      newProductos[index].imagen = data.url;
      setForm(f => ({ ...f, productos: newProductos }));
    }
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
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Crear Peluquería</h2>
      {mensaje && <p className="mb-4 text-center">{mensaje}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" className="w-full border p-2 rounded" required />
        <input name="direccion" value={form.direccion} onChange={handleChange} placeholder="Dirección" className="w-full border p-2 rounded" required />
        <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" className="w-full border p-2 rounded" required />
        <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" className="w-full border p-2 rounded" required />

        {/* Imagen principal */}
        <div>
          <label className="font-bold">Imagen principal</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagenUpload}
            className="w-full border p-2 rounded"
          />
          {form.imagen && (
            <img src={form.imagen} alt="Imagen subida" className="w-32 h-32 object-cover mt-2" />
          )}
        </div>

        {/* Logo */}
        <div>
          <label className="font-bold">Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="w-full border p-2 rounded"
          />
          {form.logo && (
            <img src={form.logo} alt="Logo subido" className="w-20 h-20 object-cover mt-2" />
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
                className="w-full border p-2 rounded"
              />
              <button type="button" onClick={() => removeArrayItem("peluqueros", i)} className="text-red-500">X</button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem("peluqueros", "")} className="text-blue-600">+ Añadir peluquero</button>
        </div>

        <div>
          <label className="font-bold">Productos</label>
          {form.productos.map((producto, i) => (
            <div key={i} className="mb-2 border p-2 rounded">
              <input
                value={producto.nombre}
                onChange={e => handleArrayChange(e, i, "productos", "nombre")}
                placeholder="Nombre del producto"
                className="w-full border p-2 rounded mb-1"
              />
              {/* Subida de imagen de producto */}
              <input
                type="file"
                accept="image/*"
                onChange={e => handleProductoImagenUpload(e, i)}
                className="w-full border p-2 rounded mb-1"
              />
              {producto.imagen && (
                <img src={producto.imagen} alt="Imagen producto" className="w-20 h-20 object-cover mt-2" />
              )}
              <input
                value={producto.descripcion}
                onChange={e => handleArrayChange(e, i, "productos", "descripcion")}
                placeholder="Descripción"
                className="w-full border p-2 rounded"
              />
              <button type="button" onClick={() => removeArrayItem("productos", i)} className="text-red-500">X</button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem("productos", { nombre: "", imagen: "", descripcion: "" })} className="text-blue-600">+ Añadir producto</button>
        </div>

        <div>
          <label className="font-bold">Galería de fotos</label>
          {form.galeria.map((foto, i) => (
            <div key={i} className="flex gap-2 mb-2 items-center">
              <input
                value={foto}
                onChange={e => handleArrayChange(e, i, "galeria")}
                placeholder={`URL foto ${i + 1}`}
                className="w-full border p-2 rounded"
              />
              {/* Subida de imagen de galería */}
              <input
                type="file"
                accept="image/*"
                onChange={e => handleGaleriaUpload(e, i)}
                className="border p-2 rounded"
              />
              {foto && foto.startsWith("/uploads/") && (
                <img src={foto} alt={`Foto galería ${i + 1}`} className="w-16 h-16 object-cover" />
              )}
              <button type="button" onClick={() => removeArrayItem("galeria", i)} className="text-red-500">X</button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem("galeria", "")} className="text-blue-600">+ Añadir foto</button>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Crear</button>
      </form>
    </div>
  );
}