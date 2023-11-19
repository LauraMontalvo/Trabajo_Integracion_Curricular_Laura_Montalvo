import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { Link, useNavigate} from 'react-router-dom';

import "../Styles/loginstyle.css"

import logofondo from "../img/logofondo.png";

const RegistrarseComo= (props) => {
    const navigate = useNavigate();
  return (
    <div className='fondo'>

        <div className='caja'>
            <div className='cajaRegistrarComo'  >
                <div>
                <h2  >Empleos ChavezPamba</h2>
                    <div className='imgs'>
                        <div >
                            <img src={logofondo} alt='profile' className='tamañoImagenChavezPamba'/>
                        </div>
                    </div>
                    <div>
                    
                        <div >
                        <h2>Iniciar Sesión como</h2>

                        </div>
                        <div className='btn-container'>
                        <Button  onClick={e=>navigate("/loginusuario")} >Usuario</Button  >
                        <Button   onClick={e=>navigate("/empresa")} >Empresa</Button>
                        <Button   onClick={e=>navigate("/")} >Cancelar</Button>
                        </div>
                        
                        <div>
                        

                        </div>
                       

                    </div>
                </div>
            </div>
        </div>

            
        
        
    </div>

        
      
  )
}

export default RegistrarseComo;
