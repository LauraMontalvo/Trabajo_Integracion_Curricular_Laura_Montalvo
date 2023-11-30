import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { Form } from 'react-bootstrap';
import md5 from 'md5';
import "../Styles/loginstyle.css"
import lock from "../img/lock.png";
import * as constantes from '../Models/Constantes'
import profile from "../img/empresa.png";
import { Link, useNavigate} from 'react-router-dom';
import logofondo from "../img/logofondo.png";
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faBuilding,faLock, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

const LoginFormEmpresa = (props) => {
  const [password, setPassword] = useState("");
  const [usuario, setUsuario] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();
 const [showPassword, setShowPassword] = useState(false);

  const handlerLoginEmpresa = (e) => {
    e.preventDefault();
    if (password === "" || usuario === "") {
      setLoginStatus(constantes.TEXTO_INGRESE_DATOS);
    } else {
      const hashedPassword = md5(password); // Cifrar la contraseña con md5

      axios.post(constantes.URL_VALIDAR_AUTENTICACION_EMPRESA, { usuario, password: hashedPassword })
        .then(respuesta => {
          console.log(respuesta);
          if (respuesta.data.msg === constantes.MENSAJE_LOGIN_EXITO_EMPRESA) {
            const user = respuesta.data.user;
            
            console.log(user);
            setLoginStatus(respuesta.data.msg);
            setTimeout(() => navigate(constantes.URL_DETALLE_EMPRESA+user._id), 1000);
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
 
    <Form onSubmit={handlerLoginEmpresa} className="mi-formulario">
      
            
         
          <h2>Empleos ChavezPamba</h2>
          <div className='imgs'>
        <img src={logofondo} className="tamañoImagenChavezPamba" />
      </div>
            <h2>{constantes.TEXTO_INICIO_SESION_EMPRESA}</h2>
            
              <Row>
              <Col md={6}>
  <Form.Group>
    <Form.Label>Usuario de la Empresa</Form.Label>
    <div className="input-icon-wrapper">
      <FontAwesomeIcon icon={faBuilding} className="input-icon fa-lg" /> {/* Cambiar el icono a uno que represente una empresa */}
      <Form.Control
        type="text"
        placeholder="Ingrese el usuario de la empresa"
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
          
         
    </Form>
 

        
      
  )
}

export default LoginFormEmpresa;
