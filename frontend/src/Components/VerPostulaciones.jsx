import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, Button, Modal } from 'react-bootstrap';
import { faHourglass, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const VerPostulaciones = ({ idEmpleo,postulantes }) => {
    const [postulaciones, setPostulaciones] = useState([]);

    // Definir obtenerPostulaciones fuera de useEffect para que sea accesible en otros lugares
    const obtenerPostulaciones = async () => {
        try {
            const respuesta = await axios.get(`http://localhost:8000/api/postulation/job/${idEmpleo}`);
            setPostulaciones(respuesta.data);
        } catch (error) {
            console.error('Error al obtener postulaciones:', error);
        }
    };

    useEffect(() => {
        obtenerPostulaciones();
    }, [idEmpleo]);

    const actualizarEstadoPostulacion = async (idPostulacion, nuevoEstado) => {
        try {
            await axios.put(`http://localhost:8000/api/postulation/${idPostulacion}`, { estado: nuevoEstado });
            obtenerPostulaciones();
        } catch (error) {
            console.error('Error al actualizar el estado de la postulación:', error);
        }
    };

    return (
        <ListGroup>
            {postulantes.map(postulacion => (
                <ListGroup.Item key={postulacion._id}>
                    <div>Usuario: {postulacion.usuario && postulacion.usuario.nombre}</div>
                    <div>Estado: 
                        {postulacion.estado === 'en espera' && <FontAwesomeIcon icon={faHourglass} />}
                        {postulacion.estado === 'aceptada' && <FontAwesomeIcon icon={faCheckCircle} />}
                        {postulacion.estado === 'negada' && <FontAwesomeIcon icon={faTimesCircle} />}
                    </div>
                    <Button onClick={() => actualizarEstadoPostulacion(postulacion._id, 'aceptada')}>Aceptar</Button>
                    <Button onClick={() => actualizarEstadoPostulacion(postulacion._id, 'negada')}>Negar</Button>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default VerPostulaciones;
