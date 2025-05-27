import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Peluquerias from "./pages/Peluquerias";
import DetallePeluqueria from "./pages/DetallePeluqueria";
import Carrito from "./pages/Carrito";
import CrearPeluqueria from "./pages/CrearPeluqueria";
import AdminPeluquerias from "./pages/AdminPeluquerias";

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

function Navbar({ carritoCount, isAuthenticated, isAdmin, onLogout }) {
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
            <a href="/carrito" className="text-blue-700 hover:underline">
              Carrito {carritoCount > 0 && <span>({carritoCount})</span>}
            </a>
            <button
              onClick={onLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Cerrar sesión
            </button>
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
  const [carrito, setCarrito] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true");
  const [isAdmin, setIsAdmin] = useState(
    JSON.parse(localStorage.getItem("roles") || "[]").includes("ROLE_ADMIN")
  );

  useEffect(() => {
    const syncAuth = () => {
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
      setIsAdmin(JSON.parse(localStorage.getItem("roles") || "[]").includes("ROLE_ADMIN"));
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
    setIsAuthenticated(false);
    setIsAdmin(false);
    window.dispatchEvent(new Event("authChanged"));
    window.location.href = "/login";
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
        <Navbar
          carritoCount={carrito.length}
          isAuthenticated={isAuthenticated}
          isAdmin={isAdmin}
          onLogout={handleLogout}
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
    </Router>
  );
}