import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";


dotenv.config();
import routerAPI from "./routers/index.js";
const port = process.env.PORT;
const uri_db = process.env.URI_DB;
const app = express();

// Conexión con DB
mongoose.connect(uri_db);
const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Ups tenemos un error con la conexión con la DB');
    console.error( {error});
});

db.once('open', () => {
    console.info('Conexión exitosa con la DB');
})


// Middleware
app.use( express.json() );
// Directorio de acceso publico de archivo estaticos
app.use( express.static('public'));

/* app.use( (req, res, next) => {
    console.log('Middleware...');
    next();
})
 */
app.get('/', (request, response) =>{
    response.send('<h1> Home </h1>');
})

// Llamamos a el routerAPI
routerAPI(app);

app.listen( port, () => {
    console.info(`Servidor en el puerto ${port}`);
})