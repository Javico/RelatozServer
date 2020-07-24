// rutas para categorias
const express = require('express');
const router = express.Router();
const historiaController =  require('../controllers/historiaController');
const { check } = require('express-validator');

// Crear historias
// api/historia
router.post('/',
    [
        check('titulo', 'El título es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
        check('categoria', 'La categoria es obligatoria').not().isEmpty(),
        check('historiaDetalle', 'La historia es obligatoria').not().isEmpty()
    ],
    historiaController.crearHistoria
)

// Obtener historias por ID de categoria
router.get('/:id',
    //auth,
    historiaController.obtenerHistorias
)

// // Obtener historia por ID de historia
// router.get('/:id',
//     //auth,
//     historiaController.obtenerHistorias
// )


module.exports = router;