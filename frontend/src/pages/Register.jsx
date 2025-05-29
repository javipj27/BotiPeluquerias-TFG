import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import ThemeToggle from "../components/ThemeToggle";

export default function Register({ theme, setTheme }) {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async ({ email, username, nombre, telefono, password }) => {
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
      localStorage.setItem("username", data.username || email);
      localStorage.setItem("token", data.token);
      localStorage.setItem("roles", JSON.stringify(data.roles));
      localStorage.setItem("email", data.email || "");
      localStorage.setItem("telefono", data.telefono || "");
      window.dispatchEvent(new Event("authChanged"));
      navigate("/");
    } catch (err) {
      setError("Error de red o del servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className={`p-8 rounded-2xl shadow-2xl max-w-md w-full animate-fade-in flex flex-col
        ${theme === "dark" ? "bg-white/95 text-gray-900" : "bg-gray-900 text-white"}`}>
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <h2 className="text-3xl font-extrabold mb-6 text-center text--700">Registro</h2>
        <RegisterForm onRegister={handleRegister} error={error} theme={theme} />
        <p className={`mt-4 text-center ${theme === "dark" ? "text-gray-900" : "text-white"}`}>
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
}