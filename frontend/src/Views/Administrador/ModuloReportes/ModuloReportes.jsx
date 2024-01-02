import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Carousel, ListGroup } from 'react-bootstrap';
import { Doughnut, Bar } from 'react-chartjs-2';
import { FaUsers, FaBuilding, FaHandshake, FaTimesCircle, FaHourglassHalf } from 'react-icons/fa';
import 'moment/locale/es'; // Importar el locale español
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import '../../../Styles/moduloReportes.scss';

// Registro de componentes para Chart.js v3
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function ModuloReportes() {
    const [totalUsuarios, setTotalUsuarios] = useState(0);
    const [usuariosAceptados, setUsuariosAceptados] = useState(0);
    const [usuariosRechazados, setUsuariosRechazados] = useState(0);
    const [usuariosEspera, setUsuariosEspera] = useState(0);
    const [totalEmpresas, setTotalEmpresas] = useState(0);
    const [datosPorEmpresa, setDatosPorEmpresa] = useState([]);
    const [datosDisponibles, setDatosDisponibles] = useState(false);
    const [barData, setBarData] = useState({ datasets: [] });
    const [recentUsers, setRecentUsers] = useState([]);
    const [recentCompanies, setRecentCompanies] = useState([]);
    const [recentJobs, setRecentJobs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/jobs')
          .then(response => {
              // Supongamos que response.data contiene las ofertas de empleo
              const jobs = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
              setRecentJobs(jobs);
          })
          .catch(error => console.error('Error al obtener trabajos:', error));
      // Obtener usuarios
      axios.get('http://localhost:8000/api/users')
        .then(response => {
          const usuarios = response.data;
          setTotalUsuarios(usuarios.length);
          // Aquí puedes calcular y actualizar los usuarios aceptados, rechazados, etc.
        })
        .catch(error => console.error('Error al obtener usuarios:', error));
  
      // Obtener empresas
      axios.get('http://localhost:8000/api/users')
    .then(response => {
        const latestUsers = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
        setRecentUsers(latestUsers);
      const usuarios = response.data;
      setTotalUsuarios(usuarios.length);
    })
    .catch(error => console.error('Error al obtener usuarios:', error));

  // Obtener empresas
  axios.get('http://localhost:8000/api/companies')
    .then(response => {
        const latestCompanies = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
            setRecentCompanies(latestCompanies);
      setTotalEmpresas(response.data.length);
    })
    .catch(error => console.error('Error al obtener empresas:', error));

  // Obtener postulaciones
  axios.get('http://localhost:8000/api/postulations')
  .then(response => {
    const postulaciones = response.data;

    // Crear Sets para almacenar IDs de usuarios únicos
    const idsUsuariosAceptados = new Set();
    const idsUsuariosRechazados = new Set();
    const idsUsuariosEnEspera = new Set();

    postulaciones.forEach(postulacion => {
      if (postulacion.estado === 'Aceptada') {
        idsUsuariosAceptados.add(postulacion.idUsuario);
      } else if (postulacion.estado === 'Negada') {
        idsUsuariosRechazados.add(postulacion.idUsuario);
      } else if (postulacion.estado === 'En Espera') {
        idsUsuariosEnEspera.add(postulacion.idUsuario);
      }
    });

    // Actualizar los estados con la cantidad de usuarios únicos
    setUsuariosAceptados(idsUsuariosAceptados.size);
    setUsuariosRechazados(idsUsuariosRechazados.size);
    setUsuariosEspera(idsUsuariosEnEspera.size);
  })
  .catch(error => {
    console.error('Error al obtener postulaciones:', error);
    setDatosDisponibles(false);
  });

// ... aquí irían otras llamadas a API o lógicas adicionales si las tienes

}, [datosPorEmpresa]); // Dependencias de useEffect

  // Preparar los datos para la gráfica de dona
  const doughnutData = {
    labels: ['Aceptados', 'Rechazados', 'En Espera'],
    datasets: [
      {
        label: 'Estado de los Usuarios',
        data: [usuariosAceptados, usuariosRechazados, usuariosEspera],
        backgroundColor: ['#4caf50', '#f44336', '#ff9800'],
        hoverBackgroundColor: ['#388e3c', '#d32f2f', '#f57c00'],
      },
    ],
  };
  
  
  // Datos para la gráfica de barras (Puedes personalizar esta parte)
  

  // Datos para el carrusel
  const data = [
    { title: 'Total de Usuarios', value: totalUsuarios, icon: <FaUsers size={50} /> },
    { title: 'Usuarios Aceptados', value: usuariosAceptados, icon: <FaHandshake size={50} /> },
    { title: 'Usuarios Rechazados', value: usuariosRechazados, icon: <FaTimesCircle size={50} /> },
    { title: 'Usuarios en Espera', value: usuariosEspera, icon: <FaHourglassHalf size={50} /> },
    { title: 'Total de Empresas', value: totalEmpresas, icon: <FaBuilding size={50} /> }, // Nuevo elemento para mostrar el total de empresas
  ];


  const doughnutOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 14
          }
        }
      }
    }
  };

  

  const SummaryCard = ({ title, value, Icon }) => (
    <Card className="text-center mb-3">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Icon size={50} className="mb-2" />
        <Card.Text className="dashboard-value">{value}</Card.Text>
      </Card.Body>
    </Card>
  );
  
 
  const ListGroupSection = ({ title, items }) => (
    <div className="list-group-section">
      <h4 className="list-group-title">{title}</h4>
      <ListGroup className="mb-3">
        {items.map((item, index) => (
          <ListGroup.Item key={index} className="list-group-item">
            {item.text}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  
  );
  // Simula la obtención de las notificaciones de usuarios que actualizaron su perfil
const userNotifications = recentUsers.map(user => ({
  text: `${user.nombre} se a registrado recientemente.`,
  id: user._id
}));

// Simula la obtención de actividades de empresas que publicaron nuevas ofertas de empleo
const moment = require('moment');
  moment.locale('es'); // Configura el idioma a español

  function formatRelativeDate(date) {
    return moment(date).fromNow();
}

const companyActivities = recentJobs.map(job => ({
  
    text: `La empresa ${job.idEmpresa.nombreEmpresa} ha publicado una nueva oferta de empleo para ${job.puesto}.   Publicado ${formatRelativeDate(job.fechaPublicacion)}`,
    id: job._id
    
}));
  
return (
    <Container fluid className="dashboard-container">
      {/* Carrusel con tarjetas */}
      <Row className="justify-content-center mb-4">
        <Col lg={8}>
          <Carousel interval={5000} pause="hover">
            {data.map((item, index) => (
              <Carousel.Item key={index}>
                <Card className="text-center dashboard-card">
                  <Card.Body>
                    <div className="dashboard-icon">{item.icon}</div>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text className="dashboard-value">
                      {item.value}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
  
      {/* Secciones */}
      <Row className="justify-content-center mb-4">
        <Col md={12} className="section-title">
          <h2>Resumen de Usuarios</h2>
        </Col>
        <Col md={3}>
          <SummaryCard title="Total de Usuarios" value={totalUsuarios} Icon={FaUsers} />
        </Col>
        <Col md={3}>
          <SummaryCard title="Usuarios Aceptados" value={usuariosAceptados} Icon={FaHandshake} />
        </Col>
        <Col md={3}>
          <SummaryCard title="Usuarios Rechazados" value={usuariosRechazados} Icon={FaTimesCircle} />
        </Col>
        <Col md={3}>
          <SummaryCard title="Usuarios en Espera" value={usuariosEspera} Icon={FaHourglassHalf} />
        </Col>
      </Row>
  
      {/* Gráficos */}
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={6}>
          <Card>
            <Card.Body>
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </Card.Body>
          </Card>
        </Col>
        {/* Otros gráficos si es necesario */}
      </Row>
  
      {/* Notificaciones */}
      <Row className="justify-content-center mb-4">
        <Col md={6}>
          <ListGroupSection title="Notificaciones" items={userNotifications} />
        </Col>
        <Col md={6}>
          <ListGroupSection title="Actividades Recientes" items={companyActivities} />
        </Col>
      </Row>
    </Container>
  );
}

export default ModuloReportes;