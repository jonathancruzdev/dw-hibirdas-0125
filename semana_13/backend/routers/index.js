import usersRouter from "./usersRouter.js";
import productRouter from "./productsRouter.js";
import categoriaRouter from "./categoriaRouter.js";

function routerAPI(app){
    app.use('/api/users', usersRouter);
    app.use('/api/products', productRouter);
    app.use('/api/categoria', categoriaRouter);
}

export default routerAPI;