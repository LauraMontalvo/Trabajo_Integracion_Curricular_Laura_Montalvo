import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

import "../Styles/Lista.css"
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import 'bootstrap/dist/css/bootstrap.css';
import TabsAdministracionComp from "../Components/Administracion/TabsAdministracionComp";
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../Styles/Lista.css"
import EditarEmpresa from "./EditarEmpresa";

const ListaEmpresas = () => {
  const [empresas, setEmpresas] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [empresaToDelete, setEmpresaToDelete] = useState(null);
  const navigate = useNavigate();
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const { id } = useParams();
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const handleCloseEditUserModal = () => setShowEditUserModal(false);
  const [empresa, setEmpresa] = useState({});



  const handleShowEditUserModal = (empresaId) => {
    setEmpresa(empresaId); // Establece el ID de la empresa a editar
    setShowEditUserModal(true);
  };
  useEffect(() => {
    axios.get('http://localhost:8000/api/companies')
      .then(res => {
        setEmpresas(res.data.sort((a, b) => a.nombreEmpresa.localeCompare(b.nombreEmpresa)))
    
      })
      .catch(err => console.error("Error al obtener empresas:", err));
      axios.get(`http://localhost:8000/api/company/${id}`)
      .then((res) => {
        setEmpresa({ ...res.data });
      })
      .catch((err) => console.log(err));

  }, [id]);

  const prepareDelete = (empresa) => {
    setEmpresaToDelete(empresa);
    toggleDeleteModal();
  }
  const recargarInformacionEmpresa = () => {
    axios.get(`http://localhost:8000/api/company/${id}`)
      .then((res) => {
        setEmpresa({ ...res.data });
      })
      .catch((err) => console.log(err));
  };

  const deleteEmpresa = () => {
    axios.delete(`http://localhost:8000/api/company/${empresaToDelete._id}`)
      .then(res => {
        console.log(res);
        removeFromDom(empresaToDelete._id);
        toggleDeleteModal();
      })
      .catch(err => {
        console.error("Error al eliminar empresa:", err);
      });
  }

  const removeFromDom = (empresaId) => {
    setEmpresas(empresas.filter(empresa => empresa._id !== empresaId));
  }



  return (

    <div className="App">

      <TabsAdministracionComp />
      <h1 className="mt-4 mb-4">Empresas Existentes</h1>
      <div className="container">
        <div className="table-responsive">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Descripción</th>
                <th>Rol</th>
                <th>Usuario</th>
                <th >Acciones</th>
              </tr>
            </thead>
            <tbody>
              {empresas.map((empresa, ind) => (
                <tr key={ind}>
                  <td>{empresa.nombreEmpresa}</td>
                  <td>{empresa.correo}</td>
                  <td>{empresa.direccion}</td>
                  <td>{empresa.telefono}</td>
                  <td>{empresa.descripcion}</td>
                  <td>{empresa.rol}</td>
                  <td >{empresa.usuario}</td>
                  <td style={{ textAlign: 'center' }}>


                  <span className="icon-button" >
  <FontAwesomeIcon className="text-primary mr-2" onClick={() => handleShowEditUserModal(empresa)} icon={faEdit} />
</span>
                    <span className="icon-button" >
                      <FontAwesomeIcon className="text-danger" onClick={() => prepareDelete(empresa)} icon={faTrash} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>


        </div>
      </div>

      <Modal show={showEditUserModal} onHide={handleCloseEditUserModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className='tituloModal'>Editar Empresa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditarEmpresa id={empresa} onEmpresaUpdated={() => { /* ... */ }} closeEditModal={handleCloseEditUserModal} />
        </Modal.Body>
      </Modal>

      {/* Modal de eliminación */}
      <Modal isOpen={deleteModal} toggle={toggleDeleteModal} className="modal-danger">
        <ModalHeader toggle={toggleDeleteModal} className="bg-danger text-white">Confirmar Eliminación</ModalHeader>
        <ModalBody>
          ¿Estás seguro de que deseas eliminar la empresa {empresaToDelete && empresaToDelete.nombreEmpresa}?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={deleteEmpresa}>Eliminar</Button>{' '}
          <Button color="secondary" onClick={toggleDeleteModal}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ListaEmpresas;
