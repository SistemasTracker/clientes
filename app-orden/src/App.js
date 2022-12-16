import { Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import Login from "./pages/login.js";
import NotFound from './pages/NotFound';
import VerOrden from './pages/verOrden';
import FormularioOrdenCliente from './pages/formularioOrdenCliente';
import FormularioOrden from './pages/formularioOrden';
import Usuarios from './pages/usuarios';
import VerOrdenUser from './pages/verOrdenesUsuario';


function App() {
  return (
  
    <Routes>
      <Route path='/' element={<Login></Login>}></Route>
      <Route path='/formulario' element={<FormularioOrden></FormularioOrden>}></Route>
      <Route path='/formulario1' element={<FormularioOrdenCliente></FormularioOrdenCliente>}></Route>
      <Route path='/orden' element={<VerOrden></VerOrden>}></Route>
      <Route path='/ordenuser' element={<VerOrdenUser></VerOrdenUser>}></Route>
      <Route path='/usuarios' element={<Usuarios></Usuarios>}></Route>
      <Route path='*' element={<NotFound></NotFound>}></Route>
    </Routes>
    


  );
}

export default App;
