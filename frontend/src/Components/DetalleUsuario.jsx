import React, { useState } from 'react';
import { useEffect } from "react";
import axios from "axios";
import {useParams} from 'react-router-dom';
import LoginForm from './LoginUsuario';

function DetalleUsuario(props) {
    const {id} = useParams();
    const [user, setUser] = useState([]);
   
    useEffect(() =>{
        axios.get(`http://localhost:8000/api/user/${id}`)
        .then(res => setUser({ ...res.data}))
        .catch(err => console.log(err));
    }, [id]);
    
    
  return (
    <div>
      <h1> Hola {user.nombre}  {user.apellido} </h1>
      <h3>Bienvenido a ChavezEmpleo</h3>
      
    </div>
  );
}

export default DetalleUsuario;