import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import 'bootstrap/dist/css/bootstrap.css';
import TabsAdministracionComp from "../Components/Administracion/TabsAdministracionComp";
import "../Styles/Lista.css"


const ListaInstituciones = () => {
  const [instituciones, setInstituciones] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [institucionToDelete, setInstitucionToDelete] = useState(null);
  const navigate = useNavigate();
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);



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
    axios.delete(`http://localhost:8000/api/company/${institucionToDelete._id}`)
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

  const editar = (id) => {
    navigate(`${id}/edit`);
  }

  return (

    <div className="App">

<TabsAdministracionComp />
      <h1 className="mt-4 mb-4">Instituciones Existentes</h1>
      <div className="container">
        <div className="table-responsive-Institucion">
        <Table striped bordered hover responsive >            
        <thead>
              <tr>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {instituciones.map((institucion, ind) => (
                <tr key={ind}>
                  <td>{institucion.nombreInstitucion}</td>
                  <td>
                  <span className="icon-button" onClick={() => editar(institucion._id)}>
          <FontAwesomeIcon icon={faEdit} />
        </span>
        <span className="icon-button" onClick={() => prepareDelete(institucion)}>
          <FontAwesomeIcon icon={faTrash} />
        </span>
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>


      {/* Modal de eliminación */}
      <Modal isOpen={deleteModal} toggle={toggleDeleteModal} className="modal-danger">
        <ModalHeader toggle={toggleDeleteModal} className="bg-danger text-white" >Confirmar Eliminación</ModalHeader>
        <ModalBody >
          ¿Estás seguro de que deseas eliminar la institución {institucionToDelete ? institucionToDelete.nombreInstitucion : ''}?
        </ModalBody>
        <ModalFooter>
        
          <Button color="danger" onClick={deleteInstitucion}>Eliminar</Button>
          {' '}
          <Button color="secondary" onClick={toggleDeleteModal}>Cancelar</Button>
    
         
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ListaInstituciones;
