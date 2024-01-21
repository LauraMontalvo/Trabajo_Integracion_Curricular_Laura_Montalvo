import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Accordion, Button, Image, InputGroup, FormControl, Row, Col, Container, Card, ListGroup, Tab, Tabs } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faCamera, faUsers, faBriefcase, faCode, faUserTie, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import * as constantes from '../../Models/Constantes';
import { Modal, Form } from 'react-bootstrap';
import EditarEmpresa from '../../Components/Empresa/EditarEmpresaComp';
import CabeceraRegistrar from '../../Components/Empresa/CabeceraEmpresaInicioComp';
import PublicarEmpleo from '../../Components/Empresa/PublicarEmpleoComp';
import EditarEmpleoComp from '../../Components/Empresa/EditarEmpleoComp';
import VerPostulaciones from '../../Components/Empresa/VerPostulacionesComp';
import EmpleosPublicados from '../../Components/Empresa/EmpleosPublicadosComp';
import CabeceraEmpresaInicioComp from '../../Components/Empresa/CabeceraEmpresaInicioComp';
import "../../Styles/detalle.scss"
import ImagenPerfil from '../../Components/General/ImagenPerfil';
import ImagenEmpresa from '../../Components/General/ImagenPerfilEmpresa';

function DetalleEmpresa(props) {
  const { id } = useParams();
  const [empresa, setEmpresa] = useState({});
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [verDescripcionCompleta, setVerDescripcionCompleta] = useState(false);
  // Estados y manejadores para el modal de editar usuario
  // Estados y manejadores para el modal de editar usuario
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const handleShowEditUserModal = () => setShowEditUserModal(true);
  const handleCloseEditUserModal = () => setShowEditUserModal(false);

  const [showPublicarEmpleoModal, setShowPublicarEmpleoModal] = useState(false);
  const [empleos, setEmpleos] = useState([]);
  ///PUBLICAR  , ELIMINAR Y EDITAR EMPLEO:
  const [empleoAEliminar, setEmpleoAEliminar] = useState(null);
  const [showModalEliminar, setShowModalEliminar] = useState(false);
  ///
  ///
  // ... otros estados ...
  const [showEditEmpleoModal, setShowEditEmpleoModal] = useState(false);
  const [editingEmpleoId, setEditingEmpleoId] = useState(null);
  const [empleoid, setempleoid] = useState([]);

  ///postuklacion
  const [showModal, setShowModal] = useState(false);
  const [postulantes, setPostulantes] = useState([]);

  // Función para mostrar los postulantes de un empleo específico
  const mostrarPostulantes = async (idEmpleo) => {
    try {
      const respuesta = await axios.get(`http://localhost:8000/api/postulations/job/${idEmpleo}`);
      setPostulantes(respuesta.data); // Actualiza el estado con los postulantes obtenidos
      setShowModal(true);             // Muestra el modal
    } catch (error) {
      console.error('Error al obtener postulantes:', error);
    }
  };


  //
  const handleEditEmpleoClick = (experienceId) => {
    setEditingEmpleoId(experienceId);
    setShowEditEmpleoModal(true);
  };

 
  const eliminarEmpleo = () => {
    axios.delete(`http://localhost:8000/api/job/${empleoAEliminar}`)
      .then(() => {
        setEmpleos(empleos.filter(empleo => empleo._id !== empleoAEliminar));
        setShowModalEliminar(false);
      })
      .catch(err => console.error(err));
  };



  //INFORMACION DE LA EMPRESA
  const recargarInformacionEmpresa = () => {
    axios.get(`http://localhost:8000/api/company/${id}`)
      .then((res) => {
        setEmpresa({ ...res.data });
      })
      .catch((err) => console.log(err));
  };


  const actualizarListaEmpleos = (nuevoEmpleo) => {
    setEmpleos([...empleos, nuevoEmpleo]);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/company/${id}`)
      .then((res) => {
        setEmpresa({ ...res.data });
        recargarInformacionEmpresa();
        cargarEmpleos();
      })
      .catch((err) => console.error(err));
    axios.get(`http://localhost:8000/api/job/${id}`)
      .then((res) => {
        setempleoid(res.data);
      })
      .catch((err) => console.log(err));

    cargarEmpleoid();
  }, [id]);

  const handleEditClick = () => {
    setNewImageUrl(empresa.foto);
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`http://localhost:8000/api/company/${id}`, { foto: newImageUrl });
      setEmpresa({ ...empresa, foto: newImageUrl });
      setIsEditing(false);
    } catch (error) {
      console.error('Error al guardar la nueva URL:', error.response.data.error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewImageUrl(empresa.foto); // Restablece la imagen al valor original
  };
  const cargarEmpleos = () => {
    axios.get(`http://localhost:8000/api/jobs/company/${id}`)
        .then((res) => {
            // Filtrar empleos para excluir los inactivos
            const empleosActivos = res.data.filter(empleo => empleo.estado === "Activo");
            setEmpleos(empleosActivos);
        })
        .catch((err) => console.error(err));
};

  const cargarEmpleoid = () => {
    axios.get(`http://localhost:8000/api/job/${id}`)
      .then((res) => {
        setempleoid(res.data);
      })
      .catch((err) => console.log(err));
  };
  const onEmpleoEditado = (empleoEditado) => {
    // Actualizar la lista de empleos con la información del empleo editado
    const empleosActualizados = empleos.map(empleo => {
      if (empleo._id === empleoEditado._id) {
        return empleoEditado;
      }
      return empleo;
    });
    setEmpleos(empleosActualizados);
  };
  // Función para alternar la visualización de la descripción
  const toggleDescripcion = () => {
    setVerDescripcionCompleta(!verDescripcionCompleta);
  };


const handleShowModalEliminar = (empleoId) => {
  setEmpleoAEliminar(empleoId);
  setShowModalEliminar(true);
};

const inactivarYEliminarEmpleoDeLista = () => {
  axios.put(`http://localhost:8000/api/job/${empleoAEliminar}`, { estado: "Inactivo" })
      .then(() => {
          // Filtra y actualiza la lista de empleos para excluir el inactivado
          const empleosActualizados = empleos.filter(empleo => empleo._id !== empleoAEliminar);
          setEmpleos(empleosActualizados);
          setShowModalEliminar(false);
      })
      .catch(err => console.error(err));
};

  return (
    <div className="App">
      <CabeceraEmpresaInicioComp ></CabeceraEmpresaInicioComp>
      <Container fluid className="mt-4">
        <Row>
          <Col md={4}  >
            <Card className="datos-personales-card">
              <Card.Body>
                <ImagenEmpresa
                  id={id}
                  empresaParam={empresa}
                  isEditingParam={isEditing}
                  updateEmpresa={setEmpresa}
                />

                <div className="text-center">
                  <Card.Title><strong>{empresa.nombreEmpresa}</strong></Card.Title>
                </div>
                <ListGroup variant="flush">
                  <Card.Header>
                    <div className="header-content">
                      <h5> Datos Personales</h5>

                    </div>
                    <FontAwesomeIcon icon={faPencilAlt} onClick={handleShowEditUserModal} className="edit-icon" />
                  </Card.Header>
                  <ListGroup.Item >Correo: {empresa.correo}</ListGroup.Item >
                  <ListGroup.Item >Dirección: {empresa.direccion}</ListGroup.Item >
                  <ListGroup.Item >Teléfono: {empresa.telefono}</ListGroup.Item >
                  <ListGroup.Item>
                    Descripción: {empresa && empresa.descripcion
                      ? (verDescripcionCompleta ? empresa.descripcion : `${empresa.descripcion.substring(0, 100)}...`)
                      : 'Cargando descripción...'}
                    {empresa && empresa.descripcion && (
                      <Button variant="link" onClick={toggleDescripcion}>
                        {verDescripcionCompleta ? 'Ver menos' : 'Ver más'}
                      </Button>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Valores: {empresa && empresa.valores
                      ? (verDescripcionCompleta ? empresa.valores : `${empresa.valores.substring(0, 100)}...`)
                      : 'Cargando descripción...'}
                    {empresa && empresa.valores && (
                      <Button variant="link" onClick={toggleDescripcion}>
                        {verDescripcionCompleta ? 'Ver menos' : 'Ver más'}
                      </Button>
                    )}
                  </ListGroup.Item>

                  <Modal show={showEditUserModal} onHide={handleCloseEditUserModal} size="lg">
                    <Modal.Header closeButton>
                      <Modal.Title className='tituloModal'>Editar Empresa</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <EditarEmpresa id={id} onEmpresaUpdated={recargarInformacionEmpresa} closeEditModal={() => setShowEditUserModal(false)}
                      />
                    </Modal.Body>
                  </Modal>
                </ListGroup>
              </Card.Body>
            </Card>
            <div className="botones-centrados">
              <Button variant="danger" onClick={() => navigate("/empresa")}>
                Salir
              </Button>

            </div>
          </Col>
          <Col xs={12} md={6} lg={8}>
            {/* Pestañas para información académica y laboral */}
            <Tabs defaultActiveKey="publicarEmpleo" id="info-tab" className="mb-3">
              <Tab eventKey="publicarEmpleo" title="Publicar Empleo">
                <Card>
                  <Card.Body>
                  <EmpleosPublicados
                empleos={empleos}
                mostrarPostulantes={mostrarPostulantes}
                handleEditEmpleoClick={handleEditEmpleoClick}
                handleShowModalEliminar={handleShowModalEliminar}
            />
            <Modal show={showModalEliminar} onHide={() => setShowModalEliminar(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Inactivación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas inactivar este empleo?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModalEliminar(false)}>Cancelar</Button>
                    <Button variant="danger" onClick={inactivarYEliminarEmpleoDeLista}>Inactivar</Button>
                </Modal.Footer>
            </Modal>
                    {/* Modal para mostrar postulantes */}
                    <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                      <Modal.Header closeButton>
                        <Modal.Title>Postulantes</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {/* Asegúrate de que VerPostulaciones maneje correctamente la lista de postulantes */}
                        <VerPostulaciones postulantes={postulantes} />
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                          Cerrar
                        </Button>
                      </Modal.Footer>
                    </Modal>

                    {/* BOTAON PARA PUBLICAR EMPLEO */}
                    <div className='botones-centrados'>
                      <Button variant="primary" onClick={() => setShowPublicarEmpleoModal(true)}>
                        Publicar Empleo
                      </Button>
                    </div>
                    {/* Modal para Publicar Empleo */}
                    <Modal show={showPublicarEmpleoModal} onHide={() => setShowPublicarEmpleoModal(false)} size="lg">
                      <Modal.Header closeButton>
                        <Modal.Title className='tituloModal'>Publicar Empleo</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <PublicarEmpleo closeEditModal={() => setShowPublicarEmpleoModal(false)} idEmpresa={id} onEmpleoPublicado={actualizarListaEmpleos} />
                      </Modal.Body>
                    </Modal>
                    {/* Modal para Editar Empleo */}
                    <Modal show={showEditEmpleoModal} onHide={() => setShowEditEmpleoModal(false)} size="lg">
                      <Modal.Header closeButton>
                        <Modal.Title>Editar Empleo</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {editingEmpleoId && <EditarEmpleoComp idEmpleo={editingEmpleoId}
                          onEmpleoEditado={onEmpleoEditado} closeEditModal={() => setShowEditEmpleoModal(false)} />}
                      </Modal.Body>

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

export default DetalleEmpresa;
