// rutas para categorias
const express = require('express');
const router = express.Router();
const categoriaController =  require('../controllers/categoriaController');
const { check } = require('express-validator');

// Crear categoria
// api/categorias
router.post('/',
    [
        check('titulo', 'El título es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripción es obligatoria').not().isEmpty()
    ],
    categoriaController.crearCategoria
)

// Obtener categorias
router.get('/',
    //auth,
    categoriaController.obtenerCategorias
)

module.exports = router;