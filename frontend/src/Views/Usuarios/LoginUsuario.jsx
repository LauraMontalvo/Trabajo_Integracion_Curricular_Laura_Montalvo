import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'reactstrap';

import { Form } from 'react-bootstrap';
import md5 from 'md5';
import "../../Styles/loginstyle.css"
import { Link, useNavigate } from 'react-router-dom';

import logofondo from "../../img/logofondo.png";
import { Row, Col } from 'react-bootstrap';
import * as constantes from '../../Models/Constantes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faLock, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import Cabecera from '../../Components/General/Cabecera';

const LoginForm = (props) => {
  const [password, setPassword] = useState("");
  const [usuario, setUsuario] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handlerLogin = (e) => {
    e.preventDefault();
    if (password === "" || usuario === "") {
      setLoginStatus(constantes.TEXTO_INGRESE_DATOS);
    } else {
      const hashedPassword = md5(password); // Cifrar la contraseña con md5

      axios.post(constantes.URL_VALIDAR_AUTENTICACION, { usuario, password: hashedPassword })
        .then(respuesta => {
          console.log(respuesta);
          if (respuesta.data.msg === constantes.MENSAJE_LOGIN_EXITO) {
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

  const RegresarRegistrarComo = () => navigate("/registrarseComo");



  return (
    <div className='App'>
      <Cabecera></Cabecera>
      <Form onSubmit={handlerLogin} className="mi-formulario" >

        <h2>{constantes.TEXTO_TITULO}</h2>
        <div className='imgs'>
          <img src={logofondo} className="tamañoImagenChavezPamba" />
        </div>

        <h2>{constantes.TEXTO_INICIO_SESION}</h2>

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

          <Button onClick={RegresarRegistrarComo} className='btn-danger'>Cancelar</Button>
        </div>

        <p style={{ color: 'red' }}>{loginStatus}</p>
        <h6>¿Aún no estás registrado?</h6>
        <Link to="/registrarUsuario">Regístrate ahora!</Link>
      </Form>
    </div>

  )
}

export default LoginForm;