import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/loginstyle.css'
import { Link, useNavigate} from 'react-router-dom';

const RegistroEmpresa = (props) => {
  const [ nombreEmpresa, setNombreEmpresa] = useState("");
  const [ correo, setCorreo] = useState("");
  
  const [ direccion, setDireccion] = useState("");
  const [ telefono, setTelefono] = useState("");
  const [ descripcion, setDescripcion] = useState("");

  const [ usuario, setUsuario] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ aviso, setAviso ] = useState("");
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
      const value = e.target.value.trim();
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
        setNombreEmpresa("");
        setCorreo("");
        //setRol("");
        setDireccion("");
        
        setTelefono("");
        setDescripcion("");
        setUsuario("");
        setPassword("");
        setConfirmPassword("");
        setAviso("Empresa creada con exito!!");

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
          setAviso("");
        }
        else{
          setNombreEmpresaError("");

        }

        if (Object.keys(errorResponse).includes('correo')) {
          setCorreoError(errorResponse['correo'].message);
          setAviso("");
        }
        else{
          setCorreoError("");

        }
        if (Object.keys(errorResponse).includes('direccion')) {
          setDireccionError(errorResponse['direccion'].message);
          setAviso("");
        }
        else{
          setDireccionError("");

        }
        
        if (Object.keys(errorResponse).includes('telefono')) {
          settelefonoError(errorResponse['telefono'].message);
          setAviso("");
        }
        else{
          settelefonoError("");

        }
        if (Object.keys(errorResponse).includes('descripcion')) {
            setDescripcionError(errorResponse['descripcion'].message);
            setAviso("");
          }
          else{
            setDescripcionError("");
  
          }
        if (Object.keys(errorResponse).includes('usuario')) {
          setusuarioError(errorResponse['usuario'].message);
          setAviso("");
        }
        else{
          setusuarioError("");

        }

        if(Object.keys(errorResponse).includes('password')) {
          setPasswordError(errorResponse['password'].message);
          setAviso("");
        }
        else{
          setPasswordError("");

        }  
        if(Object.keys(errorResponse).includes('confirmPassword')) {
          setConfirmPasswordError(errorResponse['confirmPassword'].message);
          setAviso("");
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
                <input type="text" placeholder='Nombre de la Empresa' className='fill'
                  onChange={e => handleInputChange(e, setNombreEmpresa, setNombreEmpresaError)} value={nombreEmpresa} />
                <p style={{ color: 'red' }}>{nombreEmpresaError}</p>
                <input type="text" placeholder='Ingrese correo' className='fill'
                  onChange={e => handleInputChange(e, setCorreo, setCorreoError)} value={correo} />
                <p style={{ color: 'red' }}>{correoError}</p>
              </div>
              <div>
                <input type="text" placeholder='Ingrese Direccion' className='fill'
                  onChange={e => handleInputChange(e, setDireccion, setDireccionError)} value={direccion} />
                <p style={{ color: 'red' }}>{direccionError}</p>
                
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
                <textarea
        
                  placeholder='Ingrese Descripcion'
                  className='fill'
                  onChange={(e) => handleInputChange(e, setDescripcion, setDescripcionError)}
                  value={descripcion}
                />
                <p style={{ color: 'red' }}>{descripcionError}</p>
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
                <button onClick={e => navigate("/empresa")}>Cancelar</button >
              </div>
            </div>
          </div>
        </div >
        <h4>{aviso}</h4>
      </Form>
    );
  
}

export default RegistroEmpresa;
