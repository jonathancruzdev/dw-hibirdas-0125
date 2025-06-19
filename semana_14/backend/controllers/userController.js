import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret_key = process.env.SECRET_KEY;
const salt = 10;

const getUsers = async( request, response) => {
    try {
        const users = await User.find();
        response.status(200).json({ msg: 'ok', data: users});

    } catch (error) {
        console.error({error});
        response.status(500).json({msg: 'Error del servidor', data: []});
    }
}

const getUserById = async( request, response) => {
    try {
        const { id } = request.params
        const user = await User.findById(id);
        if (user){

            const data = {};
            data._id =  user._id;
            data.name =  user.name;
            data.email =  user.email;

            response.status(200).json({ msg: 'ok', data});
        } else {
            response.status(404).json({ msg: 'No se econtro el usuario', data: {}});
        }
    } catch (error) {
        console.error({error});
        response.status(500).json({msg: 'Error del servidor', data: []});
    }
}

const setUser = async( request, response) =>{
    const { name, email, password } = request.body;

    if( !name || !email || !password){
        response.status(400).json({error: 'Faltan campos obligatorios'});
    }

    try {
        // Verificamos que el email no exista en la db
        const user = await User.findOne({ email: email });
        if( user ){
            return response.status(404).json({msg:"El usuario ya existe"});
        }
        const passwordHash = await bcrypt.hash( password, salt);
        const userNew = new User( {name, email, password: passwordHash}); 
        
        await userNew.save();
    
        const id = userNew._id;
   
        response.status(202).json({msg: 'Usuario guardado', id } );
    } catch (error) {
        console.log('.......')
        console.error({error});

        if( error.name === 'ValidationError'){
            // Extraemos los mensajes de errores
            const listError = Object.values( error.errors)[0].message 
            response.status(403).json({error: listError});

        } else {
            response.status(500).json({error: 'Error del servidor'});
        }

    
    }
}

const deleteUserById = async(request, response) => {
    try {
        const { id } = request.params
        const status = await User.findByIdAndDelete(id);
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
        console.log({body: user})
        console.log({ file: request.file});

        const passwordHash = await bcrypt.hash( user.password, salt);
        user.password = passwordHash;
        user.avatar = request.file.path;

        const userNew = await User.findByIdAndUpdate(id, user, { new: true});
        if (userNew){
            response.status(200).json({ msg: 'Usuario actualizado', data: user});
        } else {
            response.status(404).json({ msg: 'No se econtro el usuario', data: user});
        }
    } catch (error) {
        console.error({error});
        response.status(500).json({msg: 'Error del servidor', data: []});
    }
}

const auth = async( request, response ) => {
    const { email, password } = request.body;
    // Verificamos el email
    const user = await User.findOne({email});
    if(!user){
        return response.status(404).json({msg: 'El email es invalido'});
    }
    const status = await bcrypt.compare( password, user.password );
    if( !status){
        return response.status(404).json({msg: 'Contraseña Invalida'});
    }
    const data = {
        id: user._id,
        email: user.email
    }
    // Generamos el token
    const token = jwt.sign( data, secret_key, { expiresIn: '1h'});
    response.json({msg: 'ok', token: token});
}
export { getUsers, getUserById, setUser, deleteUserById, updateUserById, auth };