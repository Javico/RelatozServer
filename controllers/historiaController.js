const Historia = require('../models/Historia');

exports.crearHistoria = async (req, res) => {
    // revisar si hay errores
    // const errores = validationResult(req);

    // if(!errores.isEmpty()){
    //     return res.status(400).json({ errores : errores.array() })
    // }

    try {
        //Extraer info
        const {titulo, descripcion, historiaDetalle, categoria} = req.body;

        const nuevaHistoria = {};

        if(titulo){
            nuevaHistoria.titulo = titulo;
        }
    
        if(descripcion){
            nuevaHistoria.descripcion = descripcion;
        }

        if(historiaDetalle){
            nuevaHistoria.historiaDetalle = historiaDetalle;
        }

        if(categoria){
            nuevaHistoria.categoria = categoria;
        }

        // Creamos la tarea
        const historia = new Historia(nuevaHistoria);
        await historia.save();
        res.json(historia);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Obtener TODAS las historias existentes
exports.obtenerHistoriasTodas = async (req, res) => {
    try {
        // Extraer el proyecto y comprobar si existe
        //const {categoria} = req.body;
        //console.log(req.body);
        //console.log(req.params.id);
        const historias = await Historia.find({},'titulo descripcion historiaDetalle categoria').sort({creado: -1});
        res.json({historias});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Obtener historia por ID de categoria
exports.obtenerHistorias = async (req, res) => {
    try {
        // Extraer el proyecto y comprobar si existe
        //const {categoria} = req.body;
        //console.log(req.body);
        //console.log(req.params.id);
        const historias = await Historia.find({ categoria: req.params.id },'titulo descripcion historiaDetalle').sort({creado: -1});
        res.json({historias});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Obtener historia por ID de historia detalle
exports.obtenerHistoriaDetalle = async (req, res) => {
    try {
        // Extraer el proyecto y comprobar si existe
        //const {historia} = req.body;
        console.log(req.params.id);
        const historias = await Historia.findOne({ _id: req.params.id },'titulo historia').sort({creado: -1});
        res.json({historias});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// actualizar historia por id
exports.actualizarHistoria = async (req, res) => {
    // extraer la información del proyecto
    const {titulo, descripcion, historiaDetalle} = req.body;
    const nuevaHistoria = {};

    if(titulo){
        nuevaHistoria.titulo = titulo;
    }

    if(descripcion){
        nuevaHistoria.descripcion = descripcion;
    }

    if(historiaDetalle){
        nuevaHistoria.historiaDetalle = historiaDetalle;
    }

    try {
        // Revisar el id a ver si existe
        let historia = await Historia.findById(req.params.id);

        // revisar si existe o no
        if(!historia){
            return res.status(404).json({msg: 'Historia no encontrada'});
        }

        historia = await Historia.findByIdAndUpdate({ _id: req.params.id},{$set: nuevaHistoria}, { new: true});
        //console.log(historia)
        res.json({historia});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Elimina una historia por su id
exports.eliminarHistoria = async (req,res) =>{
    try {
        // Revisar el id
        let historia = await Historia.findById(req.params.id);

        // revisar si existe o no
        if(!historia){
            return res.status(404).json({msg: 'Historia no encontrado'});
        }

        // Eliminar el proyecto
        await Historia.findOneAndRemove({ _id: req.params.id});
        res.json({msg: 'Historia eliminada'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


// exports.obtieneCategorias = (req,res) => {
//     res.send('hola xd desde categoriacontroller');
//     //console.log(req.body);
// }