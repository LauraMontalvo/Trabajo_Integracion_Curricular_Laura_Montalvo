import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faTools, faClipboardList, faUserCircle, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import "../../Styles/camps.scss"; // Importa tus estilos personalizados

const CampoEstado = ({ valido, mensajeError }) => {
  if (mensajeError) {
    return <FontAwesomeIcon icon={faExclamationCircle} className="text-danger" />;
  } else if (valido) {
    return <FontAwesomeIcon icon={faCheckCircle} className="text-success" />;
  } else {
    return null;
  }
};
const PublicarEmpleo = ({ idEmpresa, onEmpleoPublicado }) => {
  const [descripcion, setDescripcion] = useState('');
  const [conocimientos, setConocimientos] = useState('');
  const [aptitudes, setAptitudes] = useState('');
  const [numeroVacantes, setNumeroVacantes] = useState('');

  const [descripcionError, setDescripcionError] = useState('');
  const [conocimientosError, setConocimientosError] = useState('');
  const [aptitudesError, setAptitudesError] = useState('');
  const [numeroVacantesError, setNumeroVacantesError] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const esCampoValido = (valor, error) => {
    return valor !== '' && error === '';
  };


  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    // Puedes redirigir al usuario a la página de inicio o a donde necesites después de cerrar el modal
  };

  const handleErrorModalClose = () => {
    setShowErrorModal(false);
  };

  const handleSuccessModalShow = () => setShowSuccessModal(true);

  const handleErrorModalShow = () => setShowErrorModal(true);


  const handleInputChange = (e, setterFunction, errorSetter, validationFunction) => {
    const { value } = e.target;
    setterFunction(value);

    if (validationFunction) {
      validationFunction(value, errorSetter);
    }
  };
  const validateDescripcion = (value, setError) => {
    if (!value.trim()) {
      setError('La descripción del empleo es obligatoria');
    } else {
      setError('');
    }
  };

  const validateConocimientos = (value, setError) => {
    if (!value.trim()) {
      setError('Conocimientos es obligatorio');
    } else {
      setError('');
    }
  };
  const validateAptitudes = (value, setError) => {
    if (!value.trim()) {
      setError('Aptitudes es obligatorio');
    } else {
      setError('');
    }
  };
  const validateNumeroVacantes = (value, setError) => {
    if (!value.trim()) {
      setError('El número de vacantes es obligatorio');
    } else if (isNaN(value) || parseInt(value) <= 0) {
      setError('Debe ingresar un número válido de vacantes');
    } else {
      setError('');
    }
  };


  const validarFormularioAntesDeEnviar = () => {
    let formularioEsValido = true;

    // Validar descripción
    if (!descripcion) {
      setDescripcionError('La descripción del empleo es obligatoria');
      formularioEsValido = false;
    } else {
      setDescripcionError('');
    }

    // Validar conocimientos
    if (!conocimientos) {
      setConocimientosError('Los conocimientos requeridos son obligatorios');
      formularioEsValido = false;
    } else {
      setConocimientosError('');
    }

    // Validar aptitudes
    if (!aptitudes) {
      setAptitudesError('Las aptitudes requeridas son obligatorias');
      formularioEsValido = false;
    } else {
      setAptitudesError('');
    }

    if (!numeroVacantes) {
      setNumeroVacantesError('El número de vacantes es obligatorio');
      formularioEsValido = false;
    } else if (isNaN(numeroVacantes) || numeroVacantes <= 0) {
      setNumeroVacantesError('Debe ingresar un número válido de vacantes');
      formularioEsValido = false;
    } else {
      setNumeroVacantesError('');
    }
    return formularioEsValido;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarFormularioAntesDeEnviar()) {
      return;
    }
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


      });
  };

  return (
    <Form onSubmit={handleSubmit} className="mi-formulario">
      <Row>
      
          <Form.Group>
            <Form.Label>Descripción del empleo</Form.Label>
            <div className="input-icon-wrapper">
              <FontAwesomeIcon icon={faFileAlt} className="input-icon" />
              <Form.Control
                as="textarea"
                rows={5}
                className="textarea-elegante" // Aplicar la clase aquí
                placeholder="Ingrese la descripción del empleo"
                value={descripcion}
                onChange={(e) => handleInputChange(e, setDescripcion, setDescripcionError, validateDescripcion)}
              />
              <CampoEstado valido={esCampoValido(descripcion, descripcionError)} mensajeError={descripcionError} />
            </div>
            {descripcionError && <p className="text-danger">{descripcionError}</p>}
          </Form.Group>
        
        
          <Form.Group>
            <Form.Label>Conocimientos requeridos</Form.Label>
            <div className="input-icon-wrapper">
              <FontAwesomeIcon icon={faTools} className="input-icon" />
              <Form.Control
                type="text"
                placeholder="Ingrese los conocimientos requeridos"
                value={conocimientos}
                onChange={(e) => handleInputChange(e, setConocimientos, setConocimientosError, validateConocimientos)}
              />
              <CampoEstado valido={esCampoValido(conocimientos, conocimientosError)} mensajeError={conocimientosError} />
            </div>
            {conocimientosError && <p className="text-danger">{conocimientosError}</p>}
          </Form.Group>
      
          <Form.Group>
            <Form.Label>Aptitudes requeridas</Form.Label>
            <div className="input-icon-wrapper">
              <FontAwesomeIcon icon={faClipboardList} className="input-icon" />
              <Form.Control
                type="text"
                placeholder="Ingrese las aptitudes requeridas"
                value={aptitudes}
                onChange={(e) => handleInputChange(e, setAptitudes, setAptitudesError, validateAptitudes)}
              />
              <CampoEstado valido={esCampoValido(aptitudes, aptitudesError)} mensajeError={aptitudesError} />

            </div>
            {aptitudesError && <p className="text-danger">{aptitudesError}</p>}
          </Form.Group>
      
        <Col md={6}>
          <Form.Group>
            <Form.Label>Número de vacantes</Form.Label>
            <div className="input-icon-wrapper">
              <FontAwesomeIcon icon={faUserCircle} className="input-icon" />
              <Form.Control
                type="text"
                placeholder="Ingrese el número de vacantes"
                value={numeroVacantes}
                onChange={(e) => handleInputChange(e, setNumeroVacantes, setNumeroVacantesError, validateNumeroVacantes)}
              />
              <CampoEstado valido={esCampoValido(numeroVacantes, numeroVacantesError)} mensajeError={numeroVacantesError} />

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
