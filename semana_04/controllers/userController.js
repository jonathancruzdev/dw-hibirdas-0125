import { response } from "express";
import UsersManager from  "../models/UsersManager.js";

const userModel = new UsersManager();

const getUsers = async( request, response) => {
    try {
        const users = await userModel.getUsers();
        response.status(200).json({ msg: 'ok', data: users});

    } catch (error) {
        console.error({error});
        response.status(500).json({msg: 'Error del servidor', data: []});
    }
}

const getUserById = async( request, response) => {
    try {
        //const id = request.params.id;
        const { id } = request.params
        const user = await userModel.getUserById(id);
        if (user){
            response.status(200).json({ msg: 'ok', data: user});
        } else {
            response.status(404).json({ msg: 'No se econtro el usuario', data: {}});
        }
    } catch (error) {
        console.error({error});
        response.status(500).json({msg: 'Error del servidor', data: []});
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

const deleteUserById = async( request, response) => {
    try {
        const { id } = request.params
        const status = await userModel.deleteUserById(id);
        if (status){
            response.status(200).json({ msg: 'Usuario eliminado', data: []});
        } else {
            response.status(404).json({ msg: 'No se econtro el usuario', data: []});
        }
    } catch (error) {
        console.error({error});
        response.status(500).json({msg: 'Error del servidor', data: []});
    }
}

const updateUserById = async( request, response) => {
    try {
        const { id } = request.params
        const user = request.body;

        const status = await userModel.updateUserById(id, user);
        if (status){
            response.status(200).json({ msg: 'Usuario actualizado', data: user});
        } else {
            response.status(404).json({ msg: 'No se econtro el usuario', data: user});
        }
    } catch (error) {
        console.error({error});
        response.status(500).json({msg: 'Error del servidor', data: []});
    }
}
export { getUsers, getUserById, setUser, deleteUserById, updateUserById };