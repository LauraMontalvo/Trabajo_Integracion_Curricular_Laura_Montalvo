import React, { useState, useEffect } from 'react';


import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/loginstyle.css';
import { useNavigate } from 'react-router-dom';
import { Form,  Button, Modal, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faCalendarAlt, faPhone, faEye, faEyeSlash, faVenusMars, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const RegistroUsuario = (props) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [sexo, setSexo] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nombreError, setNombreError] = useState('');
  const [apellidoError, setApellidoError] = useState('');
  const [sexoError, setSexoError] = useState('');
  const [fechaNacimientoError, setFechaNacimientoError] = useState('');
  const [telefonoError, setTelefonoError] = useState('');
  const [usuarioError, setUsuarioError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    // Redirigir al usuario a la pantalla de inicio de sesión después de cerrar el modal
    navigate('/loginusuario');
  };

  const handleErrorModalClose = () => {
    setShowErrorModal(false);
  };

  const handleSuccessModalShow = () => setShowSuccessModal(true);

  const handleErrorModalShow = () => setShowErrorModal(true);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
 



  const handleInputChange = (e, setterFunction, errorSetter) => {
    const value = e.target.value;
    setterFunction(value);
    errorSetter(value === '' ? 'Este campo es obligatorio' : '');
  };

  const handleTelefonoChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setTelefono(value);
    setTelefonoError(value === '' ? 'Este campo es obligatorio' : /^\d+$/.test(value) ? '' : 'Solo se aceptan números');
  };

  //edad


  

  const onsubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/user/new', {
        nombre,
        apellido,
        rol: 'Usuario',
        sexo,
        fechaNacimiento,
        telefono,
        usuario,
        password,
        confirmPassword,
      })
      .then((res) => {
        console.log(res);
        // Extraer la edad de la respuesta del servidor y establecerla en el estado
    
        handleSuccessModalShow();
        setNombre('');
        setApellido('');
        setSexo('');
        setFechaNacimiento('');
        setTelefono('');
        setUsuario('');
        setPassword('');
        setConfirmPassword('');
        setNombreError('');
        setApellidoError('');
        setSexoError('');
        setFechaNacimientoError('');
        setTelefonoError('');
        setUsuarioError('');
        setPasswordError('');
        setConfirmPasswordError('');
      })
      .catch((err) => {
        console.log(err)
        
        if (err.response.data.msg === "Usuario existe"){
          handleErrorModalShow();
          setPassword('');
          setConfirmPassword('');
          setUsuario('');
        }
        
      });
  };

  return (
 
    
    <Form onSubmit={onsubmitHandler} className="mi-formulario">
      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <div className="input-icon-wrapper">
              <FontAwesomeIcon icon={faUser} className="input-icon" />
              <Form.Control
                type="text"
                placeholder="Ingrese su Nombre"
                value={nombre}
                onChange={(e) => handleInputChange(e, setNombre, setNombreError)} />
            </div>
            {nombreError && <p className="error-message">{nombreError}</p>}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Apellido</Form.Label>
            <div className="input-icon-wrapper">
              <FontAwesomeIcon className="input-icon" />
              <Form.Control
                type="text"
                placeholder="Ingrese su Apellido"
                value={apellido}
                onChange={(e) => handleInputChange(e, setApellido, setApellidoError)}
                className="input-with-icon" />
            </div>
            {apellidoError && <p className="text-danger">{apellidoError}</p>}
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Género</Form.Label>
            <div className="input-icon-wrapper">
              <FontAwesomeIcon icon={faVenusMars} className="input-icon" />
              <Form.Control as="select"
                onChange={(e) => handleInputChange(e, setSexo, setSexoError)}
                value={sexo}
                className="input-with-icon">
                <option value=" "> --Seleccione el género--</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </Form.Control>
            </div>
            {sexoError && <p className="text-danger">{sexoError}</p>}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <div className="input-icon-wrapper">
              <FontAwesomeIcon icon={faCalendarAlt} className="input-icon" />
              <Form.Control
                type="date"
                onChange={(e) => handleInputChange(e, setFechaNacimiento, setFechaNacimientoError)}
                value={fechaNacimiento}
                className="input-with-icon" />
            </div>
            {fechaNacimientoError && <p className="text-danger">{fechaNacimientoError}</p>}
          </Form.Group>
        </Col>
        {/* Repite la misma estructura para otros campos */}

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
              <FontAwesomeIcon icon={faUserCircle} className="input-icon fa-lg" />
              <Form.Control
                type="text"
                placeholder="Ingrese Usuario"
                value={usuario}
                onChange={(e) => handleInputChange(e, setUsuario, setUsuarioError)}
                className="input-with-icon" />
            </div>
            {usuarioError && <p className="text-danger">{usuarioError}</p>}
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
      <div className="botones-centrados">
        <Button type="submit" className='btn-primary'>Crear cuenta</Button>
        <Button className='btn-danger'onClick={() => navigate('/loginusuario')}>Cancelar</Button>
      </div>
      <div></div>
      <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>¡Usuario creado con éxito!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Ahora puede acceder con sus credenciales.</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSuccessModalClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showErrorModal} onHide={handleErrorModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>¡Error!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Usuario ya existe.</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleErrorModalClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>


    </Form>

  );
};

export default RegistroUsuario;
