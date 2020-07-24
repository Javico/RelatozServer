const Categoria = require('../models/Categoria');

exports.crearCategoria = async (req, res) => {
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
        const categoria = new Categoria(req.body);
        await categoria.save();
        res.json(categoria);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Obtener caegorias
exports.obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find({},'titulo descripcion').sort({creado: -1});
        res.json({categorias});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// exports.obtieneCategorias = (req,res) => {
//     res.send('hola xd desde categoriacontroller');
//     //console.log(req.body);
// }