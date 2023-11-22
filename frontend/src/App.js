import React from 'react';
import Logueo from './Views/Logueo';
import RegistroUsuario from './Views/RegistroUsuario';
import * as reactRouterDom from 'react-router-dom';
import LoginForm from './Components/LoginUsuario';
import LoginFormEmpresa from './Components/LoginEmpresa';
import RegistroEmpresa from './Views/RegistroEmpresa';
import DetalleUsuario from './Components/DetalleUsuario';
import LoginAdminForm from './Components/LoginAdmin'
import Main from './Views/Main';
import EditarUsuario from './Views/EditarUsuario';




function App() {


  return (

    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Main/>}/>
        <Route exact path="/registrarseComo" element={<Logueo/>}/>
        <Route exact path="/detalleUsuario/:id" element={<DetalleUsuario/>}/>
        <Route exact path="/usuario" element={<LoginForm/>}/>
        <Route exact path="/empresa" element={<LoginFormEmpresa/>}/>
        <Route exact path="/registrarUsuario" element={<RegistroUsuario/>}/>
        <Route exact path="/registrarEmpresa" element={<RegistroEmpresa/>}/>
        <reactRouterDom.Route exact path="/admin" element={<LoginAdminForm />} />
      </reactRouterDom.Routes>
    </reactRouterDom.BrowserRouter>
  );
}

export default App;