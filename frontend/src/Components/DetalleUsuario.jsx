import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';

function DetalleUsuario(props) {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  //para la foto
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user/${id}`)
      .then((res) => setUser({ ...res.data }))
      .catch((err) => console.log(err));
  }, [id]);

  const handleEditClick = () => {
    setNewImageUrl(user.foto);
  setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      // Realizar la llamada a la API para guardar la nueva URL en el servidor
      await axios.put(`http://localhost:8000/api/user/${id}`, { foto: newImageUrl });

      // Actualizar el estado local con la nueva URL
      setUser({ ...user, foto: newImageUrl });
      setIsEditing(false);
    } catch (error) {
      console.error('Error al guardar la nueva URL:', error.response.data.error);
      // Manejar el error según las necesidades
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewImageUrl('');
  };

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div style={styles.container}>
      <div style={styles.infoBox}>
        <div style={styles.imageContainer}>
          {isEditing ? (
            <input
              type="text"
              placeholder="Ingrese la URL de la foto de perfil"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
            />
          ) : (
            <img src={user.foto} alt="Foto de perfil" style={styles.profileImage} />
          )}
        </div>

        {isEditing ? (
          <div>
            <button onClick={handleSaveClick}>Guardar</button>
            <button onClick={handleCancelClick}>Cancelar</button>
          </div>
        ) : (
          <button onClick={handleEditClick}>Editar Foto</button>
        )}

        <div><h3>Bienvenido a ChavezEmpleo</h3></div>
        <div style={styles.userInfo}>
          <p>Nombre: {user.nombre} {user.apellido}</p>
          <p>Género: {user.sexo}</p>
          <p>Fecha de Nacimiento: {formatDate(user.fechaNacimiento)}</p>
          <p>Teléfono: {user.telefono}</p>
        </div>
        <div>
          <button   onClick={e=>navigate("/usuario")} >Salir</button>

        </div>
                       
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    height: '90vh', // Ajusta según tus necesidades
    
  },
  infoBox: {
    textAlign: 'center',
    border: '3px solid rgb(19, 18, 18)',
    padding: '20px',
    borderRadius: '70px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  imageContainer: {
    width: '100px',
    height: '100px',
    overflow: 'hidden',
    borderRadius: '50%',
    margin: '0 auto',
    marginBottom: '10px',
    border: '2px solid black', // Agrega un borde negro de 2px alrededor del círculo
  },

  profileImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  userInfo: {
    marginTop: '50px',
  },
};

export default DetalleUsuario;
