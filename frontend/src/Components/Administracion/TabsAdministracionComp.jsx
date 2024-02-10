import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Modal } from "react-bootstrap";
import "../../Styles/header.scss";
import { useState } from 'react';
import {  useParams } from 'react-router-dom';

import * as constantes from '../../Models/Constantes'
import RegistroInstituciones from "./RegistroInstitucionesView";
import RegistroEmpresa from "./RegistroEmpresa";
import RegistroUsuario from "./RegistroUsuario";
import RegistroAdministrador from "./RegistroAdministrador";
const TabsAdministracionComp = ({ onAddInstitucion, onAddEmpresa, onRecargarUsuarios,onRecargarAdministradores}) => {
  const [showRegisterInstitutionModal, setShowRegisterInstitutionModal] = useState(false);
  const [showRegisterCompanyModal, setShowRegisterCompanyModal] = useState(false);
  const [showRegisterUserModal, setShowRegisterUserModal] = useState(false);
  const [showRegisterAdminModal, setShowRegisterAdminModal] = useState(false);
  const { id } = useParams();

  const handleShowRegisterAdminModal = () => setShowRegisterAdminModal(true);
  const handleCloseRegisterAdminModal = () => setShowRegisterAdminModal(false);
  
  const handleShowRegisterUserModal = () => {
    setShowRegisterUserModal(true);
  };

  const handleCloseRegisterUserModal = () => {
    setShowRegisterUserModal(false);
  };

  const handleShowRegisterInstitutionModal = () => {
    setShowRegisterInstitutionModal(true);
  };

  const handleCloseRegisterInstitutionModal = () => {
    setShowRegisterInstitutionModal(false);
  };
  const handleShowRegisterCompanyModal = () => {
    setShowRegisterCompanyModal(true);
  };

  const handleCloseRegisterCompanyModal = () => {
    setShowRegisterCompanyModal(false);
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Navbar.Brand  className="titulo-Chavp">
          <h2>{constantes.TEXTO_TITULO}
          </h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" variant="tabs">
          <Nav.Link as={Link} to={`/admin/consola/${id}`}>Inicio</Nav.Link>

            <NavDropdown title="Empresas" id="nav-dropdown">
              <NavDropdown.Item as={Link} to={`/admin/consola/listaEmpresas/${id}`}>Ver Empresas</NavDropdown.Item>
              <NavDropdown.Item onClick={handleShowRegisterCompanyModal}>Registrar Empresa</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Administradores" id="nav-dropdown">
              <NavDropdown.Item as={Link} to={`/admin/consola/listaAdministradores/${id}`}>Ver Administradores</NavDropdown.Item>
              <NavDropdown.Item onClick={handleShowRegisterAdminModal}>Registrar Administrador</NavDropdown.Item>

            </NavDropdown>


            <NavDropdown title="Usuarios" id="nav-dropdown">
        <NavDropdown.Item as={Link} to={`/admin/consola/listaUsuarios/${id}`}>Ver Usuarios</NavDropdown.Item>
        <NavDropdown.Item onClick={handleShowRegisterUserModal}>Registrar Usuarios</NavDropdown.Item>
      </NavDropdown>
            <NavDropdown title="Instituciones" id="nav-dropdown">
              <NavDropdown.Item as={Link} to={`/admin/consola/listaInstituciones/${id}`} >Lista Instituciones</NavDropdown.Item>
              <NavDropdown.Item onClick={handleShowRegisterInstitutionModal}>
                Registrar Institucion</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to={`/admin/consola/listaPostulacionesAdmin/${id}`}>Lista Empleos</Nav.Link>
            

          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {/* Modal para registrar instituciones */}
      <Modal show={showRegisterInstitutionModal} onHide={handleCloseRegisterInstitutionModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar Institución</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegistroInstituciones onInstitucionRegistered={onAddInstitucion} onCloseRegisterModal={handleCloseRegisterInstitutionModal} />
        </Modal.Body>
      </Modal>

      <Modal show={showRegisterCompanyModal} onHide={handleCloseRegisterCompanyModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar Empresa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegistroEmpresa onEmpresaRegistered={onAddEmpresa} onCloseRegisterModal={handleCloseRegisterCompanyModal} />
        </Modal.Body>
      </Modal>
      <Modal show={showRegisterUserModal} onHide={handleCloseRegisterUserModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Registrar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RegistroUsuario onRecargarUsuarios={onRecargarUsuarios} />
      </Modal.Body>
    </Modal>
    <Modal show={showRegisterAdminModal} onHide={handleCloseRegisterAdminModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Registrar Administrador</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RegistroAdministrador onRegistroExitoso={onRecargarAdministradores} />
      </Modal.Body>
    </Modal>
    </>
  );
};

export default TabsAdministracionComp;
