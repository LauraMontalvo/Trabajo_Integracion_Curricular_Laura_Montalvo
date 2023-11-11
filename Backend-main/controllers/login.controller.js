const User = require('../models/user.model');
const Company = require('../models/company.model');

const md5 = require('md5'); // Importa la biblioteca md5

// ...

module.exports.validateUser = (req, res) => {
    User.findOne({ usuario: req.body.usuario })
        .then((user) => {
            if (user) {
                // Hashea la contraseña de entrada
                const hashedPassword = req.body.password;
                if (hashedPassword === user.password) {
                    res.json({
                        msg: 'Usuario validado correctamente!!',
                        user: user
                    });
                } else {
                    res.json({ msg: 'Datos incorrectos!!' });
                }
            } else {
                res.json({ msg: 'Este usuario no existe' });
            }
        })
        .catch(err => res.json({ err: err, msg: "Error al validar el usuario." }));
}

module.exports.validateCompany = (req, res) => {
    Company.findOne({ usuario: req.body.usuario })
        .then((company) => {
            if (company) {
                // Hashea la contraseña de entrada
                const hashedPassword = (req.body.password);
                if (hashedPassword === company.password) {
                    res.json({ msg: 'Empresa validada correctamente!!' });
                } else {
                    res.json({ msg: 'Contraseña incorrecta, ingrese nuevamente!!' });
                }
            } else {
                res.json({ msg: 'Esta empresa no existe!' });
            }
        })
        .catch(err => res.json({ err: err, msg: "Error al validar la empresa." }));
}



