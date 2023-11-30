import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'reactstrap';

import { Form } from 'react-bootstrap';
import md5 from 'md5';
import "../Styles/loginstyle.css"

import { Link, useNavigate } from 'react-router-dom';
import logofondo from "../img/logofondo.png";
import { Row, Col } from 'react-bootstrap';




import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faLock, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

const LoginForm = (props) => {
  const [password, setPassword] = useState("");
  const [usuario, setUsuario] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handlerLogin = (e) => {
    e.preventDefault();
    if (password === "" || usuario === "") {
      setLoginStatus("Ingrese su usuario y contraseña");
    } else {
      const hashedPassword = md5(password); // Cifrar la contraseña con md5

      axios.post('http://localhost:8000/api/user/login', { usuario, password: hashedPassword })
        .then(respuesta => {
          console.log(respuesta);
          if (respuesta.data.msg === "Usuario validado correctamente!!") {
            const user = respuesta.data.user;

            console.log(user);
            setLoginStatus(respuesta.data.msg);
            setTimeout(() => navigate('/detalleUsuario/' + user._id), 1000);
          } else {
            setLoginStatus(respuesta.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
          setLoginStatus(err.msg);

        });
    }
  }
  const RegresarPaginaPrincipal = () => {
    navigate("/");
  }
  const RegresarRegistrarComo = () => navigate("/registrarseComo");



  return (

    <Form onSubmit={handlerLogin} className="mi-formulario" >

      <h2>Empleos ChavezPamba</h2>
      <div className='imgs'>
        <img src={logofondo} className="tamañoImagenChavezPamba" />
      </div>

      <h2>Inicio de sesión de Usuario</h2>

      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Usuario</Form.Label>
            <div className="input-icon-wrapper">
              <FontAwesomeIcon icon={faUserCircle} className="input-icon fa-lg " />
              <Form.Control
                type="text"
                placeholder="Ingrese su usuario"
                onChange={(e) => setUsuario(e.target.value)}
                value={usuario}
              />
            </div>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Contraseña</Form.Label>
            <div className="password-field">
              <FontAwesomeIcon icon={faLock} className="field-icon" />
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Ingrese su contraseña"

                onChange={(e) => { setPassword(e.target.value); }} value={password}
                className="password-input" />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="toggle-password-icon"
                onClick={() => setShowPassword(!showPassword)} />
            </div>

          </Form.Group>
        </Col>
      </Row>


      <div className="botones-centrados">
        <Button className='btn-primary'>Iniciar Sesión</Button>
        <Button onClick={RegresarPaginaPrincipal} className='btn-primary'>Ir a la página principal</Button>
        <Button onClick={RegresarRegistrarComo} className='btn-danger'>Cancelar</Button>
      </div>



      <p style={{ color: 'red' }}>{loginStatus}</p>

      <Link to="/registrarUsuario">
        Regístrate ahora!
      </Link>




    </Form>






  )
}

export default LoginForm;