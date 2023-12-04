import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import "../Styles/loginstyle.css"
import logofondo from "../img/logofondo.png";
import Cabecera from './Cabecera';
import CabeceraRegistrar from './CabeceraRegistrar';

const RegistrarseComo = (props) => {
    const navigate = useNavigate();
    return (
        <div className='App'>
            <CabeceraRegistrar></CabeceraRegistrar>
            <div className="mi-formulario">
                <h2>Empleos ChavezPamba</h2>
                <div className='imgs'>
                    <img src={logofondo} className="tamañoImagenChavezPamba" />
                </div>
                <h2>Inicio de sesión de Usuario</h2>
                <div className="botones-centrados">
                    <Button className='btn-primary' onClick={e => navigate("/loginusuario")} >Usuario</Button  >
                    <Button className='btn-secundary' onClick={e => navigate("/empresa")} >Empresa</Button>

                </div>
            </div>
        </div>


    )
}

export default RegistrarseComo;
