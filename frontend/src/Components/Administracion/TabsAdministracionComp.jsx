import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Modal } from "react-bootstrap";
import "../../Styles/header.scss";
import { useState } from 'react';

import * as constantes from '../../Models/Constantes'
import RegistroInstituciones from "./RegistroInstitucionesView";
import RegistroEmpresa from "./RegistroEmpresa";
const TabsAdministracionComp = ({ onAddInstitucion, onAddEmpresa }) => {
  const [showRegisterInstitutionModal, setShowRegisterInstitutionModal] = useState(false);
  const [showRegisterCompanyModal, setShowRegisterCompanyModal] = useState(false);

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
        <Navbar.Brand as={Link} to="/" className="titulo-Chavp">
          <h2>{constantes.TEXTO_TITULO}
          </h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" variant="tabs">
            <NavDropdown title="Empresas" id="nav-dropdown">
              <NavDropdown.Item as={Link} to="/listaEmpresas">Ver Empresas</NavDropdown.Item>
              <NavDropdown.Item onClick={handleShowRegisterCompanyModal}>Registrar Empresa</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/listaUsuarios">Lista de Usuarios</Nav.Link>
            <NavDropdown title="Instituciones" id="nav-dropdown">
              <NavDropdown.Item as={Link} to="/listaInstituciones" >Ver Institucion</NavDropdown.Item>
              <NavDropdown.Item onClick={handleShowRegisterInstitutionModal}>
                Registrar Institucion</NavDropdown.Item>
            </NavDropdown>
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
    </>
  );
};

export default TabsAdministracionComp;
