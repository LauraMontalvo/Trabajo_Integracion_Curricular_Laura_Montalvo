import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col, Alert ,Modal} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faTools, faClipboardList, faUserCircle, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase, faBuilding, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

// ... Importaciones adicionales si son necesarias ...
const EditarEmpleoComp = ({ idEmpleo, onEmpleoEditado, closeEditModal }) => {
  // Estados para los datos del formulario
  const [descripcion, setDescripcion] = useState('');
  const [conocimientos, setConocimientos] = useState('');
  const [aptitudes, setAptitudes] = useState('');
  const [numeroVacantes, setNumeroVacantes] = useState('');
  const [error, setError] = useState('');
//modal de confimracion
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    if (closeEditModal) {
        closeEditModal();
    }
};
  useEffect(() => {
    axios.get(`http://localhost:8000/api/job/${idEmpleo}`)
      .then(response => {
        // Aquí estableces los estados con los datos obtenidos
        setDescripcion(response.data.descripcion);
        setConocimientos(response.data.conocimientos);
        setAptitudes(response.data.aptitudes);
        setNumeroVacantes(response.data.numeroVacantes);
      })
      .catch(error => {
        console.error('Error al cargar la experiencia', error);
        setError('Error al cargar datos de la experiencia laboral');
      });
  }, [idEmpleo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // ... Aquí incluyes tus validaciones ...

    axios.put(`http://localhost:8000/api/job/${idEmpleo}`, {
      descripcion,
      conocimientos,
      aptitudes,
      numeroVacantes
    })
      .then(response => {
        // Llamar a la función callback después de una actualización exitosa
        onEmpleoEditado(response.data); 
        setShowSuccessModal(true); })
        
      .catch(error => {
        console.error('Error al actualizar empleo', error);
        setError('Error al actualizar empleo');
      });
  };
  return (
    <Form onSubmit={handleSubmit} className="mi-formulario">
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Descripción del empleo</Form.Label>
            <div className="input-icon-wrapper">
              <FontAwesomeIcon icon={faFileAlt} className="input-icon" />
              <Form.Control
                type="text"
                placeholder="Ingrese la descripción del empleo"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
              {/* Aquí puedes agregar validación de estado como en el formulario original */}
            </div>
          </Form.Group>
        </Col>
        {/* ... Campos adicionales ... */}
        <Col md={6}>
          <Form.Group>
            <Form.Label>Conocimientos requeridos</Form.Label>
            <div className="input-icon-wrapper">
              <FontAwesomeIcon icon={faTools} className="input-icon" />
              <Form.Control
                type="text"
                placeholder="Ingrese los conocimientos requeridos"
                value={conocimientos}
                onChange={(e) => setConocimientos(e.target.value)}
              />
              {/* Validación de estado */}
            </div>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Aptitudes requeridas</Form.Label>
            <div className="input-icon-wrapper">
              <FontAwesomeIcon icon={faClipboardList} className="input-icon" />
              <Form.Control
                type="text"
                placeholder="Ingrese las aptitudes requeridas"
                value={aptitudes}
                onChange={(e) => setAptitudes(e.target.value)}
              />
              {/* Validación de estado */}
            </div>
          </Form.Group>
        </Col>

        {/* Número de vacantes */}
        <Col md={6}>
          <Form.Group>
            <Form.Label>Número de vacantes</Form.Label>
            <div className="input-icon-wrapper">
              <FontAwesomeIcon icon={faUserCircle} className="input-icon" />
              <Form.Control
               type="text"
                placeholder="Ingrese el número de vacantes"
                value={numeroVacantes}
                onChange={(e) => setNumeroVacantes(e.target.value)}
              />
              {/* Validación de estado */}
            </div>
          </Form.Group>
        </Col>
      </Row>
      <div className="botones-centrados">
        <Button type="submit" className='btn-primary'>Guardar Cambios</Button>
      </div>
      <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
      <Modal.Header closeButton>
        <Modal.Title className='tituloModal'>
          <FontAwesomeIcon icon={faCheckCircle} className="text-success me-2" />
          Empleo actualizado con éxito
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='tituloModalBody'  >
        <p >El empleo ha sido actualizado correctamente en el sistema.</p>
        <p>Puedes revisar los detalles del empleo en la lista de empleos publicados.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleSuccessModalClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
    </Form>
    
  );
};

export default EditarEmpleoComp;
