import Product from "../models/productModel.js";

const getProducts = async( request, response) => {
    try {
        const { full=null, max } = request.query;
        let products;
        if( full){
            products = await Product.find({full});
        } else {
            products = await Product.find().populate('categoria');
        }
     
        response.status(200).json({ msg: 'ok', data: products});

    } catch (error) {
        console.error({error});
        response.status(500).json({msg: 'Error del servidor', data: []});
    }
}

const getProductById = async( request, response) => {
    try {
        const { id } = request.params
        const product = await Product.findById(id);
        if (product){
            response.status(200).json({ msg: 'ok', data: product});
        } else {
            response.status(404).json({ msg: 'No se econtro el Producto', data: {}});
        }
    } catch (error) {
        console.error({error});
        response.status(500).json({msg: 'Error del servidor', data: []});
    }
}

const setProduct = async( request, response) =>{
    // Validación Minima
    const { name, price, full, categoriaId } = request.body;

    if( !name || !price || !categoriaId) {
        response.status(400).json({msg: 'Faltan campos obligatorios' } );
    }

    try {
        const productNew = new Product( {name, price, full, categoria: categoriaId }); 
        await productNew.save();
        const id = productNew._id;
   
        response.status(202).json({msg: 'Producto guardado', id } );
    } catch (error) {
        if( error.name === 'ValidationError'){
            // Extraemos los mensajes de errores
            const listError = Object.values( error.errors)[0].message 
            response.status(403).json({error: listError});

        } else {
            response.status(500).json({error: 'Error del servidor'});
        }

    }
}

const deleteProductById = async(request, response) => {
    try {
        const { id } = request.params
        const status = await Product.findByIdAndDelete(id);
        if (status){
            response.status(200).json({ msg: 'Producto eliminado', data: []});
        } else {
            response.status(404).json({ msg: 'No se econtro el Producto', data: []});
        }
    } catch (error) {
        console.error({error});
        response.status(500).json({msg: 'Error del servidor', data: []});
    }
}


export { getProducts, getProductById, setProduct, deleteProductById };