import jsonwebtoken  from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.SECRET_KEY;

const validacionToken = (req, res, next) => {
    console.log('Middleware... de autenticación');

    const jwt = req.headers.authorization;

    if( !jwt){
        res.status(401).json({msg: "Falta el token"});
    }
    
    const token = jwt.split(' ')[1];
    console.log({token});
    
    jsonwebtoken.verify(token, secretKey, (error, decoded) => {
        
        if( error) {
            res.status(403).json({msg: "Token invalido"});
        }

        req.body.userId = decoded.id;

    })

    next();
}

export { validacionToken }