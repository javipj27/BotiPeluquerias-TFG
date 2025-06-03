import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import ThemeToggle from "../components/ThemeToggle";

export default function Login({ theme, setTheme }) {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async ({ emailOrUsername, password }) => {
    setError("");
    try {
      const res = await fetch("/api/login", {
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
      localStorage.setItem("username", data.username || emailOrUsername);
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
    <div className="min-h-screen flex items-center justify-center bg-transparent px-2 sm:px-0">
      <div
        className={`
    w-full
    max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl
    p-4 sm:p-8
    rounded-2xl shadow-2xl animate-fade-in flex flex-col
    ${theme === "dark" ? "bg-white/95 text-gray-900" : "bg-gray-900 text-white"}
  `}
      >
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-center text-white-700">
          Iniciar Sesión
        </h2>{" "}
        <LoginForm onLogin={handleLogin} error={error} theme={theme} />
        <p
          className={`
            mt-4 text-center text-sm sm:text-base md:text-lg
            ${theme === "dark" ? "text-gray-900" : "text-white"}
          `}
        >
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-accent hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}
