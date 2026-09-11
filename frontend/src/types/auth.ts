// Este archivo es el mismo del Webinar 1 (registro, login, "¿quién soy?").
// PASO 1 (resuelto) — se agrega isLoading.

export interface User {
  _id: string;
  email: string;
}

export interface LoginResult {
  token: string;
  user: User;
}

export interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
