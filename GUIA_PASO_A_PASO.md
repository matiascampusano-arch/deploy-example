# Guía paso a paso — Actividad "Protege tu app y sobrevive a un F5 (con TypeScript)"

Webinar 2, Sprint 15 · Duración de la actividad: 20 minutos · Continuación directa del proyecto del Webinar 1. Ver también la diapositiva de la actividad y la de "Los tipos que se suman hoy" en el PPTX.

Antes de arrancar la actividad: backend corriendo en `:3000` (`cd backend && npm start`) y frontend corriendo en `:5173` (`cd frontend && npm run dev`). Sugerencia: corré `npm run type-check` en `frontend/` una vez al principio y mostrá que da **cero errores** — ese es justo el punto de partida distinto al Webinar 1 ("hoy no arreglamos errores que ya estaban, los vamos a provocar nosotros mismos en el Paso 1 y después los vamos resolviendo").

Cada paso de abajo corresponde uno a uno con el paso del mismo número en la diapositiva de la actividad.

---

## Paso 1 — Agregar `isLoading` a `AuthContextType`

Archivo: `frontend/src/types/auth.ts`. Al abrirlo van a ver `currentUser`, `isAuthenticated`, `login` y `logout` — exactamente lo que ya tenían al final del Webinar 1 — con un comentario marcando dónde va el campo nuevo.

Cambio:

```ts
export interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
```

**Verificación en vivo:** corré `npm run type-check`. Va a aparecer el primer error en cascada:

```
src/context/AuthContext.tsx(46,9): error TS2741: Property 'isLoading' is missing in type
'{ currentUser: User | null; isAuthenticated: boolean; login: (email: string, password: string)
=> Promise<void>; logout: () => void; }' but required in type 'AuthContextType'.
```

Explicación breve para el grupo: esto es el compilador señalando, sin que nadie tenga que buscarlo a mano, el único lugar que construye un objeto `AuthContextType` — el `value` del `AuthProvider`. Ese es exactamente el problema que resuelve el Paso 2.

---

## Paso 2 — Estado `isLoading` y restauración de sesión en `AuthProvider`

Archivo: `frontend/src/context/AuthContext.tsx`. Al abrirlo van a ver un comentario con el código sugerido para este paso — la idea es transcribirlo (o discutirlo línea por línea) en el archivo real.

Agregá el import de `useEffect` y de `getCurrentUser`:

```ts
import { createContext, useEffect, useState, type ReactNode } from "react";
import type * as React from "react";
import { getCurrentUser, loginUser } from "../services/auth";
```

Dentro de `AuthProvider`, agregá el estado y el efecto (antes de `login`/`logout`):

```tsx
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
```

Y agregá el campo al `value`:

```tsx
const value: AuthContextType = {
  currentUser,
  isAuthenticated: Boolean(currentUser),
  isLoading,
  login,
  logout,
};
```

**Verificación en vivo:** `npm run type-check` debería volver a dar **cero errores** — el archivo ya usa `isLoading` en todos los lugares donde el tipo lo exige, y todavía nadie más en el proyecto lee ese campo, así que no hay nada más que marcar. Puede sonar contraintuitivo ("¿ya está, no queda nada más?") — el punto es que **todavía no armamos los guardas de ruta**, así que `isLoading` existe pero nadie lo usa. Eso cambia en el Paso 3.

Explicación breve: `getCurrentUser(token)` reutiliza exactamente la misma función tipada del Webinar 1 (la que ya usaba `useAuth` para el "¿quién soy?" después del login) — hoy simplemente se llama también al montar la app, no solo después de iniciar sesión.

---

## Paso 3 — Crear `ProtectedRoute` y `PublicRoute` en `routes/Guards.tsx`

Este archivo **no existe todavía** — es el único paso de la actividad que arranca de una carpeta/archivo vacíos en vez de un TODO. Creá `frontend/src/routes/Guards.tsx`:

```tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null; // Paso 6 (bonus): reemplazar por un loader
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null; // Paso 6 (bonus): reemplazar por un loader
  }

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}
```

Punto para remarcar: `useAuth()` ya devuelve `isLoading` con el tipo correcto sin tocar `hooks/useAuth.ts` — es la misma función del Webinar 1, y TypeScript infiere el nuevo campo automáticamente porque viene de `AuthContextType`. `<Outlet />` es de `react-router-dom`: renderiza la ruta hija cuando el guarda decide dejar pasar.

**Verificación en vivo:** `npm run type-check` sigue en cero errores — este archivo es nuevo y no rompe nada porque todavía no lo importa nadie. Eso se conecta en el Paso 4.

---

## Paso 4 — Aplicar los guardas en `App.tsx`

Archivo: `frontend/src/App.tsx`. Tiene comentarios marcando exactamente qué agrupar y cómo.

Agregá el import:

```tsx
import { ProtectedRoute, PublicRoute } from "./routes/Guards";
```

Y reorganizá las rutas:

```tsx
export default function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
```

**Verificación en vivo:** `npm run type-check` — cero errores. A partir de acá la app ya tiene rutas protegidas de verdad; toca probarlas en el navegador.

---

## Paso 5 — El "test del F5" (y el camino inverso)

Sin escribir código nuevo, probá en el navegador:

1. Andá a `/login` e iniciá sesión con un usuario ya registrado (o registrá uno nuevo primero en `/registro`).
2. Confirmá que caíste en `/` viendo el saludo.
3. **Recargá la página (F5).** Esto es lo que hoy se prueba de verdad: sin el Paso 2, `currentUser` arrancaría en `null` al recargar y `ProtectedRoute` expulsaría a `/login` aunque el token siga válido en `localStorage`. Con `isLoading` esperando a que `getCurrentUser` responda, eso no pasa.
4. Camino inverso: con la sesión todavía activa, escribí `/login` a mano en la barra de direcciones y confirmá que `PublicRoute` te manda de vuelta a `/` en lugar de mostrarte el formulario.

Si el F5 sí expulsa a `/login`: el error más común es que `ProtectedRoute`/`PublicRoute` no estén esperando a `isLoading` (revisá que el `if (isLoading) return null;` esté antes del `return isAuthenticated ? ... : ...`).

---

## Paso 6 (bonus) — Loader en vez de pantalla en blanco

Mientras `isLoading` es `true`, ambos guardas devuelven `null` — eso funciona pero se ve como una pantalla en blanco por una fracción de segundo. Si sobra tiempo, reemplazá el `return null;` de los dos guardas por un componente simple y tipado:

```tsx
if (isLoading) {
  return <p>Cargando…</p>;
}
```

Punto para cerrar: no hace falta ningún tipo nuevo para esto — `<p>Cargando…</p>` es JSX válido en el mismo lugar donde antes había `null`, porque el tipo de retorno inferido de estos componentes ya admite `JSX.Element | null`.

---

## Resumen para el debrief final

Al terminar los 6 pasos, `npm run type-check` en `frontend/` debería devolver cero errores, y la app debería sobrevivir al F5 con la sesión activa y redirigir correctamente en ambos sentidos (sin sesión → `/login`; con sesión → afuera de `/login`). Esto conecta directo con la diapositiva de la actividad: el criterio de éxito no es "que compile", es "que sobreviva al F5" — compilar sin errores es la señal de que todos los lugares que dependían de `isLoading` quedaron actualizados, no el objetivo en sí mismo.
