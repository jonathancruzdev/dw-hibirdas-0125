import chalk from "chalk";
import express from "express";
import UsersManager from "./UsersManager.js";

const port = 5000;
const app = express();
let count = 0;
const admUser = new UsersManager();
/* const users = [
    {id:1, name: "Julia"},
    {id:2, name: "Mateo"},
    {id:3, name: "Manuel"}
] */

app.get('/', (request, response) => {
    count++;
    console.log(`Cliente ${count} conectado`);
    response.send('Hola desde Express');
})

const getUsers = async (request, response) =>{
    console.log('GET Users');
    const users = await admUser.getUsers();
    response.json(users);
}


// Rutas de la API
app.get('/api/users', getUsers);

app.get('/api/users/:id', async (request, response) =>{
    const id = request.params.id;
   // console.log(id);
    const user = await admUser.getUserById(id)
    response.json(user);
})



app.listen(port, ()=>{
    console.log( chalk.green(`Servidor Web en el puerto ${port}`));
})
