import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Peluquerias from "./pages/Peluquerias";
import DetallePeluqueria from "./pages/DetallePeluqueria";
import Carrito from "./pages/Carrito";
import CrearPeluqueria from "./pages/CrearPeluqueria";
import AdminPeluquerias from "./pages/AdminPeluquerias";
import Perfil from "./pages/Perfil";
import Layout from "./components/Layout";
import { PrivateRoute, AdminRoute } from "./components/ProtectedRoutes";
import './index.css';
import HistorialCompras from "./pages/HistorialCompras";
import HistorialCitas from "./pages/HistorialCitas";

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
  const [avatar, setAvatar] = useState(() =>
    localStorage.getItem("fotoPerfil") ||
    "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
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
      setAvatar(
        localStorage.getItem("fotoPerfil") ||
        "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
      );
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
    localStorage.removeItem("fotoPerfil");
    setIsAuthenticated(false);
    setIsAdmin(false);
    setCarrito([]);
    setAvatar("https://img.daisyui.com/images/profile/demo/spiderperson@192.webp");
    window.dispatchEvent(new Event("authChanged"));
    window.location.href = "/login";
  };

  return (
    <Router>
      <Layout
        carrito={carrito}
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        onLogout={handleLogout}
        theme={theme}
        setTheme={setTheme}
        avatar={avatar}
      >
        <Routes>
          <Route path="/login" element={<Login theme={theme} setTheme={setTheme} />} />
          <Route path="/register" element={<Register theme={theme} setTheme={setTheme} />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home theme={theme} />
              </PrivateRoute>
            }
          />
          <Route
            path="/peluquerias"
            element={
              <PrivateRoute>
                <Peluquerias theme={theme} />
              </PrivateRoute>
            }
          />
          <Route
            path="/peluqueria/:id"
            element={
              <PrivateRoute>
                <DetallePeluqueria setCarrito={setCarrito} theme={theme} />
              </PrivateRoute>
            }
          />
          <Route
            path="/carrito"
            element={
              <PrivateRoute>
                <Carrito carrito={carrito} setCarrito={setCarrito} theme={theme} />
              </PrivateRoute>
            }
          />
          <Route
            path="/crear-peluqueria"
            element={
              <PrivateRoute>
                <CrearPeluqueria theme={theme} />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/peluquerias"
            element={
              <AdminRoute>
                <AdminPeluquerias theme={theme} />
              </AdminRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <PrivateRoute>
                <Perfil theme={theme} />
              </PrivateRoute>
            }
          />
          <Route
            path="/historial-compras"
            element={
              <PrivateRoute>
                <HistorialCompras theme={theme} />
              </PrivateRoute>
            }
          />
          <Route
            path="/historial-citas"
            element={
              <PrivateRoute>
                <HistorialCitas theme={theme} />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}