import React from 'react';
import Logueo from './Views/Logueo';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import RegistroUsuario from './Views/RegistroUsuario';
import LoginForm from './Components/LoginUsuario';
import LoginFormEmpresa from './Components/LoginEmpresa';
import RegistroEmpresa from './Views/RegistroEmpresa';
import DetalleUsuario from './Components/DetalleUsuario';
import LoginAdminForm from './Components/LoginAdmin';
import AdminConsola from './Views/AdminConsola';
import Main from './Views/Main';
import EditarUsuario from './Views/EditarUsuario';
import * as constantes from './Models/Constantes' ;

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={constantes.URL_PAGINA_PRINCIPAL} element={<Main/>}/>
        <Route exact path="/registrarseComo" element={<Logueo/>}/>
        <Route exact path="/detalleUsuario/:id" element={<DetalleUsuario/>}/>
        <Route exact path="/loginusuario" element={<LoginForm/>}/>
        <Route exact path="/empresa" element={<LoginFormEmpresa/>}/>
        <Route exact path="/registrarUsuario" element={<RegistroUsuario/>}/>
        <Route exact path="/detalleUsuario/:id/editar" element={<EditarUsuario/>}/>
        <Route exact path="/registrarEmpresa" element={<RegistroEmpresa/>}/>
        <Route exact path="/admin" element={<LoginAdminForm />} />
        <Route exact path="/admin/consola" element={<AdminConsola />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;