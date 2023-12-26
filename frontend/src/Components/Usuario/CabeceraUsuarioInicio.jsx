import React, { useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "../../Styles/header.scss";
import axios from 'axios';
import * as constantes from '../../Models/Constantes';

const CabeceraUsuarioInicio = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation(); // Asegúrate de que useLocation se llama aquí, dentro del componente

  // Determina si está en la página de buscar empleos
  const enBuscarEmpleos = location.pathname.includes(`/buscarEmpleos/${id}`);

  const handleInicioClick = () => {
    if (isAuthenticated && id) {
      navigate(`/detalleUsuario/${id}/inicio`);
    } else {
      navigate("/loginUsuario");
    }
  };

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/user/${id}`)
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
          {enBuscarEmpleos ? (
            <Nav.Link as={Link} to={`/detalleUsuario/${id}`}>
              Ver Perfil
            </Nav.Link>
          ) : (
            <Nav.Link as={Link} to={`/buscarEmpleos/${id}`}>
              <FontAwesomeIcon icon={faSearch} /> Buscar Empleo
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CabeceraUsuarioInicio;