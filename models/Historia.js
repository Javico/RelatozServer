const mongoose = require('mongoose');

const HistoriaSchema = mongoose.Schema({
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
    },
    historiaDetalle:{
        type: String,
        required: true,
        trim: true
    },
    categoria:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria'
    }
});

module.exports = mongoose.model('Historia',HistoriaSchema);