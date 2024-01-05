import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, ListGroup, Image, Container, Row, Col, Tab, Tabs } from 'react-bootstrap';
import CabeceraEmpresaInicioComp from '../../Components/Empresa/CabeceraEmpresaInicioComp';
import ImagenPerfil from '../../Components/General/ImagenPerfil';
import defaultImage from '../../img/imagenUsuarioDefecto.png';

function PerfilUsuario() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [acadTraining, setAcadTraining] = useState([]);
    const [experienciaLaboral, setExperienciaLaboral] = useState([]);
    const [imagenPreview, setImagenPreview] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get(`http://localhost:8000/api/user/${id}`);
                setUser(userResponse.data);

                const acadResponse = await axios.get(`http://localhost:8000/api/acadTrainings/user/${id}`);
                setAcadTraining(acadResponse.data);

                const expResponse = await axios.get(`http://localhost:8000/api/workExperiences/user/${id}`);
                setExperienciaLaboral(expResponse.data);

                 // Obtener la foto del usuario
            const fotoResponse = await axios.get(`http://localhost:8000/api/user/foto/${id}`);
            if (fotoResponse.data && fotoResponse.data.foto) {
                setImagenPreview(fotoResponse.data.foto);
            }
            } catch (error) {
                console.error('Error al cargar los datos:', error);
            }
        };

        fetchUserData();
    }, [id]);

    const calcularEdad = (fechaNacimiento) => {
        if (!fechaNacimiento) return '';

        const hoy = new Date();
        const nacimiento = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }

        return edad;
    };
    if (!user) {
        return <div>Cargando...</div>;
    }
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };
    
    return (
        <div className='App'><CabeceraEmpresaInicioComp />

            <Container className="mt-4">
                <Row>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <div className="image-container text-center mb-3">
                                <Image src={user.foto || imagenPreview || defaultImage} alt="Foto de perfil" roundedCircle className="img-fluid" />
                                </div>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Nombre: {user.nombre} {user.apellido}</ListGroup.Item>
                                    <ListGroup.Item>Género: {user.sexo}</ListGroup.Item>
                                    <ListGroup.Item>Fecha de Nacimiento: {formatDate(user.fechaNacimiento)}</ListGroup.Item>
                                    <ListGroup.Item>Teléfono: {user.telefono}</ListGroup.Item>
                                    <ListGroup.Item>Edad: {calcularEdad(user.fechaNacimiento)} años</ListGroup.Item>
                           
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={8}>
                        <Tabs defaultActiveKey="academic" id="info-tab" className="mb-3">
                            <Tab eventKey="academic" title="Información Académica">
                                <Card>
                                    <Card.Body>
                                        {acadTraining.length > 0 ? (
                                            acadTraining.map((item) => (
                                                <div key={item._id} className="mb-4 p-3 border rounded">
                                                    <h5 className="mb-2">{item.tituloObtenido}</h5>
                                                    <p className="mb-1"><strong>Institución:</strong> {item.idInstitucion?.nombreInstitucion || 'No disponible'}</p>
                                                    <p className="mb-1"><strong>Fecha de Inicio:</strong> {formatDate(item.fechaInicio)}</p>
                                                    <p><strong>Fecha de Fin:</strong> {formatDate(item.fechaFin)}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No se ha registrado formación académica.</p>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Tab>
                            <Tab eventKey="laboral" title="Experiencia Laboral">
                                <Card>
                                    <Card.Body>
                                        {experienciaLaboral.length > 0 ? (
                                            experienciaLaboral.map((exp) => (
                                                <div key={exp._id} className="mb-4 p-3 border rounded">
                                                    <h5 className="mb-2">{exp.empresa} - puesto {exp.puesto}</h5>
                                                    <p className="mb-1"><strong>Descripción de Responsabilidades:</strong> {exp.descripcionResponsabilidades}</p>
                                                    <p className="mb-1"><strong>Ámbito Laboral/Departamento:</strong> {exp.ambitoLaboral}</p>
                                                    <p className="mb-1"><strong>Fecha de Inicio:</strong> {formatDate(exp.fechaInicio)}</p>
                                                    <p><strong>Fecha de Fin:</strong> {formatDate(exp.fechaFin)}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No hay experiencia laboral registrada.</p>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Tab>

                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </div>

    );
}

export default PerfilUsuario;
