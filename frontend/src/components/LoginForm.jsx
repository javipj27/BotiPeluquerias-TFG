import { useState } from "react";

export default function LoginForm({ onLogin, error, theme }) {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ emailOrUsername, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={`block font-bold mb-1 ${theme === "dark" ? "text-gray-900" : "text-white"}`}>Email o nombre de usuario</label>
        <input
          type="text"
          value={emailOrUsername}
          onChange={e => setEmailOrUsername(e.target.value)}
          className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${theme === "dark" ? "bg-white text-gray-900 placeholder-gray-500" : "bg-gray-900 text-white placeholder-gray-400"}`}
          placeholder="Ingresa tu email o nombre de usuario"
          required
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
        Iniciar Sesión
      </button>
      {error && <p className="text-error text-center mb-4">{error}</p>}
    </form>
  );
}