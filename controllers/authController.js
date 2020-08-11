const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {
    // revisar si hay errores
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({ errores : errores.array() })
    }

    // extraer email y password
    const { email, password } = req.body;

    try {
        // revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({email});

        if(!usuario){
            return res.status(400).json({msg: 'Usuario o password incorrecto'});
        }

        // revisar su password
        const passCorrecto = await bcryptjs.compare(password,usuario.password);

        if(!passCorrecto){
            return res.status(400).json({msg: 'Usuario o password incorrecto'});
        }


        // Si todo es correcto, vamos a crear el JWT

        // Crear y firmar el JWT
        const payload = {
            usuario:{
                id: usuario.id
            }
        };

        // firmar el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 1800 // 1 hora son segundos
        }, (error, token) => {
            if(error){
                throw error;
            }

            // Nuevo mensaje de confirmación
            res.json({token: token});
        });

    } catch (error) {
        console.log(error);
    }
}

// Obtiene el usuario que esta authenticado
exports.usuarioAuthenticado = async (req,res) => {
    try {
        //console.log('andale andale');
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        //console.log('arriba arriba');
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'});
    }
}