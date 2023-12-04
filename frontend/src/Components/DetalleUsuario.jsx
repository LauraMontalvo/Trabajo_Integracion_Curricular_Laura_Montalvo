import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import {
  Button, Image, InputGroup, FormControl, Row, Col, Modal, Form, Tab, Tabs, ListGroup, Card,
  Container
} from 'react-bootstrap';
import EditarUsuario from '../Views/EditarUsuario.jsx';
import "../Styles/loginstyle.css"
import "../Styles/detalle.scss"
import ExperieciaLaboral from '../Views/ExperienciaLaboral.jsx';
import CabeceraRegistrar from './CabeceraRegistrar.jsx';
import CabeceraUsuarioInicio from './CabeceraUsuarioInicio.jsx';
function DetalleUsuario(props) {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [acadTraining, setAcadTraining] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [tituloObtenido, setTituloObtenido] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [editingAcadTrainingId, setEditingAcadTrainingId] = useState(null);
  const navigate = useNavigate();
  const [edad, setEdad] = useState(null);
  const [institucion, setInstitucion] = useState('');
  const [showAcadTrainingModal, setShowAcadTrainingModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteAcadTrainingId, setDeleteAcadTrainingId] = useState(null);
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [isEditingExperience, setIsEditingExperience] = useState(false);


  const handleShowDeleteModal = (id) => {
    setDeleteAcadTrainingId(id);
    setShowDeleteModal(true);
  };
  const showExperienceForm = (isEditing = false) => {
    setIsEditingExperience(isEditing);
    setShowExperienceModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteAcadTrainingId(null);
  };
  const confirmDelete = () => {
    if (deleteAcadTrainingId) {
      handleDeleteAcadTraining(deleteAcadTrainingId);
      handleCloseDeleteModal();
    }
  };


  // Estados y manejadores para el modal de editar usuario
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const handleShowEditUserModal = () => setShowEditUserModal(true);
  const handleCloseEditUserModal = () => setShowEditUserModal(false);
  const handleSelect = (k) => setActiveTab(k);

  // Tienes que definir un estado para la pestaña activa
  const [activeTab, setActiveTab] = useState('personal');
  const recargarInformacionUsuario = () => {
    axios.get(`http://localhost:8000/api/user/${id}`)
      .then((res) => {
        setUser({ ...res.data });
        const fechaNac = new Date(res.data.fechaNacimiento);
        const hoy = new Date();
        const edadCalculada = hoy.getFullYear() - fechaNac.getFullYear();

        // Ajusta la edad si aún no ha llegado el cumpleaños
        if (
          hoy.getMonth() < fechaNac.getMonth() ||
          (hoy.getMonth() === fechaNac.getMonth() && hoy.getDate() < fechaNac.getDate())
        ) {
          setEdad(edadCalculada - 1);
        } else {
          setEdad(edadCalculada);
        }
        // ... resto del código para calcular la edad, etc. ...
      })
      .catch((err) => console.log(err));
  };


  useEffect(() => {
    axios.get(`http://localhost:8000/api/user/${id}`)
      .then((res) => {
        setUser({ ...res.data });

        const fechaNac = new Date(res.data.fechaNacimiento);
        const hoy = new Date();
        const edadCalculada = hoy.getFullYear() - fechaNac.getFullYear();

        // Ajusta la edad si aún no ha llegado el cumpleaños
        if (
          hoy.getMonth() < fechaNac.getMonth() ||
          (hoy.getMonth() === fechaNac.getMonth() && hoy.getDate() < fechaNac.getDate())
        ) {
          setEdad(edadCalculada - 1);
        } else {
          setEdad(edadCalculada);
        }

        // Resto del código...

        // Llama a recargarInformacionUsuario aquí después de obtener la fecha de nacimiento
        recargarInformacionUsuario();
      })
      .catch((err) => console.log(err));


    axios.get(`http://localhost:8000/api/acadTrainings/user/${id}`)
      .then((res) => setAcadTraining(res.data))
      .catch((err) => console.log(err));
  }, [id]);

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
    setNewImageUrl('');
  };

  const handleShowAcadTrainingModal = (acadTrainingId = null) => {
    setShowAcadTrainingModal(true);

    if (acadTrainingId) {
      // Si se proporciona un acadTrainingId, significa que estamos editando una formación existente.
      const selectedAcadTraining = acadTraining.find((item) => item._id === acadTrainingId);

      if (selectedAcadTraining) {
        // Establecer los estados con los valores de la formación académica seleccionada.
        setTituloObtenido(selectedAcadTraining.tituloObtenido);
        setFechaInicio(selectedAcadTraining.fechaInicio);
        setFechaFin(selectedAcadTraining.fechaFin);
        setEditingAcadTrainingId(acadTrainingId); // Guarda el ID para uso en la edición
      }
    } else {
      // Si no se proporciona acadTrainingId, se está agregando una nueva formación.
      setTituloObtenido('');
      setFechaInicio('');
      setFechaFin('');
      setEditingAcadTrainingId(null); // No hay un ID específico en este caso
    }
  };
  const handleCloseAcadTrainingModal = () => {
    setShowAcadTrainingModal(false);
    setEditingAcadTrainingId(null);
    setTituloObtenido('');
    setFechaInicio('');
    setFechaFin('');
  };

  const handleAddAcadTraining = async () => {
    try {
      if (editingAcadTrainingId) {
        // Si editingAcadTrainingId está definido, significa que estamos editando
        await axios.put(`http://localhost:8000/api/acadTraining/${editingAcadTrainingId}`, {
          tituloObtenido,
          fechaInicio,
          fechaFin,
        });

        // Limpiar el estado de edición
        setEditingAcadTrainingId(null);
      } else {
        // Si no hay editingAcadTrainingId, significa que estamos agregando nuevo
        await axios.post('http://localhost:8000/api/acadTraining/new', {
          idInstitucion: 'institucion', // Reemplaza con el ID de la institución
          idUsuario: id,
          tituloObtenido,
          fechaInicio,
          fechaFin,
        });
      }

      // Recargar la información académica después de agregar o editar
      const response = await axios.get(`http://localhost:8000/api/acadTrainings/user/${id}`);
      setAcadTraining(response.data);

      // Cerrar la ventana modal
      handleCloseAcadTrainingModal();
    } catch (error) {
      console.error('Error al agregar/editar datos académicos:', error.response.data.error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };
  const handleDeleteAcadTraining = async (acadTrainingId) => {
    try {
      await axios.delete(`http://localhost:8000/api/acadTraining/${acadTrainingId}`);
      const updatedAcadTrainings = acadTraining.filter(item => item._id !== acadTrainingId);
      setAcadTraining(updatedAcadTrainings);
    } catch (error) {
      console.error(error.response.data.error);
    }
  };
  return (
    <div className='App'>
      <CabeceraUsuarioInicio />
      <Container className="mt-4">
        <Row>
          <Col md={4}>
            {/* Información del usuario */}
            <Card>
              <Card.Body>
                <div>
                  <div className="image-container text-center mb-3">
                    {/* ... Botón y modal para editar la foto ... */}
                    {isEditing ? (
                      <InputGroup className="mb-1">
                        <FormControl
                          placeholder="Ingrese la URL de la foto de perfil"
                          value={newImageUrl}
                          onChange={(e) => setNewImageUrl(e.target.value)}
                        />
                      </InputGroup>
                    ) : (
                      <div className="image-container ">
                        <Image src={user.foto} alt="Foto de perfil" roundedCircle className="img-fluid" />
                      </div>
                    )}

                    {isEditing ? (
                      <div>
                        <Button variant="success" onClick={handleSaveClick} className="me-2">
                          Guardar
                        </Button>
                        <Button variant="secondary" onClick={handleCancelClick}>
                          Cancelar
                        </Button>
                      </div>
                    ) : (
                      <Button variant="outline-info" onClick={handleEditClick}>
                        <i className="fas fa-pencil-alt"></i> Editar Foto
                      </Button>
                    )} </div>
                </div>
                <hr className="d-md-none" /> {/* Esta línea solo se muestra en pantallas pequeñas */}

                <ListGroup variant="flush">
                  {/* ... Listado de datos personales del usuario ... */}
                  <h3 className="bienvenido-titulo">Datos Personales</h3>
                  <p>Nombre: {user.nombre} {user.apellido}</p>
                  <p>Género: {user.sexo}</p>
                  <p>Fecha de Nacimiento:{formatDate(user.fechaNacimiento)}</p>
                  <p>Teléfono: {user.telefono}</p>
                  <p>Edad: {edad !== null ? `${edad} años` : ''}</p>
                  <FontAwesomeIcon icon={faEdit} className="edit-icon" onClick={handleShowEditUserModal} style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '1.5em', cursor: 'pointer' }} />
                  <Modal show={showEditUserModal} onHide={handleCloseEditUserModal} size="lg">
                    <Modal.Header closeButton>
                      <Modal.Title className='tituloModal' >Editar Usuario</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <EditarUsuario onActualizar={recargarInformacionUsuario} />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseEditUserModal}>
                        Cerrar
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </ListGroup>

              </Card.Body>

            </Card>
            <div className="botones-centrados">
              <Button variant="danger" onClick={() => navigate("/loginusuario")}>
                Salir
              </Button>
            </div>

          </Col>
          <Col md={8}>
            {/* Pestañas para información académica y laboral */}
            <Tabs defaultActiveKey="academic" id="info-tab" className="mb-3">
              <Tab eventKey="academic" title="Información Académica">
                <Card>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <h3>Información Académica</h3>
                      {acadTraining.map((item) => (
                        <div key={item._id} className="mt-4 border p-3">
                          <p>Título obtenido: {item.tituloObtenido}</p>
                          <p>Fecha de inicio: {formatDate(item.fechaInicio)}</p>
                          <p>Fecha de fin: {formatDate(item.fechaFin)}</p>
                          <Button
                            variant="primary"
                            onClick={() => handleShowAcadTrainingModal(item._id)}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleShowDeleteModal(item._id)}

                          >
                            Eliminar
                          </Button>
                          <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                            <Modal.Header closeButton>
                              <Modal.Title>Confirmar Eliminación</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              ¿Estás seguro de que deseas eliminar esta formación académica?
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleCloseDeleteModal}>
                                Cancelar
                              </Button>
                              <Button variant="danger" onClick={confirmDelete}>
                                Eliminar
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </div>
                      ))}                  </ListGroup>
                    <Button variant="primary" onClick={handleShowAcadTrainingModal} className="mt-3">
                      Agregar
                    </Button>
                    <Modal show={showAcadTrainingModal} onHide={handleCloseAcadTrainingModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>{editingAcadTrainingId ? 'Editar' : 'Agregar'} Información Académica</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group controlId="formTitulo">
                            <Form.Label>Título obtenido</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Ingrese el título obtenido"
                              value={tituloObtenido}
                              onChange={(e) => setTituloObtenido(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group controlId="formTitulo">
                            <Form.Label>Institucion</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Ingrese Institucion"
                              value={institucion}
                              onChange={(e) => setInstitucion(e.target.value)}
                            />
                          </Form.Group>

                          <Form.Group controlId="formFechaInicio">
                            <Form.Label>Fecha de inicio</Form.Label>
                            <Form.Control
                              type="date"
                              value={fechaInicio}
                              onChange={(e) => setFechaInicio(e.target.value)}
                            />
                          </Form.Group>

                          <Form.Group controlId="formFechaFin">
                            <Form.Label>Fecha de fin</Form.Label>
                            <Form.Control
                              type="date"
                              value={fechaFin}
                              onChange={(e) => setFechaFin(e.target.value)}
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseAcadTrainingModal}>
                          Cerrar
                        </Button>
                        <Button variant="primary" onClick={handleAddAcadTraining}>
                          {editingAcadTrainingId ? 'Guardar Cambios' : 'Agregar'}
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Card.Body>
                </Card>
              </Tab>
              <Tab eventKey="laboral" title="Experiencia Laboral">
                <Card>
                  <Card.Body>
                    {/* ... Contenido de experiencia laboral ... */}
                    <Button variant="primary" onClick={() => showExperienceForm()}>Agregar Experiencia Laboral</Button>
                    <Modal show={showExperienceModal} onHide={() => setShowExperienceModal(false)}>
                      <Modal.Header closeButton>
                        <Modal.Title className='tituloModal'>{isEditingExperience ? 'Editar Experiencia Laboral' : 'Agregar Experiencia Laboral'}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <ExperieciaLaboral />
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowExperienceModal(false)}>
                          Cerrar
                        </Button>
                        {/* Agrega un botón para guardar la experiencia laboral aquí */}
                      </Modal.Footer>
                    </Modal>

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


export default DetalleUsuario;