import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col, Modal, Alert } from 'react-bootstrap';
import { faBriefcase, faBuilding, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faTools, faClipboardList, faUserCircle, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import * as constantes from '../../Models/Constantes'

const CampoEstado = ({ valido, mensajeError }) => {
  if (mensajeError) {
    return <FontAwesomeIcon icon={faExclamationCircle} className="text-danger" />;
  } else if (valido) {
    return <FontAwesomeIcon icon={faCheckCircle} className="text-success" />;
  } else {
    return null;
  }
};

const ExperieciaLaboral = (props) => {
  const {idUsuario} = props;
  const [descripcionResponsabilidades, setDescripcionResponsabilidades] = useState('');
  const [ambitoLaboral, setAmbitoLaboral] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [descripcionResponsabilidadesError, setDescripciaonResponsabilidadesError] = useState('');
  const [ambitoLaboralError, setAmbitoLaboralError] = useState('');
  const [empresaError, setEmpresaError] = useState('');
  const [fechaInicioError, setFechaInicioError] = useState('');
  const [fechaFinError, setFechaFinError] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const handleSuccessModalClose = () => setShowSuccessModal(false);
  const handleErrorModalClose = () => setShowErrorModal(false);
  const [showAddExperienceModal, setShowAddExperienceModal] = useState(false);
  
  const esCampoValido = (valor, error) => {
    return valor !== '' && error === '';
  };
  const validateDescripcionResp = (value, setError) => {
    if (!value.trim()) {
        setError(constantes.TEXTO_DESCRIPCION_RESPONSABILIDADES_OBLIGATORIO);
    } else {
        setError('');
    }
  };
  
  const validateAmbito= (value, setError) => {
    if (!value.trim()) {
        setError(constantes.TEXTO_AMBITO_LABORAL_OBLIGATORIO);
    } else {
        setError('');
    }
  };
  const validateRazonSocial= (value, setError) => {
    if (!value.trim()) {
        setError(constantes.TEXTO_RAZON_SOCIAL_OBLIGATORIO);
    } else {
        setError('');
    }
  };
  const validateFechaInicio= (value, setError) => {
    if (!value.trim()) {
        setError(constantes.TEXTO_FECHA_INICIO);
    } else {
        setError('');
    }
  };
  const validateFechaFin = (value, setError) => {
    if (!value.trim()) {
        setError(constantes.TEXTO_FECHA_FIN);
    } else {
        setError('');
    }
  };
  const handleInputChange = (e, setterFunction, errorSetterFunction, validateFunction) => {
    const { value } = e.target;
    setterFunction(value);
    validateFunction(value, errorSetterFunction);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
   
    axios.post(constantes.URL_EXPERIENCIA_LABORAL_NUEVA, {
    
    descripcionResponsabilidades,
      ambitoLaboral,
      empresa,
      fechaInicio,
      fechaFin,
      idUsuario
    })
      .then((res) => {
        console.log(res);
        setShowSuccessModal(true);
        setDescripcionResponsabilidades('');
        setAmbitoLaboral('');
        setEmpresa('');
        setFechaInicio('');
        setFechaFin('');
        props.onExperienciaAdded();
       
      })
      .catch((error) => {
        console.error(error.response);

      });
  };
  
  return (
    <Form onSubmit={handleSubmit} className="mi-formulario">
    {error && <Alert variant="danger">{error}</Alert>}
    <Row>
    <Col md={12}>
  <Form.Group>
    <Form.Label>Descripción de Responsabilidades</Form.Label>
    <div className="input-icon-wrapper">
      <FontAwesomeIcon icon={faBriefcase} className="input-icon" />
      <Form.Control
        as="textarea"
        rows={4}
        placeholder="Ingrese la descripción de sus responsabilidades"
        value={descripcionResponsabilidades}
        onChange={(e) => handleInputChange(e, setDescripcionResponsabilidades, setDescripciaonResponsabilidadesError, validateDescripcionResp)}
      />
      <CampoEstado valido={esCampoValido(descripcionResponsabilidades, descripcionResponsabilidadesError)} mensajeError={descripcionResponsabilidadesError} />
    </div>
    {descripcionResponsabilidadesError && <p className="text-danger">{descripcionResponsabilidadesError}</p>}
  
  </Form.Group>
</Col>
      <Col md={12}>
        <Form.Group>
          <Form.Label>Ámbito Laboral/Departamento</Form.Label>
          <div className="input-icon-wrapper">
            <FontAwesomeIcon icon={faBuilding} className="input-icon" />
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Ingrese el ámbito laboral"
              value={ambitoLaboral}
              onChange={(e) => handleInputChange(e, setAmbitoLaboral, setAmbitoLaboralError, validateAmbito)}
      />
      <CampoEstado valido={esCampoValido(ambitoLaboral, ambitoLaboralError)} mensajeError={ambitoLaboralError} />
    </div>
    {ambitoLaboralError && <p className="text-danger">{ambitoLaboralError}</p>}
  
        </Form.Group>
      </Col>
   <Col md={12}>
        <Form.Group>
          <Form.Label>Empresa/Razón Social</Form.Label>
          <div className="input-icon-wrapper">
            <FontAwesomeIcon icon={faBuilding} className="input-icon" />
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre de la empresa"
              value={empresa}
              onChange={(e) => handleInputChange(e, setEmpresa, setEmpresaError, validateRazonSocial)}
              />
              <CampoEstado valido={esCampoValido(empresa, empresaError)} mensajeError={empresaError} />
            </div>
            {ambitoLaboralError && <p className="text-danger">{empresaError}</p>}
          

        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group>
          <Form.Label>Fecha de Inicio</Form.Label>
          <div className="input-icon-wrapper">
            <FontAwesomeIcon icon={faCalendarAlt} className="input-icon" />
            <Form.Control
              type="date"
              value={fechaInicio}
              onChange={(e) => handleInputChange(e, setFechaInicio, setFechaInicioError, validateFechaInicio)}
              />
              <CampoEstado valido={esCampoValido(fechaInicio, fechaInicioError)} mensajeError={fechaInicioError} />
            </div>
            {fechaInicioError && <p className="text-danger">{fechaInicioError}</p>}
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group>
          <Form.Label>Fecha de Fin</Form.Label>
          <div className="input-icon-wrapper">
            <FontAwesomeIcon icon={faCalendarAlt} className="input-icon" />
            <Form.Control
              type="date"
              value={fechaFin}
              onChange={(e) => handleInputChange(e, setFechaFin, setFechaFinError, validateFechaFin)}
              />
              <CampoEstado valido={esCampoValido(fechaFin, fechaFinError)} mensajeError={fechaFinError} />
            </div>
            {fechaFinError && <p className="text-danger">{fechaFinError}</p>}
          
        </Form.Group>
      </Col>
    </Row>
    {/* Botón para enviar el formulario */}
    <div className="botones-centrados">
      <Button type="submit" className='btn-primary'>Guardar</Button>
    </div>
  </Form>
  

  );
}
export default ExperieciaLaboral;