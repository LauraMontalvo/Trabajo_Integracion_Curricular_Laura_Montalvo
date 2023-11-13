import { useState } from 'react';
import { Form, Button ,Modal} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/loginstyle.css'
import { Link, useNavigate} from 'react-router-dom';

const RegistroUsuario = (props) => {
  const [ nombre, setNombre] = useState("");
  const [ apellido, setApellido] = useState("");
  
  const [ sexo, setSexo] = useState("");
  const [ fechaNacimiento, setFechaNacimiento] = useState("");
  const [ telefono, setTelefono] = useState("");
  const [ usuario, setUsuario] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  //const [ aviso, setAviso ] = useState("");
  const [ nombreError, setNombreError] = useState("");
  const [ apellidoError, setApellidoError] = useState("");
  //const [ rolError, setRolError] = useState("");
  const [ sexoError, setSexoError] = useState("");
  const [ fechaNacimientoError, setFechaNacimientoError] = useState("");
  const [ telefonoError, settelefonoError] = useState("");
  const [ usuarioError, setusuarioError] = useState("");
  const [ passwordError, setPasswordError] = useState("");
  const [ confirmPasswordError, setConfirmPasswordError ] = useState("");

///
 ///
 const [showSuccessModal, setShowSuccessModal] = useState(false);

 const handleSuccessModalClose = () => {
   setShowSuccessModal(false);
   
   // Redirigir al usuario a la pantalla de inicio de sesión después de cerrar el modal
   navigate('/usuario');
 };


////

const handleSuccessModalShow = () => setShowSuccessModal(true);
////


  const rol = "Usuario";
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
      axios.post('http://localhost:8000/api/user/new', { 
          nombre,apellido,rol,sexo,fechaNacimiento,telefono,usuario, password, confirmPassword })
      .then(res => {
        console.log(res);
        handleSuccessModalShow();
        setNombre("");
        setApellido("");
        //setRol("");
        setSexo("");
        setFechaNacimiento("");
        setTelefono("");
        setUsuario("");
        setPassword("");
        setConfirmPassword("");
        //setAviso("Usuario creado con exito!!");

        setNombreError("");
        setApellidoError("");
        // setRolError("");
        setSexoError("");
        setFechaNacimientoError("");
        settelefonoError("");
        setusuarioError("");
        setPasswordError(""); 
        setConfirmPasswordError("");
      })
      .catch(err => {
        const errorResponse = err.response.data.errors;
        if (Object.keys(errorResponse).includes('nombre')) {
          setNombreError(errorResponse['nombre'].message);
          //setAviso("");
        }
        else{
          setNombreError("");

        }

        if (Object.keys(errorResponse).includes('apellido')) {
          setApellidoError(errorResponse['apellido'].message);
          //setAviso("");
        }
        else{
          setApellidoError("");

        }
        if (Object.keys(errorResponse).includes('sexo')) {
          setSexoError(errorResponse['sexo'].message);
          //setAviso("");
        }
        else{
          setSexoError("");

        }
        if (Object.keys(errorResponse).includes('fechaNacimiento')) {
          setFechaNacimientoError(errorResponse['fechaNacimiento'].message);
          //setAviso("");
        }
        else{
          setFechaNacimientoError("");

        }
        if (Object.keys(errorResponse).includes('telefono')) {
          settelefonoError(errorResponse['telefono'].message);
          //setAviso("");
        }
        else{
          settelefonoError("");

        }
        if (Object.keys(errorResponse).includes('usuario')) {
          setusuarioError(errorResponse['usuario'].message);
          //setAviso("");
        }
        else{
          setusuarioError("");

        }

        if(Object.keys(errorResponse).includes('password')) {
          setPasswordError(errorResponse['password'].message);
          //setAviso("");
        }
        else{
          setPasswordError("");

        }  
        if(Object.keys(errorResponse).includes('confirmPassword')) {
          setConfirmPasswordError(errorResponse['confirmPassword'].message);
          //setAviso("");
        }
        else{
          setConfirmPasswordError("");

        } 
          
      })  
  }
    return (
      <Form onSubmit={onsubmitHandler}>
        <div className='main'>
          <div className='sub-main' style={{ height: '960px' }}>
            <div>
              <div>
                <input type="text" placeholder='Ingrese su Nombre' className='fill'
                  onChange={e => handleInputChange(e, setNombre, setNombreError)} value={nombre} />
                <p style={{ color: 'red' }}>{nombreError}</p>
                <input type="text" placeholder='Ingrese su Apellido' className='fill'
                  onChange={e => handleInputChange(e, setApellido, setApellidoError)} value={apellido} />
                <p style={{ color: 'red' }}>{apellidoError}</p>
              </div>
  
              <div className='select'>
                <select onChange={e => handleInputChange(e, setSexo, setSexoError)} value={sexo}>
                  <option value="">--Seleccione el género--</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
              </div>
              <p style={{ color: 'red' }}>{sexoError}</p>
  
              <div>
                <p>Seleccione su fecha de nacimiento </p>
                <input type="date" className='fill'
                  onChange={e => handleInputChange(e, setFechaNacimiento, setFechaNacimientoError)}
                  value={fechaNacimiento} />
                <p style={{ color: 'red' }}>{fechaNacimientoError}</p>
              </div>
  
              <div>
                <input
                  type="text"
                  placeholder="Ingrese su teléfono"
                  className="fill"
                  onChange={handleTelefonoChange} value={telefono}
                />
                <p style={{ color: 'red' }}>{telefonoError}</p>
              </div>
  
              <div>
                <input
                  type="text"
                  placeholder='Ingrese Usuario '
                  className='fill'
                  onChange={(e) => handleInputChange(e, setUsuario, setusuarioError)}
                  value={usuario}
                />
                <p style={{ color: 'red' }}>{usuarioError}</p>
              </div>
  
              <div>
                <input type={showPassword ? 'text' : 'password'} placeholder="Ingrese su contraseña" className="fill"
                  title="Debe tener al menos una mayúscula, una minúscula y un dígito"
                  onChange={(e) => handleInputChange(e, setPassword, setPasswordError)}
                  value={password}
                />
                <Button style={{ padding: '5px', width: '50px', borderRadius: '100%', color: 'black', backgroundColor: '#ABEBC6' }}
                  type="button" onClick={togglePasswordVisibility} variant="link">
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </Button>
                <p style={{ color: 'red' }}>{passwordError}</p>
              </div>
  
              <div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirmar Contraseña"
                  className="fill"
                  onChange={(e) => handleInputChange(e, setConfirmPassword, setConfirmPasswordError)}
                  value={confirmPassword}
                />
                <Button style={{ padding: '5px', width: '50px', borderRadius: '100%', color: 'black', backgroundColor: '#ABEBC6' }}
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  variant="link">
                  <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
                </Button>
                <p style={{ color: 'red' }}>{confirmPasswordError}</p>
              </div>
  
              <div className='btn'>
                <button type='submit' >Crear cuenta</button >
              </div>
              <div>
                <button onClick={e => navigate("/usuario")}>Cancelar</button >
              </div>
              <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
                <Modal.Header closeButton>
                  <Modal.Title>¡Usuario creado con éxito!</Modal.Title>
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
        </div >
       {/*<h4>{aviso}</h4>*/}
      </Form>
    );
  
}

export default RegistroUsuario;
