import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchData } from '../Axios/Axios';
import './Categorias.css';
import Preview from '../Home/Preview';
import { Navbar } from '../Navbar/Navbar';
import defaultImage from '../../assets/clothes.jpg';

function Categorias() {
  const { id, name } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 40;
  const [products, setProducts] = useState([]);
  const [searchItem, setSearchItem] = useState('');

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData('products');
      setProducts(result);
    };

    getData();
  }, [id]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (term) => {
    setSearchItem(term);
  };

  const productosCategoria = products?.filter(
    (producto) => producto.category.name === name
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productosCategoria.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div>
      <Navbar handleSearch={handleSearch} products={products} />
      <div className='contenido-categorias'>
        <Preview />
        <h1>Lista de productos</h1>
        <div className='contenido-productos'>
          {currentItems?.map((product) => (
            <div className='card-products' key={product.id}>
              <Link to={`/producto/${product.id}`}>
                <img
                  src={product?.images[1] || defaultImage}
                  alt={product.title}
                />
              </Link>
              <p className='titulo-product'>{product.title}</p>
              <div className='date-products'>
                <p className='price-product'>{product.price}$</p>
                <p className='category-product'>{product.category.name}</p>
              </div>
            </div>
          ))}
          <div className='pagination'>
            {Array.from({
              length: Math.ceil(products.length / itemsPerPage),
            }).map((_, index) => (
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

export { Categorias };
