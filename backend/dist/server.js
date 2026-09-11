"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = require("./app.js");
const config_js_1 = require("./config.js");
const database_js_1 = require("./database.js");
async function startServer() {
    await (0, database_js_1.connectDatabase)();
    app_js_1.app.listen(config_js_1.PORT, () => {
        console.log(`API de autenticación de práctica escuchando en http://localhost:${config_js_1.PORT}`);
        console.log(`CORS habilitado para: ${config_js_1.FRONTEND_ORIGIN}`);
    });
}
startServer().catch((error) => {
    console.error("No se pudo iniciar el servidor:", error);
    process.exit(1);
});
