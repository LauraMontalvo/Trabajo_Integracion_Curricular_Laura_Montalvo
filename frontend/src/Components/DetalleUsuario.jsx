import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Image, InputGroup, FormControl, Row, Col, Modal, Form } from 'react-bootstrap';
import "../Styles/loginstyle.css"

function DetalleUsuario(props) {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [acadTraining, setAcadTraining] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tituloObtenido, setTituloObtenido] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [editingAcadTrainingId, setEditingAcadTrainingId] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    axios.get(`http://localhost:8000/api/user/${id}`)
      .then((res) => setUser({ ...res.data }))
      .catch((err) => console.log(err));

    axios.get(`http://localhost:8000/api/acadTrainings/user/${id}`)
      .then((res) => setAcadTraining(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleEditClick = () => {
    setNewImageUrl(user.foto);
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`http://localhost:8000/api/user/${id}`, { foto: newImageUrl });
      setUser({ ...user, foto: newImageUrl });
      setIsEditing(false);
    } catch (error) {
      console.error('Error al guardar la nueva URL:', error.response.data.error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewImageUrl('');
  };

  const handleShowModal = (acadTrainingId) => {
    setShowModal(true);
  
    // Comprobar si hay un acadTraining seleccionado para editar
    const selectedAcadTraining = acadTraining.find((item) => item._id === acadTrainingId);
    if (selectedAcadTraining) {
      // Si se está editando, establecer los valores en el estado para la edición
      setEditingAcadTrainingId(acadTrainingId);
      setTituloObtenido(selectedAcadTraining.tituloObtenido);
      setFechaInicio(selectedAcadTraining.fechaInicio);
      setFechaFin(selectedAcadTraining.fechaFin);
    } else {
      // Si no se está editando, restablecer los valores del estado para agregar nuevo
      setEditingAcadTrainingId(null);
      setTituloObtenido('');
      setFechaInicio('');
      setFechaFin('');
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingAcadTrainingId(null);
    setTituloObtenido('');
    setFechaInicio('');
    setFechaFin('');
  };

  const handleAddAcadTraining = async () => {
    try {
      if (editingAcadTrainingId) {
        // Si editingAcadTrainingId está definido, significa que estamos editando
        await axios.put(`http://localhost:8000/api/acadTraining/${editingAcadTrainingId}`, {
          tituloObtenido,
          fechaInicio,
          fechaFin,
        });

        // Limpiar el estado de edición
        setEditingAcadTrainingId(null);
      } else {
        // Si no hay editingAcadTrainingId, significa que estamos agregando nuevo
        await axios.post('http://localhost:8000/api/acadTraining/new', {
          idInstitucion: 'institucion', // Reemplaza con el ID de la institución
          idUsuario: id,
          tituloObtenido,
          fechaInicio,
          fechaFin,
        });
      }

      // Recargar la información académica después de agregar o editar
      const response = await axios.get(`http://localhost:8000/api/acadTrainings/user/${id}`);
      setAcadTraining(response.data);

      // Cerrar la ventana modal
      handleCloseModal();
    } catch (error) {
      console.error('Error al agregar/editar datos académicos:', error.response.data.error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };
  const handleDeleteAcadTraining = async (acadTrainingId) => {
    const isConfirmed = window.confirm("¿Está seguro de eliminar este campo de información académica?");
  
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/acadTraining/${acadTrainingId}`);
  
        // Update the state after deletion
        const updatedAcadTrainings = acadTraining.filter(item => item._id !== acadTrainingId);
        setAcadTraining(updatedAcadTrainings);
      } catch (error) {
        console.error('Error al eliminar información académica:', error.response.data.error);
      }
    }
  };
  return (
    <div className="container mt-4">
      <Row>
        <Col md={6}>
          <div className="text-center border border-info border-4 p-3">
            {isEditing ? (
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Ingrese la URL de la foto de perfil"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                />
              </InputGroup>
            ) : (
              <Image src={user.foto} alt="Foto de perfil" rounded className="img-fluid img-smaller rounded-circle"  />
            )}

            {isEditing ? (
              <div>
                <Button variant="success" onClick={handleSaveClick} className="mr-2">
                  Guardar
                </Button>
                <Button variant="secondary" onClick={handleCancelClick}>
                  Cancelar
                </Button>
              </div>
            ) : (
              <Button variant="info" onClick={handleEditClick}>
                Editar Foto
              </Button>
            )}
          </div>

          <div className="mt-4 border border-info border-4 p-3">
            <h3>Bienvenido a ChavezEmpleo</h3>
            <p>Nombre: {user.nombre} {user.apellido}</p>
            <p>Género: {user.sexo}</p>
            <p>Fecha de Nacimiento:{formatDate(user.fechaNacimiento)}</p>
            <p>Teléfono: {user.telefono}</p>
            <p>Edad: {user.edad}</p>
          </div>

          <div className="mt-4">
            <Button variant="primary" onClick={() => navigate(`/detalleUsuario/${id}/editar`)}>
              Editar Información
            </Button>
            <Button variant="danger" onClick={() => navigate("/loginusuario")}>
              Salir
            </Button>
          </div>
        </Col>

        <Col md={6}>
          <div className="mt-4 border border-info border-4 p-3">
            <h3>Información Académica</h3>
            {acadTraining.map((item) => (
              <div key={item._id} className="mt-4 border p-3">
                <p>Título obtenido: {item.tituloObtenido}</p>
                <p>Fecha de inicio: {formatDate(item.fechaInicio)}</p>
                <p>Fecha de fin: {formatDate(item.fechaFin)}</p>
                <Button
              variant="warning"
              onClick={() => handleShowModal(item._id)}
            >
              Editar
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDeleteAcadTraining(item._id)}
              className="ml-2"
            >
              Eliminar
            </Button>
              </div>
            ))}

            <Button variant="primary" onClick={handleShowModal} className="mt-3">
              Sumar Experiencia
            </Button>

            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>{editingAcadTrainingId ? 'Editar' : 'Agregar'} Información Académica</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formTitulo">
                    <Form.Label>Título obtenido</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el título obtenido"
                      value={tituloObtenido}
                      onChange={(e) => setTituloObtenido(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formFechaInicio">
                    <Form.Label>Fecha de inicio</Form.Label>
                    <Form.Control
                      type="date"
                      value={fechaInicio}
                      onChange={(e) => setFechaInicio(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formFechaFin">
                    <Form.Label>Fecha de fin</Form.Label>
                    <Form.Control
                      type="date"
                      value={fechaFin}
                      onChange={(e) => setFechaFin(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Cerrar
                </Button>
                <Button variant="primary" onClick={handleAddAcadTraining}>
                  {editingAcadTrainingId ? 'Guardar Cambios' : 'Agregar'}
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DetalleUsuario;
