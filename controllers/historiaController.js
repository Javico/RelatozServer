const Historia = require('../models/Historia');

exports.crearHistoria = async (req, res) => {
    // revisar si hay errores
    // const errores = validationResult(req);

    // if(!errores.isEmpty()){
    //     return res.status(400).json({ errores : errores.array() })
    // }

    try {
        // Extraer el proyecto y comprobar si existe
        //const {proyecto} = req.body;

        //const existeProyecto = await Proyecto.findById(proyecto);

        // if(!existeProyecto){
        //     return res.status(404).json({msg: 'Proyecto no encontrado'});
        // }

        // Revisar si el proyecto actual es del usuario que esta logeado
        // if(existeProyecto.creador.toString() !== req.usuario.id){
        //     return res.status(401).json({msg: 'No autorizado'});
        // }

        // Creamos la tarea
        const historia = new Historia(req.body);
        await historia.save();
        res.json(historia);
        
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
        console.log(req.params.id);
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


// exports.obtieneCategorias = (req,res) => {
//     res.send('hola xd desde categoriacontroller');
//     //console.log(req.body);
// }