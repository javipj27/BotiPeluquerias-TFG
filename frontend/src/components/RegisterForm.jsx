import { useState } from "react";

export default function RegisterForm({ onRegister, error, theme }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, username, nombre, telefono, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={`block font-bold mb-1 ${theme === "dark" ? "text-gray-900" : "text-white"}`}>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${theme === "dark" ? "bg-white text-gray-900 placeholder-gray-500" : "bg-gray-900 text-white placeholder-gray-400"}`}
          placeholder="Ingresa tu email"
          required
        />
      </div>
      <div>
        <label className={`block font-bold mb-1 ${theme === "dark" ? "text-gray-900" : "text-white"}`}>Nombre de usuario</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${theme === "dark" ? "bg-white text-gray-900 placeholder-gray-500" : "bg-gray-900 text-white placeholder-gray-400"}`}
          placeholder="Nombre de usuario"
          required
        />
      </div>
      <div>
        <label className={`block font-bold mb-1 ${theme === "dark" ? "text-gray-900" : "text-white"}`}>Nombre real</label>
        <input
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${theme === "dark" ? "bg-white text-gray-900 placeholder-gray-500" : "bg-gray-900 text-white placeholder-gray-400"}`}
          placeholder="Tu nombre"
          required
        />
      </div>
      <div>
        <label className={`block font-bold mb-1 ${theme === "dark" ? "text-gray-900" : "text-white"}`}>Teléfono (opcional)</label>
        <input
          type="text"
          value={telefono}
          onChange={e => setTelefono(e.target.value)}
          className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${theme === "dark" ? "bg-white text-gray-900 placeholder-gray-500" : "bg-gray-900 text-white placeholder-gray-400"}`}
          placeholder="Teléfono"
        />
      </div>
      <div>
        <label className={`block font-bold mb-1 ${theme === "dark" ? "text-gray-900" : "text-white"}`}>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${theme === "dark" ? "bg-white text-gray-900 placeholder-gray-500" : "bg-gray-900 text-white placeholder-gray-400"}`}
          placeholder="Ingresa tu contraseña"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-orange-400 via-green-400 to-blue-500 text-white font-bold shadow-lg hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Registrarse
      </button>
      {error && <p className="text-error text-center mb-4">{error}</p>}
    </form>
  );
}