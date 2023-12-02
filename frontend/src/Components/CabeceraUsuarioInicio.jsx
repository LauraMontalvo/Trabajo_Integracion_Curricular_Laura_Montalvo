import React, { useEffect } from "react"; // Importa useEffect desde react
import { Link, useNavigate, useParams } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "../Styles/header.scss"; // Importa tus estilos personalizados
import axios from 'axios';

const CabeceraUsuarioInicio = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleInicioClick = () => {
    if (isAuthenticated && id) {
      navigate(`/detalleUsuario/${id}/inicio`); // Redirige a la página principal del usuario
    } else {
      // Si el usuario no está autenticado o id no está definido, redirige a la página de inicio de sesión.
      navigate("/loginUsuario");
    }
  };

  useEffect(() => {
    // Verifica si id está definido antes de hacer la solicitud.
    if (id) {
      axios.get(`http://localhost:8000/api/user/${id}`)
        .then((res) => {
          // Aquí puedes agregar la lógica para manejar la respuesta si es necesario.
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Navbar.Brand as={Link} to="/" className="titulo-Chavp">
        <h2>Empleos ChavezPamba</h2>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav.Link onClick={handleInicioClick}>Inicio</Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CabeceraUsuarioInicio;
