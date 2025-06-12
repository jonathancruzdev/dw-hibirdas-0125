import Categoria from "../models/categoriaModel.js";

const getCategoria = async( request, response) => {
    try {    
        const categorias = await Categoria.find();
        response.status(200).json({ msg: 'ok', data: categorias});

    } catch (error) {
        console.error({error});
        response.status(500).json({msg: 'Error del servidor', data: []});
    }
}


const setCategoria = async( request, response) =>{
    // Validación Minima
    const { name  } = request.body;

    if( !name) {
        response.status(400).json({msg: 'Faltan campos obligatorios' } );
    }

    try {
        const categoriaNueva = new Categoria( {name}); 
        await categoriaNueva.save();
        const id = categoriaNueva._id;

        response.status(202).json({msg: 'Categoría guardada', id } );
    } catch (error) {
        if( error.name === 'ValidationError'){
            const listError = Object.values( error.errors)[0].message 
            response.status(403).json({error: listError});

        } else {
            response.status(500).json({error: 'Error del servidor'});
        }

    }
}

const deleteCategoriaById = async(request, response) => {
    try {
        const { id } = request.params
        const status = await Categoria.findByIdAndDelete(id);
        if (status){
            response.status(200).json({ msg: 'Categoría eliminado', data: []});
        } else {
            response.status(404).json({ msg: 'No se econtro la Categoría', data: []});
        }
    } catch (error) {
        console.error({error});
        response.status(500).json({msg: 'Error del servidor', data: []});
    }
}


export { getCategoria, setCategoria, deleteCategoriaById };