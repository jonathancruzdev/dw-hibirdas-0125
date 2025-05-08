import usersRouter from "./usersRouter.js";
import productRouter from "./productsRouter.js";

function routerAPI(app){
    // Definimos las rutas
    app.use('/api/users', usersRouter);
    app.use('/api/products', productRouter);
}

export default routerAPI;