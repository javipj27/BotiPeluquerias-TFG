import Navbar from "./Navbar";


export default function Layout({ children, carrito, isAuthenticated, isAdmin, onLogout, theme, setTheme }) {
  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-peluqueria-oscura" : "bg-peluqueria-clara"}`}>
      <div
        className={`fixed inset-0 w-full h-full z-0 pointer-events-none ${
          theme === "dark" ? "bg-black/70" : "bg-white/70"
        }`}
        aria-hidden="true"
      />
      <div className="relative z-10">
        <Navbar
          carritoCount={carrito.length}
          isAuthenticated={isAuthenticated}
          isAdmin={isAdmin}
          onLogout={onLogout}
          theme={theme}
          setTheme={setTheme}
        />
        {children}
      </div>
    </div>
  );
}