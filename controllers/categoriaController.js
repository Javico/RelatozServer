const Categoria = require('../models/Categoria');

exports.crearCategoria = async (req, res) => {
    // revisar si hay errores
    // const errores = validationResult(req);

    // if(!errores.isEmpty()){
    //     return res.status(400).json({ errores : errores.array() })
    // }

    try {
        //Extraer categoria
        const {titulo, descripcion, url} = req.body;

        const nuevaCategoria = {};

        if(titulo){
            nuevaCategoria.titulo = titulo;
        }
    
        if(descripcion){
            nuevaCategoria.descripcion = descripcion;
        }

        if(url){
            nuevaCategoria.urlImage = url;
        }

        // Creamos la tarea
        const categoria = new Categoria(nuevaCategoria);
        await categoria.save();
        res.json(categoria);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// actualizar categoria por id
exports.actualizarCategoria = async (req, res) => {
    // extraer la información del proyecto
    const {titulo, descripcion, active, url} = req.body;
    const nuevaCategoria = {};

    if(titulo){
        nuevaCategoria.titulo = titulo;
    }

    if(descripcion){
        nuevaCategoria.descripcion = descripcion;
    }

    if(url){
        nuevaCategoria.urlImage = url;
    }

    nuevaCategoria.active = active;

    try {
        // Revisar el id a ver si existe
        let categoria = await Categoria.findById(req.params.id);

        // revisar si existe o no
        if(!categoria){
            return res.status(404).json({msg: 'Categoria no encontrado'});
        }

        categoria = await Categoria.findByIdAndUpdate({ _id: req.params.id},{$set: nuevaCategoria}, { new: true});
        res.json({categoria});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Obtener categorias
exports.obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find({ active: true},'titulo descripcion urlImage').sort({titulo: 1});
        res.json({categorias});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Obtener caegorias todas activa e inactivas para el llenado del grid
exports.obtenerCategoriasTodas = async (req, res) => {
    try {
        const categorias = await Categoria.find({},'titulo descripcion active urlImage').sort({titulo: 1});
        res.json({categorias});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Elimina una categoria por su id
exports.eliminarCategoria = async (req,res) =>{
    try {
        // Revisar el id
        let categoria = await Categoria.findById(req.params.id);

        // revisar si existe o no
        if(!categoria){
            return res.status(404).json({msg: 'Categoria no encontrado'});
        }

        // Eliminar el proyecto
        //await Categoria.findOneAndRemove({ _id: req.params.id});
        res.json({msg: 'Categoria eliminada'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// exports.obtieneCategorias = (req,res) => {
//     res.send('hola xd desde categoriacontroller');
//     //console.log(req.body);
// }