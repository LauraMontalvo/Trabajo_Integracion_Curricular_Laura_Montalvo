// Importa las librerías necesarias
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegistroUsuario from './Components/Administracion/RegistroUsuario';
import LoginForm from './Views/Usuarios/LoginUsuario';
import LoginFormEmpresa from './Views/Empresa/LoginEmpresa';

import DetalleUsuario from './Views/Usuarios/DetalleUsuario';
import LoginAdminForm from './Views/Administrador/LoginAdmin';
import AdminConsola from './Views/Administrador/AdminConsola';
import Main from './Views/General/Main';
import EditarUsuario from './Components/Usuario/EditarUsuarioComp';
import * as constantes from './Models/Constantes';
import ListaUsuarios from './Views/Administrador/ListaUsuarios';
import DetalleEmpresa from './Views/Empresa/DetalleEmpresa';
import EditarEmpresa from './Components/Empresa/EditarEmpresaComp';
import LoadingModal from './Views/General/LoadingModal';
import ListaInstituciones from './Views/Administrador/ListaInstituciones';
import ListaEmpresas from './Views/Administrador/ListaEmpresas';
import PerfilEmpresa from './Views/Usuarios/Perfilempresa';
import PerfilUsuario from './Views/Empresa/PerfilUsuario';
import InicioResumen from './Views/General/InicioResumen';
import ListaUsuariosResumen from './Views/Usuarios/ListaUsuariosResumen';
import ListaEmpresasResumen from './Views/Usuarios/ListaEmpresasResumen';
import ListaEmpleosResumen from './Views/Usuarios/ListaEmpleosResumen';
import ModuloReportes from './Views/Administrador/ModuloReportes/ModuloReportes';
import ListaPostulacionesAdmin from './Views/Administrador/ListaPostulacionesAdmin';
import BuscarEmpleo from './Views/Usuarios/BuscarEmpleo';
import RegistroUsuarioUS from './Components/Usuario/RegistrarUsuarioUS';
import ListaAdministradores from './Views/Administrador/ListaAdministradores';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = true; // O define el valor adecuado según tu lógica de autenticación

  useEffect(() => {
    // Lógica de simulación de carga
    const simulateAsyncLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);  // Ajusta el tiempo de simulación según tus necesidades
    };

    simulateAsyncLoad();
  }, []);

  return (
    <Router>
      <>
        {isLoading ? (
          <LoadingModal />
        ) : (
          <Routes>
            <Route path={constantes.URL_PAGINA_PRINCIPAL} element={<Main />} />
            <Route path="/detalleUsuario/:id" element={<DetalleUsuario isAuthenticated={isAuthenticated}/>} />
            <Route path="/detalleEmpresa/:id" element={<DetalleEmpresa />} />
            <Route path="/loginusuario" element={<LoginForm />} />
            <Route path="/empresa" element={<LoginFormEmpresa />} />
            <Route path="/registrarUsuarioUS" element={<RegistroUsuarioUS />} />

        
            <Route path="/listaEmpresas" element={<ListaEmpresas />} />
            <Route path="/listaUsuarios" element={<ListaUsuarios />} />
            <Route path="/listaAdministradores" element={<ListaAdministradores />} />
            <Route path="/buscarEmpleos/:id" element={<BuscarEmpleo/>} />
      
            <Route path="/listaInstituciones" element={<ListaInstituciones />} />
            <Route path="/admin" element={<LoginAdminForm />} />
            <Route path="/admin/consola/:id" element={<AdminConsola />} />
            <Route path="/perfil-empresa/:id" element={<PerfilEmpresa />} />
            <Route path="/perfilUsuario/:id" element={<PerfilUsuario />} />
            <Route path="/resumen/:id" element={<InicioResumen isAuthenticated={isAuthenticated} />} />
            <Route path="resumen/usuariosResumen/:id" element={<ListaUsuariosResumen isAuthenticated={isAuthenticated} />} />
            <Route path="resumen/empresasResumen/:id" element={<ListaEmpresasResumen isAuthenticated={isAuthenticated} />} />
            <Route path="resumen/empleosResumen/:id" element={<ListaEmpleosResumen isAuthenticated={isAuthenticated}/>} />
            <Route path="/listaPostulacionesAdmin" element={<ListaPostulacionesAdmin/>} />
            <Route path="/moduloReportes" element={<ModuloReportes/>} />
        
          </Routes>
        )}
      </>
    </Router>
  );
}

export default App;
