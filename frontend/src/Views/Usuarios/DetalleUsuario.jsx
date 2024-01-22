import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit, faGraduationCap, faTrashAlt, faInfoCircle, faCalendarAlt,
  faCircleNotch, faHourglassHalf, faExclamationCircle, faCheckCircle,
  faDownload, faCamera, faPencilAlt
} from '@fortawesome/free-solid-svg-icons';


import {
  Button, Image, InputGroup, FormControl, Row, Col, Modal, Form, Tab, Tabs, ListGroup, Card,
  Container
} from 'react-bootstrap';

import EditarUsuario from '../../Components/Usuario/EditarUsuarioComp.jsx';
import "../../Styles/loginstyle.css"
import "../../Styles/detalle.scss"
import ExperieciaLaboral from '../../Components/Usuario/ExperienciaLaboralComp.jsx';
import CabeceraUsuarioInicio from '../../Components/Usuario/CabeceraUsuarioInicioComp.jsx';
import Select from 'react-select/creatable';
import EditarExperienciaLaboral from '../../Components/Usuario/EditarExperienciaLaboralComp.jsx';
import DetalleEmpleoModal from '../../Components/Usuario/DetalleEmpleoPostuladoModal.jsx';
import ListaExperienciaLaboral from '../../Components/Usuario/ListaExperienciaLaboral.jsx';
import ListaPostulaciones from '../../Components/Usuario/ListaMisPostulaciones.jsx';
import ListaInformacionAcademica from '../../Components/Usuario/ListaInformacionAcademica.jsx';
import ImagenPerfil from '../../Components/General/ImagenPerfil.jsx';
import ListaCertificaciones from '../../Components/Usuario/ListaCertificaciones.jsx';
import ListaMisPostulaciones from '../../Components/Usuario/ListaMisPostulaciones.jsx';

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
  const [ubicacion, setUbicacion] = useState('');

  const [errorUbicacion, setErrorUbicacion] = useState('');

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
  
  const handleUbicacionChange = (e) => {
    setUbicacion(e.target.value);
    console.log("Ubicación editada:", e.target.value);
    validarUbicacion(e.target.value);
  };
  const validarUbicacion = (valor) => {
    if (!valor) {
      setErrorUbicacion('La ubicación es obligatoria.');
      return false;
    }
    // Aquí puedes añadir más validaciones si lo necesitas
    setErrorUbicacion('');
    return true;
  };

  //Eliminar exoe laboral
  const [showDeleteExperienceModal, setShowDeleteExperienceModal] = useState(false);
  const [deleteExperienceId, setDeleteExperienceId] = useState(null);

  const [deleteMessage, setDeleteMessage] = useState('');

  const handleShowDeleteExperienceModal = (experience) => {
    setDeleteExperienceId(experience._id);
    setDeleteMessage(`¿Estás seguro de que deseas eliminar la experiencia laboral en ${experience.empresa}?`);
    setShowDeleteExperienceModal(true);
  };
  //POSTULACIONES y modal de empleo
  const [postulaciones, setPostulaciones] = useState([]); // Asegúrate de tener este estado
  const [showModal, setShowModal] = useState(false);
  const [empleoSeleccionado, setEmpleoSeleccionado] = useState(null);

  const handleShowModal = (empleo) => {
    setEmpleoSeleccionado(empleo);
    setShowModal(true);
  };

  // Función para eliminar una postulación
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
  const [showAddAcadModal, setShowAddAcadModal] = useState(false);

  const handleShowAddAcadModal = () => setShowAddAcadModal(true);
  const handleCloseAddAcadModal = () => setShowAddAcadModal(false);

  const refreshAcadTraining = () => {
    // Aquí puedes recargar la información académica del usuario
    axios.get(`http://localhost:8000/api/acadTrainings/user/${id}`)
      .then(response => {
        // Suponiendo que setAcadTraining es tu función para actualizar el estado de la formación académica
        setAcadTraining(response.data);
      })
      .catch(error => {
        console.error('Error al cargar la formación académica:', error);
      });
  };
  ///


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
    // Si estamos editando y la institución seleccionada ya existe, la validación pasa
    if (editingAcadTrainingId && institucionSeleccionada) {
      setInstitucionError('');
      return true;
    }

    // Si estamos agregando una nueva formación o cambiando la institución en una existente
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



  const handleShowAcadTrainingModal = (acadTrainingId = null) => {
    setShowAcadTrainingModal(true);

    if (acadTrainingId) {
      const selectedAcadTraining = acadTraining.find((item) => item._id === acadTrainingId);
      if (selectedAcadTraining) {
        setTituloObtenido(selectedAcadTraining.tituloObtenido);
        setFechaInicio(toShortDateFormat(selectedAcadTraining.fechaInicio));
        setFechaFin(toShortDateFormat(selectedAcadTraining.fechaFin));
        setUbicacion(selectedAcadTraining.ubicacion || ''); // Asegúrate de cargar la ubicación aquí

        setEditingAcadTrainingId(acadTrainingId);

        if (selectedAcadTraining.idInstitucion) {
          setInstitucion({
            label: selectedAcadTraining.idInstitucion.nombreInstitucion,
            value: selectedAcadTraining.idInstitucion._id
          });
          // Asegúrate de establecer la ubicación aquí
          setUbicacion(selectedAcadTraining.idInstitucion.ubicacion || '');
        } else {
          setInstitucion(null);
          setUbicacion('');
        }
      }
    } else {
      // Restablecer los valores para una nueva entrada
      setTituloObtenido('');
      setFechaInicio('');
      setFechaFin('');
      setUbicacion('');
      setEditingAcadTrainingId(null);
      setInstitucion(null);
    }
  };

  const handleCloseAcadTrainingModal = () => {
    setShowAcadTrainingModal(false);
    setEditingAcadTrainingId(null);
    setTituloObtenido('');
    setFechaInicio('');
    setFechaFin('');
    setUbicacion('');
    setInstitucion('')
  };
  const handleInstitucion = (institucionCarga) => {
    setInstitucion(institucionCarga);

    const institucionEncontrada = instituciones.find(inst => inst._id === institucionCarga.value);
    if (institucionEncontrada) {
      console.log("Institución encontrada con ubicación: ", institucionEncontrada.ubicacion);
      setUbicacion(institucionEncontrada.ubicacion);
    } else {
      console.log("Nueva institución, configurando ubicación vacía");
      setUbicacion('');
    }
  };

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
      let idInstitucion = null;
      let ubicacionInstitucion = null;

      if (institucion) {
        if (!instituciones.find(inst => inst.nombreInstitucion === institucion.label)) {
          const response = await axios.post('http://localhost:8000/api/school/new', {
            nombreInstitucion: institucion.label,
            ubicacion: ubicacion // Incluye la ubicación aquí
          });
          idInstitucion = response.data.insertedSchool._id;
          cargarInstituciones(); // Recarga las instituciones para incluir la nueva
        } else {
          // Aquí debes encontrar la ubicación de la institución existente
          const institucionExistente = instituciones.find(inst => inst._id === institucion.value);
          idInstitucion = institucion.value;
          ubicacionInstitucion = institucionExistente.ubicacion;
        }
      }

      const dataToSend = {
        tituloObtenido,
        idInstitucion,
        fechaInicio,
        fechaFin,
        ubicacion: ubicacionInstitucion // Asegúrate de enviar la ubicación
      };

      if (editingAcadTrainingId) {
        // Si estamos editando, usar método PUT
        await axios.put(`http://localhost:8000/api/acadTraining/${editingAcadTrainingId}`, dataToSend);
      } else {
        // Si es una nueva formación académica, usar método POST
        await axios.post('http://localhost:8000/api/acadTraining/new', {
          ...dataToSend,
          idUsuario: id
        });
      }

      // Recargar la información académica y cerrar el modal
      refreshAcadTraining();
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
  const handleDeleteExperience = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/workExperience/${id}`);
      // Filtrar la experiencia eliminada del estado
      const updatedExperiences = experienciaLaboral.filter(experiencia => experiencia._id !== id);
      setexperienciaLaboral(updatedExperiences);
    } catch (error) {
      console.error('Error al eliminar experiencia laboral', error);
    }
  };
  const onUserPhotoUpdated = (newPhotoUrl) => {
    setUser((prevUser) => ({ ...prevUser, foto: newPhotoUrl }));
  };
  const actualizarEstadoPostulacion = (idPostulacion, nuevoEstado) => {
    setPostulaciones((prevPostulaciones) => 
        prevPostulaciones.map((postulacion) =>
            postulacion._id === idPostulacion ? { ...postulacion, estadoPostulacion: nuevoEstado } : postulacion
        )
    );
};
  return (
    <div className='App'>
      <CabeceraUsuarioInicio />
      <Container fluid className="mt-4">
        <Row>
          <Col xs={12} md={6} lg={4}  >
            {/* Información del usuario */}
            <Card className="datos-personales-card">
              <Card.Body >
                <ImagenPerfil
                  id={id}
                  userParam={user}
                  isEditingParam={isEditing}
                  onPhotoUpdated={onUserPhotoUpdated} // Asegúrate de pasar esta función como prop
                />                <div className="text-center"> <Card.Title ><strong>{user.nombre} {user.apellido}</strong></Card.Title></div>

                <ListGroup variant="flush">
                  {/* ... Listado de datos personales del usuario ... */}
                  <Card.Header>
                    <div className="header-content">
                      <h5> Datos Personales</h5>

                    </div>
                    <FontAwesomeIcon icon={faPencilAlt} onClick={handleShowEditUserModal} className="edit-icon" />
                  </Card.Header>

                  <ListGroup.Item >Género: {user.sexo}</ListGroup.Item>
                  <ListGroup.Item>Fecha de Nacimiento: {formatDate(user.fechaNacimiento)}</ListGroup.Item>
                  <ListGroup.Item>Teléfono: {user.telefono}</ListGroup.Item>
                  <ListGroup.Item>Edad: {edad !== null ? `${edad} años` : ''}</ListGroup.Item>




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
            <Tabs defaultActiveKey="academic" id="info-tab" >
              <Tab eventKey="academic" title="Información Académica">
                <Card>
                  <Card.Body>

                    <ListaInformacionAcademica
                      acadTraining={acadTraining}
                      handleShowAcadTrainingModal={handleShowAcadTrainingModal}
                      handleShowDeleteModal={handleShowDeleteModal}
                    />

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
                          <Form.Group controlId="formUbicacion">
                            <Form.Label>Ubicación</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Ingrese la ubicación"
                              value={ubicacion}
                              onChange={handleUbicacionChange}
                              isInvalid={!!errorUbicacion}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errorUbicacion}
                            </Form.Control.Feedback>
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
              <Tab eventKey="certificaciones" title="Certificaciones">
    <Card>
        <Card.Body>
            <ListaCertificaciones userId={id} />
        </Card.Body>
    </Card>
</Tab>
              <Tab eventKey="laboral" title="Experiencia Laboral">
                <Card>
                  <Card.Body>

                    <ListaExperienciaLaboral
                      experienciaLaboral={experienciaLaboral}
                      onEdit={handleEditExperienceClick}
                      onDelete={handleDeleteExperience}
                      formatDate={formatDate}
                    />


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
                    <ListaMisPostulaciones
                      postulaciones={postulaciones}
                      handleShowModal={handleShowModal}
                      eliminarPostulacion={eliminarPostulacion}
                      showModal={showModal}
                      setShowModal={setShowModal}
                      empleoSeleccionado={empleoSeleccionado}
                      setPostulaciones={setPostulaciones} // Pasa setPostulaciones al componente hijo

                    />
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