const User = require('../models/user.model');

module.exports.createUser = (request, response) =>{
    
    const {nombre, apellido, rol, sexo, fechaNacimiento, telefono, usuario, password,confirmPassword} = request.body;
    console.log(request.body)
    User.create({
        nombre, apellido, rol, sexo, fechaNacimiento, telefono, usuario, password,confirmPassword
    })
        .then(User => response.json({insertedUser: User, msg: 'Succesful creation'}))
        .catch(err => response.status(400).json(err));
}

module.exports.getAllUsers = (_,response) =>{
    User.find({})
    .then(retrievedUsers => response.json(retrievedUsers))
    .catch(err => response.json(err))
}

module.exports.getUser = (request, response) =>{
    User.findOne({_id: request.params.id})
    .then(User => response.json(User))
    .catch(err => response.json(err))
}

module.exports.updateUser = (request, response) =>{
    User.findOneAndUpdate({_id: request.params.id}, request.body, {new: true})
    .then(updateUser => response.json(updateUser))
    .catch(err => response.json(err))
}

module.exports.deleteUser = (request, response) =>{
    User.deleteOne({_id: request.params.id})
    .then(UserDeleted => response.json(UserDeleted))
    .catch(err => response.json(err))
}