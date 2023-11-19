import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'reactstrap';

import { Form } from 'react-bootstrap';
import md5 from 'md5';
import "../Styles/loginstyle.css"
import lock from "../img/lock.png";
import profile from "../img/icon.png";
import { Link, useNavigate} from 'react-router-dom';
import logofondo from "../img/logofondo.png";

const LoginForm = (props) => {
  const [password, setPassword] = useState("");
  const [usuario, setUsuario] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();
  const handlerLogin = (e) => {
    e.preventDefault();
    if (password === "" || usuario === "") {
      setLoginStatus("Ingrese su usuario y contraseña");
    } else {
      const hashedPassword = md5(password); // Cifrar la contraseña con md5

      axios.post('http://localhost:8000/api/user/login', { usuario, password: hashedPassword })
        .then(respuesta => {
          console.log(respuesta);
          if (respuesta.data.msg === "Usuario validado correctamente!!") {
            const user = respuesta.data.user;
            
            console.log(user);
            setLoginStatus(respuesta.data.msg);
            setTimeout(() => navigate('/detalleUsuario/'+user._id), 1000);
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
    <div class="fondo">
      <Form onSubmit={handlerLogin}>
        <div class="caja">
          <div class="cajaLogin" >
              <h2 >Empleos ChavezPamba</h2>
              <div className="imgs">
                  <img src={logofondo} alt="profile" className="tamañoImagenChavezPamba" />
              </div>
              <div>
                <h2>Inicio de sesión de Usuario</h2>
                <div>
                  <img src={profile}  class="iconos" />
                  <input type="text"  placeholder="user" onChange={(e) => {setUsuario(e.target.value);}}value={usuario}/>
                </div>
                <div>
                  <img src={lock} alt="password" class="iconos" />
                  <input type="password"   placeholder="Enter Password" onChange={(e) => { setPassword(e.target.value);}}value={password}/>
                </div>
                <div class="btn-container" >
                  <Button>Iniciar Sesión</Button>
                  <Button onClick={(e) => navigate("/")}>Ir a la página principal </Button>
                  <Button   onClick={e=>navigate("/registrarseComo")} >Cancelar</Button>
                </div>
                <p style={{ color: 'red' }}>{loginStatus}</p>
                <div>
                  <Link to="/registrarUsuario">
                    Regístrate ahora!
                  </Link>
                </div>
                <div >
                  
                </div>
              </div>
            
          </div>
        </div>
      </Form>
  </div>

    

        
      
  )
}

export default LoginForm;
