import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faGraduationCap, faTrashAlt, faInfoCircle, faCalendarAlt, faCircleNotch, faHourglassHalf, faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import {
  Button, Image, InputGroup, FormControl, Row, Col, Modal, Form, Tab, Tabs, ListGroup, Card,
  Container
} from 'react-bootstrap';

import EditarUsuario from '../EditarUsuario.jsx';
import "../../Styles/loginstyle.css"
import "../../Styles/detalle.scss"
import ExperieciaLaboral from '../../Components/ExperienciaLaboral.jsx';
import CabeceraUsuarioInicio from '../../Components/Usuario/CabeceraUsuarioInicio.jsx';
import Select from 'react-select/creatable';
import EditarExperienciaLaboral from '../../Components/EditarExperienciaLaboralComp.jsx';

const CampoEstado = ({ valido, mensajeError }) => {
  if (mensajeError) {
    return <FontAwesomeIcon icon={faExclamationCircle} className="text-danger" />;
  } else if (valido) {
    return <FontAwesomeIcon icon={faCheckCircle} className="text-success" />;
  } else {
    return null; // No muestra nada si el campo aún no ha sido validado
  }
};

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
  const [institucion, setInstitucion] = useState(null);
  const [showAcadTrainingModal, setShowAcadTrainingModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteAcadTrainingId, setDeleteAcadTrainingId] = useState(null);
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [instituciones, setInstituciones] = useState([]);
  const [experienciaLaboral, setexperienciaLaboral] = useState([]);
  const [institucionSeleccionada, setInstitucionSeleccionada] = useState(null);
  ///
  const [tituloObtenidoError, setTituloObtenidoError] = useState('');
  const [institucionError, setInstitucionError] = useState('');
  const [fechaInicioError, setFechaInicioError] = useState('');
  const [fechaFinError, setFechaFinError] = useState('');
  // ... otros estados ...
  const [showEditExperienceModal, setShowEditExperienceModal] = useState(false);
  const [editingExperienceId, setEditingExperienceId] = useState(null);

  ///

  //Eliminar exoe laboral
  const [showDeleteExperienceModal, setShowDeleteExperienceModal] = useState(false);
  const [deleteExperienceId, setDeleteExperienceId] = useState(null);


  //POSTULACIONES y modal de empleo
  const [postulaciones, setPostulaciones] = useState([]);
  const [empleoSeleccionado, setEmpleoSeleccionado] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = (empleo) => {
    console.log('Empleo seleccionado:', empleo);
    setEmpleoSeleccionado(empleo);
    setShowModal(true);
  };

  const eliminarPostulacion = async (idPostulacion) => {
    try {
      await axios.delete(`http://localhost:8000/api/postulation/${idPostulacion}`);
      // Filtra para eliminar la postulación del estado
      const postulacionesActualizadas = postulaciones.filter(postulacion => postulacion._id !== idPostulacion);
      setPostulaciones(postulacionesActualizadas);
    } catch (error) {
      console.error('Error al eliminar postulación:', error);
    }
  };
  ///////////////////

  ///

  const handleShowDeleteExperienceModal = (id) => {
    setDeleteExperienceId(id);
    setShowDeleteExperienceModal(true);
  };
  const handleCloseDeleteExperienceModal = () => {
    setShowDeleteExperienceModal(false);
    setDeleteExperienceId(null);
  };
  const confirmDeleteExperience = async () => {
    if (deleteExperienceId) {
      try {
        await axios.delete(`http://localhost:8000/api/workExperience/${deleteExperienceId}`);
        // Aquí actualizarías el estado para reflejar la eliminación
        cargarExperienciaLaboral(); // Suponiendo que esta función recarga la experiencia laboral
        handleCloseDeleteExperienceModal();
      } catch (error) {
        console.error('Error al eliminar experiencia laboral', error);
      }
    }
  };

  const handleEditExperienceClick = (experienceId) => {
    setEditingExperienceId(experienceId);
    setShowEditExperienceModal(true);
  };

  //
  const validarTituloObtenido = () => {
    if (!tituloObtenido.trim()) {
      setTituloObtenidoError('El título obtenido es obligatorio.');
      return false;
    }
    setTituloObtenidoError('');
    return true;
  };

  const validarFechas = () => {
    let valido = true;
    if (!fechaInicio) {
      setFechaInicioError('La fecha de inicio es obligatoria.');
      valido = false;
    } else {
      setFechaInicioError('');
    }

    if (!fechaFin) {
      setFechaFinError('La fecha de fin es obligatoria.');
      valido = false;
    } else if (fechaFin < fechaInicio) {
      setFechaFinError('La fecha de fin no puede ser anterior a la fecha de inicio.');
      valido = false;
    } else {
      setFechaFinError('');
    }

    return valido;
  };
  const validarInstitucion = () => {
    if (!institucion || !institucion.value) {
      setInstitucionError('La selección de una institución es obligatoria.');
      return false;
    }
    setInstitucionError('');
    return true;
  };

  // ... validaciones adicionales si son necesarias ...

  //
  const esCampoValido = (valor, error) => {
    return valor !== '' && error === '';
  };


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
      })
      .catch((err) => console.log(err));
  };

  function toShortDateFormat(dateString) {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  const cargarExperienciaLaboral = () => {
    axios.get(`http://localhost:8000/api/workExperiences/user/${id}`)
      .then((res) => {
        setexperienciaLaboral(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const cargarPostulaciones = async () => {
      try {
        console.log("POSTULACIONES")
        console.log(id)
        const response = await axios.get(`http://localhost:8000/api/postulations/user/${id}`);
        console.log(response);

        setPostulaciones(response.data);
      } catch (error) {
        console.error('Error al cargar postulaciones:', error);
      }
    };

    cargarPostulaciones();

    axios.get(`http://localhost:8000/api/user/${id}`)
      .then((res) => {
        setUser({ ...res.data });


        recargarInformacionUsuario();
      })
      .catch((err) => console.log(err));


    axios.get(`http://localhost:8000/api/acadTrainings/user/${id}`)
      .then((res) => {
        setAcadTraining(res.data);
      })
      .catch((err) => console.log(err));

    cargarInstituciones();
    cargarExperienciaLaboral();
  }, [id]);

  const cargarInstituciones = () => {
    axios.get('http://localhost:8000/api/schools').then(res => setInstituciones(res.data)).catch(err => console.log(err));
  }

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
        console.log(selectedAcadTraining)
        console.log(instituciones)
        // Establecer los estados con los valores de la formación académica seleccionada.
        setInstitucionSeleccionada(selectedAcadTraining.idInstitucion)
        setTituloObtenido(selectedAcadTraining.tituloObtenido);
        setFechaInicio(toShortDateFormat(selectedAcadTraining.fechaInicio));
        setFechaFin(toShortDateFormat(selectedAcadTraining.fechaFin));
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
    setInstitucion('')
  };

  const handleInstitucion = (institucionCarga) => {
    console.log(institucion)
    setInstitucion(institucionCarga);
    setInstitucionSeleccionada(null);
    console.log(institucion)
  }

  const cargaInstitucion = (institucionCarga) => {
    setInstitucion(institucionCarga);
  }

  const handleAddAcadTraining = async () => {
    const esTituloValido = validarTituloObtenido();
    const sonFechasValidas = validarFechas();
    const esInstitucionValida = validarInstitucion();

    if (!esTituloValido || !sonFechasValidas || !esInstitucionValida) {
      // No continuar si hay errores
      return;
    }

    try {
      let esNuevaInstitucion = false;
      let institucionCarga;
      if (institucion && !instituciones.find(inst => inst.nombreInstitucion === institucion.label)) {
        esNuevaInstitucion = true;
        const response = await axios.post('http://localhost:8000/api/school/new', { nombreInstitucion: institucion.label })
        institucionCarga = {
          label: response.data.insertedSchool.nombreInstitucion,
          value: response.data.insertedSchool._id
        };

        console.log(institucionCarga)
        cargaInstitucion(institucionCarga)

        cargarInstituciones();
      }


      if (editingAcadTrainingId) {
        // Si editingAcadTrainingId está definido, significa que estamos editando
        await axios.put(`http://localhost:8000/api/acadTraining/${editingAcadTrainingId}`, {
          tituloObtenido,
          idInstitucion: esNuevaInstitucion ? institucionCarga.value : institucion.value,
          fechaInicio,
          fechaFin,
        });

        // Limpiar el estado de edición
        setEditingAcadTrainingId(null);
      } else {
        console.log(institucion);
        // Si no hay editingAcadTrainingId, significa que estamos agregando nuevo
        await axios.post('http://localhost:8000/api/acadTraining/new', {
          idInstitucion: esNuevaInstitucion ? institucionCarga.value : institucion.value, // Reemplaza con el ID de la institución
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
      console.error('Error al agregar/editar datos académicos:', error);
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
                      <Modal.Title className='tituloModal'>Editar Usuario</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <EditarUsuario id={id} onUsuarioUpdated={recargarInformacionUsuario} closeEditModal={() => setShowEditUserModal(false)} />
                    </Modal.Body>
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

                    <ListGroup className="empleos-lista" variant="flush">
                      <h3>Información Académica</h3>
                      {acadTraining.map((item) => (
                        <ListGroup.Item key={item._id} className="mt-4 border p-3 position-relative">
                          <div className="empleo-detalle">
                            <span><strong>Título obtenido:</strong> {item.tituloObtenido}</span>
                          </div>
                          <div className="empleo-detalle">
                            <span><strong>Institución:</strong> {item.idInstitucion.nombreInstitucion}</span>
                          </div>
                          <div className="empleo-detalle">
                            <span><strong>Fecha de inicio:</strong> {formatDate(item.fechaInicio)}</span>
                          </div>
                          <div className="empleo-detalle">
                            <span><strong>Fecha de fin:</strong> {formatDate(item.fechaFin)}</span>
                          </div>

                          <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                            <FontAwesomeIcon icon={faEdit} onClick={() => handleShowAcadTrainingModal(item._id)} className="text-primary mr-2" style={{ cursor: 'pointer', fontSize: '1.5em', marginRight: '15px' }} />
                            <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleShowDeleteModal(item._id)} className="text-danger" style={{ cursor: 'pointer', fontSize: '1.5em' }} />
                          </div>


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
                        </ListGroup.Item>
                      ))}                  </ListGroup>

                    <Button variant="primary" onClick={handleShowAcadTrainingModal} className="mt-3">
                      Agregar
                    </Button>
                    <Modal show={showAcadTrainingModal} onHide={handleCloseAcadTrainingModal}>
                      <Modal.Header closeButton>
                        <Modal.Title className='tituloModal'>{editingAcadTrainingId ? 'Editar' : 'Agregar'} Información Académica</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form className="mi-formulario">

                          <Form.Group controlId="formTitulo">
                            <Form.Label>Título obtenido</Form.Label>
                            <div className="input-icon-wrapper">
                              <FontAwesomeIcon icon={faGraduationCap} className="input-icon" /> {/* Cambia el ícono según corresponda */}
                              <Form.Control
                                type="text"
                                placeholder="Ingrese el título obtenido"
                                value={tituloObtenido}
                                onChange={(e) => setTituloObtenido(e.target.value)}
                                className="input-with-icon" />
                              {/* Agrega aquí validaciones o mensajes de error si es necesario */}
                            </div>
                            {tituloObtenidoError && <p className="text-danger">{tituloObtenidoError}</p>}

                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Institución</Form.Label>
                            <div className="input-icon-wrapper-select">
                              <Select
                                isCreatable
                                onChange={handleInstitucion}
                                options={instituciones.map((institucion) => ({
                                  label: institucion.nombreInstitucion,
                                  value: institucion._id
                                }))}
                                value={
                                  editingAcadTrainingId && institucionSeleccionada
                                    ? {
                                      label: institucionSeleccionada.nombreInstitucion,
                                      value: institucionSeleccionada._id
                                    } : institucion
                                }
                                placeholder="Seleccionar institución" // Placeholder añadido aquí
                                formatCreateLabel={(inputValue) => `Crear "${inputValue}"`}
                              />
                            </div>
                            {institucionError && <p className="text-danger">{institucionError}</p>}
                          </Form.Group>

                          <Row>
                            <Col md={6}>
                              <Form.Group>
                                <Form.Label>Fecha de inicio</Form.Label>
                                <div className="input-icon-wrapper">
                                  <FontAwesomeIcon icon={faCalendarAlt} className="input-icon" />
                                  <Form.Control
                                    type="date"
                                    value={fechaInicio}
                                    onChange={(e) => setFechaInicio(e.target.value)}
                                    className="input-with-icon" />
                                  {/* Validaciones o mensajes de error */}
                                </div>
                                {fechaInicioError && <p className="text-danger">{fechaInicioError}</p>}

                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group>
                                <Form.Label>Fecha de fin</Form.Label>
                                <div className="input-icon-wrapper">
                                  <FontAwesomeIcon icon={faCalendarAlt} className="input-icon" />
                                  <Form.Control
                                    type="date"
                                    value={fechaFin}
                                    onChange={(e) => setFechaFin(e.target.value)}
                                    className="input-with-icon" />
                                  {/* Validaciones o mensajes de error */}
                                </div>
                                {fechaFinError && <p className="text-danger">{fechaFinError}</p>}

                                {/* Mensaje de error para fecha de fin */}

                              </Form.Group>


                            </Col>
                          </Row>
                          <div className='botones-centrados' >
                            <Button variant="secondary" onClick={handleCloseAcadTrainingModal}>
                              Cerrar
                            </Button>
                            <Button variant="primary" onClick={handleAddAcadTraining}>
                              {editingAcadTrainingId ? 'Guardar Cambios' : 'Agregar'}
                            </Button>
                          </div>
                        </Form>
                      </Modal.Body>

                    </Modal>
                    <Modal >
                      <Modal.Header closeButton>
                        <Modal.Title>Confirmar Eliminación</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        ¿Estás seguro de que deseas eliminar esta formación académica?
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" >
                          Cancelar
                        </Button>
                        <Button variant="danger" >
                          Eliminar
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Card.Body>
                </Card>
              </Tab>
              <Tab eventKey="laboral" title="Experiencia Laboral">
                <Card>
                  <Card.Body>
                    {experienciaLaboral.length > 0 ? (
                      <ListGroup className="empleos-lista">
                        <h3>Experiencia Laboral</h3>
                        {experienciaLaboral.map((experiencia, index) => (
                          <ListGroup.Item key={index} className="mt-4 border p-3 position-relative">
                            {/* ... Contenido del ListGroup.Item ... */}
                            <div className="empleo-detalle">
                              <span><strong>Descripción de Responsabilidades:</strong> {experiencia.descripcionResponsabilidades}</span>
                            </div>
                            <div className="empleo-detalle">
                              <span><strong>Ámbito Laboral/Departamento:</strong> {experiencia.ambitoLaboral}</span>
                            </div>
                            <div className="empleo-detalle">
                              <span><strong>Empresa en la que trabajó:</strong> {experiencia.empresa}</span>
                            </div>
                            <div className="empleo-detalle">
                              <span><strong>Fecha de inicio:</strong> {formatDate(experiencia.fechaInicio)}</span>
                            </div>
                            <div className="empleo-detalle">
                              <span><strong>Fecha de fin:</strong> {formatDate(experiencia.fechaFin)}</span>
                            </div>
                            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                              <FontAwesomeIcon icon={faEdit} className="text-primary mr-2" style={{ cursor: 'pointer', fontSize: '1.5em', marginRight: '15px' }}
                                onClick={() => handleEditExperienceClick(experiencia._id)}
                              />
                              <FontAwesomeIcon
                                icon={faTrashAlt}
                                className="text-danger"
                                style={{ cursor: 'pointer', fontSize: '1.5em' }}
                                onClick={() => handleShowDeleteExperienceModal(experiencia._id)}
                              />
                            </div>


                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    ) : (
                      <p>No hay experiencia laboral publicada actualmente.</p>
                    )}
                    {/* ... Contenido de experiencia laboral ... */}
                    {/* Modal para editar experiencia laboral */}
                    <Modal show={showEditExperienceModal} onHide={() => setShowEditExperienceModal(false)}>
                      <Modal.Header closeButton>
                        <Modal.Title>Editar Experiencia Laboral</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {editingExperienceId && <EditarExperienciaLaboral idExperiencia={editingExperienceId} onExperienciaEdited={cargarExperienciaLaboral}
                          closeEditModal={() => setShowEditExperienceModal(false)} />}
                      </Modal.Body>

                    </Modal>
                    <Modal show={showDeleteExperienceModal} onHide={handleCloseDeleteExperienceModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Confirmar Eliminación</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        ¿Estás seguro de que deseas eliminar esta experiencia laboral?
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDeleteExperienceModal}>
                          Cancelar
                        </Button>
                        <Button variant="danger" onClick={confirmDeleteExperience}>
                          Eliminar
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <div className='botones-centrados'>
                      <Button variant="primary" onClick={() => showExperienceForm()}>Agregar Experiencia Laboral</Button>
                    </div>
                    <Modal show={showExperienceModal} onHide={() => setShowExperienceModal(false)}>
                      <Modal.Header closeButton>
                        <Modal.Title className='tituloModal'>{isEditingExperience ? 'Editar Experiencia Laboral' : 'Agregar Experiencia Laboral'}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <ExperieciaLaboral idUsuario={id} onExperienciaAdded={cargarExperienciaLaboral} />
                      </Modal.Body>

                    </Modal>

                  </Card.Body>
                </Card>
              </Tab>
              <Tab eventKey="misPostulaciones" title="Mis Postulaciones">
                <Card>
                  <Card.Body>
                    {postulaciones.length > 0 ? (
                      <ListGroup className="empleos-lista">
                        {postulaciones.map((postulacion) => (
                          <ListGroup.Item key={postulacion._id} className="mt-4 border p-3 position-relative">
                            <Row>

                              <Col>
                                <div className="empleo-detalle">
                                  <span>
                                    <strong>Empresa:</strong> <Link> {postulacion.idEmpleo?.idEmpresa?.nombreEmpresa}</Link>
                                    <button className="icon-button" onClick={() => handleShowModal(postulacion.idEmpleo)}>
                                      <FontAwesomeIcon icon={faInfoCircle} />
                                    </button>
                                  </span>
                                </div>
                              </Col>

                              <Col>
                                <div className="empleo-detalle">
                                  <span>
                                    <strong>Estado:</strong> {postulacion.estado}
                                    {postulacion.estado === 'En Espera' && (
                                      <FontAwesomeIcon icon={faCircleNotch} className="icono-estado" />
                                    )}
                                  </span>

                                </div>
                              </Col>

                            </Row>
                            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                              {/* Otros detalles de la postulación */}
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
                  </Card.Body>
                </Card>
                <Modal show={showModal} onHide={() => setShowModal(false)}>

                  <Modal.Header closeButton>
                    <Modal.Title className='tituloModal'>Detalles Del empleo al que postuló</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="tituloModalBody ">


                    {empleoSeleccionado && (
                      <>
                        <div className="empleo-detalle">
                          <span><strong>Descripción:</strong> {empleoSeleccionado.descripcion}</span>
                        </div>
                        <div className="empleo-detalle">
                          <span><strong>Conocimientos:</strong> {empleoSeleccionado.conocimientos}</span>
                        </div>
                        <div className="empleo-detalle">
                          <span><strong>Aptitudes:</strong> {empleoSeleccionado.aptitudes}</span>
                        </div>
                        <div className="empleo-detalle">
                          <span><strong>Vacantes:</strong> {empleoSeleccionado.numeroVacantes}</span>
                        </div>
                        {/* ...otros detalles... */}
                      </>
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                      Cerrar
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Tab>

            </Tabs>

          </Col>
        </Row>
      </Container>
    </div>

  );
}


export default DetalleUsuario;