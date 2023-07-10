import React, { useEffect, useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { fetchData } from '../Axios/Axios';
import Preview from './Preview';
import { Navbar } from '../Navbar/Navbar';

function Home() {
  const [products, setProducts] = useState([]);
  const [categoris, SetCategoris] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchItem, setSearchItem] = useState('');
  const [isLoading, setIsLoading] = useState(true); 

  const itemsPerPage = 16;

 





  useEffect(() => {
    const getData = async () => {
      const result = await fetchData('products');
      setProducts(result);

      const categorias = await fetchData('categories');
      SetCategoris(categorias);

      setIsLoading(false); // Actualiza el estado de carga cuando los datos se hayan cargado
    };

    getData();
  }, []);

  const handleSearch = (term) => {
    setSearchItem(term);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Navbar handleSearch={handleSearch} products={products} />
      <Preview />

      <div className='contenido-principal'>
        <div className='contenido-categorias'>
          {categoris.slice(0, 4).map((category) => (
            <div className='card-category' key={category.id}>
              {isLoading ? (
                <div className='spinner'></div>
              ): (
                <>
                  <Link to={`categorias/${category.id}/${category.name}`}>
                    <img src={category.image} alt={category.name} />
                  </Link>
                  <p className='titulo-categoria'>{category.name}</p>
                </>
              )}
            </div>
          ))}
        </div>
        <div>
          <h1>Lista de productos</h1>
          <div className='contenido-productos'>
            {currentItems.map((product) => (
              <div className='card-product' key={product.id}>
                {isLoading ? (
                  <div className='spinner'></div> // Muestra el spinner mientras se carga el producto
                ) : (
                  <>
                    <Link to={`producto/${product.id}`}>
                      <img src={product.category.image} alt={product.title} />
                      
                    </Link>
                    
                    <p className='titulo-product'>{product.title}</p>
                    <div className='date-product'>
                      <p className='price-product'>{product.price}$</p>
                      <p className='category-product'>{product.category.name}</p>
                    </div>
                    
                  </>
                )}
              </div>
            ))}
          </div>
          <div className='pagination'>
            {Array.from({ length: Math.ceil(products.length / itemsPerPage) }).map((_, index) => (
              <button key={index} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { Home };
