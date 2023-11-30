import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import "../Styles/loginstyle.css"
import logofondo from "../img/logofondo.png";

const RegistrarseComo = (props) => {
    const navigate = useNavigate();
    return (
        <div className="mi-formulario">
            <h2>Empleos ChavezPamba</h2>
            <div className='imgs'>
                <img src={logofondo} className="tamañoImagenChavezPamba" />
            </div>
            <h2>Inicio de sesión de Usuario</h2>
            <div className="botones-centrados">
                <Button className='btn-primary' onClick={e => navigate("/loginusuario")} >Usuario</Button  >
                <Button className='btn-secundary' onClick={e => navigate("/empresa")} >Empresa</Button>
                <Button  className='btn-danger' onClick={e => navigate("/")} >Cancelar</Button>
            </div>
        </div>
    )
}

export default RegistrarseComo;
