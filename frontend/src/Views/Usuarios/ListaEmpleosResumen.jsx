import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import "../../Styles/loginstyle.css";
import CabeceraUsuarioInicio from '../../Components/Usuario/CabeceraUsuarioInicioComp';
import CabeceraEmpresaInicioComp from '../../Components/Empresa/CabeceraEmpresaInicioComp';

const ListaEmpleos = (props) => {
  const [empleos, setEmpleos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/jobs')
      .then(response => {
        setEmpleos(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const esUsuario = true; // Cambia esto a `true` o `false` según corresponda

  
  const isAuthenticated = props.isAuthenticated;
  return (
  <div className='App'>
{esUsuario ? <CabeceraUsuarioInicio isAuthenticated={isAuthenticated} /> : <CabeceraEmpresaInicioComp isAuthenticated={isAuthenticated} />}
    <Container className="my-4">
      <Row>
        {empleos.map((empleo, index) => (
          <Col key={index} md={12} className="mb-3">
            <Card className="job-card">
              <Card.Body>
                <Row>
                  <Col sm={8}>
                    <Card.Title>{empleo.puesto}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {empleo.idEmpresa.nombreEmpresa}
                    </Card.Subtitle>
                    <Card.Text>
                      {empleo.descripcion.substring(0, 100)}...
                    </Card.Text>
                  </Col>
                  <Col sm={4} className="text-muted">
                    <div className="location">
                      <FontAwesomeIcon icon={faMapMarkerAlt} /> {empleo.idEmpresa.direccion}
                    </div>
                    <div className="job-type">
                      <FontAwesomeIcon icon={faBriefcase} /> {empleo.modalidad}
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </div >
  );
};

export default ListaEmpleos;
