import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'reactstrap';

import { Form } from 'react-bootstrap';
import md5 from 'md5';
import "../Styles/loginstyle.css"
import lock from "../img/candadoempresa.png";
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
      setLoginStatus("Ingrese su usuario y contraseña");
    } else {
      const hashedPassword = md5(password); // Cifrar la contraseña con md5

      axios.post('http://localhost:8000/api/company/login', { usuario, password: hashedPassword })
        .then(respuesta => {
          console.log(respuesta);
          if (respuesta.data.msg === "Empresa validado correctamente!!") {
            const user = respuesta.data.user;
            
            console.log(user);
            setLoginStatus(respuesta.data.msg);
            setTimeout(() => navigate('/Main/'+user._id), 1000);
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
    <div className='body'>
    <Form onSubmit={handlerLoginEmpresa }>
    <div className='main'>
                <div className='sub-main' style={{ height: '690px' }} >
                    <div>
                    <h2 className='LHeader ' >Empleos ChavezPamba</h2>
                        <div className='imgs'>
                            
                            <div className='container-image' >
                                <img src={logofondo} alt='profile' className='profile'/>
                            </div>
                        </div>
                        <div>
                            <h1 className='LHeader'>Inicio de sesión de Empresa</h1>
                            <div>
                            <img src={profile} alt="email" className='email' />
                                <input type="text" placeholder='user' className='fill' onChange={e => { setUsuario(e.target.value) }} value={usuario}/>
                            </div>
                            <div className='second-input'>
                                <img src={lock} alt='password' className='email' />
                                <input type="password" placeholder='Enter Password' className='fill' onChange={e => { setPassword(e.target.value) }} value={password}/>
                            </div>
                           
                            <div className='login-btn'>
                                <button  >Iniciar Sesion</button>
                            </div>
                            <p style={{color:'red'}}>{loginStatus}</p>
                            
                            <div>
                                
                                <Link className='link' to='/registrarEmpresa'>

                                    <li>Registrate ahora!</li>
                                </Link>
                                
                            </div>

                            <div className='login-btn'>
                                <button   onClick={e=>navigate("/")}>Ir a la pagina principal</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        
    </Form>
    
    </div>

        
      
  )
}

export default LoginFormEmpresa;
