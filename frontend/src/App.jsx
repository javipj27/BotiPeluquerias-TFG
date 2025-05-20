import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Peluquerias from "./pages/Peluquerias";
import DetallePeluqueria from "./pages/DetallePeluqueria";
import Login from "./pages/Login";
import Carrito from "./pages/Carrito";
import { useState, useEffect } from "react";

function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function Navbar({ carritoCount }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    const storedUsername = localStorage.getItem("username");
    setIsAuthenticated(authStatus);
    setUsername(storedUsername || "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-white shadow p-4 flex gap-4 justify-between items-center">
      <div className="flex gap-4">
        <Link to="/" className="font-bold text-blue-600 hover:text-blue-800 transition">
          Inicio
        </Link>
        <Link to="/peluquerias" className="text-gray-700 hover:text-blue-600 transition">
          Peluquerías
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        <div className="relative">
          <Link to="/carrito" className="text-gray-700 hover:text-blue-600 transition">
            🛒
          </Link>
          {carritoCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {carritoCount}
            </span>
          )}
        </div>
        {isAuthenticated ? (
          <>
            <span className="text-gray-700 font-bold">Hola, {username}</span>
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-red-600 transition"
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <Link to="/login" className="text-gray-700 hover:text-blue-600 transition">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  const [carrito, setCarrito] = useState([]);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
        <Navbar carritoCount={carrito.length} />
        <Routes>
          <Route path="/login" element={<Login />} />
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
                <DetallePeluqueria setCarrito={(producto) => setCarrito([...carrito, producto])} />
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
        </Routes>
      </div>
    </Router>
  );
}