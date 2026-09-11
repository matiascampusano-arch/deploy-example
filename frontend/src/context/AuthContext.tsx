import { createContext, useEffect, useState, type ReactNode } from "react";
import type * as React from "react";
import { getCurrentUser, loginUser } from "../services/auth";
import type { AuthContextType, User } from "../types/auth";

const TOKEN_KEY = "sprint15-jwt";

// Del Webinar 1 — ya funciona, no hace falta tocar esta línea hoy.
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // PASO 2 (resuelto) — estado de carga + restaurar la sesión al montar.
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setIsLoading(false);
      return;
    }

    getCurrentUser(token)
      .then(setCurrentUser)
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setIsLoading(false));
  }, []);

  async function login(email: string, password: string) {
    const { token, user } = await loginUser(email, password);
    localStorage.setItem(TOKEN_KEY, token);
    setCurrentUser(user);
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setCurrentUser(null);
  }

  const value: AuthContextType = {
    currentUser,
    isAuthenticated: Boolean(currentUser),
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
