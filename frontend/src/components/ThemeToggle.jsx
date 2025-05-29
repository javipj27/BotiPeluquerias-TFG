import React from "react";

export default function ThemeToggle({ theme, setTheme }) {
  return (
    <label className="flex cursor-pointer gap-2 items-center justify-center mb-6">
      {/* Icono sol */}
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
      {/* Icono luna */}
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke={theme === "dark" ? "#1f2937" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </label>
  );
}