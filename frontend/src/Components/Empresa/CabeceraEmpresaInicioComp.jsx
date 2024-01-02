import React, { useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "../../Styles/header.scss";
import axios from 'axios';
import * as constantes from '../../Models/Constantes';

const CabeceraEmpresaInicioComp = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  // Determina la página actual basándose en la URL
  const enPerfilUsuario = location.pathname.includes(`/detalleEmpresa/${id}`);
  const enPerfilEmpresa = location.pathname.includes(`/perfilUsuario/${id}`);
  const handleInicioClick = () => {
    if (isAuthenticated && id) {
      navigate(`/resumen/detalleEmpresa/${id}`);
    } else {
      navigate(`/resumen/${id}`);
    }
  };

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/company/${id}`)
        .then((res) => {
          // Manejar respuesta
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Navbar.Brand as={Link} to="/" className="titulo-Chavp">
        <h2>{constantes.TEXTO_TITULO}</h2>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={handleInicioClick}>Inicio</Nav.Link>
          {enPerfilUsuario ? (
            <Nav.Link >

            </Nav.Link>
          ) : (
            <Nav.Link as={Link} to={`/detalleEmpresa/${id}`}>
              Mi Perfil Empresa
            </Nav.Link>
          )}

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CabeceraEmpresaInicioComp;
