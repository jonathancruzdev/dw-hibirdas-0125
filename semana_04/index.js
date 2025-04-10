import express from "express";

import routerAPI from "./routers/index.js";
const port = 3000;
const app = express();
// Middleware
app.use( express.json() );

app.get('/', (request, response) =>{
    response.send('<h1> Home </h1>');
})

// Llamamos a el routerAPI
routerAPI(app);

app.listen( port, () => {
    console.info(`Servidor en el puerto ${port}`);
})