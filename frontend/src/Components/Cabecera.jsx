import { useNavigate } from "react-router-dom";
import "../Styles/header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Navbar, Nav } from "reactstrap";

const Cabecera = (props) => {
  const navigate = useNavigate();

  return (
    <Navbar color="light" light expand="md" className="mb-4">
      <h1 className="Titulo">Empleos ChavezPamba</h1>
      <Nav className="ml-auto" navbar>
        <Button className="boton" onClick={() => navigate("/")}>
          Inicio
        </Button>
        <Button className="boton" onClick={() => navigate("/registrarseComo")}>
          Iniciar sesión
        </Button>
      </Nav>
    </Navbar>
  );
};

export default Cabecera;
