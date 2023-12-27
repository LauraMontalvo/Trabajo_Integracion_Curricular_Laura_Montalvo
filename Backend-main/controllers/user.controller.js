const User = require('../models/user.model');
const UserPhoto = require('../models/userPhoto.model');
module.exports.createUser = (request, response) => {
    const { nombre, apellido, rol, sexo, fechaNacimiento, telefono, usuario, password, confirmPassword } = request.body;
    User.findOne({ usuario: usuario })
        .then(user => {
            if (user) {
                response.status(400).json({ msg: "Usuario existe" });
            } else {
                User.create({
                    nombre, apellido, rol, sexo, fechaNacimiento, telefono, usuario, password, confirmPassword
                })
                    .then(User => response.json({ insertedUser: User, msg: 'Succesful creation' }))
                    .catch(err => response.status(400).json(err));
            }
        })
        .catch(err => response.json(err))

}

module.exports.getAllUsers = (_, response) => {
    User.find({})
        .then(retrievedUsers => response.json(retrievedUsers))
        .catch(err => response.json(err))
}
module.exports.getUser = (request, response) => {
    User.findOne({ _id: request.params.id })
        .then(User => response.json(User))
        .catch(err => response.json(err))
}

module.exports.getUserByUsername = (request, response) => {
    User.findOne({ _id: request.params.usuario })
        .then(User => response.json(User))
        .catch(err => response.json(err))
}

module.exports.updateUser = (request, response) => {
    User.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true })
        .then(updateUser => response.json(updateUser))
        .catch(err => response.json(err))
}
module.exports.deleteUser = (request, response) => {
    User.deleteOne({ _id: request.params.id })
        .then(UserDeleted => response.json(UserDeleted))
        .catch(err => response.json(err))
}

module.exports.addPhoto = (request, response) => {
    const { foto } = request.body;

    UserPhoto.findOne({idUsuario: request.params.id})
        .then(fotoUsuario => {
            if (!fotoUsuario) {
                // No se encontró un UserPhoto, buscamos un usuario
                return User.findById(request.params.id);
            }

            // Se encontró un UserPhoto, actualizamos la foto
            fotoUsuario.foto = foto;
            return fotoUsuario.save();
        })
        .then(userOrFoto => {
            // userOrFoto puede ser un usuario o un UserPhoto actualizado
            if (!userOrFoto) {
                return Promise.reject({ status: 404, message: 'Usuario no encontrado' });
            }

            // Si userOrFoto es un usuario, creamos un nuevo UserPhoto
            if (userOrFoto instanceof User) {
                return UserPhoto.create({ idUsuario: request.params.id, foto: foto });
            }

            // Si userOrFoto es un UserPhoto actualizado, no hacemos nada más
            return userOrFoto;
        })
        .then(() => {
            return response.json({ mensaje: 'Foto agregada exitosamente' });
        })
        .catch(error => {
            console.error('Error al agregar la foto:', error);
            if (error.status) {
                return response.status(error.status).json({ error: error.message });
            } else {
                return response.status(500).json({ error: 'Error interno del servidor' });
            }
        });
};
