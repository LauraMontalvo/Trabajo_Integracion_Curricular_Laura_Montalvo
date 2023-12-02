import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "../Styles/header.scss"; // Importa tus estilos personalizados

const CabeceraRegistrar = () => {
  return (
  
  <Navbar bg="light" expand="lg" className="mb-4">
  <Navbar.Brand as={Link} to="/" className="titulo-Chavp">
    <h2>Empleos ChavezPamba</h2>
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" /> {/* Este es el botón del menú colapsable */}
  <Navbar.Collapse id="basic-navbar-nav">
  <Nav.Link as={Link} to="/">Inicio</Nav.Link>
       
  </Navbar.Collapse>
</Navbar>


  );
};

export default CabeceraRegistrar;