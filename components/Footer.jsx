import React from 'react'
import logo from "../src/img/brillat-logo.svg"
import link1 from "../src/img/ig-post1.jpg"
import link2 from "../src/img/ig-post2.jpg"
import { FaFacebook, FaInstagram } from 'react-icons/fa'
const Footer = () => {
  return (
    <footer>
      <div className="footerContainer">
        <div className="info1">
          <h3>NUESTRAS REDES</h3>
          <div className="icons">
            <a target='blank' href="https://www.instagram.com/brillatsavarinmza" >
              <FaInstagram/>
            </a>
            <a href="https://www.facebook.com/BrillatSavarinmza/?locale=es_LA" >
              <FaFacebook/>
            </a>
          </div>
          <picture className="logoContainerFooter">
            <img src={logo} alt="Logo" />
          </picture>

        </div>

        <div className="info2">
          <h3>CENTRO</h3>
          <ul>
            <li>Juan B. Justo 135, Ciudad, Mendoza.</li>
            <li>Tel: 423 4166 / +54 9 261 535</li>
            <li>Lunes a Sábados: 8:30 - 21:00</li>
            <li>Domingos y feriados: 8:30 - 20:00</li>
          </ul>
        </div>

        <div className="info3">
          <h3>CHACRAS</h3>
          <ul>
            <li>Darragueira 7035, Chacras, Mendoza</li>
            <li>Tel: 496 1588 / +54 9 261 661-1111</li>
            <li>Lunes a Domingos: 8:30 - 21:00</li>
          </ul>
        </div>
        <div className="info4">
          <div className="links">
            <a target='blank' href="https://www.instagram.com/p/C4tala6JZgl/?utm_source=ig_web_button_native_share">
              <img src={link1} alt="link1" />
            </a>
            <a target='blank' href="https://www.instagram.com/brillatsavarinmza/p/C2QUJbupVi6/?img_index=1">
              <img src={link2} alt="link2" />
            </a>
          </div>

        </div>
      </div>
    </footer >
  )
}
export default Footer