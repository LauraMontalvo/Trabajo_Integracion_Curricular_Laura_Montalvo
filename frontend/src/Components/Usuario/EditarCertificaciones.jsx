import React, { useState,useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditarCertificacion = ({ show, handleClose, certificacion, actualizarCertificacion }) => {
  const [titulo, setTitulo] = useState(certificacion.titulo);
  const [url, setUrl] = useState(certificacion.url);
  const [fechaExpedicion, setFechaExpedicion] = useState(certificacion.fechaExpedicion);

  const handleSubmit = async () => {
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
              onChange={(e) => setTitulo(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>URL</Form.Label>
            <Form.Control
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fecha de Expedición</Form.Label>
            <Form.Control
              type="date"
              value={fechaExpedicion}
              onChange={(e) => setFechaExpedicion(e.target.value)}
              
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
