import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faTools, faClipboardList, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const PublicarEmpleo = ({ idEmpresa, onEmpleoPublicado }) => {
  const [descripcion, setDescripcion] = useState('');
  const [conocimientos, setConocimientos] = useState('');
  const [aptitudes, setAptitudes] = useState('');
  const [numeroVacantes, setNumeroVacantes] = useState('');

  const [descripcionError, setDescripcionError] = useState('');
  const [conocimientosError, setConocimientosError] = useState('');
  const [aptitudesError, setAptitudesError] = useState('');
  const [numeroVacantesError, setNumeroVacantesError] = useState('');

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    // Puedes redirigir al usuario a la página de inicio o a donde necesites después de cerrar el modal
  };

  const handleErrorModalClose = () => {
    setShowErrorModal(false);
  };

  const handleSuccessModalShow = () => setShowSuccessModal(true);

  const handleErrorModalShow = () => setShowErrorModal(true);

  const handleSubmit = (e) => {
    e.preventDefault();


    axios
      .post('http://localhost:8000/api/job/new', {
        idEmpresa,  
      descripcion,
        conocimientos,
        aptitudes,
        numeroVacantes,
      })
      .then((res) => {
        console.log(res);
        // Puedes mostrar un mensaje de éxito y reiniciar los campos del formulario aquí
        handleSuccessModalShow();
        setDescripcion('');
        setConocimientos('');
        setAptitudes('');
        setNumeroVacantes('');
        setDescripcionError('');
        setConocimientosError('');
        setAptitudesError('');
        setNumeroVacantesError('');
        onEmpleoPublicado(res.data.insertedJob);
      })
      .catch((err) => {
        console.error(err);
        const errorResponse = err.response.data.errors;
        handleErrorModalShow();

        if (Object.keys(errorResponse).includes('descripcion')) {
          setDescripcionError(errorResponse['descripcion'].message);
          //setAviso("");
        }
        else {
          setDescripcionError("");

        }

        if (Object.keys(errorResponse).includes('conocimientos')) {
          setConocimientosError(errorResponse['conocimientos'].message);
          //setAviso("");
        }
        else {
          setConocimientosError("");

        }
        if (Object.keys(errorResponse).includes('aptitudes')) {
          setAptitudesError(errorResponse['aptitudes'].message);
          //setAviso("");
        }
        else {
          setAptitudesError("");

        }
        if (Object.keys(errorResponse).includes('numeroVacantes')) {
          setNumeroVacantesError(errorResponse['numeroVacantes'].message);
          //setAviso("");
        }
        else {
          setNumeroVacantesError("");

        }


      });
  };

  return (
    <Form onSubmit={handleSubmit} className="mi-formulario">
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
            </div>
            {descripcionError && <p className="text-danger">{descripcionError}</p>}
          </Form.Group>
        </Col>
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
            </div>
            {conocimientosError && <p className="text-danger">{conocimientosError}</p>}
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
            </div>
            {aptitudesError && <p className="text-danger">{aptitudesError}</p>}
          </Form.Group>
        </Col>
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
            </div>
            {numeroVacantesError && <p className="text-danger">{numeroVacantesError}</p>}
          </Form.Group>
        </Col>
      </Row>
      <div className="botones-centrados">
        <Button type="submit" className="btn-primary">
          Guardar
        </Button>
      </div>
      <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>¡Empleo publicado con éxito!</Modal.Title>
        </Modal.Header>
        <Modal.Body>El empleo ha sido publicado correctamente.</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSuccessModalClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

    </Form>
  );
};

export default PublicarEmpleo;
