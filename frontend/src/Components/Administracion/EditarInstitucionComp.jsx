import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSchool, faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import * as constantes from '../../Models/Constantes';

const CampoEstado = ({ mensajeError }) => {
    if (mensajeError) {
        return <FontAwesomeIcon icon={faExclamationCircle} className="text-danger" />;
    } else {
        return null; // No muestra nada si no hay mensaje de error
    }
};
const EditarInstitucionComp = ({ idInstitucion, onInstitucionActualizada }) => {
    const [nombreInstitucion, setNombreInstitucion] = useState('');
    const [nombreInstitucionError, setNombreInstitucionError] = useState('');
    const [updateError, setUpdateError] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const esCampoValido = (valor, error) => {
        return valor !== '' && error === '';
      };
      const handleInputChange = (e) => {
        const { value } = e.target;
        setNombreInstitucion(value);
    
        // Validar el campo cada vez que cambia
        validarNombreInstitucion(value, setNombreInstitucionError);
    };
    useEffect(() => {
        if (idInstitucion) {
            axios.get(`http://localhost:8000/api/school/${idInstitucion}`)
                .then(res => {
                    setNombreInstitucion(res.data.nombreInstitucion);
                })
                .catch(err => console.log(err));
        }
    }, [idInstitucion]);
   
    const validarNombreInstitucion = (value, setError) => {
        if (!value.trim()) {
            setError(constantes.TEXTO_NOMBRE_INSTITUCION_OBLIGATORIO);
        } else {
            setError(''); // Limpia el mensaje de error
        }
    };

    const handlerUpdateInstitucion = (e) => {
        e.preventDefault();

        // Comprobar si hay errores antes de enviar
        if (nombreInstitucionError) {
            return; // Detiene la ejecución si hay errores
        }

        axios.put(`http://localhost:8000/api/school/${idInstitucion}`, { nombreInstitucion })
            .then((res) => {
                setUpdateSuccess("Institución actualizada correctamente");
                setUpdateError('');

                // Llamar a la función callback después de una actualización exitosa
                if (onInstitucionActualizada) {
                    onInstitucionActualizada(res.data);
                }
            })
            .catch((err) => {
                setUpdateError(err.response?.data?.msg || 'Error desconocido');
            });
    };

    return (
        <div className="container mt-4">
            <Form onSubmit={handlerUpdateInstitucion} className="mi-formulario">


                <Form.Group>
                    <Form.Label>Nombre Institucion:</Form.Label>
                    <div className="input-icon-wrapper">
                    <FontAwesomeIcon icon={faSchool} className="input-icon" />
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el nombre de la institución"
                            onChange={(e) => handleInputChange(e, setNombreInstitucion, setNombreInstitucionError)} 
                            value={nombreInstitucion} />
                                            <CampoEstado valido={esCampoValido(nombreInstitucion, nombreInstitucionError)} mensajeError={nombreInstitucionError} />

                    </div>
                    {nombreInstitucionError && <p className="text-danger">{nombreInstitucionError}</p>}
                </Form.Group>
                <div>
                    <p style={{ color: 'green' }}>{updateSuccess}</p>
                    <p style={{ color: 'red' }}>{updateError}</p>
                </div>
                <div className="botones-centrados">
                    <Button variant='primary' type="submit" className='btn'>Guardar</Button>
                </div><br />
            </Form>
        </div>
    );
};

export default EditarInstitucionComp;
