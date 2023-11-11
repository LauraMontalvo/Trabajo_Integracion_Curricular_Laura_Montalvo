const mongoose = require('mongoose');

const PostulationSchema = new mongoose.Schema({   
    idUsuario: {
        type: String,
        required: [true, 'El idUsuario es obligatorio']
    },
    idEmpleo: {
        type: String,
        required: [true, 'El idEmpleo es obligatorio']
    },
    estado:{
        type: String,
        required: [true, 'El El idUsuario es obligatorio'],
    },
    fechaPostulacion:{
        type: Date,
        required: [true, 'La fecha de postulación es obligatoria'],
    }
});

const Postulation = mongoose.model('Postulation', PostulationSchema);
module.exports = Postulation;