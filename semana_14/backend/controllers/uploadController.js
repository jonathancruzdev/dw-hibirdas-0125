const uploadController = ( req, res) => {
    try {

        if( !req.file ){
            return res.status(422).json({msg: 'No se subio el archivo'});
        }

        return res.status(200).json({msg: 'Archivo subido', file: req.file})
        
    } catch (error) {
        console.error({error})
        res.status(500).json({msg: 'Error del servidor', data: []});

    }
}

export { uploadController };