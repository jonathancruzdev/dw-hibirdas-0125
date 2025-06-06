import express from "express";
import { getProducts, getProductById, setProduct, deleteProductById } from "../controllers/productController.js";

import { validacionToken } from "../middlewares/auth.js";


const router = express.Router();

// Definimos las rutas
router.get('/', validacionToken, getProducts);
router.get('/:id', getProductById);
router.post('/', validacionToken, setProduct);
router.delete('/:id', validacionToken, deleteProductById);

export default router;