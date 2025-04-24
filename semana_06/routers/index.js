import usersRouter from "./usersRouter.js";

function routerAPI (app){
    // Definimos las rutas
    app.use('/api/users', usersRouter);
    //app.use('/api/products', productsRouter);
}

export default routerAPI;