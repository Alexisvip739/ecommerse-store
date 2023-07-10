import React, { useEffect, useState } from 'react';
import './productos.css'
import { fetchData } from '../Axios/Axios'; // Update the import path
import { useParams } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import { FaHeart } from 'react-icons/fa';

function Producto() {
  
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [products2, setProducts2] =useState ([]);
  const [searchItem, setSearchItem]=useState('')
  const [changeColor, setChangeColor] =useState(false)


  const addFav = (product) => {
    setChangeColor(!changeColor);

    // Obtener los artículos guardados del almacenamiento local
    const savedItems = JSON.parse(localStorage.getItem('guardados')) || [];

    // Verificar si el producto ya está guardado
    const isSaved = savedItems.find((item) => item.id === product.id);

    if (!isSaved) {
      savedItems.push(product);
      localStorage.setItem('guardados', JSON.stringify(savedItems));
    }
};
  useEffect(() => {
    const getData = async () => {
      const result = await fetchData(`products/${id}`);
      const result2 = await fetchData('products');
      setProducts2(result2)
      setProducts(result);
    };
    getData();
  }, []);


  const handleSearch = (term) => {
    setSearchItem(term);
  };
  return (
    <div className='inicio'>
      <Navbar handleSearch={handleSearch} products={products2}/>
        <div className='contenedor_producto'>
        <div className='contenedor-imagen'>
          <img src={products.category?.image} alt="" />
        </div>
        <div className='contenedor-informacion'>
          <h1>{products.title}</h1>
          <p>{products.description}</p>

          <div className='pago-botones'>
            <button>Comprar</button>
            <button onClick={(event)=>addFav(products)} className={changeColor ? 'button-white' : 'button-green'}><FaHeart  className={'favoritos'}/>Agregar a favoritos</button>
            <p>{products.price} $</p>
          </div>
        </div>
      </div>

      <div className='presentacion-muestra'>
        <h1>Muestras en otro angulo del producto</h1>
        <div className='imagenes-muestra'>
          {products.images &&
            products.images.map(image => (
              <img src={image} alt="" key={image} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export  {Producto};