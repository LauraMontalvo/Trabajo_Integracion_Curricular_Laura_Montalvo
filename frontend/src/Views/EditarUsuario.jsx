import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams, useNavigate} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import {Button} from "reactstrap";
import { Form } from 'react-bootstrap';

const EditarUsuario = () =>{
    const [ nombre, setNombre] = useState("");
  const [ apellido, setApellido] = useState("");
  
  const [ sexo, setSexo] = useState("");
  const [ fechaNacimiento, setFechaNacimiento] = useState("");
  const [ telefono, setTelefono] = useState("");
  const [ usuario, setUsuario] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [updateError, setUpdateError] = useState(''); 
  const navigate = useNavigate();

    const {id} = useParams();
    const rol = "Usuario";
    const handleTelefonoChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setTelefono(value);
    };
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/user/${id}`)
        .then(res => {
            setNombre(res.data.nombre);
            setApellido(res.data.apellido);
            setSexo(res.data.sexo);
            setFechaNacimiento(res.data.fechaNacimiento);
            setTelefono(res.data.telefono);
            setUsuario(res.data.usuario);
            setPassword(res.data.password);
            setConfirmPassword(res.data.confirmPassword);
            
            console.log(res.data); 
        })
        .catch(err => console.log(err))
    }, [id]);

    const handlerUpdateUsuario = (e) => {
        e.preventDefault();
        if (!nombre || !apellido || !sexo || !fechaNacimiento || !telefono || !usuario || !password || !confirmPassword) {
            setUpdateError('Todos los campos son obligatorios');
            return;
          }

        axios.put(`http://localhost:8000/api/user/${id}`, {
            nombre,
            rol,
            apellido,
            sexo,
            fechaNacimiento,
            telefono,
            usuario,
            password,
            confirmPassword,
          })
          .then((res) => {
            // Actualizar el estado local o realizar acciones adicionales si es necesario
            console.log(res.data);
            setUpdateError(res.data.msg);
            navigate(`/detalleUsuario/${id}`); // Redirigir después de la actualización
          })
          .catch((err) => {
            // Manejar el error según la estructura real del error
            setUpdateError(err.response?.data?.msg || 'Error desconocido');
          });
      
    }

    return (
        <div>
             
             <h1>Editar Usuario</h1>
            <Form onSubmit={handlerUpdateUsuario}> 
                <div align="center" className=''>
                <table>
                        <tr>
                            <td><p>Nombre:</p></td>
                            <td>
                                <input type="text" onChange={(e) => setNombre(e.target.value)} value={nombre} />
                            </td>
                        </tr>
                        <tr>
                                <td><p>Apellido: </p></td>
                            <td>
                                <input type="text" onChange={(e) => setApellido(e.target.value)} value={apellido}/>
                            </td>
                        </tr>
                        <tr>
                                <td><p>genero: </p></td>
                            <td>
                                
                                <select onChange={e =>  setSexo(e.target.value)} value={sexo}>
                                    <option value="">--Seleccione el género--</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                                <td><p>Fecha de Nacimiento </p></td>
                            <td>
                                <input type="date" onChange={(e) => setFechaNacimiento(e.target.value)} value={fechaNacimiento}/>
                            </td>
                        </tr>

                        <tr>
                                <td><p>Telefono:  </p></td>
                            <td>
                            <input type="text" placeholder="Ingrese su teléfono" className="fill" onChange={handleTelefonoChange} value={telefono} />
                            </td>
                        </tr>

                        <tr>
                                <td><p>Usuario:</p></td>
                            <td>
                                <input type="text" onChange={(e) => setUsuario(e.target.value)} value={usuario}/>
                            </td>
                        </tr>
                        <tr>
                            <td><p>Contraseña:</p></td>
                            <td>
                                <input type="password" onChange={(e) => setPassword(e.target.value) } value={password} />
                            </td>
                        </tr>
                        <tr>
                            <td><p>Contraseña:</p></td>
                            <td>
                                <input type="password" onChange={(e) => setConfirmPassword(e.target.value) } value={confirmPassword} />
                            </td>
                        </tr>
                        
                       
                    </table>
                    <div>
                    <p style={{color:'red'}}>{updateError}</p>
                    </div>
                </div>
                    <div className='btnseccion1'>
                        <Button color='primary' type="submit" className='btn'>Guardar</Button> 
                        <Button  color='primary' type="button"className='btn' onClick={e => navigate(`/detalleUsuario/${id}`)} >Cancelar</Button>
                    </div><br />
                 
            </Form>
        </div>
    );
}
export default EditarUsuario;