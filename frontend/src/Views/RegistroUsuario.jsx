import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/loginstyle.css';
import { useNavigate } from 'react-router-dom';

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

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    // Redirigir al usuario a la pantalla de inicio de sesión después de cerrar el modal
    navigate('/loginusuario');
  };

  const handleSuccessModalShow = () => setShowSuccessModal(true);

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
    setTelefonoError(value === '' ? 'Este campo es obligatorio' : /^\d+$/.test(value) ? '' : 'Solo se aceptan números');
  };

  //edad
  const [edad, setEdad] = useState(null);

  useEffect(() => {
    // Calcula la edad cuando la fecha de nacimiento cambia
    if (fechaNacimiento) {
      const fechaNac = new Date(fechaNacimiento);
      const hoy = new Date();
      const edadCalculada = hoy.getFullYear() - fechaNac.getFullYear();

      // Ajusta la edad si aún no ha llegado el cumpleaños
      if (hoy.getMonth() < fechaNac.getMonth() || (hoy.getMonth() === fechaNac.getMonth() && hoy.getDate() < fechaNac.getDate())) {
        setEdad(edadCalculada - 1);
      } else {
        setEdad(edadCalculada);
      }
    } else {
      setEdad(null);
    }
  }, [fechaNacimiento]);

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
  const { edad } = res.data;
  setEdad(edad);
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
        const errorResponse = err.response.data.errors;
        if (Object.keys(errorResponse).includes('nombre')) {
          setNombreError(errorResponse['nombre'].message);
        } else {
          setNombreError('');
        }

        if (Object.keys(errorResponse).includes('apellido')) {
          setApellidoError(errorResponse['apellido'].message);
        } else {
          setApellidoError('');
        }

        if (Object.keys(errorResponse).includes('sexo')) {
          setSexoError(errorResponse['sexo'].message);
        } else {
          setSexoError('');
        }

        if (Object.keys(errorResponse).includes('fechaNacimiento')) {
          setFechaNacimientoError(errorResponse['fechaNacimiento'].message);
        } else {
          setFechaNacimientoError('');
        }

        if (Object.keys(errorResponse).includes('telefono')) {
          setTelefonoError(errorResponse['telefono'].message);
        } else {
          setTelefonoError('');
        }

        if (Object.keys(errorResponse).includes('usuario')) {
          setUsuarioError(errorResponse['usuario'].message);
        } else {
          setUsuarioError('');
        }

        if (Object.keys(errorResponse).includes('password')) {
          setPasswordError(errorResponse['password'].message);
        } else {
          setPasswordError('');
        }

        if (Object.keys(errorResponse).includes('confirmPassword')) {
          setConfirmPasswordError(errorResponse['confirmPassword'].message);
        } else {
          setConfirmPasswordError('');
        }
      });
  };

  return (
    <Form onSubmit={onsubmitHandler}>
      <div className="caja">
        <div className="cajaRegistrarUsuario">
          <div>
            <div>
              <input
                type="text"
                placeholder="Ingrese su Nombre"
                onChange={(e) => handleInputChange(e, setNombre, setNombreError)}
                value={nombre}
              />
              <p>{nombreError}</p>
              <input
                type="text"
                placeholder="Ingrese su Apellido"
                onChange={(e) => handleInputChange(e, setApellido, setApellidoError)}
                value={apellido}
              />
              <p>{apellidoError}</p>
            </div>

            <div className="select">
              <select onChange={(e) => handleInputChange(e, setSexo, setSexoError)} value={sexo}>
                <option value="">--Seleccione el género--</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
            <p>{sexoError}</p>

            <div className="textos_normales">
              <p>Seleccione su fecha de nacimiento </p>
              <input
                type="date"
                onChange={(e) => handleInputChange(e, setFechaNacimiento, setFechaNacimientoError)}
                value={fechaNacimiento}
              />
            </div>
            <p>{fechaNacimientoError}</p>

            <div className="textos_normales">
              <p>Edad</p>
              <input type="text" value={edad !== null ? `${edad} años` : ''} readOnly />
            </div>

            <div>
              <input
                type="text"
                placeholder="Ingrese su teléfono"
                onChange={handleTelefonoChange}
                value={telefono}
              />
              <p>{telefonoError}</p>
            </div>

            <div>
              <input
                type="text"
                placeholder="Ingrese Usuario "
                onChange={(e) => handleInputChange(e, setUsuario, setUsuarioError)}
                value={usuario}
              />
              <p>{usuarioError}</p>
            </div>

            <div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Ingrese su contraseña"
                title="Debe tener al menos una mayúscula, una minúscula y un dígito"
                onChange={(e) => handleInputChange(e, setPassword, setPasswordError)}
                value={password}
              />
              <div>
                <Button
                  style={{ padding: '1px', width: '50px', borderRadius: '100%', color: 'black', backgroundColor: '#ABEBC6' }}
                  onClick={togglePasswordVisibility}
                  variant="link"
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </Button>
              </div>
              <p>{passwordError}</p>
            </div>

            <div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirmar Contraseña"
                onChange={(e) => handleInputChange(e, setConfirmPassword, setConfirmPasswordError)}
                value={confirmPassword}
              />
              <div>
                <Button
                  style={{ padding: '1px', width: '50px', borderRadius: '100%', color: 'black', backgroundColor: '#ABEBC6' }}
                  onClick={toggleConfirmPasswordVisibility}
                  variant="link"
                >
                  <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
                </Button>
              </div>
              <p>{confirmPasswordError}</p>
            </div>

            <div className="btn-container">
              <Button type="submit">Crear cuenta</Button>
              <Button onClick={(e) => navigate('/loginusuario')}>Cancelar</Button>
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
          </div>
        </div>
      </div>
    </Form>
  );
};

export default RegistroUsuario;
