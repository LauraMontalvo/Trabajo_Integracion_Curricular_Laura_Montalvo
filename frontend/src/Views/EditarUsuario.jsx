import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/loginstyle.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faCalendarAlt, faPhone, faEye, faEyeSlash, faVenusMars, faUserCircle } from '@fortawesome/free-solid-svg-icons';


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
    const [showPassword, setShowPassword] = useState(false);



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
    const refrescarDatosUsuario = () => {
        axios.get(`http://localhost:8000/api/user/${id}`)
            .then(res => {
                setNombre(res.data.nombre);
                setApellido(res.data.apellido);
                setSexo(res.data.sexo);
                setFechaNacimiento(res.data.fechaNacimiento);
                setTelefono(res.data.telefono);
                setUsuario(res.data.usuario);
            })
            .catch(err => console.log(err));
    };
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
            // Solo incluye las contraseñas si realmente se han ingresado nuevas
            ...(password && confirmPassword && { password: md5(password) })
        };

        axios.put(`http://localhost:8000/api/user/${id}`, dataToUpdate)
            .then((res) => {
                setUpdateSuccess("Se ha actualizado correctamente");
                setUpdateError('');
                // Limpia los campos de contraseña después de la actualización
                setPassword('');
                setConfirmPassword('');
                // Refresca los datos del usuario
                refrescarDatosUsuario();
            })
            .catch((err) => {
                setUpdateError(err.response?.data?.msg || 'Error desconocido');
                console.log(err);
            });
    };
    return (
        <div className="container mt-4">

            <Form onSubmit={handlerUpdateUsuario} className="mi-formulario">
                <Row>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Nombre:</Form.Label>
                            <div className="input-icon-wrapper">
                                <FontAwesomeIcon icon={faUser} className="input-icon" />
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese su Nombre"
                                    onChange={(e) => setNombre(e.target.value)} value={nombre} />
                            </div>
                        </Form.Group>

                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Apellido:</Form.Label>
                            <div className="input-icon-wrapper">
                                <FontAwesomeIcon className="input-icon" />
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese su Apellido"
                                    onChange={(e) => setApellido(e.target.value)}
                                    value={apellido}
                                    className="input-with-icon"
                                />
                            </div>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Género:</Form.Label>
                            <div className="input-icon-wrapper">
                                <FontAwesomeIcon icon={faVenusMars} className="input-icon" />
                                <Form.Control as="select"
                                    onChange={(e) => setSexo(e.target.value)}
                                    value={sexo}
                                    className="input-with-icon"
                                >
                                    <option value=" "> --Seleccione el género--</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                </Form.Control>
                            </div>
                        </Form.Group>
                    </Col>




                    <Col md={6}>
                        <Form.Group >
                            <Form.Label>Fecha de Nacimiento:</Form.Label>
                            <div className="input-icon-wrapper">
                                <FontAwesomeIcon icon={faCalendarAlt} className="input-icon" />
                                <Form.Control
                                    type="date"
                                    onChange={(e) => setFechaNacimiento(e.target.value)}
                                    value={fechaNacimiento}
                                    className="input-with-icon"
                                />
                            </div>
                        </Form.Group>
                    </Col>


                    <Col md={6}>
                        <Form.Group >
                            <Form.Label>Teléfono:</Form.Label>
                            <div className="input-icon-wrapper">
                                <FontAwesomeIcon icon={faPhone} className="input-icon" />
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese su teléfono"
                                    onChange={handleTelefonoChange}
                                    value={telefono}
                                />
                            </div>
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="formUsuario">
                            <Form.Label>Usuario:</Form.Label>
                            <div className="input-icon-wrapper">
                                <FontAwesomeIcon icon={faUserCircle} className="input-icon fa-lg" />
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese Usuario"
                                    onChange={(e) => setUsuario(e.target.value)}
                                    value={usuario}
                                    className="input-with-icon"
                                />
                            </div>
                        </Form.Group>
                    </Col>


                    <Col md={6}>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Contraseña:</Form.Label>
                            <div className="password-field">
                                <FontAwesomeIcon icon={faLock} className="field-icon" />
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Ingrese nueva contraseña"
                                    onChange={handlePasswrod}
                                    value={password}
                                    className="password-input"
                                />
                                <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye}
                                    className="toggle-password-icon"
                                    onClick={() => setShowPassword(!showPassword)}
                                />
                            </div>

                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="formConfirmPassword">
                            <Form.Label>Confirmar Contraseña:</Form.Label>
                            <div className="password-field">
                                <FontAwesomeIcon icon={faLock} className="field-icon" />
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Confirmar Contraseña"
                                    onChange={handleConfPasswrod}
                                    value={confirmPassword}
                                    className="password-input"
                                />
                                <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye}
                                    className="toggle-password-icon"
                                    onClick={() => setShowPassword(!showPassword)}
                                />
                            </div>

                        </Form.Group>
                    </Col>

                </Row>

                <div>
                    <p style={{ color: 'green' }}>{updateSuccess}</p>
                    <p style={{ color: 'red' }}>{updateError}</p>
                </div>

                <div className="botones-centrados">
                    <Button variant='primary' type="submit" className='btn'>Guardar</Button>
                    <Button variant='secondary' type="button" className='btn' onClick={e => navigate(`/detalleUsuario/${id}`)}>Cancelar</Button>
                </div><br />
            </Form>
        </div>
    );
};

export default EditarUsuario;
