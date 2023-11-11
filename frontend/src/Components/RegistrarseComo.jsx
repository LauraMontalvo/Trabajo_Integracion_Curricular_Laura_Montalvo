import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { Link, useNavigate} from 'react-router-dom';

import "../Styles/loginstyle.css"

import logofondo from "../img/logofondo.png";

const RegistrarseComo= (props) => {
    const navigate = useNavigate();
  return (
    <div className='body'>

        <div className='main'>
            <div className='sub-main' style={{ height: '550px' }} >
                <div>
                <h2 className='LHeader ' >Empleos ChavezPamba</h2>
                    <div className='imgs'>
                        
                        <div className='container-image' >
                            <img src={logofondo} alt='profile' className='profile'/>
                        </div>
                    </div>
                    <div>
                    
                        <div >
                        <h1 className='LHeader'>Iniciar Sesión como</h1>

                        </div>
                        <div className='btn'>
                        <button  onClick={e=>navigate("/usuario")} >Usuario</button>
                        </div>
                        <button   onClick={e=>navigate("/empresa")} >Empresa</button>
                        

                    </div>
                </div>
            </div>
        </div>

            
        
        
    </div>

        
      
  )
}

export default RegistrarseComo;
