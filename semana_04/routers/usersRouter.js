import express from "express";
import {getUsers, setUser} from "../controllers/userController.js";

const router = express.Router();

// Definimos las rutas
router.get('/', getUsers);
router.post('/', setUser);

export default router;