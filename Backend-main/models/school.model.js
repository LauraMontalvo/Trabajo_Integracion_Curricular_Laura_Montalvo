const mongoose = require('mongoose');

const SchoolSchema = new mongoose.Schema({   
    nombreInstitucion: {
        type: String,
        required: [true, 'El nombre de la Institucion es obligatoria']
    }
});

const School = mongoose.model('School', SchoolSchema);
module.exports = School;