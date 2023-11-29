import { useState,useParams} from 'react';
import { Form, Button,Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/loginstyle.css'
import { Link, useNavigate} from 'react-router-dom';

const RegistroEmpresa = (props) => {
  const [ nombreEmpresa, setNombreEmpresa] = useState("");
  const [ correo, setCorreo] = useState("");
  ///
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    
    // Redirigir al usuario a la pantalla de inicio de sesión después de cerrar el modal
    navigate('/empresa');
  };

  const handleSuccessModalShow = () => setShowSuccessModal(true);
////


  const [ direccion, setDireccion] = useState("");
  const [ telefono, setTelefono] = useState("");
  const [ descripcion, setDescripcion] = useState("");

  const [ usuario, setUsuario] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  //const [ aviso, setAviso ] = useState("");
  const [ nombreEmpresaError, setNombreEmpresaError] = useState("");
  const [ correoError, setCorreoError] = useState("");
  //const [ rolError, setRolError] = useState("");
  const [ direccionError, setDireccionError] = useState("");
  const [ telefonoError, settelefonoError] = useState("");
  const [ descripcionError, setDescripcionError] = useState("");

  const [ usuarioError, setusuarioError] = useState("");
  const [ passwordError, setPasswordError] = useState("");
  const [ confirmPasswordError, setConfirmPasswordError ] = useState("");
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
        nombreEmpresa,correo,rol,direccion,telefono,descripcion,usuario, password, confirmPassword })
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
        else{
          setNombreEmpresaError("");

        }

        if (Object.keys(errorResponse).includes('correo')) {
          setCorreoError(errorResponse['correo'].message);
          //setAviso("");
        }
        else{
          setCorreoError("");

        }
        if (Object.keys(errorResponse).includes('direccion')) {
          setDireccionError(errorResponse['direccion'].message);
          //setAviso("");
        }
        else{
          setDireccionError("");

        }
        
        if (Object.keys(errorResponse).includes('telefono')) {
          settelefonoError(errorResponse['telefono'].message);
          //setAviso("");
        }
        else{
          settelefonoError("");

        }
        if (Object.keys(errorResponse).includes('descripcion')) {
            setDescripcionError(errorResponse['descripcion'].message);
            //setAviso("");
          }
          else{
            setDescripcionError("");
  
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
        <div className='caja'>
          <div className='cajaRegistrarEmpresa' >
            <div>
              <input type="text" placeholder='Nombre de la Empresa' 
                onChange={e => handleInputChange(e, setNombreEmpresa, setNombreEmpresaError)} value={nombreEmpresa} />
                <p >{nombreEmpresaError}</p>
              <input type="text" placeholder='Ingrese correo' 
                onChange={e => handleInputChange(e, setCorreo, setCorreoError)} value={correo} />
                <p >{correoError}</p>
              <input type="text" placeholder='Ingrese Direccion' 
                onChange={e => handleInputChange(e, setDireccion, setDireccionError)} value={direccion} />
                <p >{direccionError}</p>
              <input type="text" placeholder="Ingrese su teléfono" onChange={handleTelefonoChange} value={telefono}
              />
                <p >{telefonoError}</p>
              <textarea placeholder='Ingrese Descripcion'   onChange={(e) => handleInputChange(e, setDescripcion, setDescripcionError)}
                value={descripcion}
              />
                <p>{descripcionError}</p>
              <input type="text"
                placeholder='Ingrese Usuario '
                onChange={(e) => handleInputChange(e, setUsuario, setusuarioError)}
                value={usuario}
              />
                <p >{usuarioError}</p>

              <input type={showPassword ? 'text' : 'password'} placeholder="Ingrese su contraseña" 
                title="Debe tener al menos una mayúscula, una minúscula y un dígito"
                onChange={(e) => handleInputChange(e, setPassword, setPasswordError)}
                value={password}
              />
              <p>{passwordError}</p>
              <div> <Button style={{ padding: '5px', width: '50px', borderRadius: '100%', color: 'black', backgroundColor: '#ABEBC6' }}
                type="button" onClick={togglePasswordVisibility} variant="link">
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </Button>
              </div>

              <input  type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirmar Contraseña"  onChange={(e) => handleInputChange(e, setConfirmPassword, setConfirmPasswordError)}  value={confirmPassword} />
              <p>{confirmPasswordError}</p>
              <div><Button style={{ padding: '5px', width: '50px', borderRadius: '100%', color: 'black', backgroundColor: '#ABEBC6' }}  onClick={toggleConfirmPasswordVisibility} variant="link">
                <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
              </Button></div>
              
               
            </div>

            <div className='btn-container'>
              <Button type='submit' >Crear cuenta</Button >
              <Button onClick={e => navigate("/empresa")}>Cancelar</Button >
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
      
        {/*<h4>{aviso}</h4>*/}
      </Form>
    );
  
}

export default RegistroEmpresa;
