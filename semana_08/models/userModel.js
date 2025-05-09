import mongoose, { Types } from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        minlength: [3, 'El nombre debe ser mayor o igual a tres caracteres'],
        maxlength: 16
    },
    email:{
        type: String,
        required:  [true, 'El email es obligatorio'],
    },
    password: {
        type: String,
        required: [true, 'El Password es obligatorio'],
        minlength: 3
    }
});

const User = mongoose.model('user', userSchema);

export default User;
