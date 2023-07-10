import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FaSearch, FaUser, FaBookmark, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import Perfil from '../../assets/descarga.jpeg';

function Navbar({ handleSearch, products }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showProduct, setshowProduct] = useState([]);
  const [isInputActive, setIsInputActive] = useState(false);
  const [Error,SetError] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const menuRef = useRef(null);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };




  const handleChange = (event) => {
    const searchTerm = event.target.value;
    
    handleSearch(searchTerm);
    const filteredResults = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
   
    setshowProduct(filteredResults);
    setIsInputActive(true);
  };

  const handleInputBlur = () => {
    setIsInputActive(true);
  };




  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsInputActive(false);
        setShowMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);





  
  return (
    <div className='navbar'>
      <div className='navbar-logo'>
        <Link className="logo" to={'/'}><h1>Answear</h1></Link>
        <div className="search-container" ref={containerRef}>
          <input type="search"  placeholder='Buscador' onChange={handleChange} onBlur={handleInputBlur} ref={inputRef} />
          <FaSearch className="search-icon" />
          {isInputActive && (
            <div className='show'>
              {Error ? (
                <>
                  <p>No se encuentran resultados</p>
                </>
              ): (
                  <div className='show'>
                    <ul>
                      {showProduct.slice(0, 5).map((product) => (
                        <div className='menu_show' key={product.id}>
                          <Link to={`producto/${product.id}`}>
                            <li><img src={product?.images[0]} alt="" />{product.title} {product.price}$</li>
                          </Link>
                        </div>
                      ))}
                    </ul>
                </div>
              )}
              <ul>
                {showProduct.slice(0, 5).map((product) => (
                  <div className='menu_show' key={product.id}>
                    <Link to={`producto/${product.id}`}>
                      <li><img src={product?.images[0]} alt="" />{product.title} {product.price}$</li>
                    </Link>
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className='navbar-items'>
        <ul>
          <Link className='link-nav' to={'/'}><li>Inicio</li></Link>
          <Link className='link-nav' to={'/categorias'}><li>Categorias</li></Link>
          <div className={`profile-img ${showMenu ? 'active' : ''}`} ref={menuRef}>
            <img
              src={Perfil}
              alt=""
              onClick={handleMenuClick}
            />
            {showMenu && (
              <div className='menu-Option'>
                <ul>
                
                  <li><FaUser /> Mi perfil</li>
                 <Link to={'/favoritos'}> <li><FaBookmark /> Guardados</li></Link>
                  <li><FaShoppingCart /> Mis Compras</li>
                  <li><FaSignOutAlt /> Salir</li>
                </ul>
              </div>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
}

export { Navbar };
