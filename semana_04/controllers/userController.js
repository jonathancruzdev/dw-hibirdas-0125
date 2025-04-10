import { response } from "express";
import UsersManager from  "../models/UsersManager.js";

const userModel = new UsersManager();

const getUsers = async( request, response) => {
    try {
        const users = await userModel.getUsers();
        response.status(200).json(users);

    } catch (error) {
        console.error({error});
        response.status(500).json({error: 'Error del servidor'});
    }
}

const setUser = async( request, response) =>{
    try {
        const user = request.body;
        console.log( {user})
        const id = await userModel.setUser(user);

        response.status(202).json({msg: `Usuario guardado ${id}`});
    } catch (error) {
        console.error({error});
        response.status(500).json({error: 'Error del servidor'});
    }
}

export { getUsers, setUser };