import React from 'react'
import PerfilPhoto from '../../assets/descarga.jpeg';
import { Navbar } from '../Navbar/Navbar';
import '../Perfil/Perfil.css' 
function Perfil() {
  return (
    
    <div>
      <Navbar/>
      <div className='perfil_contenido'>
          <div className='perfil'> 
            <img src={PerfilPhoto} alt="" />
            <div className='perfil-user'>
              <h1>Alexis Ultreras Sotelo</h1>
              <p>@AlexisUS</p>
              <p>20 Articulos comprados</p>
            </div>
          </div>
      </div>
    </div>
  )
}

export {Perfil}