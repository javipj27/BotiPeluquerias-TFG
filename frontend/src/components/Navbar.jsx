import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ carritoCount, isAuthenticated, isAdmin, onLogout, theme, setTheme, avatar }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Ocultar enlaces en login y register según la ruta
  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";

  return (
    <nav
      className={`backdrop-blur-md shadow-lg px-2 sm:px-8 py-3 flex flex-wrap justify-between items-center transition-all
        rounded-2xl w-[99%] sm:w-[97%] left-0 right-0 top-6 mx-auto
        ${theme === "dark"
          ? "bg-white text-gray-900"
          : "bg-gray-900 text-white"
        }`}
      style={{ position: "relative", zIndex: 20 }}
    >
      {/* Logo y nombre */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
        <span className="text-3xl animate-spin-slow" role="img" aria-label="Barber pole">💈</span>
        <a href="/" className="font-extrabold text-2xl tracking-tight drop-shadow">
          BotiPeluquerías
        </a>
        <span className="text-3xl animate-spin-slow" role="img" aria-label="Barber pole">💈</span>
      </div>

      {/* Menú hamburguesa solo en móvil */}
      <div className="sm:hidden">
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* Dropdown DaisyUI */}
        {menuOpen && (
          <ul className={`absolute right-2 top-16 menu menu-compact dropdown-content mt-2 p-2 shadow bg-base-100 rounded-box w-52 z-50 ${theme === "dark" ? "text-gray-900" : "text-white bg-gray-900"}`}>
            {!isLogin && !isRegister && (
              <li>
                <a href="/peluquerias" className="font-semibold">Peluquerías</a>
              </li>
            )}
            {isAuthenticated && !isLogin && !isRegister && (
              <>
                <li>
                  <Link to="/carrito">Carrito {carritoCount > 0 && <span className="badge badge-error">{carritoCount}</span>}</Link>
                </li>
                <li>
                  <a href="/perfil">Perfil</a>
                </li>
                {isAdmin && (
                  <li>
                    <a href="/admin/peluquerias">Administración</a>
                  </li>
                )}
                <li>
                  <a href="#" onClick={onLogout}>Cerrar sesión</a>
                </li>
              </>
            )}
            {!isAuthenticated && !isLogin && (
              <li>
                <a href="/login" className="font-semibold">Iniciar sesión</a>
              </li>
            )}
            {!isAuthenticated && !isRegister && (
              <li>
                <a href="/register" className="font-semibold">Registrarse</a>
              </li>
            )}
            <li>
              {/* Tema toggle */}
              <label className="flex cursor-pointer gap-2 items-center mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke={theme === "dark" ? "#1f2937" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
                <input
                  type="checkbox"
                  className={`toggle theme-controller border-2 ${theme === "dark" ? "border-blue-700" : "border-gray-300"}`}
                  style={{
                    accentColor: theme === "dark" ? "#1f2937" : "#fbbf24",
                  }}
                  checked={theme === "dark"}
                  onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label="Cambiar tema"
                  readOnly
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke={theme === "dark" ? "#1f2937" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </label>
            </li>
          </ul>
        )}
      </div>

      {/* Menú normal en desktop/tablet */}
      <div className="hidden sm:flex items-center gap-4">
        {!isLogin && !isRegister && (
          <a
            href="/peluquerias"
            className={`${theme === "dark" ? "text-gray-900" : "text-white"} font-semibold flex items-center gap-1`}
            style={{ textDecoration: "none" }}
          >
            <span className="hidden sm:inline">Peluquerías</span>
          </a>
        )}

        {isAuthenticated && !isLogin && !isRegister && (
          <>
            <Link to="/carrito" className="relative group">
              <button
                className={`btn btn-ghost btn-circle transition-transform duration-200 group-hover:scale-110 ${
                  theme === "dark" ? "ring-2 ring-white" : ""
                }`}
                style={{
                  background: theme === "dark"
                    ? "linear-gradient(90deg, #e0e7ff 0%, #bae6fd 100%)"
                    : "linear-gradient(90deg, #1e293b 0%, #0ea5e9 100%)"
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke={theme === "dark" ? "#1f2937" : "white"}
                  className={`w-7 h-7 ${theme === "dark" ? "text-gray-900" : "text-blue-700"}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.272 1.017M7.5 14.25a3 3 0 106 0m-6 0h6m-6 0L5.25 6.75m6 7.5l1.5-7.5m-7.5 0h16.5l-1.5 7.5H7.5z" />
                </svg>
                {carritoCount > 0 && (
                  <span className="badge badge-error badge-sm absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
                    {carritoCount}
                  </span>
                )}
              </button>
              <span className="absolute left-1/2 -bottom-7 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-gray-800 text-white text-xs rounded px-2 py-1 pointer-events-none z-20">
                Ver carrito
              </span>
            </Link>
            {/* DaisyUI Theme Controller con toggle e iconos */}
            <label className="flex cursor-pointer gap-2 items-center">
              {/* Icono sol */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke={theme === "dark" ? "#1f2937" : "white"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
              <input
                type="checkbox"
                className={`toggle theme-controller border-2 ${theme === "dark" ? "border-blue-700" : "border-gray-300"}`}
                style={{
                  accentColor: theme === "dark" ? "#1f2937" : "#fbbf24",
                }}
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
                stroke={theme === "dark" ? "#1f2937" : "white"}
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
                  <img src={avatar} alt="avatar" onError={e => { e.target.onerror = null;      e.target.src = "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp";
  }} />
                </div>
              </div>
              <ul tabIndex={0} className="dropdown-content text-black dark:text-white menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm">
                <li><a href="/perfil">Perfil</a></li>
                <li><a href="/historial-compras">Historial de compras</a></li>
                <li><a href="/historial-citas">Historial de citas</a></li>
                {isAdmin && (
                  <li>
                    <a href="/admin/peluquerias">Administración</a>
                  </li>
                )}
                <li><a href="#" onClick={onLogout}>Cerrar sesión</a></li>
              </ul>
            </div>
          </>
        )}
        {!isAuthenticated && !isLogin && (
          <a href="/login" className={`${theme === "dark" ? "text-blue-700" : "text-blue-700"} font-semibold hover:underline`}>Iniciar sesión</a>
        )}
        {!isAuthenticated && !isRegister && (
          <a href="/register" className={`${theme === "dark" ? "text-blue-700" : "text-blue-700"} font-semibold hover:underline`}>Registrarse</a>
        )}
      </div>
    </nav>
  );
}