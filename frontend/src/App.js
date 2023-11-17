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




function App() {


  return (

    <reactRouterDom.BrowserRouter>
      <reactRouterDom.Routes>
        <reactRouterDom.Route exact path="/" element={<Main />} />
        <reactRouterDom.Route exact path="/registrarseComo" element={<Logueo />} />
        <reactRouterDom.Route exact path="/detalleUsuario/:id" element={<DetalleUsuario />} />
        <reactRouterDom.Route exact path="/usuario" element={<LoginForm />} />
        <reactRouterDom.Route exact path="/empresa" element={<LoginFormEmpresa />} />
        <reactRouterDom.Route exact path="/registrarUsuario" element={<RegistroUsuario />} />
        <reactRouterDom.Route exact path="/registrarEmpresa" element={<RegistroEmpresa />} />
        <reactRouterDom.Route exact path="/admin" element={<LoginAdminForm />} />

      </reactRouterDom.Routes>
    </reactRouterDom.BrowserRouter>
  );
}

export default App;