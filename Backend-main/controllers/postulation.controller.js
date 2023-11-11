const Postulation = require('../models/postulation.model');

module.exports.createPostulation = (request, response) =>{
    const {idUsuario, idEmpleo, estado,fechaPostulacion} = request.body;
    console.log(request.body)
    Postulation.create({
        idUsuario, idEmpleo, estado,fechaPostulacion
    })
        .then(Postulation => response.json({insertedPostulation: Postulation, msg: 'Succesful creation'}))
        .catch(err => response.status(400).json(err));
}

module.exports.getAllPostulations = (_,response) =>{
    Postulation.find({})
    .then(retrievedPostulations => response.json(retrievedPostulations))
    .catch(err => response.json(err))
}

module.exports.getPostulation = (request, response) =>{
    Postulation.findOne({_id: request.params.id})
    .then(Postulation => response.json(Postulation))
    .catch(err => response.json(err))
}

module.exports.updatePostulation = (request, response) =>{
    Postulation.findOneAndUpdate({_id: request.params.id}, request.body, {new: true})
    .then(updatePostulation => response.json(updatePostulation))
    .catch(err => response.json(err))
}

module.exports.deletePostulation = (request, response) =>{
    Postulation.deleteOne({_id: request.params.id})
    .then(PostulationDeleted => response.json(PostulationDeleted))
    .catch(err => response.json(err))
}

module.exports.getUserPostulations = (request,response) =>{
    Postulation.find({idUsuario: request.params.id})
    .then(retrievedCertifications => response.json(retrievedCertifications))
    .catch(err => response.json(err))
}

module.exports.getJobPostulations = (request,response) =>{
    Postulation.find({idEmpleo: request.params.id})
    .then(retrievedCertifications => response.json(retrievedCertifications))
    .catch(err => response.json(err))
}