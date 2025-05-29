import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Peluquerias from "./pages/Peluquerias";
import DetallePeluqueria from "./pages/DetallePeluqueria";
import Carrito from "./pages/Carrito";
import CrearPeluqueria from "./pages/CrearPeluqueria";
import AdminPeluquerias from "./pages/AdminPeluquerias";
import './index.css';

// Ruta privada para usuarios autenticados
function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? children : <Navigate to="/login" />;
}

// Ruta privada solo para administradores
function AdminRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const roles = JSON.parse(localStorage.getItem("roles") || "[]");
  return isAuthenticated && roles.includes("ROLE_ADMIN") ? children : <Navigate to="/" />;
}

function Navbar({ carritoCount, isAuthenticated, isAdmin, onLogout, theme, setTheme }) {
  const location = useLocation();

  // Ocultar enlaces en login y register según la ruta
  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div>
        <a href="/" className="font-bold text-xl text-blue-700">BotiPeluquerías</a>
      </div>
      <div className="flex items-center gap-4">
        {!isLogin && !isRegister && (
          <a href="/peluquerias" className="text-blue-700 hover:underline">Peluquerías</a>
        )}
        {isAdmin && !isLogin && !isRegister && (
          <a href="/admin/peluquerias" className="text-blue-700 hover:underline">
            Administración
          </a>
        )}
        {isAuthenticated && !isLogin && !isRegister && (
          <>
            <Link to="/carrito" className="relative">
              <button className="btn btn-ghost btn-circle">
                {/* Icono carrito moderno */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7 text-blue-700"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.272 1.017M7.5 14.25a3 3 0 106 0m-6 0h6m-6 0L5.25 6.75m6 7.5l1.5-7.5m-7.5 0h16.5l-1.5 7.5H7.5z" />
                </svg>
                {carritoCount > 0 && (
                  <span className="badge badge-error badge-sm absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
                    {carritoCount}
                  </span>
                )}
              </button>
            </Link>
            
            {/* DaisyUI Theme Controller con toggle e iconos */}
            <label className="flex cursor-pointer gap-2">
              {/* Icono sol */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4B5563"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
              <input
                type="checkbox"
                className="toggle theme-controller"
                checked={theme === "dark"}
                onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Cambiar tema"
                readOnly
              />
              {/* Icono luna */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4B5563"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </label>
            {/* Avatar con dropdown DaisyUI */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="avatar cursor-pointer">
                <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                  <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" alt="avatar" />
                </div>
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm">
                <li><a href="#">Perfil</a></li>
                <li><a href="#" onClick={onLogout}>Cerrar sesión</a></li>
              </ul>
            </div>
          </>
        )}
        {!isAuthenticated && !isLogin && (
          <a href="/login" className="text-blue-700 hover:underline">Iniciar sesión</a>
        )}
        {!isAuthenticated && !isRegister && (
          <a href="/register" className="text-blue-700 hover:underline">Registrarse</a>
        )}
      </div>
    </nav>
  );
}

export default function App() {

  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(theme === "dark" ? "dark" : "light");
  localStorage.setItem("theme", theme);
}, [theme]);
  // Inicializa el carrito desde localStorage 
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true");
  const [isAdmin, setIsAdmin] = useState(
    JSON.parse(localStorage.getItem("roles") || "[]").includes("ROLE_ADMIN")
  );

  // Sincroniza el carrito con localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    const syncAuth = () => {
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
      setIsAdmin(JSON.parse(localStorage.getItem("roles") || "[]").includes("ROLE_ADMIN"));
      // Sincroniza el carrito si cambia en otra pestaña
      const guardado = localStorage.getItem("carrito");
      setCarrito(guardado ? JSON.parse(guardado) : []);
    };
    window.addEventListener("storage", syncAuth);
    window.addEventListener("authChanged", syncAuth);
    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("authChanged", syncAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    localStorage.removeItem("carrito");
    setIsAuthenticated(false);
    setIsAdmin(false);
    setCarrito([]);
    window.dispatchEvent(new Event("authChanged"));
    window.location.href = "/login";
  };

  return (
    <Router>
      <div className={`min-h-screen ${theme === "dark" ? "bg-peluqueria-oscura" : "bg-peluqueria-clara"}`}>
        <div
        className={`fixed inset-0 w-full h-full z-0 pointer-events-none ${
          theme === "dark"
            ? "bg-black/70"
            : "bg-white/70"
        }`}
        aria-hidden="true"
      />
            <div className="relative z-10">

        <Navbar
          carritoCount={carrito.length}
          isAuthenticated={isAuthenticated}
          isAdmin={isAdmin}
          onLogout={handleLogout}
          theme={theme}
          setTheme={setTheme}
        />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/peluquerias"
            element={
              <PrivateRoute>
                <Peluquerias />
              </PrivateRoute>
            }
          />
          <Route
            path="/peluqueria/:id"
            element={
              <PrivateRoute>
                <DetallePeluqueria setCarrito={setCarrito} />
              </PrivateRoute>
            }
          />
          <Route
            path="/carrito"
            element={
              <PrivateRoute>
                <Carrito carrito={carrito} setCarrito={setCarrito} />
              </PrivateRoute>
            }
          />
          <Route
            path="/crear-peluqueria"
            element={
              <PrivateRoute>
                <CrearPeluqueria />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/peluquerias"
            element={
              <AdminRoute>
                <AdminPeluquerias />
              </AdminRoute>
            }
          />
        </Routes>
      </div>
      </div>
    </Router>
  );
}