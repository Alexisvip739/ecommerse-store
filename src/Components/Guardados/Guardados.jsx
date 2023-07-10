import React from 'react';
import { Navbar } from '../Navbar/Navbar';

function Guardados() {
  // Obtener los artículos guardados del almacenamiento local
  const savedItems = JSON.parse(localStorage.getItem('guardados')) || [];

  return (
    <div>
      <Navbar />
      <div className='productos_guardados'>
        {/* Mostrar los artículos guardados */}
        {savedItems.map((product) => (
          <div key={product.id}>
            <h2>{product.title}</h2>
            {/* Aquí puedes mostrar más detalles del producto guardado si es necesario */}
          </div>
        ))}
      </div>
    </div>
  );
}

export { Guardados };