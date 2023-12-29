const Job = require('../models/job.model');
const Company = require('../models/company.model'); // Asegúrate de que este modelo esté correctamente definido

module.exports.createJob = (request, response) =>{
    const {idEmpresa, puesto,descripcion, formacionAcademica,conocimientos,aptitudes, experienciarequerida,modalidad} = request.body;
    console.log(request.body)
    Job.create({
idEmpresa, puesto,descripcion, formacionAcademica,conocimientos,aptitudes, experienciarequerida,modalidad    })
    
        .then(Job => response.json({insertedJob: Job, msg: 'Succesful creation'}))
        .catch(err => response.status(400).json(err));
}

module.exports.getAllJobs = (_, response) => {
    Job.find({})
        .populate('idEmpresa', 'nombreEmpresa')
        .then(retrievedJobs => {
            console.log(retrievedJobs); // Imprime para diagnóstico
            response.json(retrievedJobs);
        })
        .catch(err => response.json(err));
};


module.exports.getJob = (request, response) =>{
    Job.findOne({_id: request.params.id})
    .then(Job => response.json(Job))
    .catch(err => response.json(err))
}

module.exports.updateJob = (request, response) =>{
    Job.findOneAndUpdate({_id: request.params.id}, request.body, {new: true})
    .then(updateJob => response.json(updateJob))
    .catch(err => response.json(err))
}

module.exports.deleteJob = (request, response) =>{
    Job.deleteOne({_id: request.params.id})
    .then(JobDeleted => response.json(JobDeleted))
    .catch(err => response.json(err))
}

module.exports.getCompanyJobs = (request,response) =>{
    Job.find({idEmpresa: request.params.id})
    .then(retrievedCertifications => response.json(retrievedCertifications))
    .catch(err => response.json(err))
}
