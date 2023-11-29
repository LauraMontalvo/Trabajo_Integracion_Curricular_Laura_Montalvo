import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";


const TabsAdministracionComp = () => {
  return (

      <div>
        <Nav
          variant="underline"
          defaultActiveKey="/listaEmpresas"
          className="justify-content-start"
        >
          <NavDropdown title="Empresas" id="nav-dropdown">
            <NavDropdown.Item as={Link} to="/listaEmpresas">
              Ver Empresas
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/registrarEmpresa">
              Registrar Empresa
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Item>
            <Nav.Link as={Link} to="/listaUsuarios">
              NavLink 1 content
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>

  );
};

export default TabsAdministracionComp;
