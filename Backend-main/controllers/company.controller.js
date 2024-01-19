const Company = require('../models/company.model');
const CompanyPhoto = require('../models/companyPhoto.model'); // Asegúrate de importar el modelo correcto
const fs = require('fs').promises;

module.exports.createCompany = (request, response) =>{
    const {nombreEmpresa, correo, direccion, telefono, descripcion, valores,rol, usuario, password, confirmPassword} = request.body;
    console.log(request.body)
    Company.findOne({ usuario: usuario })
    .then(company =>{
        if(company){
            response.status(400).json({ msg: "Usuario existe" });
        }else{
            Company.create({
                nombreEmpresa, correo, direccion, telefono, descripcion, valores,rol, usuario, password, confirmPassword
            }).then(Company => response.json({insertedCompany: Company, msg: 'Succesful creation'}))
            .catch(err => response.status(400).json(err));

        }
    }

    )

}
module.exports.getAllCompanies = (_, response) => {
    Company.find({})
        .then(async retrievedCompanies => {
            // Buscar y adjuntar la URL de la foto a cada empresa
            const companiesWithPhotos = await Promise.all(retrievedCompanies.map(async company => {
                const companyPhoto = await CompanyPhoto.findOne({ idEmpresa: company._id });
                const photoUrl = companyPhoto ? `http://localhost:8000/Imagenes/${companyPhoto.foto}` : null;
                return { ...company.toObject(), foto: photoUrl };
            }));
            response.json(companiesWithPhotos);
        })
        .catch(err => response.json(err));
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
module.exports.addPhoto = async (request, response) => {
    if (!request.file) {
        return response.status(400).json({ error: 'No se ha enviado ningún archivo.' });
    }

    const nuevaFoto = {
        foto: request.file.filename,
        ruta: 'Imagenes/' + request.file.filename,
        idEmpresa: request.params.id
    };

    try {
        const fotoEmpresa = await CompanyPhoto.findOne({ idEmpresa: request.params.id });

        if (fotoEmpresa) {
            // Elimina la foto anterior si existe
            const oldFilePath = fotoEmpresa.ruta;
            try {
                await fs.unlink(oldFilePath);
            } catch (error) {
                console.warn("Error al eliminar la imagen anterior:", error.message);
            }

            fotoEmpresa.foto = nuevaFoto.foto;
            fotoEmpresa.ruta = nuevaFoto.ruta;
            await fotoEmpresa.save();
        } else {
            await CompanyPhoto.create(nuevaFoto);
        }

        const imageUrl = `http://localhost:8000/${nuevaFoto.ruta}`; // Construye la URL de la imagen

        return response.json({ mensaje: 'Foto agregada exitosamente', foto: imageUrl });
    } catch (error) {
        console.error('Error al agregar la foto:', error);
        if (error.status) {
            return response.status(error.status).json({ error: error.message });
        } else {
            return response.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};
module.exports.getCompanyPhoto = (request, response) => {
    CompanyPhoto.findOne({idEmpresa: request.params.id})
        .then(empresa => {
            if (!empresa) {
                return response.status(404).json({ error: 'Empresa no encontrada.' });
            }
            const imageUrl = empresa.foto ? `http://localhost:8000/Imagenes/${empresa.foto}` : null;
            response.json({ foto: imageUrl });
        })
        .catch(error => {
            console.error('Error al obtener la foto de la empresa:', error);
            response.status(500).json({ error: 'Error interno del servidor' });
        });
};