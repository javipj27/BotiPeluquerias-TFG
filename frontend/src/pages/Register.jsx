import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username, nombre, telefono }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al registrar");
        return;
      }
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", username);
      localStorage.setItem("token", data.token);
      localStorage.setItem("roles", JSON.stringify(data.roles));
      window.dispatchEvent(new Event("authChanged"));
      navigate("/");
    } catch (err) {
      setError("Error de red o del servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white/95 p-8 rounded-2xl shadow-2xl max-w-md w-full animate-fade-in text-gray-900">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">Registro</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block font-bold mb-1 text-gray-900">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg text-gray-900"
              placeholder="Ingresa tu email"
              required
            />
          </div>
          <div>
            <label className="block font-bold mb-1 text-gray-900">Nombre de usuario</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full p-2 border rounded-lg text-gray-900"
              placeholder="Nombre de usuario"
              required
            />
          </div>
          <div>
            <label className="block font-bold mb-1 text-gray-900">Nombre real</label>
            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              className="w-full p-2 border rounded-lg text-gray-900"
              placeholder="Tu nombre"
              required
            />
          </div>
          <div>
            <label className="block font-bold mb-1 text-gray-900">Teléfono (opcional)</label>
            <input
              type="text"
              value={telefono}
              onChange={e => setTelefono(e.target.value)}
              className="w-full p-2 border rounded-lg text-gray-900"
              placeholder="Teléfono"
            />
          </div>
          <div>
            <label className="block font-bold mb-1 text-gray-900">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg text-gray-900"
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
        </form>
        <p className="mt-4 text-center text-gray-900">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
}