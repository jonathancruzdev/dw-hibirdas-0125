import express from "express";
import { getProducts, getProductById, setProduct, deleteProductById } from "../controllers/productController.js";

const router = express.Router();

// Definimos las rutas
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', setProduct);
router.delete('/:id', deleteProductById);

export default router;