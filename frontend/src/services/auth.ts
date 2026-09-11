// Servicio de autenticación — conecta el front end con la API de práctica
// (ver carpeta /backend). Corré el backend en el puerto 3000 antes de probar esto.

import type { LoginResult, User } from "../types/auth";

const AUTH_BASE_URL = "https://deploy-example-tau-coral.vercel.app";

// Ayudante propio: las respuestas de esta API tienen otra forma que las de tu
// propia API, así que vale la pena tener su propia función para llamarla.
async function authRequest(path: string, body: Record<string, string>) {
  const response = await fetch(`${AUTH_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || "Ocurrió un error inesperado.");
  }

  return response.json();
}

export async function getCurrentUser(token: string): Promise<User> {
  const response = await fetch(`${AUTH_BASE_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("No se pudo verificar la sesión.");
  }

  return response.json();
}

// Del Webinar 1 — ya funciona, no hace falta tocar nada acá hoy.
export async function registerUser(
  email: string,
  password: string,
): Promise<User> {
  const { user } = await authRequest("/signup", { email, password });
  return user;
}

// Del Webinar 1 — ya funciona, no hace falta tocar nada acá hoy.
export async function loginUser(
  email: string,
  password: string,
): Promise<LoginResult> {
  const { token } = await authRequest("/signin", { email, password });
  const user = await getCurrentUser(token);
  return { token, user };
}
