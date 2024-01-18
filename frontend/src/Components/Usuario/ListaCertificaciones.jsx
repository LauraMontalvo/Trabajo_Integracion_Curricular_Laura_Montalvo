import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form, ListGroup, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faExternalLinkAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import EditarCertificacion from './EditarCertificaciones';

const ListaCertificaciones = ({ userId }) => {
    const [certificaciones, setCertificaciones] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [url, setUrl] = useState('');
    const [fechaExpedicion, setFechaExpedicion] = useState('');
    const [certificacionAEditar, setCertificacionAEditar] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [certificacionAEliminar, setCertificacionAEliminar] = useState(null);

    // Agrega las funciones handleEdit y handleDelete en tu componente
    const handleEdit = (certificacion) => {
        setCertificacionAEditar(certificacion);
        setShowEditModal(true); // Abre el modal de edición
    };
    const handleDelete = (certificacionId) => {
        setCertificacionAEliminar(certificacionId);
        setShowDeleteModal(true);
    };
    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/certification/${certificacionAEliminar}`);
            setCertificaciones(certificaciones.filter(cert => cert._id !== certificacionAEliminar));
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error al eliminar la certificación:', error);
        }
    };
    // Función para actualizar la lista de certificaciones después de editar
    const actualizarCertificacion = (certificacionActualizada) => {
        setCertificaciones(certificaciones.map((cert) => cert._id === certificacionActualizada._id ? certificacionActualizada : cert));
    };
    useEffect(() => {
        const cargarCertificaciones = async () => {
            // Llamada a la API para obtener las certificaciones del usuario
            try {
                const response = await axios.get(`http://localhost:8000/api/certification/user/${userId}`);
                setCertificaciones(response.data);
            } catch (error) {
                console.error('Error al cargar certificaciones:', error);
            }
        };

        cargarCertificaciones();
    }, [userId]);

    const handleAgregarCertificacion = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/certification/new', {
                titulo,
                url,
                idUsuario: userId,
                fechaExpedicion
            });

            setCertificaciones([...certificaciones, response.data.insertedCertification]);
            setShowModal(false);
        } catch (error) {
            console.error('Error al agregar certificación:', error);
        }
    };
    const truncateUrl = (url) => {
        const maxChar = 30;
        return url.length > maxChar ? url.substring(0, maxChar) + '...' : url;
    };
    return (
        <>
            <ListGroup className="empleos-lista">
                <h3>Certificaciones</h3>
                {certificaciones.map((certificacion) => (
                    <ListGroup.Item key={certificacion._id} className="mt-4 border p-3 position-relative">
                        <strong>Titulo Obtenido en la Certificación:</strong><p>{certificacion.titulo}-  <a href={certificacion.url} target="_blank" rel="noopener noreferrer" className="certificacion-url">
                            {truncateUrl(certificacion.url)}
                            <FontAwesomeIcon icon={faExternalLinkAlt} size="sm" />
                        </a></p>

                        <strong className="certificacion-fecha">
                            Fecha de Expedición:
                        </strong> {new Date(certificacion.fechaExpedicion).toLocaleDateString()}

                        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                            <FontAwesomeIcon icon={faEdit} className="text-primary mr-2" style={{ cursor: 'pointer', fontSize: '1.5em', marginRight: '15px' }} onClick={() => handleEdit(certificacion)} />
                            <FontAwesomeIcon icon={faTrashAlt}
                                className="text-danger"
                                style={{ cursor: 'pointer', fontSize: '1.5em' }}
                                onClick={() => handleDelete(certificacion._id)} />
                        </div>



                    </ListGroup.Item>
                ))}
            </ListGroup>
            <Card.Body className="text-center">
                <Button variant="primary" onClick={() => setShowModal(true)}>Agregar Certificación</Button>
            </Card.Body>

            {certificacionAEditar && (
                <EditarCertificacion
                    show={showEditModal}
                    handleClose={() => setShowEditModal(false)}
                    certificacion={certificacionAEditar}
                    actualizarCertificacion={actualizarCertificacion}
                />
            )}
            {/* Modal para nueva certificación */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Certificación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="mi-formulario">
                        <Form.Group>
                            <Form.Label>Título Obtenido en la Certificación</Form.Label>
                            <Form.Control
                                type="text"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>URL</Form.Label>
                            <Form.Control
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Fecha de Expedición</Form.Label>
                            <Form.Control
                                type="date"
                                value={fechaExpedicion}
                                onChange={(e) => setFechaExpedicion(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleAgregarCertificacion}>
                        Agregar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar esta certificación?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ListaCertificaciones;
