import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Components/Home/Home';
import {Producto} from './Components/Producto/Producto';
import { Categorias } from './Components/Categorias/Categorias';
import { Perfil } from './Components/Perfil/Perfil';
import {Guardados} from './Components/Guardados/Guardados'
function App() {

  return (
   
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/producto/:id" element={<Producto />} />
          <Route path="/categorias/:id/:name" element={<Categorias />} />
          <Route path="/favoritos" element={<Guardados/>}/>
          <Route path="/perfil" element={<Perfil/>}/>
        </Routes>
      </Router>
    
  );
}

export default App;
