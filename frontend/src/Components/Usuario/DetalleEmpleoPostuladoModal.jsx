import React, { useState } from 'react';
import { Modal, Button, Card } from 'react-bootstrap';
// Asume que tienes un archivo CSS separado
import "../../Styles/detalle.scss"; // Importa tus estilos personalizados

const DetalleEmpleoPostuladoModal = ({ show, onHide, empleo }) => {
    const [verMas, setVerMas] = useState({ descripcion: false, conocimientos: false, aptitudes: false });

    const toggleVerMas = (seccion) => {
        setVerMas({ ...verMas, [seccion]: !verMas[seccion] });
    };

    const renderTextoConVerMas = (texto, seccion) => {
        const longitudMaxima = 100;

        // Asegúrate de que texto no sea undefined
        if (!texto) return <p>No disponible</p>;

        if (texto.length <= longitudMaxima) {
            return <p>{texto}</p>;
        }
        return (
            <p>
                {verMas[seccion] ? texto : `${texto.substring(0, longitudMaxima)}... `}
                <Button variant="outline-primary" className="ver-mas-button" onClick={() => toggleVerMas(seccion)}>
                    {verMas[seccion] ? 'Ver menos' : 'Ver más'}
                </Button>
            </p>
        );
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" className={"detalleEmpleoModal"}>
            <Modal.Header closeButton>
                <Modal.Title className='tituloModal' >Detalles del empleo al que postuló</Modal.Title>
            </Modal.Header>
            <Modal.Body className='tituloModalBody'>
                {empleo && (
                    <Card className="detalleEmpleoCard">
                        <Card.Header><strong>Puesto:</strong></Card.Header>
                        <Card.Body><p>{empleo.puesto}</p></Card.Body>

                        <Card.Header><strong>Descripción:</strong></Card.Header>
                        <Card.Body>{renderTextoConVerMas(empleo.descripcion, 'descripcion')}</Card.Body>

                        <Card.Header><strong>Formación Académica:</strong></Card.Header>
                        <Card.Body>{renderTextoConVerMas(empleo.formacionAcademica, 'formacionAcademica')}</Card.Body>

                        <Card.Header><strong>Conocimientos requeridos:</strong></Card.Header>
                        <Card.Body>{renderTextoConVerMas(empleo.conocimientos, 'conocimientos')}</Card.Body>

                        <Card.Header><strong>Experiencia Requerida:</strong></Card.Header>
                        <Card.Body>{renderTextoConVerMas(empleo.experienciarequerida, 'experienciarequerida')}</Card.Body>

                        <Card.Header><strong>Aptitudes necesarias:</strong></Card.Header>
                        <Card.Body>{renderTextoConVerMas(empleo.aptitudes, 'aptitudes')}</Card.Body>

                        <Card.Header><strong>Modalidad:</strong></Card.Header>
                        <Card.Body><p>{empleo.modalidad}</p></Card.Body>
                    </Card>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DetalleEmpleoPostuladoModal;
