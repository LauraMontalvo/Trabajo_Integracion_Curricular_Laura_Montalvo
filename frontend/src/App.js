// Importa las librerías necesarias
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegistroUsuario from './Views/RegistroUsuario';
import LoginForm from './Components/Usuario/LoginUsuario';
import LoginFormEmpresa from './Components/LoginEmpresa';
import RegistroEmpresa from './Views/RegistroEmpresa';
import DetalleUsuario from './Views/Usuarios/DetalleUsuario';
import LoginAdminForm from './Components/LoginAdmin';
import AdminConsola from './Views/AdminConsola';
import Main from './Views/Main';
import EditarUsuario from './Views/EditarUsuario';
import * as constantes from './Models/Constantes';
import ListaUsuarios from './Components/Usuario/ListaUsuarios';
import DetalleEmpresa from './Components/DetalleEmpresa';
import EditarEmpresa from './Views/EditarEmpresa';
import LoadingModal from './Components/LoadingModal';
import PublicarEmpleo from './Views/PublicarEmpleo';
import ExperienciaLaboral from './Components/ExperienciaLaboral';
import ListaInstituciones from './Views/ListaInstituciones';
import RegistroInstitucionesComp from './Views/RegistroInstitucionesView';
import RegistroInstituciones from './Views/RegistroInstitucionesView';
import ListaEmpresas from './Views/ListaEmpresas';

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
            <Route path='/publicarEmpleo/:id' element={<PublicarEmpleo />} />
            <Route path="/loginusuario" element={<LoginForm />} />
            <Route path="/empresa" element={<LoginFormEmpresa />} />
            <Route path="/registrarUsuario" element={<RegistroUsuario />} />
            <Route path="/detalleUsuario/:id/editar" element={<EditarUsuario />} />
            <Route path="/detalleEmpresa/:id/editar" element={<EditarEmpresa />} />
            <Route path="/registrarEmpresa" element={<RegistroEmpresa />} />
            <Route path="/listaEmpresas" element={<ListaEmpresas/>} />
            <Route path="/listaUsuarios" element={<ListaUsuarios />} />
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
