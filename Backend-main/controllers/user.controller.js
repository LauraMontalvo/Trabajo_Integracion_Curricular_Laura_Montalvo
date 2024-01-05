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
        .then(async retrievedUsers => {
            // Buscar y adjuntar la URL de la foto a cada usuario
            const usersWithPhotos = await Promise.all(retrievedUsers.map(async user => {
                const userPhoto = await UserPhoto.findOne({ idUsuario: user._id });
                const photoUrl = userPhoto ? `http://localhost:8000/Imagenes/${userPhoto.foto}` : null;
                return { ...user.toObject(), foto: photoUrl };
            }));
            response.json(usersWithPhotos);
        })
        .catch(err => response.json(err));
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
    if (!request.file) {
        return response.status(400).json({ error: 'No se ha enviado ningún archivo.' });
    }

    const filePath = 'Imagenes/' + request.file.filename; // La ruta donde se guardó el archivo
    const nuevaFoto = {
        foto: request.file.filename,
        ruta: filePath,
        idUsuario : request.params.id
    };

    console.log(nuevaFoto)

    UserPhoto.findOne({idUsuario: request.params.id})
        .then(fotoUsuario => {
            if (!fotoUsuario) {
                return User.findById(request.params.id);
            }
            // Si ya existe, actualiza la información de la foto
            fotoUsuario.foto = nuevaFoto.foto;
            fotoUsuario.ruta = nuevaFoto.ruta;
            return fotoUsuario.save();
        })
        .then(userOrFoto => {
            // userOrFoto puede ser un usuario o un UserPhoto actualizado
            if (!userOrFoto) {
                return Promise.reject({ status: 404, message: 'Usuario no encontrado' });
            }
            // Si userOrFoto es un usuario, creamos un nuevo UserPhoto
            if (userOrFoto instanceof User) {
                return UserPhoto.create(nuevaFoto);
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

module.exports.getUserPhoto = (request, response) => {
    UserPhoto.findOne({idUsuario: request.params.id})
        .then(user => {
            if (!user) {
                return response.status(404).json({ error: 'Usuario no encontrado.' });
            }
            // Asegúrate de que la ruta de la imagen sea accesible para el cliente
            const imageUrl = user.foto ? `http://localhost:8000/Imagenes/${user.foto}` : null;
            response.json({ foto: imageUrl });
        })
        .catch(error => {
            console.error('Error al obtener la foto del usuario:', error);
            response.status(500).json({ error: 'Error interno del servidor' });
        });
};
