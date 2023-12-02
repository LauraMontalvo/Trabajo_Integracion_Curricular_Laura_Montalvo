import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Image, InputGroup, FormControl, Row, Col } from 'react-bootstrap';

import * as constantes from '../Models/Constantes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal, Form } from 'react-bootstrap';
import EditarEmpresa from '../Views/EditarEmpresa';
import "../Styles/detalle.scss"

function DetalleEmpresa() {
  const { id } = useParams();
  const [empresa, setEmpresa] = useState({});
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();


  // Estados y manejadores para el modal de editar usuario
  // Estados y manejadores para el modal de editar usuario
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const handleShowEditUserModal = () => setShowEditUserModal(true);
  const handleCloseEditUserModal = () => setShowEditUserModal(false);

  const [user, setUser] = useState({});

  const recargarInformacionUsuario = () => {
    axios.get(`http://localhost:8000/api/company/${id}`)
      .then((res) => {
        setEmpresa({ ...res.data });

      })
      .catch((err) => console.log(err));
  };


  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/company/${id}`)
      .then((res) => {
        setEmpresa({ ...res.data });
        recargarInformacionUsuario();
        console.log(empresa); // Añadir esta línea

      })
      .catch((err) => console.error(err));
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
    setNewImageUrl('');
  };

  return (
    <div className="container mt-4">
      <Row>
        <Col md={6}>
          <div className="editing-container">
            {isEditing ? (
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Ingrese la URL de la foto de perfil"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                />
              </InputGroup>
            ) : (
              <Image src={empresa.foto} alt="Foto de perfil" rounded className="img-fluid img-smaller rounded-circle" />
            )}

            {isEditing ? (
              <div>
                <Button variant="success" onClick={handleSaveClick} className="mr-2">
                  Guardar
                </Button>
                <Button variant="secondary" onClick={handleCancelClick}>
                  Cancelar
                </Button>
              </div>
            ) : (
              <Button variant="info" onClick={handleEditClick}>
                Editar Foto
              </Button>
            )}
          </div>

          <div className="usuario-info-container">
            <h3>{constantes.TEXTO_BIENVENIDO}</h3>
            <p>Nombre: {empresa.nombreEmpresa} </p>
            <p>Correo: {empresa.correo}</p>
            <p>Dirección: {empresa.direccion}</p>
            <p>Teléfono: {empresa.telefono}</p>
            <p>Descripción: {empresa.descripcion}</p>

            <FontAwesomeIcon icon={faEdit} className="edit-icon" onClick={handleShowEditUserModal} />

          </div>
          <Modal show={showEditUserModal} onHide={handleCloseEditUserModal} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Editar Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EditarEmpresa onActualizar={recargarInformacionUsuario} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEditUserModal}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
          <div className="mt-4">
            <Button variant="danger" onClick={() => navigate("/empresa")}>
              Salir
            </Button>
            <Button variant="primary" onClick={() => navigate(`/publicarempleo/${id}`)}>
              Publicar Empleo
            </Button>
          </div>

        </Col>
      </Row>
    </div>
  );
}

export default DetalleEmpresa;
