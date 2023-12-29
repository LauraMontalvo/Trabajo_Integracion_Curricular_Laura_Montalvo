import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Button, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "../../Styles/Lista.scss";
import { Link } from 'react-router-dom';

const ListaUsuariosResumen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  // Función para manejar la ocultación de un usuario de la lista
  const handleHideUser = (userId) => {
    setUsers(users.filter(user => user._id !== userId));
  };

  return (
    <Container fluid className="mt-4">
      <Row>
         {/* Barra Lateral aquí, si es necesario */}
         <Col md={3} className="sidebar">
          {/* Contenido de la Barra Lateral */}
        </Col>
        {/* Lista Principal de Usuarios */}
        <Col md={9}>
          <Row>
        {users.map(user => (
          <Col md={6} lg={4} key={user._id} className="mb-4">
            <Card className="user-card text-center">
              <Card.Body>
                <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={() => handleHideUser(user._id)} />
                <Image src={user.foto || 'default-profile.png'} alt="Foto de perfil" roundedCircle className="profile-picture mb-2" />
                <Card.Title>{user.nombre} {user.apellido}</Card.Title>
                <Card.Text className="text-muted">{user.cargo}</Card.Text>
                <Button variant="primary" as={Link} to={`/perfilUsuario/${user._id}`}>Ver perfil</Button>
              </Card.Body>
            </Card>
          </Col>
          
        ))}
           </Row>
        </Col>

      </Row>
    </Container>
  );
};

export default ListaUsuariosResumen;
