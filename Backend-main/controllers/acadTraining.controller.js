const AcadTraining = require('../models/acadTraining.model');
const School = require('../models/school.model')

module.exports.createAcadTraining = (request, response) => {

    const { idInstitucion, idUsuario, tituloObtenido, fechaInicio, fechaFin } = request.body;
    console.log(request.body)
    AcadTraining.create({
        idInstitucion, idUsuario, tituloObtenido, fechaInicio, fechaFin
    })
        .then(AcadTraining => response.json({ insertedAcadTraining: AcadTraining, msg: 'Succesful creation' }))
        .catch(err => response.status(400).json(err));
}

module.exports.getAllAcadTrainings = (_, response) => {
    AcadTraining.find({esActivo: true})
        .then(retrievedAcadTrainings => response.json(retrievedAcadTrainings))
        .catch(err => response.json(err))
}

module.exports.getAcadTraining = (request, response) => {
    AcadTraining.findOne({ _id: request.params.id })
        .then(AcadTraining => response.json(AcadTraining))
        .catch(err => response.json(err))
}

module.exports.updateAcadTraining = (request, response) => {
    AcadTraining.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true })
        .then(updateAcadTraining => response.json(updateAcadTraining))
        .catch(err => response.json(err))
}

module.exports.deleteAcadTraining = (request, response) => {
    AcadTraining.findOneAndUpdate({ _id: request.params.id },{ esActivo: false }, 
    { new: true })
        .then(AcadTrainingDeleted => response.json(AcadTrainingDeleted))
        .catch(err => response.json(err))
}

module.exports.getUserAcadTraining = (request, response) => {
    AcadTraining.find({ idUsuario: request.params.id, esActivo:true }).populate('idInstitucion')  // Debes pasar el nombre del campo a poblar como un string
    .then(retrievedCertifications => {
        response.json(retrievedCertifications);
    })
        .catch(err => response.json(err))
}

module.exports.getSchoolAcadTraining = (request, response) => {
    AcadTraining.find({ idInstitucion: request.params.id })
        .then(retrievedCertifications => response.json(retrievedCertifications))
        .catch(err => response.json(err))
} 