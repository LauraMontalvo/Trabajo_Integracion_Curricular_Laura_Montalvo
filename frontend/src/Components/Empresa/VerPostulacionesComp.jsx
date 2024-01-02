import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, Button, Badge, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass, faCheckCircle, faTimesCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "../../Styles/Lista.scss"
// Estilo personalizado para los botones
const buttonStyle = {
    margin: '0 5px',
};

const VerPostulaciones = ({ idEmpleo, postulantes }) => {
    const [postulantesList, setPostulantesList] = useState(postulantes);

    useEffect(() => {
        // Utilizado para el seguimiento de cambios en postulantesList
        console.log(postulantesList);
    }, [idEmpleo, postulantesList]);

    const actualizarEstadoPostulacion = async (idPostulacion, nuevoEstado) => {
        try {
            await axios.put(`http://localhost:8000/api/postulation/${idPostulacion}`, { estado: nuevoEstado });
            setPostulantesList(prevPostulantes =>
                prevPostulantes.map(postulacion =>
                    postulacion._id === idPostulacion ? { ...postulacion, estado: nuevoEstado } : postulacion
                )
            );
        } catch (error) {
            console.error('Error al actualizar el estado de la postulación:', error);
        }
    };

    const renderEstado = (estado) => {
        const estados = {
            'En Espera': { icon: faHourglass, color: 'warning' },
            'Aceptada': { icon: faCheckCircle, color: 'success' },
            'Negada': { icon: faTimesCircle, color: 'danger' },
        };

        const { icon, color } = estados[estado] || {};
        return (
            <Badge bg={color} className="d-flex align-items-center">
                <FontAwesomeIcon icon={icon} className="me-2" />
                {estado}
            </Badge>
        );
    };
    return (
        <ListGroup>
            {postulantesList.map(postulacion => (
                <ListGroup.Item key={postulacion._id} className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div className="mb-2 mb-md-0 d-flex align-items-center">
                        <FontAwesomeIcon icon={faUser} className="me-2" />
                        <Link to={`/perfilUsuario/${postulacion.idUsuario?._id}`}>
                            {postulacion.idUsuario?.nombre} {postulacion.idUsuario?.apellido}
                        </Link>
                    </div>
                    <div className="mb-2 mb-md-0 text-center">
                        {renderEstado(postulacion.estado)}
                    </div>
                    <div>
                        <Button
                            variant="success"


                            onClick={() => actualizarEstadoPostulacion(postulacion._id, 'Aceptada')}
                            disabled={postulacion.estado === 'Aceptada' || postulacion.estado === 'Negada'}
                            style={buttonStyle}
                            className="ver-postulaciones-button"

                        >
                            Aceptar
                        </Button>
                        <Button
                            variant="danger"
                            className="ver-postulaciones-button"

                            onClick={() => actualizarEstadoPostulacion(postulacion._id, 'Negada')}
                            disabled={postulacion.estado === 'Aceptada' || postulacion.estado === 'Negada'}
                            style={buttonStyle}
                        >
                            Negar
                        </Button>
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default VerPostulaciones;
