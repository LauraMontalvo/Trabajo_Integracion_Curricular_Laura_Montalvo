import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Container, Row, Col, Button, Modal, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { faEdit, faUser, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import Cabecera from "../../Components/General/Cabecera";
import TabsAdministracionComp from "../../Components/Administracion/TabsAdministracionComp";
import * as constantes from '../../Models/Constantes';
import "../../Styles/Lista.scss";
import { Link } from 'react-router-dom';

const ListaAdministradores = () => {
  const [administradores, setAdministradores] = useState([]);

  const recargarAdministradores = () => {
    axios.get("http://localhost:8000/api/users") // Asegúrate de que esta URL devuelva todos los usuarios
      .then(res => {
        // Filtra para obtener solo los usuarios con el rol de 'Administrador'
        const administradores = res.data.filter(usuario => usuario.rol === 'Administrador');
        setAdministradores(administradores);
      })
      .catch(err => console.error("Error al obtener administradores:", err));
  };
  useEffect(() => {
    recargarAdministradores();
  }, []);

  const toggleAdministradorState = (administrador) => {
    const nuevoEstado = administrador.estado === 'Activo' ? 'Inactivo' : 'Activo';

    axios.put(`http://localhost:8000/api/user/${administrador._id}`, { estado: nuevoEstado }) // Asegúrate de que esta URL y método sean correctos
      .then(res => {
        console.log(res);
        // Actualiza el estado de los administradores con la nueva información
        setAdministradores(prev => prev.map(usr => usr._id === administrador._id ? { ...usr, estado: nuevoEstado } : usr));
      })
      .catch(err => {
        console.error("Error al cambiar el estado del administrador:", err);
      });
  };

  return (
    <div className="App">
      <TabsAdministracionComp onRecargarAdministradores={recargarAdministradores} />
      <Container fluid className="mt-4">
        <Row>
          <Col md={12}>
            <strong>Total de Administradores:</strong> {administradores.length}
          </Col>
          <Col md={12}>
            <Row>
              {administradores.map((administrador) => (
                <Col md={6} key={administrador._id} className="mb-3">
                  <Card className={`empresa-card ${administrador.estado === 'Activo' ? '' : 'card-inactive'}`}>
                    <Card.Body>
                      <Row className="align-items-center">
                        <Col md={8}>
                          <Card.Title>
                            <FontAwesomeIcon icon={faUser} className="me-2" />
                            {administrador.nombre} {administrador.apellido}
                          </Card.Title>
                          {/* Otros detalles del administrador */}
                        </Col>
                        <Col xs={12} sm={6} md={4} className="text-right">
                          <div className="icon-container">
                            {/* Iconos de acciones como editar o cambiar estado */}
                            <FontAwesomeIcon className="icon-primary me-2" icon={faEdit} size="lg" />

                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip id={`tooltip-${administrador._id}`}>
                                  {administrador.estado === 'Activo' ? 'Desactivar Administrador' : 'Activar Administrador'}
                                </Tooltip>
                              }
                            >
                              <FontAwesomeIcon
                                className={administrador.estado === 'Activo' ? 'icon-active' : 'icon-inactive'}
                                icon={administrador.estado === 'Activo' ? faLockOpen : faLock}
                                size="lg"
                                onClick={() => toggleAdministradorState(administrador)} />
                            </OverlayTrigger>
                          </div>
                        </Col>
                      </Row>
                      <div className="user-status">
                        Estado: <span className={administrador.estado === 'Activo' ? 'text-success' : 'text-danger'}>{administrador.estado}</span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default ListaAdministradores;
