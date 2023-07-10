import React from 'react'
import IMG from '../../assets/outfits.jpg'
import './Home.css'
function Preview() {
  return (
    <div className='img-previw'>
        <img src={IMG} alt="" />
        <p>¡Disfruta de descuentos increíbles al 50% en nuestra gran variedad de productos!, Desde tus ropas favoritos a tus electronicos domesticos</p>
    </div>
  )
}

export default Preview