import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import md5 from 'md5';
const EditarUsuario = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [sexo, setSexo] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [telefono, setTelefono] = useState("");
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [updateError, setUpdateError] = useState('');
    const navigate = useNavigate();
    const [updateSuccess, setUpdateSuccess] = useState('');




    const handlePasswrod = (e) => {
        setPassword(e.target.value);
    };
    const handleConfPasswrod = (e) => {
        setConfirmPassword(e.target.value);
    };
    const { id } = useParams();
    const rol = "Usuario";

    const handleTelefonoChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setTelefono(value);
    };

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${id}`)
            .then(res => {
                setNombre(res.data.nombre);
                setApellido(res.data.apellido);
                setSexo(res.data.sexo);
                setFechaNacimiento(res.data.fechaNacimiento);
                setTelefono(res.data.telefono);
                setUsuario(res.data.usuario);
                // No necesitas setear las contraseñas aquí
            })
            .catch(err => console.log(err));
    }, [id]);

    const handlerUpdateUsuario = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setUpdateError("Las contraseñas no coinciden");
            return;
        }
        const dataToUpdate = {
            nombre,
            rol,
            apellido,
            sexo,
            fechaNacimiento,
            telefono,
            usuario,
        };

        if (password && confirmPassword) {
            // Cifra la nueva contraseña antes de enviarla al servidor
            dataToUpdate.password = md5(password);
            dataToUpdate.confirmPassword = md5(confirmPassword);
        }
        axios.put(`http://localhost:8000/api/user/${id}`, dataToUpdate)
            .then((res) => {
                console.log(res.data);
                setUpdateSuccess("Se ha actualizado correctamente");
                // Limpia el mensaje de error en caso de que hubiera uno previamente
                setUpdateError('');
               navigate(`/detalleUsuario/${id}`);

            })
            .catch((err) => {
                setUpdateError(err.response?.data?.msg || 'Error desconocido');
                console.log(err);
            });
    };

    return (
        <div className="container mt-4">
        <h1>Editar Usuario</h1>
        <Form onSubmit={handlerUpdateUsuario}>
            <Row>
                <Col md={6}>
                    <Form.Group controlId="formNombre">
                        <Form.Label>Nombre:</Form.Label>
                        <Form.Control type="text" onChange={(e) => setNombre(e.target.value)} value={nombre} />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="formApellido">
                        <Form.Label>Apellido:</Form.Label>
                        <Form.Control type="text" onChange={(e) => setApellido(e.target.value)} value={apellido} />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group controlId="formGenero">
                        <Form.Label>Género:</Form.Label>
                        <Form.Control as="select" onChange={e => setSexo(e.target.value)} value={sexo}>
                            <option value="">--Seleccione el género--</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="formFechaNacimiento">
                        <Form.Label>Fecha de Nacimiento:</Form.Label>
                        <Form.Control type="date" onChange={(e) => setFechaNacimiento(e.target.value)} value={fechaNacimiento} />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group controlId="formTelefono">
                        <Form.Label>Teléfono:</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese su teléfono" onChange={handleTelefonoChange} value={telefono} />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="formUsuario">
                        <Form.Label>Usuario:</Form.Label>
                        <Form.Control type="text" onChange={(e) => setUsuario(e.target.value)} value={usuario} />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Contraseña:</Form.Label>
                        <Form.Control type="password" onChange={handlePasswrod} value={password} />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="formConfirmPassword">
                        <Form.Label>Confirmar Contraseña:</Form.Label>
                        <Form.Control type="password" onChange={handleConfPasswrod} value={confirmPassword} />
                    </Form.Group>
                </Col>
            </Row>

            <div>
                <p style={{ color: 'green' }}>{updateSuccess}</p>
                <p style={{ color: 'red' }}>{updateError}</p>
            </div>

            <div className='btnseccion1'>
                <Button variant='primary' type="submit" className='btn'>Guardar</Button>
                <Button variant='secondary' type="button" className='btn' onClick={e => navigate(`/detalleUsuario/${id}`)}>Cancelar</Button>
            </div><br />
        </Form>
    </div>
    );
};

export default EditarUsuario;
