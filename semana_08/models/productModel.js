import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type:Number,
        min: 0
    },
    full: {
        type: Boolean,
        default: false
    }
});

const Product = mongoose.model('product', productsSchema);
export default Product;
