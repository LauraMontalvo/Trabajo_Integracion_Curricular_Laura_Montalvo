import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Cabecera from "../Components/Cabecera";
import { useNavigate } from "react-router";

import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import ListaUsuarios from "../Components/Usuario/ListaUsuarios";
import { FaBuilding, FaUser } from "react-icons/fa"; // Importa iconos de Font Awesome
import "../Styles/header.css"
import * as constantes from "../Models/Constantes";
import axios from "axios";
import TabsAdministracionComp from "../Components/Administracion/TabsAdministracionComp";
import ListaInstituciones from "./ListaInstituciones";
import ListaEmpresas from "../Views/ListaEmpresas";

const Main = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [admin, setAdmin] = useState({});
    const [modalEmpresas, setModalEmpresas] = useState(false);
    const [modalUsuarios, setModalUsuarios] = useState(false);
    const [modalInstituciones, setModalInstituciones] = useState(false);
    const toggleEmpresas = () => setModalEmpresas(!modalEmpresas);
    const toggleUsuarios = () => setModalUsuarios(!modalUsuarios);
    const toggleInstituciones = () => setModalUsuarios(!modalInstituciones);


    useEffect(() => {
        axios.post(`${constantes.URL_CONSULTAR_DATOS_USUARIO}${id}`).then(res => {
            setAdmin({ ...res.data });
            console.log(admin);
        }).catch(err => console.log(err))
    });

    const VerListaEmpresas = () => {
        toggleEmpresas();
    };

    const VerListaUsuarios = () => {
        toggleUsuarios();
    };

    return (
        <div className="App">
   
            <TabsAdministracionComp/>

            
            <Modal isOpen={modalEmpresas} toggle={toggleEmpresas} size="xl">
                <ModalHeader toggle={toggleEmpresas}>Lista de Empresas</ModalHeader>
                <ModalBody>
                    {/* Contenido del modal, por ejemplo: */}
                    <ListaEmpresas/>
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
            <Modal isOpen={modalInstituciones} toggle={toggleInstituciones} size="xl">
                <ModalHeader toggle={toggleInstituciones}>Lista de Empresas</ModalHeader>
                <ModalBody>
                    {/* Contenido del modal, por ejemplo: */}
                    <ListaInstituciones/>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleInstituciones}>
                        Cerrar
                    </Button>
                </ModalFooter>
            </Modal>


        </div>
    );
};

export default Main;