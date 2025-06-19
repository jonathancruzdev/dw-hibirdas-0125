import express from "express";
import multer from "multer";
import {getUsers, getUserById, setUser, updateUserById, deleteUserById, auth} from "../controllers/userController.js";
import { uploadController } from "../controllers/uploadController.js";
import { validacionToken } from "../middlewares/auth.js";

const router = express.Router();

// Configuramos multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/')
    },
    filename: (req, file, cb) =>{
        const idRandom = Date.now();
        const fileName =  idRandom + '-' + file.originalname
        cb(null, fileName)
    }
});

const upload = multer({ storage: storage});

// Definimos las rutas
router.get('/', getUsers);
router.post('/auth', auth);
router.get('/:id', getUserById);
router.post('/', setUser);
router.put('/:id', upload.single('file'), updateUserById);
router.delete('/:id', validacionToken, deleteUserById);

// ruta para subir archivos
router.post('/upload', upload.single('file'), uploadController );

export default router;