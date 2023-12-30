import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faIndustry, faPhone, faGlobe, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import '../../Styles/Lista.css';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import CabeceraUsuarioInicio from '../../Components/Usuario/CabeceraUsuarioInicioComp';
import CabeceraEmpresaInicioComp from '../../Components/Empresa/CabeceraEmpresaInicioComp';

const ListaEmpresas = (props) => {
  const [empresas, setEmpresas] = useState([]);
  const [calificaciones, setCalificaciones] = useState({}); // Almacenamiento local de calificaciones
  const esUsuario = true; // Cambia esto a `true` o `false` según corresponda

  const isAuthenticated = props.isAuthenticated;

  useEffect(() => {
    axios.get('http://localhost:8000/api/companies')
      .then(response => {
        setEmpresas(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  // Función para manejar la calificación de una empresa
  const handleRating = (empresaId, rating) => {
    // Almacena la calificación en el estado local
    setCalificaciones(prevCalificaciones => ({
      ...prevCalificaciones,
      [empresaId]: rating,
    }));

    // Envía la calificación al servidor (debes implementar esta función)

  };

  // Función para enviar la calificación al servidor (debes implementarla)

  return (
    <div className="App">
      {esUsuario ? <CabeceraUsuarioInicio isAuthenticated={isAuthenticated} /> : <CabeceraEmpresaInicioComp isAuthenticated={isAuthenticated} />}
      <Container fluid className="mt-4">
        <Row>
          <Col md={12} className="mb-3">
            <div className="total-empresas">
              <h4>Total de Empresas</h4>
              <div className="numero">{empresas.length}</div>
            </div>
          </Col>
          {empresas.map(empresa => (
            <Col md={6} key={empresa._id} className="mb-3">
              <Card className="empresa-card">
                <Card.Body>
                <Row nogutters={true} className="align-items-center">
                    <Col xs={12} sm={6} md={8}>
                      <Card.Title>{empresa.nombreEmpresa}</Card.Title>
                      <Card.Text>
                        <FontAwesomeIcon icon={faEnvelope} /> {empresa.correo}
                      </Card.Text>

                    </Col>
                    <Card.Text>
                      <FontAwesomeIcon icon={faMapMarkerAlt} /> {empresa.direccion}
                    </Card.Text>
                    <Card.Text>
                      <FontAwesomeIcon icon={faPhone} /> {empresa.telefono}
                    </Card.Text>



                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ListaEmpresas;
