import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, Button, Modal } from 'react-bootstrap';
import { faHourglass, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const VerPostulaciones = ({ idEmpleo, postulantes }) => {
    useEffect(() => {
        console.log(postulantes);
    }, [idEmpleo]);

    const actualizarEstadoPostulacion = async (idPostulacion, nuevoEstado) => {
        try {
            await axios.put(`http://localhost:8000/api/postulation/${idPostulacion}`, { estado: nuevoEstado });
        } catch (error) {
            console.error('Error al actualizar el estado de la postulación:', error);
        }
    };

    return (
        <ListGroup>
            {postulantes.map(postulacion => (
                <ListGroup.Item key={postulacion._id}>
                    <div>Usuario: {postulacion.idUsuario && postulacion.idUsuario.nombre}</div>
                    <div>Estado: 
                        {postulacion.estado === 'En Espera' && <FontAwesomeIcon icon={faHourglass} />}
                        {postulacion.estado === 'Aceptada' && <FontAwesomeIcon icon={faCheckCircle} />}
                        {postulacion.estado === 'Negada' && <FontAwesomeIcon icon={faTimesCircle} />}
                    </div>
                    <Button onClick={() => actualizarEstadoPostulacion(postulacion._id, 'Aceptada')}>Aceptar</Button>
                    <Button onClick={() => actualizarEstadoPostulacion(postulacion._id, 'Negada')}>Negar</Button>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default VerPostulaciones;
