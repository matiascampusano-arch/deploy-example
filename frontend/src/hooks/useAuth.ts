import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Del Webinar 1 — ya funciona, no hace falta tocar nada acá hoy.
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un <AuthProvider>.");
  }
  return context;
}
