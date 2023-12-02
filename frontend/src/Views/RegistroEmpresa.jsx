import { useState, useParams } from 'react';

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/loginstyle.css'
import { Link, useNavigate } from 'react-router-dom';
import Cabecera from '../Components/Cabecera';
import TabsAdministracionComp from '../Components/Administracion/TabsAdministracionComp';
import { Form, Button, Modal, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faCalendarAlt, faInfoCircle, faPhone, faEnvelope, faMapMarker, faEye, faEyeSlash, faBuilding, faVenusMars, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const RegistroEmpresa = (props) => {
  const [nombreEmpresa, setNombreEmpresa] = useState("");
  const [correo, setCorreo] = useState("");
  ///
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);

    // Redirigir al usuario a la pantalla de inicio de sesión después de cerrar el modal
    navigate('/empresa');
  };

  const handleSuccessModalShow = () => setShowSuccessModal(true);
  ////


  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nombreEmpresaError, setNombreEmpresaError] = useState("");
  const [correoError, setCorreoError] = useState("");
  const [direccionError, setDireccionError] = useState("");
  const [telefonoError, settelefonoError] = useState("");
  const [descripcionError, setDescripcionError] = useState("");

  const [usuarioError, setusuarioError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const rol = "Empresa";
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleInputChange = (e, setterFunction, errorSetter) => {
    const value = e.target.value;
    setterFunction(value);
    errorSetter(value === '' ? 'Este campo es obligatorio' : '');
  };

  const handleTelefonoChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setTelefono(value);
    settelefonoError(value === '' ? 'Este campo es obligatorio' : /^\d+$/.test(value) ? '' : 'Solo se aceptan números');
  };

  const onsubmitHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/company/new', {
      nombreEmpresa, correo, rol, direccion, telefono, descripcion, usuario, password, confirmPassword
    })
      .then(res => {
        console.log(res);
        handleSuccessModalShow();
        setNombreEmpresa("");
        setCorreo("");
        //setRol("");
        setDireccion("");

        setTelefono("");
        setDescripcion("");
        setUsuario("");
        setPassword("");
        setConfirmPassword("");
        //setAviso("Empresa creada con exito!!");

        setNombreEmpresaError("");
        setCorreoError("");
        // setRolError("");
        setDireccionError("");

        settelefonoError("");
        setDescripcionError("");
        setusuarioError("");
        setPasswordError("");
        setConfirmPasswordError("");
      })
      .catch(err => {
        const errorResponse = err.response.data.errors;
        if (Object.keys(errorResponse).includes('nombreEmpresa')) {
          setNombreEmpresaError(errorResponse['nombreEmpresa'].message);
          //setAviso("");
        }
        else {
          setNombreEmpresaError("");

        }

        if (Object.keys(errorResponse).includes('correo')) {
          setCorreoError(errorResponse['correo'].message);
          //setAviso("");
        }
        else {
          setCorreoError("");

        }
        if (Object.keys(errorResponse).includes('direccion')) {
          setDireccionError(errorResponse['direccion'].message);
          //setAviso("");
        }
        else {
          setDireccionError("");

        }

        if (Object.keys(errorResponse).includes('telefono')) {
          settelefonoError(errorResponse['telefono'].message);
          //setAviso("");
        }
        else {
          settelefonoError("");

        }
        if (Object.keys(errorResponse).includes('descripcion')) {
          setDescripcionError(errorResponse['descripcion'].message);
          //setAviso("");
        }
        else {
          setDescripcionError("");

        }
        if (Object.keys(errorResponse).includes('usuario')) {
          setusuarioError(errorResponse['usuario'].message);
          //setAviso("");
        }
        else {
          setusuarioError("");

        }

        if (Object.keys(errorResponse).includes('password')) {
          setPasswordError(errorResponse['password'].message);
          //setAviso("");
        }
        else {
          setPasswordError("");

        }
        if (Object.keys(errorResponse).includes('confirmPassword')) {
          setConfirmPasswordError(errorResponse['confirmPassword'].message);
          //setAviso("");
        }
        else {
          setConfirmPasswordError("");

        }

      })
  }
  return (
    <div className='App'>

      <TabsAdministracionComp />
      <Form onSubmit={onsubmitHandler} className="mi-formulario">
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Nombre de la Empresa</Form.Label>
              <div className="input-icon-wrapper">
                <FontAwesomeIcon icon={faBuilding} className="input-icon fa-lg" /> {/* Cambiar el icono a uno que represente una empresa */}
                <Form.Control
                  type="text"
                  placeholder="Ingrese Nombre de la Empresa"
                  onChange={(e) => handleInputChange(e, setNombreEmpresa, setNombreEmpresaError)}
                  value={nombreEmpresa}
                />
              </div>
              <p className="text-danger">{nombreEmpresaError}</p>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Correo Electrónico</Form.Label>
              <div className="input-icon-wrapper">
                <FontAwesomeIcon icon={faEnvelope} className="input-icon fa-lg" /> {/* Icono de correo */}
                <Form.Control
                  type="text"
                  placeholder="Ingrese el correo electrónico"
                  onChange={(e) => handleInputChange(e, setCorreo, setCorreoError)}
                  value={correo}
                  className="large-input" // Agregar la clase "large-input" para hacerlo más grande
                />
              </div>
              <p className="text-danger">{correoError}</p>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Dirección</Form.Label>
              <div className="input-icon-wrapper">
                <FontAwesomeIcon icon={faMapMarker} className="input-icon fa-lg" /> {/* Icono de dirección */}
                <Form.Control
                  type="text"
                  placeholder="Ingrese la dirección"
                  className="large-input"
                  onChange={(e) => handleInputChange(e, setDireccion, setDireccionError)}
                  value={direccion}
                />
              </div>
              <p className="text-danger">{direccionError}</p>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Teléfono</Form.Label>
              <div className="input-icon-wrapper">
                <FontAwesomeIcon icon={faPhone} className="input-icon" />
                <Form.Control
                  type="text"
                  placeholder="Ingrese su teléfono"
                  value={telefono}
                  onChange={handleTelefonoChange} />
              </div>
              {telefonoError && <p className="text-danger">{telefonoError}</p>}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Usuario</Form.Label>
              <div className="input-icon-wrapper">
                <FontAwesomeIcon icon={faUserCircle} className="input-icon fa-lg" /> {/* Icono de usuario */}
                <Form.Control
                  type="text"
                  placeholder="Ingrese el usuario"
                  onChange={(e) => handleInputChange(e, setUsuario, setusuarioError)}
                  value={usuario}
                />
              </div>
              <p className="text-danger">{usuarioError}</p>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Descripción</Form.Label>
              <div className="input-icon-wrapper">
                <FontAwesomeIcon icon={faInfoCircle} className="input-icon fa-lg" /> {/* Icono de descripción */}
                <Form.Control
                  as="textarea" // Utiliza un textarea en lugar de un input
                  rows={4} // Puedes ajustar la cantidad de filas según tus preferencias
                  placeholder="Ingrese la descripción de la empresa"
                  onChange={(e) => handleInputChange(e, setDescripcion, setDescripcionError)}
                  value={descripcion}
                />
              </div>
              <p className="text-danger">{descripcionError}</p>
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
                  value={password}
                  onChange={(e) => handleInputChange(e, setPassword, setPasswordError)}
                  className="password-input" />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="toggle-password-icon"
                  onClick={() => setShowPassword(!showPassword)} />
              </div>
              {passwordError && <p className="text-danger">{passwordError}</p>}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Confirmar Contraseña</Form.Label>
              <div className="password-field">
                <FontAwesomeIcon icon={faLock} className="field-icon" />
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirmar Contraseña"
                  value={confirmPassword}
                  onChange={(e) => handleInputChange(e, setConfirmPassword, setConfirmPasswordError)}
                  className="password-input" />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="toggle-password-icon"
                  onClick={() => setShowPassword(!showPassword)} />
              </div>
              {confirmPasswordError && <p className="text-danger">{confirmPasswordError}</p>}
            </Form.Group>
          </Col>

        </Row>

        <div >
          <div >


            <div className="botones-centrados">
              <Button type="submit" className='btn-primary'>Crear cuenta</Button>
              <Button className='btn-danger' onClick={() => navigate('/listaEmpresas')}>Cancelar</Button>
            </div>
            <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
              <Modal.Header closeButton>
                <Modal.Title>¡Empresa creada con éxito!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Ahora puede acceder con sus credenciales.</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="success" onClick={handleSuccessModalClose}>
                  Cerrar
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>

      </Form>
    </div>
  );

}

export default RegistroEmpresa;
