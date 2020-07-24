// rutas para categorias
const express = require('express');
const router = express.Router();
const historiaController =  require('../controllers/historiaController');
//const { check } = require('express-validator');


// Obtener historias por ID de historia detalle
router.get('/:id',
    //auth,
    historiaController.obtenerHistoriaDetalle
)

module.exports = router;