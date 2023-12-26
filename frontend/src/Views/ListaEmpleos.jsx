import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, ListGroup, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import CabeceraUsuarioInicio from '../Components/Usuario/CabeceraUsuarioInicio';

const ListaEmpleos = () => {
    const [empleos, setEmpleos] = useState([]);
    const [postulacionesUsuario, setPostulacionesUsuario] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const { id: idUsuario } = useParams();

    useEffect(() => {
        const obtenerEmpleosYPostulaciones = async () => {
            try {
                // Obtener las postulaciones almacenadas en el almacenamiento local
                const postulacionesGuardadas = localStorage.getItem('postulacionesUsuario');
                const postulacionesGuardadasArray = postulacionesGuardadas ? JSON.parse(postulacionesGuardadas) : [];
                
                const respuestaEmpleos = await axios.get('http://localhost:8000/api/jobs');
                const empleosConEmpresa = await Promise.all(respuestaEmpleos.data.map(async (empleo) => {
                    const resEmpresa = await axios.get(`http://localhost:8000/api/company/${empleo.idEmpresa}`);
                    return { ...empleo, nombreEmpresa: resEmpresa.data.nombreEmpresa };
                }));
                setEmpleos(empleosConEmpresa);
    
                // Inicializar el estado con las postulaciones guardadas
                setPostulacionesUsuario(postulacionesGuardadasArray);
            } catch (error) {
                console.error('Error al obtener empleos o postulaciones:', error);
            }
        };
    
        obtenerEmpleosYPostulaciones();
    }, []);
    

    const yaPostulado = (idEmpleo) => {
        return postulacionesUsuario.some(postulacion => postulacion.idEmpleo === idEmpleo);
    };

    const handlePostularseClick = (idEmpleo) => {
        setSelectedJobId(idEmpleo);
        setShowModal(true);
    };

    const confirmarPostulacion = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/postulation/new', {
                idUsuario,
                idEmpleo: selectedJobId,
                estado: 'En Espera'
            });
            const nuevasPostulaciones = [...postulacionesUsuario, response.data.insertedPostulation];
            setPostulacionesUsuario(nuevasPostulaciones);
            
            // Guardar las postulaciones en el almacenamiento local
            localStorage.setItem('postulacionesUsuario', JSON.stringify(nuevasPostulaciones));
            
            setShowModal(false);
        } catch (error) {
            console.error('Error al realizar la postulación:', error);
        }
    };
    return (
        <div className='App'>
            <CabeceraUsuarioInicio />
            <h2>Empleos Disponibles</h2>
            <ListGroup>
                {empleos.map(empleo => (
                    <ListGroup.Item key={empleo._id}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Empleo en {empleo.idEmpresa?.nombreEmpresa || "Empresa no especificada"}</Card.Title>
                                <Card.Text><strong>Descripción:</strong> {empleo.descripcion}</Card.Text>
                                <Card.Text><strong>Conocimientos Requeridos:</strong> {empleo.conocimientos}</Card.Text>
                                <Card.Text><strong>Aptitudes Necesarias:</strong> {empleo.aptitudes}</Card.Text>
                                <Card.Text><strong>Número de Vacantes:</strong> {empleo.numeroVacantes}</Card.Text>
                                {yaPostulado(empleo._id) ? (
                                    <Button disabled>Ya Postulado</Button>
                                ) : (
                                    <div>
                                    <FontAwesomeIcon 
                                        icon={faPaperPlane} 
                                        onClick={() => handlePostularseClick(empleo._id)} 
                                        style={{ cursor: 'pointer' }}
                                    />
                                    <span> Postularse</span>
                                </div>
                                    
                                )}
                            </Card.Body>
                        </Card>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Postulación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que quieres postularte a este empleo?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={confirmarPostulacion}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ListaEmpleos;
