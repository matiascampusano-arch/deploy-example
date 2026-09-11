# Actividad práctica — Webinar 2, Sprint 15 (TypeScript)

Proyecto de apoyo para la actividad "Protege tu app y sobrevive a un F5 (con TypeScript)" del Webinar 2. Es **continuación directa** del proyecto `actividad-login-ts` del Webinar 1: mismo backend, mismo front end de partida, al que hoy se le agrega sesión persistente y rutas protegidas.

Para el guion completo, paso a paso, con el código exacto para cada momento de la actividad, ver **`GUIA_PASO_A_PASO.md`**.

## Estructura

```
actividad-rutas-protegidas-ts/
├── GUIA_PASO_A_PASO.md      <- guion para el instructor, con el código de cada paso
├── backend/                 <- API Express + TypeScript con persistencia en MongoDB
│   └── src/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       └── server.ts
└── frontend/                <- proyecto React + TypeScript (Vite), partiendo de la solución del Webinar 1
    ├── src/
    │   ├── types/auth.ts           (Paso 1 — agregar isLoading a AuthContextType)
    │   ├── context/AuthContext.tsx (Paso 2 — estado isLoading + useEffect de restauración)
    │   ├── routes/Guards.tsx       (Paso 3 — NO existe todavía: se crea desde cero en vivo)
    │   ├── App.tsx                 (Paso 4 — aplicar los guardas a las rutas)
    │   ├── services/auth.ts        (ya completo, del Webinar 1)
    │   ├── hooks/useAuth.ts        (ya completo, del Webinar 1)
    │   └── pages/                  (ya completas, del Webinar 1)
    └── solucion/                <- versión resuelta de los 4 archivos de la actividad,
                                     por si algo sale mal en vivo (no se usa para correr la app)
```

## Cómo correrlo

Necesitás dos terminales abiertas en paralelo (o dos pestañas), una para el backend y otra para el front end.

**1) Backend (API de autenticación de práctica) — puerto 3000**

Creá `backend/.env` a partir de `backend/.env.example` y completá `MONGODB_URI`
con la cadena de conexión de MongoDB Atlas. El usuario de Atlas necesita permisos
de lectura y escritura, y tu IP debe estar permitida en Network Access.

```bash
cd backend
npm install
npm run dev
```

Vas a ver: `API de autenticación de práctica escuchando en http://localhost:3000`.

**2) Frontend (React + TypeScript) — puerto 5173**

```bash
cd frontend
npm install
npm run dev
```

Abrí `http://localhost:5173` en el navegador. Como en el Webinar 1, `npm run dev` funciona **aunque haya errores de tipos** — Vite no bloquea el dev server por eso.

## Punto de partida: cero errores de tipos

A diferencia del Webinar 1, este proyecto **arranca limpio** (`npm run type-check` da cero errores). Eso es intencional: hoy no se corrigen errores preexistentes, se agrega una funcionalidad nueva (`isLoading`) y, al agregarla a `AuthContextType`, el compilador va marcando en cascada todos los lugares que faltan actualizar — el mismo "guiado por el compilador" del Webinar 1, pero esta vez provocado por el grupo en vivo en el Paso 1, no heredado del archivo inicial.

## Ver los errores de tipos en vivo

```bash
cd frontend
npm run type-check
```

Correlo justo después del Paso 1 (agregar `isLoading` a la interfaz) para mostrar el primer error en cascada, y de nuevo después de cada paso siguiente.

## Criterio de éxito: el "test del F5"

El objetivo central de la actividad no es solo "que compile", sino que la sesión sobreviva a un refresh:

1. Iniciá sesión en `/login`.
2. Recargá la página (F5).
3. **No** deberías caer en `/login` — deberías seguir viendo `/` con la sesión activa.

Probá también el camino inverso: con sesión activa, escribí `/login` en la barra de direcciones a mano — deberías ser redirigido a `/` automáticamente (eso es lo que hace `PublicRoute`).

## Si algo sale mal en vivo

La carpeta `frontend/solucion/` tiene la versión completa y tipada de los archivos que se editan o crean durante la actividad (`types-auth.ts`, `context-AuthContext.tsx`, `routes-Guards.tsx`, `App.tsx`). Son solo para copiar/pegar de emergencia — no forman parte del proyecto que corre (no están dentro de `src/`).

## Notas

- Los usuarios se guardan en la colección `users` de MongoDB y sobreviven a los reinicios del backend.
- Este proyecto asume que se llega desde el Webinar 1 con `services/auth.ts` y `hooks/useAuth.ts` ya resueltos — si algún estudiante no terminó esa actividad, puede partir directamente de este proyecto (esos archivos ya vienen completos acá).
- El repaso de Git que cierra el Webinar 2 es un bloque aparte, sin código de práctica asociado a este proyecto.
