

import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Container, Row, Col, Button, Modal,Form } from 'react-bootstrap';
import { faTrash, faEdit ,faSchool} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import TabsAdministracionComp from "../../Components/Administracion/TabsAdministracionComp";
import "../../Styles/Lista.scss";
import "../../Styles/ListaEmpresa.scss"; // Asegúrate de que estos estilos son adecuados para tu diseño
import EditarInstitucionComp from "../../Components/Administracion/EditarInstitucionComp";


const ListaInstituciones = () => {
  const [instituciones, setInstituciones] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [institucionToDelete, setInstitucionToDelete] = useState(null);
  const navigate = useNavigate();
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const toggleEditarModal = () => setEditarModal(!EditarModal);

  const [EditarModal, setEditarModal] = useState(false);
  const [institucionToEdit, setInstitucionToEdit] = useState(null);
  const [filtroNombre, setFiltroNombre] = useState("");

  const handleFiltroNombreChange = (event) => {
    setFiltroNombre(event.target.value);
  };

  const institucionesFiltradas = instituciones.filter((institucion) =>
    institucion.nombreInstitucion.toLowerCase().includes(filtroNombre.toLowerCase())
  );

  useEffect(() => {
    axios.get('http://localhost:8000/api/schools')
      .then(res => {
        setInstituciones(res.data.sort((a, b) => a.nombreInstitucion.localeCompare(b.nombreInstitucion)))
      })
      .catch(err => console.error("Error al obtener instituciones:", err));
  }, []);

  const prepareDelete = (institucion) => {
    setInstitucionToDelete(institucion); // Corregido
    toggleDeleteModal();
  }
  const deleteInstitucion = () => {
    axios.delete(`http://localhost:8000/api/school/${institucionToDelete._id}`)
      .then(res => {
        console.log(res);
        removeFromDom(institucionToDelete._id);
        toggleDeleteModal();
      })
      .catch(err => {
        console.error("Error al eliminar institucion:", err);
      });
  }

  const removeFromDom = (institucionId) => {
    setInstituciones(instituciones.filter(institucion => institucion._id !== institucionId));
  }

  const editarInstitucion = (id) => {

    toggleEditarModal();
  }
  const handleEditClick = (institucion) => {
    setInstitucionToEdit(institucion);
    toggleEditarModal();
  };

  const handleInstitucionActualizada = (institucionActualizada) => {
    // Actualizar la lista de instituciones
    setInstituciones(instituciones.map(inst =>
      inst._id === institucionActualizada._id ? institucionActualizada : inst
    ));
  };
  return (

    <div className="App">
      <TabsAdministracionComp />
      <Container fluid className="mt-4">
        <Row>
          <Col md={3} className="widget">
            <h4>Filtrar Instituciones</h4>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Buscar por nombre de institución"
                value={filtroNombre}
                onChange={handleFiltroNombreChange}
              />
            </Form.Group>
          </Col>
          <Col md={9}>
          <Row>
              {institucionesFiltradas.map((institucion) => (
                <Col md={6} key={institucion._id} className="mb-3">
                  <Card className="empresa-card">
                    <Card.Body>
                      <Row className="align-items-center">
                        <Col md={8}>
                          <Card.Title>
                            <FontAwesomeIcon icon={faSchool} className="me-2 " />
                            {institucion.nombreInstitucion}
                          </Card.Title>
                        </Col>
                        <Col md={4} className="text-right">
                          <FontAwesomeIcon className="icon-primary me-2" icon={faEdit} onClick={() => handleEditClick(institucion)} />
                          <FontAwesomeIcon className="icon-danger" icon={faTrash} onClick={() => prepareDelete(institucion)} />
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Modal para editar institución */}
      <Modal show={EditarModal} onHide={toggleEditarModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Institución</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {institucionToEdit && (
            <EditarInstitucionComp
              idInstitucion={institucionToEdit._id}
              onInstitucionActualizada={handleInstitucionActualizada}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleEditarModal}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para confirmar eliminación */}
      <Modal show={deleteModal} onHide={toggleDeleteModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar la institución {institucionToDelete?.nombreInstitucion}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteInstitucion}>Eliminar</Button>
          <Button variant="secondary" onClick={toggleDeleteModal}>Cancelar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListaInstituciones;
