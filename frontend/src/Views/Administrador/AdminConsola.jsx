import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Button, Modal } from 'react-bootstrap';
import { FaBuilding, FaUsers, FaUniversity, FaChartBar } from 'react-icons/fa'; // Importar iconos
import axios from 'axios';
import * as constantes from '../../Models/Constantes';
import TabsAdministracionComp from '../../Components/Administracion/TabsAdministracionComp';
import ListaEmpresas from './ListaEmpresas';
import ListaUsuarios from './ListaUsuarios';
import ListaInstituciones from './ListaInstituciones';
import '../../Styles/Administrador.scss';
import "../../Styles/header.scss";
const Main = () => {
    const { id } = useParams();
    const navigate = useNavigate();
  
    const [modalEmpresas, setModalEmpresas] = useState(false);
    const [modalUsuarios, setModalUsuarios] = useState(false);
    const [modalInstituciones, setModalInstituciones] = useState(false);
    const toggleEmpresas = () => setModalEmpresas(!modalEmpresas);
    const toggleUsuarios = () => setModalUsuarios(!modalUsuarios);
    const toggleInstituciones = () => setModalUsuarios(!modalInstituciones);

    const handleVerEmpresas = () => navigate('/listaEmpresas');
    const handleVerUsuarios = () => navigate('/listaUsuarios');
    const handleVerInstituciones = () => navigate('/listaInstituciones');
    const handleVerReportes = () => {
        navigate('/moduloReportes');
    };

   
    return (
        <div className="App">
   
            <TabsAdministracionComp/>
            
            <div className="main-content">
                
            <div className="cards-container">
                {/* Tarjeta para Empresas con Icono */}
                <Card style={{ width: '18rem' }} onClick={handleVerEmpresas}>
                    <Card.Body>
                        <FaBuilding size={50} className="icono-empresa" />
                        <Card.Title>Empresas</Card.Title>
                        <Card.Text>
                            Gestionar empresas.
                        </Card.Text>
                        <Button variant="primary" >Ver Empresas</Button>
                        
                    </Card.Body>
                </Card>

                {/* Tarjeta para Usuarios con Icono */}
                <Card style={{ width: '18rem' }} onClick={handleVerUsuarios}>
                    <Card.Body>
                        <FaUsers size={50} className="icono-usuarios" />
                        <Card.Title>Usuarios</Card.Title>
                        <Card.Text>
                            Gestionar usuarios.
                        </Card.Text>
                        <Button variant="primary" >Ver Usuarios</Button>
                    </Card.Body>
                </Card>

                {/* Tarjeta para Instituciones con Icono */}
                <Card style={{ width: '18rem' }} onClick={handleVerInstituciones}>
                    <Card.Body>
                        <FaUniversity size={50} className="icono-instituciones" />
                        <Card.Title>Instituciones</Card.Title>
                        <Card.Text>
                            Gestionar instituciones.
                        </Card.Text>
                        <Button variant="primary" >Ver Instituciones</Button>
                    </Card.Body>
                </Card>
{/* Tarjeta para el Módulo de Reportes */}
<Card style={{ width: '18rem' }} onClick={handleVerReportes}>
                        <Card.Body>
                            <FaChartBar size={50} className="icono-reportes" />
                            <Card.Title>Módulo de Reportes</Card.Title>
                            <Card.Text>
                                Ver los reportes y estadísticas.
                            </Card.Text>
                            <Button variant="primary">Ver Reportes</Button>
                        </Card.Body>
                    </Card>
                
                  </div>
            </div>
            
            <Modal show={modalEmpresas} onHide={toggleEmpresas} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Lista de Empresas</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListaEmpresas />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleEmpresas}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal para Usuarios */}
            <Modal show={modalUsuarios} onHide={toggleUsuarios} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Lista de Usuarios</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListaUsuarios />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleUsuarios}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal para Instituciones */}
            <Modal show={modalInstituciones} onHide={toggleInstituciones} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Lista de Instituciones</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListaInstituciones />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleInstituciones}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>
    );
};

export default Main;