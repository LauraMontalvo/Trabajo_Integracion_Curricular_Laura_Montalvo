import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditarCertificacion = ({ show, handleClose, certificacion, actualizarCertificacion }) => {
  const [titulo, setTitulo] = useState(certificacion.titulo);
  const [url, setUrl] = useState(certificacion.url);
  const [fechaExpedicion, setFechaExpedicion] = useState(certificacion.fechaExpedicion);
  const [tituloError, setTituloError] = useState('');
  const [urlError, setUrlError] = useState('');
  const [fechaExpedicionError, setFechaExpedicionError] = useState('');
  const validarTitulo = (titulo) => {
    if (!titulo) {
      setTituloError('El título es obligatorio.');
      return false;
    }
    setTituloError('');
    return true;
  };

  const validarUrl = (url) => {
    if (!url) {
      setUrlError('La URL es obligatoria.');
      return false;
    }
    const regexUrl = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!regexUrl.test(url)) {
      setUrlError('La URL no es válida.');
      return false;
    }
    setUrlError('');
    return true;
  };

  const validarFechaExpedicion = (fecha) => {
    if (!fecha) {
      setFechaExpedicionError('La fecha de expedición es obligatoria.');
      return false;
    }
    setFechaExpedicionError('');
    return true;
  };
  const handleSubmit = async () => {
    const esTituloValido = validarTitulo(titulo);
    const esUrlValida = validarUrl(url);
    const esFechaValida = validarFechaExpedicion(fechaExpedicion);

    if (!esTituloValido || !esUrlValida || !esFechaValida) {
      return; // No continuar si hay errores
    }
    try {
      // Llama a la API para actualizar la certificación
      const fechaAEnviar = new Date(fechaExpedicion);

      const response = await axios.put(`http://localhost:8000/api/certification/${certificacion._id}`, {
        titulo,
        url,
        fechaExpedicion: fechaAEnviar
      });
      actualizarCertificacion(response.data);
      handleClose();
    } catch (error) {
      console.error('Error al actualizar la certificación:', error);
    }
  };
  useEffect(() => {
    console.log(certificacion); // Para depuración
    setTitulo(certificacion.titulo);
    setUrl(certificacion.url);
    const fechaFormateada = certificacion.fechaExpedicion ?
      new Date(certificacion.fechaExpedicion).toISOString().split('T')[0] : '';
    setFechaExpedicion(fechaFormateada);

  }, [certificacion]);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Certificación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="mi-formulario">
          <Form.Group >
            <Form.Label>Título Obtenido en la Certificación</Form.Label>
            <Form.Control
              type="text"
              value={titulo}
              onChange={(e) => {
                setTitulo(e.target.value);
                validarTitulo(e.target.value);
              }}
              isInvalid={!!tituloError}
            />
       
          </Form.Group>
          <Form.Group>
            <Form.Label>URL</Form.Label>
            <Form.Control
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                validarUrl(e.target.value);
              }}
              isInvalid={!!urlError}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fecha de Expedición</Form.Label>
            <Form.Control
              type="date"
              value={fechaExpedicion}
              onChange={(e) => {
                setFechaExpedicion(e.target.value);
                validarFechaExpedicion(e.target.value);
              }}
              isInvalid={!!fechaExpedicionError}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditarCertificacion;
