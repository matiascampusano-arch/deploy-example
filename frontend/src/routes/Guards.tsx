// PASO 3 (resuelto)
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null; // PASO 6 (bonus): reemplazar por un loader
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null; // PASO 6 (bonus): reemplazar por un loader
  }

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}
