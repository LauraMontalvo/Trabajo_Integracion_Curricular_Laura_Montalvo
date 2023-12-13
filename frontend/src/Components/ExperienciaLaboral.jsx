import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col, Modal, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faBuilding, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate } from 'react-router-dom';
const ExperieciaLaboral = (props) => {
  const {idUsuario} = props;
  const [descripcionResponsabilidades, setDescripcionResponsabilidades] = useState('');
  const [ambitoLaboral, setAmbitoLaboral] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const handleSuccessModalClose = () => setShowSuccessModal(false);
  const handleErrorModalClose = () => setShowErrorModal(false);
  const [showAddExperienceModal, setShowAddExperienceModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!descripcionResponsabilidades || !ambitoLaboral || !empresa || !fechaInicio || !fechaFin) {
      setError('Todos los campos son obligatorios');
      return;
    }
    axios.post('http://localhost:8000/api/workExperience/new', {
    
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
        setError('Hubo un error al registrar la experiencia laboral');
        setShowErrorModal(true);
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
              onChange={(e) => setDescripcionResponsabilidades(e.target.value)}
            />
          </div>
        </Form.Group>
      </Col>
      <Col md={12}>
        <Form.Group>
          <Form.Label>Ámbito Laboral</Form.Label>
          <div className="input-icon-wrapper">
            <FontAwesomeIcon icon={faBuilding} className="input-icon" />
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Ingrese el ámbito laboral"
              value={ambitoLaboral}
              onChange={(e) => setAmbitoLaboral(e.target.value)}
            />
          </div>
        </Form.Group>
      </Col>
      <Col md={12}>
        <Form.Group>
          <Form.Label>Empresa</Form.Label>
          <div className="input-icon-wrapper">
            <FontAwesomeIcon icon={faBuilding} className="input-icon" />
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre de la empresa"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
            />
          </div>
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
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </div>
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
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </div>
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