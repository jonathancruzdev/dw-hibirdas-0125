import chalk from "chalk";
import express from "express";
import UsersManager from "./UsersManager.js";

const port = 5000;
const app = express();
app.use( express.json());
let count = 0;
const admUser = new UsersManager();

app.get('/', (request, response) => {
    count++;
    console.log(`Cliente ${count} conectado`);
    response.send('Hola desde Express');
})

const getUsers = async (request, response) =>{
    console.log('GET Users');
    const users = await admUser.getUsers();
    response.json({ msg: 'Ok', data: users });
}

// Rutas de la API
app.get('/api/users', getUsers);

app.get('/api/users/:id', async (request, response) =>{
    const id = request.params.id;
    const user = await admUser.getUserById(id);
    if( user ){
        response.json({ 
            msg: 'Ok', 
            data: [user] 
        });
    } else {
        response.status(404).json( { msg: 'Usuario no encontrado', data: [] });
    }
})

app.post('/api/users', async (request, response)=>{
    try {
        // Validar los DATOS 🚧
        const user = request.body;
        const id = await admUser.setUser(user);
        response.status(200).json({
            msg: 'Usuario Guardado',
            data: { id }
        })

    } catch (error) {
        console.error(error);
        response.status(500).json({
            msg: "Error del Servidor: No se pudo guardar el usuario"
        })
    }
});


app.listen(port, ()=>{
    console.log( chalk.green(`Servidor Web en el puerto ${port}`));
})
