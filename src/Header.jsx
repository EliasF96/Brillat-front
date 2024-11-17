import React from 'react'
import "./styles/Header.css"
import logo from "./img/logo-rosa.png"
const Header = () => {
  return (
    <div className="headerContainer">
      <picture className="logoContainer">
        <img src={logo} alt="Logo" />
        
      </picture>
      <div className="navBar">
        <ul>
          <li>Nuestros Sabores</li>
          <li>Tienda</li>
          <li>Pastelería</li>
          <li>Restaurante</li>
          <li>Evento</li>
        </ul>
      </div>

    </div >
  )
}
export default Header