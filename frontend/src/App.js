import React from 'react';
import Logueo from './Views/Logueo';
import Main from './Components/Main';
import RegistroUsuario from './Views/RegistroUsuario';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { useState } from 'react'; 
import LoginForm from './Components/LoginUsuario';
import LoginFormEmpresa from './Components/LoginEmpresa';
import RegistroEmpresa from './Views/RegistroEmpresa';



function App() {


  return (

    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Logueo/>}/>
        <Route exact path="/main/:id" element={<Main />}/>
        <Route exact path="/usuario" element={<LoginForm/>}/>
        <Route exact path="/empresa" element={<LoginFormEmpresa/>}/>
        <Route exact path="/registrarUsuario" element={<RegistroUsuario/>}/>
        <Route exact path="/registrarEmpresa" element={<RegistroEmpresa/>}/>

      </Routes>
  </BrowserRouter>
  );
}

export default App;