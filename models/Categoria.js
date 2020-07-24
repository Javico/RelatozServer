const mongoose = require('mongoose');

const CategoriaSchema = mongoose.Schema({
    titulo:{
        type: String,
        required:true,
        trim: true
    },
    descripcion:{
        type: String,
        required: true,
        trim: true
    },
    creado:{
        type: Date,
        default: Date.now()
    },
    active:{
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Categoria',CategoriaSchema);