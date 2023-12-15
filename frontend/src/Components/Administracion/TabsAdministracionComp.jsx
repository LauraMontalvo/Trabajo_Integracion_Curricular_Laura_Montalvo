import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Navbar, Nav,NavDropdown } from "react-bootstrap";
import "../../Styles/header.scss";
import * as constantes from '../../Models/Constantes'
const TabsAdministracionComp = () => {
  return (

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
            <NavDropdown.Item as={Link} to="/registrarEmpresa">Registrar Empresa</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to="/listaUsuarios">Lista de Usuarios</Nav.Link>
          <NavDropdown title="Instituciones" id="nav-dropdown">
            <NavDropdown.Item as={Link} to="/listaInstituciones" >Ver Institucion</NavDropdown.Item>
            <NavDropdown.Item  as={Link} to="/registrarInstitucion"  >Registrar Institucion</NavDropdown.Item>
          </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>

  );
};

export default TabsAdministracionComp;
