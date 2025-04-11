import express from "express";
import dotenv from "dotenv";

dotenv.config();
import routerAPI from "./routers/index.js";
const port = process.env.PORT;
const app = express();
// Middleware
app.use( express.json() );
// Directorio de acceso publico de archivo estaticos
app.use( express.static('public'));
app.get('/', (request, response) =>{
    response.send('<h1> Home </h1>');
})

// Llamamos a el routerAPI
routerAPI(app);

app.listen( port, () => {
    console.info(`Servidor en el puerto ${port}`);
})