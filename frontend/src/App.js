// Importa las librerías necesarias
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Logueo from './Views/Logueo';
import RegistroUsuario from './Views/RegistroUsuario';
import LoginForm from './Components/LoginUsuario';
import LoginFormEmpresa from './Components/LoginEmpresa';
import RegistroEmpresa from './Views/RegistroEmpresa';
import DetalleUsuario from './Components/DetalleUsuario';
import LoginAdminForm from './Components/LoginAdmin';
import AdminConsola from './Views/AdminConsola';
import Main from './Views/Main';
import EditarUsuario from './Views/EditarUsuario';
import * as constantes from './Models/Constantes';
import ListaEmpresas from './Components/ListaEmpresas';
import ListaUsuarios from './Components/ListaUsuarios';
import SumarEstudio from './Components/SumarEstudio';
import DetalleEmpresa from './Components/DetalleEmpresa';
import EditarEmpresa from './Views/EditarEmpresa';
import LoadingModal from './Components/LoadingModal';
import PublicarEmpleo from './Views/PublicarEmpleo';
import ExperienciaLaboral from './Views/ExperienciaLaboral';

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
            <Route path="/registrarseComo" element={<Logueo />} />
            <Route path="/detalleUsuario/:id" element={<DetalleUsuario />} />
            <Route path="/detalleEmpresa/:id" element={<DetalleEmpresa />} />
            <Route path='/publicarEmpleo/:id' element={<PublicarEmpleo />} />
            <Route path="/loginusuario" element={<LoginForm />} />
            <Route path="/empresa" element={<LoginFormEmpresa />} />
            <Route path="/registrarUsuario" element={<RegistroUsuario />} />
            <Route path="/detalleUsuario/:id/editar" element={<EditarUsuario />} />
            <Route path="/detalleEmpresa/:id/editar" element={<EditarEmpresa />} />
            <Route path="/registrarEmpresa" element={<RegistroEmpresa />} />
            <Route path="/listaEmpresas" element={<ListaEmpresas />} />
            <Route path="/listaUsuarios" element={<ListaUsuarios />} />
            <Route path="/experienciaLaboral" element={<ExperienciaLaboral />} />
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
