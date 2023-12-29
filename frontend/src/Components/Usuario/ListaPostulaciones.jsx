import React from 'react';
import { ListGroup, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTrashAlt, faHourglass, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import "../../Styles/loginstyle.css"
import "../../Styles/detalle.scss"
import DetalleEmpleoPostuladoModal from './DetalleEmpleoPostuladoModal'; // Asegúrate de que la ruta sea correcta

const ListaPostulaciones = ({
    postulaciones,
    handleShowModal,
    eliminarPostulacion,
    showModal,
    setShowModal,
    empleoSeleccionado
}) => {
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
    return (
        <>
            {postulaciones.length > 0 ? (
                <ListGroup className="empleos-lista">
                    {postulaciones.map((postulacion) => (
                        <ListGroup.Item key={postulacion._id} className="mt-4 border p-3 position-relative">
                            <Row>
                                <Col>
                                    <div className="empleo-detalle">
                                        <span>
                                            <strong>Empresa:</strong>{" "}
                                            <Link to={`/perfil-empresa/${postulacion.idEmpleo?.idEmpresa?._id}`}>
                                                {postulacion.idEmpleo?.idEmpresa?.nombreEmpresa}
                                            </Link>
                                            <FontAwesomeIcon
                                                icon={faInfoCircle}
                                                className="icon-button"
                                                onClick={() => handleShowModal(postulacion.idEmpleo)}
                                                style={{
                                                    cursor: 'pointer',
                                                    marginLeft: '10px',
                                                    fontSize: '1.5em',
                                                    verticalAlign: 'middle',
                                                }} />
                                        </span>
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
                                    onClick={() => eliminarPostulacion(postulacion._id)}
                                />
                            </div>
                        </ListGroup.Item>
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
        </>
    );
};

export default ListaPostulaciones;
