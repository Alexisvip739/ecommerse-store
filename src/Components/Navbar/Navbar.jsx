import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUser, FaBookmark, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import PerfilPhoto from '../../assets/descarga.jpeg';
import { Perfil } from '../Perfil/Perfil';
function Navbar({ handleSearch, products }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showProduct, setshowProduct] = useState([]);
  const [isInputActive, setIsInputActive] = useState(false);
  const [Error,SetError] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate(); // Utilizamos useNavigate para acceder a la función de navegación

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const handleChange = (event) => {
    const searchTerm = event.target.value;
    
    handleSearch(searchTerm);
    const filteredResults = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if(filteredResults.length === 0){
      SetError(true)
    }
    setshowProduct(filteredResults);
    setIsInputActive(true);
  };

  const handleInputBlur = () => {
    setIsInputActive(true);
  };

  const handleProductClick = (productId) => {
    setIsInputActive(false); // Cerramos las sugerencias al hacer clic en un producto
    navigate(`/producto/${productId}`); // Redireccionamos utilizando navigate
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
          <input type="search" placeholder='Buscador' onChange={handleChange} onBlur={handleInputBlur} ref={inputRef} />
          <FaSearch className="search-icon" />
          {isInputActive && (
            <div className='show'>
              {Error ? (
                <div className="a">
                  <p>No se encuentran resultados</p>
                </div>
              ): (
                  <div className='show'>
                    <ul>
                      {showProduct.slice(0, 5).map((product) => (
                        <div className='menu_show' key={product.id} onClick={() => handleProductClick(product.id)}>
                          <a href={`/producto/${product.id}`}>
                            <li><img src={product?.images[0]} alt="" />{product.title} {product.price}$</li>
                          </a>
                        </div>
                      ))}
                    </ul>
                </div>
              )}
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
              src={PerfilPhoto}
              alt=""
              onClick={handleMenuClick}
            />
            {showMenu && (
              <div className='menu-Option'>
                <ul>
                 <Link to={'/perfil'}> <li><FaUser /> Mi perfil</li> </Link>
                  <Link to={'/favoritos'}><li><FaBookmark /> Guardados</li></Link>
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
