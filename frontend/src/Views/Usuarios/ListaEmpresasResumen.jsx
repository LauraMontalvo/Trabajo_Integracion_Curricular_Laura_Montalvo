import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Image, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEnvelope, faIndustry, faUsers } from '@fortawesome/free-solid-svg-icons';
import "../../Styles/Lista.css";
import { Link } from 'react-router-dom';
import CabeceraUsuarioInicio from '../../Components/Usuario/CabeceraUsuarioInicioComp';
import CabeceraEmpresaInicioComp from '../../Components/Empresa/CabeceraEmpresaInicioComp';

const ListaEmpresas = (props) => {
  const [empresas, setEmpresas] = useState([]);
  const esUsuario = true; // Cambia esto a `true` o `false` según corresponda

  
  const isAuthenticated = props.isAuthenticated;
  useEffect(() => {
    axios.get('http://localhost:8000/api/companies')
      .then(response => {
        setEmpresas(response.data);
      })
      .catch(error => console.error(error));
  }, []);

 
  return (
  <div className='App'>
{esUsuario ? <CabeceraUsuarioInicio isAuthenticated={isAuthenticated} /> : <CabeceraEmpresaInicioComp isAuthenticated={isAuthenticated} />}
    <Container fluid className="mt-4">
      <Row>
        {empresas.map(empresa => (
          <Col md={12} key={empresa._id} className="mb-3">
            <Card className="empresa-card">
              <Card.Body>
                <Row noGutters={true} className="align-items-center">
                  <Col xs={12} sm={6} md={8}>
                    <Card.Title>{empresa.nombreEmpresa}</Card.Title>
                    <Card.Text>
                      <FontAwesomeIcon icon={faEnvelope} /> {empresa.correo}
                    </Card.Text>
                    <Card.Text>
                      <FontAwesomeIcon icon={faIndustry} /> {empresa.industria}
                    </Card.Text>
                  </Col>
                  <Col xs={6} md={4} className="text-md-right">
                    <Badge variant="primary">
                      <FontAwesomeIcon icon={faUsers} className="mr-1" />
                      {empresa.tamanoEmpresa} empleados
                    </Badge>
                    <div className="ratings">
                      <FontAwesomeIcon icon={faStar} className="text-warning" />
                      <FontAwesomeIcon icon={faStar} className="text-warning" />
                      <FontAwesomeIcon icon={faStar} className="text-warning" />
                      {/* ... Add or remove stars based on rating */}
                    </div>
                  </Col>
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
