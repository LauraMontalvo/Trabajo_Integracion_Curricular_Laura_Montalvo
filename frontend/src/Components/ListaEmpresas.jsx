import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importa iconos de Font Awesome
import 'bootstrap/dist/css/bootstrap.css';

const ListaEmpresas = () => {
    const [empresas, setEmpresas] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [empresaToDelete, setEmpresaToDelete] = useState(null);
    const navigate = useNavigate();
    const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  
    const RegistrarEmpresa = () => {
      navigate("/registrarEmpresa");
    };
  
    useEffect(() => {
      axios.get('http://localhost:8000/api/companies')
        .then(res => {
          setEmpresas(res.data.sort((a, b) => a.nombreEmpresa.localeCompare(b.nombreEmpresa)))
        })
        .catch(err => console.error("Error al obtener empresas:", err));
    }, []);
  
    const prepareDelete = (empresa) => {
      setEmpresaToDelete(empresa);
      toggleDeleteModal();
    }
  
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
  
    const editar = (id) => {
      navigate(`${id}/edit`);
    }
  
    return (
      <div className="container">
        <h1 className="mt-4 mb-4">Empresas Existentes</h1>
        <div className="text-center mb-4">
          <Button color="success" onClick={RegistrarEmpresa}>
            <FaEdit /> Ingresar nueva Empresa
          </Button>
        </div>
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
                <th>Acciones</th>
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
                  <td>{empresa.usuario}</td>
                  <td>
                    <Button color='info' className='btn-sm mr-1' onClick={() => editar(empresa._id)}>
                      <FaEdit /> Editar
                    </Button>
                    <Button color="danger" className='btn-sm' onClick={() => prepareDelete(empresa)}>
                      <FaTrash /> Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
  
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
