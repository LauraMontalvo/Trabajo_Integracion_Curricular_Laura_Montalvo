import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const SumarEstudio = () => {
  const [tituloObtenido, setTituloObtenido] = useState('');
  const [institucionOptions, setInstitucionOptions] = useState([]);
  const [selectedInstitucion, setSelectedInstitucion] = useState(null);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [institucionError, setInstitucionError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/schools')
      .then((response) => {
        setInstitucionOptions(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar la lista de instituciones:', error);
        setInstitucionError('Error al cargar la lista de instituciones');
      });
  }, []);

  const handleInstitucionSelect = (eventKey) => {
    const selected = institucionOptions.find((institucion) => institucion._id === eventKey);
    setSelectedInstitucion(selected);
    setInstitucionError('');
  };

  const onsubmitHandler = (e) => {
    e.preventDefault();
    // Lógica para enviar la información académica al servidor
    console.log('Información académica enviada:', {
      tituloObtenido,
      idInstitucion: selectedInstitucion ? selectedInstitucion._id : null,
      fechaInicio,
      fechaFin,
    });
  };

  return (
    <Form onSubmit={onsubmitHandler}>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <Form.Group controlId="formTituloObtenido">
              <Form.Label>Ingrese el título obtenido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Título obtenido"
                onChange={(e) => setTituloObtenido(e.target.value)}
                value={tituloObtenido}
              />
            </Form.Group>

            <Form.Group controlId="formInstitucion">
              <Form.Label>Institución</Form.Label>
              <Dropdown onSelect={handleInstitucionSelect}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {selectedInstitucion ? selectedInstitucion.nombreInstitucion : 'Seleccione la institución'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {institucionOptions.map((institucion) => (
                    <Dropdown.Item key={institucion._id} eventKey={institucion._id}>
                      {institucion.nombreInstitucion}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <Form.Text className="text-danger">{institucionError}</Form.Text>
            </Form.Group>

            <Form.Group controlId="formFechaInicio">
              <Form.Label>Fecha de inicio</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setFechaInicio(e.target.value)}
                value={fechaInicio}
              />
            </Form.Group>

            <Form.Group controlId="formFechaFin">
              <Form.Label>Fecha de fin</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setFechaFin(e.target.value)}
                value={fechaFin}
              />
            </Form.Group>

            <div className="text-center">
              <Button type="submit">Guardar información académica</Button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default SumarEstudio;
