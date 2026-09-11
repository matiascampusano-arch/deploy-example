import { app } from "./app.js";
import { FRONTEND_ORIGIN, PORT } from "./config.js";
import { connectDatabase } from "./database.js";
async function startServer() {
    await connectDatabase();
    app.listen(PORT, () => {
        console.log(`API de autenticación de práctica escuchando en http://localhost:${PORT}`);
        console.log(`CORS habilitado para: ${FRONTEND_ORIGIN}`);
    });
}
startServer().catch((error) => {
    console.error("No se pudo iniciar el servidor:", error);
    process.exit(1);
});
