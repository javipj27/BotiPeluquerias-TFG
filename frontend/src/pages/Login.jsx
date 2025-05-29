import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailOrUsername, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error de autenticación");
        return;
      }
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", emailOrUsername);
      localStorage.setItem("token", data.token);
      localStorage.setItem("roles", JSON.stringify(data.roles)); 
      window.dispatchEvent(new Event("authChanged"));

      navigate("/");
    } catch (err) {
      setError("Error de red o del servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white/95 p-8 rounded-2xl shadow-2xl max-w-md w-full animate-fade-in text-gray-900">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">Iniciar Sesión</h2>
        {error && <p className="text-error text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block font-bold mb-1 text-gray-900">Email o nombre de usuario</label>
            <input
              type="text"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
              placeholder="Ingresa tu email o nombre de usuario"
              required
            />
          </div>
          <div>
            <label className="block font-bold mb-1 text-gray-900">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-orange-400 via-green-400 to-blue-500 text-white font-bold shadow-lg hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Iniciar Sesión
          </button>
        </form>
        <p className="mt-4 text-center text-gray-900">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-accent hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}