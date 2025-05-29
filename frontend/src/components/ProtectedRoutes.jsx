import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export function AdminRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const roles = JSON.parse(localStorage.getItem("roles") || "[]");
  return isAuthenticated && roles.includes("ROLE_ADMIN") ? children : <Navigate to="/" />;
}