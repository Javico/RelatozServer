const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {

    // revisar si hay errores
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({ errores : errores.array() })
    }

    // extraer email y password
    const {email, password} = req.body;

    try {
        // revisar que el usuario resgistrado sea unico
        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({ msg: 'el usuario ya existe'});
        }

        // crear nuevo usuario
        usuario = new Usuario(req.body);

        // hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password,salt);

        // guardar nuevo usuario
        await usuario.save();

        // Crear y firmar el JWT
        const payload = {
            usuario:{
                id: usuario.id
            }
        };

        // firmar el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora son segundos
        }, (error, token) => {
            if(error){
                throw error;
            }

            // Nuevo mensaje de confirmación
            res.json({token: token});
        });

        // Mensaje de confirmación
        //res.json({ msg: 'Usuario creado correctamente'});
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}

// Actualizar usuario por id
exports.actualizarUsuario = async (req, res) => {
    // extraer la información del proyecto
    const {nombre, email, active} = req.body;
    const nuevoUsuario = {};

    if(nombre){
        nuevoUsuario.nombre = nombre;
    }

    if(email){
        nuevoUsuario.email = email;
    }

    nuevoUsuario.active = active;

    try {
        // Revisar el id a ver si existe
        let usuario = await Usuario.findById(req.params.id);

        // revisar si existe o no
        if(!usuario){
            return res.status(404).json({msg: 'Usuario no encontrado'});
        }

        usuario = await Usuario.findByIdAndUpdate({ _id: req.params.id},{$set: nuevoUsuario}, { new: true});
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Obtener usuarios
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find({},'nombre email active').sort({titulo: 1});
        res.json({usuarios});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Elimina una usuario por su id
exports.eliminarUsuario = async (req,res) =>{
    try {
        // Revisar el id
        let usuario = await Usuario.findById(req.params.id);

        // revisar si existe o no
        if(!usuario){
            return res.status(404).json({msg: 'Usuario no encontrado'});
        }

        // Eliminar el proyecto
        await Usuario.findOneAndRemove({ _id: req.params.id});
        res.json({msg: 'Usuario eliminada'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// exports.crearUsuario = (req,res) => {
//     //res.send('hola xd');
//     console.log(req.body);
// }