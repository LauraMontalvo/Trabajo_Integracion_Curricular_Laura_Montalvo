// Importa las librerías necesarias
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegistroUsuario from './Views/Usuarios/RegistroUsuario';
import LoginForm from './Views/Usuarios/LoginUsuario';
import LoginFormEmpresa from './Views/Empresa/LoginEmpresa';
import RegistroEmpresa from './Views/Administrador/RegistroEmpresa';
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
import RegistroInstituciones from './Views/Administrador/RegistroInstitucionesView';
import ListaEmpresas from './Views/Administrador/ListaEmpresas';
import ListaEmpleos from './Views/Usuarios/ListaEmpleos';

function App() {
  const [isLoading, setIsLoading] = useState(true);

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
            <Route path="/detalleUsuario/:id" element={<DetalleUsuario />} />
            <Route path="/detalleEmpresa/:id" element={<DetalleEmpresa />} />
            <Route path="/loginusuario" element={<LoginForm />} />
            <Route path="/empresa" element={<LoginFormEmpresa />} />
            <Route path="/registrarUsuario" element={<RegistroUsuario />} />
            <Route path="/detalleUsuario/:id/editar" element={<EditarUsuario />} />
            <Route path="/detalleEmpresa/:id/editar" element={<EditarEmpresa />} />
            <Route path="/registrarEmpresa" element={<RegistroEmpresa/>} />
            <Route path="/listaEmpresas" element={<ListaEmpresas/>} />
            <Route path="/listaUsuarios" element={<ListaUsuarios />} />
            <Route path="/buscarEmpleos/:id" element={<ListaEmpleos/>} />
            <Route path="/registrarInstitucion" element={<RegistroInstituciones/>} />
            <Route path="/listaInstituciones" element={<ListaInstituciones />} />
            <Route path="/admin" element={<LoginAdminForm />} />
            <Route path="/admin/consola/:id" element={<AdminConsola />} />
            {/* Asegúrate de tener una ruta de redirección al componente principal */}
            <Route path="/*" element={<Navigate to={constantes.URL_PAGINA_PRINCIPAL} />} />
          </Routes>
        )}
      </>
    </Router>
  );
}

export default App;
