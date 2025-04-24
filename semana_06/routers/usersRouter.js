import express from "express";
import {getUsers, getUserById, setUser, updateUserById, deleteUserById} from "../controllers/userController.js";

const router = express.Router();

// Definimos las rutas
router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', setUser);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);


export default router;