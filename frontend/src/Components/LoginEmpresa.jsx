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

const LoginFormEmpresa = (props) => {
  const [password, setPassword] = useState("");
  const [usuario, setUsuario] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();


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
            setTimeout(() => navigate('/detalleUsuario/'+user.id), 1000);
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

 

  return (
  <div className='fondo'>
    <Form onSubmit={handlerLoginEmpresa}>
      <div className='caja'>
        <div className='cajaLogin'>
          <h2>Empleos ChavezPamba</h2>
          <div className='imgs'>
            <img src={logofondo} className="tamañoImagenChavezPamba" />
          </div>
          <div>
            <h2>{constantes.TEXTO_INICIO_SESION_EMPRESA}</h2>
            <div>
              <img src={profile}  className='iconos' />
              <input type="text" placeholder='user' onChange={e => { setUsuario(e.target.value) }} value={usuario}/>
            </div>
            <div>
              <img src={lock} alt='password' className='iconos' />
              <input type="password" placeholder='Enter Password'  onChange={e => { setPassword(e.target.value) }} value={password} />
            </div>
            <div className='btn-container'>
              <Button>Iniciar Sesión</Button>
              <Button onClick={e => navigate("/")}>Ir a la pagina principal</Button>
              <Button   onClick={e=>navigate("/registrarseComo")} >Cancelar</Button>

            </div>
            <p style={{ color: 'red' }}>{loginStatus}</p>
          
          </div>
        </div>
      </div>
    </Form>
  </div>

        
      
  )
}

export default LoginFormEmpresa;
