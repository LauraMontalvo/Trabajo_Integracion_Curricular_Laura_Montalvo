import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { faTrash, faEdit, faUser } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import Cabecera from "../../Components/General/Cabecera";
import TabsAdministracionComp from "../../Components/Administracion/TabsAdministracionComp";
import * as constantes from '../../Models/Constantes';
import "../../Styles/Lista.scss";
import "../../Styles/ListaEmpresa.scss"; // Importa los mismos estilos de ListaEmpresas

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [usuarioToDelete, setUsuarioToDelete] = useState(null);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const [searchQuery, setSearchQuery] = useState("");
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  useEffect(() => {
    axios.get(constantes.URL_OBTENER_USUARIOS)
      .then(res => {
        const usuariosOrdenados = res.data.sort((a, b) => a.nombre.localeCompare(b.nombre));
        setUsuarios(usuariosOrdenados);
        setUsuariosFiltrados(usuariosOrdenados); // Inicializa con todos los usuarios
      })
      .catch(err => console.error("Error al obtener usuarios:", err));
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filtrar los usuarios basados en el query de búsqueda
    const filtrados = usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(query) ||
      usuario.apellido.toLowerCase().includes(query)
    );
    setUsuariosFiltrados(filtrados); // Actualiza la lista filtrada
  };
  const prepareDelete = (usuario) => {
    setUsuarioToDelete(usuario);
    toggleDeleteModal();

  }

  const deleteUsuario = () => {
    axios.delete(`http://localhost:8000/api/user/${usuarioToDelete._id}`)
      .then(res => {
        console.log(res);
        removeFromDom(usuarioToDelete._id);
        toggleDeleteModal();
      })
      .catch(err => {
        console.error("Error al eliminar usuario:", err);
      });
  }
  
  const removeFromDom = (usuarioId) => {
    setUsuarios(prevUsuarios => prevUsuarios.filter(usuario => usuario._id !== usuarioId));
    setUsuariosFiltrados(prevUsuariosFiltrados => prevUsuariosFiltrados.filter(usuario => usuario._id !== usuarioId));
  }

  return (
    <div className="App">
      <TabsAdministracionComp />
      <Container fluid className="mt-4">
        <Row>
        <Col md={3} className="widget">
            <h4>Filtrar Usuarios</h4>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Buscar por nombre o apellido"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Form.Group>
          </Col>

          <Col md={9}>
          <Col md={12} className="mb-3">
          <strong>Total de Usuarios:</strong> {usuariosFiltrados.length}
            </Col>
            <Row>
            {usuariosFiltrados.map((usuario) => (
                <Col md={6} key={usuario._id} className="mb-3">
                  <Card className="empresa-card">
                    <Card.Body>
                      <Row className="align-items-center">
                        <Col md={8}>
                          <Card.Title><FontAwesomeIcon icon={faUser} className="me-2" />{usuario.nombre} {usuario.apellido}</Card.Title>
                          <Card.Text><strong>Género:</strong> {usuario.sexo}</Card.Text>
                          <Card.Text><strong>Fecha de Nacimiento:</strong> {formatDate(usuario.fechaNacimiento)}</Card.Text>
                          <Card.Text><strong>Teléfono:</strong> {usuario.telefono}</Card.Text>
                        </Col>
                        <Col xs={12} sm={6} md={4} className="text-right">
                          <div className="icon-container">
                            <FontAwesomeIcon className="icon-primary me-2" icon={faEdit} onClick={() => {/* función para editar */ }} />
                            <FontAwesomeIcon className="icon-danger" icon={faTrash} onClick={() => prepareDelete(usuario)} />
                          </div>
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

      <Modal show={deleteModal} onHide={() => setDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar el usuario: {usuarioToDelete && `${usuarioToDelete.nombre} ${usuarioToDelete.apellido}`}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteUsuario}>Eliminar</Button>
          <Button variant="secondary" onClick={toggleDeleteModal}>Cancelar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default ListaUsuarios;
