import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Cabecera from "../Components/Cabecera";
import { useNavigate } from "react-router";
import ListaEmpresas from "../Components/ListaEmpresas";
import { useState } from "react";
import ListaUsuarios from "../Components/ListaUsuarios";
import { FaBuilding, FaUser } from "react-icons/fa"; // Importa iconos de Font Awesome
import "../Styles/header.css"

const Main = () => {
    const navigate = useNavigate();
    const [modalEmpresas, setModalEmpresas] = useState(false);
    const [modalUsuarios, setModalUsuarios] = useState(false);

    const toggleEmpresas = () => setModalEmpresas(!modalEmpresas);
    const toggleUsuarios = () => setModalUsuarios(!modalUsuarios);

    const VerListaEmpresas = () => {
        toggleEmpresas();
    };

    const VerListaUsuarios = () => {
        toggleUsuarios();
    };

    return (
        <div className="App">
            <Cabecera />
            <div className="button-container">
                <Button color="primary" className="custom-button" onClick={VerListaEmpresas}>
                    <FaBuilding /> Ver Empresas Existentes
                </Button>
                <Button color="info" className="custom-button" onClick={VerListaUsuarios}>
                    <FaUser /> Ver Usuarios Existentes
                </Button>
            </div>
            {/* Modal para Empresas */}
            <Modal isOpen={modalEmpresas} toggle={toggleEmpresas} size="xl">
                <ModalHeader toggle={toggleEmpresas}>Lista de Empresas</ModalHeader>
                <ModalBody>
                    {/* Contenido del modal, por ejemplo: */}
                    <ListaEmpresas />
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleEmpresas}>
                        Cerrar
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Modal para Usuarios (si es necesario) */}
            <Modal isOpen={modalUsuarios} toggle={toggleUsuarios} size="xl">
                <ModalHeader toggle={toggleUsuarios}>Lista de Usuarios</ModalHeader>
                <ModalBody>
                    {/* Contenido del modal, por ejemplo: */}
                    <ListaUsuarios />
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleUsuarios}>
                        Cerrar
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default Main;