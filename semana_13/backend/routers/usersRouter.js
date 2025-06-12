import express from "express";
import {getUsers, getUserById, setUser, updateUserById, deleteUserById, auth} from "../controllers/userController.js";
import { validacionToken } from "../middlewares/auth.js";

const router = express.Router();

// Definimos las rutas
router.get('/', getUsers);
router.post('/auth', auth);
router.get('/:id', getUserById);
router.post('/',  setUser);
router.put('/:id', validacionToken, updateUserById);
router.delete('/:id', validacionToken, deleteUserById);


export default router;