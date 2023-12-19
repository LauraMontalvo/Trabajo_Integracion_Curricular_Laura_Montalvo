import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FaTrash } from "react-icons/fa"; // Importa el icono de Font Awesome
import 'bootstrap/dist/css/bootstrap.css';
import Cabecera from "../Cabecera";
import TabsAdministracionComp from "../Administracion/TabsAdministracionComp";
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as constantes from '../../Models/Constantes'

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [usuarioToDelete, setUsuarioToDelete] = useState(null);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  useEffect(() => {
    axios.get(constantes.URL_OBTENER_USUARIOS)
      .then(res => {
        setUsuarios(res.data.sort((a, b) => a.nombre.localeCompare(b.nombre)))
      })
      .catch(err => console.error("Error al obtener usuarios:", err));
  }, []);

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
    setUsuarios(usuarios.filter(usuario => usuario._id !== usuarioId));
  }

  return (
    <div className="App">

      <TabsAdministracionComp />

      <div className="container">

        <h1 className="mt-4 mb-4">Usuarios Existentes</h1>

        <div className="table-responsive">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                {/*<th>Foto</th>*/}
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Rol</th>
                <th>Género</th>
                <th>Fecha de Nacimiento</th>
                <th>Telefono</th>
                <th>Usuario</th>
                <th style={{ textAlign: 'center' }} >Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario, ind) => (
                <tr key={ind}>
                  {/* Datos de la empresa */}
                  {/*<td>{usuario.foto}</td>*/}
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellido}</td>
                  <td>{usuario.rol}</td>
                  <td>{usuario.sexo}</td>
                  <td>{usuario.fechaNacimiento}</td>
                  <td>{usuario.telefono}</td>
                  <td>{usuario.usuario}</td>
                  <td style={{ textAlign: 'center' }}>

                    <span className="icon-button" onClick={() => prepareDelete(usuario)}>
                      <FontAwesomeIcon className="text-danger" icon={faTrash} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Modal de eliminación */}
        <Modal isOpen={deleteModal} toggle={toggleDeleteModal} className="modal-danger" >
          <ModalHeader toggle={toggleDeleteModal} className="bg-danger text-white">Confirmar Eliminación</ModalHeader>
          <ModalBody>
            ¿Estás seguro de que deseas eliminar el usuario: {usuarioToDelete && `${usuarioToDelete.nombre} ${usuarioToDelete.apellido}`}?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={deleteUsuario}>Eliminar</Button>{' '}
            <Button color="secondary" onClick={toggleDeleteModal}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}

export default ListaUsuarios;
