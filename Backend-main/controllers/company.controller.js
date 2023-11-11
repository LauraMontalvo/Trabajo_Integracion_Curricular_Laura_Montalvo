const Company = require('../models/company.model');

module.exports.createCompany = (request, response) =>{
    const {nombreEmpresa, correo, direccion, telefono, descripcion, rol, usuario, password, confirmPassword} = request.body;
    console.log(request.body)
    Company.create({
        nombreEmpresa, correo, direccion, telefono, descripcion, rol, usuario, password, confirmPassword
    })
        .then(Company => response.json({insertedCompany: Company, msg: 'Succesful creation'}))
        .catch(err => response.status(400).json(err));
}

module.exports.getAllCompanies = (_,response) =>{
    Company.find({})
    .then(retrievedCompanies => response.json(retrievedCompanies))
    .catch(err => response.json(err))
}

module.exports.getCompany = (request, response) =>{
    Company.findOne({_id: request.params.id})
    .then(Company => response.json(Company))
    .catch(err => response.json(err))
}

module.exports.updateCompany = (request, response) =>{
    Company.findOneAndUpdate({_id: request.params.id}, request.body, {new: true})
    .then(updateCompany => response.json(updateCompany))
    .catch(err => response.json(err))
}

module.exports.deleteCompany = (request, response) =>{
    Company.deleteOne({_id: request.params.id})
    .then(CompanyDeleted => response.json(CompanyDeleted))
    .catch(err => response.json(err))
}
