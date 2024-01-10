import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Button, Image, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import "../../Styles/Lista.scss";
import { Link } from 'react-router-dom';
import defaultImage from '../../img/imagenUsuarioDefecto.png';


const ListaUsuariosResumen = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [imagenPreview, setImagenPreview] = useState(null);
  
  useEffect(() => {
    axios.get('http://localhost:8000/api/users')
      .then(response => {
        // Ordenar los usuarios por nombre antes de almacenarlos en el estado
        const sortedUsers = response.data.sort((a, b) => (a.nombre + ' ' + a.apellido).localeCompare(b.nombre + ' ' + b.apellido));
        setUsers(sortedUsers);
        setFilteredUsers(sortedUsers); // Inicialmente, mostrar todos los usuarios ordenados
      })
      .catch(error => console.error(error));
  }, []);

  // Función para manejar la ocultación de un usuario de la lista
  const handleHideUser = (userId) => {
    setUsers(users.filter(user => user._id !== userId));
    setFilteredUsers(filteredUsers.filter(user => user._id !== userId)); // Actualizar la lista filtrada
  };

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filtrar y ordenar la lista de usuarios basada en la consulta de búsqueda
    const filtered = users.filter(user =>
      user.nombre.toLowerCase().includes(query) ||
      user.apellido.toLowerCase().includes(query)
    ).sort((a, b) => (a.nombre + ' ' + a.apellido).localeCompare(b.nombre + ' ' + b.apellido));
    setFilteredUsers(filtered);
  };

  return (
    <Container fluid className="mt-4">
      <Row>

        {/* Widget de Filtro a la Derecha */}
        <Col md={3} className="widget">
          <h4>Filtrar Usuarios</h4>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Buscar por nombre o apellido"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Form.Group>
          {/* Agrega otros controles de filtro aquí si es necesario */}
        </Col>

        {/* Lista Principal de Usuarios */}
        <Col md={9}>
          <Col md={12} className="mb-3">
            <div className="total-empresas">
              <h4>Total de Usuarios</h4>
              <div className="numero">{users.length}</div>
            </div>
          </Col>
          <Row>
            {filteredUsers.map(user => (
              <Col md={6} lg={4} key={user._id} className="mb-4">
                <Card className="user-card text-center">
                  <Card.Body>
                    <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={() => handleHideUser(user._id)} />
                    <Image src={user.foto ||  defaultImage} alt="Foto de perfil" roundedCircle className="profile-picture mb-2" />
                    <Card.Title>{user.nombre} {user.apellido}</Card.Title>
                    <Card.Text className="text-muted">{user.cargo}</Card.Text>
                    {/* Agregar un resumen de habilidades o intereses aquí */}

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
