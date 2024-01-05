import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, ListGroup, Image, Button } from 'react-bootstrap';
import "../../Styles/Perfil.scss"
import "../../Styles/detalle.scss"
import CabeceraUsuarioInicio from '../../Components/Usuario/CabeceraUsuarioInicioComp';
import ListaEmpleosPerfilEmpresa from '../../Components/Usuario/ListaEmpleosPerfilEmpresa';
import defaultImage from '../../img/imagenUsuarioDefecto.png';

const PerfilEmpresa = () => {
  const { id } = useParams(); // Obtener el ID de la empresa desde la URL
  const [empresa, setEmpresa] = useState(null);
  const [empleos, setEmpleos] = useState([]);
  const [verDescripcionCompleta, setVerDescripcionCompleta] = useState(false);
  const [imagenPreview, setImagenPreview] = useState(null);

  useEffect(() => {
    const cargarDatosEmpresa = async () => {
      try {
        // Obtener información de la empresa
        const resEmpresa = await axios.get(`http://localhost:8000/api/company/${id}`);
        setEmpresa(resEmpresa.data);
  
        // Obtener empleos publicados por la empresa
        const resEmpleos = await axios.get(`http://localhost:8000/api/jobs/company/${id}`);
        setEmpleos(resEmpleos.data);
  
        const fotoResponse = await axios.get(`http://localhost:8000/api/company/foto/${id}`);
            if (fotoResponse.data && fotoResponse.data.foto) {
                setImagenPreview(fotoResponse.data.foto);
            }
            } catch (error) {
                console.error('Error al cargar los datos:', error);
            }
    };
  
    cargarDatosEmpresa();
  }, [id]);
  

  if (!empresa) {
    return null;
  }
  // Función para alternar la visualización de la descripción
  const toggleDescripcion = () => {
    setVerDescripcionCompleta(!verDescripcionCompleta);
  };

  const mensajeEmpleos = `Hay ${empleos.length} empleo${empleos.length !== 1 ? 's' : ''} en ${empresa.nombreEmpresa}`;

  return (
    <div className='App'>
      <CabeceraUsuarioInicio></CabeceraUsuarioInicio>
      <Container className="perfil-empresa mt-4">
        <Row>
          <Col md={4}>
            <Card className="card-empresa">
            
              <Card.Body>
              <div className="image-container text-center mb-3">
                                <Image src={empresa.foto || imagenPreview || defaultImage} alt="Foto de perfil" roundedCircle className="img-fluid" />
                                </div>
                <Card.Title className="titulo-empresa">{empresa.nombreEmpresa}</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>Correo: {empresa.correo}</ListGroup.Item>
                  <ListGroup.Item>Dirección: {empresa.direccion}</ListGroup.Item>
                  <ListGroup.Item>Teléfono: {empresa.telefono}</ListGroup.Item>

                  <ListGroup.Item>
                    Descripción: {verDescripcionCompleta
                      ? empresa.descripcion
                      : `${empresa.descripcion.substring(0, 100)}...`}
                    <Button variant="link" onClick={toggleDescripcion}>
                      {verDescripcionCompleta ? 'Ver menos' : 'Ver más'}
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <Card className="card-empleos">
              <Card.Body>
                <h3 className="titulo-empleos-publicados">{mensajeEmpleos}</h3>
                {empleos.length > 0 ? (
                  <ListaEmpleosPerfilEmpresa empleos={empleos} />
                ) : (
                  <p>No hay empleos publicados actualmente.</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>

  );
};

export default PerfilEmpresa;
