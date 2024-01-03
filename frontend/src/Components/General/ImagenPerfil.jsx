import React, { useState, useEffect } from 'react';
import {
    Button, Image, InputGroup, FormControl } from 'react-bootstrap';

    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit, faGraduationCap, faTrashAlt, faInfoCircle, faCalendarAlt,
  faCircleNotch, faHourglassHalf, faExclamationCircle, faCheckCircle,
  faDownload, faCamera, faPencilAlt
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


const ImagenPerfil = (id, userParam, isEditingParam) => {
    const [newImageUrl, setNewImageUrl] = useState('');
    const [imagen, setImagen] = useState(null);
    const [isEditing, setIsEditing] = useState(isEditingParam);
    const [user, setUser] = useState(userParam);

    const handleEditClick = () => {
        setNewImageUrl(user.foto);
        setIsEditing(true);
      };
    
      const handleSaveClick = async () => {
        try {
          await axios.put(`http://localhost:8000/api/user/${id}`, { foto: newImageUrl });
          setUser({ ...user, foto: newImageUrl });
          setIsEditing(false);
        } catch (error) {
          console.error('Error al guardar la nueva URL:', error.response.data.error);
        }
      };
    
      const handleCancelClick = () => {
        setIsEditing(false);
        setNewImageUrl(user.foto);
      };

    useEffect(() => {
        // Lógica para obtener la información de la imagen desde el backend
        // Actualiza el estado 'imagen' con la información recibida
    }, []);

    return (
        <div className="image-container text-center mb-3">
            {isEditing ? (
                <InputGroup className="mb-1">
                    <FormControl
                        placeholder="Ingrese la URL de la foto de perfil"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                    />
                    <Button variant="success" onClick={handleSaveClick} className="me-2">Guardar</Button>
                    <Button variant="secondary" onClick={handleCancelClick}>Cancelar</Button>
                </InputGroup>
            ) : (
                <>
                    <Image src={user.foto} alt="Foto de perfil" roundedCircle className="img-fluid" />
                    <FontAwesomeIcon icon={faCamera} className="camera-icon" onClick={handleEditClick} />
                </>

            )}
        </div>
    );
};

export default ImagenPerfil;