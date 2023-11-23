import axios from 'axios';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import md5 from 'md5';
import "../Styles/loginstyle.css"
import lock from "../img/lock.png";
import profile from "../img/icon.png";
import { Link, useNavigate } from 'react-router-dom';
import logofondo from "../img/logofondo.png";
import { TEXTO_INGRESE_DATOS, URL_VALIDAR_AUTENTICACION,ROL_ADMINISTRADOR, MENSAJE_LOGIN_EXITO, TEXTO_IR_PAGINA_PRINCIPAL, TEXTO_INICIO_SESION, TEXTO_INICIAR_SESION, MENSAJE_LOGIN_FALLIDO, URL_REGISTRAR_COMO , URL_ADMIN_CONSOLA } from "../Models/Constantes"

const LoginAdminForm = (props) => {
  const [password, setPassword] = useState("");
  const [usuario, setUsuario] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();
  const handlerLogin = (e) => {
    e.preventDefault();
    if (password === "" || usuario === "") {
      setLoginStatus(TEXTO_INGRESE_DATOS);
    } else {
      const hashedPassword = md5(password); // Cifrar la contraseña con md5

      axios.post(URL_VALIDAR_AUTENTICACION, { usuario, password: hashedPassword })
        .then(respuesta => {
          console.log(respuesta);
          if (respuesta.data.msg === MENSAJE_LOGIN_EXITO && respuesta.data.user.rol === ROL_ADMINISTRADOR) {
            const user = respuesta.data.user;
            console.log(user);
            setLoginStatus(respuesta.data.msg);
            setTimeout(() => navigate(URL_ADMIN_CONSOLA + user._id), 1000);
          } else {
            setLoginStatus(MENSAJE_LOGIN_FALLIDO);
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
      <Form onSubmit={handlerLogin}>
        <div className='caja'>
          <div className='cajaLogin'>
            <div className='im'>
              <h2>Empleos ChavezPamba</h2>
            </div>
            <div className='imgs'>
              <div className='container-image'>
                <img src={logofondo} alt='profile' className='tamañoImagenChavezPamba' />
              </div>
            </div>
            <h2>{TEXTO_INICIO_SESION}</h2>
            <div>
              <img src={profile} className='iconos' />
              <input type="text" placeholder='Usuario' onChange={e => setUsuario(e.target.value)} value={usuario} />
            </div>
            <div>
              <img src={lock} alt='password' className='iconos' />
              <input type="password" placeholder='Contraseña' className='fill' onChange={e => setPassword(e.target.value)} value={password} />
            </div>
            <div className='btn-container'>
              <button type="submit">{TEXTO_INICIAR_SESION}</button>
            </div>
            <p style={{ color: 'red' }}>{loginStatus}</p>
            <div className='login-btn'>
              <button onClick={() => navigate("/")}>{TEXTO_IR_PAGINA_PRINCIPAL}</button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default LoginAdminForm;
