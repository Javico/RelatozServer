// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const {check} = require('express-validator');

// Crear usuario
// api/usuarios
router.post('/',
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email valido').isEmail(),
        check('password','El password debe ser minimo de 6 caracteres').isLength({ min: 6})
    ]
    ,
    usuarioController.crearUsuario
);

// Actualizar la categoria por ID
router.put('/:id',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('active', 'active es obligatorio').not().isEmpty()
    ],
    usuarioController.actualizarUsuario
)

// Eliminar un usuario por ID
router.delete('/:id',
    usuarioController.eliminarUsuario    
)

// obtener usuarios
router.get('/',
    usuarioController.obtenerUsuarios
);


module.exports = router;