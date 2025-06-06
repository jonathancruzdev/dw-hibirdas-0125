import express from "express";
import { getCategoria, setCategoria, deleteCategoriaById } from "../controllers/categoriaController.js";

import { validacionToken } from "../middlewares/auth.js";


const router = express.Router();

// Definimos las rutas
router.get('/', validacionToken, getCategoria);
router.post('/', validacionToken, setCategoria);
router.delete('/:id', validacionToken, deleteCategoriaById);

export default router;