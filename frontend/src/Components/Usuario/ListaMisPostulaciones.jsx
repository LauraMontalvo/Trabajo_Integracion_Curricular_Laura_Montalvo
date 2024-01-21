import React, { useState } from 'react';

import { ListGroup, Row, Col, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTrashAlt, faHourglass, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import "../../Styles/loginstyle.css"
import "../../Styles/detalle.scss"
import DetalleEmpleoPostuladoModal from './DetalleEmpleoPostuladoModal'; // Asegúrate de que la ruta sea correcta
import axios from 'axios';
const ListaMisPostulaciones = ({
    postulaciones,
    handleShowModal,
    eliminarPostulacion,
    showModal,
    setShowModal,
    empleoSeleccionado,
    actualizarEstadoPostulacion, // Usa esta función para actualizar el estado

}) => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedPostulacionId, setSelectedPostulacionId] = useState(null);
    const handleConfirmInactivar = (idPostulacion) => {
        setSelectedPostulacionId(idPostulacion);
        setShowConfirmModal(true);
    };
    
    const renderEstadoIcono = (estado) => {
        switch (estado) {
            case 'En Espera':
                return <FontAwesomeIcon icon={faHourglass} className="icono-en-espera" />;
            case 'Aceptada':
                return <FontAwesomeIcon icon={faCheckCircle} className="icono-aceptada" />;
            case 'Negada':
                return <FontAwesomeIcon icon={faTimesCircle} className="icono-negada" />;
            default:
                return null;
        }
    };
    const inactivarPostulacion = async () => {
        if (selectedPostulacionId) {
            try {
                await axios.put(`http://localhost:8000/api/postulation/${selectedPostulacionId}`, {
                    estadoPostulacion: 'Inactivo'
                });
                actualizarEstadoPostulacion(selectedPostulacionId, 'Inactivo');
                setShowConfirmModal(false);
            } catch (error) {
                console.error('Error al inactivar postulación:', error);
            }
        }
    };
    const postulacionesActivas = postulaciones.filter((postulacion) => 
    postulacion.estadoPostulacion !== 'Inactivo' && postulacion.idEmpleo.estado === 'Activo'
);
    return (
        <>
            {postulaciones.length > 0 ? (
                <ListGroup className="empleos-lista">
                    {postulacionesActivas.map((postulacion) => (
                        postulacion.estadoPostulacion !== 'Inactivo' && (
                            <ListGroup.Item key={postulacion._id} className="mt-4 border p-3 position-relative">
                                <Row>
                                    <Col>
                                        <div className="empleo-detalle">
                                            <strong>Empresa:</strong>{" "}
                                            <Link to={`/perfil-empresa/${postulacion.idEmpleo?.idEmpresa?._id}`}>
                                                {postulacion.idEmpleo?.idEmpresa?.nombreEmpresa}
                                            </Link>                                            <FontAwesomeIcon
                                                icon={faInfoCircle}
                                                className="icon-button"
                                                onClick={() => handleShowModal(postulacion.idEmpleo)}
                                            />
                                        </div>
                                    </Col>
                                    <Col>
                                    <div className="empleo-detalle">
                                        <span>
                                            <strong>Estado:</strong> {postulacion.estado}
                                            <strong> {renderEstadoIcono(postulacion.estado)}</strong>

                                        </span>
                                    </div>
                                    </Col>
                                </Row>
                                <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                    <FontAwesomeIcon
                                        icon={faTrashAlt}
                                        className="text-danger"
                                        style={{ cursor: 'pointer', fontSize: '1.5em' }}
                                        onClick={() => handleConfirmInactivar(postulacion._id)}

                                    />
                                </div>

                            </ListGroup.Item>
                        )
                    ))}
                </ListGroup>
            ) : (
                <p>No tienes postulaciones.</p>
            )}
            <DetalleEmpleoPostuladoModal
                show={showModal}
                onHide={() => setShowModal(false)}
                empleo={empleoSeleccionado}
            />
            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Inactivación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar esta postulación?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={inactivarPostulacion}>
                        Inactivar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ListaMisPostulaciones;
