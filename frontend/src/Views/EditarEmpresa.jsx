import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { faUser, faLock, faInfoCircle, faPhone, faEnvelope, faMapMarker, faExclamationTriangle, faEye, faEyeSlash, faBuilding, faVenusMars, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import md5 from 'md5';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const EditarEmpresa = () => {
    const [nombreEmpresa, setNombreEmpresa] = useState("");
    const [correo, setCorreo] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [descripcion, setDescripcion] = useState("");
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
    const rol = "Empresa";

    const handleTelefonoChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setTelefono(value);
    };

    useEffect(() => {
        axios.get(`http://localhost:8000/api/company/${id}`)
            .then(res => {
                setNombreEmpresa(res.data.nombreEmpresa);
                setCorreo(res.data.correo);
                setDireccion(res.data.direccion);
                setTelefono(res.data.telefono);
                setDescripcion(res.data.descripcion);

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
            nombreEmpresa,
            rol,
            correo,
            descripcion,
            direccion,
            telefono,
            usuario,
        };

        if (password && confirmPassword) {
            // Cifra la nueva contraseña antes de enviarla al servidor
            dataToUpdate.password = md5(password);
            dataToUpdate.confirmPassword = md5(confirmPassword);
        }
        axios.put(`http://localhost:8000/api/company/${id}`, dataToUpdate)
            .then((res) => {
                console.log(res.data);
                setUpdateSuccess("Se ha actualizado correctamente");
                // Limpia el mensaje de error en caso de que hubiera uno previamente
                setUpdateError('');
                navigate(`/detalleEmpresa/${id}`);

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
                        <Form.Label>Nombre de la Empresa</Form.Label>
                        <div className="input-icon-wrapper">
                        <FontAwesomeIcon icon={faBuilding} className="input-icon fa-lg" />
                            <Form.Control 
                            type="text" 
                            placeholder="Ingrese Nombre de la Empresa"
                            onChange={(e) => setNombreEmpresa(e.target.value)} value={nombreEmpresa} />
                       
                        </div>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formApellido">
                            <Form.Label>Correo Electrónico:</Form.Label>
                            <div className="input-icon-wrapper">
                            <FontAwesomeIcon icon={faEnvelope} className="input-icon fa-lg" /> {/* Icono de correo */}

                            <Form.Control 
                            type="email" 
                            className="large-input"
                            onChange={(e) => setCorreo(e.target.value)} value={correo} />

                            </div>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formNombre">
                            <Form.Label> Dirección </Form.Label>
                            <div className="input-icon-wrapper">
                            <FontAwesomeIcon icon={faMapMarker} className="input-icon fa-lg" /> {/* Icono de dirección */}
                            <Form.Control 
                            placeholder="Ingrese su teléfono"
                            type="text" onChange={(e) => setDireccion(e.target.value)} value={direccion} />

                            </div>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formTelefono">
                        <Form.Label>Teléfono:</Form.Label>

                            <div className="input-icon-wrapper">
                            <FontAwesomeIcon icon={faPhone} className="input-icon" />

                            <Form.Control type="text"
                            placeholder="Ingrese su teléfono" onChange={handleTelefonoChange} value={telefono} />

                            </div>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formUsuario">
                            <Form.Label>Usuario:</Form.Label>
                            <div className="input-icon-wrapper">
                            <FontAwesomeIcon icon={faUserCircle} className="input-icon fa-lg" /> {/* Icono de usuario */}

                            <Form.Control type="text" onChange={(e) => setUsuario(e.target.value)} value={usuario} />

                            </div>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group >
                            <Form.Label>Descripción</Form.Label>
                            <div className="input-icon-wrapper">
                            <Form.Control as="textarea"
                                rows={4}
                                placeholder="Ingrese la descripción de la empresa" 
                                onChange={(e) => setDescripcion(e.target.value)} value={descripcion} />
                            </div>
                            
                        </Form.Group>
                    </Col>
                </Row>

                <Row>


                </Row>

                <Row>

                    <Col md={6}>
            <Form.Group>
              <Form.Label>Contraseña </Form.Label>
              <div className="password-field">
                <FontAwesomeIcon icon={faLock} className="field-icon" />
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese nueva Contraseña"
                  value={password}
                  onChange={handlePasswrod}
                  className="password-input" />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="toggle-password-icon"
                  onClick={() => setShowPassword(!showPassword)} />
              </div>
            </Form.Group>
          </Col>
                    <Col md={6}>
            <Form.Group>
              <Form.Label>Confirmar Contraseña</Form.Label>
              <div className="password-field">
                <FontAwesomeIcon icon={faLock} className="field-icon" />
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirmar Contraseña"
                  value={confirmPassword}
                  onChange={handleConfPasswrod}
                  className="password-input" />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="toggle-password-icon"
                  onClick={() => setShowPassword(!showPassword)} />
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

export default EditarEmpresa;
